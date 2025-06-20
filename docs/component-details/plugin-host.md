# WASI Plugin Host

## Responsibilities

- Host and manage WASI plugins
- Enforce capability tokens and sandboxing
- Provide host functions for plugin interaction
- Verify plugin signatures (Ed25519)
- Enforce per-plugin permissions (filesystem/network)

## Public APIs

- `load_plugin(path: str)`
- `call_plugin(func: str, args: List)`

## Extension Hooks

- Support for new plugin types (REST, gRPC, future adapters)
- Custom host functions

## Roadmap & Enhancements

- OCI-based plugin registry
- In-app plugin discovery UI
- Security templates & SDKs for plugin authoring
- Sample plugins with docs and best practices
- Registry/discovery UI for plugin management

## Open Questions

- How to manage plugin permissions securely?
- What is the best way to version plugins?
- How to support new plugin transports (GraphRAG, telemetry)?

## How to Extend/Customize

- Add new host functions via the plugin API
- Register new plugin types in the registry
- Configure plugin permissions in the config file

## Real-World Usage Example

```rust
plugin_host.load_plugin("my_plugin.wasm");
```

---

- Plugins are auto-discovered from `~/.local/share/stack-composer/plugins/`.
- Only plugins with valid Ed25519 signatures are loaded (see [Plugin SDK](../plugin-sdk/README.md)).
- Per-plugin permissions (filesystem/network) are enforced as configured (see [Configuration Guide](../configuration.md)).

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [LLM Runtime](llm-runtime.md), [Telemetry Pipeline](telemetry.md)_
