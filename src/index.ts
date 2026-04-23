#!/usr/bin/env node
import { cli } from './cli/index.js';
import { validatePath } from './core/validation.js';
import { addBookmark, findBookmark, updateLastUsed, generateRandomAlias } from './core/bookmarks.js';
import { logError, logSuccess, writeJumpSignal } from './core/output.js';
import { launchUI } from './ui/index.js';

async function main() {
  const { input, flags } = cli;
  
  // Handle bookmarking
  if (flags.here || flags.path) {
    const targetPath = flags.path || process.cwd();
    let alias = flags.alias || input[0];
    
    if (!alias) {
      alias = generateRandomAlias();
    }
    
    const validation = validatePath(targetPath);
    if (!validation.isValid) {
      logError(validation.error!);
      process.exit(1);
    }
    
    addBookmark(alias, validation.absolutePath);
    logSuccess(`Saved alias: \x1b[1m${alias}\x1b[0m -> ${validation.absolutePath}`);
    process.exit(0);
  }
  
  // Launch UI (US3)
  if (input.length === 0) {
    const { waitUntilExit } = launchUI(flags.recent);
    await waitUntilExit();
    process.exit(0);
  } else {
    // Jump to alias (US2)
    const alias = input[0];
    const bookmark = findBookmark(alias);
    
    if (!bookmark) {
      logError(`Alias not found: \x1b[1m${alias}\x1b[0m`);
      process.exit(1);
    }
    
    const validation = validatePath(bookmark.path);
    if (!validation.isValid) {
      logError(`Stored path is invalid: ${bookmark.path}. Error: ${validation.error}`);
      process.exit(1);
    }
    
    updateLastUsed(alias);
    writeJumpSignal(validation.absolutePath);
    process.exit(0);
  }
}

main();
