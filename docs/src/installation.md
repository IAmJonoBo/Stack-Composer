# Installation

Stack Composer is a desktop-first Rust + Tauri application. This guide walks you through
the minimum toolchain required to build and run the project locally, highlights
platform specifics, and points to next steps once everything is in place.

## Prerequisites

| Requirement            | Notes                                                                 |
| ---------------------- | --------------------------------------------------------------------- |
| Operating systems      | macOS (13+), Ubuntu 22.04 LTS, Windows 11 (WSL 2 supported).          |
| Hardware               | 4 cores, 16 GB RAM recommended (minimum 4 GB for lightweight flows).  |
| Package manager        | `pnpm` ≥ 10 (the repo uses a workspace).                              |
| Rust toolchain         | Stable toolchain via `rustup`; components `clippy` and `rustfmt`.     |
| Node.js                | v20 or newer (aligns with Tauri 2.x support matrix).                  |
| Python (optional)      | Required for some tooling inside the devcontainer (docs builders).    |

You will also need Docker Desktop (or a compatible container runtime) if you intend to
run the optional Qdrant and Meilisearch services locally.

## Install Core Tooling

1. **Install Rust**

   ```sh
   curl https://sh.rustup.rs -sSf | sh
   rustup toolchain install stable --component clippy rustfmt
   ```

2. **Install Node.js and pnpm**

   ```sh
   # Using Volta (recommended)
   curl https://get.volta.sh | bash
   volta install node@20
   volta install pnpm@10
   ```

   If you prefer a different version manager, ensure `node --version` reports 20.x or newer.

3. **Install Just, Trunk, and mdBook**

   ```sh
   cargo install just trunk-cli mdbook
   ```

   `trunk` orchestrates linting, while `mdbook` handles the documentation site build.

4. **Install Tauri CLI**

   ```sh
   pnpm add -g @tauri-apps/cli
   ```

5. **Optional: Docker-backed services**

   ```sh
   docker compose up -d qdrant meilisearch
   ```

   This brings up the hybrid retrieval components used by the ingestion and retrieval agents.

## Clone and Bootstrap

```sh
git clone https://github.com/your-org/stack-composer
cd stack-composer
pnpm install
just bootstrap
```

- `pnpm install` hydrates the JavaScript workspace.
- `just bootstrap` pulls Rust crates and starts the optional data services.

If you hit macOS resource fork issues during Rust builds, export the environment variables
called out in `README.md` (`COPYFILE_DISABLE=1`, `COPY_EXTENDED_ATTRIBUTES_DISABLE=1`).

## Verify the Toolchain

Run the aggregated checks before doing local development:

```sh
just check
just test
```

`just check` runs `cargo clippy`, `eslint`, Vale, markdownlint, and other quality gates.
`just test` delegates to `cargo nextest` and `pnpm vitest`.

For a faster smoke test you can build the Tauri shell directly:

```sh
pnpm run build
pnpm tauri build
```

The first invocation will download the default Ollama model (if missing) and produce an
artifact under `src-tauri/target`.

## Using the Devcontainer (optional)

A preconfigured VS Code devcontainer lives in `.devcontainer/devcontainer.json`. If you
prefer an isolated toolchain:

1. Install the VS Code Dev Containers extension.
2. Run **Reopen in Container** at the repo root.
3. Allow the post-create hook to run `just bootstrap && just check`.

This is the fastest path to a reproducible environment if you do not want to manage the
native dependencies yourself.

## Next Steps

- Walk through the [Quick Start](./getting-started/quickstart.md).
- Review the [Toolchain & DX Pipeline](./toolchain.md) guide for deeper configuration.
- Consult the [Developer Setup](./architecture/developer-extensibility-docs/dev-setup.md)
  doc if you are contributing to the agent or planner subsystems.
