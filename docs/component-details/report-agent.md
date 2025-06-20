# Report Agent

## Responsibilities

- Generate human- and machine-readable reports
- Export scaffolds, API outputs, and documentation

## Public APIs

- `generate_report(proposal: Proposal) -> Report`
- `export_scaffold(report: Report) -> Archive`

## Extension Hooks

- Custom export formats (PDF, DOCX, etc.)
- Post-generation hooks for workflow automation

## Roadmap & Enhancements

- Export connectors for Jira, Confluence, GitHub Issues
- Custom templates and user-defined formats
- Post-generation hooks for workflow integration

## Open Questions

- How to support user scripts for post-processing?
- What is the best way to handle large exports?

## How to Extend/Customize

- Add new export adapters via plugin
- Implement custom report templates

## Real-World Usage Example

```rust
let report = report_agent.generate_report(proposal);
```

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

_See also: [Stack Agent](stack-agent.md), [Planner Adapter](planner-adapter.md)_
