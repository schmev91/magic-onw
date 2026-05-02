import React from 'react';
import { Box, Text, useStdout } from 'ink';
import { truncatePath } from '../../core/ui-utils.js';
import { theme } from '../../core/theme.js';

interface Props {
  label: string;
  isSelected?: boolean;
  value?: string;
}

// The ink-select-input's itemComponent receives the properties of the item object as props.
export function CustomItem({ label, isSelected = false, value, ...rest }: Props) {
  const { stdout } = useStdout();
  const terminalWidth = stdout?.columns || 80;
  
  // The value (path) is passed directly as a prop because ink-select-input spreads the item object
  const path = value || '';
  
  const aliasWidth = 25; // Fixed width for alias column
  const separatorWidth = 2;
  const availablePathWidth = terminalWidth - aliasWidth - separatorWidth - 4; // 4 for padding/border
  
  const displayPath = truncatePath(path, availablePathWidth);

  return (
    <Box flexDirection="row">
      <Box width={aliasWidth}>
        <Text 
          color={isSelected ? theme.highlightColor : theme.aliasColor} 
          bold={isSelected}
        >
          {label}
        </Text>
      </Box>
      
      <Box marginLeft={separatorWidth}>
        <Text color={theme.pathColor}>
          {displayPath}
        </Text>
      </Box>
    </Box>
  );
}
