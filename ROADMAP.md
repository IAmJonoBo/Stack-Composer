# Stack Composer – Next-Level Roadmap (excluding safety)

This roadmap focuses on planning/coordination, core logic, developer experience (DX), UX/UI, repo management, and frontier software development standards. It intentionally excludes safety topics for now.

See also: [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) for the authoritative, sprint-based plan.

## Milestones

- Now (0–2 sprints): Highest leverage, low risk, fast feedback
- Next (3–6 sprints): Medium scope with architectural impact
- Later (7+ sprints): Large/strategic initiatives and bets

---

## Now

### Planning & Coordination

- Lightweight RFC process (PR label `rfc` + template; timeboxed review, ADR when accepted)
- GitHub Projects board with automation (triage → ready → in-progress → review → done)
- Labels and priorities: `type:*`, `area:*`, `impact:*`, `blocked`, `good-first-issue`
- Weekly release notes draft via Changesets summaries

Acceptance criteria:

- RFC template and label live; at least 1 accepted RFC lands with ADR
- Project board enabled with default views; labels populated and used

### Developer Experience (DX) & CI/CD

- Adopt Changesets for versioning and release notes (aligns with pnpm workspaces)
- Conventional Commits + commitlint + PR title check
- Single-source code quality gate: `trunk check` plus Cargo and JS linters; PR annotations
- Incremental CI: matrix cache for Rust/Node, artifactable Tauri build
- Devcontainers (or Nix shell) for reliable env parity

Acceptance criteria:

- `changeset` workflow runs on main; prerelease + stable modes documented
- CI produces per-PR summary with quality status; cold build < cache-hit build by ≥50%

### Repo Management & Docs

- CODEOWNERS per area; Issue/PR templates (bug/feat/rfc)
- Docs quickstart hardening: copy-paste install and first-run verified
- Contributor guide links from PR template; ADR Primer in docs

Acceptance criteria:

- CODEOWNERS enforced in PRs; templates in use; doc links round-trip

### Logic & Quality

- Typed Tauri commands via `tauri-specta` (TS types generated from Rust)
- Tests: property-based (`proptest`) for orchestrator; snapshot (`insta`) for API/LLM prompts; micro-bench (`criterion`) for hot paths
- Determinism guardrails: pin seeds and feature flags for test modes

Acceptance criteria:

- TS types generated in UI from Rust; ≥3 property-based tests; ≥3 snapshot tests; ≥1 micro-benchmark tracked in CI

### UX/UI

- Design primitives: adopt a design system (e.g., Radix UI + Tailwind or Mantine)
- Storybook for UI components; visual regression with Playwright screenshots
- Onboarding path: “Import brief → Clarify → Preview stack → Export scaffold” with progress indicators

Acceptance criteria:

- Storybook runs; ≥5 core components documented; onboarding flow has a passing E2E test

---

## Next

### Planning & Coordination (Next)

- Roadmap views (Now/Next/Later boards); team capacity heuristics and WIP limits
- Release train cadence (e.g., fortnightly) with release checklist automation

### Developer Experience (DX) & CI/CD (Next)

- End-to-end tests for Tauri with Playwright + `@tauri-apps/cli` driver
- Split CI into reusable workflows; SBOM/provenance generation (no safety hardening here)
- Monorepo task graph viz (Just tasks + docs)

### Logic & Platform (Next)

- Retrieval upgrades: hybrid fusion tuning, RAG evaluation harness (Ragas-like metrics), ontology freshness gating
- Planner integration: temporal constraints surfaced in UI; partial plan repair on changed requirements
- Plugin SDK v1: capability contracts, semver’d host API, example signed WASI plugins

### UX/UI (Next)

- Information architecture: wizard + advanced “stack explorer” with rationale tooltips and “what-if” side panel
- Accessibility: target WCAG 2.2 AA; keyboard navigability and reduced-motion modes

---

## Later

### Planning & Coordination (Later)

- Structured Roadmap publishing (Docs site) with live status from labels/Projects

### Developer Experience (DX) & CI/CD (Later)

- Flaky test detection/quarantine; test-impact analysis for selective runs
- Performance CI with historical baselines; cold-start and interaction latency budgets

### Logic & Platform (Later)

- Advanced retrievers (late interaction/ColBERT-like or hybrid rerankers)
- Model/runtime adapters: seamless swap local/remote providers with evaluation plateaus tracked
- Domain template packs: ontologies and scaffolds for web, data, ML, gaming, embedded

### UX/UI (Later)

- Scenario planning playground: multi-criteria comparison of stacks with cost/operational risk sliders
- Collaborative reviews: per-requirement comments and change suggestions

---

## Cross-cutting Engineering Standards (frontier-focused)

- Deterministic builds: lockfiles, toolchain pinning, `repro` CI job verifying no-diff rebuilds
- Spec-first integration: OpenAPI/JSON Schema for config and plugin contracts; generated clients/types
- Strong typing across boundaries: Specta/serde for Rust↔TS; Zod or JSON Schema for runtime validation
- Quality bars: property-based tests, snapshot tests for outputs/prompts, perf budgets, and doc linting
- Documentation-as-contract: ADRs gate public API changes; Storybook and mdBook kept in lockstep via CI

---

## Getting Started (team)

- Create tracking issues for each Now item; link to this roadmap
- Enable Projects views and CODEOWNERS
- Add CI gates: Changesets, Conventional Commits, `trunk check`, core linters
- Schedule a 30–45 min weekly review to move RFCs and update the board
