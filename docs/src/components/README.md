# Component Details Index

_All major modules in **Stack Composer** are documented here. When you touch a
component, update its corresponding Markdown so the docs never trail the code._

> For detailed technical mapping, diagrams, and crate relationships, see [../component-details/README.md](../component-details/README.md).

| #   | Component                                   | File                                                           | Status               |
| --- | ------------------------------------------- | -------------------------------------------------------------- | -------------------- |
| 1   | **Rust Orchestrator**                       | [`orchestrator.md`](orchestrator.md)                           | **In&nbsp;Progress** |
| 2   | **LLM Runtime Abstraction**                 | [`llm-runtime.md`](llm-runtime.md)                             | Draft                |
| 3   | **Retrieval Layer (Qdrant + Meilisearch)**  | [`retrieval-layer.md`](retrieval-layer.md)                     | Draft                |
| 4   | **Ingestion Agent**                         | [`ingestion-agent.md`](ingestion-agent.md)                     | Draft                |
| 5   | **Gap‑Analysis Agent**                      | [`gap-agent.md`](gap-agent.md)                                 | Draft                |
| 6   | **Stack Agent**                             | [`stack-agent.md`](stack-agent.md)                             | Draft                |
| 7   | **Report Agent**                            | [`report-agent.md`](report-agent.md)                           | Draft                |
| 8   | **Planner Adapter** (Fast Downward / OPTIC) | [`planner-adapter.md`](planner-adapter.md)                     | **Spec Complete**    |
| 9   | **RL‑Critic**                               | [`rl-critic.md`](../ai-sub-system-docs/rl-critic.md)           | **Spec Complete**    |
| 10  | **WASI Plugin Host**                        | [`plugin-host.md`](plugin-host.md)                             | Draft                |
| 11  | **Weekly Ontology Crawler**                 | [`ontology-crawler.md`](ontology-crawler.md)                   | Draft                |
| 12  | **Telemetry Pipeline**                      | [`telemetry.md`](telemetry.md)                                 | Draft                |
| 13  | **Fast Downward Integration**               | [`fast-downward-integration.md`](fast-downward-integration.md) | **Spec Complete**    |

> **Tip:** begin each component doc with its purpose (_raison d’être_), list any
> public structs/traits (Rust) or messages (TypeScript), then finish with
> extension examples.

---

## Contributing Workflow

1. **Implement or modify code** in the directory linked to each component.
2. Update the matching Markdown file in this folder.
3. Commit **code and docs together**—our CI will fail if headings are missing.
4. Once a component hits MVP, update its **Status** to `🚀 Implemented`.

---

## Legend

| Label              | Meaning                                          |
| ------------------ | ------------------------------------------------ |
| Draft              | Skeleton doc exists; awaiting API stabilisation. |
| In&nbsp;Progress   | Active implementation phase.                     |
| Spec&nbsp;Complete | Design locked; implementation upcoming.          |
| 🚀 Implemented     | Code merged, tests passing, docs current.        |

---

See also:

- [AI Platform Overview](../ai-platform-overview.md)
- [Architecture Overview](../architecture-overview.md)
- [Planner Integration Guide](../ai-sub-system-docs/planner-integration.md)
