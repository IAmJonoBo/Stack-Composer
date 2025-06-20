# System Requirements

This document lists the supported platforms, dependencies, and hardware requirements for Stack Composer.

## Supported Platforms

- **OS:** Ubuntu 22.04, macOS 13+, Windows 11 (WSL2 supported)
- **Rust:** ≥1.70 (nightly optional)
- **Datastores:** Qdrant ≥1.4, Meilisearch ≥1.5
- **Planner Binaries:** Fast Downward ≥23.05, OPTIC ≥latest commit

## Hardware Requirements

| Environment   | RAM            | CPU Cores      | Disk Space    |
| ------------- | -------------- | -------------- | ------------- |
| Dev           | 8 GB           | 4              | 10 GB         |
| Prod (single) | 16 GB          | 8              | 100 GB        |
| Cluster       | Scale per node | Scale per node | See ops guide |

## Notes

- For best results, use a machine with SSD storage and a modern multi-core CPU.
- Containerized deployments are supported and recommended for production.
- See [ops-guide.md](../../ops-guide.md) for cluster scaling and advanced deployment scenarios.
