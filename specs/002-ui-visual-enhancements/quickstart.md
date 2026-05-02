# Quickstart: ui-visual-enhancements

## Previewing the New UI

1.  **Ensure you have bookmarks**:
    ```bash
    onw project1 --here
    onw -p /var/log -a logs
    ```

2.  **Launch the interactive list**:
    ```bash
    onw
    ```

3.  **Expectations**:
    -   You should see a colorful search bar in `cyan`.
    -   Each line in the list should show `alias` (green) and `path` (gray).
    -   Try resizing your terminal; long paths should be truncated with `...` at the end.
    -   Use arrow keys to navigate; the selection should be clearly highlighted.

## Key Changes
-   **Colors**: ANSI standard colors applied to UI elements.
-   **Layout**: Column-aligned display of aliases and paths.
-   **Truncation**: Graceful handling of long paths based on terminal width.
