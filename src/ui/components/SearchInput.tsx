import React from 'react';
import { Box, Text } from 'ink';
import { theme } from '../../core/theme.js';

interface Props {
  value: string;
  placeholder?: string;
}

/**
 * Display-only search box.
 *
 * Deliberately not ink-text-input: that component runs its own useInput and
 * consumes every keystroke it receives, so with the picker's handler mounted
 * alongside it a single Backspace was handled twice — once as a word delete,
 * once as a character delete — with both writing `query` from the same stale
 * value. ListView owns all key handling now; this just renders the value.
 */
export function SearchInput({ value, placeholder = 'Type to filter...' }: Props) {
  return (
    <Box borderStyle="round" borderColor={theme.searchPromptColor} paddingX={1}>
      <Box marginRight={1}>
        <Text bold color={theme.searchPromptColor}>Search:</Text>
      </Box>
      {value.length > 0 ? (
        <Text>
          {value}
          <Text inverse> </Text>
        </Text>
      ) : (
        <Text dimColor>
          <Text inverse> </Text>
          {placeholder}
        </Text>
      )}
    </Box>
  );
}
