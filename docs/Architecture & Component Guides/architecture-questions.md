# Architecture Decisions & Open Questions

This document tracks major architectural decisions, unresolved questions, and strategic enhancements for Stack Composer. It is updated as the system evolves and as new best practices or requirements emerge.

---

## Open Architecture Questions

- **Plugin trust & sandboxing:** Will you enable signed plugin packages? How will plugin capabilities and permissions be managed?
- **Data migration strategy:** What’s the toolchain for upgrading embedded Qdrant/Meilisearch data or migrating to external DBs?
- **Model distribution:** How will new LLMs be versioned, distributed, and cached?
- **Deployment targets:** Is there a roadmap for remote or cloud-hosted operation?
- **Knowledge & ontology versioning:** How will users vet updates to graph structures or ontologies?

---

## Strategic Enhancements (Summary Table)

| Area             | Short-Term (0–3 mo)           | Mid-Term (3–6 mo)                   | Long-Term (6–12 mo+)                |
| ---------------- | ----------------------------- | ----------------------------------- | ----------------------------------- |
| Plugin Ecosystem | Registry design, UI discovery | SDKs, samples, security enforcement | Signed plugins, marketplace         |
| RAG Retrieval    | GraphRAG backend plugin       | Cloud vector DB, hybrid config      | Hierarchical graph retrievers       |
| LLM Runtime      | Model download/switch UI      | vLLM/TGI adapters                   | Plugin model sources, online update |
| Planning         | Plan UI visualization         | Cloud planner support               | In-process/DSL planners             |
| Telemetry        | Prometheus + Grafana stack    | Cloud telemetry backend             | AI-driven alerts, BPM integration   |
| Reporting        | GitHub/Jira export adapters   | Templates, hook scripts             | CI/CD, PM tool integration          |
| Security         | Dependency/SBOM automation    | Secrets manager integration         | Zero-trust plugins, auditing        |
| Distributed      | K8s blueprints                | Sharding, proxy orchestration       | Global multi-user clusters          |
| API/Web          | REST/gRPC for CI              | Basic web UI with auth              | Full SaaS UI                        |

---

## Fast Downward Integration Plan

Stack Composer will integrate Fast Downward as a first-class planner using a modular, extensible approach:

### 1. Planner Trait & Adapter

- A new `planners/` crate will define a `Planner` trait (async, modular) and a Fast Downward subprocess adapter.
- The trait will support planner swapping and future adapters (e.g., cloud planners, vLLM).
- Configurable search parameters (heuristics, timeouts, etc.) will be exposed via config/UI.

### 2. Visualization & Debugging

- Start with a CLI plan viewer (action list, GraphViz .dot export).
- Evolve to a web/desktop UI using React Flow + Dagre for DAG visualization and plan editing.
- Search replay and heuristic log visualization are planned for deeper debugging.

### 3. CI/CD, API, and Telemetry

- Maintain a canonical PDDL test suite in `problems/` for regression and validation.
- CI will validate plans on PRs affecting planning code.
- Expose REST endpoints for planning (with token-based auth for remote use).
- Telemetry will track latency, plan length, success/failure, timeouts, and heuristic stats.

See the summary table below for recommendations and rationale.

| Area              | Recommendation                                         |
| ----------------- | ------------------------------------------------------ |
| Trait & Adapter   | planners/ crate; Fast Downward first                   |
| Multi-Planner     | Single planner now, generalize later                   |
| UI Type           | CLI first, then web UI (React Flow + Dagre)            |
| Visualization Lib | React Flow + Dagre for browser UI; GraphViz for CLI    |
| PDDL Test Suite   | Canonical tasks in-repo, expand over time              |
| CI Enforcement    | All PRs, focused plan validation                       |
| API Protocol      | REST first; add gRPC later                             |
| Authentication    | Token-based if remote; defer for local use             |
| Key Telemetry     | Latency, success/failure, plan length, heuristic stats |

---

_This plan ensures Fast Downward is robustly embedded, extensible, and observable within Stack Composer._

---

## Evidence & Rationale

- **Plugin Registry/Discovery:** Proven in Envoy, VS Code, and Kubernetes; enables ecosystem growth and security.
- **GraphRAG & Modular Retrieval:** Recent research (e.g., GFM-RAG, Hierarchical Lexical Graphs) shows significant gains in retrieval accuracy and explainability.
- **Model Management UI:** Standard in Ollama, LM Studio, and Hugging Face; critical for reproducibility and user trust.
- **Telemetry/Observability:** Prometheus/Grafana is industry standard for actionable, real-time insights.
- **API/Web Interface:** REST/gRPC and web UIs are essential for integration, automation, and multi-user/cloud scenarios.

---

_This document is a living record. Update as new decisions are made or as the system evolves._
