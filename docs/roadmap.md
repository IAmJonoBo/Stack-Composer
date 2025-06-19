# Roadmap

This roadmap outlines planned features and milestones for Stack Composer.

## Milestones

| Version | Feature/Milestone                             | Target Date |
| ------- | --------------------------------------------- | ----------- |
| v1.1    | Planner extensibility (Fast Downward, OPTIC)  | Q3 2025     |
| v1.2    | Distributed retrieval cluster support         | Q4 2025     |
| v2.0    | Enterprise release (RBAC, role-based privacy) | Q2 2026     |

## Progress Tracking

- Progress is tracked via GitHub Issues and Milestones.
- Each roadmap item links to its corresponding issue or PR for status updates.

## How to Contribute

- Suggest new features or vote on priorities via GitHub Discussions.
- Major roadmap changes are discussed in community meetings and require maintainer consensus.

---

## Strategic Roadmap (2025–2026)

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

## Architecture & Open Questions

See [Architecture & Component Guides/architecture-questions.md](Architecture%20&%20Component%20Guides/architecture-questions.md) for the latest strategic questions and rationale.
