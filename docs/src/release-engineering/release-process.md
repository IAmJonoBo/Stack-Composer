# Release Process

This document describes the release process for Stack Composer.

## Prerequisites

- Ensure your environment is set up as described in [Developer Setup](../../developer-extensibility-docs/dev-setup.md) and [Toolchain](../../toolchain.md).
- All releases must pass automated linting and tests (see [Contributing](../../contributing/contributing.md)).

---

## CI Build Matrix

- Supported platforms: Rust ≥1.70, Ubuntu 22.04, macOS 13+, Windows 11 (WSL2 supported)
- Matrix includes: Rust stable/nightly, Docker build, UI test suite
- Example (GitHub Actions):

```yaml
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        rust: [stable, nightly]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-rust@v1
  with:
    rust-version: }
      - run: cargo build --release
```

---

## Release Automation

- Version bump and changelog generation via semantic-release or PR labels
- SBOM (`bom.json`) updated in CI
- Artifacts signed with GPG in CI
- Publish to GitHub Releases, DockerHub, crates.io as appropriate

---

## Rollback & Hotfix Workflow

- To rollback: redeploy previous Git tag or release artifact
- Hotfix: branch from last tag, patch, CI run, sign, redeploy, update changelog

---

## Troubleshooting

- See [Developer Setup](../../developer-extensibility-docs/dev-setup.md#troubleshooting) for common issues.
- For toolchain issues, refer to [Toolchain](../../toolchain.md#troubleshooting).
