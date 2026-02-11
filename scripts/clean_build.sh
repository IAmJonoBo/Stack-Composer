#!/bin/bash

# Clean up any existing resource fork files
find . -name "._*" -type f -delete 2>/dev/null
dot_clean . 2>/dev/null

# Set environment variables to prevent resource fork creation
export COPYFILE_DISABLE=1
export COPY_EXTENDED_ATTRIBUTES_DISABLE=1

# Start a background process to continuously clean up resource fork files
(
    while true; do
        sleep 1
        find ./target -name "._*" -type f -delete 2>/dev/null
    done
) &
CLEANUP_PID=$!

# Run the build
cargo check --workspace

# Kill the cleanup process
kill $CLEANUP_PID 2>/dev/null

echo "Build completed"
