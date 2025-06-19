# Telemetry Pipeline

**Opt-in** anonymous usage metrics written to local JSON.

- OpenTelemetry rust-file exporter → `~/.local/share/stack-composer/telemetry-queue/*.json`.
- User triggers manual upload via GUI button; nothing leaves the machine by default.
- Field set: hashed project ID, feature flag counts, duration stats (no source text).

SPDX licence cache stored under `~/.cache/spdx` for offline licence checks.
