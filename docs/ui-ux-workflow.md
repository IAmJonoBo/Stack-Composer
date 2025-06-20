# UI/UX Workflow Guide

This guide describes the open-source-friendly workflow for creating, version-controlling, and publishing UI/UX wireframes and screenshots in the docs-as-code pipeline.

## 1. Choose a Design Tool

- **Figma**: Use @figma-export/cli for automated SVG/PNG exports in CI.
- **Penpot**: Use Penpot's REST API for scripted SVG/PNG exports.

## 2. Store Quick Diagrams as Editable Files

- **Draw.io/diagrams.net**: Exports PNGs with embedded XML for editability.
- **Excalidraw**: Commit .excalidraw JSON; render in Markdown via React or GitHub integration.

## 3. Generate Live Component Screenshots

- **Storybook + Chromatic**: Use Chromatic for automated visual review and PNG snapshots.
- **Playwright**: Use Playwright's screenshot feature for full-app or Tauri window captures.

## 4. Embed & Version in mdBook

- Store UI exports in `docs/assets/ui/`, diagrams in `docs/assets/diagrams/`.
- Reference images in Markdown with alt-text for accessibility.
- Only source files and latest exports are stored; no stale binaries.

## 5. Recommended Git Workflow

1. Design change PR: Designers update Figma/Penpot and link in PR.
2. CI runs export jobs and commits fresh assets.
3. PR preview: mdBook GitHub Action builds docs for review.
4. Visual-diff gate: Chromatic/Playwright checks for unintended UI diffs.

## 6. Why This Stack Works

- Single-source-of-truth assets, always up to date.
- Fully open-source path (Penpot + Draw.io + Playwright).
- Zero-click docs updates via CI.

_Adopt this process to keep design artefacts, wireframes, and UI screenshots in sync with code and docs._
