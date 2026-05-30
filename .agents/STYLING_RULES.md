# Styling Rules

## Variable Naming
*   **Prefix**: Use `mp-` for internal classes or variables not exposed to Style Settings.
*   **Style Settings Variables**: Usually mirror the `id` in the `@settings` block.
*   **Obsidian Variables**: Always prefer `--nav-item-color` over hardcoded hex values.

## Selector Specificity
*   Avoid using IDs for styling.
*   Keep specificity low to allow snippets to override theme defaults easily.
*   Use `.theme-light` and `.theme-dark` to scope theme-specific overrides.

## Colors
*   **Color Accent Override**: A core feature. Ensure that color accent logic is always gated behind the custom color accent toggles defined in settings.
*   **Transparency**: Use the `--translucency-mix` variable when creating translucent overlays to maintain consistency with the experimental workspace transparency feature.

## Layout
*   **The Card Effect**: Achieved by applying backgrounds to `.workspace-leaf-content` and margins/padding to `.workspace-split`.
*   **Gaps**: Always use the `--cards-gap` variable for spacing between UI cards.

## Components
*   **Callouts**: When adding new callout types, follow the `[data-callout="name"]` selector pattern.
*   **Transitions**: Use `transition: all 0.2s ease-in-out` for hover effects to match the theme's "smooth" feel.

## Prohibited Patterns
*   `!important`: Use only as a last resort. If needed, add a comment explaining why.
*   **Hardcoded Colors**: Do not use hex codes outside of the `@settings` default values or color scheme definitions.
*   **Absolute Positioning**: Avoid for main layout elements; prefer Flexbox or Grid.
