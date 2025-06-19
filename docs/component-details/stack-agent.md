# Stack Agent

Synthesises candidate tech stacks, scores them, and hands top-N to reporter.

- Calls retrieval layer for evidence.
- Optionally invokes planner-adapter to sequence multi-step build flows.
- Exposes `/stack/proposals` REST endpoint to UI.
