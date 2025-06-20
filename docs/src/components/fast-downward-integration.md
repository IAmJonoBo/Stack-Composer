# Fast Downward Integration Guide

Fast Downward (FD) integrates with Stack Composer as a vendored, reproducibly-built subprocess, driven by the Planner Adapter through a thin Rust wrapper. This guide details how to achieve a robust, cross-platform, and license-compliant integration, while allowing advanced users to customize heuristics and portfolios.

---

## 1. Build & Packaging Strategy

### 1.1 Bring the Source In-Tree

- Add FD as a Git submodule at `third_party/fast-downward`, pinned to a tested release tag (e.g., `refs/tags/v23.06`).
- FD’s Makefile can autoselect optional SAT and MIP solvers. To avoid non-redistributable CPLEX and Gurobi backends, set `FAST_DOWNWARD_SKIP_SAT=yes` in your build script.

### 1.2 Reproducible Compilation

- Use FD’s provided Dockerfile (`aibasel/downward`) as the canonical build environment to ensure identical binaries across CI workers.
- Wrap the build in a Cargo `build.rs` that:
  1. Mounts the submodule
  2. Runs `./build.py --release --build-dir build_release`
  3. Copies the resulting `fast-downward.py` and `downward-release` binary into `target/$TRIPLE/fastdownward/bin`

This approach keeps GPL code out of Rust crate objects, satisfying the GPL-v3 “classpath” exception FD provides.

### 1.3 Cross-Platform Artifacts

- On Linux/macOS, compile natively; on Windows, ship the official MinGW build from the FD team (note: reduced diagnostics).
- Add a `fastdownward.exe` symlink shim so the wrapper CLI name is consistent across OSes.

---

## 2. Licensing & Legal Guard-Rails

FD is GPL-v3 with a “linking exception,” so invoking it as a subprocess keeps Stack Composer’s Apache-2.0 code base clean.

- Store the binary SHA-256 and precise Git commit in your SBOM.
- On first run, show a modal with the GPL text and require the user to click **I acknowledge** to satisfy § 5c of the license.

### 2.1 SBOM & First‑Run Acknowledgement

- **SBOM entry** – the `build.rs` script computes the SHA‑256 of the built (or downloaded) `downward‑release` binary **and** the Git commit hash of the sub‑module.
  Both values are appended to `target/sbom/fast‑downward.spdx.json` so the Auditor job can merge them into the global SBOM.
- **GPL modal** – on first launch, the Orchestrator checks `~/.config/stack‑composer/fd_accepted = true`; if missing, it spawns a native dialog that shows the GPL‑3 text and the linking‑exception clause.
  Clicking **I Acknowledge** writes the flag, satisfying GPL § 5 c while preserving user transparency.

---

## 3. Runtime Integration Points

### 3.1 CLI Façade

Your `fd_adapter` should shell out as follows:

```rust
Command::new(env::var("FD_BIN")      // overrideable
      .unwrap_or_else(|_| "fast-downward.py".into()))
  .args(["--alias", "seq-sat-lmcut",   // heuristic proven strong in IPC ’11
         "--overall-time-limit", timeout.to_string()])
  .args([domain, problem])
  .stdout(Stdio::piped())
  .spawn()?;
```

> **Path resolution order**
>
> 1. `FD_BIN` environment variable (user override)
> 2. `~/.local/share/stack‑composer/fastdownward/bin/fast‑downward.py`
> 3. `$PATH` lookup (`fast‑downward.py`)
>
> This keeps power‑user overrides easy while giving deterministic defaults.

- Parse either the classical `plan.txt` or OPTIC’s XML plan, using the grammar documented in the FD planner-usage guide.
- Exit codes: `0` = success; `124` = timeout; anything else → `PlannerError::Crash`.

### 3.2 Portfolio & Heuristic Tuning

FD’s portfolio runner allows multiple search configs sequentially. Ship a JSON preset file:

```json
[
  { "alias": "seq-sat-lmcut", "cutoff": 30 },
  { "alias": "lama-first", "cutoff": 60 }
]
```

Call with `--portfolio portfolio.json` when the user checks “optimise plan” in the UI.

### 3.3 State-Translation Caching

The translation phase converts PDDL to SAS; cache `$TASK.hash.sas` under `/tmp/stack-composer/fd-cache` so identical problems reuse the result and skip ≈70% of start-up time.

---

## 4. Performance Tuning Knobs

| Knob                        | Default                | When to Change            | Source         |
| --------------------------- | ---------------------- | ------------------------- | -------------- |
| `--search "astar(lmcut())"` | fast heuristic, scales | large branching factors   | [FD docs]      |
| `--search-time-limit`       | 90% of wall limit      | long-running optimisation | planner docs   |
| `--overall-memory-limit`    | 50% RAM                | CI runners w/ <8 GB       | FD build guide |

Expose these in `planner.toml` so advanced users can tune FD without recompiling.

---

## 5. CI & Regression Testing

- Add IPC mini-benchmarks (e.g., `gripper-small`, `blocks-4`) to `tests/fixtures/`.
- In CI, run `fd_adapter solve …` and assert plan length & cost match golden outputs each sprint.
- Use the official FD Docker image for Linux runners and pre-built macOS/Windows artifacts for those jobs to ensure deterministic pipelines across platforms.
- Inject the SBOM step: `cargo auditable build && cat target/sbom/*.json >> global-sbom.json`.

---

## 6. Future-Proof Extensions

| Idea                                      | Sprint | Rationale                              |
| ----------------------------------------- | ------ | -------------------------------------- |
| Build FD with LM-Cut+plus heuristic patch | S-12   | 15–25% fewer expansions on IPC’18 data |
| Integrate focused iterative-broadening    | S-14   | Alternative when memory is tight       |
| Expose FD’s preferred operators stream    | S-08   | Allows RL-Critic to bias exploration   |

---

## TL;DR

Vendoring Fast Downward, compiling it deterministically (Docker for Linux/macOS, verified MinGW artefact for Windows) and treating it as a signed, time‑boxed subprocess gives you maximum flexibility (all heuristics, portfolios, temporal OPTIC fork) without entangling Stack Composer in GPL. Wire that binary through your existing `PlannerAdapter` trait, cache the translation output, and surface key heuristics in `planner.toml`; you’ll hit IPC-grade planner performance while staying reproducible and legally clean.
