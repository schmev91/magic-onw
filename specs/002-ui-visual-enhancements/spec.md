# Feature Specification: ui-visual-enhancements

**Feature Branch**: `002-ui-visual-enhancements`  
**Created**: 2026-04-30  
**Status**: Draft  
**Input**: User description: "I want to the UI to be more colorful, and I want the list to display the actual path that binded to the alias to the right of the alias on the list"

## Clarifications

### Session 2026-04-30
- Q: Path Truncation Strategy → A: End truncation (e.g., `/home/user/code/my-project/...`)
- Q: Color Palette Strategy → A: Use standard ANSI color names (e.g., Green, Gray, Cyan)
- Q: List Item Delimiter → A: Multiple spaces (aligned columns)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Paths in Interactive List (Priority: P1)

As a user, when I open the interactive list, I want to see the full directory path associated with each alias displayed on the same line. This allows me to verify the destination before jumping, which is especially helpful for similar-sounding aliases.

**Why this priority**: Essential for reducing "jump errors" and providing context to the user.

**Independent Test**: Can be tested by launching the interactive UI and verifying that each line shows both the alias and the path.

**Acceptance Scenarios**:

1. **Given** multiple saved bookmarks, **When** I run `onw`, **Then** the list shows each entry as `<alias> <path>` (e.g., `projects /home/user/code`).
2. **Given** a long directory path, **When** I view the list, **Then** the path is displayed clearly next to the alias, potentially truncated with an ellipsis if it exceeds the available width.

---

### User Story 2 - Visual Distinction via Colors (Priority: P2)

As a user, I want the UI to use a variety of colors to separate different types of information. I want the aliases to stand out from the paths, and the headers/search bar to be clearly demarcated.

**Why this priority**: Improves scannability and "look and feel" of the application.

**Independent Test**: Can be tested by visually inspecting the UI to ensure different colors are applied to different elements.

**Acceptance Scenarios**:

1. **Given** the interactive list is open, **When** I look at the items, **Then** the alias is rendered in a bright color (e.g., Cyan or Green) and the path is rendered in a more subtle color (e.g., Gray or Dim white).
2. **Given** the interactive list is open, **When** I navigate the list, **Then** the selected item is highlighted with a distinct background or a bold indicator.

---

### Edge Cases

- **Narrow Terminals**: What happens when the terminal is too narrow to show both the alias and the path?
- **Empty Paths**: How does the system handle an alias that (somehow) has an empty path? (Shouldn't happen with current logic).
- **Non-Color Terminals**: How does the UI degrade if the terminal does not support colors?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The interactive list MUST display the alias and its associated path on the same line.
- **FR-002**: The path MUST be positioned to the right of the alias, aligned in a consistent column using spaces.
- **FR-003**: The UI MUST apply distinct standard ANSI colors to elements: aliases (e.g., `green`) and paths (e.g., `gray`/`dim`).
- **FR-004**: The search prompt and input text MUST use a distinct ANSI color (e.g., `cyan`) to stand out from the list items.
- **FR-005**: The selected item MUST be highlighted using a background color or a bold text style to provide clear focus feedback.
- **FR-006**: The path display MUST be truncated gracefully at the end with an ellipsis (`...`) if the total line width exceeds the terminal columns.

### Key Entities *(include if feature involves data)*

- **UI Theme**: A collection of color definitions and layout parameters used to render the Ink components.
- **List Item View**: The visual representation of a single `AliasEntry`, now including both the `alias` and `path` properties.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify the destination path for every alias in the list in under 500ms of visual scanning.
- **SC-002**: The UI uses at least 3 distinct color categories (Primary, Secondary/Dim, Highlight).
- **SC-003**: The UI remains fully readable and usable on both standard "Dark Mode" and "Light Mode" terminal themes.
- **SC-004**: 100% of the terminal width is utilized efficiently without causing unintended line breaks.

## Assumptions

- The terminal supports at least basic ANSI colors (8 colors).
- The `AliasEntry` data structure already contains the path (verified in `src/core/types.ts`).
- Users prefer a "modern" CLI look with subtle color distinctions rather than high-contrast neon colors.
- The UI components will handle color implementation based on terminal support.
