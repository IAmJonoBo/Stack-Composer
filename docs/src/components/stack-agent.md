> _Status: Draft — last updated 2025-06-20_

# Stack Agent

---

See [architecture-questions.md](../Architecture%20&%20Component%20Guides/architecture-questions.md) for open questions and strategic direction.

See also:

- [Gap Agent](gap-agent.md)
- [Report Agent](report-agent.md)

The **Stack Agent** synthesises one or more candidate technology stacks that
satisfy the fully‑specified requirement graph coming out of the Gap‑Analysis
Agent. It ranks those candidates using a multi‑objective score that balances
licence compatibility, ecosystem maturity, performance, hiring pool and known
security posture. The top‑N proposals are streamed back to the Orchestrator
for user review and report generation.

---

## 1 Responsibilities

| #   | Responsibility          | Detail                                                           |
| --- | ----------------------- | ---------------------------------------------------------------- |
| 1   | **Collect evidence**    | Query Retrieval Layer for chunks tagged with relevant domains    |
| 2   | **Generate candidates** | Apply rule‑based templates + LLM “fill gaps” prompt              |
| 3   | **Invoke planner**      | Attach plan cost (time/resource) to each candidate               |
| 4   | **Score & rank**        | Weighted AHP (analytic hierarchy process) + RL‑Critic adjustment |
| 5   | **Emit proposals**      | Stream `Proposal` objects to UI for incremental rendering        |
| 6   | **Telemetry**           | Emit `stack.proposal` and `stack.score` spans                    |

---

## 2 Data Flow

```mermaid
flowchart LR
  R[Requirement Graph] --> E( Evidence Collector )
  E --> G(Candidate Generator)
  G --> P(Planner Adapter)
  P --> S(Scorer)
  S -->|top‑N| ORCH[Orchestrator / UI]
```

_Evidence Collector_ issues hybrid searches;
_Candidate Generator_ uses both **template rules** and **LLM “slot‑fill”**;
_Scorer_ combines heuristic score + optional RL‑Critic value.

---

## 3 Public Rust API

```rust
pub struct Proposal {
    pub id: Uuid,
    pub stack: TechStack,        // nested langs, frameworks, infra
    pub score: f32,
    pub plan: Vec<PlanStep>,     // optional if planner disabled
    pub rationale: String,       // LLM explanation
}

#[async_trait]
pub trait StackAgent {
    async fn propose(requirements: &RequirementGraph, max: usize)
        -> anyhow::Result<Vec<Proposal>>;

    async fn score(proposal: &mut Proposal) -> anyhow::Result<()>;
}
```

`TechStack` defined in `schema/tech_stack.rs`.

---

## 4 Scoring Function

Total score = Σ ( wᵢ × metricᵢ ) − penalty

| Metric                                 | Symbol | Weight (default) |
| -------------------------------------- | ------ | ---------------- |
| Licence compatibility                  | L      | 0.25             |
| Ecosystem maturity (GitHub stars, age) | M      | 0.20             |
| Performance benchmarks                 | P      | 0.15             |
| Hiring pool size                       | H      | 0.15             |
| Security track record                  | S      | 0.15             |
| Planner cost (build time)              | C      | −0.10 (penalty)  |

Weights are stored in `config/stack_agent.toml` and adjustable per project.
If RL‑Critic is enabled, its value estimate _re‑weights_ the final score by up
to ±10 %.

---

## 5 Candidate Generation Strategies

1. **Rule‑based templates** (fast, deterministic)
   _Example_: “Web → Language: Rust | JS; Framework: Actix | Next.js …”
2. **LLM slot fill** — prompt:

   > “Given requirements A, B, C produce **one** complete tech stack as JSON…”

3. **Hybrid** — start with rule template, let LLM propose alternates.

Strategy selected via config: `gen_mode = "hybrid"`.

---

## 6 Configuration (`stack_agent.toml`)

```toml
[generator]
mode = "hybrid"        # rule | llm | hybrid
max_candidates = 10

[scoring]
weights = { licence = 0.25, maturity = 0.2, perf = 0.15,
            hiring = 0.15, security = 0.15, plan_cost = -0.1 }

[planner]
enabled = true
timeout_secs = 45
```

---

## 7 Extension Hooks

| Hook                       | How                                              |
| -------------------------- | ------------------------------------------------ |
| **Custom score metric**    | WASI plugin implements `fn metric(stack) -> f32` |
| **New generator strategy** | Register `Box<dyn ProposalGenerator>`            |
| **Domain‑specific rules**  | TOML file `rules/*.toml` hot‑loaded on change    |

---

## 8 UI/UX Integration

- Proposals stream into a **card grid**; clicking a card shows rationale,
  plan timeline, and licence/security matrix.
- **Risk badge** colours: green ≥ 0.8, yellow 0.6‑0.79, red < 0.6.
- Hover over score shows spider‑chart of metric contributions.

---

## 9 Roadmap

| Version | Feature                                            |
| ------- | -------------------------------------------------- |
| 0.5     | Rule + hybrid generator, static AHP scores         |
| 0.8     | RL‑Critic adjustment loop                          |
| 1.0     | Live “what‑if” matrix (UI slider to tweak weights) |
| 1.1     | Feedback‑learning — user star/rank feeds critic    |
| 2.0     | Multi‑objective Pareto frontier visualisation      |

---

## 10 Open Questions

- Best default weight set for security‑focused industries?
- Should plan cost be normalised by team size?
- Strategy for detecting circular dependencies in candidate stacks?

---

## 11 Usage Example

```rust
let mut proposals = stack_agent
    .propose(&req_graph, 5)
    .await?;
for p in &mut proposals {
    stack_agent.score(p).await?;
}
```

---

See also:

- [Retrieval Layer](retrieval-layer.md)
- [Planner Adapter](planner-adapter.md)
- [RL Critic](../ai-sub-system-docs/rl-critic.md)
