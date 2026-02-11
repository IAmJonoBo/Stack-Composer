# Stack Composer UI

> **Note:** This project uses **pnpm** as the primary package manager. Use **Yarn** only for edge cases (see main README).

This directory contains the Tauri + React + Vite frontend for Stack Composer.

## Setup

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Start the development server:

   ```sh
   pnpm tauri dev
   ```

## Lint & Format

- Lint (runs workspace linters):

   ```sh
   pnpm lint
   ```

- Quick Trunk check (local, fast subset):

   ```sh
   pnpm lint:trunk:local
   ```

- Reset Trunk if it hangs:

   ```sh
   pnpm trunk:reset
   ```

See the Trunk guide for details: `docs/src/tooling/trunk.md` in the repo root.

## Tech Stack

- [Tauri](https://tauri.app/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

## Pages

- Wizard: Project setup and stack design
- Settings: "No account required. Sync coming soon."

---

For more details, see the main project README.

## Package Manager Policy

- **pnpm** is required for all install, build, and dev commands.
- **Yarn** is only needed for rare edge cases (see main README for details).
