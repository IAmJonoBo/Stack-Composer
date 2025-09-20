import { defineConfig } from "vitest/config";
// Root-level config is only for Vitest; not for building an app at the repo root.

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.ts",
		coverage: {
			reporter: ["text", "json", "html"],
		},
	},
});
