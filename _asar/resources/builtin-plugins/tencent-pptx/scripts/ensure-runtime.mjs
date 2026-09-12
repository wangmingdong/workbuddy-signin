#!/usr/bin/env node
/**
 * PreToolUse hook — 在 sub-agent 调用 Skill('tencent-pptx') 时确保运行时依赖就位：
 *   用 WorkBuddy 托管的 node 装好需要的 npm 包（slidep@5.4.1）。
 *
 * fail-open：任何环节失败都不 deny，只通过 systemMessage 提示。Skill 文档本身不依赖二进制。
 *
 * 设计要点：
 *  - 走 WorkBuddy 注入的 NODE_BIN_DIR（见系统提示规则），缺失时再 fallback 到 PATH 上的 node。
 *    这样和 WorkBuddy 的 "managed node + 隔离安装" 约定对齐，避免 sudo / 全局污染。
 *  - 包装到 WorkBuddy 托管 node 自身的 npm prefix（跟 WorkBuddy 自带的 slidep 同级布局）：
 *      ~/.workbuddy/binaries/node/versions/<v>/bin/<bin>
 *      ~/.workbuddy/binaries/node/versions/<v>/lib/node_modules/<pkg>/
 *    用 `npm install -g --prefix=<nodeRoot>` 锁定，避免被 ~/.npmrc 劫持到 nvm/系统全局。
 *  - slidep@5.4.1 以 vendor tar.gz 随插件分发，首次使用时本地 npm install，无运行时网络拉取。
 */

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PLUGIN_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SLIDEP_VENDOR_TARBALL = join(PLUGIN_ROOT, 'vendor', 'tencent-slidep-5.4.1.tar.gz');

const TARGET_SKILL = 'tencent-pptx';
const INSTALL_TIMEOUT_MS = 120_000;

// ---------- helpers ----------

function emit(payload) {
  process.stdout.write(JSON.stringify(payload, null, 2));
  process.stdout.write('\n');
  process.exit(0);
}
function pass(systemMessage) {
  emit(systemMessage ? { systemMessage } : {});
}

async function readStdin() {
  let data = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

function extractSkillName(toolInput) {
  if (!toolInput || typeof toolInput !== 'object') return null;
  const candidates = ['skill', 'command', 'name', 'skill_name', 'skillName'];
  for (const k of candidates) {
    const v = toolInput[k];
    if (typeof v === 'string' && v.length > 0) return v.trim();
  }
  if (typeof toolInput.args === 'string') {
    return toolInput.args.trim().split(/\s+/)[0] ?? null;
  }
  return null;
}

// ---------- WorkBuddy node 解析 ----------

/**
 * 优先级：
 *   1. NODE_BIN_DIR（WorkBuddy 注入）
 *   2. ~/.workbuddy/binaries/node/versions/<latest>/bin
 *   3. PATH 上的 node（fallback）
 * 返回 { nodeBin, npmBin, nodeRoot, source }；nodeRoot 是可作 npm --prefix 的根。
 */
function resolveNodeBin() {
  const fromEnv = process.env.NODE_BIN_DIR;
  if (fromEnv && existsSync(join(fromEnv, 'node'))) {
    // <root>/bin/node → <root>
    const nodeRoot = dirname(fromEnv) === '/' ? fromEnv : dirname(fromEnv);
    return {
      nodeBin: join(fromEnv, 'node'),
      npmBin: join(fromEnv, 'npm'),
      nodeRoot,
      source: 'NODE_BIN_DIR',
    };
  }

  const wbVersionsDir = join(homedir(), '.workbuddy', 'binaries', 'node', 'versions');
  if (existsSync(wbVersionsDir)) {
    try {
      // 取数值最大的版本号目录（22.22.2 > 20.18.0）
      const dirs = readdirSync(wbVersionsDir, { withFileTypes: true })
        .filter((e) => e.isDirectory() && /^\d+\.\d+\.\d+$/.test(e.name))
        .map((e) => e.name)
        .sort((a, b) => {
          const pa = a.split('.').map(Number);
          const pb = b.split('.').map(Number);
          for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pb[i] - pa[i];
          return 0;
        });
      for (const v of dirs) {
        const root = join(wbVersionsDir, v);
        const bin = join(root, 'bin');
        if (existsSync(join(bin, 'node'))) {
          return {
            nodeBin: join(bin, 'node'),
            npmBin: join(bin, 'npm'),
            nodeRoot: root,
            source: `workbuddy@${v}`,
          };
        }
      }
    } catch {
      // ignore
    }
  }

  // last resort：PATH 上的 node。无法精确推断 nodeRoot，留 null。
  return { nodeBin: 'node', npmBin: 'npm', nodeRoot: null, source: 'PATH' };
}

// ---------- 安装 / 探测（slidep） ----------

// 装到 WorkBuddy 托管 node 自身的 npm prefix（跟 WorkBuddy 已自带的 slidep 同级布局）：
//   ~/.workbuddy/binaries/node/versions/<v>/bin/<pkg-bin>            (软链)
//   ~/.workbuddy/binaries/node/versions/<v>/lib/node_modules/<pkg>/
//
// 用 `npm install -g --prefix=<nodeRoot>` 锁定，避免 ~/.npmrc 把 prefix 劫持到
// nvm/系统全局。--prefix 路径在调用时由 resolveNodeBin() 给出。
//
// 探测命中 lib/node_modules/<pkg>/package.json 即视作已装。

/**
 * 单个待装包的描述。
 * - npmName       : 在 registry 里的真实包名（含 scope，仅 install 时引用）
 * - dirName       : 在 lib/node_modules/ 下的目录名（scoped 包就是 @scope/name）
 * - binName       : <prefix>/bin/ 下的可执行入口（用于用户参考）
 * - registry      : 可选，覆盖默认 registry
 * - tarball       : 可选，本地 tgz 路径；优先于 npmName。固定版本时用。
 * - expectVersion : 可选，配合 tarball 校验装好后版本是否符合预期；不符也视为失败。
 *
 * Slidep 使用插件 vendor 目录内的钉版本 tar.gz（与上游 skill setup 同源、同版本）。
 */
const PACKAGES = [
  {
    npmName: '@tencent/slidep',
    dirName: '@tencent/slidep',
    binName: 'slidep',
    tarball: SLIDEP_VENDOR_TARBALL,
    expectVersion: '5.4.1',
  },
];

function pkgPathsFor(nodeRoot, pkg) {
  if (!nodeRoot) return null;
  return {
    bin: join(nodeRoot, 'bin', pkg.binName),
    pkgJson: join(nodeRoot, 'lib', 'node_modules', pkg.dirName, 'package.json'),
    home: nodeRoot,
  };
}

function readInstalledVersion(paths) {
  if (!paths) return null;
  if (!existsSync(paths.pkgJson)) return null;
  try {
    return JSON.parse(readFileSync(paths.pkgJson, 'utf8')).version ?? null;
  } catch {
    return null;
  }
}

function installPackage(npmBin, nodeRoot, pkg) {
  if (!nodeRoot) {
    return { ok: false, stderr: 'no nodeRoot resolved (PATH fallback cannot --prefix)' };
  }
  // 本地 vendor tgz 优先（钉死版本），否则按 npmName 走 registry。
  const target = pkg.tarball || pkg.npmName;
  if (pkg.tarball && !existsSync(pkg.tarball)) {
    return { ok: false, stderr: `bundled tarball missing: ${pkg.tarball}` };
  }
  const args = [
    'install',
    '-g',
    `--prefix=${nodeRoot}`,
    '--no-audit',
    '--no-fund',
    '--registry=https://mirrors.tencent.com/npm/',
    '--canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas',
    target,
  ];
  const r = spawnSync(npmBin, args, {
    encoding: 'utf8',
    timeout: INSTALL_TIMEOUT_MS,
    env: { ...process.env, npm_config_prefix: nodeRoot },
  });
  if (r.status === 0) return { ok: true };
  // npm 报错信息基本都在 stderr，把头几行一起带出来便于排错
  const errText = (r.stderr || r.stdout || '').trim();
  return { ok: false, stderr: errText.slice(0, 800) };
}

/**
 * 确保所有 PACKAGES 都装好。返回每个包的装/探测状态，方便 systemMessage 汇报。
 *
 * 触发安装的两种条件：
 *   1) 没装（pkgJson 不存在）
 *   2) 有 expectVersion 但本地版本不匹配（强制对齐 skill setup.js 钉的版本）
 */
function ensureAllPackages(npmBin, nodeRoot) {
  const results = [];
  for (const pkg of PACKAGES) {
    const paths = pkgPathsFor(nodeRoot, pkg);
    let version = readInstalledVersion(paths);
    let installed = false;
    let stderr;

    const versionMismatch = pkg.expectVersion && version && version !== pkg.expectVersion;
    if (!version || versionMismatch) {
      const r = installPackage(npmBin, nodeRoot, pkg);
      if (r.ok) {
        version = readInstalledVersion(paths);
        installed = true;
        // tarball 装完后再校验一遍版本（vendor tar.gz 的内容理论上是钉死的，多一道兜底）
        if (pkg.expectVersion && version !== pkg.expectVersion) {
          stderr = `version mismatch after install: got ${version}, expected ${pkg.expectVersion}`;
        }
      } else {
        stderr = r.stderr;
      }
    }
    results.push({ pkg, paths, version, installed, stderr });
  }
  return results;
}

// ---------- main ----------

async function main() {
  let payload;
  try {
    const raw = await readStdin();
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return pass();
  }

  if (payload.tool_name !== 'Skill' && payload.tool_name !== 'UseSkill') return pass();
  if (extractSkillName(payload.tool_input) !== TARGET_SKILL) return pass();

  const { npmBin, nodeRoot, source: nodeSource } = resolveNodeBin();

  // 装好 slidep（已装则跳过）
  const results = ensureAllPackages(npmBin, nodeRoot);

  // 汇报：每个包一条短状态
  const summary = results
    .map((r) => {
      if (r.version) {
        return `${r.pkg.binName}@${r.version}${r.installed ? ` (installed via ${nodeSource})` : ''}`;
      }
      const why = r.stderr ? r.stderr.split('\n').slice(0, 1)[0] : 'unknown error';
      return `${r.pkg.binName} FAILED: ${why}`;
    })
    .join('; ');

  return pass(`[tencent-pptx][ensure-runtime] ${summary}; node=${nodeSource}`);
}

main().catch(() => pass());
