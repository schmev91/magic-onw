export interface AliasEntry {
  alias: string;
  path: string;
  createdAt: string;
  lastUsed: string;
}

export interface Config {
  entries: AliasEntry[];
  sortOrder: 'asc' | 'desc';
  storagePath?: string;
}
