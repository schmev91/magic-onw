# Implementation Plan: ui-visual-enhancements

**Branch**: `002-ui-visual-enhancements` | **Date**: 2026-04-30 | **Spec**: [specs/002-ui-visual-enhancements/spec.md](spec.md)
**Input**: Feature specification from `/specs/002-ui-visual-enhancements/spec.md`

## Summary

The `ui-visual-enhancements` feature improves the terminal interface of the `onw` tool. It adds column-aligned path display to the interactive list, implements standard ANSI colors (green, gray, cyan) for better scannability, and ensures graceful path truncation at the end based on terminal width. The technical approach involves using a custom `itemComponent` in `ink-select-input` and utilizing the `useStdout` hook for dynamic layout adjustments.

## Technical Context

**Language/Version**: Node.js v18+ (ESM)  
**Primary Dependencies**: `ink`, `react`, `meow`, `conf`, `ink-select-input`, `ink-text-input`  
**Storage**: JSON file via `conf` at `~/.magic/onw/config.json`  
**Testing**: `jest` with `ink-testing-library`  
**Target Platform**: POSIX Shells (Bash, Zsh)  
**Project Type**: CLI tool  
**Performance Goals**: UI initialization < 150ms; Search filtering < 50ms for 1000 items  
**Constraints**: UI rendering must go to stderr to avoid stdout pollution  
**Scale/Scope**: Single-purpose utility tool

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **CLI-First**: Tool is primarily a CLI interface.
- [x] **Text I/O**: Supports standard CLI arguments and interactive terminal UI.
- [x] **Simplicity**: Focused on a single task (directory jumping).
- [x] **Library-First**: Core logic separated from CLI/UI components in `src/core`.
- [x] **Test-First**: Implementation plan includes unit, integration, and e2e testing strategies.

## Project Structure

### Documentation (this feature)

```text
specs/002-ui-visual-enhancements/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (generated later)
```

### Source Code (repository root)

```text
src/
├── core/                # Business logic (alias management)
├── storage/             # JSON persistence layer
├── ui/                  # Ink/React terminal components
│   ├── components/      # Reusable UI elements (SearchInput, CustomItem)
│   └── views/           # Main interactive list view (ListView)
├── cli/                 # Command line argument parsing and dispatching
└── index.ts             # Entry point

tests/
├── unit/                # Core logic and truncation tests
├── integration/         # CLI behavior tests
└── e2e/                 # Shell integration verification
```

**Structure Decision**: Single project structure as it is a focused CLI utility.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       |            |                                     |
