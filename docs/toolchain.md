# Toolchain & Developer Experience Pipeline

## Tool Installation & Setup

All required tools for Stack Composer are open source and can be installed on macOS using Homebrew, npm, and Docker:

- **Rust**: [rustup.rs](https://rustup.rs/) (for cargo, clippy, etc.)
- **Node.js**: [nodejs.org](https://nodejs.org/) (≥ v20)
- **pnpm**: `brew install pnpm`
- **just**: `brew install just`
- **tauri CLI**: `npm install -g @tauri-apps/cli`
- **biome**: `brew install biome`
- **vale**: `brew install vale`
- **mdbook**: `brew install mdbook`
- **cargo-nextest**: `cargo install cargo-nextest`
- **stryker**: `npm install -g stryker-cli`
- **cargo-audit**: `cargo install cargo-audit`
- **cargo-deny**: `cargo install cargo-deny`
- **cargo-udeps**: `cargo install cargo-udeps`
- **wasmtime**: `brew install wasmtime`
- **trivy**: [install script](https://aquasecurity.github.io/trivy/v0.63.0/installation/)
- **nix**: [install script](https://nixos.org/download.html) (restart terminal after install)
- **Qdrant**: `docker run -d --name qdrant -p 6333:6333 qdrant/qdrant` (requires Docker)
- **Meilisearch**: [install script](https://www.meilisearch.com/docs/learn/getting_started/installation)
- **Renovate**: `npm install -g renovate`
- **gh (GitHub CLI)**: `brew install gh`

> **Note:** `mutagen` is a Rust library, not a CLI tool. Qdrant is run via Docker for local development.

---

## Overview

Developers clone the repo and open Dev Containers (or nix develop) to get a pre-wired Rust + Node + Tauri environment; just bootstrap spins up Qdrant & Meilisearch in the background; VS Code (or Fleet) loads a workspace with Copilot Chat and inline tests. Every save triggers lightning-fast incremental builds via cargo-nextest, Biome, and ESLint. CI mirrors that exact toolchain in GitHub Actions matrices, where tauri-action cross-compiles, signs, notarises, and uploads artefacts for macOS, Windows, and Linux. Release automation, dependency-update bots, mutation-testing feedback, and mdBook-driven docs put the finishing DX polish on top.

---

## 1 — Environment bootstrap

| Concern                | Baseline              | DX Upgrade                                   | Why it helps                                      |
|------------------------|----------------------|----------------------------------------------|---------------------------------------------------|
| Deterministic dev env  | Manual tool installs | Dev Containers (.devcontainer.json), Nix     | One-click VS Code experience; same rustc/Node in CI|
| Task runner            | cargo make           | justfile aliases (just bootstrap test release)| Simpler syntax; tasks can run outside Rust ws      |
| Editor setup           | VS Code defaults     | Settings for Copilot Chat & Vale lint-on-save | Instant AI help plus prose lint for docs           |

---

## 2 — Code quality & feedback loop

| Layer         | Tool(s)                        | DX gain                        |
|---------------|-------------------------------|--------------------------------|
| Rust lint     | Clippy in cargo check/pre-commit| Idiomatic code suggestions     |
| JS/TS lint    | Biome (Rust-powered)           | <50 ms file checks             |
| Markdown style| Vale, inclusive language checks| Guards docs quality            |
| Tests         | cargo-nextest                  | Up to 3× faster than cargo test|
| Mutation tests| mutagen-rs (Rust), StrykerJS   | Surfaces false-positive tests  |

---

## 3 — Build, dependency & artefact management

- pnpm 8 monorepo workspaces for the React front-end; its symlinked store slashes install times.
- cargo-dist to generate notarised .dmg, .msi, AppImage; integrates with Tauri artefacts.
- Renovate bot auto-opens PRs for Cargo, npm, GitHub-Action version bumps.

---

## 4 — Static analysis & security

| Tool                | Scope                        |
|---------------------|------------------------------|
| cargo-audit, denylists | Rust CVE / licence scan   |
| trivy               | Container & SBOM scan in CI  |
| cargo-udeps         | Dead-code & unused-dep prune |

---

## 5 — Documentation & knowledge flow

- mdBook generates a versioned site with live-reload for docs-first culture.
- ADR-tools & GitHub Issues templates ensure decisions and docs evolve together.
- Mermaid diagrams embedded in mdBook for architecture visuals.

---

## 6 — Observability & telemetry

- OpenTelemetry Rust SDK with file exporter writes JSON traces locally (no network).
- One-click toggle uploads compressed trace bundles to Jaeger when users opt-in.
- Metrics pipeline surfaces slow PDDL-plan steps for optimisation.

---

## 7 — CI / CD & release

| Stage           | Tool/Source                        | Benefit                                 |
|-----------------|------------------------------------|-----------------------------------------|
| Matrix build    | tauri-action cross-compiles         | Notarises macOS, Win, Linux             |
| Notarisation    | xcrun notarytool, GitHub OIDC       | Zero manual Apple keychain prompts      |
| Container tests | Dagger or Earthly                   | Same steps locally and in CI            |
| Release notes   | semantic-release                    | Changelog from commit messages          |
| Update channel  | Tauri’s built-in updater            | Auto-prompt users for new versions      |

---

## 8 — Runtime extensibility & sandboxing

- Wasmtime 1.x secures third-party WASI plugins with syscall-level capability restrictions.
- cargo wasi dev-cycle integrated into Dev Container so plugin authors hit just plugin-run and see live results.

---

## 9 — Data & reasoning back-ends

| Function     | Tool/Source                        |
|--------------|------------------------------------|
| Vector DB    | Qdrant embedded; zero external svc |
| Hybrid search| Meilisearch 1.6 (dense + BM25)     |
| Planning     | Fast Downward / OPTIC via CLI      |
| LLM          | Ollama REST API; hot-swap GGUF     |

---

## 10 — Developer-facing UX niceties

- Rich terminal UI (tui-rs) for headless stack generation progress.
- VS Code Tasks auto-invoke just recipes for lint/test/build.
- GitHub Codespaces dev-container file brings cloud IDE parity.

---

## In practice

1. `git clone … && devcontainer open` → full toolchain ready.
2. `just check` → Clippy, Biome, Vale all pass in <5 s.
3. `just test` → cargo-nextest runs in parallel; failures pop back into Copilot Chat for suggested fixes.
4. `gh pr create` triggers the matrix CI; on merge, tauri-action publishes signed binaries and semantic-release cuts version + changelog.
5. Users download or auto-update via Tauri’s updater; local JSON telemetry tells you which features they use (if they opt-in).

With this pipeline, every stage—from first clone to signed installer—responds in seconds or minutes, not hours, and every tool is either Apache-2.0, MIT, or a service-less Rust binary. DX-wise, that means fewer “works on my machine” bugs, instant feedback loops, and a single command to release across all desktop platforms.
