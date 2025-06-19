# Code Walkthrough

This document provides a code-level overview of Stack Composer, including the main Rust crates, their responsibilities, public APIs, and inter-module communication patterns.

## Crate/Module Overview

| Crate/Module    | Responsibility                                 | Key Public Types/APIs               | Invocation Pattern                 |
| --------------- | ---------------------------------------------- | ----------------------------------- | ---------------------------------- |
| orchestrator    | Coordinates agents, plugins, and runtime tasks | `Orchestrator`, `AgentHandle`       | Async channels, gRPC, plugin hooks |
| retrieval-layer | Hybrid search (Qdrant + Meilisearch)           | `QueryEngine`, `SearchResult`       | REST, trait-based DI               |
| planner-adapter | PDDL planning via Fast Downward/OPTIC          | `Planner`, `Plan`, `ProblemSpec`    | CLI subprocess, JSON I/O           |
| stack-agent     | Synthesizes and scores tech stacks             | `StackAgent`, `Proposal`            | REST, async message passing        |
| report-agent    | Generates reports and scaffolds                | `ReportAgent`, `StackReport`        | REST, file I/O                     |
| gap-agent       | Finds missing requirements, asks clarifying Qs | `GapAgent`                          | LLM call, async channel            |
| plugin-host     | WASI plugin execution and capability control   | `PluginHost`, `PluginInit`          | Wasmtime, dynamic registration     |
| telemetry       | Metrics, traces, and usage logging             | `MetricCollector`, `TelemetryEvent` | OpenTelemetry, file exporter       |

## Example: Orchestrator

```rust
pub struct Orchestrator {
    registry: DashMap<String, AgentHandle>,
}

impl Orchestrator {
    pub async fn send(&self, msg: AgentMsg) -> anyhow::Result<()> {
        // ...
    }
}
```

- **Responsibility:** Manages agent lifecycles, routes messages, exposes IPC (gRPC/REST), and handles plugin registration.
- **Dependencies:** Tokio, Wasmtime, async channels, gRPC, plugin-host.
- **Data Flow:** Receives requests from UI/CLI, dispatches to agents, aggregates results, and returns to caller.

## Example: Retrieval Layer

```rust
pub struct QueryEngine {
    qdrant: QdrantClient,
    meili: MeiliClient,
}

impl QueryEngine {
    pub async fn search(&self, query: Query) -> Vec<SearchResult> {
        // ...
    }
}
```

- **Responsibility:** Embeds, upserts, filters, and ranks documents using Qdrant and Meilisearch.
- **Dependencies:** Qdrant, Meilisearch, embedding model, serde.
- **Data Flow:** Receives query, runs dense (Qdrant) and sparse (Meili) search, merges and ranks results.

---

_Expand each section as code matures. For more, see each component’s dedicated doc._
