# Internationalization

Stack Composer ships with English (en-US) copy by default while we lay the groundwork for
localized experiences. This document explains the project’s i18n posture, outlines how new
strings should be authored, and captures the plan for future language support.

## Current Scope

- **UI copy**: All strings live in TypeScript modules under `stack-ui/src/locales/en`. The
  wizard and settings views load text through a simple key-based helper to avoid hard-coded
  strings in components.
- **Rust agents**: User-facing log messages and errors are emitted in English. Translating
  these messages will rely on `fluent`-style bundles once the orchestration layer stabilizes.
- **Documentation**: Markdown content is written in English. Machine-translated mirrors are
  intentionally avoided to keep tone and technical accuracy high.

## Authoring Guidelines

1. **Use message keys**
   - Add new UI strings to `stack-ui/src/locales/en/app.json` (or the relevant namespace).
   - Prefer sentence casing and avoid embedded markup when possible.
2. **Provide context**
   - Include developer comments explaining variable placeholders or tone (e.g., `{count}`).
   - Reference related components or flows so translators understand the usage.
3. **Keep copy concise**
   - Favor short, declarative sentences that translate well.
   - Avoid culturally specific idioms or humor unless the feature demands it.
4. **Parameterize units and dates**
   - Use utility functions for formatting numbers, currencies, and dates to avoid locale bugs.

## Testing

- A pseudo-localization toggle (`PSEUDO_LOCALE=1`) stretches strings and injects accent
  marks to expose layout regressions.
- Playwright smoke tests run with the pseudo locale at least once per release.
- Visual regression snapshots include pseudo-localized variants of key screens.

## Roadmap

| Milestone             | Goal                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| Sprint S-02           | Finalize message catalog shape and pseudo-localization tooling.           |
| Sprint S-03           | Introduce locale selection in the onboarding wizard.                      |
| Sprint S-04           | Add translation bundles for documentation landing pages (ES + PT).        |
| Post S-06             | Expand to community-driven translations with Crowdin or Weblate adapters. |

These targets align with the broader roadmap in `PROJECT_BRIEF.md` and will evolve as the
community prioritizes additional languages.

## Contributing Translations

1. Fork the repo and add a locale file under `stack-ui/src/locales/<lang>/app.json`.
2. Populate the file with the same keys as the English catalog; keep placeholders identical.
3. Update the locale manifest (`stack-ui/src/locales/index.ts`) to register the new language.
4. Add a Storybook story demonstrating the UI in the new locale.
5. Submit a PR using the `type:docs` label and mention native speakers available for review.

Until the managed translation platform is in place, we merge new locales on a case-by-case
basis, prioritizing maintainability and reviewer availability.
