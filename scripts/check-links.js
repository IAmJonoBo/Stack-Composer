#!/usr/bin/env node
/**
 * scripts/check-links.js
 *
 * - Scans .md files under docs/ and repo root
 * - Collects [text](target) links
 * - Attempts to resolve each target relative to the file
 * - If unresolved, looks up link-map.json
 * - Reports broken links or (optionally) rewrites files
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple glob implementation since we don't want to add dependencies
function findMarkdownFiles(dir, files = []) {
	const items = fs.readdirSync(dir);
	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);
		if (
			stat.isDirectory() &&
			!item.startsWith(".") &&
			item !== "node_modules" &&
			item !== "target"
		) {
			findMarkdownFiles(fullPath, files);
		} else if (stat.isFile() && item.endsWith(".md")) {
			files.push(fullPath);
		}
	}
	return files;
}

const root = path.resolve(__dirname, "..");
const linkMapPath = path.join(root, "link-map.json");

// Load link map if it exists
let linkMap = {};
if (fs.existsSync(linkMapPath)) {
	try {
		linkMap = JSON.parse(fs.readFileSync(linkMapPath, "utf8"));
		delete linkMap.comment; // Remove comment field
	} catch (e) {
		console.warn("Warning: Could not parse link-map.json:", e.message);
	}
}

// Find all markdown files
const markdownFiles = [
	...findMarkdownFiles(path.join(root, "docs")),
	path.join(root, "README.md"),
	path.join(root, "QUICK_START_MACOS.md"),
].filter((f) => fs.existsSync(f));

const errors = [];
let fixes = 0;

console.log(`🔗 Checking ${markdownFiles.length} markdown files...`);

markdownFiles.forEach((filePath) => {
	const relativePath = path.relative(root, filePath);
	const text = fs.readFileSync(filePath, "utf8");
	let hasChanges = false;

	const fixed = text.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		(match, label, target) => {
			// Skip external URLs
			if (target.match(/^(https?:)?\/\//)) return match;
			// Skip mailto links
			if (target.startsWith("mailto:")) return match;
			// Skip bare anchors
			if (target.startsWith("#")) return match;

			// Extract path part (remove anchor)
			const [targetPath, anchor] = target.split("#");
			if (!targetPath) return match; // Just an anchor

			// Try to resolve the path
			const candidatePath = path.resolve(path.dirname(filePath), targetPath);

			if (fs.existsSync(candidatePath)) {
				return match; // Link is valid
			}

			// Check if we have a mapping for this target
			if (linkMap[target]) {
				const newTarget = linkMap[target] + (anchor ? `#${anchor}` : "");
				console.log(`  ✏️  ${relativePath}: ${target} → ${newTarget}`);
				hasChanges = true;
				fixes++;
				return `[${label}](${newTarget})`;
			}

			// Check if we have a mapping for just the path part
			if (linkMap[targetPath]) {
				const newTarget = linkMap[targetPath] + (anchor ? `#${anchor}` : "");
				console.log(`  ✏️  ${relativePath}: ${target} → ${newTarget}`);
				hasChanges = true;
				fixes++;
				return `[${label}](${newTarget})`;
			}

			// Report as broken
			errors.push(`${relativePath}: broken link → ${target}`);
			return match;
		},
	);

	// Write back if we made changes
	if (hasChanges) {
		fs.writeFileSync(filePath, fixed, "utf8");
	}
});

console.log(`\n📊 Results:`);
console.log(`  ✅ Fixed: ${fixes} links`);
console.log(`  ❌ Broken: ${errors.length} links`);

if (errors.length > 0) {
	console.error(`\n💥 ${errors.length} broken link(s) found:\n`);
	errors.forEach((e) => {
		console.error(`  • ${e}`);
	});
	process.exit(1);
} else {
	console.log("\n🎉 All links are valid or have been fixed!");
}
