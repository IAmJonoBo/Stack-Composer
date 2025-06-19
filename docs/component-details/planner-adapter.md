# Planner Adapter (Fast Downward / OPTIC)

CLI wrapper around external planners.

## Why Fast Downward

- Best-in-class classical PDDL search, GPL-2 exception allows subprocess use [oai_citation:8‡github.com](https://github.com/google/sentencepiece?utm_source=chatgpt.com).

## Contract

```bash
fd_adapter solve domain.pddl problem.pddl --timeout 30 --out plan.json
```

Output JSON: ordered list of (action, params, cost).

OPTIC

Support temporal/cost PDDL by passing --engine optic.

## Roadmap & Enhancements

- **Plan Visualization & Editor:** Interactive DAG/textual plan viewer and editor in the UI.
- **Pluggable Planners:** Support for cloud-based planners and new open-source alternatives; planner layer will be modular.
- **Planner Adapters:** Expose planning as a service and enable in-process invocation for UI-driven debugging and workflow integration.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

---

## Fast Downward Integration

Stack Composer will integrate Fast Downward as a modular, extensible planner using a dedicated `planners/` crate and a unified Planner trait. The initial focus is on:

- Async Planner trait and Fast Downward subprocess adapter
- Configurable search parameters (heuristics, timeouts, etc.)
- CLI plan viewer (action list, GraphViz export)
- Canonical PDDL test suite and CI validation
- REST API for planning
- Telemetry for latency, plan length, and heuristic stats

Future enhancements include a web/desktop plan viewer (React Flow + Dagre), search replay, and support for additional planners.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md#fast-downward-integration-plan) for the full integration plan and rationale.
