# Implementation Plan: Delete Bookmark via Keyboard Shortcut

**Branch**: `003-delete-bookmark-shortcut` | **Date**: 2026-05-02 | **Spec**: [specs/003-delete-bookmark-shortcut/spec.md](spec.md)
**Input**: Feature specification from `/specs/003-delete-bookmark-shortcut/spec.md`

## Summary

This feature implements a keyboard shortcut to delete bookmarks directly from the interactive list view. Users can highlight an alias and press the 'Delete' key to trigger a confirmation workflow. Upon confirmation, the bookmark is removed from persistent storage and the UI is updated immediately. This follows a "Library-First" approach by adding core deletion logic to the bookmarks module and providing a reactive UI update.

## Technical Context

**Language/Version**: Node.js v18+ (ESM)  
**Primary Dependencies**: `ink`, `react`, `conf`, `ink-select-input`, `ink-text-input`  
**Storage**: JSON file via `conf` at `~/.magic/onw/config.json`  
**Testing**: `jest` with `ink-testing-library`  
**Target Platform**: POSIX Shells (Linux, macOS)
**Project Type**: CLI tool  
**Performance Goals**: UI refresh after deletion < 100ms; Config update < 50ms  
**Constraints**: UI feedback MUST be sent to stderr; Deletion MUST NOT trigger jump signals.
**Scale/Scope**: Focused update to the `ListView` component and `bookmarks` core logic.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **CLI-First**: Deletion is an extension of the existing CLI interactive mode.
- [x] **Text I/O**: Maintains the text-based protocol for jump signals and stderr feedback.
- [x] **Simplicity**: focused on a single shortcut and confirmation flow.
- [x] **Library-First**: Core logic added to `src/core/bookmarks.ts` before UI implementation.
- [x] **Test-First**: Unit tests for core deletion and UI tests for the 'Delete' key event are planned.

## Project Structure

### Documentation (this feature)

```text
specs/003-delete-bookmark-shortcut/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── cli.md           # CLI interaction contract
└── tasks.md             # Phase 2 output (generated via /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── core/
│   ├── bookmarks.ts     # Add deleteBookmark function
│   └── types.ts         # (No changes needed)
├── storage/
│   └── config.ts        # (No changes needed)
├── ui/
│   ├── views/
│   │   └── ListView.tsx # Add Delete key listener and confirmation state
│   └── components/
│       └── SearchInput.tsx # (No changes needed)
└── index.ts
```

**Structure Decision**: Single project structure maintained. Changes are concentrated in `src/core` and `src/ui/views`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       |            |                                     |
