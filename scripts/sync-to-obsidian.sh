#!/bin/bash

# Ensure we are in the project root
cd "$(dirname "$0")/.."

# DEST is set via OBSIDIAN_VAULT_PATH env var
if [ -z "$OBSIDIAN_VAULT_PATH" ]; then
  echo "Error: OBSIDIAN_VAULT_PATH is not set. Use 'npm run dev' or set it in your environment."
  exit 1
fi

DEST="${OBSIDIAN_VAULT_PATH}/.obsidian/themes/Minimalists Paradise"

echo "Syncing to $DEST..."

mkdir -p "$DEST"

rsync -av \
  "theme.css" \
  "manifest.json" \
  "$DEST/"

