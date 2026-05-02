# Research: ui-visual-enhancements

## Decisions

### 1. Custom Item Component for SelectInput
**Decision**: Use the `itemComponent` prop of `ink-select-input` to render a custom component for each list item.
**Rationale**: This allows full control over colors, layout, and content (alias + path). Standard `SelectInput` only displays a label.
**Alternatives Considered**: Building a custom list component from scratch using `useInput`. Rejected because `ink-select-input` already handles navigation logic.

### 2. Column Alignment via Flexbox
**Decision**: Use a `Box` with `flexDirection="row"` and fixed width for the alias part.
**Rationale**: Using a fixed width (e.g., 20% of terminal or a reasonable maximum) ensures the paths start at the same horizontal position.
**Alternatives Considered**: Manual padding with spaces. Rejected as flexbox is more idiomatic in Ink.

### 3. Path Truncation
**Decision**: Implement a utility function that uses `process.stdout.columns` to determine available space and truncates paths at the end if they exceed it.
**Rationale**: Required by FR-006. Truncating at the end preserves the starting context of the path.
**Alternatives Considered**: Middle truncation. Rejected per clarification (Option C).

### 4. Color Palette
**Decision**: Use `green` for aliases, `gray` for paths, and `cyan` for the search prompt.
**Rationale**: Matches clarified user preferences for standard ANSI colors.

## Implementation Details

- **Terminal Width**: Access via `useStdout()` hook in Ink or `process.stdout.columns`.
- **Custom Item Rendering**:
  ```tsx
  <SelectInput 
    items={items} 
    onSelect={handleSelect} 
    itemComponent={CustomItem}
  />
  ```
- **Truncation Logic**:
  ```ts
  function truncatePath(path: string, maxLength: number): string {
    if (path.length <= maxLength) return path;
    return path.substring(0, maxLength - 3) + '...';
  }
  ```
