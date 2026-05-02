# CLI Contract: Bookmark Deletion Shortcut

This contract defines the keyboard interaction for deleting bookmarks within the interactive list view of `onw`.

## Interactive UI Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `Up` / `Down` | Navigate list | Selection focused |
| `Delete` | Trigger deletion workflow | Selection focused |
| `y` / `Enter` | Confirm deletion | Confirmation prompt active |
| `n` / `Esc` | Cancel deletion | Confirmation prompt active |
| `Esc` | Exit application | Any |

## Deletion Feedback Protocol

### Success
1. Item is removed from the visible list.
2. A temporary status message is displayed: `Bookmark [alias] deleted`.

### Failure
1. If storage fails, an error message is displayed: `Failed to delete bookmark: [reason]`.
2. The item remains in the list.

### Signal Integrity
- The deletion workflow MUST NOT emit any `__jump__` signals to stdout.
- All UI feedback (prompts, status messages) MUST be sent to stderr.
