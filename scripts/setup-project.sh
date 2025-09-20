#!/usr/bin/env bash
set -euo pipefail

# Setup GitHub Projects (beta) fields and options for user project
# Requirements:
# - gh CLI v2.40+ (for GraphQL and Projects support)
# - A fine-grained PAT with project and repo read/write scopes exported as GH_TOKEN or set as a secret
# - jq installed

USER_LOGIN="IAmJonoBo"
PROJECT_NUMBER=2

if ! command -v gh >/dev/null 2>&1; then
  echo "ERROR: gh CLI is required. Install from https://github.com/cli/cli" >&2
  exit 1
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq is required. Install via 'brew install jq'" >&2
  exit 1
fi

# If ADD_TO_PROJECT_PAT is set, prefer it; else rely on GH_TOKEN/gh auth
if [[ -n ${ADD_TO_PROJECT_PAT-} && -z ${GH_TOKEN-} ]]; then
  export GH_TOKEN="$ADD_TO_PROJECT_PAT"
fi

# Get project id and fields
PROJECT_JSON=$(gh api graphql -f query='query($login:String!,$number:Int!){ user(login:$login){ projectV2(number:$number){ id fields(first:100){ nodes{ __typename ... on ProjectV2FieldCommon{ id name } ... on ProjectV2SingleSelectField{ id name options{ id name } } } } } } }' -F login="$USER_LOGIN" -F number=$PROJECT_NUMBER)
PROJECT_ID=$(echo "$PROJECT_JSON" | jq -r '.data.user.projectV2.id')

if [[ -z $PROJECT_ID || $PROJECT_ID == "null" ]]; then
  echo "ERROR: Could not resolve project id. Ensure the project exists and your token has access." >&2
  exit 1
fi

echo "Project ID: $PROJECT_ID"

# Ensure Status single-select field exists with options
STATUS_FIELD_ID=$(echo "$PROJECT_JSON" | jq -r '.data.user.projectV2.fields.nodes[] | select(.name=="Status" and .__typename=="ProjectV2SingleSelectField") | .id') || true
if [[ -z $STATUS_FIELD_ID ]]; then
  echo "Creating 'Status' field..."
  CREATE_FIELD_JSON=$(gh api graphql -f query='mutation($projectId:ID!){ createProjectV2Field(input:{ projectId:$projectId, dataType:SINGLE_SELECT, name:"Status"}){ projectV2Field{ __typename ... on ProjectV2FieldCommon{ id name } } } }' -F projectId="$PROJECT_ID")
  STATUS_FIELD_ID=$(echo "$CREATE_FIELD_JSON" | jq -r '.data.createProjectV2Field.projectV2Field.id')
fi

echo "Status Field ID: $STATUS_FIELD_ID"

# Ensure required options exist
REQUIRED_OPTIONS=("Triage" "Backlog" "Selected" "In Progress" "Blocked" "In Review" "Done")

# Fetch current options
FIELDS_JSON=$(gh api graphql -f query='query($projectId:ID!){ node(id:$projectId){ ... on ProjectV2{ fields(first:100){ nodes{ __typename ... on ProjectV2SingleSelectField{ id name options{ id name } } } } } } }' -F projectId="$PROJECT_ID")
CURRENT_OPTIONS=$(echo "$FIELDS_JSON" | jq -r --arg FIELD "$STATUS_FIELD_ID" '.data.node.fields.nodes[] | select(.id==$FIELD) | .options[].name')

for opt in "${REQUIRED_OPTIONS[@]}"; do
  if ! echo "$CURRENT_OPTIONS" | grep -Fxq "$opt"; then
    echo "Adding Status option: $opt"
    gh api graphql -f query='mutation($projectId:ID!,$fieldId:ID!,$name:String!){ updateProjectV2SingleSelectField(input:{ projectId:$projectId, fieldId:$fieldId, name:"Status", options:{ add:[{ name:$name }] } }){ projectV2SingleSelectField{ id name } } }' -F projectId="$PROJECT_ID" -F fieldId="$STATUS_FIELD_ID" -F name="$opt" >/dev/null
  fi
done

echo "Project setup complete."
