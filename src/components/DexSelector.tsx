'use client';

import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useState } from 'react';

interface DexSelectorProps {
  onSelect: (dex: string) => void;
}

export default function DexSelector({ onSelect }: DexSelectorProps) {
  const [selectedDex, setSelectedDex] = useState('');

  const dexList = [
    'Uniswap V3',
    'Uniswap V2',
    'Sushiswap',
    'Curve',
    '1inch'
  ];

  const handleDexChange = (dex: string) => {
    setSelectedDex(dex);
    onSelect(dex);
  };

  return (
    <Box p={4}>
      <ButtonGroup variant="outline" spacing={2} isAttached>
        {dexList.map((dex) => (
          <Button
            key={dex}
            onClick={() => handleDexChange(dex)}
            colorScheme={selectedDex === dex ? "blue" : undefined}
            size="sm"
          >
            {dex}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
