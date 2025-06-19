# Retrieval Layer (Qdrant + Meilisearch)

Hybrid dense + sparse search powering RAG.

## Components

- **Qdrant 0.15 embedded** – cosine similarity on 1536-D embeddings [oai_citation:4‡qdrant.tech](https://qdrant.tech/documentation/concepts/search/?utm_source=chatgpt.com) [oai_citation:5‡qdrant.tech](https://qdrant.tech/documentation/database-tutorials/bulk-upload/?utm_source=chatgpt.com).
- **Meilisearch 1.6** – BM25 + vector hybrid scoring [oai_citation:6‡bytecodealliance.org](https://bytecodealliance.org/articles/wasmtime-1-0-fast-safe-and-production-ready?utm_source=chatgpt.com).

## Index Schema

| Field          | Store  | Notes      |
| -------------- | ------ | ---------- |
| `id`           | both   | UUID       |
| `text`         | Meili  | full text  |
| `embedding`    | Qdrant | f32[1536]  |
| `spdx_licence` | Meili  | filterable |

## Query Pipeline

1. Embed query sentencepiece->GGUF vector.
2. `qdrant.search()` top-k dense.
3. `meili.search()` sparse.
4. Borda-count fusion for final ranking.

## Configuration

```toml
[retrieval]
qdrant_wal = "~/.cache/stack-composer/qdrant"
meili_db   = "~/.cache/stack-composer/meili"
hybrid_k_dense  = 128
hybrid_k_sparse = 256
```
