#!/usr/bin/env bash
# Log Fast Downward binary SHA-256 for SBOM compliance
set -e
if command -v fast-downward >/dev/null 2>&1; then
	sha256sum "$(command -v fast-downward)" >fast_downward.sha256 || true
	echo "Fast Downward SHA-256 logged to fast_downward.sha256"
else
	echo "fast-downward not found in PATH; skipping SHA-256 log"
fi
