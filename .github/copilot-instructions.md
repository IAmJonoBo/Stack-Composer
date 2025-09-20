# Copilot Coding Agent: Repository Instructions

This file teaches GitHub Copilot’s coding agent how to work effectively in this repository. It captures the build/test/lint/run commands, environments, and conventions the agent must follow. Keep it up to date as the project evolves.

---

## Quick facts

- Monorepo: Rust workspace + Tauri + Vite/React UI
- Primary package manager: pnpm (use Yarn only for rare edge cases)
- Rust version: stable (see CI); workspace at root `Cargo.toml`
- UI dev server: Vite
- Desktop app: Tauri v2
- Docs: mdBook under `docs/` (sources in `docs/src`)

---

## What to build and how

- Install JS deps (root): `pnpm install`
- Install UI deps (stack-ui): `cd stack-ui && pnpm install`
- Rust build (workspace): `cargo build --workspace --all-targets`
- UI build: `pnpm build` (root) or `cd stack-ui && pnpm build`
- Tauri dev: `pnpm tauri dev` (root script `tauri:dev` exists)
- Tauri build: `pnpm tauri build` (root script `tauri:build` exists)
- Full build via Just: `just build` (if `just` is installed)

Preferred scripts (root `package.json`):
- Dev web: `pnpm dev`
- Build web: `pnpm build`
- Preview web: `pnpm preview`
- Rust only: `pnpm run rust:build` | `rust:run` | `rust:test`

Docs:
- Build & test docs: `cd docs && mdbook build && mdbook test`

---

## How to test

- JS/TS unit tests: `pnpm test` (Vitest; config in `vite.config.ts` and `vitest.setup.ts`)
- UI test UI: `pnpm test:ui`
- Rust tests: `cargo test --workspace --all-targets` (CI uses this)
- End-to-end/security/a11y (CI):
  - Axe-core CLI against `stack-ui/dist` (after UI build)
  - `dep-scan` for dependency vulnerabilities
  - `cargo deny check` and `cargo audit`

Where possible, prefer running via Just:
- `just check` (clippy, eslint, markdownlint, vale)
- `just test` (cargo-nextest + vitest) if nextest is available

---

## Linting & formatting

- JS/TS lint: `eslint . --ext .js,.ts,.tsx` (configured in `eslint.config.js`)
- Biome quick check: `pnpm biome check ...` (root script `biome`)
- Markdown lint: `pnpm mdlint` (or `mdlint:fix`)
- Docs prose: `vale docs/`
- Rust: `cargo clippy --all-targets --all-features -- -D warnings`
- Format: `prettier --write .` and `cargo fmt --all`

The CI also runs `trunk check --all` for aggregated quality gates.

---

## Runtime services & environment

- Local services (optional for some features): Qdrant + Meilisearch
  - Use `just bootstrap` to start: `docker compose up -d qdrant meilisearch`
- macOS builds: Set `COPYFILE_DISABLE=1` to avoid resource fork issues (root scripts already do this).
- Dev server: Vite on port 5173 (see `stack-ui/vite.config.ts`).

---

## Repository layout

- Root JS app (hybrid wizard, tests): `src/`, Vite config in `vite.config.ts`
- UI playground app: `stack-ui/` (own `package.json`, Vite config)
- Desktop app: `src-tauri/` (separate Cargo project for Tauri)
- Rust backend & agents: `rust-backend/`, `agents/*` (in root Rust workspace)
- Docs-as-code: `docs/` with sources in `docs/src` and built book in `docs/book`

pnpm workspace (`pnpm-workspace.yaml`) includes: `stack-ui`, `src-tauri`, `agents/*`, `rust-backend`, `docs`.

---

## What to ignore / avoid

- Do not use Yarn unless explicitly necessary; default to pnpm.
- Avoid writing or committing to `book/` or `docs/book/` (generated).
- Don’t place build outputs in Git; keep them artefacts only.
- Don’t introduce incompatible licences; CI enforces via `cargo-deny` and dep-scan.
- Respect ignore lists in `biome.json` and ESLint ignores.

---

## Pull request expectations

- Add/update docs for user-facing or architectural changes (see `docs/src/...`).
- Update ADRs if public APIs or architecture are affected (`docs/src/architecture/adr/`).
- Ensure CI passes across Linux/macOS/Windows.
- Accessibility check passes on built UI (`stack-ui/dist`).

---

## Typical agent tasks

- Add a new UI component: place in `src/` (or `stack-ui/src/` for the playground), export as needed, add unit tests in `tests/` or alongside the component, run `pnpm test`.
- Add a Rust crate or module: update the root `Cargo.toml` workspace members if needed, implement code in `agents/*` or `rust-backend/`, and run `cargo test`.
- Update docs: edit under `docs/src/`, rebuild locally with mdBook if necessary.

---

## Minimal acceptance check (local)

1. `pnpm install` at root and in `stack-ui/`
2. `pnpm build` at root and `stack-ui/`
3. `cargo build --workspace`
4. `pnpm test` and `cargo test --workspace`
5. For UI changes: run `pnpm preview` (or `cd stack-ui && pnpm preview`) and smoke test.

---

## References

- See `.github/workflows/ci.yml` for the authoritative CI matrix and tools.
- macOS notes: `QUICK_START_MACOS.md` and `build-tauri.sh` for Tauri specifics.
- Docs toolchain: `docs/src/toolchain.md`.
