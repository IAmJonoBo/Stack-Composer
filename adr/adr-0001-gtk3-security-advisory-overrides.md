# ADR-0001: GTK-3 Security Advisory Overrides

- **Status:** Accepted
- **Date:** 2025-01-27
- **Context:**
  - Stack Composer uses Tauri for cross-platform desktop GUI
  - On Linux, Tauri depends on `wry` which uses `webkit2gtk` backend
  - `webkit2gtk` pulls in GTK-3 bindings (atk, gdk, gtk-sys, etc.)
  - GTK-3 crates are no longer maintained and flagged by RustSec advisories
  - 11 security advisories (RUSTSEC-2024-0411 through 0420, plus 0370) block CI
  - Upstream wry is working on GTK-4 migration (issue #1474) but not yet available

- **Decision:**
  - Temporarily override GTK-3 related security advisories in `deny.toml`
  - Add comprehensive documentation linking to upstream migration work
  - Monitor upstream progress and migrate to GTK-4 when available
  - This is an interim solution until proper GTK-4 support lands

- **Consequences:**
  - **Easier:** CI passes, development can continue, Linux builds work
  - **Risk:** We're suppressing legitimate security warnings for unmaintained code
  - **Mitigation:** Clear TODO comments and tracking of upstream progress
  - **Future:** Will require migration work when GTK-4 support is available

---

## References

- [Upstream GTK-4 migration issue](https://github.com/tauri-apps/wry/issues/1474)
- [RustSec advisories for GTK-3](https://rustsec.org/advisories/)
- [Stack Composer Security Policy](../docs/src/operations/security-policy.md)
