# Known Issues

## 1. Light Mode Optimization
*   **Status**: In Progress.
*   **Description**: Some visual inconsistencies in Reading Mode (dataview tables, custom callouts) are not yet fully optimized for light mode.
*   **Constraint**: Avoid making drastic changes to light mode variables without testing against all Extended Color Schemes.

## 2. Workspace Transparency & Frosted Glass
*   **Status**: Experimental.
*   **Description**: Combining these features can lead to weird visual bugs or high CPU usage.
*   **Guidance**: Do not attempt to "fix" the blur logic without understanding its impact on low-end devices.

## 3. Stacked Tabs
*   **Status**: Known Limitation.
*   **Description**: The Card layout and Safari Tabs may behave unexpectedly when Obsidian's native "Stacked Tabs" mode is enabled.

## 4. Mobile Sidebar Spacing
*   **Status**: Accepted.
*   **Description**: Occasional overflow or spacing issues on extremely small screens due to Obsidian's core mobile layout.

## 5. Plugin Conflicts
*   **Status**: Monitoring.
*   **Description**: Themes that modify the layout heavily (like this one) may conflict with plugins that also touch the workspace (e.g., sliding panes).
