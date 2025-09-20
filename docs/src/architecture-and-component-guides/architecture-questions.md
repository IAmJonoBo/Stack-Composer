# Architecture Questions

This FAQ captures the recurring conversations we have during design reviews and
implementation planning. Use it as a quick reference before opening a new RFC or
ADR.

## Why are we a desktop-first Tauri app instead of a web service?

We optimise for local-first workflows, predictable latency, and offline privacy
(`README.md`). Hosting the stack in Tauri keeps inference, retrieval, and
planning on the developer’s machine while still allowing optional cloud
enhancements via signed plugins.

## How do the agents communicate?

The orchestrator maintains an async message bus backed by Tokio channels
(`agents/orchestrator/src/main.rs`). Agents register with an `AgentId` and send
messages through the bus. UI clients interact over gRPC/JSON IPC and never call
agents directly.

## Where does retrieval data live?

Qdrant and Meilisearch run locally in Docker (see `just bootstrap`). In CI we
use ephemeral containers. Production deployments can swap the hosts via the
retrieval agent configuration file (`docs/src/components/retrieval-layer.md`).

## Why do we invest in both symbolic planning and LLM prompting?

Symbolic planning (Fast Downward / OPTIC) guarantees constraint satisfaction and
repeatability. LLM prompting provides ideation and natural-language summaries.
The planner adapter bridges these worlds so the UI receives deterministic plans
backed by explainable reasoning (`docs/src/component-details/planner-adapter.md`).

## How do we evaluate retrieval and planning quality?

The evaluation harness (S-02 deliverable) runs nightly, scoring nDCG, precision,
recall, faithfulness, hallucination, and plan success metrics. Dashboards live in
the telemetry stack and are linked from `docs/OKRS.md`. Every PR impacting
intelligence must attach updated metrics or explain deviations.

## Which observability stack do we use?

Our default stack is OpenTelemetry + SigNoz (traces) and Prometheus/Grafana
(metrics). See `docs/src/architecture/observability.md` for setup guidance. CI
uploads traces for failing tests, and explorer dashboards must be referenced in
relevant ADRs.

## How are architecture decisions recorded?

Accepted ADRs live under `docs/src/architecture/adr/`. The ADR log is updated in
any PR that changes public APIs or cross-cutting behaviour. ADR references must
be listed in the PR description so reviewers can validate alignment.

## What is the upgrade path for plugins?

Plugins are WASI modules signed with capability manifests. The plugin host
(`docs/src/component-details/plugin-host.md`) enforces token-scoped access.
Version negotiation happens through the host API signature; breaking changes
require a new major host version and an ADR.

## How do we keep documentation and code in sync?

CI runs trunk, Vale, markdownlint, and lychee. Any public-facing change must
update the relevant docs page and, if needed, Storybook stories. Breaking these
contracts blocks merges (`ROADMAP.md`).

## Where should I start when adding a new capability?

1. Draft an RFC summarising the problem and proposed architecture.
2. If accepted, write an ADR capturing the decision record.
3. Update the roadmap or sprint board with the implementation plan.
4. Ship code + docs + tests + telemetry hooks in a single PR when possible.

## How do I migrate an older branch to the frontier foundation?

Follow the [Migration Playbook](../architecture/migration.md): align toolchains,
run `just reproduce-build` and `just smoke`, regenerate IPC types, update docs,
and reference ADRs in the PR template. The playbook includes a merge checklist
and links to telemetry/evaluation steps.

If your question is not listed here, open a discussion in GitHub or start an
RFC so we can document the outcome.
