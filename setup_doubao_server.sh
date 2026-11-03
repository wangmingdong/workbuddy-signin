#!/usr/bin/env bash
# =====================================================================
# 112 服务器：部署「豆包服务端签名器」(方案二)
# 作用：把 a_bogus 签名代理搬到服务器，使其能独立代签豆包，本机电脑关机也能签。
#
# 用法（在 112 上，项目目录 /opt/wb-checkin 下执行）：
#   bash setup_doubao_server.sh
#
# 前置：系统已装好 node / npm（Ubuntu: apt-get install -y nodejs npm）。
#       本脚本会装 playwright + chromium 及系统依赖。
# =====================================================================
set -e
cd /opt/wb-checkin

echo "[0/5] 确保 node >= 18 (Playwright 要求) ..."
if ! command -v node >/dev/null 2>&1 || [ "$(node -v 2>/dev/null | tr -d 'v' | cut -d. -f1)" -lt 18 ]; then
  echo "  未检测到合格 node，通过 NodeSource 安装 Node 22 ..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

echo "[1/5] 安装 playwright 依赖 ..."
npm init -y >/dev/null 2>&1 || true
npm install playwright@latest

echo "[2/5] 下载 chromium 浏览器 ..."
npx playwright install chromium
echo "[2b] 安装浏览器系统依赖(需 root) ..."
# ⚠️ 重要：npx playwright install-deps 只支持 Debian/Ubuntu(apt)。在 RHEL/CentOS/Alibaba Cloud
#    Linux(yum/dnf) 上它会失败；旧版这里用 `|| echo 可忽略` 把失败吞掉了，导致浏览器系统库
#    从未装上 → chrome-headless-shell 静默起不来 → 签名服务日志刷 "Target page, context or
#    browser has been closed"，而 systemd 只看到进程还活着，永远不会重启。务必别再吞错误。
if command -v apt-get >/dev/null 2>&1; then
  npx playwright install-deps chromium || {
    echo "  [X] playwright install-deps 失败，请检查 apt 源"; exit 1; }
elif command -v dnf >/dev/null 2>&1 || command -v yum >/dev/null 2>&1; then
  echo "  检测到 yum/dnf 系发行版，手动安装 Chromium 运行依赖 ..."
  CHROMIUM_DEPS="atk at-spi2-atk at-spi2-core libXcomposite libXdamage libXfixes libXrandr \
mesa-libgbm alsa-lib nss nspr cups-libs pango cairo libdrm libxkbcommon libXtst libXi"
  if command -v dnf >/dev/null 2>&1; then
    dnf install -y $CHROMIUM_DEPS || { echo "  [X] dnf 安装依赖失败"; exit 1; }
  else
    yum install -y $CHROMIUM_DEPS || { echo "  [X] yum 安装依赖失败"; exit 1; }
  fi
else
  echo "  [X] 未识别的包管理器，请手动安装 Chromium 系统依赖"; exit 1
fi

echo "[2c] 校验无头浏览器能否真正启动(依赖没装齐时浏览器会静默起不来) ..."
CHROME_BIN=$(ls -d /root/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)
if [ -n "$CHROME_BIN" ]; then
  _VER=$("$CHROME_BIN" --version 2>&1 || true)
  case "$_VER" in
    *"error while loading"*|*"cannot open shared object"*)
      echo "  [X] 浏览器仍缺系统依赖：$_VER"
      echo "      请补装对应软件包后重跑本脚本。"
      exit 1 ;;
    *) echo "  OK: $_VER" ;;
  esac
else
  echo "  [warn] 未找到 chrome-headless-shell 二进制，跳过校验"
fi

echo "[3/5] 注册 systemd 服务 wb-doubao-sign ..."
cp wb-doubao-sign.service /etc/systemd/system/wb-doubao-sign.service
systemctl daemon-reload
systemctl enable wb-doubao-sign
systemctl restart wb-doubao-sign
sleep 2
systemctl status wb-doubao-sign --no-pager | head -n 6 || true

echo "[4/5] 给 wb-checkin 注入 DOUBAO_SIGNER_URL(让每日自动签到调本机签名服务) ..."
# 在 wb-checkin.service 的 [Service] 段追加 Environment（幂等：先删旧行再加）
SED=$(command -v sed)
if [ -f /etc/systemd/system/wb-checkin.service ]; then
  $SED -i '/^Environment=DOUBAO_SIGNER_URL=/d' /etc/systemd/system/wb-checkin.service
  # 在首个 [Service] 之后的第一个空行或 ExecStart 前插入
  $SED -i '/^\[Service\]/a Environment=DOUBAO_SIGNER_URL=http://127.0.0.1:8791' /etc/systemd/system/wb-checkin.service
  systemctl daemon-reload
  systemctl restart wb-checkin
  echo "  wb-checkin 已重启并启用 DOUBAO_SIGNER_URL"
else
  echo "  未找到 /etc/systemd/system/wb-checkin.service，请手动在 wb-checkin 的 [Service] 段加："
  echo "  Environment=DOUBAO_SIGNER_URL=http://127.0.0.1:8791"
fi

echo "[5/5] 完成。接下来需要把豆包登录态(cookie)推到 112："
echo "  在本机：确保 doubao_sign.js 正在运行，浏览器打开 http://127.0.0.1:8791/sync-cookie 一次即可推送；"
echo "  之后本机会每 30 分钟自动续传，服务器据此独立代签。"
echo "  校验：curl -s 'http://127.0.0.1:8791/health' 应返回 ok:true 且 hasCookie:true"
