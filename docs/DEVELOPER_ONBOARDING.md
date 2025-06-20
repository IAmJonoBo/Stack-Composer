# Developer Onboarding Checklist

Welcome to Stack Composer! This checklist will help you get up and running quickly.

## Prerequisites

- [ ] **Operating System**: macOS, Linux, or Windows with WSL2
- [ ] **Git**: Latest version installed
- [ ] **GitHub Account**: With SSH keys configured

## Tool Installation

Follow the [Toolchain & DX Pipeline](src/toolchain.md) guide to install:

- [ ] **Rust** (via rustup)
- [ ] **Node.js** (≥ v20)
- [ ] **pnpm** (primary package manager)
- [ ] **just** (command runner)
- [ ] **Tauri CLI**
- [ ] **Additional tools**: biome, vale, mdbook, cargo-nextest, etc.

## Project Setup

1. **Clone and Install**

   ```bash
   git clone https://github.com/your-org/stack-composer
   cd stack-composer
   pnpm install
   ```

2. **Verify Installation**

   ```bash
   cargo xtask ci
   ```

## Platform-Specific Setup

### macOS Developers

⚠️ **Important**: macOS has specific build requirements due to resource fork file issues.

1. **Set Environment Variables** (add to your shell profile):

   ```bash
   export COPYFILE_DISABLE=1
   export COPY_EXTENDED_ATTRIBUTES_DISABLE=1
   ```

2. **Use Platform-Specific Commands**:

   ```bash
   # Regular development (all packages except Tauri)
   cargo check --workspace
   cargo build --workspace
   
   # Tauri development
   ./build-tauri.sh
   ```

3. **Read the Full Guide**: [macOS Build Issues](MACOS_BUILD_ISSUES.md)

### Linux/Windows Developers

Standard Rust/Cargo commands work normally:

```bash
cargo check --workspace
cargo build --workspace
cargo test --workspace
```

## Development Workflow

1. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code
   - Update documentation if needed
   - Add/update tests

3. **Test Your Changes**

   ```bash
   # macOS
   cargo check --workspace
   ./build-tauri.sh  # if working on Tauri
   
   # Linux/Windows
   cargo check --workspace
   cargo test --workspace
   ```

4. **Commit and Push**

   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use GitHub web interface or `gh` CLI
   - Fill out the PR template
   - Wait for CI checks to pass

## Common Commands

### Package Management

```bash
# Install dependencies
pnpm install

# Add a new dependency
pnpm add package-name
```

### Rust Development

```bash
# Check all packages (excludes Tauri on macOS)
cargo check --workspace

# Check specific package
cargo check -p orchestrator

# Run tests
cargo test --workspace

# Format code
cargo fmt

# Lint code
cargo clippy
```

### Tauri Development (macOS)

```bash
# Build Tauri app
./build-tauri.sh

# Or manually
cd src-tauri
COPYFILE_DISABLE=1 cargo check
```

### Documentation

```bash
# Build documentation
mdbook build

# Serve documentation locally
mdbook serve
```

## Troubleshooting

### macOS Build Issues

If you see errors like:

```markdown
stream did not contain valid UTF-8
failed to read file '.../_default.toml'
```

1. **Clean the project**:

   ```bash
   cargo clean
   dot_clean .
   find . -name "._*" -type f -delete
   ```

2. **Use the build script**:

   ```bash
   ./build-tauri.sh
   ```

3. **Check environment variables**:

   ```bash
   echo $COPYFILE_DISABLE  # Should output: 1
   echo $COPY_EXTENDED_ATTRIBUTES_DISABLE  # Should output: 1
   ```

### General Issues

1. **Dependencies out of sync**:

   ```bash
   pnpm install
   cargo update
   ```

2. **Build cache issues**:

   ```bash
   cargo clean
   pnpm clean  # if available
   ```

3. **Permission issues**:

   ```bash
   chmod +x build-tauri.sh
   chmod +x scripts/*.sh
   ```

## Getting Help

- **Documentation**: Check the `docs/` directory
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Architecture**: Read [Architecture Overview](src/architecture/architecture-overview.md)

## Next Steps

Once you're set up:

1. **Read the Architecture**: [Architecture Overview](src/architecture/architecture-overview.md)
2. **Understand the Codebase**: Explore the `agents/` directory
3. **Pick an Issue**: Look for "good first issue" labels
4. **Join Discussions**: Participate in GitHub Discussions

## Checklist Summary

- [ ] Tools installed and verified
- [ ] Project cloned and dependencies installed
- [ ] Platform-specific setup completed (especially macOS)
- [ ] First successful build completed
- [ ] Environment variables configured (macOS)
- [ ] Documentation read and understood
- [ ] Ready to contribute!

---

**Need help?** Open an issue or start a discussion on GitHub.

**Found a problem with this guide?** Please submit a PR to improve it!
