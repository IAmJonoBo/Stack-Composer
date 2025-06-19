# Weekly Ontology Crawler

Scheduled job that refreshes the knowledge base.

- Scrapes GitHub release RSS, CVE feeds, and language package indexes.
- Updates Qdrant + Meilisearch with new vectors and metadata.
- Runs Sunday 03:00 local time; skipped if laptop on battery.

Config: `ontology.refresh.cron = "0 3 * * 0"`.
