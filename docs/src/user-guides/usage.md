# Usage Guide

_Last updated · 2025‑06‑20_  
This guide walks you, click‑by‑click — and key‑stroke‑by‑keystroke — through the
full **Stack Composer** experience: from opening the application to exporting a
production‑ready repository. It covers every wizard screen, modal, shortcut and
status badge so you can move from _idea to initial commit_ in minutes.

---

## 0 · Before you start

| Requirement   | Notes                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Project brief | PDF, DOCX, Markdown or plaintext.                                                                    |
| Free disk     | 2 GB for binaries + 2 GB for the default 4‑bit model.                                                |
| Ollama model  | The wizard will download `phi‑3:4b` at first run if not present.                                     |
| Accessibility | Every control is keyboard‑navigable; press <kbd>Alt+K</kbd> anywhere to display the shortcut legend. |

---

## 1 · Launch & Home Screen

```text
⌘ Space → “Stack Composer” ↵
```

- **Resume banner** appears if an incomplete session JSON is found.
- **New Project** button opens the Hybrid Wizard (also <kbd>N</kbd>).

---

## 2 · Hybrid Wizard Walk‑through

| Step                     | Pane                                                                                         | What happens                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Brief Upload**         | Left: drag‑and‑drop zone • Right: real‑time text extractor preview                           | Parser detects type, shows page/word count, accessibility tags.          |
| **Clarify Requirements** | Chat panel with LLM + structured form fields                                                 | Gaps auto‑detected; pressing <kbd>↵</kbd> submits, <kbd>Esc</kbd> skips. |
| **Stack Choices**        | Tree view (React Arborist) of languages & frameworks; Graph view toggle (React Flow + Dagre) | Choosing a node auto‑filters incompatible children; hover shows licence. |
| **Plan Preview**         | Timeline table + optional Gantt chart if OPTIC used                                          | Duration estimates, cost roll‑up and risk score pill.                    |
| **Plugins**              | Signed plugin marketplace with search • details modal                                        | Installing prompts signature check; capability grants listed.            |
| **Review & Generate**    | Summary accordion + diff viewer for default scaffold                                         | “Why?” tool‑tips next to each choice; click to show LLM rationale.       |

### 2.1 Decision Timeline

A collapsible sidebar records every choice (time‑stamp + diff hash). Use
<kbd>Ctrl + Z</kbd> / <kbd>Ctrl + Shift + Z</kbd> to undo/redo; hover over an
entry to jump back.

### 2.2 Conflict‑Detection Modal

If you pick mutually exclusive options (e.g., **GPL‑3 framework** with
**permissive licence only**):

- Modal explains conflict in plain language.
- “Are you sure?” button requires typing **override** to proceed.

---

## 3 · Generation & Output

1. Spinner shows **Hybrid RAG** + **Planner** progress, each with p50 latency.
2. Upon success you can:

   | Action         | Shortcut     | Result                                              |
   | -------------- | ------------ | --------------------------------------------------- |
   | **Open Repo**  | <kbd>O</kbd> | Opens scaffold in your default editor.              |
   | **Export Zip** | <kbd>Z</kbd> | Saves starter repo (`stack‑composer‑scaffold.zip`). |
   | **Copy JSON**  | <kbd>C</kbd> | Puts tech‑stack report on clipboard.                |

3. A toast asks if you want to **purge telemetry** from the previous run.

---

## 4 · Import & Modernise Existing Repo

- Home Screen → **Import Repository** → choose folder.
- Static analyser runs ESLint, Clippy, dep‑scan; surfaces debt dashboard.
- “Auto‑Refactor” checkbox rewrites outdated patterns in‑place; a Git commit is
  created so you can review.

---

## 5 · Keyboard Shortcuts Cheat‑Sheet

| Global                      | Action                  |
| --------------------------- | ----------------------- |
| <kbd>Alt + K</kbd>          | Show keyboard help      |
| <kbd>Ctrl + P</kbd>         | Command palette         |
| <kbd>Ctrl + S</kbd>         | Save session            |
| <kbd>Ctrl + Shift + L</kbd> | Toggle light/dark theme |

| Wizard                                | Action                |
| ------------------------------------- | --------------------- |
| <kbd>Tab</kbd>/<kbd>Shift + Tab</kbd> | Next/prev input       |
| <kbd>Esc</kbd>                        | Dismiss modal         |
| <kbd>⌘ + ←</kbd>/<kbd>⌘ + →</kbd>     | Prev/next wizard step |

---

## 6 · Plugin Management

- **Settings ▸ Plugins** lists installed bundles; red shield = signature fail.
- Click **Add Plugin** → file picker; `.wasm` + `.sig` files copied to plugin dir.
- Toggle capabilities (retrieval, llm, network) per plugin.

---

## 7 · Model Detection & Selection

On **Settings ▸ LLMs** the app probes, in order:

1. vLLM (`localhost:8000`)
2. LM Studio (`localhost:1234`)
3. HF TGI (`localhost:8080`)
4. Ollama (`localhost:11434`)

Detected runtimes appear as radio buttons; select and test with the “Ping”
button. If none found, an **Install Ollama** prompt appears (shell installer).

---

## 8 · Session & Telemetry

- Sessions auto‑save every 60 s to  
  `~/Library/Application Support/Stack Composer/sessions/*.json` (or
  `$XDG_DATA_HOME` on Linux).
- Telemetry JSON chunks stored for 30 days; purge with
  **Settings ▸ Privacy ▸ Delete Telemetry**.

---

## 9 · Troubleshooting Highlights

| Symptom                       | Quick Fix                                        |
| ----------------------------- | ------------------------------------------------ |
| “Ollama server not reachable” | Run `ollama serve` or change port in Settings.   |
| Planner timeout               | Increase limit (`Settings ▸ Planner ▸ Timeout`). |
| Plugin quarantine             | Check `.sig` and trusted keys list.              |
| High memory                   | Switch to 4‑bit model or disable RL‑Critic.      |

More in [Troubleshooting](../troubleshooting.md).

---

## 10 · Next Steps

- Dive into [Configuration](configuration.md) to tweak embeddings, chunk size and planner aliases.
- Write your first extension with the [Plugin SDK](../plugin-sdk/README.md).
- Join the conversation on GitHub Discussions to request features or share templates.

Happy composing! 🎉
