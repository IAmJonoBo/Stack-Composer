# Stack Composer: End-to-End Project Brief

> **Note:** This project uses **pnpm** as the primary package manager for all JavaScript/TypeScript dependencies. Use **Yarn** only for edge cases (see below).
>
> - All install, build, and dev commands use pnpm by default.
> - If you encounter a tool or script that requires Yarn, see the troubleshooting section below.

---

## Using pnpm and Yarn

- **pnpm** is required for all standard workflows (install, dev, build, lint, test, etc.).
- **Yarn** is only needed for rare edge cases (legacy scripts, some Tauri plugins, or if explicitly documented).
- If you are unsure, always use pnpm first.

---

## Executive snapshot

Stack Composer is a desktop-first, Rust + Tauri application that ingests a project brief (PDF, MD, DOCX, TXT), asks clarifying questions, and outputs a fully-reasoned technology stack, optional PDDL build-plan, and starter-repo scaffold.
It stays local-first (Ollama-hosted 4-bit phi-3 model) yet can live-search the Web to keep recommendations current.
Hybrid retrieval (Qdrant vectors + Meilisearch BM25) underpins RAG; Fast Downward/OPTIC add symbolic planning; Wasmtime hosts signed WASI plugins.
All code ships under Apache-2.0 and relies only on licences compatible with commercial distribution.
Weekly ontology refresh, opt-in local JSON telemetry, and ADR-driven governance keep the project healthy and future-proof.

---

## 1 Mission & scope

### 1.1 Goals

- Automate stack design from any brief, regardless of domain or team size.
- Run everywhere from entry-level laptops (4 GB RAM) to enterprise workstations.
- Stay private by default: inference, search, and licence checks all work offline.
- Remain extensible through a sandboxed plugin model and open standards.

### 1.2 Non-goals

- Cloud-only operation – online calls are optional, never required.
- Deep mobile/Web clients in v0; they arrive in a future major version.

---

## 2 Architecture (overview)

See [Architecture Overview](docs/src/architecture/architecture-overview.md) for a detailed diagram, subsystem breakdown, and data flow.

For a full breakdown of the developer toolchain and how to get a reproducible, fast environment, see [Toolchain & DX Pipeline](docs/src/toolchain.md).

---

## 3 Key subsystems

| Subsystem    | Tech                                                                      | Highlights                                 |
| ------------ | ------------------------------------------------------------------------- | ------------------------------------------ |
| LLM runtime  | Ollama + phi-3 GGUF-4bit                                                  | Local, hot-swappable; REST streaming.      |
| Retrieval    | Qdrant (dense) + Meilisearch (BM25)                                       | Hybrid fusion improves precision & recall. |
| Chunking     | SentencePiece, 256-token windows                                          | Proven sweet-spot for context reuse.       |
| Planning     | [Fast Downward / OPTIC](docs/src/components/fast-downward-integration.md) | Classical + temporal plan generation.      |
| Telemetry    | OpenTelemetry file exporter (JSON)                                        | Opt-in, manual upload only.                |
| Docs-as-Code | mdBook + ADR repo                                                         | Write docs with same tools as code.        |
| Governance   | Joel Parker Henderson ADR templates                                       | Decisions captured alongside code.         |

---

## 4 Boot-up checklist

1. Install all required tools (see [Toolchain & DX Pipeline](docs/src/toolchain.md) for install commands):

   - Rust (rustup), Node.js (≥ v20), pnpm, just, tauri CLI, biome, vale, mdbook, cargo-nextest, stryker, cargo-audit, cargo-deny, cargo-udeps, wasmtime, trivy, nix (restart terminal after install), Qdrant (via Docker), Meilisearch, Renovate, gh (GitHub CLI)
   - Qdrant is run via Docker for local development. Mutagen is a Rust library, not a CLI tool.

2. Clone repo & run CI

   ```sh
   git clone https://github.com/your-org/stack-composer
   cd stack-composer && pnpm install && cargo xtask ci
   ```

3. First launch – downloads default model if missing.

4. Verify hybrid search – integration test seeds Qdrant/Meili with sample docs and asserts recall.

5. Run end-to-end demo

   ```sh
   stack-composer ingest examples/ecommerce.md --planner --output stack.json
   open stack.json
   ```

---

## 5 Documentation maturity roadmap

| Tier | Deliverables                                  | Rationale & sources                |
| ---- | --------------------------------------------- | ---------------------------------- |
| T0   | README → Quick-Start → Arch Overview          | Converts visitors to users quickly |
| T1   | Component docs, CONTRIBUTING, Code-of-Conduct | Unblocks contributors              |
| T2   | Install & Config refs, ADR log                | Locks decisions while fresh        |
| T3   | Ops guide, Telemetry & Security policies      | Ops excellence, compliance         |
| T4   | Release process, Roadmap site                 | Transparency for community growth  |

Great docs are the #1 predictor of OSS success – see Django’s origin story.

---

## 6 Development workflow

1. Fork + branch + PR – protected main; PR triggers CI matrix (cargo tauri build, tests, mdBook lint).
2. Write/Update ADR if decision impacts public API.
3. Update matching component doc (docs-as-code philosophy).
4. Review – at least one maintainer sign-off; Vale + markdownlint pass.
5. Merge – squash commit; CI auto-publishes dry-run artefact.

### 6.1 macOS Development Notes

**⚠️ macOS developers:** Due to resource fork file issues with Tauri builds, use these commands:

```bash
# For regular development (all packages except Tauri)
cargo check --workspace
cargo build --workspace

# For Tauri development
./build-tauri.sh

# Or set environment variables globally
export COPYFILE_DISABLE=1
export COPY_EXTENDED_ATTRIBUTES_DISABLE=1
```

See [macOS Build Issues](docs/MACOS_BUILD_ISSUES.md) for detailed troubleshooting.

---

## 7 Security & compliance

- WASI capability tokens deny network/fs by default—plugin can only call declared host functions.
- Licensing – local SPDX cache protects against incompatible dependencies.
- GDPR mode – disables telemetry and purges temp search caches after report generation.

---

## 8 Risks & mitigations

| Risk                    | Impact                | Mitigation                                                                        |
| ----------------------- | --------------------- | --------------------------------------------------------------------------------- |
| Large models > 4 GB RAM | App OOM on low-end    | Ship 4-bit default; warn before model pull.                                       |
| Planner GPL linkage     | Licence contamination | See [Fast Downward Integration](docs/src/components/fast-downward-integration.md) |
| Plugin supply-chain     | Malicious WASM        | Verify signature; enforce Wasmtime sandbox.                                       |
| Ontology drift          | Out-dated stacks      | Weekly crawler, manual pin option.                                                |

---

## AI-Guided Authoring & Scaffolding Vision

Stack Composer is evolving into a fully AI-guided, end-to-end project authoring and scaffolding platform. See [AI Wizard Roadmap](docs/src/architecture-and-component-guides/ai-wizard-roadmap.md) for the full vision and phased implementation plan.

- Hybrid conversational-form wizard for discovery and planning
- Interactive tech stack exploration and “what-if” analysis
- Real-time directory tree and scaffold preview (tree/graph views)
- Chat-based copilot, rationale tooltips, and decision history
- Context-aware recommendations, security risk surfacing, and best practice updates
- One-click project generation, export, and cloud deployment hooks
- Template projects, import/modernization, and project history

---

## Top Documentation Contributors

{% include "docs/_includes/top-doc-contributors.md" %}
