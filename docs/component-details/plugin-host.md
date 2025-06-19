# WASI Plugin Host

Runs user-provided WebAssembly bundles in a Wasmtime sandbox.

- Wasmtime 1.x claims production-ready isolation and speed [oai_citation:9‡bytecodealliance.org](https://bytecodealliance.org/articles/wasmtime-1-0-fast-safe-and-production-ready?utm_source=chatgpt.com) [oai_citation:10‡bytecodealliance.org](https://bytecodealliance.org/articles/wasmtime-and-cranelift-in-2023?utm_source=chatgpt.com).
- Capability tokens restrict I/O (read-only FS, no network by default).

## Host Functions

| Func                  | Purpose                |
| --------------------- | ---------------------- |
| `plugin.search(text)` | Hybrid retrieval query |
| `plugin.emit(msg)`    | Send UI notification   |

Plugins live in `~/Library/Application Support/Stack Composer/plugins/`.

## Roadmap & Enhancements

- **Plugin Registry:** Planned OCI-based registry for plugin discovery, versioning, and provenance.
- **Plugin Discovery UI:** In-app UI for listing, searching, and managing plugins.
- **Security Templates & SDKs:** WASI Component Model-based SDKs and templates for secure plugin authoring.
- **Sample Plugins:** To be provided with formal docs, CI, and credential-handling best practices.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
