import React from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { theme } from '../../core/theme.js';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <Box borderStyle="round" borderColor={theme.searchPromptColor} paddingX={1}>
      <Box marginRight={1}>
        <Text bold color={theme.searchPromptColor}>Search:</Text>
      </Box>
      <TextInput value={value} onChange={onChange} placeholder="Type to filter..." />
    </Box>
  );
}
