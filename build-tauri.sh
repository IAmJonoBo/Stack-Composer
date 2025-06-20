#!/bin/bash

echo "Building Tauri app separately..."

# Clean up resource fork files
dot_clean . 2>/dev/null
find . -name "._*" -type f -delete 2>/dev/null

# Set environment variables
export COPYFILE_DISABLE=1
export COPY_EXTENDED_ATTRIBUTES_DISABLE=1

# Build Tauri in its own directory
cd src-tauri
cargo check

echo "Tauri build completed"
