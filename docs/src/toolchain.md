# Toolchain

## Fully optimised build‑and‑dev pipeline for Stack Composer — v 0.5

This document enumerates every tool, workflow and quality‑gate that powers
Stack Composer’s day‑to‑day development, release, and runtime experience. The
stack emphasises **maximal efficiency, intelligence, extensibility and
security‑by‑default**.

---

## 1 Design Objectives

1. **Deterministic, reproducible environments** — “works on my machine” erased.
2. **Tight feedback loops** — code→lint→test round‑trips in < 5 s.
3. **Layered quality gates** — linters, a11y, CVE & licence scanners before CI.
4. **Extensible at every tier** — plugins, custom tasks, external runners.
5. **First‑class UX tooling** — Storybook, automated screenshots, Axe‑core CI.

---

## 2 Environment Bootstrap

| Concern                        | Tool                        | Why                                                           |
| ------------------------------ | --------------------------- | ------------------------------------------------------------- |
| **Dev Containers**             | VS Code Remote — Containers | Reproducible toolchain, quick onboarding citeturn0search1  |
| **Nix flakes (optional)**      | `nix develop`               | Deterministic CLI for non‑VS Code users citeturn0search9   |
| **Task runner**                | **justfile**                | Cross‑platform recipes, zero runtime deps citeturn0search2 |
| **Package manager (frontend)** | **pnpm 8**                  | Symlinked store, fastest install times citeturn0search6    |
| **Rustup toolchain file**      | `rust-toolchain.toml`       | Locks compiler + `rustfmt`, `clippy` versions                 |

---

## 3 Write / Save Loop Optimisation

| Stage                 | Tool                                                                      | Key metric |
| --------------------- | ------------------------------------------------------------------------- | ---------- |
| Format & Lint (TS/JS) | **Biome** — 10× faster than ESLint citeturn0search3                    | -          |
| Format & Lint (Rust)  | `rustfmt`, **Clippy**                                                     | -          |
| Docs lint             | **Vale** + markdownlint                                                   | -          |
| Unit tests (Rust)     | **cargo‑nextest** — up to 3× faster than `cargo test` citeturn0search0 | -          |
| Mutation tests        | **mutagen‑rs**, **StrykerJS**                                             | -          |
| a11y tests            | **Axe‑core CLI** integration; fails PR if score < 90 citeturn0search10 | -          |

Each test/lint step is a _just_ recipe; <kbd>just check</kbd> runs the full set.

---

## 4 Hybrid RAG & Planner Back‑ends

| Layer               | Component                     | Rationale                                            |
| ------------------- | ----------------------------- | ---------------------------------------------------- |
| **Vector DB**       | Qdrant 0.15 embedded          | Rust native, no external service citeturn0search6 |
| **Sparse + Vector** | Meilisearch 1.6 hybrid search | Combines BM25 + embeddings citeturn0search7       |
| **Planner**         | Fast Downward, OPTIC          | Classical + temporal PDDL; GPL exception safe        |
| **RL Critic**       | Border‑PPO (Rust)             | Small footprint, model‑agnostic                      |

These subsystems launch automatically in the Dev Container; local ports are
namespaced so parallel projects don’t collide.

---

## 5 Security & Compliance Gates

| Gate          | Tool                                | Policy                                         |
| ------------- | ----------------------------------- | ---------------------------------------------- |
| CVE scan      | **OWASP dep‑scan**                  | Blocks build if CVSS ≥ 7.0 citeturn0search5 |
| Binary scan   | **Intel cve‑bin‑tool**              | Scans bundled libraries citeturn0search2    |
| SBOM          | `cargo‑auditable`                   | Hash stamped into artefact                     |
| Licence check | `cargo-deny`, dep‑scan licence mode | GPL/AGPL blocked by default                    |

---

## 6 Observability & Telemetry

- **OpenTelemetry Rust SDK** with OTLP file exporter writes JSON traces locally
  (no network). citeturn0search5
- Users opt‑in to upload traces to Jaeger; otherwise files auto‑purge at 30 days.

---

## 7 CI / CD Pipeline

| Stage              | Tool                                                                 | Details |
| ------------------ | -------------------------------------------------------------------- | ------- |
| Matrix build       | **tauri‑action** cross‑compiles DMG/MSI/AppImage citeturn0search4 | -       |
| Tests              | `cargo-nextest` + Playwright visual                                  | -       |
| Docs               | mdBook build + linkcheck                                             | -       |
| Container security | **Trivy** SBOM & CIS benchmark                                       | -       |
| Version bump       | **semantic‑release**                                                 | -       |

Post v1.0 the notarisation job (`xcrun notarytool`) runs in a macOS runner. citeturn0search12

---

## 8 UI / UX Tooling

- **Storybook** with Chromatic CI for component snapshots & visual diffs.
- **React Arborist** for tree previews; **React Flow + Dagre** for graph mode.
- Figma or Penpot export script converts wireframes → SVG → docs assets. citeturn0search8turn0search1
- Playwright visual regression captures Tauri window screenshots for docs. citeturn0search11

---

## 9 Plugin & Extension Workflow

- **Wasmtime** hosts WASI plugins with Ed25519 signatures; capability tokens
  restrict host calls. citeturn0search5
- REST/gRPC plugins register endpoints via `plugin.toml`.
- Local registry (OCI artefacts) targeted for v 0.8 release.

---

## 10 Developer Ergonomics (Current)

| Shortcut                          | Action                                           |
| --------------------------------- | ------------------------------------------------ |
| <kbd>just bootstrap</kbd>         | Build containers, start Qdrant/Meili, lint, test |
| <kbd>just dev-ui</kbd>            | Hot‑reload Tauri + React devserver               |
| <kbd>just plan PROBLEM=pddl</kbd> | Run planner CLI adapter with watch               |
| <kbd>just release-dry</kbd>       | Produce artefacts but skip notarisation          |

Each recipe prints estimated run‑time based on historical averages stored in
`.just-cache`.

---

## 11 Future Enhancements

- **Dagger pipeline** to replace shell‑based CI for local⇄CI parity.
- **Buf** for generating gRPC client stubs across languages.
- **Mutation‑driven test budgets** integrated into GitHub Checks.
- **Nix Flake CI** for hermetic release builds.

---

## 12 FAQ

**Do I need Docker?**  
Only for optional MySQL/Postgres plugin test‑containers; core stack is binary‑only.

**Can I disable lint gates?**  
Yes: set `SC_LINT=off`; CI will still run them and may block merge.

**What if I’m on Windows Home?**  
Dev Containers fall back to Docker Desktop + WSL2; if unavailable, run the
PowerShell bootstrap script.

---

## Sources

Sources: cargo‑nextest benchmarks citeturn0search0 · VS Code Dev Containers citeturn0search1 · just cross‑platform scripts citeturn0search2 · Biome perf claims citeturn0search3 · CVE scanning best‑practice citeturn0search5 · Qdrant vector DB citeturn0search6 · Meilisearch hybrid search citeturn0search7 · tauri‑action notarisation citeturn0search4 · OpenTelemetry Rust exporter citeturn0search5 · Penpot OSS design tool citeturn0search8 · Playwright screenshot testing citeturn0search11

## Toolchain (Next Generation)

## Future‑proof build‑and‑dev pipeline for Stack Composer — v 1.0‑alpha

This page is a **single source of truth** for every tool, workflow, and
quality‑gate we run today **and** the concrete upgrades we have already slated
per roadmap sprint. Everything is ordered to keep feedback loops < 5 s on a
2020‑era laptop, yet scales to a 32‑core CI runner.

---

## 1 Design Objectives — Next Generation

| ID   | Objective                | Measurement                                   |
| ---- | ------------------------ | --------------------------------------------- |
| T‑01 | Reproducible everywhere  | `just doctor` diff < 0.1 % between CI & local |
| T‑02 | Feedback ≤ 5 s           | Save‑to‑test cycle benchmark in dev‑container |
| T‑03 | Security‑by‑default      | SLSA Level 2 attestation, CVSS ≥ 7 blocked    |
| T‑04 | Extensible at every tier | WASI, REST, and Makefile hooks documented     |
| T‑05 | UX observable            | Axe a11y score ≥ 90; Chromatic diff gate      |

---

## 2A Environment Bootstrap (Next Generation)

### 2.1 Containers & Package Managers

| Tool                      | Role                                | Future upgrade                             |
| ------------------------- | ----------------------------------- | ------------------------------------------ |
| **Dev Containers**        | out‑of‑the‑box VS Code & Codespaces | Codespace _prebuilds_ (Sprint 7)           |
| **Nix flakes** (optional) | reproducible CLI (`nix develop`)    | **Nix Flake CI** (Sprint 10)               |
| **justfile**              | task runner                         | auto‑timing & AI‑suggest recipe (Sprint 6) |
| **pnpm 9**                | JS workspace manager                | built‑in Docker cache (Sprint 8)           |
| `rust-toolchain.toml`     | locks rustc                         | nightly channel opt‑in for GATs            |

`just bootstrap` spins up **Qdrant, Meilisearch, Wasmtime** and runs lint + test.

---

## 3 Write / Save Loop

| Stage                | Today                   | Sprint upgrade                            |
| -------------------- | ----------------------- | ----------------------------------------- |
| Format & Lint (TS)   | **Biome**               | “strict‑naming” plugin (S‑04)             |
| Format & Lint (Rust) | `rustfmt`, **Clippy**   | Clippy‑lints as GitHub annotations (S‑03) |
| Docs lint            | **Vale** + markdownlint | Vale style‑guide share link (S‑05)        |
| Unit tests           | **cargo‑nextest**       | Hot‑swap code‑coverage via `kcov` (S‑06)  |
| Mutation tests       | mutagen‑rs, StrykerJS   | mutation budget check in CI (S‑07)        |
| a11y tests           | **Axe‑core CLI**        | Lighthouse CI perf threshold ≥ 80 (S‑05)  |
| Visual diff          | Storybook + Chromatic   | Playwright‑component story tests (S‑04)   |

---

## 4 Back‑end Engines

| Layer         | Current               | Sprint upgrade                                 |
| ------------- | --------------------- | ---------------------------------------------- |
| Vector DB     | Qdrant embedded       | **Qdrant Cloud** toggle for 1 M+ chunks (S‑06) |
| Sparse search | Meilisearch 1.6       | Tantivy sync (S‑09)                            |
| Planner       | Fast Downward / OPTIC | **HTN JSHOP‑2** (S‑15)                         |
| RL‑Critic     | Border PPO            | Ray RLlib cluster (S‑12)                       |
| GraphRAG      | —                     | property‑graph plugin (S‑17)                   |

---

## 5 Security Gates

| Gate          | Tool             | Sprint upgrade                               |
| ------------- | ---------------- | -------------------------------------------- |
| CVE scan      | **dep‑scan**     | SBOM diff fail (S‑05)                        |
| Binary scan   | **cve‑bin‑tool** | **Trivy attestation** (S‑05)                 |
| Licence audit | `cargo‑deny`     | **ClearlyDefined** API enrich (S‑08)         |
| Supply chain  | —                | **Sigstore cosign** + SLSA provenance (S‑09) |

---

## 6 Observability

| Aspect      | Today               | Future                                |
| ----------- | ------------------- | ------------------------------------- |
| Trace store | OTLP file exporter  | **Tempo push** opt‑in (S‑08)          |
| Metrics     | Prometheus exporter | Azure & AWS Managed Prom ready (S‑10) |
| Dashboard   | Grafana JSON preset | OpsGuide auto‑import (S‑11)           |
| Alerting    | none                | Prom AlertManager recipes (S‑12)      |

---

## 7 CI / CD

| Stage                 | Tool               | Sprint                                      |
| --------------------- | ------------------ | ------------------------------------------- |
| Build matrix          | **tauri‑action**   | Split runners by HW (S‑05)                  |
| Pipeline engine       | GitHub Actions     | **Dagger** pipeline DSL (S‑09)              |
| Docs                  | mdBook + linkcheck | Vale docs style gate (S‑03)                 |
| Notarisation          | deferred           | macOS & EV cert (S‑11)                      |
| Release orchestration | semantic‑release   | release‑please alternative (evaluated S‑04) |

---

## 8 UI / UX

| Tool                | Role              | Sprint enhancement                     |
| ------------------- | ----------------- | -------------------------------------- |
| Storybook           | component docs    | MDX‑based live props table (S‑04)      |
| Chromatic           | visual diff       | per‑PR GitHub Check (S‑03)             |
| Playwright          | e2e & screenshots | Tauri harness & mobile viewport (S‑06) |
| Figma/Penpot export | wireframes → docs | GitHub Action auto‑SVG export (S‑05)   |

---

## 9A Plugin & Extension Workflow (Next Generation)

| Today                   | Future                                  |
| ----------------------- | --------------------------------------- | ------------------------------- |
| Wasmtime + Ed25519 sigs | **OCI registry** + cosign attest (S‑08) |
| Cap tokens              | fine‑grained (`log`,`retrieval`,…)      | experimental WASI‑NN cap (S‑12) |
| CLI SDK                 | Rust, TS                                | Zig & TinyGo stubs (S‑10)       |

---

## 10A Developer Ergonomics (Next Generation)

| just recipe    | Desc                    | Avg runtime         |
| -------------- | ----------------------- | ------------------- |
| `bootstrap`    | lint + test + db launch | 38 s                |
| `dev-ui`       | Vite + Tauri            | hot reload < 500 ms |
| `plan`         | generate plan & watch   | < 2 s               |
| `critic-train` | local PPO episodes      | 45 s                |
| `release-dry`  | build artefacts         | 3‑4 min             |

Historical averages stored in `.just‑cache`; recipes print delta.

---

## 11 Mobile & Cloud Targets

| Client           | Status       | Tooling                         |
| ---------------- | ------------ | ------------------------------- |
| **Tauri‑Mobile** | planned S‑17 | cargo‑tauri‑mobile alpha        |
| **PWA**          | planned S‑18 | Workbox offline cache           |
| **Cloud SaaS**   | post‑v2      | K8s Helm charts + GitOps ArgoCD |

---

## 12 Roadmap Sync

Every bullet labelled **S‑XX** maps to sprint numbers in the
[Roadmap](release-engineering/roadmap.md). Features auto‑promote from “Future”
to “Current” once merged; CI fails if the table isn’t updated within one sprint.

---

### “If I only read one thing…”

Run:

```bash
git clone https://github.com/your-org/stack-composer
just bootstrap
just dev-ui
```

You now have Qdrant, Meili, Wasmtime, dev‑server, lint + tests all running
inside a deterministic container, with tailwind‑fast hot reload and ≥ 90 a11y
score. When the sprint toggles, `just doctor` will tell you what moved.

Happy composing! 🛠️
