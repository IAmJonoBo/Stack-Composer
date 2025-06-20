# Stack Composer — Public Roadmap

> **Purpose**
> This roadmap aligns release milestones, security-hardening gates, and
> documentation maturity with open‑source best practices such as Semantic
> Versioning 2.0.0 and human‑readable changelogs.citeturn0search1turn0search3

---

## 1  Release‑cadence Principles

- **Time‑boxed minors, feature‑boxed majors**.
  - Patch releases land ad‑hoc for CVEs or critical fixes.
  - Minor versions ship on a **6‑week** cadence; majors only when public API
    changes. Semantic‑ver rules apply.citeturn0search1
- **Source‑available first, notarised later.** macOS/Windows signing is added at
  **v 1.0** per Tauri notarisation guide lines to avoid early release friction.citeturn0search2
- **Each release must pass** Axe a11y, dep‑scan CVSS ≥ 7 block, OTLP
  trace‑export smoke‑test.citeturn0search4turn0search5
- Changelogs follow _Keep a Changelog_ spec and list date + semantic
  version.citeturn0search3turn0search8

---

## 2  Milestone Timeline

| Version       | Target Date | Status     | Themes                                              | Exit Criteria                                                          |
| ------------- | ----------- | ---------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| **0.5 (MVP)** | 2025‑08     | 🔄 In dev  | Hybrid RAG, Tauri GUI, CLI parity                   | _Quick Start passes on macOS, Win, Linux; plan export JSON validated._ |
| **0.8**       | 2025‑11     | ⏳ Planned | Signed WASI plugin registry (OCI), RL‑Critic v0     | _Registry CLI push/pull, critic value =̂ heuristic ±10 % mean._         |
| **1.0**       | 2026‑02     | ⏳ Planned | Code‑sign & notarise, auto‑update, installer matrix | _DMG notarised, MSI signed, AppImage checksum in CI; Axe score ≥ 90._  |
| **1.1**       | 2026‑04     | ⏳ Planned | Marketplace UI, Homebrew/Scoop, telemetry dashboard | _In‑app plugin browse + install; OTLP traces in Grafana._              |
| **1.2**       | 2026‑07     | ⏳ Planned | HTN planner adapter (JSHOP‑2), cost metric v2       | _Plans with durative + HTN validated against test corpus._             |
| **2.0**       | 2026‑Q4     | ⏳ Vision  | GraphRAG, Tauri‑Mobile, PWA, CRDT collab            | _Mobile beta on iOS/Android, real‑time multi‑cursor in Fluid._         |

Date slippage > 30 days requires ADR addendum per OSS‑Watch release‑management
best‑practice.citeturn0search10

---

## 3  Documentation Maturity Alignment

| Release | Docs Gate                                            |
| ------- | ---------------------------------------------------- |
| 0.5     | Quick‑Start, Arch‑Overview, Component stubs          |
| 0.8     | Install guide (this), Plugin SDK, RAG & Planner docs |
| 1.0     | Security policy, Telemetry policy, full ADR index    |
| 1.1     | Operations handbook, Marketplace user guide          |
| 2.0     | Mobile client docs, CRDT collaboration guide         |

---

## 4  Security & Compliance Gates

- **CVEs** — dep‑scan & cve‑bin‑tool must show no HIGH/CRITICAL open issues.citeturn0search2turn0search11
- **Licence audit** — GPL/AGPL flagged; block if dependency—not plugin—requires.
- **SBOM** generated on each release artefact.

---

## 5  End‑of‑Life Policy

Minor releases receive security patches for **9 months**; majors for **18 months**.  
Older versions archived but remain visible per Open‑Source Guide transparency
advice.citeturn0search0

---

## 6  Feedback & Change‑Management

- Feature requests via GitHub Discussions; roadmap adjustments batched quarterly.
- ADR updates may be submitted with PRs; batched commits permitted.

---

## 7  Next Actions

1. Finalise 0.5 scope tickets (`#76–#110`).
2. Prepare mdBook release‐docs pipeline.
3. Draft ADR‑002: Release‑cadence & EoL policy.
