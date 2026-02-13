#!/usr/bin/env bash
set -euo pipefail

echo "[audit] scanning content for possible sensitive placeholders..."

# Allowed demo placeholders are okay, but hard secrets/patterns should fail CI.
patterns=(
  "sk-[A-Za-z0-9_-]{16,}"
  "AKIA[0-9A-Z]{16}"
  "ghp_[A-Za-z0-9]{20,}"
  "BEGIN (RSA|OPENSSH|EC) PRIVATE KEY"
)

failed=0
for p in "${patterns[@]}"; do
  if grep -RInE "$p" content static README.md 2>/dev/null; then
    echo "❌ matched sensitive pattern: $p"
    failed=1
  fi
done

if [[ $failed -ne 0 ]]; then
  echo "content audit failed"
  exit 1
fi

echo "✅ content audit passed"
