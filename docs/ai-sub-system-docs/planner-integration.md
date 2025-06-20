# Planner Integration Guide

_Version 1.0 — last updated 2025‑06‑20_

This document explains how **Stack Composer** invokes symbolic planners
(**Fast Downward** and **OPTIC**) to turn high‑level requirements into an
executable build‑orchestration plan. It covers the Planner trait, PDDL
generation, CLI adapters, configuration, security, and future extensibility.

---

## 1 Design Goals

| ID   | Goal              | Rationale                                         |
| ---- | ----------------- | ------------------------------------------------- |
| P‑01 | **Deterministic** | Same brief → same plan; hashable outputs for CI   |
| P‑02 | **Offline‑first** | Planner binaries bundled; subprocess only         |
| P‑03 | **Sandboxed**     | No network / FS writes aside from temp dir        |
| P‑04 | **Cost‑aware**    | Optional resource/cost fields influence search    |
| P‑05 | **Composable**    | Multiple domain files can be merged (HTN later)   |
| P‑06 | **Pluggable**     | Any planner implementing the trait can be swapped |

---

## 2 Planner Trait (Rust)

```rust
#[async_trait]
pub trait Planner {
    /// Solve a PDDL problem in `timeout` seconds; returns a JSON plan.
    async fn solve(
        &self,
        domain: &Path,
        problem: &Path,
        timeout: u32,
    ) -> anyhow::Result<Plan>;
}
```

`Plan` is a vector of `PlanStep { action: String, params: Vec<String>, cost: f32 }`.

---

## 3 CLI Adapters

### 3.1 Fast Downward Adapter

```bash
fast-downward.py \
  --alias seq-sat-lmcut \
  domain.pddl problem.pddl \
  --plan-file plan.txt \
  --overall-time-limit 60s \
  --search-time-limit 50s
```

- Parses `plan.txt` to JSON.
- Detects **GNU GPL‑2 exception** string and stores hash for licence audit.
- Exits with `PlannerError::Timeout` if wall‑clock ≥ timeout.

### 3.2 OPTIC (Temporal / Cost)

```bash
optic.py domain.pddl problem.pddl \
  --out plan.optic \
  --time 60
```

`PlanStep` gains `start_time` and `end_time`; orchestrator can visualise Gantt.

### 3.3 Adapter Selection Logic

```text
If (problem contains :durative-action) --> use OPTIC
else                                          Fast Downward
```

Override with `--planner optic` CLI flag.

---

## 4 PDDL Generation

### 4.1 Domain Template (extract)

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
  :precondition (and (not (selected ?l)))
  :effect (selected ?l)
)
```

### 4.2 Problem File Skeleton

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
  (:goal
    (and (selected actix))
  )
)
```

- Cost metric optional: `(:metric minimize (total-time))`.

---

## 5 Configuration

File: `config/planner.toml`

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

CLI flag `--planner-timeout 120` overrides per run.

---

## 6 Security & Sandboxing

- Planner runs in a **tmpfs jail** created by orchestrator; no network.
- Output files scanned for secrets (grep AWS keys) before JSON parse.
- SHA‑256 of binary stored for SBOM.

---

## 7 Testing & Benchmarks

| Bench set | #problems | FD p50 (ms) | OPTIC p50 (ms) |
| --------- | --------- | ----------- | -------------- |
| demo‑web  | 26        | 93          | 141            |
| infra‑ci  | 14        | 75          | N/A            |

Golden plans live under `tests/fixtures/plans/`.

---

## 8 Extension Points

| Hook               | Description                                          |
| ------------------ | ---------------------------------------------------- |
| **Custom planner** | Implement `Planner` trait; register via WASI plugin. |
| **HTN support**    | JSHOP‑2 adapter scheduled for v1.2.                  |
| **RL critic loop** | Planned: Ray RLlib re‑scores alternative plans.      |

---

## 9 Roadmap

| Version | Feature                            |
| ------- | ---------------------------------- |
| 0.5     | Fast Downward adapter (this spec)  |
| 0.8     | OPTIC temporal support             |
| 1.0     | Cost metric tuning, JSON schema v2 |
| 1.2     | HTN planner adapter + RL critic    |
| 2.0     | Probabilistic RDDL planner (Prost) |

---

## 10 FAQ

**Why not embed Fast Downward as a library?**  
GPL‑2 linking issues; subprocess respects the exception clause.

**Can I use my own planner binary?**  
Yes—edit `planner.toml` and ensure the binary emits standard plan format.

**What happens on planner failure?**  
Error propagated to UI; user may switch to form‑guided deterministic mode.
