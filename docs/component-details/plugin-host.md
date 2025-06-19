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
