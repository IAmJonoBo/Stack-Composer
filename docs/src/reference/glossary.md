# Glossary

> **Purpose** — a single page that decodes every acronym, protocol, and buzz‑term
> you will meet while working on **Stack Composer**. Terms are listed
> alphabetically. Feel free to append as new concepts land.

---

## A

| Term         | Meaning                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **ADR**      | _Architecture Decision Record_ – a lightweight Markdown file capturing the context, decision, and consequences of a technical choice.       |
| **AHP**      | _Analytic Hierarchy Process_ – multi‑criteria decision‑making method used by the Stack Agent to weight licence, maturity, performance, etc. |
| **API**      | _Application Programming Interface_ – a contract that lets two programs talk (gRPC, REST, CLI).                                             |
| **AppImage** | Portable Linux packaging format used for Stack Composer’s manual installer.                                                                 |

## B

| Term            | Meaning                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **BM25**        | Ranking function for full‑text search, implemented by Meilisearch.      |
| **Borda Count** | Voting system; the Retrieval Layer’s RRF fusion is a Borda‑like method. |

## C

| **Cap Token** | JSON blob listing capabilities granted to a WASI plugin (e.g. `["log","retrieval"]`). |
| **CI/CD** | _Continuous Integration / Continuous Deployment_ – automated build and release pipeline. |
| **CLI** | _Command‑Line Interface_ – `stack‑composer ingest brief.md`. |
| **CRDT** | _Conflict‑free Replicated Data Type_ – algorithm for real‑time collaboration (Fluid Framework). |
| **CVE** | _Common Vulnerabilities & Exposures_ – ID for a published security flaw. |
| **CVSS** | _Common Vulnerability Scoring System_ – 0‑10 severity score used by dep‑scan. |

## D

| Term             | Meaning                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| **Dag**          | _Directed Acyclic Graph_ – layout algorithm (Dagre) for dependency graphs.        |
| **DevContainer** | VS Code JSON file that spins up Dockerised dev environments.                      |
| **Dockerfile**   | Script that builds a container image; generated in the starter scaffold.          |
| **DRY**          | _Don’t Repeat Yourself_ – software engineering principle; enforced by lint rules. |

## F

| **Fast Downward** | GPL‑exception PDDL planner bundled as a subprocess. |
| **Fuel Metering** | Wasmtime feature that counts Wasm instructions to stop runaway plugins. |

## G

| Term            | Meaning                                                                            |
| --------------- | ---------------------------------------------------------------------------------- |
| **Gantt Chart** | Bar‑style timeline; UI renders plan steps when OPTIC returns start/end times.      |
| **GGUF**        | _GPT‑NeoX General‑Format_ file that stores quantised LLM weights (used by Ollama). |
| **GPL**         | _GNU Public Licence_ – copyleft licence; blocked by default in permissive mode.    |
| **gRPC**        | High‑performance RPC protocol used between Tauri UI and orchestrator.              |

## H

| **HNSW** | _Hierarchical Navigable Small World_ – graph index that powers fast vector search in Qdrant. |
| **HTN** | _Hierarchical Task Network_ planner; JSHOP‑2 adapter is on the roadmap. |

## J

| **JSONL** | _JSON Lines_ – newline‑delimited JSON; format used by local telemetry trace files. |

## L

| **LLM** | _Large Language Model_ – neural network that generates and embeds text (phi‑3, llama‑3, etc.). |
| **Lingui** | i18n extraction and runtime library chosen for React UI localisation. |
| **LM Studio** | Desktop app that hosts local LLMs; probed by model‑detection routine. |

## M

| **Meilisearch** | Rust‑written search engine; provides BM25 + hybrid vector ranking. |
| **mdBook** | Rust tool that turns Markdown into a static doc site; powers this documentation. |
| **MCTS** | _Monte‑Carlo Tree Search_ – planning/rl algorithm offered by scikit‑decide. |
| **Marketplace** | In‑app UI for discovering and installing signed WASI plugins. |

## N

| **Nix** | Declarative package manager; optional flake provides reproducible CLI env. |
| **npm** | Node package registry queried by the Ontology Crawler. |

## O

| **OCI** | _Open Container Initiative_ – spec used for the upcoming plugin registry. |
| **Ollama** | Local LLM runtime exposing OpenAI‑style REST endpoints, default provider. |
| **OPTIC** | Temporal/cost PDDL planner; second adapter after Fast Downward. |
| **OpenTelemetry (OTel)** | CNCF observability framework used for spans and metrics. |

## P

| **PDDL** | _Planning Domain Definition Language_ – declarative language consumed by planners. |
| **PPO** | _Proximal Policy Optimisation_ – RL algorithm used by default Border critic. |
| **PII** | _Personally Identifiable Information_ – scrubbed during ingestion and telemetry. |
| **Prometheus** | Metrics backend; optional exporter at `/metrics`. |

## Q

| **Qdrant** | Embedded vector DB that stores 1 536‑dim sentence embeddings. |
| **Quick‑XML** | Streaming XML parser used by Crawler for RSS feeds. |

## R

| **RAG** | _Retrieval‑Augmented Generation_ – method of grounding LLM output in retrieved facts. |
| **REST** | Representational State Transfer – HTTP API pattern. |
| **RL** | _Reinforcement Learning_ – training paradigm; critic scores stack plans. |
| **RRF** | _Reciprocal‑Rank Fusion_ – merges dense and sparse result lists. |
| **Rustup** | Toolchain installer that pins rustc version. |

## S

| **SBOM** | _Software Bill of Materials_ – list of all dependencies; generated by cargo‑auditable. |
| **SSE** | _Server‑Sent Events_ – streaming transport used by Ollama’s `/api/chat`. |
| **SHACL** | _Shapes Constraint Language_ – future ontology validation spec. |
| **SQLite WAL** | Write‑Ahead Log mode; chosen for ontology.db concurrency. |
| **Storybook** | UI component explorer with Chromatic snapshots. |

## T

| **Tauri** | Rust‑based framework for building small desktop apps; wraps the React UI. |
| **Tera** | Template engine used for the Markdown report generator. |
| **Trivy** | Container and SBOM security scanner in CI. |

## V

| **Vale** | Markdown/style linter enforcing inclusive language. |
| **vLLM** | High‑throughput CUDA inference server compatible with OpenAI API. |

## W

| **WASI** | _WebAssembly System Interface_ – host API standard that enables safe sandboxing. |
| **Wasmtime** | Bytecode Alliance runtine that executes WASI plugins with capability tokens. |
| **Window** | 256 tokens by default: ingestion chunk size with 64‑token overlap. |

## Y

| **YAML** | Human‑friendly superset of JSON; config format for market‑place metadata. |

---

_If a term is missing, create a pull‑request that appends a table row in the
correct alphabetical section._ Happy composing!
