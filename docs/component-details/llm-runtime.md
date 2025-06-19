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
