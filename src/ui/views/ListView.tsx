import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { getBookmarks, updateLastUsed, deleteBookmark } from '../../core/bookmarks.js';
import { AliasEntry } from '../../core/types.js';
import { deleteCharBefore, deleteWordBefore, printableInput } from '../../core/text-edit.js';
import { SearchInput } from '../components/SearchInput.js';
import { CustomItem } from '../components/CustomItem.js';
import { useFilter } from '../hooks/useFilter.js';
import { writeJumpSignal } from '../../core/output.js';

interface Props {
  sortByRecency?: boolean;
  /** Rows visible at once before the list scrolls. */
  pageSize?: number;
}

/**
 * The picker owns ALL key handling.
 *
 * Both input components it used to mount conflict with a search-as-you-type
 * list: ink-text-input consumes every keystroke (so action keys and the search
 * box fought over the same press), and ink-select-input treats bare j/k as
 * navigation (so typing "jelly" jumped the selection instead of filtering).
 * There is exactly one useInput now and each key has one meaning.
 */
export function ListView({ sortByRecency = false, pageSize = 10 }: Props) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<AliasEntry[]>([]);
  const [selected, setSelected] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { exit } = useApp();

  useEffect(() => {
    setEntries(getBookmarks(sortByRecency));
  }, [sortByRecency]);

  const filtered = useFilter(entries, query);
  // Clamp rather than reset: filtering and deleting both shrink the list under
  // a selection that may now point past the end.
  const index = Math.min(selected, Math.max(filtered.length - 1, 0));
  const current = filtered[index] ?? null;

  const flash = (message: string, ms = 2000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(null), ms);
  };

  /**
   * All query edits go through a functional update.
   *
   * Several keystrokes can arrive before React re-renders — a fast typist, or
   * a paste delivered as separate chunks — and a handler that read `query`
   * from its closure would compute every one of them from the same stale
   * value, dropping all but the last. Typing "jel" landed as "jl".
   */
  const search = (edit: (previous: string) => string) => {
    setQuery(edit);
    setSelected(0);
  };

  useInput((input, key) => {
    if (isConfirming) {
      if (input.toLowerCase() === 'y' || key.return) {
        if (current) {
          try {
            deleteBookmark(current.alias);
            setEntries(getBookmarks(sortByRecency));
            flash(`Bookmark ${current.alias} deleted`);
          } catch (e) {
            flash(`Failed to delete bookmark: ${e}`, 3000);
          }
        }
        setIsConfirming(false);
      } else if (input.toLowerCase() === 'n' || key.escape) {
        setIsConfirming(false);
      }
      return;
    }

    if (key.escape) {
      exit();
      return;
    }

    if (key.return) {
      if (current) {
        updateLastUsed(current.alias);
        writeJumpSignal(current.path);
        exit();
      }
      return;
    }

    // Functional for the same reason as `search`: held arrow keys repeat faster
    // than React re-renders, and `index` from the closure would be stale.
    const last = Math.max(filtered.length - 1, 0);

    if (key.upArrow) {
      setSelected((previous) => Math.max(Math.min(previous, last) - 1, 0));
      return;
    }

    if (key.downArrow) {
      setSelected((previous) => Math.min(Math.min(previous, last) + 1, last));
      return;
    }

    if (key.ctrl) {
      switch (input) {
        case 'u':
          search(() => '');
          return;
        case 'w':
          search(deleteWordBefore);
          return;
        case 'x':
          if (current) setIsConfirming(true);
          return;
        default:
          // Any other Ctrl combo is ignored rather than typed into the query.
          return;
      }
    }

    // Alt+Backspace deletes a word. Terminals encode Backspace as either \x7f
    // or \x08, which ink surfaces as `delete` and `backspace` respectively —
    // both must be handled or the binding works on some terminals only.
    if (key.meta && (key.backspace || key.delete)) {
      search(deleteWordBefore);
      return;
    }

    // Ink cannot distinguish Backspace from Delete: most terminals send \x7f
    // for Backspace, which parses to the same `delete` as the real Delete key.
    // So both edit the query, and removing a bookmark is Ctrl+X.
    if (key.backspace || key.delete) {
      search(deleteCharBefore);
      return;
    }

    const text = printableInput(input, key);
    if (text) search((previous) => previous + text);
  });

  // Scroll window that keeps the selection visible.
  const start = Math.max(0, Math.min(index - Math.floor(pageSize / 2), filtered.length - pageSize));
  const visible = filtered.slice(start, start + pageSize);
  const hiddenBelow = filtered.length - start - visible.length;

  return (
    <Box flexDirection="column" padding={1}>
      <SearchInput value={query} />

      <Box marginTop={1} flexDirection="column">
        {statusMessage && (
          <Box borderStyle="single" borderColor="green" paddingX={1}>
            {/* All UI feedback renders to stderr; stdout carries only the jump signal. */}
            <Text color="green">{statusMessage}</Text>
          </Box>
        )}

        {isConfirming && current ? (
          <Box borderStyle="round" borderColor="yellow" padding={1}>
            <Text>
              Are you sure you want to delete alias <Text color="yellow">"{current.alias}"</Text>? [y/n]
            </Text>
          </Box>
        ) : entries.length === 0 ? (
          <Text color="yellow">No bookmarks saved yet. Save one with: onw &lt;alias&gt; --here</Text>
        ) : filtered.length === 0 ? (
          <Text color="yellow">No bookmarks found matching "{query}"</Text>
        ) : (
          <Box flexDirection="column">
            {start > 0 && <Text dimColor>  ↑ {start} more</Text>}
            {visible.map((entry, offset) => {
              const isSelected = start + offset === index;
              return (
                <Box key={entry.alias} flexDirection="row">
                  <Text color={isSelected ? undefined : 'gray'}>{isSelected ? '❯ ' : '  '}</Text>
                  <CustomItem label={entry.alias} value={entry.path} isSelected={isSelected} />
                </Box>
              );
            })}
            {hiddenBelow > 0 && <Text dimColor>  ↓ {hiddenBelow} more</Text>}
          </Box>
        )}
      </Box>

      <Box marginTop={1}>
        <Text dimColor>
          [Enter] Jump • [^X] Delete • [^W] Delete word • [^U] Clear • [Esc] Exit
        </Text>
      </Box>
    </Box>
  );
}
