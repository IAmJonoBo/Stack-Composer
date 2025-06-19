# Report Agent

Generates human-readable and machine-readable outputs.

| Output        | Format                                   |
| ------------- | ---------------------------------------- |
| UI view       | Markdown rendered in React               |
| API           | JSON `StackReport`                       |
| Repo Scaffold | `tar.gz` with `Dockerfile`, `README`, CI |

## Roadmap & Enhancements

- **Export Connectors:** Planned adapters for Jira, Confluence, GitHub Issues, and other external tools.
- **Custom Templates:** Support for PDF, DOCX, and user-defined export formats.
- **Post-Generation Hooks:** Allow user scripts to automate workflow integration after report generation.

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.
