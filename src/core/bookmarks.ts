import { config } from '../storage/config.js';
import { AliasEntry } from './types.js';
import { foodWords } from './words.js';

export function addBookmark(alias: string, path: string): AliasEntry {
  const entries = config.get('entries') as AliasEntry[];
  const now = new Date().toISOString();
  
  const newEntry: AliasEntry = {
    alias,
    path,
    createdAt: now,
    lastUsed: now
  };
  
  const existingIndex = entries.findIndex(e => e.alias === alias);
  if (existingIndex !== -1) {
    entries[existingIndex] = newEntry;
  } else {
    entries.push(newEntry);
  }
  
  config.set('entries', entries);
  return newEntry;
}

export function generateRandomAlias(): string {
  const entries = getBookmarks();
  const getRandomWord = () => foodWords[Math.floor(Math.random() * foodWords.length)];
  
  let alias = getRandomWord();
  let attempts = 0;
  
  while (entries.some(e => e.alias === alias) && attempts < 100) {
    alias = `${getRandomWord()}${Math.floor(Math.random() * 1000)}`;
    attempts++;
  }
  
  return alias;
}

export function getBookmarks(sortByRecency = false): AliasEntry[] {
  const entries = config.get('entries') as AliasEntry[];
  if (sortByRecency) {
    return [...entries].sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime());
  }
  return entries;
}

export function findBookmark(alias: string): AliasEntry | undefined {
  const entries = getBookmarks();
  return entries.find(e => e.alias === alias);
}

export function updateLastUsed(alias: string): void {
  const entries = getBookmarks();
  const index = entries.findIndex(e => e.alias === alias);
  if (index !== -1) {
    entries[index].lastUsed = new Date().toISOString();
    config.set('entries', entries);
  }
}
