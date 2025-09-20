# Stack Composer – Frontier Roadmap (excluding safety)

This roadmap lays out the path to a frontier-grade Stack Composer release. It
connects governance, runtime architecture, intelligence quality, developer
experience, and user activation in a single program view. Safety topics remain
tracked separately.

See also: [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) for the sprint-by-sprint cut of
this plan.

## Milestones

- **Now (0–2 sprints)** – Finish the migration to frontier foundations, wire up
  end-to-end governance, light up observability, and deliver the first usable
  wizard loop.
- **Next (3–6 sprints)** – Expand retrieval intelligence, planner depth, and
  plugin ecosystem while hardening CI/CD and experience instrumentation.
- **Later (7+ sprints)** – Tackle strategic bets: distributed runtimes, AI
  assistants, marketplace maturation, and enterprise-grade operations.

---

## Now

### Program & Governance

- Stand up Architecture Council with weekly design review; publish decisions via
  ADRs (and require ADR references in every structural PR).
- Automate GitHub Projects views for Roadmap, Sprint, and Migration swimlanes;
  enforce WIP limits and definition-of-ready checks.
- Seed quarterly OKR scorecards covering product, DX, quality, and docs.

#### Acceptance criteria (Program & Governance)

- Architecture sync on calendar; meeting notes + ADR IDs linked in Projects.
- Projects board auto-triages issues with lane-specific workflows; OKRs baselined
  and shared in repo (`docs/OKRS.md`).

### Platform Foundations

- Pin toolchains (`rust-toolchain.toml`, `pnpm`/Tauri versions) and document
  reproducible build steps (devcontainer + Nix shell parity).
- Finalise repository automation: CODEOWNERS with ≥2 maintainers per area, PR
  templates enforcing docs/ADR links, Changesets pipelines.
- Complete migration of docs and configs (remove placeholders, align SUMMARY.md,
  add navigation landing pages).

#### Acceptance criteria (Platform Foundations)

- Toolchain pins committed; `just reproduce-build` verifies deterministic builds
  locally and in CI.
- Docs navigation free of placeholders; quick-start, installation, and
  architecture bundles green in lint/link pipelines.

### Intelligence & Retrieval

- Implement ingestion, retrieval, critic, and telemetry agent baselines with
  smoke-test coverage and instrumentation.
- Ship retrieval evaluation harness (seed 100 Q/A pairs, nDCG@{5,10}, P/R,
  faithfulness, hallucination checks) and publish the first dashboard.
- Generate typed IPC contracts via `tauri-specta`, consumed by UI and planner
  modules.

#### Acceptance criteria (Intelligence & Retrieval)

- `cargo xtask smoke` executes end-to-end agent pass; telemetry captures span
  IDs for each request.
- Evaluation harness runs in CI nightly; dashboard artefact uploaded and linked
  in Projects.
- UI type generation pipeline gates PRs touching commands.

### Experience & Activation

- Adopt unified design system (shadcn/Radix + Tailwind v4 tokens shared between
  app and Storybook) and migrate existing components.
- Deliver onboarding wizard v1 (Import → Clarify → Preview → Export) with
  rationale tooltips, draft citations, and reduced-motion mode.
- Stand up Storybook with Playwright visual regression and deploy previews per
  PR.

#### Acceptance criteria (Experience & Activation)

- Storybook build + visual regression job required in CI; 5+ components documented.
- Wizard flow available behind feature flag, shipping persistence + citations.
- Accessibility checks (axe-core + keyboard traversal) pass for onboarding path.

### Observability & Evaluation

- OpenTelemetry pipelines for orchestrator and agents with trace IDs surfaced in
  UI dev tools.
- Metrics exporter (Prometheus) capturing request latency, plan solve time,
  retrieval hit metrics.
- Baseline performance budgets: cold start < 90s, plan solve < 15s (median).

#### Acceptance criteria (Observability & Evaluation)

- `telemetry.md` updated with endpoints and dashboards; CI uploads traces for
  failing tests.
- Budget regression alarms configured (GitHub status checks) and dashboards linked.

### Migration Readiness

- Close outstanding placeholder/legacy docs; add migration tracker table in
  `docs/src/architecture/roadmap.md`.
- Publish “Migration Playbook” outlining steps for contributors upgrading from
  pre-frontier branches (toolchain changes, doc links, new commands).
- Ensure end-to-end tests run clean on macOS, Ubuntu, and Windows/WSL.

#### Acceptance criteria (Migration Readiness)

- Migration playbook committed under `docs/src/architecture/migration.md` and
  referenced from README + onboarding docs.
- Cross-platform CI green; backlog renamed/labelled to align with new roadmap.

---

## Next

### Program & Governance (Next)

- Introduce dual-track discovery (Experience + Core) with shared cadence.
- Publish monthly frontier scorecard summarising evaluation metrics, DX KPIs,
  docs impact, and community velocity.
- Run quarterly roadmap retro to re-balance Now/Next/Later lanes.

### Platform & Runtime (Next)

- Modularise orchestrator into micro-crates; enable wasm compilation for agents.
- Implement distributed cache layer for retrieval (Qdrant/Meilisearch
  clustering); support remote data sources via adapters.
- Deliver reproducible task graphs in CI with change impact analysis.

### Intelligence & Retrieval (Next)

- Reranker service (ONNX or vLLM) behind async queue; late interaction scoring.
- Planner partial repair loop with constraint deltas and timeline visualisation.
- Plugin SDK v1 GA: signed WASI plugins, capability validation CLI, marketplace
  staging site.
- Evaluation expansion: synthetic dataset generation, failure classification,
  and bias audits.

### Experience & Activation (Next)

- “Stack explorer” with multi-path comparisons, cost/risk sliders, and scenario
  bookmarking.
- A11y certification (WCAG 2.2 AA) via independent audit; document remediation
  backlog.
- Copilot interactions: inline clarifications, plan diffs, and historical trail.

### Operations & Commercialisation (Next)

- Release engineering: signed binaries, reproducible SBOM + provenance, release
  train automation.
- Telemetry aggregation backend (optional cloud) with anonymised opt-in upload.
- Docs-as-product: versioned mdBook site, API reference generated from Specta.

---

## Later

### Program & Governance (Later)

- Community steering committee, RFC voting, incubator program for plugins.
- Partner integrations roadmap (cloud runtimes, data platforms) with shared SLAs.

### Platform & Runtime (Later)

- Federated orchestrators (cluster mode, multi-node scheduling, gossip health).
- Cross-platform binary distribution with auto-update and delta sync.
- Policy engine for capability enforcement (Rego/WASM-based).

### Intelligence & Retrieval (Later)

- GraphRAG with knowledge graph enrichment, embeddings distillation, and active
  learning loops.
- Model adapters (local Ollama, remote vLLM/TGI, hosted GPUs) with evaluation
  plateaus and automated fallback.
- Autonomous remediation: planner + critic auto-iterate until constraints
  satisfied, with human-in-the-loop checkpoints.

### Experience & Activation (Later)

- Scenario planning playground with collaborative review, inline comments, and
  meeting export.
- Real-time scaffold preview (tree + diff) with streaming updates.
- Guided modernization flows for importing legacy repos and generating upgrade
  plans.

### Operations & Commercialisation (Later)

- Enterprise features: RBAC, key management, offline licence bundles, audit log.
- Marketplace GA with revenue sharing, automated security scanning, and trust
  signals.
- SaaS control plane option with multi-tenant data isolation.

---

## Migration & Sprint Kickoff

- **Sprint S-01 (Migration & Foundations)** – Ship toolchain pins, baseline
  agents, documentation cleanup, and wizard skeleton. Use the migration playbook
  to re-align open branches.
- **Sprint S-02 (Evaluation & Retrieval)** – Land evaluation harness, retrieval
  tuning, telemetry dashboards, and Strengthen UI citations.
- **Sprint S-03 (Planner & Plugins)** – Deliver partial plan repair, plugin SDK
  v1 GA, and marketplace staging.
- Sprints S-04 to S-06 continue as in the project brief, updated to map to the
  Next lane responsibilities above.

---

## Cross-cutting Engineering Standards (Frontier Edition)

- Deterministic builds: toolchain pinning, artifact reproducibility checks, and
  change-impact reports are mandatory.
- Spec-first integration: OpenAPI/JSON Schema for every external interface;
  generated clients/types validated in CI.
- Quality bars: property-based + snapshot tests, performance budgets with trend
  dashboards, evaluation harness gating, and nightly resilience runs.
- Documentation-as-contract: each feature ships with docs, ADR references,
  Storybook stories, telemetry notes, and migration guidance.
- Observability defaults: traces, metrics, and logs connected to dashboards and
  surfaced to developers.

---

## Getting Started (team)

- Create/refresh tracking issues for each Now item; link to this roadmap and to
  the Architecture Council backlog.
- Enable Projects automation (Now/Next/Later + Sprint + Migration views).
- Schedule weekly architecture review and fortnightly program review.
- Run `just reproduce-build` and `just smoke` before merging; failures block PRs.
- Keep docs + Storybook updated in every PR; use the migration playbook when
  rebasing older branches.
