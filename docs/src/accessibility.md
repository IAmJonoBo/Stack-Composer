# Accessibility

Stack Composer targets WCAG 2.2 AA compliance for its desktop application, web
components, and documentation. This page outlines the current commitments, testing
strategy, and contribution guidelines for inclusive experiences.

## Principles

- **Keyboard first**: Every interactive element must be reachable and operable without a
  pointing device. Focus order mirrors the visual hierarchy and focus states remain visible.
- **Perceivable content**: Provide accessible names, sufficient color contrast, and support
  reduced-motion preferences across the Tauri shell and storybook examples.
- **Understandable flows**: Wizard steps communicate progress, constraints, and errors in
  text; timed interactions and animations have manual overrides.
- **Robust implementation**: UI components rely on Radix primitives and semantic markup,
  making them compatible with major assistive technologies.

## Baseline Checklist

| Area                | Requirement                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| Keyboard navigation | Tab, Shift+Tab, and arrow keys cover every focusable control.                           |
| Screen readers      | Components expose descriptive `aria-*` attributes. Labels include status and errors.   |
| Color contrast      | Minimum 4.5:1 for text and 3:1 for UI controls; verified with automated tooling.        |
| Motion sensitivity  | Respect `prefers-reduced-motion`; replace heavy animation with subtle transitions.      |
| Documentation       | Images include alt text; code blocks provide captions when necessary.                   |

## Testing Strategy

1. **Automated checks**
   - `npx axe-core-cli stack-ui/dist` runs in CI (`.github/workflows/ci.yml`).
   - Storybook stories include Axe and contrast addons for rapid feedback.

2. **Manual audits**
   - Validate keyboard-only navigation of the onboarding wizard and settings view.
   - Exercise the application with VoiceOver (macOS), NVDA (Windows), and Orca (Linux).
   - Review motion and animation in reduced-motion mode.

3. **Regression gates**
   - New components must include Storybook stories covering focus states and error cases.
   - Playwright E2E suites assert keyboard traversal and reduced-motion behavior.

## Contributing Guidelines

- Reference the [Inclusive Design](https://www.w3.org/WAI/fundamentals/accessibility-principles/)
  principles when proposing UI changes.
- Include accessibility acceptance criteria in user stories and PR descriptions.
- Document any deviations or temporary waivers in the relevant ADR and link them in the PR.
- For feature flags or experimental flows, clearly mark inaccessible states and capture a
  follow-up issue before merging.

## Reporting Issues

If you encounter accessibility defects:

1. File an issue using the “UI Bug” template and tag it with `impact:accessibility`.
2. Provide reproduction steps, expected vs. actual behavior, and environment details.
3. Where possible, attach screenshots or short videos, and include assistive tech logs.

We treat accessibility regressions as release blockers. Thank you for helping keep Stack
Composer inclusive for all users.
