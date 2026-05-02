# Data Model: Bookmark Deletion

## Entities

### AliasEntry (Existing)
Represents a saved directory bookmark.

| Field | Type | Description |
|-------|------|-------------|
| alias | string | Unique identifier for the jump target |
| path | string | Absolute path to the directory |
| createdAt | string (ISO) | Timestamp of creation |
| lastUsed | string (ISO) | Timestamp of last jump |

## Operations

### Delete Operation
Removes an `AliasEntry` from the system based on its `alias`.

**Constraints**:
- The operation must be atomic.
- The persistent storage (JSON config) must be updated immediately.
- The UI must reflect the change by removing the item from the current list view.

## State Transitions

1. **Initial State**: Bookmark exists in `config.json` and is visible in the UI list.
2. **Action**: User presses `Delete` -> `isConfirming` becomes `true`.
3. **Transition**: 
   - User confirms ('y'): Bookmark removed from `config.json`, UI re-renders with updated list.
   - User cancels ('n'): `isConfirming` becomes `false`, UI returns to selection state.
