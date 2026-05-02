# Research: Bookmark Deletion via Keyboard

## Decisions

### 1. Key Event Detection
**Decision**: Use Ink's `useInput` hook to listen for `key.delete` in the `ListView` component.
**Rationale**: `useInput` provides a consistent way to handle keyboard events in Ink. `key.delete` specifically identifies the standard Delete key.
**Alternatives Considered**: Handling events within a custom `SearchInput` or `SelectInput` wrapper. Rejected because deletion is a view-level action that affects the global list state.

### 2. Tracking Selection
**Decision**: Use the `onHighlight` prop of `ink-select-input` to maintain the currently focused item in the `ListView` state.
**Rationale**: `ink-select-input` manages its own internal navigation. To know which item to delete, the parent component needs to be notified of selection changes.
**Alternatives Considered**: Managing the selection index manually in the parent. Rejected as it would duplicate logic already present in `ink-select-input`.

### 3. Confirmation Workflow
**Decision**: Implement a modal-like overlay using conditional rendering in React. When `isConfirming` is true, the `ListView` will render a confirmation message and use a dedicated `useInput` hook (or branch the existing one) to handle 'y'/'n' responses.
**Rationale**: Ensures user intent is verified before destructive actions, as requested in the specification.
**Alternatives Considered**: Immediate deletion. Rejected per spec clarification.

### 4. Storage Integration
**Decision**: Add a `deleteBookmark(alias: string)` function to `src/core/bookmarks.ts`.
**Rationale**: Maintains the "Library-First" principle by keeping data manipulation logic in the core module.
**Alternatives Considered**: Direct config manipulation in the UI component. Rejected to maintain separation of concerns.

## Technical Details

- **Delete Key Code**: Ink's `key.delete` property.
- **Confirmation Keys**: 'y'/'Y' and 'n'/'N'. Also supporting 'Enter' for 'y' and 'Esc' for 'n' for better UX.
- **UI State**: `isConfirming`, `highlightedItem`, and `entries` (existing).
