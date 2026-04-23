# Data Model: onw-cli-jump

## AliasEntry
Represents a single bookmarked directory.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `alias` | `string` | Unique identifier for the path | Alphanumeric, unique |
| `path` | `string` | Absolute filesystem path | Must exist at save time |
| `createdAt` | `string` | ISO 8601 timestamp | |
| `lastUsed` | `string` | ISO 8601 timestamp | |

## Config
The root configuration object stored in `~/.magic/onw/config.json`.

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `entries` | `AliasEntry[]` | List of all saved aliases | `[]` |
| `sortOrder` | `"asc" | "desc"` | User's preferred sort order for the `-r` flag | `"desc"` |
| `storagePath` | `string` | Override for the configuration directory | `~/.magic/onw` |

## State Transitions

### Bookmark Creation
1. Validate input path (exists, is directory).
2. Check for existing alias (overwrite if exists).
3. If no alias provided, generate random food word.
4. Update `entries` list and persist to disk.

### Jump Execution
1. Locate entry by alias.
2. Update `lastUsed` timestamp.
3. Persist change.
4. Output jump command to stdout for shell function evaluation.

### Interactive Selection
1. Load all entries.
2. Filter based on user search string.
3. Sort based on `sortOrder` and `lastUsed`.
4. Capture selection and trigger Jump Execution.
