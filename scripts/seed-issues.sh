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
  gh issue create --title "${title}" --body "${body}" --label "${LABELS}" ${ASSIGNEE:+--assignee "${ASSIGNEE}"}
}

create_issue "S-01: Wire Changesets + Conventional Commits" $'Acceptance Criteria:\n- PR title check enforces Conventional Commits\n- Changesets configured; release notes pipeline stubbed\n- README docs updated\nEvidence: CI run, PR examples'
create_issue "S-01: Add CODEOWNERS and templates" $'Acceptance Criteria:\n- CODEOWNERS with ≥2 maintainers per area\n- Issue templates (bug/feature/RFC) and PR template (ADR section)\n- Templates used in 2+ new issues/PRs'
create_issue "S-01: Type-safe Rust↔TS with tauri-specta" $'Acceptance Criteria:\n- Specta-generated TS types checked into stack-ui\n- UI build fails if types are stale\n- Minimal smoke command proves orchestrator↔agent↔UI path'
create_issue "S-01: Baseline tests and benchmarks" $'Acceptance Criteria:\n- ≥3 proptests, ≥3 snapshot tests, ≥1 micro-benchmark\n- CI job publishes benchmark summary artefact\n- just smoke passes'
create_issue "S-01: Storybook + Playwright visual tests" $'Acceptance Criteria:\n- Storybook with ≥5 core components documented\n- Playwright screenshot baselines stored; job green\n- A11y check integrated in Storybook'
create_issue "S-01: Docs lint/link checks + _includes" $'Acceptance Criteria:\n- markdownlint + Vale + link checker jobs green\n- docs/_includes wired; navigation cleaned\n- Migration playbook published'

echo "Seeded S-01 issues."
