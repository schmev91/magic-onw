# Installing `onw` on Windows (Git Bash)

`onw` needs a bash-compatible shell, because its shell function uses `[[ ]]`. On Windows, use **Git Bash** (bundled with [Git for Windows](https://gitforwindows.org/)). PowerShell and `cmd.exe` are not supported.

> The shell function is not optional. A Node process cannot change its parent shell's directory, so `onw` only prints a `__jump__:<path>` signal. The function in `contracts/shell.sh` reads that signal and runs `cd`. Without it, `onw api` just prints the signal and you stay where you are.

## Prerequisites

| Requirement | Check (in Git Bash) |
|---|---|
| Git for Windows | `git --version` |
| Node.js LTS (includes npm) | `node --version` and `npm --version` |

Install Node from <https://nodejs.org/>, then **restart Git Bash** so `node` is on your `PATH`.

## 1. Get the code

```bash
git clone <repo-url> ~/magic-onw
cd ~/magic-onw
```

If the repo is already on disk, `cd` into `magic-onw/`.

## 2. Build and link

```bash
npm install
npm run build     # compiles TypeScript to dist/
npm link          # exposes `onw` globally
```

Run `npm run build` first. `npm link` symlinks the package but does not compile it, and `onw` runs from `dist/`. Rebuild after any change to `src/`.

Check that the command is found:

```bash
which onw
```

If it prints nothing, npm's global bin directory is not on your `PATH`. Add it:

```bash
echo 'export PATH="$PATH:$(npm prefix -g)"' >> ~/.bashrc
source ~/.bashrc
```

On Windows, `npm prefix -g` is the folder that holds the `onw` shims (usually `%AppData%\npm`).

## 3. Add the shell function

Append this to `~/.bashrc`. Use a Unix-style path (`~/...` or `/c/Users/<you>/...`), not `C:\...`:

```bash
echo 'source ~/magic-onw/contracts/shell.sh' >> ~/.bashrc
source ~/.bashrc
```

Git Bash opens login shells, which read `~/.bash_profile` rather than `~/.bashrc`. If the function is missing in new windows, make sure `~/.bash_profile` contains:

```bash
[ -f ~/.bashrc ] && source ~/.bashrc
```

## 4. Verify

```bash
cd ~
onw docs --here       # bookmark the current directory as "docs"
cd /
onw docs              # should jump back to ~
type onw              # should say "onw is a function"
```

Run `onw` with no arguments to open the interactive picker.

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| `onw: command not found` | npm's global bin directory is not on `PATH`. See step 2. |
| `onw api` prints `__jump__:...` and doesn't move | The shell function isn't loaded. Check `type onw` and the `.bash_profile` note in step 3. |
| `Cannot find module .../dist/index.js` | You skipped `npm run build`, or `src/` changed since the last build. |
| `$'\r': command not found` from `shell.sh` | The file has CRLF line endings. Run `dos2unix contracts/shell.sh`, or set `git config core.autocrlf input` and re-clone. |
| Picker errors, is garbled, or ignores keys in the default terminal | mintty (Git Bash's default terminal) can have TTY and raw-mode problems with Node TUIs. Try `winpty onw`, or run Git Bash inside **Windows Terminal**. |
| Jump fails with "No such file or directory" | The bookmark may store a Windows-style path (`C:\...`) that your shell can't resolve. Re-create it from Git Bash with `onw <alias> --here`. If it persists, please open an issue. |

## Uninstall

```bash
npm unlink -g onw
```

Then remove the `source .../contracts/shell.sh` line from `~/.bashrc`.

## Status

These steps have not been tested on a native Windows machine. They were derived from the project README and `package.json`. Please report anything that doesn't match your experience.
