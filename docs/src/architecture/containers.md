# Containers

This module details the main containers (processes/services) in Stack Composer, as referenced in the architecture overview.

- **Desktop App:** Tauri + React UI, Rust orchestrator, and all agents/components.
- **Qdrant & Meilisearch:** Embedded vector and search DBs for hybrid retrieval.
- **Planner:** Fast Downward/OPTIC for PDDL planning.
- **Plugins:** Wasmtime-hosted WASI plugins for extensibility.

See the [C4 Container Diagram](architecture-overview.md#c4-container-diagram) for a visual summary.
