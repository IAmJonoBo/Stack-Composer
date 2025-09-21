# Projects & Sprint Tracking

- GitHub Projects board: create views for Backlog, Sprint, and Done.
- Use labels `type:*`, `area:*`, `impact:*`, and `sprint:S-01` etc.
- Seed initial Sprint S-01 issues with the helper script:

```bash
chmod +x scripts/seed-issues.sh
./scripts/seed-issues.sh
```

- During weekly review (30–45 min):
  - Move items across the board; enforce WIP limits.
  - File RFCs with label `rfc`; accepted RFCs become ADRs.

Refer to `PROJECT_BRIEF.md` for sprint objectives and acceptance criteria.

## Automation: Auto-add Issues/PRs to Project

This repo includes a workflow `.github/workflows/add-to-project.yml` that automatically adds newly opened issues and pull requests to the user Project at:

- https://github.com/users/IAmJonoBo/projects/2

Setup steps:

1. Create a fine-grained PAT with access to Projects (read and write) and repository (read) for this repo. Name the secret in this repo settings as `ADD_TO_PROJECT_PAT`.

2. Ensure the Project has a single-select field named `Status` with a `Triage` option. You can provision common options with the helper script:

```bash
chmod +x scripts/setup-project.sh
./scripts/setup-project.sh
```

The workflow uses the PAT to add items to the Project and sets `Status` to `Triage` when possible.

### Status sync workflow

There is also a workflow that keeps the Project `Status` in sync on lifecycle events:

- File: `.github/workflows/project-status-sync.yml`
- Mapping:
  - Issue closed → `Done`
  - Issue reopened → `Selected`
  - PR closed → `Done`
  - PR reopened → `In Review`
  - PR ready_for_review → `In Review`
  - PR converted_to_draft → `In Progress`

You can adjust the mapping by editing the small switch logic in the workflow’s GitHub Script step.
