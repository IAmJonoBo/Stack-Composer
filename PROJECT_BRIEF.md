# Stack Composer – Authoritative Project Brief (v0)

> Last updated: 2025-09-20 • Cadence: two-week sprints • Scope: planning/coordination, logic/platform, DX/CI, UX/UI, repo/docs (safety topics intentionally excluded)

## Executive Summary

Stack Composer is a desktop-first Rust + Tauri app that ingests a project brief, asks clarifying questions, and outputs a reasoned technology stack, an optional PDDL build plan, and a starter scaffold. It is local-first by default (Ollama-hosted 4-bit phi-3), supports hybrid retrieval (Qdrant + Meilisearch), symbolic planning (Fast Downward/OPTIC), and a sandboxed plugin system (Wasmtime/WASI). This brief consolidates goals, scope, governance, cross-cutting standards, and an actionable six-sprint plan with clear acceptance criteria and success metrics.

## Goals and Non-Goals

- Goals
  - Automate stack design from diverse briefs with explainability and citations.
  - Operate offline by default; support optional online enrichment.
  - Provide strong typing and validation across Rust↔TS boundaries.
  - Offer an extensible, signed plugin model with capability contracts.
  - Ship high-quality docs-as-code and reliable CI/CD gates.
- Non-Goals (for this cycle)
  - Safety/compliance hardening beyond basic hygiene.
  - Deep mobile/web client parity with desktop.

## Success Metrics (program-level)

- Retrieval quality: nDCG@10 ≥ 0.75 on the seed eval set; Precision@5 ≥ 0.6; Faithfulness ≥ 0.9.
- UX: Onboarding E2E p95 < 12s on entry laptop; keyboard navigation and reduced-motion pass.
- CI: Cold build time improved ≥ 40% with caching; PRs annotated with trunk/linters; reproducible builds.
- Docs: Link-check and lint zero errors on main; ADR log created and used for public API decisions.

## Constraints and Principles

- Local-first, free-first: all core workflows work offline with free/open tools.
- Determinism: lockfiles, toolchain pinning, seeded tests, reproducible artifacts.
- Docs-as-contract: specs (OpenAPI/JSON Schema), ADRs, Storybook, and mdBook stay in lockstep.

## Governance and Ways of Working

- RFCs via PR label `rfc` and a template; timeboxed review; accepted RFCs become ADRs.
- ADRs: Nygard/MADR-derived template in `adr/` with index; gate public API changes.
- Project management: GitHub Projects board (triage → ready → in-progress → review → done), WIP limits, weekly 30–45 min review.
- Versioning and releases: Changesets + Conventional Commits; automated release notes.

## Cross-Cutting Engineering Standards

- Strong typing: `tauri-specta` Rust↔TS types; Zod/JSON Schema for runtime validation.
- Quality bars: property-based tests (proptest), prompt/output snapshots (insta), micro-benchmarks (criterion).
- CI Gate: `trunk check` + cargo/js linters; Playwright for E2E; Storybook + visual regression.
- Documentation hygiene: markdownlint, Vale, mdbook-linkcheck; `_includes/` for reuse; no placeholders.

---

## Sprint Plan (Six Sprints, Two Weeks Each)

> Assumptions: team size 2–4; sprints S-01 to S-06; dates to be set by PM. Each sprint lists objectives, deliverables, and acceptance criteria. Items marked [docs] integrate the gap-analysis actions.

### S-01 — Foundations, Governance, and DX

- Objectives
  - Establish contribution hygiene, typing across boundaries, and baseline tests.
  - Resolve high-friction docs and navigation issues.
- Deliverables
  - Changesets + Conventional Commits (commitlint + PR title check); CODEOWNERS; Issue/PR templates (bug/feat/rfc).
  - `tauri-specta` type generation wired; TS types emitted into UI.
  - Test scaffolding: ≥3 property-based tests, ≥3 snapshot tests, ≥1 micro-benchmark in CI.
  - Storybook bootstrapped with ≥5 core components; Playwright set up for visual regression.
  - [docs] Remove/fill placeholders; add `_includes/`; enable markdownlint, Vale, link check.
- Acceptance Criteria
  - PRs show trunk/linters annotations; TS types generated automatically; Storybook runs locally.
  - Docs CI (lint + link check) passes; no placeholder pages remain in the primary nav.

### S-02 — Retrieval Precision and Evaluation

- Objectives
  - Improve answer quality with adaptive chunking, hybrid fusion tuning, and reranking.
  - Add transparent citations and a basic evaluation harness.
- Deliverables
  - Adaptive chunking + top-k window expansion; hybrid fusion scoring tweaks.
  - ONNX reranker (e.g., bge-reranker-base) behind a feature flag.
  - UI citations, confidence indicators, and clarifying questions loop.
  - Eval harness (seed set 50–100 Q/A) computing nDCG@k, P/R, faithfulness; CI baseline report.
- Acceptance Criteria
  - nDCG@10 ≥ 0.70 and faithfulness ≥ 0.85 on seed set; citations rendered in UI.

### S-03 — Planning Surface and Plugin SDK v1

- Objectives
  - Expose planner constraints and enable partial plan repair.
  - Formalize the plugin SDK capability contracts and examples.
- Deliverables
  - Planner UI: temporal constraints surfaced; change-impact and partial plan repair prototype.
  - Plugin SDK v1: capability contracts, semver’d host API, signed WASI example plugins.
  - [docs] Plugin author guide with step-by-step and API references.
- Acceptance Criteria
  - Demonstrable plan repair on changed requirements; two example plugins pass capability checks.

### S-04 — Onboarding Flow, A11y, and E2E

- Objectives
  - Ship a polished “Import brief → Clarify → Preview → Export” flow with accessibility.
  - Add Tauri E2E and stabilize visual diffs.
- Deliverables
  - Onboarding wizard with progress indicators; rationale tooltips; “what-if” side panel basics.
  - A11y improvements to target WCAG 2.2 AA; keyboard navigability; reduced-motion mode.
  - Playwright + `@tauri-apps/cli` E2E tests; golden screenshot baselines.
- Acceptance Criteria
  - E2E suite green locally and in CI; onboarding p95 < 12s on entry laptop; key A11y checks pass.

### S-05 — CI/CD Scale and Performance

- Objectives
  - Harden CI for scale, reproducibility, and performance transparency.
- Deliverables
  - Split CI into reusable workflows; artifactable Tauri build; SBOM/provenance generation.
  - Devcontainers (or Nix shell) for env parity; task graph viz for Just tasks.
  - Performance budget tracking (cold-start, interaction latency) with historical trends.
- Acceptance Criteria
  - Cold build improved ≥ 40% vs. baseline with caching; reproducible build job shows no-diff results.

### S-06 — Graph-Augmented and Advanced Retrieval

- Objectives
  - Elevate retrieval beyond hybrid fusion with graph augmentation and late-interaction.
- Deliverables
  - GraphRAG augmentation pipeline for ontology/knowledge graphs.
  - Optional late-interaction or ColBERT-like re-scoring; domain template packs for common verticals.
  - [docs] Scenario planning/playground guide; domain templates documentation.
- Acceptance Criteria
  - nDCG@10 ≥ 0.75 and Precision@5 ≥ 0.60 on seed set; latency budgets respected on entry hardware.

---

## Backlog Epics (Post S-06)

- Collaborative reviews (per-requirement comments), scenario comparison with cost/risk sliders.
- Model/runtime adapters with evaluation plateaus; flaky test quarantine and test-impact analysis.
- Performance CI deep-dive and reproducible environment verification across platforms.

## Dependencies and Risks

- External binaries (Fast Downward) licensing and reproducibility.
- Large-model memory pressure on low-end devices (mitigate with 4-bit defaults and warnings).
- Plugin supply-chain risks (mitigate with signatures and Wasmtime sandboxing).

## References

- Roadmap: `ROADMAP.md` (Now/Next/Later)
- Gap Analysis: `docs/gap-analysis.md`
- Task Graph: `TASK_GRAPH.md`
- Product README: `README.md`

---

## How to Use This Brief

- PM: assign sprint issues from each section; track in GitHub Projects; review weekly.
- Devs: treat acceptance criteria as the definition of done; add tests/docs with every PR.
- Docs: keep `_includes/`, ADRs, and Storybook/mdBook in sync; block merges on lint/link failures.

End of Brief
