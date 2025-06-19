# Architecture Overview

> **Developer Environment:** For details on the required toolchain, reproducible setup, and all supporting tools (Rust, Node, Docker, Nix, Qdrant, Meilisearch, etc.), see [Toolchain & DX Pipeline](toolchain.md) and [Developer Setup](Developer & Extensibility Docs/dev-setup.md).

This document explains **how Stack Composer works** and how its components communicate at run-time.

---

## High-Level Block Diagram

```mermaid
flowchart TD
    classDef comp fill:#f9f9f9,stroke:#333,stroke-width:1px,rx:6,ry:6
    subgraph Desktop
        UI[Tauri ± React] -.IPC.-> ORCH(Rust Orchestrator)
        ORCH -->|REST| OLL(Ollama LLM runtime)
        ORCH --> RETR[Qdrant (embed) + Meilisearch 1.6]
        ORCH -->|gRPC| PLAN(Fast Downward / OPTIC)
        ORCH --> PLUG[[Wasmtime WASI plugins]]
    end
    CRAWL((Weekly Ontology Crawler)) --> RETR
    CRAWL --> RETR
```

- Tauri binaries are smaller and use less RAM than Electron.
- Ollama exposes a simple localhost REST API (port 11434) for streaming tokens.
- Qdrant 0.15 embedded-mode removes the need for an external vector DB process.
- Meilisearch 1.6 introduces hybrid (dense + sparse) search in a single index.
- Fast Downward is the de-facto PDDL planner; its GPL-2 exception allows subprocess use in closed binaries.
- Wasmtime 1.x is production-ready for secure WASI sandboxing.
- Unsloth 4-bit quantisation halves VRAM for phi-3 without meaningful accuracy loss.
- GraphRAG (future plug-in) lets the LLM walk a property-graph for richer, lower-hallucination answers.

---

## Subsystem Table

| Subsystem      | Tech                                 | Highlights                                 |
|---------------|--------------------------------------|--------------------------------------------|
| LLM runtime   | Ollama + phi-3 GGUF-4bit             | Local, hot-swappable; REST streaming.      |
| Retrieval     | Qdrant (dense) + Meilisearch (BM25)  | Hybrid fusion improves precision & recall. |
| Chunking      | SentencePiece, 256-token windows     | Proven sweet-spot for context reuse.       |
| Planning      | Fast Downward / OPTIC                | Classical + temporal plan generation.      |
| Telemetry     | OpenTelemetry file exporter (JSON)   | Opt-in, manual upload only.                |
| Docs-as-Code  | mdBook + ADR repo                    | Write docs with same tools as code.        |
| Governance    | Joel Parker Henderson ADR templates  | Decisions captured alongside code.         |

---

## Data Flow (“Compose Stack” request)

1. Brief ingestion – UI or CLI sends the document to the Rust IngestionAgent, which chunks and embeds it (SentencePiece → GGUF).
2. Gap analysis – GapAgent queries the knowledge graph; unanswered slots trigger clarifying questions in the chat UI.
3. Retrieval – StackAgent issues hybrid search queries:
    • dense cosine on Qdrant,
    • sparse BM25 on Meilisearch,
    then merges the scored sets.
4. Planning (optional) – If --planner is on, domain & problem PDDL files are generated and solved by Fast Downward; the plan comes back as a sequence of stack-construction actions.
5. Critic loop – (future) RL critic re-scores alternative stacks to optimise for build time and licence risk.
6. Report generation – ReportAgent merges citations, plan steps, and UML diagrams into HTML/Markdown, then offers a JSON export and repo scaffold.

---

## Runtime Layers & Technologies

| Layer           | Component           | Rationale                                      |
|-----------------|---------------------|------------------------------------------------|
| UI Shell        | Tauri + React       | 2–3 MB installers and ~58% less RAM than Electron |
| Orchestrator    | Rust / Tokio        | Memory-safe, zero-cost FFI to Wasmtime         |
| LLM Runtime     | Ollama + GGUF 4-bit | Local, private LLMs; REST streaming            |
| Retrieval       | Qdrant (embedded)   | No external DB to install                      |
| Hybrid Search   | Meilisearch 1.6     | Combines dense & sparse ranking                |
| Planner         | Fast Downward       | Classical PDDL with GPL-2 exception            |
| Plugins         | Wasmtime (WASI)     | Syscall-sandboxed execution                    |
| Docs            | mdBook              | Rust-native docs-as-code                       |

---

## Extensibility Points
- WASI capability tokens – restrict plugins to declarative host functions.
- Model abstraction trait – swap Ollama REST calls with vLLM, LM-Studio, or Hugging Face TGI without touching agent logic.
- GraphRAG plug-in – future Rust crate to replace the current retrieval layer with a property-graph walk.

---

## Next Reading
- [Component-Details Index](component-details/README.md)
- [Planner Integration](planner-integration.md)
- [Plugin SDK](plugin-sdk/README.md)

---
