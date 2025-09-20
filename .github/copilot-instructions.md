## Stack Composer — AI agent instructions

Use this as your operating manual when proposing edits or generating code in this repo. Keep changes small, type-safe, and aligned with the conventions below.

### Big picture (mental model)

- Desktop-first app: Rust + Tauri runtime, React/Vite UI. Local-first by default.
- Orchestrator (Axum) exposes a thin REST surface at http://127.0.0.1:5174:
  - POST `/api/v1/command` routes to agents by `{"agent": "ingestion|retrieval|critic|telemetry"}`.
  - GET `/api/v1/events` (stub). See `agents/orchestrator/src/main.rs`.
- Agents live in `agents/*` crates with an async `run()` entrypoint; the orchestrator dispatches on a string key.
- UI lives in `stack-ui/` (canonical). Tauri config in `src-tauri/` wires the desktop shell to a dev server on 3010.
- Extensibility: WASI plugins (Wasmtime). See `crates/plugin-host/wit/` and `examples/plugins/plugin.toml`.

### Where to make changes

- Backend logic: create/modify an agent crate under `agents/<name>/` and export `pub async fn run(...)`.
- Orchestrator wiring: add a new match arm in `agents/orchestrator/src/main.rs` for your agent key.
- UI: `stack-ui/src/**` (React + Tailwind + shadcn). Typecheck with `pnpm --filter stack-ui run typecheck`.
- Tauri app shell: `src-tauri/**` (config in `tauri.conf.json`).
- Docs-as-code: `docs/src/**` (mdBook). ADRs under `docs/src/architecture/adr/`.

### Project-specific conventions

- Package manager: pnpm only (Yarn only for rare edge cases explicitly documented).
- MacOS builds: always set `COPYFILE_DISABLE=1` (Tauri and Rust builds trip on `._*` files). Prefer `./build-tauri.sh` for Tauri.
- Type boundaries: Rust↔TS contracts generated via tauri-specta; after adding/changing Rust commands, regenerate types (see `docs/src/architecture/migration.md`).
- Commits/PRs: Conventional Commits titles; update ADRs when changing architecture or public APIs; docs required for user-facing changes.

### Common workflows (fast path)

- Install, lint, test:
  - `just bootstrap` → pnpm install, cargo fetch, start Qdrant + Meilisearch in Docker.
  - `just check` → clippy, eslint, markdownlint, vale.
  - `just test` → Rust (nextest) + `pnpm vitest run`.
  - `just smoke` → quick pre-PR validation.
- UI dev/build (canonical UI is `stack-ui/`):
  - `cd stack-ui && pnpm dev | build | preview`.
  - CI also builds `stack-ui` specifically.
- Tauri dev/build: root scripts `pnpm tauri:dev` / `pnpm tauri:build` (honor macOS env vars).
- Reproducible build: `just reproduce-build` (locked deps, deterministic build check).

### Integration points & patterns

- REST from UI/CLI to orchestrator: prefer small JSON payloads with an `agent` discriminator matching orchestrator routing.
- Adding a new agent end-to-end:
  1) Scaffold `agents/foo/` crate, export `pub async fn run() -> anyhow::Result<…>`.
  2) Wire in `orchestrator/src/main.rs` `match "foo" => run_foo().await …`.
  3) Add minimal tests (`cargo nextest run -p foo`) and a smoke path.
  4) If UI consumes it, update TS types (tauri-specta) and add a minimal UI action.
- Plugins (WASI): define capability needs via manifest (`examples/plugins/plugin.toml`), keep to sandbox; host interfaces live under `crates/plugin-host/wit/`.

### What CI expects (keep green)

- `trunk check` across repo, cargo fmt/clippy, `cargo deny`, link checker (Lychee), mdBook build/tests, UI typecheck/build, basic Axe accessibility on `stack-ui/dist`.
- PR title validated against Conventional Commits; docs/ADR updates are part of review.

### Pointers (read before big edits)

- Architecture overview: `docs/src/architecture/architecture-overview.md` (system/data flows, component boundaries).
- Roadmap & sprint shape: `PROJECT_BRIEF.md`, `ROADMAP.md`, `TASK_GRAPH.md`.
- macOS build guidance: `docs/MACOS_BUILD_ISSUES.md`, `build-tauri.sh`.

If anything here is ambiguous (e.g., tauri-specta type generation command, or which UI to touch when files exist in both root and `stack-ui/`), prefer `stack-ui/` and reference the docs above. Ask to clarify and we’ll tighten this file.

## Stack Composer — AI agent instructions

Use this as your operating manual when proposing edits or generating code in this repo. Keep changes small, type-safe, and aligned with the conventions below.

### Big picture (mental model)
- Desktop-first app: Rust + Tauri runtime, React/Vite UI. Local-first by default.
- Orchestrator (Axum) exposes a thin REST surface at http://127.0.0.1:5174:
  - POST `/api/v1/command` routes to agents by `{"agent": "ingestion|retrieval|critic|telemetry"}`.
  - GET `/api/v1/events` (stub). See `agents/orchestrator/src/main.rs`.
- Agents live in `agents/*` crates with an async `run()` entrypoint; the orchestrator dispatches on a string key.
- UI lives in `stack-ui/` (canonical). Tauri config in `src-tauri/` wires the desktop shell to a dev server on 3010.
- Extensibility: WASI plugins (Wasmtime). See `crates/plugin-host/wit/` and `examples/plugins/plugin.toml`.

### Where to make changes
- Backend logic: create/modify an agent crate under `agents/<name>/` and export `pub async fn run(...)`.
- Orchestrator wiring: add a new match arm in `agents/orchestrator/src/main.rs` for your agent key.
- UI: `stack-ui/src/**` (React + Tailwind + shadcn). Typecheck with `pnpm --filter stack-ui run typecheck`.
- Tauri app shell: `src-tauri/**` (config in `tauri.conf.json`).
- Docs-as-code: `docs/src/**` (mdBook). ADRs under `docs/src/architecture/adr/`.

### Project-specific conventions
- Package manager: pnpm only (Yarn only for rare edge cases explicitly documented).
- MacOS builds: always set `COPYFILE_DISABLE=1` (Tauri and Rust builds trip on `._*` files). Prefer `./build-tauri.sh` for Tauri.
- Type boundaries: Rust↔TS contracts generated via tauri-specta; after adding/changing Rust commands, regenerate types (see `docs/src/architecture/migration.md`).
- Commits/PRs: Conventional Commits titles; update ADRs when changing architecture or public APIs; docs required for user-facing changes.

### Common workflows (fast path)
- Install, lint, test:
  - `just bootstrap` → pnpm install, cargo fetch, start Qdrant + Meilisearch in Docker.
  - `just check` → clippy, eslint, markdownlint, vale.
  - `just test` → Rust (nextest) + `pnpm vitest run`.
  - `just smoke` → quick pre-PR validation.
- UI dev/build (canonical UI is `stack-ui/`):
  - `cd stack-ui && pnpm dev | build | preview`.
  - CI also builds `stack-ui` specifically.
- Tauri dev/build: root scripts `pnpm tauri:dev` / `pnpm tauri:build` (honor macOS env vars).
- Reproducible build: `just reproduce-build` (locked deps, deterministic build check).

### Integration points & patterns
- REST from UI/CLI to orchestrator: prefer small JSON payloads with an `agent` discriminator matching orchestrator routing.
- Adding a new agent end-to-end:
  1) Scaffold `agents/foo/` crate, export `pub async fn run() -> anyhow::Result<…>`.
  2) Wire in `orchestrator/src/main.rs` `match "foo" => run_foo().await …`.
  3) Add minimal tests (`cargo nextest run -p foo`) and a smoke path.
  4) If UI consumes it, update TS types (tauri-specta) and add a minimal UI action.
- Plugins (WASI): define capability needs via manifest (`examples/plugins/plugin.toml`), keep to sandbox; host interfaces live under `crates/plugin-host/wit/`.

### What CI expects (keep green)
- `trunk check` across repo, cargo fmt/clippy, `cargo deny`, link checker (Lychee), mdBook build/tests, UI typecheck/build, basic Axe accessibility on `stack-ui/dist`.
- PR title validated against Conventional Commits; docs/ADR updates are part of review.

### Pointers (read before big edits)
- Architecture overview: `docs/src/architecture/architecture-overview.md` (system/data flows, component boundaries).
- Roadmap & sprint shape: `PROJECT_BRIEF.md`, `ROADMAP.md`, `TASK_GRAPH.md`.
- macOS build guidance: `docs/MACOS_BUILD_ISSUES.md`, `build-tauri.sh`.

If anything here is ambiguous (e.g., tauri-specta type generation command, or which UI to touch when files exist in both root and `stack-ui/`), prefer `stack-ui/` and reference the docs above. Ask to clarify and we’ll tighten this file.
