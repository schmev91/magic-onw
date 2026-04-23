# onw (on-my-way) 🚀

`onw` is a terminal-based directory bookmarking and jumping tool designed to make navigating your filesystem effortless. Instead of typing long paths or multiple `cd ..` commands, you can assign short, memorable aliases to your favorite directories and jump to them instantly.

## ✨ Features

- 📍 **Instant Bookmarking**: Save your current directory with a custom alias or let `onw` generate a fun, food-themed one for you.
- 🎨 **Interactive UI**: A beautiful, searchable terminal interface built with **React Ink** for managing and selecting bookmarks.
- 🔍 **Search as you type**: Quickly find the path you need among hundreds of bookmarks.
- 🕒 **Recency Sorting**: Jump back to your most recently used folders with the `-r` flag.
- 🍕 **MEME-orable Aliases**: Automatically generates random food words (like `pizza`, `taco`, `sushi`) when you're too lazy to name a shortcut.

## 🛠 Setup

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd onw
npm install
npm run build
npm link
```

### 2. Shell Integration (Required)

Since a CLI process cannot change the working directory of its parent shell directly, `onw` requires a small shell function. Add the following to your `~/.zshrc` or `~/.bashrc`:

```bash
onw() {
  local output
  # Execute the binary and capture output
  output=$(command onw "$@")
  
  # Check if the output is a jump signal
  if [[ $output == __jump__:* ]]; then
    local target="${output#__jump__:}"
    cd "$target" || return 1
  else
    # Otherwise, just print the output (errors, UI, etc.)
    echo "$output"
  fi
}
```

Then, reload your shell: `source ~/.zshrc` (or `.bashrc`).

## 🚀 Usage

### Bookmark a directory
```bash
# Save current directory as 'projects'
onw projects --here

# Save a specific path with a custom alias
onw -p /var/www/html -a webserver

# Save current directory with a random food alias
onw --here
```

### Jump to a bookmark
```bash
# Jump by alias
onw projects

# Launch interactive UI to search and select
onw

# Launch UI sorted by most recently used
onw -r
```

### Commands & Flags

| Flag | Long Form | Description |
|------|-----------|-------------|
| (none) | | Launch interactive list view |
| `[alias]` | | Jump to the directory mapped to `alias` |
| `-h` | `--here` | Map the current directory to an alias |
| `-p` | `--path` | Specify the path to bookmark |
| `-a` | `--alias` | Specify the alias to use |
| `-r` | `--recent` | Sort list by recency |
| `--help` | | Display help information |

## 📦 Data Storage

Your bookmarks are stored as a JSON file at `~/.magic/onw/config.json`. You can back up this file or edit it manually if needed.

---
Built with ❤️ using [React Ink](https://github.com/vadimdemedes/ink).
