<!-- Toolchain snippet for reuse across docs -->

Stack Composer uses a reproducible, containerized toolchain:

- Rust (cargo, clippy, rustfmt)
- Node.js (pnpm, Biome)
- mdBook (docs-as-code)
- Qdrant & Meilisearch (embedded)
- Wasmtime (WASI plugins)
- Playwright, Storybook, Axe-core (testing)

See [Toolchain](../src/toolchain.md) for full details.
