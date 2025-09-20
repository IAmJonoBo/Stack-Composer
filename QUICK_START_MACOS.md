# Quick Start for macOS Developers

⚠️ **macOS has specific build requirements** - follow this guide to avoid common issues.

## 1. Environment Setup

Add these to your shell profile (`.zshrc`, `.bashrc`, etc.):

```bash
export COPYFILE_DISABLE=1
export COPY_EXTENDED_ATTRIBUTES_DISABLE=1
```

Then restart your terminal or run:

```bash
source ~/.zshrc  # or ~/.bashrc
```

## 2. Project Setup

```bash
git clone https://github.com/your-org/stack-composer
cd stack-composer
pnpm install
```

## 3. Build Commands

### Regular Development (Recommended)

```bash
# Check all packages (excludes Tauri)
cargo check --workspace

# Build all packages (excludes Tauri)  
cargo build --workspace

# Run tests
cargo test --workspace
```

### Tauri Development (When Needed)

```bash
# Use the dedicated script
./build-tauri.sh

# Or manually
cd src-tauri
COPYFILE_DISABLE=1 cargo check
```

## 4. Common Issues

### "stream did not contain valid UTF-8" Error

This happens when macOS creates resource fork files (`._*`). Fix it:

```bash
# Clean the project
cargo clean
dot_clean .
find . -name "._*" -type f -delete

# Use the Tauri build script
./build-tauri.sh
```

### Build Hangs or Times Out

1. Check environment variables:

   ```bash
   echo $COPYFILE_DISABLE  # Should output: 1
   ```

2. Clean and retry:

   ```bash
   cargo clean
   ./build-tauri.sh
   ```

## 5. Development Workflow

```bash
# 1. Create branch
git checkout -b feature/my-feature

# 2. Make changes and test
cargo check --workspace
./build-tauri.sh  # if working on Tauri

# 3. Commit and push
git add .
git commit -m "feat: my feature"
git push origin feature/my-feature
```

## 6. Need Help?

- **Full Guide**: [macOS Build Issues](docs/MACOS_BUILD_ISSUES.md)
- **Developer Onboarding**: [Developer Onboarding](docs/DEVELOPER_ONBOARDING.md)
- **Contributing**: [Contributing Guide](docs/src/contributing/contributing.md)
- **Issues**: Open a GitHub issue

---

**TL;DR**: Set environment variables, use `cargo check --workspace` for regular development, use `./build-tauri.sh` for Tauri.
