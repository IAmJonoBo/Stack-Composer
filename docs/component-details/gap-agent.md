# Gap-Analysis Agent

## Responsibilities

- Identify missing requirements and generate clarifying questions
- Compare extracted requirements to ontology/stack constraints
- Trigger user prompts for unresolved gaps

## Public APIs

- `find_gaps(requirements: List) -> Gaps`
- `ask_clarifying_question(gap: Gap) -> Question`

## Extension Hooks

- Custom gap-detection logic
- Integration with new ontology sources

## Roadmap & Enhancements

- Ontology versioning and updates
- GraphRAG integration for richer gap analysis
- UI for gap review and refinement

## Open Questions

- How to balance automated vs. user-driven gap resolution?
- What is the best UI for reviewing gaps?

## How to Extend/Customize

- Add new gap-detection rules via plugins
- Connect to external ontologies for richer analysis

## Real-World Usage Example

```rust
let gaps = gap_agent.find_gaps(requirements);
```

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Ingestion Agent](ingestion-agent.md), [Stack Agent](stack-agent.md)_
