# Quickstart: onw-cli-jump

## Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Build the project**:
    ```bash
    npm run build
    ```
3.  **Link the binary**:
    ```bash
    npm link
    ```
4.  **Set up shell integration**:
    Add this to your `~/.zshrc` or `~/.bashrc`:
    ```bash
    onw() {
      local output
      output=$(command onw "$@")
      if [[ $output == __jump__:* ]]; then
        cd "${output#__jump__:}" || return 1
      else
        echo "$output"
      fi
    }
    ```

## Common Tasks

### Bookmark Current Directory
```bash
onw projects --here
```

### Jump to Bookmark
```bash
onw projects
```

### Open Interactive List
```bash
onw
```
Use arrow keys to navigate, type to search, and `Enter` to jump. Press `Esc` to exit.

### View Recent Bookmarks
```bash
onw -r
```

## Troubleshooting
- **`cd` doesn't work**: Ensure the shell function is correctly loaded in your current session (`source ~/.zshrc`).
- **UI looks garbled**: Ensure your terminal supports TTY and you are using a modern terminal emulator.
