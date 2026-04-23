# Feature Specification: onw-cli-jump

**Feature Branch**: `001-onw-cli-jump`  
**Created**: 2026-04-23  
**Status**: Draft  
**Input**: User description: "I want this project to use react ink to to work in the terminal ... suggest more feature because this cli program is about making the experience of me jumping between directory more effortlessly and more convenient"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save and Alias Current Directory (Priority: P1)

As a user, I want to quickly bookmark my current working directory with a custom name so I can return to it later without typing the full path.

**Why this priority**: Core functionality that allows the user to build their jump list.

**Independent Test**: Can be tested by running a command to bookmark the current directory with an alias and verifying it is saved correctly.

**Acceptance Scenarios**:

1. **Given** I am in `/home/user/projects/secret`, **When** I run the bookmark command with alias `secret`, **Then** the path `/home/user/projects/secret` is saved with alias `secret`.
2. **Given** I am in any directory, **When** I run the bookmark command for path `/tmp/test` with alias `test-alias`, **Then** the path `/tmp/test` is saved with alias `test-alias`.

---

### User Story 2 - Jump to Directory via Alias (Priority: P1)

As a user, I want to type a short alias to immediately change my terminal's current directory to the associated path.

**Why this priority**: The primary goal of the application is to reduce keystrokes for navigation.

**Independent Test**: Can be tested by running the jump command with a valid alias and verifying the shell's working directory changes.

**Acceptance Scenarios**:

1. **Given** alias `work` points to `/var/www/html`, **When** I run the jump command for `work`, **Then** the terminal directory changes to `/var/www/html`.
2. **Given** I am using the CLI, **When** I run the jump command for a non-existent alias, **Then** I see a friendly error message and am prompted to search or create an alias.

---

### User Story 3 - Interactive Navigation and Search (Priority: P2)

As a user, I want a visual, searchable list of all my saved paths so I can jump to a location even if I've forgotten the specific alias.

**Why this priority**: Essential for discoverability and ease of use when managing many paths.

**Independent Test**: Can be tested by launching the interactive mode and verifying it allows searching and selecting items via keyboard navigation.

**Acceptance Scenarios**:

1. **Given** multiple saved paths, **When** I enter interactive mode, **Then** a list appears showing aliases and paths.
2. **Given** interactive mode is active, **When** I type a search query, **Then** the list is filtered to show only matching items.
3. **Given** interactive mode is active, **When** I press the exit key, **Then** the application closes gracefully.

---

### User Story 4 - Smart Alias Generation (Priority: P3)

As a user, I want to save a path quickly without overthinking a name, having the system generate a unique, memorable alias for me.

**Why this priority**: Enhances the "effortless" goal of the project.

**Independent Test**: Can be tested by saving a path without providing an alias and verifying a memorable word is assigned automatically.

**Acceptance Scenarios**:

1. **Given** I save a path without an alias, **When** the command completes, **Then** I am notified of the new generated alias.

---

### Edge Cases

- **Duplicate Alias**: When a user assigns an alias that already exists, the system will overwrite the existing entry with the new path without prompting.
- **Deleted Paths**: How should the system handle a saved alias whose target directory has been deleted from the filesystem?
- **Shell Compatibility**: The directory change will be propagated back to the parent shell via a shell function wrapper that the user adds to their shell configuration.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store path/alias mappings in a configurable location (default `~/.magic/onw`).
- **FR-002**: System MUST provide an interactive terminal-based user interface for navigation.
- **FR-003**: System MUST support real-time search filtering within the interactive interface.
- **FR-004**: System MUST allow deleting saved entries directly from the interactive interface.
- **FR-005**: System MUST support sorting entries by "recency" with a toggle for ascending/descending order.
- **FR-006**: System MUST automatically generate unique aliases using a theme-based word list (e.g., food) when no alias is provided.
- **FR-007**: System MUST provide comprehensive help documentation via CLI flags.
- **FR-008**: System MUST persist aliases across sessions in a machine-readable JSON format.

### Key Entities *(include if feature involves data)*

- **Alias Entry**: Represents a saved location.
    - `alias`: Unique identifier.
    - `path`: Absolute filesystem path.
    - `created_at`: Timestamp of addition.
    - `last_used`: Timestamp of last jump.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can jump to a saved directory with 4 or fewer keystrokes from the terminal.
- **SC-002**: The interactive interface initializes and responds to user input in under 150ms.
- **SC-003**: Search results are updated in under 50ms for lists up to 1000 items.
- **SC-004**: Alias generation produces a unique name 100% of the time.

## Assumptions

- **Shell Integration**: It is assumed that the environment will support a mechanism to allow the CLI tool to influence the current working directory of the shell.
- **Interactive Framework**: The system will utilize a component-based terminal UI framework to handle complex interactions.
- **Data Integrity**: It is assumed the user has read/write permissions for the configured data store location.
