# Telemetry & Privacy

Stack Composer is designed with privacy in mind.

- See [Developer Setup](../../developer-extensibility-docs/dev-setup.md) for details on telemetry configuration.
- The toolchain ([toolchain](../toolchain.md)) includes instructions for managing telemetry and privacy settings.
- Local JSON flow and GDPR toggles are documented in the relevant sections.

---

## Telemetry Schema

- **Opt-in** only: telemetry is disabled by default.
- Collected fields: hashed project ID, feature flag counts, duration stats, timestamp.
- No source text, PII, or user content is ever collected.

### Example Log Entry

```json
{
  "project_id": "abc123...",
  "feature_flags": { "planner": true },
  "duration_ms": 1234,
  "timestamp": "2025-06-20T12:34:56Z"
}
```

---

## Retention & Upload

- Local JSON files are retained for 30 days unless manually purged.
- Upload is only triggered by explicit user action (GUI or CLI).

---

## GDPR & Privacy Controls

- GDPR mode disables all telemetry and purges temp data after report generation.
- Users can delete all local telemetry via GUI or CLI.
