import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { getBookmarks, updateLastUsed } from '../../core/bookmarks.js';
import { AliasEntry } from '../../core/types.js';
import { SearchInput } from '../components/SearchInput.js';
import { CustomItem } from '../components/CustomItem.js';
import { useFilter } from '../hooks/useFilter.js';
import { writeJumpSignal } from '../../core/output.js';

interface Props {
  sortByRecency?: boolean;
}

export function ListView({ sortByRecency = false }: Props) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<AliasEntry[]>([]);
  const { exit } = useApp();
  
  useEffect(() => {
    setEntries(getBookmarks(sortByRecency));
  }, [sortByRecency]);
  
  const filteredEntries = useFilter(entries, query);
  
  const handleSelect = (item: { label: string; value: string }) => {
    updateLastUsed(item.label);
    writeJumpSignal(item.value);
    exit();
  };
  
  useInput((input, key) => {
    if (key.escape) {
      exit();
    }
  });
  
  const items = filteredEntries.map(e => ({
    label: e.alias,
    value: e.path,
    key: e.alias
  }));
  
  return (
    <Box flexDirection="column" padding={1}>
      <SearchInput value={query} onChange={setQuery} />
      
      <Box marginTop={1} flexDirection="column">
        {items.length > 0 ? (
          <SelectInput 
            items={items} 
            onSelect={handleSelect} 
            itemComponent={CustomItem}
          />
        ) : (
          <Text color="yellow">No bookmarks found matching "{query}"</Text>
        )}
      </Box>
      
      <Box marginTop={1}>
        <Text dimColor>[Enter] Jump • [Esc] Exit • [Backspace] Clear Search</Text>
      </Box>
    </Box>
  );
}
