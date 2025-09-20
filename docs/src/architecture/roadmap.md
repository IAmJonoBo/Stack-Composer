# Roadmap

This architecture roadmap mirrors `ROADMAP.md` with a focus on system
capabilities and long-term bets. Use it when aligning component design docs or
preparing RFCs.

## Frontier Milestones

| Horizon | Focus                                                        | Target Timeline |
| ------- | ------------------------------------------------------------ | --------------- |
| Now     | Toolchain pinning, agent baselines, wizard v1, eval harness   | Sprints S-01–S-02 |
| Next    | Planner repair, plugin SDK v1 GA, stack explorer, resilience  | Sprints S-03–S-06 |
| Later   | Federated orchestration, GraphRAG, marketplace GA             | Post S-06        |

## Migration Tracker

| Area                 | Task                                                      | Status |
| -------------------- | --------------------------------------------------------- | ------ |
| Tooling              | Commit `rust-toolchain.toml`, pin pnpm/Tauri versions     | TODO   |
| Docs                 | Migration playbook, navigation cleanup, ADR links in PRs  | In Progress |
| Agents               | Baseline ingestion/retrieval/critic/telemetry pipelines   | TODO   |
| Evaluation           | Harness (nDCG/P/R/faithfulness) + dashboard               | TODO   |
| Wizard               | shadcn/Radix tokens, citations, reduced-motion support    | In Progress |
| Telemetry            | OpenTelemetry spans + Prometheus exporter                 | TODO   |

Update this table as migration tasks land. It should reflect the current state
of the main branch.

## Strategic Roadmap (2025–2026)

| Area             | Short-Term (0–3 mo)                                           | Mid-Term (3–6 mo)                                  | Long-Term (6–12 mo+)                                   |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| Plugin Ecosystem | SDK v1, signing CLI, marketplace staging                      | Marketplace GA, revenue/share models               | Community moderation, automated trust scores           |
| Retrieval        | Eval harness, ONNX reranker, ontology freshness               | GraphRAG enrichment, latency budgets               | Hierarchical/Graph retrievers, active learning loops   |
| Planning         | Partial repair, timeline UI, constraint diffing               | Cooperative planning (planner + critic)            | Autonomous remediation, DSL planner options            |
| LLM Runtime      | Typed IPC, model adapters (Ollama/vLLM)                       | Adaptive model selection, evaluation plateaus      | Model marketplace, on-demand fine-tuning integrations  |
| Telemetry        | OpenTelemetry + Prometheus baseline                           | Optional hosted telemetry backend                  | Predictive alerts, anomaly detection, AI ops copilot   |
| Experience       | Wizard v1, stack explorer beta, copilot interactions          | Collaboration (comments, bookmarks), scenario diff | Real-time scaffold preview, modernization workflows    |
| Release          | Deterministic builds, signed artefacts, SBOM/provenance       | Resilience suite, selective tests                  | Automated release train, downstream integrations       |
| Distributed      | Devcontainer/Nix parity, remote retrieval adapters            | Sharded orchestrators, remote planner execution    | Federated orchestrator mesh, multi-tenant control plane|

## AI-Guided Authoring & Scaffolding

Stack Composer is evolving into a fully AI-guided, end-to-end project authoring
and scaffolding platform. See
[ai-wizard-roadmap.md](../architecture-and-component-guides/ai-wizard-roadmap.md)
for the detailed product vision and phased implementation plan.

- Hybrid conversational wizard for discovery and planning
- Interactive stack exploration and “what-if” analysis
- Real-time directory tree and scaffold preview (graph + timeline)
- Copilot with rationale tooltips and decision history
- Context-aware recommendations, risk surfacing, and best-practice updates
- One-click project generation, export, and cloud deployment hooks
- Template packs, modernization flows, and project history

---

**Next Steps:**

- Review [Migration Playbook](migration.md)
- Align the [Observability stack](observability.md) with upcoming telemetry work
- Update [Component Details](../extensibility/component-details.md)
- Join the [Community](../contributing/README.md)
