# Planner Adapter

The planner adapter is the bridge between Stack Composer’s orchestrator and the
symbolic planners (Fast Downward / OPTIC). It converts annotated user intents
into PDDL, executes search strategies, and streams results back to the runtime.

## Responsibilities

 | Responsibility        | Details                                                                                                      |
 | --------------------- | ------------------------------------------------------------------------------------------------------------ |
 | Request normalisation | Receives `PlanRequest` from the orchestrator, validates schemas, and maps requirements to domain predicates. |
 | PDDL generation       | Renders domain/problem files using handlebars templates versioned by language features.                      |
 | Solver orchestration  | Launches Fast Downward/OPTIC via `std::process::Command`, attaches timeouts, captures stdout/stderr.         |
 | Progress streaming    | Emits `PlanEvent` updates (grounding, search layer, heuristic status) so the UI and telemetry agent stay informed. |
 | Result packaging      | Produces `PlanResult` with steps, cost metrics, violated constraints, and persists artefacts for diffing.    |

## Data Flow

1. Orchestrator receives a `plan.create` command and forwards a normalised
   payload.
2. Adapter validates the request, emits `PlanEvent::Accepted`, and materialises
   temporary PDDL files.
3. Adapter runs the configured solver, streaming `PlanEvent::Progress` messages.
4. On success, adapter parses the plan trace into structured JSON and returns it
   to the orchestrator; on failure it emits `PlanEvent::Error`.

 ```text
UI → Orchestrator → Planner Adapter → Solver
                      ↑            ↓
                 PlanResult   PlanEvents
```

## Configuration

Configuration lives in `planner.toml` and can be overridden with environment
variables:

```toml
[solver]
engine = "fast-downward"
profile = "satisficing" # or optimal
plan_timeout_secs = 45

[pddl]
template_dir = "planner/templates"
reuse_grounded_instances = true
```

Set `SC_PLANNER_ENGINE=optic` to toggle OPTIC or `SC_PLANNER_TIMEOUT=120` for
longer searches.

## CLI Usage

The adapter binary can run independently for debugging:

```sh
cargo run -p planner-adapter -- --request examples/plan-request.json --output plan.json
```

Optional flags:

- `--engine optic` – switch to the temporal planner.
- `--emit-events` – print structured `PlanEvent` JSON to stdout.
- `--keep-artifacts` – persist generated PDDL under `.stack-composer/plans/`.

## Telemetry

The adapter emits OpenTelemetry spans: `planner.generate_pddl`,
`planner.run_solver`, and `planner.parse_plan`. It ships solver timings and
warnings to the telemetry agent; failures attach stdout/stderr blobs for later
analysis.

## Roadmap

| Sprint | Focus                                                   |
| ------ | -------------------------------------------------------- |
| S-02   | Integrate ONNX reranker for candidate plan ranking.      |
| S-03   | Implement incremental plan repair + diff visualisation.  |
| S-04   | Add domain template packs (web, data, embedded).         |
| Post   | Expose WASI plugin interface for custom solvers.         |

Refer to [`docs/src/architecture/planner-integration.md`](../architecture/planner-integration.md)
for the end-to-end integration narrative.
