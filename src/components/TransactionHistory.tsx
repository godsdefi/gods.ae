import { 
  Box, 
  Text, 
  Badge, 
  useDisclosure, 
  Button, 
  Icon,
  Link,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { TransactionStatus } from '@/lib/transactionHistory';
import { ethers } from 'ethers';

interface TransactionHistoryProps {
  transactions: TransactionStatus[];
  onDismiss: () => void;
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60000) { // Less than 1 minute
    return 'Just now';
  } else if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  } else {
    return new Date(timestamp).toLocaleDateString();
  }
}

function TransactionCard({ tx }: { tx: TransactionStatus }) {
  const { isOpen, onToggle } = useDisclosure();

  const statusColor = {
    pending: 'yellow',
    confirmed: 'green',
    failed: 'red'
  }[tx.status];

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Flex direction="column" gap={3}>
        <Flex justify="space-between">
          <Flex gap={2}>
            <Badge colorScheme={statusColor}>
              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
            </Badge>
            <Text fontSize="sm" color="gray.500">
              {formatTimestamp(tx.timestamp)}
            </Text>
          </Flex>
          <Link
            href={`https://etherscan.io/tx/${tx.hash}`}
            target="_blank"
            color="blue.500"
            fontSize="sm"
          >
            View on Etherscan
          </Link>
        </Flex>

        <Flex justify="space-between">
          <Text fontWeight="bold">{tx.protocol}</Text>
          <Text>
            {ethers.formatEther(tx.fromAmount)} {tx.fromToken} →{' '}
            {ethers.formatEther(tx.toAmount)} {tx.toToken}
          </Text>
        </Flex>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
        >
          <Flex width="full" justify="space-between">
            <Text>Details</Text>
            <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
          </Flex>
        </Button>

        {isOpen && (
          <Flex direction="column" gap={2} pt={2}>
            {tx.blockNumber && (
              <Flex justify="space-between">
                <Text fontSize="sm">Block</Text>
                <Text fontSize="sm">{tx.blockNumber}</Text>
              </Flex>
            )}
            {tx.gasUsed && tx.effectiveGasPrice && (
              <>
                <Flex justify="space-between">
                  <Text fontSize="sm">Gas Used</Text>
                  <Text fontSize="sm">{tx.gasUsed.toString()}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm">Gas Price</Text>
                  <Text fontSize="sm">
                    {ethers.formatUnits(tx.effectiveGasPrice, 'gwei')} Gwei
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm">Total Gas Cost</Text>
                  <Text fontSize="sm">
                    {ethers.formatEther(tx.gasUsed * tx.effectiveGasPrice)} ETH
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default function TransactionHistory({
  transactions,
  onDismiss,
}: TransactionHistoryProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Button
        variant="ghost"
        width="full"
        onClick={onToggle}
      >
        <Flex width="full" justify="space-between">
          <Text>Transaction History ({transactions.length})</Text>
          <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
        </Flex>
      </Button>

      {isOpen && (
        <Flex direction="column" gap={4} mt={4}>
          {transactions.map((tx) => (
            <TransactionCard key={tx.hash} tx={tx} />
          ))}
        </Flex>
      )}
    </Box>
  );
}
