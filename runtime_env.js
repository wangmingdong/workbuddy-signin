const fs = require('fs');
const path = require('path');

function firstExisting(candidates) {
  for (const p of candidates) {
    if (p && fs.existsSync(p)) return p;
  }
  return '';
}

function loadPlaywright() {
  const home = process.env.USERPROFILE || process.env.HOME || '';
  const candidates = [
    process.env.PLAYWRIGHT_CORE_PATH,
    'playwright-core',
    path.join(home, '.workbuddy', 'binaries', 'node', 'workspace', 'node_modules', 'playwright-core'),
  ].filter(Boolean);
  for (const c of candidates) {
    try {
      return require(c);
    } catch (e) {}
  }
  throw new Error(
    '未找到 playwright-core：请在仓库目录安装（npm i playwright-core），或设置 PLAYWRIGHT_CORE_PATH 指向其安装目录',
  );
}

function resolvePython() {
  if (process.env.PYTHON_PATH) return process.env.PYTHON_PATH;
  const home = process.env.USERPROFILE || process.env.HOME || '';
  const local = process.env.LOCALAPPDATA || '';
  const candidates = [
    path.join(home, '.workbuddy', 'binaries', 'python', 'versions', '3.13.12', 'python.exe'),
    path.join(home, '.workbuddy-ai', 'binaries', 'python', 'versions', '3.13.12', 'python.exe'),
    path.join(local, 'Programs', 'Python', 'Python313', 'python.exe'),
    path.join(local, 'Programs', 'Python', 'Python312', 'python.exe'),
  ];
  return firstExisting(candidates) || (process.platform === 'win32' ? 'python' : 'python3');
}

module.exports = { loadPlaywright, resolvePython };
