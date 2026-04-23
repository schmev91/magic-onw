export function logError(message: string): void {
  process.stderr.write(`\x1b[31mError:\x1b[0m ${message}\n`);
}

export function logSuccess(message: string): void {
  process.stderr.write(`\x1b[32mSuccess:\x1b[0m ${message}\n`);
}

export function writeJumpSignal(path: string): void {
  process.stdout.write(`__jump__:${path}`);
}
