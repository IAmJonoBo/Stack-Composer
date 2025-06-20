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
	pnpm vitest run

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

# Preview the hybrid wizard UI (React Flow + Arborist demo)
preview-wizard:
	pnpm run preview-wizard

# Default
@default:
	@echo "Available recipes: bootstrap, check, test, build, run, security, fmt, clean, book"
