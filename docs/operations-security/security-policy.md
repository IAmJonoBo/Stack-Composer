# Security Policy

Stack Composer follows modern security best practices. All contributors and users should:

- Review [dev-setup.md](../Developer & Extensibility Docs/dev-setup.md) for secure environment setup.
- Use the latest toolchain as described in [toolchain.md](../toolchain.md).
- Report vulnerabilities as described below.

---

## SBOM & Scanning

- All releases include a CycloneDX SBOM (`bom.json`) published with release assets.
- SBOM is updated automatically in CI using `trivy` and `cargo-audit`.
- Scan containers and dependencies before each release.
- All plugins are scanned with `trivy` and `cargo-audit` before release (see [Plugin SDK](../extensibility/plugin-sdk.md)).

---

## Plugin Signing & Verification

- Every `.wasm` plugin must be accompanied by a `.sig` file (Ed25519 signature, hex).
- Verification uses the `ed25519-dalek` crate; trusted public keys are listed in `~/.config/stack-composer/trusted_keys.toml`.
- Plugins without valid signatures are rejected by default.
- Security thresholds: CVSS ≥ 7.0 blocks plugin install; non-OSI/GPL licenses are blocked.

---

## Telemetry & Privacy

- Telemetry is **opt-in** by default. Enable via config or CLI flag.
- Collected fields: hashed project ID, feature flag counts, duration stats (no source text or PII).
- Example log line:

```json
{
  "project_id": "abc123...",
  "feature_flags": { "planner": true },
  "duration_ms": 1234,
  "timestamp": "2025-06-20T12:34:56Z"
}
```

- Retention: Local JSON files are kept for 30 days unless manually purged.
- Upload: Only on user action (GUI button or CLI flag).

---

## Vulnerability Reporting

- Please report security issues via GitHub Issues or the contact method in [CONTRIBUTING.md](../community-contribution/CONTRIBUTING.md).
- Triage: Acknowledge within 24h, assess CVSS, and prioritize patches.
- Patch timeline: Critical issues patched within 7 days; others as scheduled.
- Disclosure: Coordinated with reporter; public advisories for high/critical issues.

---

## GDPR & Compliance

- No PII is collected by default; telemetry is anonymized and opt-in.
