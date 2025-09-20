#!/usr/bin/env bash
set -euo pipefail

# Seeds GitHub issues for S-01 deliverables using gh CLI.
# Prereqs: gh auth login; repo is set (gh repo set-default ...)

ASSIGNEE=""
LABELS="sprint:S-01,priority:high"

create_issue() {
  local title="$1"
  shift
  local body="$1"
  shift
  gh issue create --title "$title" --body "$body" --label "$LABELS" ${ASSIGNEE:+--assignee "$ASSIGNEE"}
}

create_issue "S-01: Wire Changesets + Conventional Commits" "Add commitlint/PR title check, configure Changesets, document workflow in README."
create_issue "S-01: Add CODEOWNERS and templates" "Create CODEOWNERS, bug/feature/RFC issue templates, and PR template."
create_issue "S-01: Type-safe Rust↔TS with tauri-specta" "Generate TS types from Rust commands and integrate into UI build."
create_issue "S-01: Baseline tests and benchmarks" "Add ≥3 property-based tests, ≥3 snapshot tests, and ≥1 micro-benchmark tracked in CI."
create_issue "S-01: Storybook + Playwright visual tests" "Document ≥5 core components and configure screenshot baselines."
create_issue "S-01: Docs lint/link checks + _includes" "Remove placeholders; enable markdownlint, Vale, and link checking in CI."

echo "Seeded S-01 issues."
