# Architecture Decisions & Open Questions

This document tracks major architectural decisions, unresolved questions, and strategic enhancements for Stack Composer. It is updated as the system evolves and as new best practices or requirements emerge.

---

## See Also

- [AI Platform Overview](../AI%20Platform%20Overview.md): High-level vision, navigation, and links to all major docs.
- [AI Wizard Roadmap](ai-wizard-roadmap.md): Phased plan and feature set.
- [Main Roadmap](../roadmap.md): Milestones and strategic priorities.
- [Component Details Index](component-details/README.md): Responsibilities, APIs, and extension hooks for all modules.

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

## AI-Guided Authoring & Scaffolding Vision

Stack Composer is evolving into a fully AI-guided, end-to-end project authoring and scaffolding platform. See [ai-wizard-roadmap.md](ai-wizard-roadmap.md) for the full vision and phased implementation plan.

### Key Features

- Hybrid conversational-form wizard for discovery and planning
- Interactive tech stack exploration and “what-if” analysis
- Real-time directory tree and scaffold preview (tree/graph views)
- Chat-based copilot, rationale tooltips, and decision history
- Context-aware recommendations, security risk surfacing, and best practice updates
- One-click project generation, export, and cloud deployment hooks
- Template projects, import/modernization, and project history

### Open Questions

- Wizard UI format (chat, form, hybrid)
- Customization depth (CI, infra, test frameworks)
- Explainability and rationale requirements
- Integration priorities (GitHub, Jira, cloud)
- Project import/refactor use cases
- Preferred scaffold visualization (tree, graph, hybrid)

---

_See the new AI Wizard Roadmap for details and phased milestones._

---

## Evidence & Rationale

- **Plugin Registry/Discovery:** Proven in Envoy, VS Code, and Kubernetes; enables ecosystem growth and security.
- **GraphRAG & Modular Retrieval:** Recent research (e.g., GFM-RAG, Hierarchical Lexical Graphs) shows significant gains in retrieval accuracy and explainability.
- **Model Management UI:** Standard in Ollama, LM Studio, and Hugging Face; critical for reproducibility and user trust.
- **Telemetry/Observability:** Prometheus/Grafana is industry standard for actionable, real-time insights.
- **API/Web Interface:** REST/gRPC and web UIs are essential for integration, automation, and multi-user/cloud scenarios.

---

## Comprehensive Deployment Plan: AI-Guided Orchestration Platform

This section consolidates all core features, technical details, and next steps for Stack Composer’s next-generation, AI-guided orchestration system. All features are open-source by default, with paid services as opt-in only.

### 1. Hybrid Conversational–Form Wizard (Single-User, Accessible)

- Hybrid UI: Chat prompts + form-driven input (keyboard, ARIA, screen reader accessible)
- Persistent session context: Undo/redo, decision timeline, revisitable steps
- “Why?” tooltips and deep dives for major decisions (LLM-powered)
- Override confirmations for risky choices, with rationale and adaptation suggestions

### 2. Intelligent Scaffold & Directory Tree Preview

- Live “what-if” trade-off matrix (cost, performance, security)
- Editable project structure: Toggleable tree (React Arborist/MUI TreeView) and graph (React Flow + Dagre/React D3 Tree)
- Stub file generator (main.rs, .github/ci.yml, Dockerfile, etc.) with inline TODOs, best-practice links, and feature toggles
- Dynamic updates as stack changes

### 3. LLM Integration & Personalization

- LLM-driven rationale, proactive suggestions, and code explanations
- Personalization based on project/user history (anonymized)
- Chat copilot pane for “why?”, “how-to?”, and code Q&A at any step

### 4. Ecosystem Integration & Repo Import

- Import existing repos for analysis and modernization before scaffolding
- Plugin support: Local stack templates, scaffold themes (future: custom wizards/code-gen plugins)
- Fully scriptable via REST, gRPC, and CLI for CI/CD automation

### 5. Security, Risk & Compliance

- CVE/license checks during tech selection; warnings and safer alternatives
- Secure-by-default templates, overridable with explicit risk confirmations
- Audit logs for all decisions, exportable for compliance

### 6. One-Click Automation & DevOps Linking

- One-step project generation: Repo init, CI/CD, DevContainer, cloud IDE launch
- Integration: GitHub export (v1), Jira (v2), Codespaces/Cloud IDE links
- Exportable custom templates for repeated workflows

### 7. Observability, Feedback & Health Monitoring

- Telemetry: Wizard latency, errors, user paths, scaffold variability
- In-app feedback: Ratings, comments, issue submission
- Live dashboard: System health, usage stats, scaffold adoption

### 8. Reliability & Resilience

- Real-time LLM/service failure detection, fallback to structured forms, clear error messaging
- Transparent error codes and retry guidance

### 9. Open-Source-First Philosophy

- All core features use open-source libraries; paid services are opt-in only (e.g., cloud LLMs, CI/CD)

---

### Summary Table

| Feature             | Fully Featured at Launch?                     |
| ------------------- | --------------------------------------------- |
| Wizard UI           | ✅ Hybrid, accessible, undo/redo, rationale   |
| Stack Explorer      | ✅ Live trade-off matrix, editable tree/graph |
| Stub Generation     | ✅ Rich comments, TODOs, feature toggles      |
| LLM Integration     | ✅ On-demand rationale & code                 |
| Personalization     | ✅ Based on stored history                    |
| Repo Import         | ✅ Analysis + modernization advice            |
| Plugin Support      | ✅ Local templates (marketplace later)        |
| API/CLI             | ✅ REST, gRPC, CLI for full flow              |
| Security Checks     | ✅ CVE/licensing, secure defaults, audit logs |
| Automation          | ✅ One-click, GitHub/Jira/DevContainer        |
| Observability       | ✅ Telemetry, feedback, dashboards            |
| Fallback Handling   | ✅ Degraded mode with retries                 |
| Open-Source Default | ✅ Yes; paid opt-in only                      |

---

### Next Steps

1. UX wireframes for wizard, override modals, rationale, and scaffold views
2. Session context model: User choices, overrides, personalization metadata
3. Scaffold preview prototype: Toggleable tree and graph
4. LLM prompt libraries: Rationale, conflict warnings, fallback messages

---

_This plan is the result of a comprehensive, multi-step analysis and incorporates all previously discussed features, technical details, and best practices. All documentation, architecture, and component guides are now aligned with this vision._

---

_This document is a living record. Update as new decisions are made or as the system evolves._
