# Developer Setup (Architecture Lens)

This page mirrors the canonical developer setup guide with an emphasis on how
the extensibility story fits into the architecture. For the hands-on tutorial
see [`docs/src/developer-extensibility-docs/dev-setup.md`](../../developer-extensibility-docs/dev-setup.md).

## Goals

- Provide a reproducible workspace for building new agents, plugins, and
  orchestration features.
- Keep Rust ↔ TypeScript type boundaries (`tauri-specta`) in sync.
- Ensure Storybook and docs updates accompany agent/UI changes.

## Essentials

1. Clone the repo and run `pnpm install` and `just bootstrap`.
2. Enable the devcontainer or ensure local toolchains (Rust stable, Node 20,
   pnpm 10, Docker) match the [installation guide](../../installation.md).
3. Use `pnpm tauri dev` to run the UI + orchestrator in watch mode.

## Extending Agents

- Add new agents under `agents/<name>` with a `lib.rs` exposing `run()`.
- Register the agent in the orchestrator (`agents/orchestrator/src/main.rs`) and
  update the component doc under `docs/src/component-details/`.
- Write property tests (`proptest`), snapshot tests (`insta`), and attach
  telemetry spans.

## Extending the UI

- Shared design tokens live in `stack-ui/src/styles`. New components must ship a
  Storybook story and Playwright coverage.
- Types flow from Rust via `tauri-specta`; run the type generator after touching
  commands.

## Documentation Contract

Architecture and extensibility changes must be captured in:

- Relevant component docs and FAQs (e.g., `architecture-and-component-guides`).
- ADRs documenting structural decisions.
- Release notes via Changesets.

This keeps the architecture narrative aligned with the implementation reality.
