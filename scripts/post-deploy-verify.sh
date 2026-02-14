#!/usr/bin/env bash
set -euo pipefail

# 发布后自动验收脚本
# 用法：
#   bash scripts/post-deploy-verify.sh --path /posts/ai/2026-02-14-free-fs-enterprise-file-system/ --title "AI使用：开源企业文件管理 Free-FS 快速评估与落地建议"
# 可选：
#   --base https://weijia0707.com --retries 24 --interval 15

BASE_URL=""
POST_PATH=""
POST_TITLE=""
RETRIES=20
INTERVAL=15

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base)
      BASE_URL="$2"; shift 2 ;;
    --path)
      POST_PATH="$2"; shift 2 ;;
    --title)
      POST_TITLE="$2"; shift 2 ;;
    --retries)
      RETRIES="$2"; shift 2 ;;
    --interval)
      INTERVAL="$2"; shift 2 ;;
    -h|--help)
      sed -n '1,40p' "$0"
      exit 0 ;;
    *)
      echo "Unknown arg: $1"
      exit 1 ;;
  esac
done

if [[ -z "$POST_PATH" || -z "$POST_TITLE" ]]; then
  echo "❌ 必填参数缺失：--path 和 --title"
  exit 1
fi

if [[ -z "$BASE_URL" ]]; then
  if [[ -f hugo.toml ]]; then
    BASE_URL=$(awk -F '"' '/^baseURL[[:space:]]*=/{print $2; exit}' hugo.toml)
  fi
fi

if [[ -z "$BASE_URL" ]]; then
  BASE_URL="https://weijia0707.com"
fi

BASE_URL="${BASE_URL%/}"
POST_PATH="/${POST_PATH#/}"
POST_URL="${BASE_URL}${POST_PATH}"

fetch_ok() {
  local url="$1"
  local out="$2"
  local code
  code=$(curl -L -sS -o "$out" -w "%{http_code}" "$url" || true)
  [[ "$code" == "200" ]]
}

echo "[verify] base=${BASE_URL}"
echo "[verify] post=${POST_URL}"
echo "[verify] retries=${RETRIES}, interval=${INTERVAL}s"

i=1
while [[ $i -le $RETRIES ]]; do
  echo "\n[attempt ${i}/${RETRIES}]"

  tmp_home=$(mktemp)
  tmp_post=$(mktemp)
  tmp_sitemap=$(mktemp)

  home_ok=0
  post_ok=0
  sitemap_ok=0

  if fetch_ok "${BASE_URL}/" "$tmp_home"; then
    if grep -Fq "$POST_PATH" "$tmp_home"; then
      home_ok=1
      echo "✅ 首页已包含文章链接"
    else
      echo "⏳ 首页暂未包含文章链接"
    fi
  else
    echo "⏳ 首页请求失败"
  fi

  if fetch_ok "$POST_URL" "$tmp_post"; then
    if grep -Fq "$POST_TITLE" "$tmp_post"; then
      post_ok=1
      echo "✅ 文章页可访问且标题匹配"
    else
      echo "⏳ 文章页可访问，但标题未命中"
    fi
  else
    echo "⏳ 文章页请求失败"
  fi

  if fetch_ok "${BASE_URL}/sitemap.xml" "$tmp_sitemap"; then
    if grep -Fq "$POST_PATH" "$tmp_sitemap"; then
      sitemap_ok=1
      echo "✅ sitemap 已收录文章链接"
    else
      echo "⏳ sitemap 暂未收录文章链接"
    fi
  else
    echo "⏳ sitemap 请求失败"
  fi

  rm -f "$tmp_home" "$tmp_post" "$tmp_sitemap"

  if [[ $home_ok -eq 1 && $post_ok -eq 1 && $sitemap_ok -eq 1 ]]; then
    echo "\n🎉 发布验收通过"
    exit 0
  fi

  if [[ $i -lt $RETRIES ]]; then
    sleep "$INTERVAL"
  fi
  i=$((i+1))
done

echo "\n❌ 发布验收失败：在 ${RETRIES} 次重试后仍未全部通过"
exit 1
