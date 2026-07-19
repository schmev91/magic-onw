<h1 align="center">🚀 onw</h1>

<p align="center">
  <b>on-my-way.</b><br>
  Bookmark a directory once. Jump to it from anywhere, forever.
</p>

<p align="center">
  <img alt="node" src="https://img.shields.io/badge/node-%E2%89%A518-3c873a">
  <img alt="typescript" src="https://img.shields.io/badge/TypeScript-ESM-3178c6">
  <img alt="shell" src="https://img.shields.io/badge/shell-bash%20%7C%20zsh-4eaa25">
</p>

---

You know the directory. It's six levels down, the path has a hash in it, and `cd ../../../` is not getting you there.

```bash
cd ~/work/services/api/src/handlers/v2   # once
onw api --here                           # name it
onw api                                  # 🎉 forever
```

That's it. That's the tool.

### 🔥 What makes it good

| | |
|---|---|
| 📍 **Bookmark where you stand** | `onw <name> --here` names your current directory. No path typing. |
| 🍕 **Or don't name it at all** | Bare `onw --here` picks a free food word — `pizza`, `taco`, `sushi`. Name it later by re-saving. |
| 🔍 **Searchable picker** | Just type `onw`. Filtering matches the alias *and* the full path, so you can find it by either. |
| 🕒 **Recency sorting** | `onw -r` puts the folders you actually live in at the top. |
| 🪄 **It changes your real shell** | The jump lands in *your* session, not a dead subprocess. This is the whole trick. |
| ⌨️ **Readline editing in the search** | `Alt+Backspace` and `^W` eat a word, `^U` clears the line. |
| 🗑️ **Delete from the picker** | `^X` on a stale bookmark, confirm, gone. |

```
$ onw
 ╭──────────────────────────────────────────────────────────╮
 │ Search: Type to filter...                                │
 ╰──────────────────────────────────────────────────────────╯

 ❯ api                      ~/work/services/api/src/handlers/v2
   dots                     ~/.config/nvim
   notes                    ~/Documents/notes
   pizza                    ~/scratch/2026-07-throwaway

 [Enter] Jump • [^X] Delete • [^W] Delete word • [^U] Clear • [Esc] Exit
```

**Type to filter — that's the only thing plain letters do.** Every action is a Ctrl combo, so `j` and `k` reach the search box instead of hijacking the selection:

| Key | Action |
|---|---|
| type / `Backspace` | edit the search |
| `Alt+Backspace`, `Ctrl+W` | delete the previous word |
| `Ctrl+U` | clear the search |
| `↑` `↓` | move the selection |
| `Enter` | jump to the highlighted directory |
| `Ctrl+X` | delete the bookmark, with a `y`/`n` confirmation |
| `Esc` | quit without jumping |

Deleting a bookmark is `Ctrl+X` rather than `Del` because Ink cannot tell Backspace from Delete — most terminals send `\x7f` for Backspace, which arrives identically to the real Delete key. Binding removal to it made Backspace destructive, so editing the query wins that key.

## 📦 Install

```bash
npm install
npm run build
npm link          # puts `onw` on your PATH
```

Then add the shell function to your `~/.bashrc` or `~/.zshrc`:

```bash
source /path/to/magic-onw/contracts/shell.sh
```

Reload your shell (`source ~/.bashrc`) and you're done.

**The shell function is required.** A Node process cannot change its parent shell's working directory — a `cd` inside the binary would move a subprocess that then exits. So `onw` prints a jump signal and the shell function does the `cd` in your interactive shell. Without the function, `onw api` just prints `__jump__:/some/path` and you stay where you are.

The function uses `[[ ]]`, so it needs **bash or zsh**. It won't work in `dash`/`ash`.

## 🚀 Usage

### Bookmark a directory

```bash
onw api --here                      # name the current directory "api"
onw --here                          # current directory, random food alias
onw -p /var/www/html -a webserver   # bookmark a path you're not standing in
onw -p /var/www/html                # ...with a random alias
```

Saving an alias that already exists **overwrites** it — that's how you rename a random food word into something you'll remember, or repoint a bookmark after moving a project.

The path must exist and must be a directory; anything else is an error and nothing is saved.

### Jump

```bash
onw api     # jump by alias
onw         # open the picker
onw -r      # open the picker, most recently used first
```

An unknown alias is an error, not a picker — `onw` never guesses at where you meant to go. A bookmark whose directory has since been deleted or renamed also errors, and tells you the stale path so you can fix it.

### Flags

| Flag | Long form | What it does |
|---|---|---|
| *(none)* | | Open the interactive picker |
| `[alias]` | | Jump to that bookmark |
| `-h` | `--here` | Bookmark the current directory |
| `-p <path>` | `--path` | Bookmark this path instead of the current directory |
| `-a <name>` | `--alias` | The alias to save under |
| `-r` | `--recent` | Sort the picker by recency |
| | `--help` | Show help |
| | `--version` | Show version |

⚠️ **`-h` is `--here`, not help.** Use the long `--help`.

`--alias` and the first positional argument mean the same thing when saving; `onw api --here` and `onw --here -a api` are identical.

## 📦 Where bookmarks live

A single JSON file at `~/.config/onw/config.json` (or `$XDG_CONFIG_HOME/onw/config.json`), managed by [`conf`](https://github.com/sindresorhus/conf):

```json
{
  "entries": [
    {
      "alias": "api",
      "path": "/home/you/work/services/api",
      "createdAt": "2026-07-19T09:14:02.310Z",
      "lastUsed": "2026-07-19T16:40:55.008Z"
    }
  ]
}
```

Back it up, sync it, or edit it by hand — it's just JSON, and paths are stored absolute. `lastUsed` is what `-r` sorts on and is bumped on every jump.

## 🛠️ Development

```bash
npm run build
npm test
```

Features are specified with [spec-kit](https://github.com/github/spec-kit) under `specs/NNN-name/` (`spec.md`, `plan.md`, `tasks.md`, `contracts/`).

### The picker owns all key handling

`ListView` has exactly **one** `useInput` and mounts no third-party input components. That is deliberate, and worth not undoing.

`ink-text-input` runs its own `useInput` and consumes every keystroke it sees, so with a local handler mounted alongside it one Backspace was handled twice — as a word delete and a character delete — both computed from the same stale `query`. `ink-select-input` treats bare `j`/`k` as navigation, so typing `jelly` jumped the selection instead of filtering. Every key had two meanings; now each has one.

Two consequences to preserve when editing `ListView`:

- **Query and selection updates must be functional** (`setQuery(previous => …)`). Keystrokes arrive faster than React re-renders — a fast typist, a held arrow key, or a chunked paste — and reading `query` from the closure drops all but the last edit. Typing `jel` used to land as `jl`.
- **Key parsing helpers stay pure**, in `core/text-edit.ts`. `printableInput` must check modifiers explicitly rather than inspecting the string, since ink reports the bare letter for Ctrl combos.

`tests/ui/ListView.test.tsx` drives the real component through `tests/helpers/ink.tsx`, a harness backported from `magic-inw`. Use it rather than `ink-testing-library`, which is incompatible with ink 4 — its fake stdin lacks `ref`/`unref`, so the stock harness renders an error frame instead of the UI.

## 🧠 Design notes

**The trick:** a Node process cannot change its parent shell. So `onw` never `cd`s anything — it prints `__jump__:<path>` to stdout and the shell function `cd`s there.

This makes **stdout a reserved channel**. Anything else written to it gets treated as part of the signal, which is why every human-facing byte — errors, confirmations, and the entire Ink UI — goes to **stderr**:

```ts
render(<ListView/>, { stdout: process.stderr, patchConsole: false })
```

The signal carries no trailing newline and no ANSI codes, since both would end up inside the path being `cd`'d to.

The sibling project [`inw`](../magic-inw) uses the same protocol to save and run shell commands by name, via `__exec__:`.

---

Built with ❤️ and [React Ink](https://github.com/vadimdemedes/ink).
