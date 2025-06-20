# Components

This module describes the key components/agents in Stack Composer, as referenced in the architecture overview.

- **UI:** Tauri + React frontend for user interaction.
- **Orchestrator:** Rust core coordinating all agents and plugins.
- **Retrieval Layer:** Hybrid search using Qdrant and Meilisearch.
- **Planner Adapter:** CLI interface to Fast Downward/OPTIC.
- **Plugin Host:** Secure WASI plugin execution.
- **Telemetry:** Metrics and event collection/export.
- **Report Agent:** Generates reports and scaffolds.
- **Gap Agent:** Identifies missing requirements and triggers clarifying questions.

See the [C4 Container Diagram](architecture-overview.md#c4-container-diagram) and [Component-Details Index](component-details/README.md) for more.
