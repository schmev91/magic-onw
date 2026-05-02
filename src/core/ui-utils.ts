/**
 * Truncates a path at the end with an ellipsis if it exceeds maxLength.
 */
export function truncatePath(path: string, maxLength: number): string {
  if (path.length <= maxLength) {
    return path;
  }
  return path.substring(0, maxLength - 3) + '...';
}
