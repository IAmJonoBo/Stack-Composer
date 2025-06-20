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

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Stack Agent](stack-agent.md), [Retrieval Layer](retrieval-layer.md)_
