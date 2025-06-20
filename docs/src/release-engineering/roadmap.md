# Stack Composer — Public Roadmap

---

## 1  Release‑cadence Principles

- **Sprint‑driven cadence, feature‑boxed versions**
  - We operate on **two‑week sprints** (10 working days).
  - Minor versions ship **every two sprints**; majors only when a public API
    breaks or a new distribution channel is added. Semantic‑ver rules apply.
- **Source‑available first, notarised later.** macOS/Windows signing is added at
  **v 1.0** per Tauri notarisation guide to avoid early friction.
- **Each release must pass** Axe a11y, dep‑scan CVSS ≥ 7 block, OTLP
  trace‑export smoke‑test.
- Changelogs follow _Keep a Changelog_ spec and list semantic version & sprint
  numbers.

---

## 2  Sprint‑based Milestone Timeline

| Version       | Sprint Window | Status     | Themes                                              | Exit Criteria                                                          |
| ------------- | ------------- | ---------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **0.5 (MVP)** | S‑01 → S‑04   | 🔄 In dev  | Hybrid RAG, Tauri GUI, CLI parity                   | _Quick Start passes on macOS, Win, Linux; plan export JSON validated._ |
| **0.8**       | S‑05 → S‑08   | ⏳ Planned | Signed WASI registry (OCI), RL‑Critic v0            | _Registry CLI push/pull; critic value within ±10 % of heuristic mean._ |
| **1.0**       | S‑09 → S‑12   | ⏳ Planned | Code‑sign & notarise, auto‑update, installer matrix | _DMG notarised, MSI signed, AppImage checksum in CI; Axe score ≥ 90._  |
| **1.1**       | S‑13 → S‑14   | ⏳ Planned | Marketplace UI, Homebrew/Scoop, telemetry dashboard | _In‑app plugin browse + install; OTLP traces in Grafana._              |
| **1.2**       | S‑15 → S‑16   | ⏳ Planned | HTN planner adapter (JSHOP‑2), cost metric v2       | _Plans with durative + HTN validated against test corpus._             |
| **2.0**       | S‑17 → S‑22   | ⏳ Vision  | GraphRAG, Tauri‑Mobile, PWA, CRDT collab            | _Mobile beta on iOS/Android; real‑time multi‑cursor in Fluid._         |

_A “Sprint Window” is inclusive; e.g., **S‑01 → S‑04** means the feature must be
“done” (code merged & docs updated) by the end of Sprint 4._

> **Slip rule:** if a feature moves more than **two sprints** forward, an ADR
> addendum is required explaining scope or estimate changes.

---

## 3  Documentation Maturity Alignment

| Sprint Range | Docs Gate                                         |
| ------------ | ------------------------------------------------- |
| S‑01 → S‑02  | Quick‑Start, Arch‑Overview, Component stubs       |
| S‑03 → S‑04  | Install guide, RAG & Planner docs, Plugin SDK     |
| S‑05 → S‑08  | Security policy, Telemetry policy, full ADR index |
| S‑09 → S‑12  | Operations handbook, Marketplace user guide       |
| S‑17 → S‑20  | Mobile client docs, CRDT collaboration guide      |

---

## 4  Security & Compliance Gates

- **CVEs** — dep‑scan & cve‑bin‑tool must show no HIGH/CRITICAL open issues.
- **Licence audit** — GPL/AGPL flagged; block if dependency—not plugin—requires.
- **SBOM** generated on each release artefact.

---

## 5  End‑of‑Life Policy

Minor releases receive security patches for **9 months**; majors for
**18 months**. Older versions remain visible in Git tags for transparency.

---

## 6  Feedback & Change‑Management

- Feature requests via GitHub Discussions; roadmap reviewed every sprint
  retrospective.
- ADR updates may be submitted with feature PRs; batched commits permitted.

---

## 7  Next Actions (Sprint 1 – S‑01)

1. Finalise MVP tickets `#76–#110`.
2. Land Dev‑Container + bootstrap justfile.
3. Commit ADR‑002: Release cadence & EoL policy.
