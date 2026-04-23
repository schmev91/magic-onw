import React from 'react';
import { render } from 'ink';
import { ListView } from './views/ListView.js';

export function launchUI(sortByRecency = false) {
  return render(<ListView sortByRecency={sortByRecency} />, {
    stdout: process.stderr,
    patchConsole: false
  });
}
