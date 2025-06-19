# LLM Runtime Abstraction

A thin Rust trait that wraps Ollama’s REST API, leaving room to swap in vLLM or HF TGI later.

## Purpose

- Stream tokens from local GGUF models via Ollama [oai_citation:1‡ollama.com](https://ollama.com/?utm_source=chatgpt.com) [oai_citation:2‡ollama.com](https://ollama.com/blog/openai-compatibility?utm_source=chatgpt.com).
- Provide an OpenAI-compatible interface for downstream tools.

## Responsibilities

|                 |                                                     |
| --------------- | --------------------------------------------------- |
| Model lifecycle | `pull`, `run`, `list`, `delete`.                    |
| Streaming API   | WebSocket → Tokio broadcast channel.                |
| Rate limiting   | Polite back-pressure to avoid OOM on low-RAM hosts. |

## Trait Surface

```rust
#[async_trait]
pub trait LlmEngine {
    async fn pull(model: &str) -> Result<()>;
    async fn chat(req: ChatRequest) -> impl Stream<Item = Token>;
}
```

Default Implementation

Uses reqwest against <http://localhost:11434> (Ollama default port).
Fallback path for OpenAI proxy header when a remote endpoint is configured ￼.

Config

[llm]
default_model = "phi-3:4bit"
timeout_secs = 60

## Roadmap & Enhancements

- **Runtime Adapters:** Planned support for vLLM, Hugging Face TGI, and LM Studio as alternative LLM runtimes.
- **Model Management UI:** UI for listing, downloading, switching, and updating models, inspired by Ollama and LM Studio.
- **Model Registry:** Metadata and versioning for reproducibility and rolling updates.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
