# Components

## 1. Card Layout
The signature visual style.
*   **Classes**: `.workspace-leaf`, `.workspace-tab-header-container`.
*   **Logic**: Creates "islands" of content against a primary background.

## 2. Safari Tabs
*   **Selector**: `.tab-header`.
*   **Features**: Active tab highlighting with accent color, smooth animations.

## 3. Infobox Callouts
*   **Selector**: `.callout[data-callout="infobox"]`.
*   **Pattern**: Floating cards within the note, usually right-aligned on desktop.

## 4. Tabbed Callouts
*   **Logic**: Uses a specific Markdown structure within callouts to simulate tabs.
*   **Selector**: `.callout.tabbed-callout`.

## 5. Hover Properties
*   **Logic**: Hides `.metadata-container` until the area is hovered.
*   **Implementation**: Section 6/9 of `theme.css`.

## 6. Hider
*   **Logic**: Hides UI clutter (Ribbon, Status Bar) until hover.
*   **Implementation**: Integrated community snippet logic in Section 9.

## 7. Frosted Glass (Experimental)
*   **Selector**: `.frosted-glass`, `.ice-glass`, `.frozen-glass`.
*   **Implementation**: Uses `backdrop-filter: blur()` heavily. Performance-intensive.
