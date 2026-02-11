//! Planner adapter agent (subprocess, not a library)
use std::process::Command;

pub fn run_fast_downward(args: &[&str]) -> anyhow::Result<()> {
    let status = Command::new("fast-downward").args(args).status()?;
    if status.success() {
        Ok(())
    } else {
        Err(anyhow::anyhow!("Fast Downward failed"))
    }
}

fn main() {
    // Example: run Fast Downward with dummy args
    // In production, parse args from CLI or orchestrator
    let _ = run_fast_downward(&["--help"]);
}
