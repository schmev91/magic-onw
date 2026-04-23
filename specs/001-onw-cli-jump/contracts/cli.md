# CLI Contract: onw

The `onw` command provides the primary interface for directory management.

## Usage
`onw [alias] [options]`

## Commands & Flags

| Flag | Long Form | Description | Example |
|------|-----------|-------------|---------|
| (none) | | Launch interactive list view | `onw` |
| `[alias]` | | Jump to the directory mapped to `alias` | `onw work` |
| | `--here` | Map the current directory to the provided alias | `onw projects --here` |
| `-p` | `--path` | Specify the path to bookmark | `onw -p /tmp/test -a test` |
| `-a` | `--alias` | Specify the alias to use | (see above) |
| `-r` | `--recent` | Sort list by recency (toggles ASC/DESC if in UI) | `onw -r` |
| `-h` | `--help` | Display help information | `onw -h` |
| `-v` | `--version` | Display version | `onw -v` |

## Output Protocol
- **Interactive Mode**: Renders UI to TTY (stderr recommended to keep stdout clean for jump signal).
- **Jump Signal**: Prints `__jump__:<absolute_path>` to stdout when a jump is triggered.
- **Error Messages**: Printed to stderr.
- **Success Confirmations**: Printed to stderr (e.g., "Saved alias: pizza").
