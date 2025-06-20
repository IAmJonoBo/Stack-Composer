# Benchmarking & Performance

This guide will help you plan, run, and interpret benchmarking and performance tests for Stack Composer. Benchmarking is planned as a v2.0 feature, but this document outlines the intended approach and best practices.

## Goals & Metrics

- Measure end-to-end stack generation latency
- Track memory and CPU usage for key workflows
- Compare retrieval and planning performance across models and configs
- Monitor plugin execution and sandbox overhead

## Supported Tools & Workflows

- Use `cargo bench` for Rust microbenchmarks
- Integrate with Playwright/Chromatic for UI performance
- Use Docker Compose for reproducible environment benchmarks
- Leverage OpenTelemetry for trace-based performance analysis

## How to Run Benchmarks

1. Clone the repo and install all dependencies (see [Toolchain & DX Pipeline](toolchain.md)).
2. Run `cargo bench` for backend microbenchmarks.
3. Use `pnpm vitest run --runInBand` for JS/TS test timing.
4. For end-to-end, use the provided demo scripts and measure with `/usr/bin/time` or similar tools.

## Performance Optimization Tips

- Use the 4-bit LLM model for lower memory usage
- Run Qdrant and Meilisearch in Docker for consistent results
- Profile with `perf`, `valgrind`, or Chrome DevTools as appropriate

## CI/CD Integration

- Benchmark jobs can be added to the CI matrix for regression detection
- Results can be published as GitHub Actions artifacts or dashboarded

---

_See the [roadmap](roadmap.md) and [architecture docs](architecture-overview.md) for current priorities and future plans._
