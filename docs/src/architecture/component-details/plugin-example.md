# Plugin/Extension Example

This section provides a concrete example of writing and registering a WASI plugin for Stack Composer.

## Example: Hello World Plugin (Rust)

```rust
// hello_plugin/src/lib.rs
#[no_mangle]
pub extern "C" fn greet() {
    println!("Hello from plugin!");
}
```

- Build with `cargo build --target=wasm32-wasi --release`.
- Register in `plugin.toml`:

```toml
[[plugin]]
name = "hello_plugin"
path = "./target/wasm32-wasi/release/hello_plugin.wasm"
capabilities = ["log"]
```

- Load and call from orchestrator:

```rust
orchestrator.load_plugin("hello_plugin");
orchestrator.call_plugin("greet", &[]);
```

> See [Plugin Host](plugin-host.md) for API details and more extension points.
