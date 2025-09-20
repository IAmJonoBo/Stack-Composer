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
 
---

# Copilot Coding Agent: Repository Instructions (detailed)

This section captures the build/test/lint/run commands, environments, and conventions the agent must follow.

## Quick facts

- Monorepo: Rust workspace + Tauri + Vite/React UI
- Primary package manager: pnpm (use Yarn only for rare edge cases)
- Rust version: stable (see CI); workspace at root `Cargo.toml`
- UI dev server: Vite
- Desktop app: Tauri v2
- Docs: mdBook under `docs/` (sources in `docs/src`)

## Build, run, test

- Install deps: root `pnpm install`; UI `cd stack-ui && pnpm install`
- Build: root `pnpm build`; UI `cd stack-ui && pnpm build`; Rust `cargo build --workspace --all-targets`
- Test: JS/TS `pnpm test`; Rust `cargo test --workspace --all-targets`
- Dev: Web `pnpm dev` (Vite); Tauri `pnpm tauri:dev`; Build app `pnpm tauri:build`

## Linting & formatting

- JS/TS: `pnpm lint` (Trunk), Biome quick check `pnpm biome`
- Markdown: `pnpm mdlint` (or `mdlint:fix`)
- Docs prose: `vale docs/`
- Rust: `cargo clippy --all-targets --all-features -- -D warnings`; `cargo fmt --all`

## Runtime services

- Optional: Qdrant + Meilisearch via `just bootstrap` (Docker)
- macOS: ensure `COPYFILE_DISABLE=1` in scripts

## Repo layout

- Root JS: `src/`, Vite tests only at root
- UI app: `stack-ui/`
- Desktop app: `src-tauri/`
- Rust agents/backend: `agents/*`, `rust-backend/`
- Docs: `docs/src/` (mdBook sources)

## Acceptance checklist

1. `pnpm install` at root and in `stack-ui/`
2. `pnpm build` at root and `stack-ui/`
3. `cargo build --workspace`
4. `pnpm test` and `cargo test --workspace`
5. For UI changes: `pnpm preview` (or `cd stack-ui && pnpm preview`)
