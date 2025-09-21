#!/usr/bin/env bash
set -euo pipefail

# Requires: gh CLI authenticated (gh auth status)
# Creates/updates labels for sprints, priority, type, and area.

declare -A LABELS

# Sprint labels S-01..S-06
for s in 01 02 03 04 05 06; do
  LABELS["sprint:S-${s}"]=#0366d6
done

# Priority
LABELS["priority:urgent"]=#b60205
LABELS["priority:high"]=#d93f0b
LABELS["priority:medium"]=#fbca04
LABELS["priority:low"]=#0e8a16

# Types
LABELS["type:feature"]=#0052cc
LABELS["type:bug"]=#d73a4a
LABELS["type:docs"]=#0e8a16
LABELS["type:ops"]=#5319e7
LABELS["type:chore"]=#c5def5

# Areas
LABELS["area:orchestrator"]=#1f883d
LABELS["area:agents"]=#004d40
LABELS["area:ui"]=#0b5fff
LABELS["area:tauri"]=#6f42c1
LABELS["area:retrieval"]=#28a745
LABELS["area:planner"]=#17a2b8
LABELS["area:docs"]=#0366d6
LABELS["area:ci"]=#24292e

for name in "${!LABELS[@]}"; do
  color=${LABELS[$name]#\#}
  if gh label view "$name" &>/dev/null; then
    gh label edit "$name" --color "$color" --description "$name"
  else
    gh label create "$name" --color "$color" --description "$name" || true
  fi
done

echo "Labels ensured."
