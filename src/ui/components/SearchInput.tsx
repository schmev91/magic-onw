import React from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <Box borderStyle="round" borderColor="cyan" paddingX={1}>
      <Box marginRight={1}>
        <Text bold>Search:</Text>
      </Box>
      <TextInput value={value} onChange={onChange} placeholder="Type to filter..." />
    </Box>
  );
}
