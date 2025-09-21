# Toolchain (Architecture View)

This page summarises the tooling choices that influence Stack Composer’s
architecture. For step-by-step install instructions see
[`docs/src/toolchain.md`](../toolchain.md).

## Toolchain Pins

- Rust is pinned through `rust-toolchain.toml` to the latest stable channel with
  `clippy`, `rustfmt`, and `wasm32-wasi` pre-installed. Contributors should rely
  on `rustup` respecting the file rather than selecting a manual toolchain.
- JavaScript tooling is controlled by the `packageManager` entry in
  `package.json` (`pnpm@10.x`). pnpm installs should be run with
  `pnpm install --frozen-lockfile` (or via `just reproduce-build`).
- For a hermetic experience, use the devcontainer (`.devcontainer/`) or the
  forthcoming Nix flake (tracked in migration board).

## Build Systems

- **Rust workspace** (`Cargo.toml`, resolver `2`) for orchestrator and agents. We
  lean on `cargo nextest`, `cargo fmt`, and `cargo clippy` in CI.
- **pnpm workspace** for UI, Tauri shell, and docs tooling. `pnpm install`
  hydrates all JS packages; `pnpm changeset` manages releases.
- **Justfile** orchestrates cross-language commands (`just bootstrap`,
  `just check`), including Qdrant/Meilisearch containers.

## Continuous Integration

- GitHub Actions matrix (`.github/workflows/ci.yml`) runs on Ubuntu, macOS, and
  Windows. It caches Cargo and pnpm deps, runs trunk (lint), builds the UI,
  compiles the Rust workspace, and runs tests.
- Security gates include `cargo-audit`, `cargo-deny`, `dep-scan`, and
  `lychee` (link checker).
- Accessibility automation: `axe-core-cli` against the built UI.

## Environments

- **Devcontainer** (`.devcontainer/devcontainer.json`) provisions pinned Rust,
  Node 20, pnpm 10, Docker-in-Docker, and Python. Post-create hook runs
  `just bootstrap && just check`.
- **Native dev**: macOS users must set `COPYFILE_DISABLE=1` to avoid resource
  forks in Tauri builds. Windows runs best through WSL 2 for Rust + pnpm parity.

## Observability Tooling

- OpenTelemetry collectors instrument agents and orchestrator. Exporters write
  JSON spans to `~/.local/share/stack-composer/telemetry/`.
- `criterion` benchmarks provide performance profiles; `insta` snapshots capture
  prompt/response baselines.

## Release Automation

- Changesets drive versioning; CI produces SBOMs, provenance, and Tauri
  artefacts.
- Release notes are generated from Changeset summaries and posted alongside the
  GitHub release. Artefacts are signed (cosign) once release automation work
  lands in S-05.

For deeper guidance on installation and day-to-day workflows, read the
[Toolchain & DX Pipeline guide](../toolchain.md).
