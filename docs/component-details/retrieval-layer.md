# Retrieval Layer (Qdrant + Meilisearch)

## Responsibilities

- Power hybrid dense + sparse search for RAG
- Manage Qdrant and Meilisearch indices
- Serve queries for stack synthesis and gap analysis

## Public APIs

- `search(query: str) -> Results`
- `index(document: Document)`

## Extension Hooks

- Support for new vector DBs or search engines
- Custom ranking/merging strategies

## Roadmap & Enhancements

- GraphRAG backend plugin
- Cloud vector DB and hybrid config

## Open Questions

- How to optimize for large-scale retrieval?
- What is the best fallback for missing data?

## How to Extend/Customize

- Add new indexers or search backends via plugin
- Implement custom query pipelines

## Real-World Usage Example

```rust
let results = retrieval_layer.search("Find all Python microservices");
```

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Planner Adapter](planner-adapter.md), [LLM Runtime](llm-runtime.md)_
