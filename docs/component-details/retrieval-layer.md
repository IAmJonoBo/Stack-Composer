# Retrieval Layer (Qdrant + Meilisearch)

Hybrid dense + sparse search powering RAG.

## Components

- **Qdrant 0.15 embedded** – cosine similarity on 1536-D embeddings [oai_citation:4‡qdrant.tech](https://qdrant.tech/documentation/concepts/search/?utm_source=chatgpt.com) [oai_citation:5‡qdrant.tech](https://qdrant.tech/documentation/database-tutorials/bulk-upload/?utm_source=chatgpt.com).

- **Meilisearch 1.6** – BM25 + vector hybrid scoring [oai_citation:6‡bytecodealliance.org](https://bytecodealliance.org/articles/wasmtime-1-0-fast-safe-and-production-ready?utm_source=chatgpt.com).

## Qdrant Collection Schema Example

```json
{
  "collection": "docs",
  "vectors": {
    "size": 1536,
    "distance": "Cosine"
  },
  "payload_schema": {
    "id": "uuid",
    "source": "string",
    "timestamp": "datetime"
  }
}
```

## Meilisearch Document Example

```json
{
  "id": "b1c2d3e4-5678-90ab-cdef-1234567890ab",
  "text": "How to use Stack Composer for hybrid search...",
  "spdx_licence": "Apache-2.0",
  "timestamp": "2025-06-20T12:34:56Z"
}
```

## Index Schema

| Field          | Store  | Notes      |
| -------------- | ------ | ---------- |
| `id`           | both   | UUID       |
| `text`         | Meili  | full text  |
| `embedding`    | Qdrant | f32[1536]  |
| `spdx_licence` | Meili  | filterable |

## Query Pipeline

1. Embed query sentencepiece→GGUF vector.
2. `qdrant.search()` top-k dense.
3. `meili.search()` sparse.
4. Borda-count fusion for final ranking.

**Responsibility:**

- Receives queries from orchestrator/stack-agent.
- Embeds, upserts, filters, and ranks documents.
- Returns ranked results to caller.

## Configuration

```toml
[retrieval]
qdrant_wal = "~/.cache/stack-composer/qdrant"
meili_db   = "~/.cache/stack-composer/meili"
hybrid_k_dense  = 128
hybrid_k_sparse = 256
```

## Roadmap & Enhancements

- **GraphRAG Integration:** Planned support for property-graph/knowledge-graph retrieval backends (see recent research: Hierarchical Lexical Graphs, GRAG, GFM-RAG).
- **External Vector DBs:** Configurable connectors for managed Qdrant, Pinecone, and other cloud vector DBs.
- **Modular Retrieval:** Users will be able to mix graph, vector, and keyword sources via configuration.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
