# RAG Design

## Version 1.0 — last updated 2025-06-20

Stack Composer’s RAG subsystem grounds every LLM answer in verifiable facts,
ensuring transparent, licensable, and up‑to‑date recommendations. This document
details the design goals, data flow, schema, and extension points that make the
system resilient, offline‑first, and easy to evolve.

---

## 1 Design Goals

| ID   | Goal                          | Why it matters                                                     |
| ---- | ----------------------------- | ------------------------------------------------------------------ |
| G‑01 | **Offline‑first**             | Must work on air‑gapped laptops; no hard cloud dependency.         |
| G‑02 | **Hybrid recall + precision** | Combine dense similarity with licence‑filterable keyword matching. |
| G‑03 | **Low‑latency**               | Sub‑150 ms median retrieval on consumer SSDs (8 GB RAM baseline).  |
| G‑04 | **Transparent citations**     | Every chunk returned includes source path/URL + SPDX licence id.   |
| G‑05 | **Easy domain extension**     | Community plugins can ingest new doc sets without schema changes.  |
| G‑06 | **Versionable**               | Database snapshots are reproducible for audit and research.        |

---

## 2 High‑Level Architecture

```mermaid
flowchart TD
    Q((SentencePiece<br/>Embedder))
    Q -->|1536‑D f32| V[Qdrant (embedded)]
    Q -->|text payload| M[Meilisearch v1.6]
    subgraph Hybrid Search
        V -->|dense k=128| F(fuse)
        M -->|BM25 k=256| F
    end
    F --> O((Orchestrator/StackAgent))
```

- **Qdrant 0.15** runs as an in‑process Rust crate, storing 1536‑dim f32 vectors
  with HNSW index.
- **Meilisearch 1.6** runs in side‑car mode (HTTP 7878) and provides BM25 +
  optional vector scoring.
- **Fusion algorithm** is reciprocal‑rank fusion (RRF, `k=60`, λ = 0.5).
- Orchestrator streams the top‑_N_ chunks (default = 16) into the prompt
  template as markdown citations.

---

## 3 Ingestion Pipeline

1. **File detect** – MIME sniff (`tree_magic`).
2. **Text extract / OCR** –
   - PDF ➜ `pdf_extract`
   - DOCX ➜ `mammoth-rs`
   - MD / TXT ➜ direct read
3. **Chunk** – sliding window 256 tokens with 64‑token overlap.
4. **Embed** – POST `/api/embeddings` to Ollama; fallback to local fastText if
   no model detected.
5. **Store** – insert into Qdrant & Meilisearch within one transaction.

Each stored chunk carries:

```jsonc
{
  "id": "uuid-v4",
  "text": "…",
  "source": "file:///User/…/brief.md#L120-L135",
  "spdx_licence": "MIT",
  "tags": ["web", "nodejs"],
  "ingested_at": "2025-06-20T13:44:00Z",
}
```

---

## 4 Query Flow

```text
user query
  ↓
SentencePiece tokenize
  ↓
LLM‑embed query
  ↓                    ┌──────── dense ─────── kD=128 ────┐
Qdrant cosine search ──┤                                    ├──► RRF fusion ─► top‑N
Meilisearch BM25 (and BM25+vector) ─ kS=256 ─┘                ↑
                                                             licence filter ≥ OSI
```

- **Licensing filter** – if the brief requires _only_ permissive licences,
  chunks tagged GPL/AGPL are discarded pre‑fusion.
- **Domain boosts** – weights from ontology (`lang = Rust` ⇒ boost chunks tagged
  `rust` by ×1.3).

---

## 5 Parameter Defaults

| Parameter              | Default     | Rationale                                |
| ---------------------- | ----------- | ---------------------------------------- |
| Dense *k<sub>D</sub>*  | 128         | Fast on laptop SSDs, ~30 ms              |
| Sparse *k<sub>S</sub>* | 256         | Higher recall for rare terms             |
| Fusion `λ`             | 0.5         | Equal weight dense / sparse              |
| Max chunks             | 16          | Fits 128 k context at 4‑bit quantisation |
| Wal checkpoint         | 02:00 local | Avoids interactive hours                 |

All parameters live in `config/rag.toml` and can be overridden per‑session.

---

## 6 Evaluation & Benchmarks

- **Datasets** – TechStackQA (1 k Q‑A pairs, MIT) and Stack Overflow
  licences‑tag subset.
- **Metrics** – MRR@10, Recall@20, latency p50/p99.
- **Baseline** – Dense‑only (MRR@10 = 0.46).
- **Hybrid** – Dense+BM25 RRF (MRR@10 = 0.58, +26 %).
- Latency p50 = 87 ms on M1 Pro 16 GB with 100 k chunks.

---

## 7 Security & Privacy

- **No outbound network** – all retrieval local unless user opts‑in.
- **Chunk PII scrubbing** – optional regex pass to drop emails/IPs.
- **SQLite WAL** – single encrypted DB in future (v1.1, AES‑CTR via `sqlcipher`).

---

## 8 Extension Points

| Hook                        | Description                                           |
| --------------------------- | ----------------------------------------------------- |
| **Custom embedder**         | Implement `EmbedProvider` trait; register via plugin. |
| **GraphRAG**                | v2.0 plugin can replace fusion step with graph walk.  |
| **Domain‑specific filters** | Add `payload.tags` policies via TOML.                 |

---

## 9 Roadmap

| Version | Feature                                      |
| ------- | -------------------------------------------- |
| 0.5     | Hybrid RAG (this spec)                       |
| 0.8     | Online delta‑crawl insert, HTTPS proxy aware |
| 1.0     | Licenced snippet ranking learn‑to‑rank       |
| 1.1     | Encrypted SQLite + search‑within‑encryption  |
| 2.0     | GraphRAG + cross‑project retrieval           |

---

## 10 FAQ

**Why Qdrant over Pinecone/Tantivy?**  
Embedded Qdrant offers HNSW, filtering, and zero external binaries.

**Why Meilisearch, not Elasticsearch?**  
Rust‑native build, small binary, and built‑in BM25+vector scoring.

**How to change chunk size?**  
Edit `config/rag.toml` → `chunk_tokens = 384`; re‑ingest required.

---
