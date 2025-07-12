import { Box, Stack, Text, Badge, Flex, Spacer } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { Quote } from '../types/interfaces';

interface QuoteDisplayProps {
  quote: Quote;
  onSelect: (quote: Quote) => void;
  gasPriceGwei: number;
}

export default function QuoteDisplay({ quote, onSelect, gasPriceGwei }: QuoteDisplayProps) {
  if (!quote) return null;

  const estimatedGasCost = parseFloat(ethers.formatUnits(quote.gasEstimate, 'gwei')) * gasPriceGwei;

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Stack gap={3}>
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold">Best Quote from {quote.protocol}</Text>
          <Spacer />
          <Badge colorScheme="green">
            Estimated Gas: {estimatedGasCost.toFixed(6)} ETH
          </Badge>
        </Flex>
        
        <Box>
          <Text color="gray.600">You will receive</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {ethers.formatUnits(quote.amountOutMinimum, quote.toToken.decimals)} {quote.toToken.symbol}
          </Text>
        </Box>

        <Box>
          <Text color="gray.600">Price Impact</Text>
          <Text color={quote.priceImpact > 1 ? "red.500" : "green.500"}>
            {quote.priceImpact.toFixed(2)}%
          </Text>
        </Box>

        <Box>
          <Text color="gray.600">Rate</Text>
          <Text>
            1 {quote.fromToken.symbol} = {ethers.formatUnits(
              (quote.toAmount * BigInt(1e18)) / quote.amountIn,
              quote.toToken.decimals
            )} {quote.toToken.symbol}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
