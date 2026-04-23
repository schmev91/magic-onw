# Shell Integration Contract

The `onw` tool requires a shell function to enable directory changes in the parent process.

## Bash/Zsh Function
The user should add the following (or similar) to their `.bashrc` or `.zshrc`:

```bash
onw() {
  # Run the binary and capture stdout
  local output
  output=$(command onw "$@")
  
  # Check if the output contains a jump signal
  if [[ $output == __jump__:* ]]; then
    local target="${output#__jump__:}"
    cd "$target" || return 1
  else
    # Otherwise, just print the output
    echo "$output"
  fi
}
```

## Binary Responsibility
- The `onw` binary MUST detect if its stdout is being captured or if it's in a TTY.
- If a jump is triggered (via alias arg or interactive selection), it MUST print the `__jump__:` prefix followed by the absolute path.
- All other UI elements (React Ink) MUST be rendered to **stderr** to ensure they don't interfere with the captured stdout signal.
