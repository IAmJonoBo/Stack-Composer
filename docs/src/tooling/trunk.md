---
title: Trunk CLI — Lint & Format
---

# Trunk CLI — local usage & troubleshooting

We run our linters via Trunk for a single entrypoint across languages. Locally we
prefer fast, Node-based tools to avoid heavy native downloads; CI runs the full
matrix.

## Local commands

- Fast check (local):
  - scripts/trunk-check.sh
- Full reset if it hangs:
  - scripts/trunk-reset.sh

## What runs locally

- biome (TS/JS formatter+lint)
- markdownlint-cli2 (docs)
- git-diff-check (no large/binary diffs)

Native tools (actionlint, taplo, shellcheck, shfmt, yamllint) run in CI via
`pnpm run lint:trunk`.

## Troubleshooting

- Symptom: trunk check shows 0% and never advances
  - Fix: run scripts/trunk-reset.sh, then retry scripts/trunk-check.sh
- Symptom: JSON parse errors on package.json/tsconfig.json
  - Fix: look for merge conflict markers (<<<<<<<, =======, >>>>>>>) and resolve
- Symptom: “Binary not found” for native linters
  - Fix: ignore locally; CI runs those. Or install manually and add to PATH.

## CI usage

The root package.json includes "lint:trunk" which runs the native tool subset in
non-interactive mode with no progress UI. See .trunk/trunk.yaml for the list of
enabled linters.
