#!/usr/bin/env node
/*
 * wb_token_dump.js — WorkBuddy 本地会话解密器（Windows 端，零依赖）
 * ---------------------------------------------------------------------------
 * 背景：
 *   新版 WorkBuddy 客户端把本地会话文件里的敏感字段做了静态加密（at-rest
 *   encryption）。workbuddy-desktop.info 里的 auth.accessToken / refreshToken /
 *   account.nickname / account.phoneNumber 全部变成：
 *       {"$wbEncrypted":1,"envelope":"<base64>"}
 *   于是 workbuddy_checkin.py 再也读不到明文 accessToken。
 *
 * 原理（已实测通过）：
 *   1) 主密钥载荷来自 Electron 原生模块 electron_browser_workbuddy_storage，
 *      该模块编译在 WorkBuddy.exe 里，并且**在 ELECTRON_RUN_AS_NODE 模式下依然
 *      可用**——所以只要用应用自己的二进制以 Node 模式跑一段脚本，就能直接
 *      拿到 {"version":1,"atRestSecretKey":"...",...}，不需要附加调试器、
 *      不需要 --inspect、不需要管理员权限。
 *   2) symmetricKey = sha256(atRestSecretKey)  （32 字节）
 *      protectorKeyId = sha256(symmetricKey).hex.slice(0,16)
 *   3) 字段密文 = AES-256-GCM(symmetricKey, nonce, aad)，aad 由
 *      buildAuthenticatedContextAad(keyId, suite, {framing}, 'sym-v1') 构造：
 *        "WB-AAD\0" | 01 | lenPrefixed(magic) | lenPrefixed('sym-v1')
 *                  | uint32BE(suite) | lenPrefixed(keyId)
 *                  | [kind] | [0] | [0]
 *      magic: file=WBEF1 field=WBEV1 record=WBER1 stream=WBES1
 *      kind : file=1 field=2 record=3 stream=4
 *   4) keyblob（~/.workbuddy/keyblob）里的 userKey 只是二级密钥，
 *      实测 auth.* 字段用的是 symmetricKey 本身；userKey 仍然解出来备用。
 *
 * 用法：
 *   set ELECTRON_RUN_AS_NODE=1
 *   "<WorkBuddy 安装目录>\WorkBuddy.exe" wb_token_dump.js [选项]
 *
 * 选项：
 *   --out <path>       明文输出路径（默认：脚本同目录 token.info）
 *   --file <path>      指定会话文件（默认自动探测）
 *   --config-dir <dir> WorkBuddy 配置目录（默认 %USERPROFILE%\.workbuddy）
 *   --stdout           只把解密后的 JSON 打到标准输出，不写文件
 *   --quiet            只输出一行摘要
 *
 * 退出码：0 成功；2 取不到主密钥；3 找不到会话文件；4 解密失败
 * ---------------------------------------------------------------------------
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const BINDING_NAME = 'electron_browser_workbuddy_storage';
const AAD_PREFIX = Buffer.from('WB-AAD\0', 'ascii');
const WRAP_PREFIX = Buffer.from('WB-WRAP\0', 'ascii');
const MAGIC = { file: 'WBEF1', field: 'WBEV1', record: 'WBER1', stream: 'WBES1' };
const KIND = { file: 1, field: 2, record: 3, stream: 4 };
const SCHEME = 'sym-v1';
const FRAMINGS = ['field', 'file', 'record', 'stream'];

// ---------------------------------------------------------------- encoders
function u32(n) {
  const b = Buffer.allocUnsafe(4);
  b.writeUInt32BE(n);
  return b;
}

function lenPrefixed(s) {
  const t = Buffer.from(String(s), 'utf8');
  return Buffer.concat([u32(t.length), t]);
}

/** sym-v1 的认证上下文 AAD（对应 app.asar buildAuthenticatedContextAad） */
function symAad(keyId, suite, framing, scheme) {
  return Buffer.concat([
    AAD_PREFIX,
    Buffer.from([1]),
    lenPrefixed(MAGIC[framing]),
    lenPrefixed(scheme || SCHEME),
    u32(suite),
    lenPrefixed(keyId),
    Buffer.from([KIND[framing]]),
    Buffer.from([0]), // optional uint64 sequence
    Buffer.from([0]), // final
  ]);
}

/** asym-v1 的 key wrap AAD（对应 app.asar buildFileKeyWrapContext） */
function wrapAad(fileKeyId, devPubKeyId, suite, framing) {
  return Buffer.concat([
    WRAP_PREFIX,
    Buffer.from([1]),
    lenPrefixed(MAGIC[framing]),
    lenPrefixed('asym-v1'),
    u32(suite),
    lenPrefixed(fileKeyId),
    lenPrefixed(devPubKeyId),
    Buffer.from([KIND[framing]]),
  ]);
}

// ------------------------------------------------------------------ crypto
function deriveKeyId(key) {
  return crypto.createHash('sha256').update(key).digest('hex').slice(0, 16);
}

function openGcm(key, env, aad) {
  const d = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(env.nonce, 'base64'),
    { authTagLength: 16 }
  );
  d.setAAD(aad);
  d.setAuthTag(Buffer.from(env.authTag, 'base64'));
  return Buffer.concat([d.update(Buffer.from(env.ciphertext, 'base64')), d.final()]);
}

function parseEnvelope(node) {
  const raw = Buffer.from(node.envelope, 'base64').toString('utf8');
  return JSON.parse(raw);
}

// --------------------------------------------------------------- key chain
function getKeyPayload() {
  const b = process._linkedBinding(BINDING_NAME);
  if (!b || typeof b.loggerGet !== 'function') throw new Error('binding has no loggerGet()');
  return JSON.parse(b.loggerGet());
}

function readKeyblob(configDir) {
  const p = path.join(configDir, 'keyblob');
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

/** 解出 keyblob 里的 userKey（二级密钥，备用） */
function unwrapKeyblob(blob, symmetricKey) {
  if (!blob || !Array.isArray(blob.slots)) return null;
  for (const slot of blob.slots) {
    if (slot.type !== 'static-v1' || typeof slot.wrapped !== 'string') continue;
    if (slot.protectorKeyId && slot.protectorKeyId !== deriveKeyId(symmetricKey)) continue;
    try {
      const env = JSON.parse(Buffer.from(slot.wrapped, 'base64').toString('utf8'));
      for (const framing of FRAMINGS) {
        try {
          const pt = openGcm(symmetricKey, env, symAad(env.keyId, env.suite, framing, SCHEME));
          if (pt.length === 32 && deriveKeyId(pt) === blob.keyId) return pt;
        } catch (e) { /* next framing */ }
      }
    } catch (e) { /* next slot */ }
  }
  return null;
}

// ------------------------------------------------------------ session file
function defaultSessionFile() {
  const candidates = [];
  if (process.env.LOCALAPPDATA) {
    candidates.push(path.join(process.env.LOCALAPPDATA, 'CodeBuddyExtension', 'Data', 'Public', 'auth', 'workbuddy-desktop.info'));
    candidates.push(path.join(process.env.LOCALAPPDATA, 'CodeBuddyExtension', 'Data', 'Public', 'auth', 'workbuddy-desktop-ai.info'));
  }
  candidates.push(path.join(os.homedir(), 'AppData', 'Local', 'CodeBuddyExtension', 'Data', 'Public', 'auth', 'workbuddy-desktop.info'));
  return candidates.find((p) => { try { return fs.statSync(p).isFile(); } catch (e) { return false; } }) || null;
}

// ----------------------------------------------------------------- decrypt
function decryptTree(node, keys, stats) {
  if (Array.isArray(node)) return node.map((v) => decryptTree(v, keys, stats));
  if (node && typeof node === 'object') {
    if (node.$wbEncrypted !== undefined) {
      const env = parseEnvelope(node);
      for (const key of keys) {
        if (!key) continue;
        if (env.keyId && deriveKeyId(key) !== env.keyId) continue;
        for (const framing of FRAMINGS) {
          try {
            const pt = openGcm(key, env, symAad(env.keyId, env.suite, framing, env.scheme || SCHEME));
            stats.ok += 1;
            return pt.toString('utf8');
          } catch (e) { /* next framing */ }
        }
      }
      stats.fail += 1;
      return node; // 保留原样，绝不静默丢数据
    }
    const out = {};
    for (const k of Object.keys(node)) out[k] = decryptTree(node[k], keys, stats);
    return out;
  }
  return node;
}

function jwtExp(token) {
  try {
    const part = String(token).split('.')[1];
    const j = JSON.parse(Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
    return j.exp ? new Date(j.exp * 1000) : null;
  } catch (e) {
    return null;
  }
}

// -------------------------------------------------------------------- main
function main() {
  const argv = process.argv.slice(2);
  const opt = { out: null, file: null, configDir: null, stdout: false, quiet: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--out') opt.out = argv[++i];
    else if (a === '--file') opt.file = argv[++i];
    else if (a === '--config-dir') opt.configDir = argv[++i];
    else if (a === '--stdout') opt.stdout = true;
    else if (a === '--quiet') opt.quiet = true;
    else if (a === '--help' || a === '-h') { console.log('see header of wb_token_dump.js'); return 0; }
  }
  const log = (...a) => { if (!opt.quiet) console.log(...a); };

  const scriptDir = __dirname;
  const outPath = opt.out || path.join(scriptDir, 'token.info');
  const configDir = opt.configDir || path.join(os.homedir(), '.workbuddy');

  // 1) 主密钥
  let payload;
  try {
    payload = getKeyPayload();
  } catch (e) {
    console.error('[失败] 无法读取主密钥载荷:', e && e.message);
    console.error('       必须用 WorkBuddy 自带二进制运行本脚本：');
    console.error('       set ELECTRON_RUN_AS_NODE=1 && "<WorkBuddy 安装目录>\\WorkBuddy.exe" wb_token_dump.js');
    return 2;
  }
  const secret = payload && payload.atRestSecretKey;
  if (typeof secret !== 'string' || !secret) {
    console.error('[失败] 密钥载荷里没有 atRestSecretKey（策略可能为 off）');
    return 2;
  }
  const symmetricKey = crypto.createHash('sha256').update(secret, 'utf8').digest();
  log('[密钥] protectorKeyId =', deriveKeyId(symmetricKey));

  const userKey = unwrapKeyblob(readKeyblob(configDir), symmetricKey);
  log('[密钥] userKey       =', userKey ? deriveKeyId(userKey) : '(未解出，不影响 auth.* 字段)');

  // 2) 会话文件
  const sessPath = opt.file || defaultSessionFile();
  if (!sessPath) {
    console.error('[失败] 找不到会话文件 workbuddy-desktop.info');
    return 3;
  }
  log('[会话]', sessPath);

  let sess;
  try {
    sess = JSON.parse(fs.readFileSync(sessPath, 'utf8'));
  } catch (e) {
    console.error('[失败] 会话文件不是合法 JSON:', e && e.message);
    return 3;
  }

  // 3) 解密
  const stats = { ok: 0, fail: 0 };
  const plain = decryptTree(sess, [symmetricKey, userKey], stats);
  log('[解密] 成功', stats.ok, '个字段，失败', stats.fail, '个');

  if (stats.ok === 0) {
    console.error('[失败] 没有任何字段被解密，密钥或算法可能已变更');
    return 4;
  }

  const auth = plain.auth || {};
  const account = plain.account || {};
  const exp = jwtExp(auth.accessToken);
  log('[结果] uid    =', account.uid);
  log('[结果] domain =', auth.domain);
  log('[结果] token  =', typeof auth.accessToken === 'string'
    ? auth.accessToken.slice(0, 32) + '...(' + auth.accessToken.length + ' 字符)'
    : '<缺失>');
  log('[结果] 有效期 =', exp ? exp.toISOString() : '<无法解析>');

  if (opt.stdout) {
    process.stdout.write(JSON.stringify(plain));
    return 0;
  }

  try {
    fs.writeFileSync(outPath, JSON.stringify(plain, null, 2), 'utf8');
  } catch (e) {
    console.error('[失败] 写入', outPath, '失败:', e && e.message);
    return 4;
  }
  log('[输出]', outPath);
  if (opt.quiet) {
    console.log('OK uid=%s domain=%s exp=%s fields=%d',
      account.uid, auth.domain, exp ? exp.toISOString() : '?', stats.ok);
  }
  return 0;
}

let code = 1;
try {
  code = main();
} catch (e) {
  console.error('[异常]', (e && e.stack) || e);
  code = 1;
}
process.exit(code);
