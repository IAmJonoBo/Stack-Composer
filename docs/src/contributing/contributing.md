# Contributing to Stack Composer

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

- All contributors must follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Communication is primarily via GitHub Discussions; real-time chat is available via Slack/Discord (see README).
- Quarterly community meetings are open to all; notes are posted in Discussions.

---

## Maintainers & Governance

- See [MAINTAINERS.md](MAINTAINERS.md) for roles, triage rotation, and how to become a maintainer.

---

{% include "../../_includes/top-doc-contributors.md" %}

---

**Next Steps:**

- See [Contributing to Docs](contributing-to-docs.md)
- Review [Code of Conduct](CODE_OF_CONDUCT.md)
- Explore [Community & Contribution Overview](README.md)
