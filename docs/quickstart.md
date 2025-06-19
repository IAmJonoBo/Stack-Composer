# Quick Start

This guide gets you from **zero** to a working instance of **Stack Composer** in under five minutes.
For a deeper explanation of what’s happening under the hood, see the
[Architecture Overview](architecture-overview.md).

---

## 1 Prerequisites

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **CPU** | x86-64 or Apple Silicon | 4 cores |
| **RAM** | 4 GB | 8 GB + |
| **Disk** | 2 GB free | 4 GB if using larger models |
| **OS** | Windows 10 +, macOS 11 +, Linux (glibc ≥ 2.31) |

---

## 2 Installation

### macOS / Linux (Homebrew)

```bash
brew tap your-org/tap
brew install stack-composer
```

### Windows (Scoop)

```powershell
scoop bucket add your-org https://github.com/your-org/scoop-bucket.git
scoop install stack-composer
```

### Manual
1. Download the installer (.dmg, .msi, or AppImage) from the [Releases page](https://github.com/your-org/stack-composer/releases).
2. Verify the checksum.
3. Run the installer.

> First launch: if Ollama cannot find the default 4-bit phi-3 model (~1.9 GB) it will download and cache it automatically.

---

## 3 First Run

```bash
# Launch the GUI
stack-composer
```

Drag & drop a project brief (PDF, Markdown, Word .docx, or plain-text) into the window. Stack Composer will:
1. Parse the document and ask follow-up questions.
2. Generate a hierarchical tech-stack report.
3. Offer a JSON export and optional starter-repo scaffold.

---

## 4 Headless Mode

```bash
stack-composer ingest brief.md \
  --output stack.json \
  --planner \
  --model phi-3-large
```

- `--planner` – Enable Fast Downward planning.
- `--model`  – Pull or load a larger GGUF model via Ollama.

---

## 5 Troubleshooting

| Symptom | Resolution |
|---------|------------|
| Ollama server not reachable | Start `ollama serve` and ensure port 11434 is free. |
| High memory usage | Switch to the 4-bit model (`--model phi-3-mini`) or close other apps. |
| Planner timeout | Add `--planner-timeout 60` (seconds) or simplify the brief. |

---

## 6 Next Steps
- Read the Configuration Reference.
- Explore the Plugin SDK.
- Check the Roadmap and consider contributing!
