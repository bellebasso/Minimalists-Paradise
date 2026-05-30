# Release Process

The project follows a standard Obsidian theme release flow.

## 1. Development
*   Run `npm run dev` to work locally.
*   This uses `sync-to-obsidian.sh` to copy `theme.css` and `manifest.json` to a specified vault.

## 2. Validation
*   Run `npm run build`.
    *   `lint`: Checks for CSS errors.
    *   `css:merge`: Combines duplicated selectors (crucial for keeping the 4000+ line file manageable).
    *   `css:check`: Verifies the "CSS Checklist" for community theme submission.

## 3. Versioning
*   Update `version` in `manifest.json`.
*   Update the version comment at the top of `theme.css`.

## 4. Release
*   Push to `main`.
*   Create a GitHub Release with the tag matching the version in `manifest.json`.
*   The release MUST contain `theme.css` and `manifest.json` as assets (or just in the repo root).

## 5. Documentation
*   If features changed, update the documentation site (Vercel deployment from separate repo or branch).
