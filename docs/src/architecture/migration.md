# Migration Playbook

This playbook guides contributors updating existing branches or forks to the
frontier foundations introduced in Sprints S-01–S-02.

## 1. Tooling Alignment

1. Pull latest `main` and install the pinned toolchains referenced by
   `rust-toolchain.toml` and `package.json`.
   ```sh
   rustup toolchain install stable
   pnpm env use --global 10
   ```
2. Let `rustup` honour `rust-toolchain.toml`; do not override the channel
   manually. If you work outside the devcontainer, ensure the same components
   (`clippy`, `rustfmt`, `wasm32-wasi`) are installed.
3. Run `just reproduce-build` to confirm deterministic builds before rebasing.

## 2. Repository Hygiene

- Sync CODEOWNERS changes and PR template updates (ADR link requirement).
- Remove local documentation placeholders; follow the new navigation structure.
- Update any scripts referencing Yarn/legacy commands to use `pnpm` or the
  `just` recipes (`just smoke`, `just reproduce-build`).

## 3. Agents and IPC

- Rebase agent work on top of the new orchestrator smoke tests.
- Regenerate UI types via `pnpm tauri specta` (or the provided script) after
  touching commands.
- Ensure telemetry spans are emitted for new agent messages.

## 4. Evaluation & Telemetry

- Add evaluation configs for new retrieval or planner features (`eval/`).
- Register metrics in the Prometheus exporter and document them in
  `docs/src/components/telemetry.md`.
- Link dashboards or reports in the PR description.

## 5. Wizard & UX

- Adopt the shared design tokens; migrate Tailwind classes where needed.
- Provide Storybook stories and Playwright tests for new/updated components.
- Verify accessibility (axe-core + keyboard traversal) before submitting PRs.

## 6. Release & CI

- Update Changesets to reflect user-facing changes.
- Keep `just smoke` green locally; CI will enforce it for PRs touching runtime
  code.
- For releases, confirm SBOM/provenance artefacts generate correctly.

## 7. Checklist Before Merge

- [ ] `just reproduce-build`
- [ ] `just smoke`
- [ ] Docs updated (including migration playbook if steps change)
- [ ] ADR referenced in PR template (if architectural impact)
- [ ] Telemetry + evaluation artefacts attached or linked

Refer to this playbook whenever picking up older branches or guiding
contributors through the migration.
