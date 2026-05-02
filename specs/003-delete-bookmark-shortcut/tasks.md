# Tasks: Delete Bookmark via Keyboard Shortcut

**Input**: Design documents from `/specs/003-delete-bookmark-shortcut/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are explicitly mentioned in the implementation plan ("Unit tests for core deletion and UI tests for the 'Delete' key event are planned").

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize feature documentation in `specs/003-delete-bookmark-shortcut/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Implement `deleteBookmark(alias: string)` core logic in `src/core/bookmarks.ts`
- [X] T003 [P] Add unit tests for `deleteBookmark` in `tests/unit/bookmarks.test.ts`
- [X] T004 Ensure `config.set` correctly persists changes in `src/storage/config.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Quick Deletion via Delete Key (Priority: P1) 🎯 MVP

**Goal**: Allow deleting a bookmark using the 'Delete' key with a mandatory confirmation prompt.

**Independent Test**: Open the interactive list, highlight an item, press the 'Delete' key, see the confirmation prompt, press 'y', and verify the item is removed from the list and storage.

### Tests for User Story 1

- [X] T005 [P] [US1] Create UI test for 'Delete' key event in `tests/ui/ListView.test.tsx`
- [X] T006 [P] [US1] Create UI test for confirmation/cancellation flow in `tests/ui/ListView.test.tsx`

### Implementation for User Story 1

- [X] T007 [US1] Update `ListView` state to track the currently focused item using `onHighlight` in `src/ui/views/ListView.tsx`
- [X] T008 [US1] Implement 'Delete' key detection using `useInput` in `src/ui/views/ListView.tsx`
- [X] T009 [US1] Implement `isConfirming` state and conditional rendering for the "[y/n]" prompt in `src/ui/views/ListView.tsx`
- [X] T010 [US1] Implement confirmation logic ('y' or 'Enter') to call `deleteBookmark` in `src/ui/views/ListView.tsx`
- [X] T011 [US1] Implement cancellation logic ('n' or 'Esc') to close the prompt in `src/ui/views/ListView.tsx`
- [X] T012 [US1] Update the internal `entries` state in `ListView` to reflect deletion without reload in `src/ui/views/ListView.tsx`
- [X] T013 [US1] Ensure 'Backspace' key does NOT trigger deletion in `src/ui/views/ListView.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Deletion Feedback (Priority: P2)

**Goal**: Provide visual feedback (success/error messages) to the user after a deletion attempt.

**Independent Test**: Delete a bookmark and verify that a status message "Bookmark [alias] deleted" appears in the UI (stderr).

### Tests for User Story 2

- [ ] T014 [P] [US2] Create integration test for deletion feedback messages in `tests/integration/deletion.test.ts`

### Implementation for User Story 2

- [X] T015 [US2] Add status message "Bookmark [alias] deleted" after successful deletion in `src/ui/views/ListView.tsx`
- [X] T016 [US2] Add error message "Failed to delete bookmark: [reason]" if `deleteBookmark` fails in `src/ui/views/ListView.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and handling edge cases.

- [X] T017 [P] Update `quickstart.md` with final interaction details and key mappings
- [X] T018 [US1] Handle empty list edge case: ignore 'Delete' key if no items exist in `src/ui/views/ListView.tsx`
- [X] T019 [US1] Handle deletion of the last item: update focus to the new last item or top of list in `src/ui/views/ListView.tsx`
- [X] T020 [P] Run `quickstart.md` validation to ensure all steps are accurate
- [X] T021 [P] Ensure all UI output (prompts, status) is sent to `stderr` per CLI contract in `src/ui/views/ListView.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001 - BLOCKS all user story implementation.
- **User Stories (Phase 3-4)**: Depend on Phase 2 completion.
- **Polish (Phase 5)**: Depends on Phase 3 completion.

### Parallel Opportunities

- T003 (Unit tests) can run in parallel with T002 (Core logic).
- T005, T006 (UI tests) can be written in parallel before/during US1 implementation.
- T014 (Integration test) can be written in parallel before US2 implementation.
- T017, T020, T021 (Documentation/Cleanup) can run in parallel after US1 is stable.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (Core `deleteBookmark`).
2. Complete Phase 3: User Story 1 (Basic 'Delete' + confirmation).
3. **STOP and VALIDATE**: Verify deletion works correctly from the UI.

### Incremental Delivery

1. Foundation ready (T002-T004).
2. Keyboard shortcut + confirmation (T007-T013).
3. Visual feedback (T015-T016).
4. Edge case hardening (T018-T019).
