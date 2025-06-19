# Rust Orchestrator

Coordinates every long-running agent, service, and plugin at runtime.

## Purpose

- Start/stop agent tasks on Tokio’s work-stealing scheduler [oai_citation:0‡tokio.rs](https://tokio.rs/tokio/tutorial/async?utm_source=chatgpt.com).
- Route messages between GUI, CLI, and background jobs via async channels.
- Expose a single IPC surface: gRPC for the Tauri shell, JSON over stdio for headless mode.

## Responsibilities

| Category          | Detail                                                     |
| ----------------- | ---------------------------------------------------------- |
| Task management   | Spawn / cancel / supervise agent `tokio::task`s.           |
| Plugin host link  | Hand out WASI capability tokens and forward host calls.    |
| Error propagation | Convert anyhow/thiserror to UI notifications & exit codes. |
| Metrics           | Emit OpenTelemetry spans for timing and error rate.        |

## Key APIs

```rust
pub trait AgentHandle {
    async fn send(&self, msg: AgentMsg) -> anyhow::Result<()>;
}
pub struct Orchestrator {
    registry: DashMap<String, AgentHandle>,
}
```

Configuration (TOML)

[orchestrator]
max_concurrent_agents = 8
shutdown_timeout_secs = 10

Extension Hooks
• PluginInit – dynamic registration of new host functions for WASI 🡒 see plugin-host.md.
• AgentFactory – pluggable agent creation for test harnesses.

Implementation Guide

Source files live in crates/orchestrator/. Unit tests mock an in-memory channel layer and use tokio::time::pause to test timers deterministically.
