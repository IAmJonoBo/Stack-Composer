# Contributing to Documentation

This guide explains how to contribute to Stack Composer's documentation, including style guidelines, review workflow, and best practices for docs-as-code.

## How to Contribute

- Propose changes via PR. For major changes, open an issue first.
- Use clear, concise language and provide examples where possible.
- Cross-link related docs and keep navigation up to date.
- For new components, use the standard template (see below).

## Review Workflow

- All doc changes require at least one maintainer review.
- Vale and markdownlint must pass before merge.
- PR previews are built via mdBook GitHub Action.
- Visual/UX changes should include updated screenshots or wireframes (see UI/UX workflow guide).

## Style Guide

- Use Markdown with semantic headings (##, ###, etc.).
- Prefer short paragraphs and bulleted lists for clarity.
- Add alt-text to all images for accessibility.
- Use present tense and active voice.
- Reference code, APIs, and CLI commands with backticks.
- For diagrams, prefer Mermaid, Draw.io, or Excalidraw (see below).

## Templates

- Component docs: responsibilities, APIs, extension hooks, roadmap, open questions.
- ADRs: title, date, status, rationale, links to related docs.

## UI/UX Assets

- Follow the [UI/UX workflow guide](../ui-ux-workflow.md) for creating and updating wireframes, diagrams, and screenshots.

---

_See [CONTRIBUTING.md](CONTRIBUTING.md) for code contribution guidelines._

---

**Next Steps:**

- Review [Community & Contribution Overview](README.md)
- See [Code of Conduct](CODE_OF_CONDUCT.md)
