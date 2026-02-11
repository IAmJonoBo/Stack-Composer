# justfile for Stack Composer

# All JS/TS package management uses pnpm by default. Use Yarn only for edge cases (see README).

# Bootstrap all dependencies and services
bootstrap:
	pnpm install
	cargo fetch
	docker compose up -d qdrant meilisearch

# Lint all code and docs
check:
	cargo clippy --all-targets --all-features -- -D warnings
	eslint . --ext .js,.ts,.tsx
	markdownlint docs/**/*.md
	vale docs/

# Run all tests
test:
	cargo nextest run --all
	pnpm vitest run --passWithNoTests

# Build the project
build:
	cargo build --release
	pnpm build

# Run the app (dev mode)
run:
	pnpm dev

# Generate SBOM and run security checks
security:
	cargo audit
	cargo deny check
	trivy fs .

# Format code
fmt:
	cargo fmt --all
	prettier --write .

# Clean up
clean:
	cargo clean
	pnpm clean
	docker compose down

# Docs
book:
	mdbook serve docs

# Reproducible build check (cleans, installs, and rebuilds with locked deps)
reproduce-build:
	cargo clean
	pnpm install --frozen-lockfile
	cargo fetch --locked
	cargo build --workspace --locked
	pnpm build

# Lightweight smoke test suite (fast validation before PRs)
smoke:
	cargo check --workspace
	pnpm vitest run --passWithNoTests

# Preview the hybrid wizard UI (React Flow + Arborist demo)
preview-wizard:
	pnpm run preview-wizard

# Show Copilot coding agent instructions
copilot:
	@echo "Opening .github/copilot-instructions.md"
	@if command -v bat >/dev/null 2>&1; then \
		bat -pp .github/copilot-instructions.md; \
	else \
		cat .github/copilot-instructions.md; \
	fi

# Default
@default:
	@echo "Available recipes: bootstrap, check, test, build, run, security, fmt, clean, book, reproduce-build, smoke, preview-wizard, copilot"
