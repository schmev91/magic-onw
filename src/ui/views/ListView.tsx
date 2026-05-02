import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { getBookmarks, updateLastUsed, deleteBookmark } from '../../core/bookmarks.js';
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
  const [focusedItem, setFocusedItem] = useState<{ label: string; value: string } | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { exit } = useApp();

  useEffect(() => {
    setEntries(getBookmarks(sortByRecency));
  }, [sortByRecency]);

  const filteredEntries = useFilter(entries, query);

  const handleSelect = (item: { label: string; value: string }) => {
    if (isConfirming) return;
    updateLastUsed(item.label);
    writeJumpSignal(item.value);
    exit();
  };

  const handleHighlight = (item: { label: string; value: string }) => {
    setFocusedItem(item);
  };

  useInput((input, key) => {
    if (isConfirming) {
      if (input.toLowerCase() === 'y' || key.return) {
        if (focusedItem) {
          try {
            deleteBookmark(focusedItem.label);
            const updatedEntries = getBookmarks(sortByRecency);
            setEntries(updatedEntries);
            setStatusMessage(`Bookmark ${focusedItem.label} deleted`);
            setTimeout(() => setStatusMessage(null), 2000);
          } catch (e) {
            setStatusMessage(`Failed to delete bookmark: ${e}`);
            setTimeout(() => setStatusMessage(null), 3000);
          }
          setIsConfirming(false);
        }
      } else if (input.toLowerCase() === 'n' || key.escape) {
        setIsConfirming(false);
      }
      return;
    }

    if (key.escape) {
      exit();
    } else if (key.backspace) {
        // Do nothing to prevent deletion
    } else if (key.delete) {
      if (items.length > 0 && focusedItem) {
        setIsConfirming(true);
      }
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
        {statusMessage && (
          <Box borderStyle="single" borderColor="green" paddingX={1}>
            {/* Requirement: All UI feedback (prompts, status messages) MUST be sent to stderr. */}
            <Text color="green">{statusMessage}</Text>
          </Box>
        )}
        {isConfirming ? (
          <Box borderStyle="round" borderColor="yellow" padding={1}>
            <Text>Are you sure you want to delete alias <Text color="yellow">"{focusedItem?.label}"</Text>? [y/n]</Text>
          </Box>
        ) : items.length > 0 ? (
          <SelectInput 
            items={items} 
            onSelect={handleSelect}
            onHighlight={handleHighlight}
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
