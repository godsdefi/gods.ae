import {
  Input,
  Text,
  Image,
  Box,
  Button,
  useDisclosure,
  Flex,
  IconButton,
  Center,
  CloseButton
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Token } from '@/lib/tokenService';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  tokens: Token[];
  selectedTokenAddress?: string;
}

export default function TokenSelector({
  isOpen,
  onClose,
  onSelect,
  tokens,
  selectedTokenAddress
}: TokenSelectorProps) {
  const [search, setSearch] = useState('');
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);

  useEffect(() => {
    const query = search.toLowerCase();
    const filtered = tokens.filter(token => 
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.address.toLowerCase().includes(query)
    );
    setFilteredTokens(filtered);
  }, [search, tokens]);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={1000}
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="md"
        p={6}
        width="400px"
        maxHeight="90vh"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        position="relative"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontWeight="bold" fontSize="lg">Select Token</Text>
          <CloseButton onClick={onClose} />
        </Flex>

        <Flex direction="column" gap={4}>
          <Input
            placeholder="Search by name or paste address"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <Box maxH="60vh" overflowY="auto">
            <Flex direction="column" gap={2}>
              {filteredTokens.map((token) => (
                <Button
                  key={token.address}
                  variant="ghost"
                  bg={token.address === selectedTokenAddress ? 'gray.100' : undefined}
                  onClick={() => {
                    onSelect(token);
                    onClose();
                  }}
                  justifyContent="flex-start"
                  width="full"
                  py={2}
                >
                  <Flex gap={4} width="full" align="center">
                    {token.logoURI && (
                      <Image
                        src={token.logoURI}
                        alt={token.symbol}
                        width="24px"
                        height="24px"
                        borderRadius="full"
                      />
                    )}
                    <Flex direction="column" align="flex-start">
                      <Text fontWeight="bold">{token.symbol}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {token.name}
                      </Text>
                    </Flex>
                  </Flex>
                </Button>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
