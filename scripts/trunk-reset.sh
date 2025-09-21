#!/usr/bin/env bash
set -euo pipefail

# Reset Trunk CLI when it hangs or plugins get into a bad state.
# Safe to run repeatedly. Intended for local developer use.

echo "[trunk-reset] Checking daemon status…"
if trunk daemon status >/dev/null 2>&1; then
  echo "[trunk-reset] Stopping Trunk daemon…"
  trunk daemon shutdown || true
fi

CACHE_DIR="${HOME}/.cache/trunk"
echo "[trunk-reset] Clearing plugin caches under ${CACHE_DIR}…"
rm -rf "${CACHE_DIR}/plugins-repos" || true
rm -rf "${CACHE_DIR}/plugins-out" || true
rm -rf "${CACHE_DIR}/out" || true
rm -rf "${CACHE_DIR}/logs" || true

REPO_TRUNK_DIR="$(git rev-parse --show-toplevel)/.trunk"
if [[ -d "${REPO_TRUNK_DIR}/logs" || -L "${REPO_TRUNK_DIR}/logs" ]]; then
  echo "[trunk-reset] Cleaning .trunk/logs…"
  rm -rf "${REPO_TRUNK_DIR}/logs" || true
fi

echo "[trunk-reset] Ensuring Trunk is installed and up to date…"
if ! command -v trunk >/dev/null 2>&1; then
  echo "[trunk-reset] Installing Trunk…"
  curl -fsSL https://get.trunk.io -o install-trunk.sh
  bash install-trunk.sh -y
fi

echo "[trunk-reset] Starting fresh Trunk daemon on next command. Done."
