# Gap-Analysis Agent

Finds missing requirements and generates clarifying questions.

- Compares extracted requirement graph to an ontology of stack constraints.
- Calls `llm.ask()` with system prompt “Ask exactly one clarifying question …”.
