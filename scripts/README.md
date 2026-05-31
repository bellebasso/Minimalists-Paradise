# Script Documentation

This directory contains utility scripts for development, bundling, and synchronization.

## Workflow Scripts

### `sync-to-obsidian.sh`
Synchronizes the built `theme.css` and `manifest.json` to your local Obsidian vault.

- **Requires**: `OBSIDIAN_VAULT_PATH` environment variable set.
- **Usage**: Invoked via `npm run sync`.

### `bundle.js`
Bundles the modular CSS files located in `src/` into a single `theme.css` file at the project root.

- **Usage**: Invoked via `npm run bundle` or as part of `npm run build`.

### `css-checklist.js`
Performs a check on the generated CSS to ensure it meets project standards.

- **Usage**: Invoked via `npm run css:check`.

### `merge-duplicates.js`
Processes the bundled `theme.css` to merge duplicate CSS selectors, reducing file size and improving performance.

- **Usage**: Invoked via `npm run css:merge` or as part of `npm run build`.

### `update-manifest.js`
Updates the version number in `manifest.json` to match the current project version.

- **Usage**: Invoked automatically during the `npm version` process (`npm run version`).

## Development & Release Pipeline

### Build Process
- `npm run build`: Runs the full pipeline: bundles CSS, merges duplicates, runs linting, and executes the CSS checklist.

### Development Mode
- `npm run dev`: Starts a file watcher (`chokidar`) on `src/**/*.css` and `manifest.json`. Triggers `npm run build` followed by `npm run sync` on any change.

### Linting
- `npm run lint`: Runs `stylelint` on `theme.css` to verify adherence to standards.
- `npm run lint:fix`: Runs `stylelint` with the `--fix` flag to automatically correct fixable linting errors.

### Release Management
- `npm run release`: Alias for `npm version patch`.
- `npm run release:patch`: Increments the patch version (e.g., 0.1.65 -> 0.1.66) with a custom release commit message.
- `npm run release:minor`: Increments the minor version (e.g., 0.1.65 -> 0.2.0) with a custom release commit message.
- `npm run release:major`: Increments the major version (e.g., 0.1.65 -> 1.0.0) with a custom release commit message.

*Note: The release lifecycle automatically triggers `preversion` (build) and `postversion` (reminder to push and create release on GitHub).*
