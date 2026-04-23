import fs from 'node:fs';
import path from 'node:path';

export function validatePath(inputPath: string): { isValid: boolean; absolutePath: string; error?: string } {
  const absolutePath = path.resolve(inputPath);
  
  if (!fs.existsSync(absolutePath)) {
    return { isValid: false, absolutePath, error: `Path does not exist: ${absolutePath}` };
  }
  
  const stats = fs.statSync(absolutePath);
  if (!stats.isDirectory()) {
    return { isValid: false, absolutePath, error: `Path is not a directory: ${absolutePath}` };
  }
  
  return { isValid: true, absolutePath };
}
