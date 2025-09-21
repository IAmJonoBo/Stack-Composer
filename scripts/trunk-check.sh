#!/usr/bin/env bash
set -euo pipefail

# Fast local trunk check with no progress UI and minimal noise.
# Accepts optional extra args to pass through to trunk.

FILTERS=${FILTERS:-"biome,markdownlint-cli2,git-diff-check"}

if ! command -v trunk >/dev/null 2>&1; then
  echo "[trunk-check] Trunk CLI not found. Installing…"
  REPO_ROOT="$(git rev-parse --show-toplevel)"
  INSTALL_SCRIPT="${REPO_ROOT}/install-trunk.sh"
  if [[ -x "${INSTALL_SCRIPT}" ]]; then
    bash "${INSTALL_SCRIPT}"
  else
    curl -fsSL https://get.trunk.io -o install-trunk.sh
    bash install-trunk.sh -y
  fi
fi

echo "[trunk-check] Running trunk check (filters: ${FILTERS})…"
ARGS=(--no-progress --filter "${FILTERS}" --print-failures "$@")
set +e
trunk check "${ARGS[@]}"
STATUS=$?
set -e
if [[ ${STATUS} -ne 0 ]]; then
  echo "[trunk-check] Trunk check failed, retrying with explicit upstream to avoid detection issues…"
  if UPSTREAM_COMMIT=$(git rev-parse --verify HEAD^ 2>/dev/null); then
    trunk check --upstream "${UPSTREAM_COMMIT}" "${ARGS[@]}"
  else
    echo "[trunk-check] No parent commit detected; falling back to --all"
    trunk check --all "${ARGS[@]}"
  fi
fi
