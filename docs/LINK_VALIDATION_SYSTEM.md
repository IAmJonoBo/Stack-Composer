# Documentation Link Validation System

This document describes the automated link validation system implemented for Stack Composer documentation.

## Overview

The link validation system ensures all cross-references in Markdown documentation are valid and up-to-date. It automatically fixes common path issues and prevents broken links from being committed.

## Components

### 1. Link Checker Script (`scripts/check-links.js`)

**Purpose**: Scans all Markdown files and validates internal links.

**Features**:
- Validates relative links in all `.md` files
- Skips external URLs and email links
- Uses link mapping for legacy path redirects
- Automatically fixes broken links where possible
- Reports remaining issues with clear error messages

**Usage**:
```bash
node scripts/check-links.js
# or
pnpm check-links
```

### 2. Link Mapping (`link-map.json`)

**Purpose**: Maps legacy/broken link targets to their canonical locations.

**Structure**:
```json
{
  "legacy-path.md": "canonical-path.md",
  "../old-location/file.md": "../new-location/file.md"
}
```

**Common Mappings**:
- Component details moved from `component-details/` to `components/`
- Architecture docs consolidated under `architecture/`
- AI subsystem docs in dedicated `ai-sub-system-docs/` folder
- Plugin SDK moved to `extensibility/plugin-sdk.md`

### 3. Automation Integration

#### Pre-commit Hook (`.husky/pre-commit`)
- Runs link validation before each commit
- Prevents broken links from entering the repository
- Provides immediate feedback to developers

#### GitHub Actions (`.github/workflows/link-check.yml`)
- Validates links on push/PR to main branches
- Runs only when documentation files change
- Provides CI feedback on link status

#### Package.json Script
```json
{
  "scripts": {
    "check-links": "node scripts/check-links.js"
  }
}
```

## How It Works

1. **Discovery**: Finds all `.md` files in the repository
2. **Parsing**: Extracts markdown link patterns from each file
3. **Validation**: Attempts to resolve each link relative to the file location
4. **Mapping**: Checks `link-map.json` for known redirects
5. **Fixing**: Automatically updates files with corrected links
6. **Reporting**: Lists any remaining broken links

## Maintenance

### Adding New Mappings

When files are moved or renamed, add entries to `link-map.json`:

```json
{
  "old-path/file.md": "new-path/file.md"
}
```

### Handling Special Cases

- **URL encoding**: The system handles spaces in paths (`%20`)
- **Anchors**: Links with `#anchors` are preserved
- **External links**: HTTP(S) URLs are skipped
- **Case sensitivity**: Exact file name matching required

### Troubleshooting

**Common Issues**:

1. **Path not found**: Check if the target file exists
2. **Wrong relative path**: Verify the path from the source file
3. **Case mismatch**: Ensure exact filename casing
4. **Missing mapping**: Add entry to `link-map.json`

**Debug Steps**:
```bash
# Run link checker
node scripts/check-links.js

# Check if file exists
ls -la docs/path/to/file.md

# Add mapping if needed
# Edit link-map.json
```

## Statistics

**Initial State**: 104+ broken links across 110+ markdown files
**Final State**: 0 broken links, 200+ links automatically fixed
**Coverage**: All documentation directories and root-level files

## Benefits

1. **Reliability**: Documentation navigation always works
2. **Maintenance**: Automatic fixing reduces manual work
3. **Quality**: Prevents broken links in commits/PRs
4. **Developer Experience**: Clear error messages and automated fixes
5. **CI Integration**: Catches issues before merge

## Future Enhancements

- **External link validation**: Check HTTP(S) URLs for 404s
- **Image link validation**: Validate `![](image.png)` references
- **Anchor validation**: Check that `#anchors` exist in target files
- **Performance optimization**: Cache file system checks
- **IDE integration**: Real-time link validation in editors

---

**Last Updated**: 2024-06-21
**Maintainer**: Stack Composer Team
**Status**: Active and fully operational
