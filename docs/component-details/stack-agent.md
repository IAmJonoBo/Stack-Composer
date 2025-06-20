# Stack Agent

## Responsibilities

- Synthesize candidate tech stacks from requirements
- Score and rank proposals
- Interface with retrieval and planner components

## Public APIs

- `propose_stack(requirements: List) -> Proposals`
- `score_stack(proposal: Proposal) -> Score`

## Extension Hooks

- Custom scoring algorithms
- New stack synthesis strategies

## Roadmap & Enhancements

- REST/gRPC API for headless/CI use
- Web UI for remote/collaborative access
- RBAC & multi-tenancy for distributed deployments

## Open Questions

- How to support multi-user or distributed deployments?
- What are the best metrics for stack scoring?

## How to Extend/Customize

- Implement a new scoring function and register via plugin
- Add new proposal generators for niche domains

## Real-World Usage Example

```rust
let proposals = stack_agent.propose_stack(requirements);
```

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Gap Agent](gap-agent.md), [Report Agent](report-agent.md)_
