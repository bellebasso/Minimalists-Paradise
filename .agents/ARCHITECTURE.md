# CSS Architecture

The theme follows a monolithic but highly structured approach in a single `theme.css` file to comply with Obsidian's theme distribution requirements.

## 1. @settings (Meta-programming)
The top of `theme.css` contains the Style Settings metadata. This block is critical as it generates the UI in Obsidian's settings.
*   **Variables**: Defined here are often used throughout the rest of the file.
*   **Class Toggles**: Used to enable/disable specific features (e.g., `frosted-glass-toggle`).

## 2. Global Variables & Root
Located in Section 2. This is where default values for custom properties are set, often referencing the Style Settings variables.

## 3. Themes & Color Schemes
Contains the definitions for `.theme-light` and `.theme-dark`.
*   **Extended Color Schemes**: Implemented via class overrides (e.g., `.mp-onyx`).

## 4. Layout Layer
Handles the "Card" structure. It wraps Obsidian's workspace elements in padding and background colors to create the card effect.
*   `--background-primary` often acts as the "outer" background.
*   `--color-panel` acts as the "inner" card background.

## 5. UI Elements & Components
Modular sections for specific Obsidian features:
*   **Callouts**: Custom styling for default and specific types (Infobox, Tabbed).
*   **Tables**: Styled to match the card aesthetic.

## 6. Responsive Layer (Mobile/Tablet)
Section 7 contains `@media` queries specifically for `(max-width: 768px)` and mobile devices.
*   Focuses on touch-friendly targets and adjusting card radii (`--mobile-card-radius`).

## 7. Build System
*   `scripts/merge-duplicates.js`: Automatically cleans up the CSS by combining selectors.
*   `stylelint`: Enforces standards and formatting.
