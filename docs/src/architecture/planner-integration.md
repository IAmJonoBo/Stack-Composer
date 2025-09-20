# Planner Integration

The planner integration layer translates natural-language requirements into
classical planning problems and synchronises results back into the orchestrator
and UI.

## Overview

1. The UI collects requirements and constraints during the wizard flow.
2. The orchestrator forwards a normalised `PlanRequest` to the planner adapter.
3. The planner adapter renders a PDDL domain/problem pair, invokes Fast
   Downward/OPTIC, and streams intermediate events.
4. The adapter returns the optimal plan plus metadata (cost, slack, violations)
   to the orchestrator.
5. The UI presents the plan along with rationale and “what-if” adjustments.

```
Wizard UI → Orchestrator → Planner Adapter → Fast Downward / OPTIC
                               ↓
                        Plan Updates + Telemetry → UI & Telemetry Agent
```

## Data Contracts

| Contract            | Producer        | Consumer      | Notes                                                      |
| ------------------- | --------------- | ------------- | ---------------------------------------------------------- |
| `PlanRequest`       | UI / Orchestrator | Planner Adapter | Includes objectives, resources, timeline, risk appetite.  |
| `PlanEvent`         | Planner Adapter | Orchestrator  | Progress updates: grounding, search, heuristics.           |
| `PlanResult`        | Planner Adapter | Orchestrator  | Final plan, metrics, diff vs. previous plan.               |
| `PlanTelemetry`     | Planner Adapter | Telemetry Agent | Span data, solver timings, warnings.                      |

Contracts are defined in Rust (`agents/planner-adapter/src/main.rs`) and exposed
to TypeScript via `tauri-specta` to keep the UI in sync.

## Adapter Responsibilities

- Generate deterministic PDDL using versioned templates (`planner.templates/`).
- Validate inputs with `schemars`/`serde` and fail fast on unsupported
  constraints.
- Invoke solvers via `Command` with configurable timeouts, heuristics, and
  search profiles.
- Stream progress events so the UI can surface live feedback and cancellation.
- Cache solver artefacts for incremental re-planning when requirements change.

## Solver Configuration

Configuration lives in `planner.toml` and supports environment overrides:

```toml
[solver]
engine = "fast-downward" # optic | external
plan_timeout_secs = 30
heuristics = ["ff", "cea"]

[caching]
reuse_grounded = true
artifact_dir = "~/.local/share/stack-composer/planner"
```

## Failure Handling

- **Timeouts**: emit `PlanEvent::Timeout` and fall back to the previous plan.
- **Infeasible constraints**: raise `PlanEvent::Infeasible` with specific
  constraint IDs and remediation hints.
- **Solver crash**: capture stderr/stdout, attach to telemetry, and propagate a
  user-friendly error to the UI.

## Extensibility

- Alternate solvers can be registered via the plugin host (WASI module providing
  `plan(request) -> result`).
- Domain-specific templates live alongside the default domain. Each template is
  versioned and surfaced in the UI as plan “flavours”.
- Plan repair APIs are on the roadmap (Sprint S-03) and will reuse the same
  transport contracts.

See [`docs/src/component-details/planner-adapter.md`](../component-details/planner-adapter.md)
for implementation specifics and CLI examples.
