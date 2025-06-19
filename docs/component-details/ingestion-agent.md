# Ingestion Agent

Parses briefs, chunks text, embeds vectors, and stores docs.

## Flow

1. Detect file type (`pdf`, `md`, `docx`, `txt`).
2. Extract text (Mammoth for `.docx`, pdf-extract, pulldown-cmark).
3. Chunk with sliding window; encode using SentencePiece [oai_citation:7‡github.com](https://github.com/google/sentencepiece?utm_source=chatgpt.com).
4. Write into retrieval layer.

## Messages

```rust
enum IngestionMsg { AddFile(PathBuf), Shutdown }
```
