# Developer Setup & Environment

Stack Composer is designed for a reproducible, fast, and modern developer experience. For the best results, use the pre-configured Dev Container or Nix environment, which provides all required tools and matches CI. See [Toolchain & DX Pipeline](../src/toolchain.md) for a full breakdown of the tools and workflow.

## Required Tools

- Rust (via rustup)
- Node.js (≥ v20)
- pnpm
- just
- tauri CLI
- biome
- vale
- mdbook
- cargo-nextest
- stryker
- cargo-audit
- cargo-deny
- cargo-udeps
- wasmtime
- trivy
- nix (restart terminal after install)
- Qdrant (runs via Docker)
- Meilisearch
- Renovate
- gh (GitHub CLI)

> **Note:** Qdrant is run via Docker for local development. Mutagen is a Rust library, not a CLI tool.

## Quick Start

1. **Clone the repo and open in VS Code**
   - If prompted, reopen in Dev Container (requires Docker and VS Code Remote Containers extension)
   - Or, run `nix develop` if you use Nix (restart terminal after install)
2. **Bootstrap the environment**
   - Run `just bootstrap` to install dependencies and spin up Qdrant & Meilisearch
3. **Check code quality**
   - Run `just check` to lint Rust, JS/TS, and Markdown (Clippy, Biome, Vale)
4. **Run tests**
   - Run `just test` for fast, parallelized tests (cargo-nextest)
5. **Build and run**
   - Use `just build` and `just run` for local development

## Editor Setup

- VS Code is recommended (settings enable GitHub Copilot, Copilot Chat, Vale lint-on-save, and workspace tasks)
- Extension recommendations include GitHub Copilot, Rust Analyzer, and development tools
- Codespaces and Fleet are supported for cloud and JetBrains workflows

## Python & Conda Workflows

Stack Composer supports both the fully managed Dev Container workflow (recommended) and local Python/conda environments for maximum flexibility:

- **Dev Container (Recommended):**

  - Provides a reproducible, pre-configured environment with Python (latest) and all required tools.
  - No changes are needed to your local Python or conda setup.
  - Ideal for contributors who want a zero-setup experience or need to match CI exactly.

- **Local Python/Conda:**
  - You may use your own Python or conda environments outside the devcontainer.
  - The `.conda` directory is used for local conda environments and is ignored by git.
  - The devcontainer does not modify or require `.conda`.
  - This allows advanced users to manage dependencies or use custom Python setups as needed.

**Note:** Both workflows can coexist. The devcontainer will not interfere with your local `.conda` directory or Python environments. Choose the workflow that best fits your needs.

## More

- For details on the full toolchain, see [Toolchain & DX Pipeline](../src/toolchain.md)
- For architecture, see [Architecture Overview](../src/architecture/architecture-overview.md)
- For contributing, see [CONTRIBUTING.md](../src/contributing/contributing.md)
