# Planner Integration

This guide describes how Stack Composer integrates with external planners (Fast Downward, OPTIC) for automated build plan generation.

## Planner Invocation Flow

1. StackAgent or Orchestrator prepares a planning request with domain/problem files and options.
2. Planner Adapter launches the planner binary as a subprocess.
3. Input is passed as JSON or PDDL files; output is parsed from planner stdout.
4. Results (plan, cost, metrics) are returned to the caller.

## Input JSON Example

```json
{
  "domain_file": "(define (domain stack-build) ...)",
  "problem_file": "(define (problem build-ecommerce) ...)",
  "timeout_s": 60,
  "heuristics": ["ff", "lmcut"]
}
```

## Output JSON Example

```json
{
  "plan": [
    { "action": "install_rust", "args": ["1.70"] },
    { "action": "setup_qdrant", "args": [] }
  ],
  "cost": 42,
  "runtime_ms": 1234,
  "metrics": { "expanded": 100, "evaluated": 200 }
}
```

## Error Handling

- **Timeouts:** If the planner exceeds `timeout_s`, the subprocess is killed and an error is returned.
- **Syntax Errors:** If the planner returns a non-zero exit code, stderr is parsed for error details.
- **Missing Output:** If no plan is found, a fallback or error is reported to the user.

**Responsibility:**

- Accepts planning requests, manages planner subprocess, parses and returns results/errors.
- Depends on Fast Downward/OPTIC binaries, PDDL input, and system resources.
