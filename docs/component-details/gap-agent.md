# Gap-Analysis Agent

Finds missing requirements and generates clarifying questions.

- Compares extracted requirement graph to an ontology of stack constraints.
- Calls `llm.ask()` with system prompt “Ask exactly one clarifying question …”.

## Roadmap & Enhancements

- **Ontology Versioning:** Planned support for versioned, updatable ontologies and knowledge graphs.
- **GraphRAG Integration:** Will leverage property-graph traversal for richer gap analysis and clarifying question generation.
- **UI for Gap Review:** Future UI to review, accept, or refine clarifying questions and gap findings.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
