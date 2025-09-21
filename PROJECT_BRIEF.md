# Stack Composer – Authoritative Project Brief (v0)

> Last updated: 2025-09-20 • Cadence: two-week sprints • Scope: planning/coordination, logic/platform, DX/CI, UX/UI, repo/docs (safety topics intentionally excluded)

## Executive Summary

Stack Composer is a desktop-first Rust + Tauri app that ingests a project brief, asks clarifying questions, and outputs a reasoned technology stack, an optional PDDL build plan, and a starter scaffold. It is local-first by default (Ollama-hosted 4-bit phi-3), supports hybrid retrieval (Qdrant + Meilisearch), symbolic planning (Fast Downward/OPTIC), and a sandboxed plugin system (Wasmtime/WASI). This brief consolidates goals, scope, governance, cross-cutting standards, and an actionable six-sprint plan with clear acceptance criteria and success metrics.

## Goals and Non-Goals

- Goals
  - Automate stack design from diverse briefs with explainability, citations, and replayable plans.
  - Operate offline by default; support optional online enrichment through signed plugins.
  - Provide strong typing and validation across Rust↔TS boundaries with reproducible builds.
  - Offer an extensible, capability-scoped plugin model and marketplace-ready SDK.
  - Ship program-grade docs, telemetry, and evaluation dashboards for every feature.
- Non-Goals (for this cycle)
  - Safety/compliance hardening beyond baseline hygiene (tracked separately).
  - Multi-tenant SaaS distribution; focus remains on desktop-first with optional services.

## Success Metrics (program-level)

- Retrieval quality: nDCG@10 ≥ 0.78; Precision@5 ≥ 0.65; Faithfulness ≥ 0.92 on the seed eval set.
- Planning fidelity: ≥ 90% of plans meet constraints; average solve time ≤ 15 s (target hardware).
- UX: Onboarding E2E p95 < 10 s on entry laptop; WCAG 2.2 AA audit passes with <5 open findings.
- CI/DX: Cold build time improved ≥ 50% vs. baseline with caching; reproducible build job green; `just reproduce-build` deterministic on all runners.
- Docs/Governance: Link-check and lint 0 errors on main; ADR log updated for every API change; Architecture Council cadence maintained.

## Constraints and Principles

- Local-first, free-first: all core workflows work offline with free/open tools.
- Determinism: lockfiles, toolchain pinning, seeded tests, reproducible artifacts, and traceable releases.
- Docs-as-contract: specs (OpenAPI/JSON Schema), ADRs, Storybook, telemetry notes, and migration guides ship with features.
- Evaluation-first: every intelligence change pairs with automated metrics, dashboards, and regression alarms.

## Governance and Ways of Working

- Architecture Council meets weekly; accepted RFCs convert to ADRs with IDs referenced in PR templates.
- Projects board automation (Now/Next/Later, Sprint, Migration views) manages flow with WIP limits.
- Program scorecards (monthly) aggregate metrics across product, DX, docs, and community.
- Versioning and releases: Changesets + Conventional Commits; signed artefacts with SBOM/provenance.

## Cross-Cutting Engineering Standards

- Strong typing: `tauri-specta` Rust↔TS types; Zod/JSON Schema for runtime validation; Specta-generated API docs.
- Quality bars: property-based tests (proptest), prompt/output snapshots (insta), micro-benchmarks (criterion), resilience/nightly smoke suites.
- CI Gate: `trunk check`, cargo/js linters, `cargo-audit`/`cargo-deny`, Playwright E2E (desktop), Storybook visual regression, evaluation harness.
- Documentation hygiene: markdownlint, Vale, mdbook-linkcheck, docs includes, migration playbook updates, ADR references in PR template.
- Observability defaults: OpenTelemetry spans, Prometheus metrics, dashboards linked from docs.

---

## Sprint Plan (Six Sprints, Two Weeks Each)

> Assumptions: team size 2–4; sprints S-01 to S-06; dates set by PM. Each sprint lists objectives, deliverables, and acceptance criteria. Items marked [docs] tie back to roadmap migration actions.

### S-01 — Migration & Frontier Foundations

- Objectives
  - Pin toolchains, stand up governance rituals, and light up baseline agents/telemetry.
  - Finish documentation/nav migration and deliver wizard skeleton + design system.
- Deliverables
  - `rust-toolchain.toml`, pinned pnpm/Tauri; devcontainer + Nix parity notes; `just reproduce-build` recipe and CI job.
  - Architecture Council charter, Projects automation, CODEOWNERS ≥2 maintainers/area, PR template ADR section.
  - Agents (ingestion, retrieval, critic, telemetry) wired to orchestrator with smoke test; `tauri-specta` type generation gating UI.
  - Storybook bootstrapped with 5+ components; wizard flow skeleton with citations + reduced-motion support.
  - [docs] Installation, accessibility, i18n, migration playbook, navigation cleanup.
- Acceptance Criteria
  - CI enforces toolchain pins and deterministic build job; governance cadence live.
  - Smoke test `just smoke` passes; telemetry spans visible; Storybook + Playwright jobs green.
  - Docs lint/link zero errors; migration playbook published.

### S-02 — Retrieval Intelligence & Evaluation

- Objectives
  - Establish retrieval evaluation harness, reranker groundwork, and telemetry dashboards.
  - Harden onboarding flow with citations, clarifications, and instrumentation.
- Deliverables
  - Eval dataset (≥100 Q/A), nDCG/P/R dashboards, nightly harness; ONNX reranker feature flag; ontology freshness metrics.
  - Wizard clarifying question loop, trust indicators, and instrumentation to telemetry.
  - [docs] Evaluation guide, dashboard handbook, telemetry operations doc.
- Acceptance Criteria
  - nDCG@10 ≥ 0.70, faithfulness ≥ 0.88; dashboards published; alerts configured.
  - Wizard instrumentation captured in telemetry; UX acceptance (keyboard/axe) passes.

### S-03 — Planner Surface & Plugin SDK v1

- Objectives
  - Deliver partial plan repair, temporal constraint surfacing, and marketplace-ready plugin SDK.
- Deliverables
  - Planner adapter diff/repair workflow, plan timeline UI, constraint violation reporting.
  - Plugin SDK v1: capability manifest, signing CLI, two example WASI plugins, staging marketplace catalogue.
  - [docs] Planner integration narrative, plugin author guide, SDK reference + ADR.
- Acceptance Criteria
  - Plan repair demo with diff view; plan solve SLA met; plugins pass capability checks and run end-to-end.

### S-04 — Experience, Copilot, and Auditability

- Objectives
  - Launch stack explorer, rationale diffing, and copilot interactions; achieve WCAG 2.2 AA audit.
- Deliverables
  - Stack explorer with cost/risk sliders, citation drill-down, bookmarking; copilot inline prompts.
  - External accessibility audit + remediation log; Playwright regression across locales.
  - [docs] A11y audit report, explorer usage guide, copilot FAQ.
- Acceptance Criteria
  - Audit passes (≤5 findings, all tracked); explorer + copilot features green in E2E; telemetry captures usage metrics.

### S-05 — CI/CD Scale, Resilience, and Release Automation

- Objectives
  - Harden pipelines, add resilience testing, and deliver signed releases with SBOM/provenance.
- Deliverables
  - Split CI workflows, selective test runs, flaky detector, chaos/resilience suite, `just smoke` nightly.
  - Release automation: signed artefacts, provenance, reproducible build verification, release notes pipeline.
  - [docs] Release runbook, resilience playbook, CI architecture diagram.
- Acceptance Criteria
  - CI time improved ≥ 40%; resilience suite green; release job produces signed artefacts + SBOM; docs updated.

### S-06 — Graph-Augmented Intelligence & Automation

- Objectives
  - Elevate retrieval/planning with GraphRAG, adaptive models, and autonomous remediation loops.
- Deliverables
  - GraphRAG pipeline, knowledge graph enrichment, reranker integration; adaptive model adapters (local/remote).
  - Autonomous remediation (planner + critic) with human-in-the-loop controls; scenario planning playground (beta).
  - [docs] GraphRAG architecture, remediation SOP, scenario playground guide.
- Acceptance Criteria
  - nDCG@10 ≥ 0.78; plan remediation success ≥ 80%; playground beta telemetry meets engagement targets.

---

## Backlog Epics (Post S-06)

- Federated orchestrators and multi-tenant control plane.
- Plugin marketplace GA with revenue share, automated trust scoring, and security reports.
- Enterprise features: RBAC, audit trails, licence bundles, policy engine.
- Autonomic ops: predictive scaling, anomaly detection, AI-assisted debugging.

## Dependencies and Risks

- External solver binaries licensing/reproducibility (Fast Downward/OPTIC).
- Large-model memory pressure on low-end devices (mitigate via 4-bit defaults, warnings).
- Plugin supply-chain risks (mitigate with signing, capability enforcement, marketplace review).
- Evaluation dataset drift (address via scheduled refresh, human review backlog).

## References

- Roadmap: `ROADMAP.md` (Now/Next/Later)
- Gap Analysis: `docs/gap-analysis.md`
- Task Graph: `TASK_GRAPH.md`
- Product README: `README.md`
- Migration Playbook: `docs/src/architecture/migration.md`

---

## How to Use This Brief

- PM: convert sprint deliverables into issues linked to Projects boards; maintain scorecards.
- Devs: treat acceptance criteria as definition of done; run `just reproduce-build` and `just smoke` before PR ready.
- Docs: update migration playbook, Storybook, ADRs, and telemetry notes with every change.

End of Brief
