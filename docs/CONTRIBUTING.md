# Contributing to Stack Composer

## Developer Environment

For a reproducible, fast, and modern developer experience, use the pre-configured Dev Container or Nix environment. See [Toolchain & DX Pipeline](../toolchain.md) for the full toolchain and workflow details.

### Toolchain Checklist

- All required tools (see [dev-setup](dev-setup.md) and [toolchain](../toolchain.md)) are installed
- Qdrant is running via Docker
- Nix is available (restart terminal after install)
- Mutagen is a Rust library, not a CLI tool

- Run `just bootstrap` to set up all dependencies and services
- Use `just check` and `just test` for linting and tests
- See [Developer Setup](dev-setup.md) for step-by-step onboarding

> If you have issues with Nix, Docker, or any tool, see the troubleshooting sections in [dev-setup](dev-setup.md) or open an issue.
