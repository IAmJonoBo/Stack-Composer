# Installation Guide

## Applies to Stack Composer ≥ 0.5.0

This document shows how to install **Stack Composer** on macOS, Windows and Linux
with or without package managers. For a five‑minute run‑through, see
[`docs/quickstart.md`](../quickstart.md); for Dev‑Container setup, see
[`docs/developer-guides/dev-container.md`](../developer-guides/dev-container.md).

---

## 1  System Requirements

| Resource | Minimum                                         | Recommended                      |
| -------- | ----------------------------------------------- | -------------------------------- |
| CPU      | x86‑64 or Apple Silicon                         | 4+ cores                         |
| RAM      | 4 GB                                            | 8 GB+                            |
| Disk     | 2 GB free                                       | 4 GB (allows larger GGUF models) |
| OS       | Windows 10+, macOS 11+, Linux with glibc ≥ 2.31 | —                                |

> **Note** – First launch downloads the default 4‑bit `phi‑3` model
> (~1.9 GB) if Ollama cannot locate it locally. Ensure you have bandwidth or
> pre‑download the model via `ollama pull` (see § 3.4).

---

## 2  Install via Package Manager (Recommended)

### 2.1 Homebrew (macOS / Linux)

```bash
brew tap stack-composer/tap
brew install stack-composer
```

Updates are as simple as:

```bash
brew upgrade stack-composer
```

### 2.2 Scoop (Windows)

```powershell
scoop bucket add stack-composer https://github.com/stack-composer/scoop-bucket.git
scoop install stack-composer
```

Upgrade:

```powershell
scoop update stack-composer
```

---

## 3  Manual Installation

### 3.1 Download

- Navigate to <https://github.com/stack-composer/stack-composer/releases>.
- Grab the latest artefact for your platform:
  - **macOS** – `StackComposer‑x.y.z.dmg`
  - **Windows** – `StackComposerSetup‑x.y.z.msi`
  - **Linux** – `StackComposer‑x.y.z.AppImage`

### 3.2 Verify Checksums

```bash
# macOS / Linux
shasum -a 256 StackComposer-*.dmg
cat checksums.txt | grep dmg
```

### 3.3 Install

_macOS & Windows_: run the installer and follow the prompts.  
_Linux_: mark executable and launch:

```bash
chmod +x StackComposer-x.y.z.AppImage
./StackComposer-x.y.z.AppImage
```

### 3.4 Pre‑download Ollama Model (optional)

```bash
curl -fsSL https://ollama.ai/install.sh | sh      # if Ollama not present
ollama pull phi3:4b-instruct
```

---

## 4  Post‑Install Verification

```bash
stack-composer --version
# → Stack Composer x.y.z
stack-composer doctor
# ✓ Ollama running (model phi3:4b)
# ✓ Qdrant index writable
# ✓ Meilisearch reachable
# ✓ Plugin dir ✔
```

If any check fails, consult `docs/troubleshooting.md`.

---

## 5  Unattended / CI Installation

For GitHub Actions runners:

```yaml
- name: Install Stack Composer
  run: |
    curl -Ls https://github.com/stack-composer/stack-composer/releases/latest/download/stack-composer-linux-amd64.tar.gz | tar -xz
    sudo mv stack-composer /usr/local/bin
```

Disable telemetry by setting:

```bash
export SC_TELEMETRY=off
```

---

## 6  Uninstall

### macOS / Linux (Homebrew)

```bash
brew uninstall stack-composer
```

### Windows (Scoop)

```powershell
scoop uninstall stack-composer
```

### Manual clean‑up

Remove config and cache:

```bash
rm -rf ~/.config/stack-composer
rm -rf ~/.local/share/stack-composer
```

---

## 7  Next Steps

- Run the [Quick Start](../quickstart.md) tutorial.
- Explore advanced [Configuration](configuration.md).
- Develop plugins with the [Plugin SDK](../plugin-sdk/README.md).
