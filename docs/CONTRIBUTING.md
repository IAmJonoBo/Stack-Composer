# Contributing to Stack Composer

Thank you for your interest in contributing! This guide explains how to get started, propose changes, and participate in the Stack Composer community.

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

---

## Pull Request & Review Process

1. Fork the repo and create a feature branch.
2. Make your changes and add/expand tests and documentation as needed.
3. If your change impacts architecture or public APIs, propose an ADR (see below).
4. Open a PR; at least one maintainer must review and approve.
5. All PRs must pass CI, lint, and test checks before merge.
6. Major changes are discussed in GitHub Discussions or community meetings.

---

## ADR Workflow & Decision Logging

- Propose new ADRs in `/docs/adr/` using the template.
- Each ADR must include a title, date, status, and rationale.
- ADRs are reviewed and merged via PR, with consensus from maintainers.
- All major decisions are logged and linked from the ADR index.

---

## Community Guidelines

- All contributors must follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Communication is primarily via GitHub Discussions; real-time chat is available via Slack/Discord (see README).
- Quarterly community meetings are open to all; notes are posted in Discussions.

---

## Maintainers & Governance

- See [MAINTAINERS.md](../MAINTAINERS.md) for roles, triage rotation, and how to become a maintainer.
