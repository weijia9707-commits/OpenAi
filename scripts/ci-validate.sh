#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Build Hugo"
hugo --minify

echo "[2/3] Validate key files don't contain placeholder *****"
if grep -R "\*\*\*\*\*" README.md hugo.toml layouts content/privacy.md static/llms.txt 2>/dev/null; then
  echo "❌ Placeholder ***** found in key files"
  exit 1
fi

echo "[3/3] Check required quick links exist in generated site"
required=(
  "public/categories/ai实战/index.html"
  "public/categories/ai原理/index.html"
  "public/categories/ai工具/index.html"
  "public/games/index.html"
)
for p in "${required[@]}"; do
  if [[ ! -f "$p" ]]; then
    echo "❌ Missing generated page: $p"
    exit 1
  fi
done

echo "✅ CI validation passed"
