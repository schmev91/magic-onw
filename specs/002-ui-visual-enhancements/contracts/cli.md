# CLI Contract: onw (Enhanced UI)

The `onw` command provides the primary interface for directory management.

## Usage
`onw [alias] [options]`

## Visual Contract (Interactive Mode)
When running `onw` without a direct jump alias:
1.  **Search Bar**: Rendered at the top with a `cyan` border and prompt.
2.  **Interactive List**:
    -   Displays aliases in `green`.
    -   Displays paths in `gray` to the right of the alias.
    -   Paths are aligned in columns.
    -   Paths are truncated at the end if they exceed terminal width.
3.  **Selection**: The active item is visually highlighted (e.g., `bold` text or distinct color).

## Output Protocol
- **Interactive Mode**: Renders UI to **stderr**.
- **Jump Signal**: Prints `__jump__:<absolute_path>` to **stdout** upon selection.
- **Errors/Success**: Printed to **stderr**.
