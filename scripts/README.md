# Script Documentation

This directory contains utility scripts for development, bundling, and synchronization.

## Workflow Scripts

### `sync-to-obsidian.sh`
Synchronizes the built `theme.css` and `manifest.json` to your local Obsidian vault.

- **Requires**: `OBSIDIAN_VAULT_PATH` environment variable set.
- **Usage**: Automatically invoked by `npm run dev` or manually via `npm run sync`.

### `bundle.js`
Bundles the modular CSS files located in `src/` into a single `theme.css` file at the project root.

- **Usage**: Automatically invoked during `npm run build`.

## Development Commands

See `package.json` for all available scripts. Key commands:

- `npm run dev`: Watches `src/` files and triggers a full build and sync on change.
- `npm run build`: Runs the full pipeline (bundle, lint, check).

