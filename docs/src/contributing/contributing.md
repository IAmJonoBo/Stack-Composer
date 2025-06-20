# Contributing to Stack Composer

> **Note:** All JavaScript/TypeScript package management uses **pnpm** by default. Use **Yarn** only for edge cases (see main README).

{% include "../../_includes/contribution-steps.md" %}

---

## Developer Environment

For a reproducible, fast, and modern developer experience, use the pre-configured Dev Container or Nix environment. See [Toolchain & DX Pipeline](../toolchain.md) for the full toolchain and workflow details.

### Toolchain Checklist

- All required tools (see [dev-setup](../developer-extensibility-docs/dev-setup.md) and [toolchain](../toolchain.md)) are installed
- Qdrant is running via Docker
- Nix is available (restart terminal after install)
- Mutagen is a Rust library, not a CLI tool

- Run `just bootstrap` to set up all dependencies and services
- Use `just check` and `just test` for linting and tests
- See [Developer Setup](../developer-extensibility-docs/dev-setup.md) for step-by-step onboarding

> If you have issues with Nix, Docker, or any tool, see the troubleshooting sections in [dev-setup](../developer-extensibility-docs/dev-setup.md) or open an issue.

### macOS-Specific Setup

⚠️ **macOS developers must follow these additional steps** due to resource fork file issues with Tauri builds:

1. **Set environment variables** (add to your shell profile):
   ```bash
   export COPYFILE_DISABLE=1
   export COPY_EXTENDED_ATTRIBUTES_DISABLE=1
   ```

2. **Use platform-specific build commands**:
   ```bash
   # Regular development (all packages except Tauri)
   cargo check --workspace
   cargo build --workspace
   
   # Tauri development
   ./build-tauri.sh
   ```

3. **Read the full troubleshooting guide**: [macOS Build Issues](../../MACOS_BUILD_ISSUES.md)

**Why?** macOS creates resource fork files (`._*`) that cause Tauri's build script to fail with UTF-8 errors. The workspace excludes Tauri by default to prevent blocking regular development.

---

## Code Quality & Linting Workflow

All linting, formatting, and code quality checks are orchestrated by **Trunk**. This ensures maximum synergy and minimal duplication between Biome, ESLint (unicorn), Prettier, Stylelint, HTMLHint, Markdownlint, Vale, and other tools.

- **Run `trunk check` locally before pushing or opening a PR.** This will run all configured linters, formatters, and code quality tools in a single pass.
- The CI pipeline enforces `trunk check` as the main code quality gate. PRs will not pass unless all Trunk checks succeed.
- Individual linter scripts (e.g., `biome check`, `eslint`, `prettier`, etc.) are deprecated in favor of Trunk orchestration.
- To add or modify code quality tools, update `.trunk/trunk.yaml` and test with `trunk check`.
- For more details, see [Trunk documentation](https://docs.trunk.io/cli) and the project `.trunk/trunk.yaml`.

---

## Pull Request & Review Process

1. Fork the repo and create a feature branch.
2. Make your changes and add/expand tests and documentation as needed.
3. If your change impacts architecture or public APIs, propose an ADR (see below).
4. Open a PR; at least one maintainer must review and approve.
5. All PRs must pass CI, lint, and test checks before merge.
6. Major changes are discussed in GitHub Discussions or community meetings.

---

## Docs Required in PRs

All user-facing or architectural changes **must** include documentation updates. PRs without docs will not be merged. See the PR template for details.

---

## ADR Workflow & Decision Logging

- Propose new ADRs in `/docs/src/architecture/adr/` using the template.
- Each ADR must include a title, date, status, and rationale.
- Update the [ADR log](../architecture/adr/README.md) with each new ADR.

---

## Community Guidelines

- All contributors must follow the [Code of Conduct](code-of-conduct.md).
- Communication is primarily via GitHub Discussions; real-time chat is available via Slack/Discord (see README).
- Quarterly community meetings are open to all; notes are posted in Discussions.

---

## Maintainers & Governance

- See [MAINTAINERS.md](MAINTAINERS.md) for roles, triage rotation, and how to become a maintainer.

---

{% include "../../_includes/top-doc-contributors.md" %}

---

**Next Steps:**

- See [Contributing to Docs](how-to-contribute-docs.md)
- Review [Code of Conduct](code-of-conduct.md)
- Explore [Community & Contribution Overview](README.md)
