# Retrieval Layer

The retrieval layer powers hybrid search for Stack Composer, combining dense vector search (Qdrant) and sparse keyword search (Meilisearch) to support robust retrieval-augmented generation (RAG) and stack synthesis.

## Responsibilities

- Manage Qdrant and Meilisearch indices
- Serve queries for stack synthesis, gap analysis, and documentation search
- Support hybrid (dense + sparse) search in a single API

## Architecture

- Qdrant: Embedded vector DB for fast, local dense search
- Meilisearch: BM25-based keyword search for sparse retrieval
- Hybrid fusion: Combines results for improved precision and recall

## Public APIs

- `search(query: str) -> Results`
- `index(document: Document)`

## Extensibility

- Add new vector DBs or search engines via plugin
- Implement custom ranking/merging strategies

## Roadmap

- GraphRAG backend plugin
- Cloud vector DB and hybrid config
- Large-scale optimization and fallback strategies

## Usage Example

```rust
let results = retrieval_layer.search("Find all Python microservices");
```

---

See [Component Details: Retrieval Layer](component-details/retrieval-layer.md) for API and extension details.
