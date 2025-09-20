# Observability Stack

This page tracks recommended tooling for metrics, traces, and evaluation. All
options are open source or free for commercial redistribution.

## Core Signals

| Signal   | Tooling                                 | Notes |
| -------- | --------------------------------------- | ----- |
| Traces   | OpenTelemetry SDK + SigNoz (Apache 2.0) | Collect spans from orchestrator/agents; SigNoz ships in Docker compose. |
| Metrics  | Prometheus (Apache 2.0)                 | Export orchestrator/agent metrics; dashboards built in Grafana (AGPL 3). |
| Logs     | Vector/Fluent Bit (Apache 2.0)          | Optional centralised log shipping. |
| UX       | Playwright traces + Visual Regression   | Already wired through CI (S-01 deliverable). |

## Recommended Setup

1. Launch SigNoz locally (Docker compose) or point to an existing deployment.
2. Configure the telemetry agent to export OpenTelemetry traces/metrics to
   SigNoz/Prometheus; document endpoints in `docs/src/components/telemetry.md`.
3. Add Grafana dashboards for retrieval nDCG, planner solve latency, and wizard
   activation metrics. Link dashboards in ADRs/OKRs.
4. Ensure CI uploads traces for failing tests (`ROADMAP.md` requirement).

## Evaluation Harness

- Use **RagaS** (Apache 2.0) or **DeepEval** (Apache 2.0) to power the retrieval
  evaluation harness. Store results as JSONL and publish summary dashboards.
- The harness should run nightly and on-demand (`just smoke` remains the fast
  check; a future `just eval` recipe will wrap the longer run).

Update this document as the observability stack evolves (e.g., adding SigNoz
compose files or hosted backends).
