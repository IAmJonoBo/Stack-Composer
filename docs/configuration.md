# Configuration

This guide describes how to configure Stack Composer, including plugin registration, runtime options, and security settings.

---

## 1. Plugin Registration

### WASI Plugins

Add WASI plugins by copying `.wasm` and `.sig` files to:

```
~/.local/share/stack-composer/plugins/
```

Plugins are auto-discovered at startup. Only plugins with valid Ed25519 signatures (see [Plugin SDK](plugin-sdk/README.md)) are loaded.

### REST Plugins

Register REST plugins in your config file (TOML or YAML):

```toml
[plugins.rest]
my_rest_plugin = { url = "http://localhost:3000/run" }
```

---

## 2. Security & Permissions

- **Trusted Keys**: List trusted Ed25519 public keys in `~/.config/stack-composer/trusted_keys.toml`.
- **Plugin Permissions**: Configure per-plugin filesystem/network access in the config file:

```toml
[plugins.wasi.hello_plugin]
allow_fs_write = false
allow_network = false
```

---

## 3. Runtime Options

- **Session Storage**: Set session directory and retention policy.
- **Telemetry**: Enable/disable telemetry and set retention (default: 30 days).
- **Model Backends**: Configure LLM endpoints and fallback order.

---

## 4. Example Full Config

```toml
[plugins.wasi]
hello_plugin = { enabled = true }

[plugins.rest]
my_rest_plugin = { url = "http://localhost:3000/run" }

[security]
trusted_keys = ["ed25519:...publickey..."]

[telemetry]
enabled = true
retention_days = 30

[llm]
default_backend = "ollama"
backends = ["vllm", "lmstudio", "huggingface", "ollama"]
```

---

_See also: [Plugin SDK](plugin-sdk/README.md), [Security Policy](security-policy.md), [Architecture Overview](architecture-overview.md)_
