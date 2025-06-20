# Ingestion Agent

## Responsibilities

- Parse and preprocess input briefs (PDF, MD, DOCX, TXT)
- Chunk and embed documents for downstream retrieval
- Interface with the knowledge graph and ontology

## Flow

1. Detect file type (`pdf`, `md`, `docx`, `txt`).
2. Extract text (Mammoth for `.docx`, pdf-extract, pulldown-cmark).
3. Chunk with sliding window; encode using SentencePiece.
4. Write into retrieval layer.

## Public APIs

- `ingest(input: File) -> Chunks`
- `update_ontology(new_terms: List)`

## Extension Hooks

- Support for new file formats
- Custom chunking strategies

## Roadmap & Enhancements

- Distributed/clustered ingestion in multi-node deployments
- REST/gRPC endpoints for remote or automated ingestion workflows
- Plugin-based support for new document types and custom chunking strategies

## Open Questions

- How to handle very large files efficiently?
- What is the best fallback for unsupported formats?

## How to Extend/Customize

- Implement a new chunker by subclassing the base chunker trait/class
- Register new file format handlers via the plugin system

## Real-World Usage Example

```rust
enum IngestionMsg { AddFile(PathBuf), Shutdown }
let chunks = ingestion_agent.ingest(File::open("brief.pdf")?);
```

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Gap Agent](gap-agent.md), [Retrieval Layer](retrieval-layer.md)_
