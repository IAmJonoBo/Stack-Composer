# Stack Agent

Synthesises candidate tech stacks, scores them, and hands top-N to reporter.

- Calls retrieval layer for evidence.
- Optionally invokes planner-adapter to sequence multi-step build flows.
- Exposes `/stack/proposals` REST endpoint to UI.

## Roadmap & Enhancements

- **API Exposure:** Planned REST/gRPC API for headless, CI-integrated, or remote use.
- **Web UI:** Optional browser-based UI for remote access and collaboration.
- **RBAC & Multi-Tenancy:** Support for user/session isolation and access control in distributed deployments.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
