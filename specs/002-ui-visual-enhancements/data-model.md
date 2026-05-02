# Data Model: ui-visual-enhancements

## UI Theme

The theme defines the colors and styles used throughout the terminal UI.

| Attribute | Type | Description | Default Value |
|-----------|------|-------------|---------------|
| `aliasColor` | String | ANSI color for aliases | `green` |
| `pathColor` | String | ANSI color for paths | `gray` |
| `searchPromptColor` | String | ANSI color for search prompt | `cyan` |
| `highlightColor` | String | Color/Style for selected item | `bold` / `blue` |

## List Item View Structure

Represents the visual layout of a single row in the interactive list.

| Component | Logic | Layout |
|-----------|-------|--------|
| **Alias** | Rendered in `aliasColor` | Fixed width (e.g., 20 characters) or flexible with minimum |
| **Separator** | 2 spaces (aligned columns) | Margin between Alias and Path |
| **Path** | Rendered in `pathColor`, truncated at end | Flexible width, fills remaining space |

## State Transitions

- **UI Initialization**: Load all bookmarks into local state.
- **Search/Filter**: Update filtered list based on query.
- **Selection**: Highlight the active item and display its path.
- **Jump**: Exit UI and return the jump signal.
