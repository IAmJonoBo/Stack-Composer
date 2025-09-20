# Program OKRs (Template)

This document tracks quarterly Objectives and Key Results for Stack Composer.
Update it during program planning and reference it in Architecture Council notes.

## Q4 2025 (Draft)

### Objective 1 — Deliver frontier-grade Stack Composer foundations

- **KR1**: Complete migration checklist (toolchain pins, doc cleanup, wizard v1)
  by Sprint S-02 end.
- **KR2**: Achieve nDCG@10 ≥ 0.70 and faithfulness ≥ 0.88 in evaluation
  harness; dashboards live with automated updates.
- **KR3**: Establish Architecture Council cadence with ≥ 90% attendance and
  publish ADR IDs for every structural decision.

### Objective 2 — Ignite user experience and activation

- **KR1**: Onboarding wizard p95 latency < 10 s; usage telemetry captured for
  ≥ 80% sessions.
- **KR2**: Storybook coverage ≥ 12 frontier components with passing visual
  regression suite.
- **KR3**: Accessibility audit (WCAG 2.2 AA) results < 5 open findings.

### Objective 3 — Harden CI/CD and release operations

- **KR1**: `just reproduce-build` + reproducible CI job green on macOS, Ubuntu,
  Windows/WSL.
- **KR2**: Signed artefacts with SBOM/provenance produced for every tagged
  release.
- **KR3**: Resilience/chaos suite running nightly with 0 unresolved failures.

_Update this file at the end of each sprint and roll the OKRs every quarter._
