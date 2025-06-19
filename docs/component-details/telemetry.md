# Telemetry Pipeline

**Opt-in** anonymous usage metrics written to local JSON.

- OpenTelemetry rust-file exporter → `~/.local/share/stack-composer/telemetry-queue/*.json`.
- User triggers manual upload via GUI button; nothing leaves the machine by default.
- Field set: hashed project ID, feature flag counts, duration stats (no source text).

SPDX licence cache stored under `~/.cache/spdx` for offline licence checks.

## Roadmap & Enhancements

- **Prometheus & Grafana:** Planned integration for real-time metrics and dashboards.
- **Cloud Telemetry Backend:** Optional backend for enterprise/remote monitoring.
- **Alerting & Integrations:** Alert rules (e.g., error rates, latency) with Slack/email integration.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
