# Architecture Overview

> **Developer Environment:** For details on the required toolchain, reproducible setup, and all supporting tools (Rust, Node, Docker, Nix, Qdrant, Meilisearch, etc.), see [Toolchain & DX Pipeline](../toolchain.md) and [Developer Setup](../Developer & Extensibility Docs/dev-setup.md).

This document explains **how Stack Composer works** and how its components communicate at run-time.

---

## C4 Context Diagram

```mermaid
flowchart TD
    User((User))
    Admin((Admin))
    StackComposer["Stack Composer Desktop App"]
    Qdrant[(Qdrant Vector DB)]
    Meili[(Meilisearch)]
    Planner[(Fast Downward / OPTIC)]
    Plugin[[WASI Plugins]]
    Web["Web (Docs, Updates)"]

    User -- "Brief, Actions" --> StackComposer
    Admin -- "Config, Monitoring" --> StackComposer
    StackComposer -- "Hybrid Search" --> Qdrant
    StackComposer -- "Hybrid Search" --> Meili
    StackComposer -- "Plan Request" --> Planner
    StackComposer -- "Plugin Calls" --> Plugin
    StackComposer -- "Check for Updates" --> Web
```

**Responsibilities:**

- Stack Composer ingests briefs, interacts with users/admins, and orchestrates retrieval, planning, and plugin execution.
- External dependencies: Qdrant, Meilisearch, planners, plugins, and web resources.
- Data flows: User input → Stack Composer → retrieval/planning/plugins → output (report, scaffold, telemetry).

---

## C4 Container Diagram

```mermaid
flowchart TD
    subgraph DesktopApp
        UI["UI (Tauri + React)"]
        ORCH["Orchestrator (Rust)"]
        RETR["Retrieval Layer"]
        PLAN["Planner Adapter"]
        PLUG["Plugin Host"]
        TELE["Telemetry"]
        REPORT["Report Agent"]
        GAP["Gap Agent"]
    end
    Qdrant[(Qdrant)]
    Meili[(Meilisearch)]
    Planner[(Fast Downward / OPTIC)]
    Plugin[[WASI Plugins]]

    UI --IPC/gRPC--> ORCH
    ORCH --API--> RETR
    ORCH --API--> PLAN
    ORCH --API--> PLUG
    ORCH --API--> TELE
    ORCH --API--> REPORT
    ORCH --API--> GAP
    ORCH --Hybrid Search--> Qdrant
    ORCH --Hybrid Search--> Meili
    ORCH --Plan Request--> Planner
    ORCH --Plugin Calls--> Plugin

```

---

**Next Steps:**

- Explore the [AI Platform Overview](AI Platform Overview.md)
- Review [Component Details](../extensibility/component-details.md)
- See [Operations Guide](../operations-security/ops-guide.md)
