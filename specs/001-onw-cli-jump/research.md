# Research: onw-cli-jump

## Decision Log

### Shell Integration Method
- **Decision**: Use a shell function wrapper that evaluates the output of the `onw` binary.
- **Rationale**: A child process cannot change the working directory of its parent. By having the binary output a specific command (like `cd /target/path`) when a jump is requested, the shell function can `eval` or execute that command.
- **Alternatives considered**: 
    - Writing to a temporary file: More complex to manage cleanup and race conditions.
    - Using an environment variable: Limited persistence and scope.

### Interactive UI Framework
- **Decision**: React Ink with `ink-select-input` and `ink-text-input`.
- **Rationale**: React Ink provides a declarative way to build terminal UIs. `ink-select-input` is ideal for the searchable list, and `ink-text-input` handles the filtering.
- **Alternatives considered**: 
    - `blessed`: More powerful but significantly higher complexity and steeper learning curve.
    - `enquirer`: Great for simple prompts but less flexible for custom interactive layouts.

### Configuration Management
- **Decision**: Use the `conf` library for Node.js.
- **Rationale**: `conf` handles cross-platform path resolution (though we target POSIX, it's good practice) and provides a simple API for JSON storage.
- **Data Path**: `~/.magic/onw/config.json`.

### Alias Generation
- **Decision**: Static array of 100+ food-related nouns.
- **Rationale**: Simple, zero-dependency, and fulfills the "fun" requirement.
- **Conflict Resolution**: If a word is taken, append a random 3-digit number.

## Technical Clarifications Resolved

### Node.js Version
- **Finding**: Node.js 18 (LTS) or higher is recommended for full compatibility with modern ESM-based packages like `ink` and `meow`.

### Shell Support
- **Finding**: Primary support will be for Bash and Zsh. Fish support is possible via a separate function file but is not the initial priority unless requested. Windows (PowerShell/CMD) is explicitly out of scope for the MVP due to the POSIX-centric nature of `cd` jumping via shell functions.

## Best Practices

### Ink Testing
- Use `ink-testing-library` to mock stdin/stdout and verify UI state transitions without a real terminal.

### Performance
- Lazy-load heavy dependencies if needed to keep startup time < 150ms.
- Ensure the JSON configuration is small enough to be read and parsed nearly instantaneously.
