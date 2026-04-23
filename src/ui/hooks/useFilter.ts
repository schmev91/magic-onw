import { useMemo } from 'react';
import { AliasEntry } from '../../core/types.js';

export function useFilter(entries: AliasEntry[], query: string) {
  return useMemo(() => {
    if (!query) return entries;
    const lowerQuery = query.toLowerCase();
    return entries.filter(e => 
      e.alias.toLowerCase().includes(lowerQuery) || 
      e.path.toLowerCase().includes(lowerQuery)
    );
  }, [entries, query]);
}
