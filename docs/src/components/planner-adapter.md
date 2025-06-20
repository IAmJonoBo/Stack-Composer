# Planner Adapter (Fast Downward / OPTIC)

## Responsibilities

- Invoke external planners (Fast Downward, OPTIC) for PDDL planning
- Translate requirements into domain/problem files
- Return plan steps to orchestrator

## Public APIs

- `plan(domain: File, problem: File) -> Plan`
- `validate_plan(plan: Plan) -> bool`

## Extension Hooks

- Support for new planners
- Custom plan validation logic

## Roadmap & Enhancements

- Canonical PDDL test suite
- REST endpoints for planning
- Plan visualization & editor (UI)
- Pluggable planners and adapters

## Open Questions

- How to generalize for multiple planners?
- What is the best UI for plan visualization?

## How to Extend/Customize

- Add a new planner adapter by implementing the planner trait
- Register new planners via configuration

## Real-World Usage Example

```rust
let plan = planner_adapter.plan(domain_file, problem_file);
```

---

See [Architecture Questions](../architecture-and-component-guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Stack Agent](../component-details/stack-agent.md), [Retrieval Layer](../component-details/retrieval-layer.md)_

# Planner Adapter (Fast Downward / OPTIC)

_Status: Spec Complete — last updated 2025‑06‑20_  
The **Planner Adapter** isolates Stack Composer from the details of any
external PDDL‑capable planner. In v0.5 two adapters are bundled:

- **Fast Downward** — classical STRIPS planner with GPL‑2 exception.
- **OPTIC** — temporal/cost extension fork.

Both run as **sub‑processes** in a tmpfs jail so licence‑linking issues are
avoided.

---

## 1 Responsibilities

| #   | Task                                                         | Implementation                            |
| --- | ------------------------------------------------------------ | ----------------------------------------- |
| 1   | Translate requirement graph → `domain.pddl` + `problem.pddl` | `pddl_gen.rs`                             |
| 2   | Spawn planner CLI with timeout                               | `Command::new()` + Tokio `kill_on_drop`   |
| 3   | Parse plan file to JSON `PlanStep`                           | Supports FD `plan.txt` & OPTIC XML        |
| 4   | Validate plan against schema                                 | `validate_plan()` rejects missing actions |
| 5   | Return plan to Orchestrator                                  | `AgentMsg::PlanReady(plan)`               |
| 6   | Emit telemetry spans                                         | `plan.spawn`, `plan.parse`                |

---

## 2 Public APIs

```rust
pub struct PlanStep {
    pub action: String,
    pub params: Vec<String>,
    pub cost: f32,
    pub start_time: Option<f32>, // OPTIC only
    pub end_time:   Option<f32>,
}

#[async_trait]
pub trait PlannerAdapter {
    async fn plan(
        &self,
        domain: &Path,
        problem: &Path,
        timeout: Duration,
    ) -> anyhow::Result<Vec<PlanStep>>;

    fn validate_plan(&self, plan: &[PlanStep]) -> bool;
}
```

Default implementation = `FastDownwardAdapter` in
`crates/planner-adapter/src/fd_adapter.rs`.

---

## 3 CLI Wrappers

| Adapter       | Binary             | Example                                                     |
| ------------- | ------------------ | ----------------------------------------------------------- |
| Fast Downward | `fast-downward.py` | `fd_adapter solve domain.pddl problem.pddl --timeout 60`    |
| OPTIC         | `optic.py`         | `optic_adapter solve domain.pddl problem.pddl --timeout 60` |

Both wrappers emit **identical** JSON so orchestrator can switch freely.

---

## 4 Configuration (`planner.toml`)

```toml
[fast_downward]
binary = "/usr/local/bin/fast-downward.py"
alias  = "seq-sat-lmcut"
timeout_secs = 60

[optic]
binary = "/opt/optic/optic.py"
timeout_secs = 60

[defaults]
select_by_problem = true  # auto‑detect :durative‑action
```

Override per run:

```bash
stack-composer --planner optic --planner-timeout 120
```

---

## 5 Extension Hooks

| Hook                        | How to use                                              |
| --------------------------- | ------------------------------------------------------- |
| **New planner**             | Implement `PlannerAdapter`, add to `registry.rs`        |
| **Custom PDDL transformer** | WASI plugin can override `pddl_gen.rs`                  |
| **Plan validator**          | Replace `validate_plan()` to enforce org‑specific rules |

---

## 6 Testing

- Golden plan corpus in `tests/fixtures/plans/`.
- `just plan-test` runs each adapter against domain/problem pairs and compares
  to golden JSON using `serde_json::Value` diff.
- Mutation tests via `mutagen` ensure parsing logic robust to format drift.

---

## 7 Roadmap

| Version | Item                                             |
| ------- | ------------------------------------------------ |
| 0.5     | Fast Downward adapter + auto PDDL generation     |
| 0.8     | OPTIC temporal support                           |
| 1.2     | JSHOP‑2 HTN adapter                              |
| 1.2     | RL‑Critic integration (choose best of *N* plans) |
| 2.0     | Prost RDDL adapter for stochastic environments   |

---

## 8 FAQ

**Why two adapters instead of flags?**  
Different output formats and search flags; easier to encapsulate.

**Does it work without Python?**  
Binaries are vendored via Cargo build‑script if host lacks Python.

**Can I visualise the plan?**  
Yes—Planner View in UI renders a Gantt when temporal data present.

---

See also:

- [Planner Integration](../architecture/planner-integration.md)
- [RL Critic](../component-details/rl-critic.md)
- [Orchestrator](../component-details/orchestrator.md)
