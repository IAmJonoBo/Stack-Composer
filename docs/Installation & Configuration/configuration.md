# Configuration Reference

This document describes the configuration options for Stack Composer, including YAML schema and environment-specific examples.

## config.yaml Schema

```yaml
qdrant:
  host: 'localhost:6333'
  collection: 'docs'
planner:
  binary_path: '/usr/local/bin/fast-downward'
  timeout_s: 60
telemetry:
  enabled: false
  endpoint: ''
```

## Example: Local Development

```yaml
qdrant:
  host: 'localhost:6333'
  collection: 'docs'
planner:
  binary_path: './bin/fast-downward'
  timeout_s: 30
telemetry:
  enabled: false
  endpoint: ''
```

## Example: Production

```yaml
qdrant:
  host: 'qdrant.prod.internal:6333'
  collection: 'prod-docs'
planner:
  binary_path: '/usr/bin/fast-downward'
  timeout_s: 120
telemetry:
  enabled: true
  endpoint: 'https://telemetry.stack-composer.com'
```

**Responsibility:**

- Centralizes service URIs, planner settings, and telemetry controls.
- Supports environment-specific overrides for dev/prod.
