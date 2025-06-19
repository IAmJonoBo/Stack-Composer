# Developer Setup & Environment

Stack Composer is designed for a reproducible, fast, and modern developer experience. For the best results, use the pre-configured Dev Container or Nix environment, which provides all required tools and matches CI. See [Toolchain & DX Pipeline](toolchain.md) for a full breakdown of the tools and workflow.

## Quick Start

1. **Clone the repo and open in VS Code**
   - If prompted, reopen in Dev Container (requires Docker and VS Code Remote Containers extension)
   - Or, run `nix develop` if you use Nix
2. **Bootstrap the environment**
   - Run `just bootstrap` to install dependencies and spin up Qdrant & Meilisearch
3. **Check code quality**
   - Run `just check` to lint Rust, JS/TS, and Markdown (Clippy, Biome, Vale)
4. **Run tests**
   - Run `just test` for fast, parallelized tests (cargo-nextest)
5. **Build and run**
   - Use `just build` and `just run` for local development

## Editor Setup

- VS Code is recommended (settings enable Copilot Chat, Vale lint-on-save, and workspace tasks)
- Codespaces and Fleet are supported for cloud and JetBrains workflows

## More

- For details on the full toolchain, see [Toolchain & DX Pipeline](toolchain.md)
- For architecture, see [Architecture Overview](architecture-overview.md)
- For contributing, see [CONTRIBUTING.md](CONTRIBUTING.md)