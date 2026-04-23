# Implementation Plan: onw-cli-jump

**Branch**: `001-onw-cli-jump` | **Date**: 2026-04-23 | **Spec**: [specs/001-onw-cli-jump/spec.md](spec.md)
**Input**: Feature specification from `/specs/001-onw-cli-jump/spec.md`

## Summary

The `onw-cli-jump` feature implements a CLI tool named `onw` designed for rapid directory navigation. It allows users to bookmark directories with aliases (custom or auto-generated food-themed words) and jump to them instantly. The tool includes an interactive, searchable terminal UI for managing and selecting bookmarks, and integrates with the user's shell via a function to enable parent-shell directory changes.

## Technical Context

**Language/Version**: Node.js v18+ (ESM)  
**Primary Dependencies**: `ink`, `react`, `meow`, `conf`  
**Storage**: JSON file via `conf` at `~/.magic/onw/config.json`  
**Testing**: `jest` with `ink-testing-library`  
**Target Platform**: POSIX Shells (Bash, Zsh)  
**Project Type**: CLI tool  
**Performance Goals**: UI initialization < 150ms; Search filtering < 50ms for 1000 items  
**Constraints**: Requires shell function wrapper for `cd` integration  
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
specs/001-onw-cli-jump/
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
├── core/                # Business logic (alias management, food word list)
├── storage/             # JSON persistence layer
├── ui/                  # Ink/React terminal components
│   ├── components/      # Reusable UI elements
│   └── views/           # Main interactive list view
├── cli/                 # Command line argument parsing and dispatching
└── index.ts             # Entry point

tests/
├── unit/                # Core logic and storage tests
├── integration/         # CLI behavior tests
└── e2e/                 # Shell integration verification
```

**Structure Decision**: Single project structure (Option 1) as it is a focused CLI utility.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       |            |                                     |
