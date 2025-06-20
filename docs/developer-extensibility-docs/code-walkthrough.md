# Code Walk‑through

_“Where do I start?” — this guide points you to the right crate, file, or
React component so you can be productive in minutes._

> **Tip for first‑time contributors:** clone the repo and run
> `just ls-components` to print an annotated tree that mirrors this doc.

---

## 1 Workspace Overview

```text
stack-composer/
├─ crates/
│  ├─ orchestrator/         # Tokio Runtime, agent registry
│  ├─ llm/                  # Ollama client + provider trait
│  ├─ retrieval/            # Qdrant & Meili adapters
│  ├─ planner-adapter/      # Fast Downward / OPTIC wrapper
│  ├─ critic/               # RL‑Critic value network
│  ├─ plugin-host/          # Wasmtime sandbox + WIT exports
│  └─ telemetry/            # OTLP exporter, file sink
├─ agents/
│  ├─ ingestion/            # Brief parsing & chunking
│  ├─ gap/                  # Clarifying‑question generator
│  ├─ stack/                # Tech‑stack synthesiser
│  └─ report/               # Markdown/JSON export
├─ ui/                      # Tauri + React front‑end
│  ├─ src/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  └─ styles/
│  └─ storybook/            # Component stories
├─ tasks/
│  └─ crawler/              # Weekly ontology refresh job
└─ docs/                    # mdBook sources
```

All Rust crates live under `crates/` and are published with a
`publish = false` flag until v 1.0.

---

## 2 Key Crates

### 2.1 `orchestrator`

- Entry point: `src/main.rs`
- Registers **Agents** via `Box<dyn Agent>` and routes messages with
  `tokio::mpsc`.
- Contains `healthz` and `doctor` CLI sub‑commands.

### 2.2 `llm`

- Provider trait in `lib.rs`; Ollama implementation under `providers/ollama.rs`.
- `FeatureFlag: model_hot_swap` — reloads model without downtime.

### 2.3 `retrieval`

- Wraps **Qdrant** via `qdrant-client` crate and
  **Meilisearch** via REST.
- `fusion.rs` implements reciprocal‑rank fusion.

---

## 3 Agents

| Agent     | File                      | One‑liner                                    |
| --------- | ------------------------- | -------------------------------------------- |
| Ingestion | `agents/ingestion/mod.rs` | Splits docs into 256‑token windows.          |
| Gap       | `agents/gap/mod.rs`       | Compares requirement graph → asks questions. |
| Stack     | `agents/stack/mod.rs`     | Scores evidence, picks top‑N stacks.         |
| Report    | `agents/report/mod.rs`    | Renders markdown + JSON, saves scaffold.     |

Agents communicate through the `AgentMsg` enum in
`crates/orchestrator/src/messages.rs`.

---

## 4 Front‑end Structure

- `ui/src/pages/Wizard.tsx` — Hybrid wizard flow controller.
- `ui/src/components/DecisionTimeline/` — Undo/redo sidebar.
- `ui/src/components/GraphPreview/` — React Flow + Dagre graph.
- `ui/src/hooks/useModelProbe.ts` — LLM runtime detection logic.

Storybook stories live under `ui/storybook/` and double as
Playwright screenshot tests.

---

## 5 Planner & Critic

- Planner adapter CLI wrapper: `crates/planner-adapter/src/bin/fd_adapter.rs`
- Generates temp directory → writes PDDL → parses plan.
- RL‑Critic encoder: `crates/critic/src/encoder.rs`
- Border PPO inference: `crates/critic/src/lib.rs`.

---

## 6 Tele‑metry & Logging

- OTLP span helper macro: `crates/telemetry/src/macros.rs`
- File exporter path:
  `~/.local/share/stack-composer/telemetry/*.json`.

Set `RUST_LOG=debug,hyper=warn` for verbose output.

---

## 7 Dev Commands (`justfile`)

| Command            | Action                                        |
| ------------------ | --------------------------------------------- |
| `just bootstrap`   | Build containers, lint, unit tests.           |
| `just dev-ui`      | Run Vite + Tauri dev‑server with hot reload.  |
| `just plan`        | Generate PDDL & call planner CLI.             |
| `just a11y`        | Run Axe‑core CLI against built UI.            |
| `just release-dry` | Cross‑compile artefacts without notarisation. |

---

## 8 Adding a New Component

1. Create code under `crates/` or `agents/`.
2. Add unit tests (`nextest`) and, if UI, Storybook story.
3. Create or update the matching markdown file in
   `docs/component-details/`.
4. Run `just check` — CI will fail on broken docs links.
5. Open a PR; include ADR if public API changes.

---

## 9 FAQ

**Where is the configuration loaded?**
`crates/orchestrator/src/config.rs` uses `config-rs` to merge `*.toml` files.

**How do I debug Tauri IPC calls?**
Run `just dev-ui` and open DevTools → _Console_. IPC messages are logged with
scope `tauri`.

**Why can’t my plugin access the network?**
Grant `network` capability in `plugin.toml`, then re‑sign the `.wasm`.

---

Happy hacking! 🦀
