# Component Details Index

A map of every major module in Stack Composer. Each link points to a dedicated
document (`.md`) that dives into responsibilities, APIs, data contracts, and
extension hooks.

| Component                               | Filename              | Status |
| --------------------------------------- | --------------------- | ------ |
| Ingestion Agent                         | `ingestion-agent.md`  | _TODO_ |
| Gap Agent                               | `gap-agent.md`        | _TODO_ |
| Stack Agent                             | `stack-agent.md`      | _TODO_ |
| Report Agent                            | `report-agent.md`     | _TODO_ |
| Planner Adapter (Fast Downward / OPTIC) | `planner-adapter.md`  | _TODO_ |
| Retrieval Layer (Qdrant + Meilisearch)  | `retrieval-layer.md`  | _TODO_ |
| LLM Runtime Abstraction                 | `llm-runtime.md`      | _TODO_ |
| WASI Plugin Host                        | `plugin-host.md`      | _TODO_ |
| Weekly Crawler                          | `ontology-crawler.md` | _TODO_ |
| Telemetry Pipeline                      | `telemetry.md`        | _TODO_ |

> **Tip:** When you flesh out a component, begin with its _raison d’être_,
> list any public structs/traits (if Rust) or messages (if TypeScript), and
> finish with extension examples.

---

## See Also

- [AI Platform Overview](../architecture-roadmap/AI Platform Overview.md): High-level vision, navigation, and links to all major docs.
- [AI Wizard Roadmap](../Architecture & Component Guides/ai-wizard-roadmap.md): Phased plan and feature set.
- [Architecture Questions](../Architecture & Component Guides/architecture-questions.md): Open questions and deployment plan.
- [Main Roadmap](../architecture-roadmap/roadmap.md): Milestones and strategic priorities.

---

## Tooling Setup for Documentation and Linting

This project uses several tools to ensure high-quality documentation and code:

## Documentation Tools

- **mdBook**: Generates multi-page Rust-style manuals with Mermaid diagram support.
  - Install: `cargo install mdbook`
- **rustdoc / cargo doc**: Generates API reference docs.
  - Usage: `cargo doc --open`
- **Mermaid**: For diagrams in Markdown and mdBook.
  - VS Code: Install the "Markdown Preview Mermaid Support" extension.
  - CLI (optional): `npm install -g @mermaid-js/mermaid-cli`
- **ADR-tools**: For managing Architecture Decision Records (ADRs).
  - Install: `brew install adr-tools`

## Linting Tools

- **Vale**: Prose linter for style and grammar.
  - Install: `brew install vale`
- **markdownlint**: Lints Markdown files for style and heading rules.
  - Install: `npm install -g markdownlint-cli`

## Quick Install Script (macOS)

```bash
# ...
```
