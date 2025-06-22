# Component Details Index

\_All roads lead here: every major module in **Stack Composer** has a

dedicated sub‑page. When you start coding or refactoring, update the matching

doc so the map never lags behind the territory.\_

| #   | Component                            | Filename                                                             | Lead crate / dir         | Status            |
| --- | ------------------------------------ | -------------------------------------------------------------------- | ------------------------ | ----------------- |
| 1   | **Rust Orchestrator**                | [`orchestrator.md`](../src/components/orchestrator.md)               | `crates/orchestrator`    | **In Progress**   |
| 2   | **LLM Runtime Abstraction**          | [`llm-runtime.md`](../src/components/llm-runtime.md)                 | `crates/llm`             | Draft             |
| 3   | **Retrieval Layer (Qdrant + Meili)** | [`retrieval-layer.md`](../src/components/retrieval-layer.md)         | `crates/retrieval`       | Draft             |
| 4   | **Ingestion Agent**                  | [`ingestion-agent.md`](../src/components/ingestion-agent.md)         | `agents/ingestion`       | Draft             |
| 5   | **Gap‑Analysis Agent**               | [`gap-agent.md`](../src/components/gap-agent.md)                     | `agents/gap`             | Draft             |
| 6   | **Stack Agent**                      | [`stack-agent.md`](../src/components/stack-agent.md)                 | `agents/stack`           | Draft             |
| 7   | **Report Agent**                     | [`report-agent.md`](../src/components/report-agent.md)               | `agents/report`          | Draft             |
| 8   | **Planner Adapter**                  | [`planner-adapter.md`](../ai-sub-system-docs/planner-integration.md) | `crates/planner-adapter` | **Spec Complete** |
| 9   | **RL Critic**                        | [`rl-critic.md`](../ai-sub-system-docs/rl-critic.md)                 | `crates/critic`          | Spec Complete     |
| 10  | **WASI Plugin Host**                 | [`plugin-host.md`](../src/components/plugin-host.md)                 | `crates/plugin-host`     | Draft             |
| 11  | **Weekly Ontology Crawler**          | [`ontology-crawler.md`](../src/components/ontology-crawler.md)       | `tasks/crawler`          | Draft             |
| 12  | **Telemetry Pipeline**               | [`telemetry.md`](../src/components/telemetry.md)                     | `crates/telemetry`       | Draft             |

## Contributing Workflow

1. **Create/Update code** in the directory listed under **Lead crate / dir**.
2. Open or update the matching markdown file.
3. Commit both code and docs in the same PR—CI fails if headings are missing.
4. Once the component reaches MVP, change its **Status** to `🚀 Implemented`.

> **Tip:** If a component crosses multiple crates (e.g., UI + backend), link to
>
> all relevant paths in the “Lead crate / dir” column.

## Legend

| Label          | Meaning                                          |
| -------------- | ------------------------------------------------ |
| Draft          | Skeleton doc exists; awaiting API stabilisation. |
| In Progress    | Active implementation phase.                     |
| Spec Complete  | Design locked; implementation not yet merged.    |
| 🚀 Implemented | Code merged, tests passing, docs up‑to‑date.     |
