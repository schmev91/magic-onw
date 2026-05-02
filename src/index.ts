#!/usr/bin/env node
/**
 * Entry point that ensures environment variables are set before any other modules are imported.
 * This is necessary because ESM imports are hoisted and executed before the rest of the code.
 */

if (process.stderr.isTTY && (process.env.FORCE_COLOR === undefined || process.env.FORCE_COLOR === '0') && process.env.NO_COLOR === undefined) {
  process.env.FORCE_COLOR = '1';
}

// Dynamically import the main logic after setting environment variables
import('./main.js').then(({ main }) => {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
});
