# FAQ: Frequently Asked Questions

This guide answers common questions about Stack Composer, its setup, usage, and troubleshooting.

---

## General

**Q: What is Stack Composer?**  
A: Stack Composer is a desktop-first orchestration platform that automates tech stack design, planning, and scaffolding from a project brief.

**Q: What platforms are supported?**  
A: Windows 10+, macOS 11+, and Linux (glibc ≥ 2.31).

---

## Installation & Setup

**Q: How do I install Stack Composer?**  
A: See the [Quick Start](quickstart.md) and [Installation](../installation.md) guides for platform-specific steps.

**Q: What if the installer fails or dependencies are missing?**  
A: Check [dev-setup.md](../developer-extensibility-docs/dev-setup.md#troubleshooting) and [toolchain.md](../toolchain.md#troubleshooting).

---

## Usage

**Q: How do I use Stack Composer with a project brief?**  
A: Drag & drop your brief into the app, or use the CLI for headless mode. See [Quick Start](quickstart.md).

**Q: How do I add plugins?**  
A: See the [Plugin SDK](../extensibility/plugin-sdk.md) and [Configuration](../user-guides/configuration.md) guides.

---

## Troubleshooting

**Q: Ollama server not reachable?**  
A: Start `ollama serve` and ensure port 11434 is free.

**Q: High memory usage?**  
A: Use the 4-bit model or close other apps.

**Q: Planner timeout?**  
A: Add `--planner-timeout 60` or simplify your brief.

---

## Security & Privacy

**Q: Is my data private?**  
A: Yes. All inference and search are local by default. Telemetry is opt-in and anonymized.

**Q: How are plugins verified?**  
A: Plugins must be signed (Ed25519) and are sandboxed. See [Security Policy](../operations-security/security-policy.md).

---

If your question isn’t answered here, please open a GitHub Issue or Discussion!
