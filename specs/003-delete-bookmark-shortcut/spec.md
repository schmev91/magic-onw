# Feature Specification: Delete Bookmark via Keyboard Shortcut

**Feature Branch**: `003-delete-bookmark-shortcut`  
**Created**: 2026-05-02  
**Status**: Draft  
**Input**: User description: "when open the list, I want to be able to delete bookmark by using \"delete\" key on my keyboard to delete the currently selected alias"

## Clarifications

### Session 2026-05-02
- Q: Should deletion be immediate or require a 'Y/N' confirmation? → A: Confirmation Prompt (Option B)
- Q: Support multi-item deletion or single item only? → A: Single Item Only (Option A)
- Q: Should 'Backspace' also trigger deletion? → A: Strict 'Delete' Key Only (Option B)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quick Deletion via Delete Key (Priority: P1)

As a user, I want to quickly remove a bookmark from the list using my keyboard so that I can manage my shortcuts efficiently without moving my hands to the mouse or navigating complex menus.

**Why this priority**: This is the core functionality requested. It directly addresses the user's need for efficiency in the CLI/TUI environment.

**Independent Test**: Open the bookmark list, select an item using arrow keys, and press the 'Delete' key. A confirmation prompt should appear. Confirming should remove the item.

**Acceptance Scenarios**:

1. **Given** the bookmark list is open and an item is selected, **When** the user presses the 'Delete' key, **Then** a confirmation prompt (e.g., "[y/n]") is displayed.
2. **Given** a confirmation prompt is shown, **When** the user confirms with 'y' or 'Enter', **Then** the selected bookmark is removed from the list.
3. **Given** a confirmation prompt is shown, **When** the user cancels with 'n' or 'Esc', **Then** the bookmark is NOT removed and the prompt is closed.
4. **Given** a bookmark has been deleted, **When** the list is updated, **Then** the selection focus moves to the next item in the list (or the previous if the last item was deleted).

---

### User Story 2 - Deletion Feedback (Priority: P2)

As a user, I want to receive confirmation that the deletion was successful so that I am certain the action was performed correctly.

**Why this priority**: Provides essential feedback to the user, preventing confusion about whether the keypress was registered.

**Independent Test**: Perform a deletion and verify that a status message or visual indicator appears confirming "Bookmark [name] deleted".

**Acceptance Scenarios**:

1. **Given** a user deletes a bookmark, **When** the action is complete, **Then** a confirmation message is displayed in the UI.

---

### Edge Cases

- **Empty List**: What happens when the user presses 'Delete' on an empty list? (System should ignore the keypress or show a "No items to delete" message).
- **Rapid Press**: How does the system handle multiple rapid 'Delete' keypresses? (System should process them sequentially or debouncing if necessary).
- **Storage Failure**: How does the system handle a failure to update the configuration file? (System should show an error message and retain the item in the list).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST listen for the 'Delete' keyboard event when the list view is focused.
- **FR-002**: System MUST identify the single alias associated with the currently focused list item for deletion.
- **FR-003**: System MUST remove the identified alias from the persistent storage (config file).
- **FR-004**: System MUST update the UI state to remove the item from the list without requiring a full application restart.
- **FR-005**: System MUST handle the case where the deleted item was the last item in the list by updating the selection index.
- **FR-006**: System MUST prompt for confirmation (e.g., "Are you sure you want to delete alias [name]? [y/n]") before proceeding with deletion.
- **FR-007**: System MUST NOT trigger the deletion workflow when 'Backspace' is pressed.

### Key Entities *(include if feature involves data)*

- **Bookmark/Alias**: Represents the saved shortcut, including the alias name and the target path/command.
- **List Selection**: The current state of the UI indicating which bookmark is active or highlighted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can trigger deletion with 'Delete' and finalize it via confirmation in under 3 seconds total.
- **SC-002**: The UI reflects the deletion in under 100ms after confirmation.
- **SC-003**: The deleted bookmark is no longer present in the configuration file immediately after the action.
- **SC-004**: 100% of deletion attempts result in either a success confirmation or a clear error message.

## Assumptions

- The 'Delete' key refers to the standard keyboard key labeled 'Delete' (keycode 46/Delete).
- The user is already familiar with navigating the list using arrow keys or similar.
- The application has write permissions to its configuration file.
- "Delete" does not refer to "Backspace" and the 'Backspace' key is explicitly excluded from this workflow.
