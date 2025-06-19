# justfile for Stack Composer

# Bootstrap all dependencies and services
bootstrap:
	pnpm install
	cargo fetch
	docker compose up -d qdrant meilisearch

# Lint all code and docs
check:
	cargo clippy --all-targets --all-features -- -D warnings
	biome check .
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
	biome format .

# Clean up
clean:
	cargo clean
	pnpm clean
	docker compose down

# Docs
book:
	mdbook serve docs

# Default
@default:
	@echo "Available recipes: bootstrap, check, test, build, run, security, fmt, clean, book"
