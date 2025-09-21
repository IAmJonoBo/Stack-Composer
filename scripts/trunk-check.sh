#!/usr/bin/env bash
set -euo pipefail

# Fast local trunk check with no progress UI and minimal noise.
# Accepts optional extra args to pass through to trunk.

FILTERS=${FILTERS:-"biome,markdownlint-cli2,git-diff-check"}

echo "[trunk-check] Running trunk check (filters: ${FILTERS})…"
trunk check --no-progress --filter "${FILTERS}" --print-failures "$@"
