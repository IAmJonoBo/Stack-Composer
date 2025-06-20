# Data Flow

This module details the data flow for a typical "Compose Stack" request in Stack Composer.

1. **Brief ingestion:** UI/CLI sends the document to the IngestionAgent for chunking and embedding.
2. **Gap analysis:** GapAgent queries the knowledge graph and triggers clarifying questions.
3. **Retrieval:** StackAgent issues hybrid search queries to Qdrant and Meilisearch, merging results.
4. **Planning (optional):** Planner generates and solves PDDL files for stack construction.
5. **Critic loop (future):** RL critic re-scores alternative stacks.
6. **Report generation:** ReportAgent merges citations, plan steps, and diagrams into output files.

See [architecture-overview.md](architecture-overview.md#data-flow-compose-stack-request) for more.
