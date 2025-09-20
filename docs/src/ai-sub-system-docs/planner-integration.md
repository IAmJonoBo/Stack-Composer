# Planner Integration Guide

> _Version 1.0 — last updated 2025‑06‑20_

This document explains how **Stack Composer** invokes symbolic planners (**Fast Downward** and **OPTIC**) to turn high‑level requirements into an executable build‑orchestration plan. It covers the Planner trait, PDDL generation, CLI adapters, configuration, security, and future extensibility.

---

##  1 Design Goals

| ID   | Goal              | Rationale                                         |
| ---- | ----------------- | ------------------------------------------------- |
| P‑01 | **Deterministic** | Same brief → same plan; hashable outputs for CI   |
| P‑02 | **Offline‑first** | Planner binaries bundled; subprocess only         |
| P‑03 | **Sandboxed**     | No network / FS writes aside from temp dir        |
| P‑04 | **Cost‑aware**    | Resource/cost fields influence search             |
| P‑05 | **Composable**    | Multiple domain files can be merged (HTN later)   |
| P‑06 | **Pluggable**     | Any planner implementing the trait can be swapped |

---

##  2 Planner Trait (Rust)

```rust
#[async_trait]
pub trait Planner {
    async fn solve(
        &self,
        domain: &Path,
        problem: &Path,
        timeout: u32,
    ) -> anyhow::Result<Plan>;
}
```

`Plan` = `Vec<PlanStep { action: String, params: Vec<String>, cost: f32 }>`.

---

##  3 CLI Adapters

###  3.1 Fast Downward Adapter

```bash
fast-downward.py \
  --alias seq-sat-lmcut \
  domain.pddl problem.pddl \
  --plan-file plan.txt \
  --overall-time-limit 60
```

- Parses `plan.txt` → JSON.
- Stores binary SHA‑256 and GPL‑exception note for SBOM.

###  3.2 OPTIC (Temporal / Cost)

```bash
optic.py domain.pddl problem.pddl \
  --out plan.optic \
  --time 60
```

`PlanStep` gains `start_time` and `end_time`; orchestrator can render a Gantt.

###  3.3 Adapter Selection Logic

```text
if problem contains :durative-action → use OPTIC
else                                 → Fast Downward
```

Override via `--planner optic` CLI flag.

---

##  4 PDDL Generation

###  4.1 Domain Template (extract)

```pddl
(:types
  Language Framework Infra Tool - entity
)

(:predicates
  (requires ?x ?y)
  (hasLicence ?x ?lic)
  (selected ?x)
)

(:action choose-language
  :parameters (?l - Language)
  :precondition (not (selected ?l))
  :effect (selected ?l)
)
```

###  4.2 Problem Skeleton

```pddl
(define (problem stack-problem)
  (:domain stack-domain)
  (:objects
    rust nodejs python - Language
    actix nextjs django - Framework
  )
  (:init
    (requires actix rust)
    (hasLicence rust MIT)
  )
  (:goal (selected actix))
)
```

Add `(:metric minimize (total-time))` for cost‑aware runs.

---

##  5 Configuration

`config/planner.toml`

```toml
[fast_downward]
binary = "/usr/local/bin/fast-downward.py"
alias  = "seq-sat-lmcut"
timeout_secs = 60

[optic]
binary = "/opt/optic/optic.py"
timeout_secs = 60

[defaults]
use_optic_for_temporal = true
```

CLI override: `--planner-timeout 120`.

---

##  6 Security & Sandboxing

- Planner runs in a tmpfs jail; no outbound network.
- Output scanned for secrets before JSON parse.
- Binary SHA‑256 stored for SBOM.

---

##  7 Testing & Benchmarks

| Suite    | Problems | FD p50 (ms) | OPTIC p50 (ms) |
| -------- | -------- | ----------- | -------------- |
| demo‑web | 26       | 93          | 141            |
| infra‑ci | 14       | 75          | N/A            |

Golden plans in `tests/fixtures/plans/`.

---

##  8 Extension Points

| Hook            | Description                                               |
| --------------- | --------------------------------------------------------- |
| `Planner` trait | Implement for custom planner; register via plugin.        |
| HTN support     | JSHOP‑2 adapter scheduled v 1.2.                          |
| RL critic       | Ray RLlib re‑scores alternative plans (see rl‑critic.md). |

---

##  9 Roadmap

| Version | Feature                            |
| ------- | ---------------------------------- |
| 0.5     | Fast Downward adapter              |
| 0.8     | OPTIC temporal support             |
| 1.0     | Cost metric tuning, JSON v2        |
| 1.2     | HTN adapter + RL critic            |
| 2.0     | Probabilistic RDDL planner (Prost) |

---

##  10 FAQ

**Why not embed Fast Downward as a library?**  
GPL‑2 linking; subprocess respects exception clause.

**Can I use my own planner binary?**  
Yes—edit `planner.toml`; ensure standard plan output.

**What if planning fails?**  
Error propagated to UI; user can switch to deterministic form mode.
