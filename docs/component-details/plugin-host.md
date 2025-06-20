# WASI Plugin Host

## Responsibilities

- Host and manage WASI plugins
- Enforce capability tokens and sandboxing
- Provide host functions for plugin interaction

## Public APIs

- `load_plugin(path: str)`
- `call_plugin(func: str, args: List)`

## Extension Hooks

- Support for new plugin types
- Custom host functions

## Roadmap & Enhancements

- OCI-based plugin registry
- In-app plugin discovery UI
- Security templates & SDKs for plugin authoring
- Sample plugins with docs and best practices

## Open Questions

- How to manage plugin permissions securely?
- What is the best way to version plugins?

## How to Extend/Customize

- Add new host functions via the plugin API
- Register new plugin types in the registry

## Real-World Usage Example

```rust
plugin_host.load_plugin("my_plugin.wasm");
```

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [LLM Runtime](llm-runtime.md), [Telemetry Pipeline](telemetry.md)_
