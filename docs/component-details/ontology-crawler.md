# Weekly Ontology Crawler

Scheduled job that refreshes the knowledge base.

- Scrapes GitHub release RSS, CVE feeds, and language package indexes.
- Updates Qdrant + Meilisearch with new vectors and metadata.
- Runs Sunday 03:00 local time; skipped if laptop on battery.

Config: `ontology.refresh.cron = "0 3 * * 0"`.

## Roadmap & Enhancements

- **Ontology Versioning:** Planned support for versioned, updatable ontologies and knowledge graphs.
- **Validation Workflow:** UI and CLI tools for vetting and approving ontology updates.
- **Distributed Updates:** Support for multi-node/clustered ontology refresh and propagation.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
