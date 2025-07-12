import {
  Box,
  Button,
  Stack,
  Text,
  useToast,
  Image,
  IconButton,
  useDisclosure,
  Flex,
  ButtonProps
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ArrowDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { TokenService, Token } from '../lib/tokenService';
import { DexService } from '../lib/dexService';
import { TransactionHistoryService } from '../lib/transactionHistory';
import { MEVProtectionService } from '../lib/mevProtection';
import { MultiRPCService } from '../lib/multiRPC';
import { Quote, Services } from '../types/interfaces';
import TokenSelector from './TokenSelector';
import QuoteDisplay from './QuoteDisplay';
import TransactionHistory from './TransactionHistory';

interface SwapProps {
  mevProtection: MEVProtectionService;
  multiRPC: MultiRPCService;
}

interface ChakraButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export default function SwapInterface({ mevProtection, multiRPC }: SwapProps) {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const [selectorMode, setSelectorMode] = useState<'from' | 'to'>('from');
  const [availableTokens, setAvailableTokens] = useState<Token[]>([]);
  const [gasPrice, setGasPrice] = useState<number>(0);

  const toast = useToast();
  const [services, setServices] = useState<Services | null>(null);
  const { onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Initialize provider
    const initProvider = async () => {
      try {
        const healthyProvider = await multiRPC.getHealthyProvider() as ethers.JsonRpcProvider;
        setProvider(healthyProvider);
        
        // Initialize services with provider
        setServices({
          token: new TokenService(healthyProvider),
          dex: new DexService(healthyProvider),
          history: new TransactionHistoryService(healthyProvider)
        });
      } catch (error) {
        console.error('Failed to initialize provider:', error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to network",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    initProvider();
  }, [multiRPC]);

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!services || !fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) return;
      
      setLoading(true);
      try {
        const dexQuotes = await services.dex.getAllQuotes(fromToken, toToken, ethers.parseUnits(fromAmount, fromToken.decimals));
        // Convert DexService quotes to our interface format
        const convertedQuotes = dexQuotes.map(q => ({
          protocol: q.protocol,
          routerAddress: q.routerAddress,
          path: q.paths || [],
          recipient: fromToken.address,
          deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
          amountIn: ethers.parseUnits(fromAmount, fromToken.decimals),
          amountOutMinimum: q.toAmount,
          toAmount: q.toAmount,
          gasEstimate: q.gasEstimate || 0n,
          priceImpact: q.priceImpact || 0,
          fromToken,
          toToken
        }));
        setQuotes(convertedQuotes);
        setSelectedQuote(convertedQuotes[0]); // Select best quote by default
      } catch (error) {
        console.error('Error fetching quotes:', error);
        if (error instanceof Error) {
          toast({
            title: "Failed to fetch quotes",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      setLoading(false);
    };

    fetchQuotes();
  }, [fromToken, toToken, fromAmount, services]);

  const handleSwap = async () => {
    if (!selectedQuote || !provider || !services || !fromToken || !toToken) return;

    setSwapping(true);
    try {
      // Initialize MEV protection with signing key
      await mevProtection.init(process.env.NEXT_PUBLIC_FLASHBOTS_SIGNING_KEY || '');

      // Convert quote to DexService format
      const dexQuote = {
        ...selectedQuote,
        fromAmount: selectedQuote.amountIn,
        paths: selectedQuote.path
      };

      const tx = await services.dex.executeSwap(dexQuote);
      const receipt = await tx.wait();
      
      if (!receipt) {
        throw new Error('Transaction failed - no receipt');
      }

      await services.history.addTransaction({
        hash: receipt.hash,
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        fromAmount,
        toAmount: ethers.formatUnits(selectedQuote.toAmount, toToken.decimals),
        status: 'confirmed',
        timestamp: Date.now(),
        protocol: selectedQuote.protocol,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
        effectiveGasPrice: receipt.gasPrice || 0n
      });

      toast({
        title: "Swap successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Swap failed:', error);
      if (error instanceof Error) {
        toast({
          title: "Swap failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    setSwapping(false);
  };

  const handleTokenSwitch = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount('');
    setQuotes([]);
    setSelectedQuote(null);
  };

  useEffect(() => {
    const loadTokens = async () => {
      if (!services?.token) return;
      try {
        const tokens = await services.token.getTokens();
        setAvailableTokens(tokens);
      } catch (error) {
        console.error('Failed to load tokens:', error);
        toast({
          title: "Failed to load tokens",
          description: "Please try refreshing the page",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    loadTokens();
  }, [services?.token]);

  useEffect(() => {
    const trackGasPrice = async () => {
      if (!provider) return;
      try {
        const feeData = await provider.getFeeData();
        const priceGwei = parseFloat(ethers.formatUnits(feeData.gasPrice || 0n, 'gwei'));
        setGasPrice(priceGwei);
      } catch (error) {
        console.error('Failed to fetch gas price:', error);
      }
    };

    trackGasPrice();
    const interval = setInterval(trackGasPrice, 15000); // Update every 15s

    return () => clearInterval(interval);
  }, [provider]);

  return (
    <Box maxW="lg" mx="auto" p={4}>
      <Flex direction="column" gap="4">
        <Box p={4} borderWidth={1} borderRadius="lg">
          <Flex direction="column" gap="4">
            <Box>
              <Button
                onClick={() => {
                  setSelectorMode('from');
                  setIsTokenSelectorOpen(true);
                }}
                width="full"
              >
                {fromToken ? (
                  <Flex gap={2} align="center">
                    {fromToken.logoURI && (
                      <Image
                        src={fromToken.logoURI}
                        alt={fromToken.symbol}
                        width="24px"
                        height="24px"
                        borderRadius="full"
                      />
                    )}
                    <Text>{fromToken.symbol}</Text>
                  </Flex>
                ) : (
                  "Select token"
                )}
              </Button>
              <TokenSelector
                tokens={availableTokens}
                onSelect={token => setFromToken(token)}
                isOpen={isTokenSelectorOpen && selectorMode === 'from'}
                onClose={() => setIsTokenSelectorOpen(false)}
                selectedTokenAddress={fromToken?.address}
              />
            </Box>
            
            <Button
              variant="ghost"
              onClick={handleTokenSwitch}
              aria-label="Switch tokens"
            >
              <RepeatIcon />
            </Button>

            <Box>
              <Button
                onClick={() => {
                  setSelectorMode('to');
                  setIsTokenSelectorOpen(true);
                }}
                width="full"
              >
                {toToken ? (
                  <Flex gap={2} align="center">
                    {toToken.logoURI && (
                      <Image
                        src={toToken.logoURI}
                        alt={toToken.symbol}
                        width="24px"
                        height="24px"
                        borderRadius="full"
                      />
                    )}
                    <Text>{toToken.symbol}</Text>
                  </Flex>
                ) : (
                  "Select token"
                )}
              </Button>
              <TokenSelector
                tokens={availableTokens}
                onSelect={token => setToToken(token)}
                isOpen={isTokenSelectorOpen && selectorMode === 'to'} 
                onClose={() => setIsTokenSelectorOpen(false)}
                selectedTokenAddress={toToken?.address}
              />
            </Box>

            {quotes.length > 0 && selectedQuote && (
              <QuoteDisplay
                quote={selectedQuote}
                onSelect={setSelectedQuote}
                gasPriceGwei={gasPrice} // This would come from web3 in production
              />
            )}

            <Button
              colorScheme="blue"
              width="full"
              onClick={handleSwap}
              disabled={!selectedQuote || !fromToken || !toToken || swapping}
              loading={swapping}
              loadingText="Swapping"
            >
              Swap
            </Button>
          </Flex>
        </Box>

        <Button
          variant="outline"
          width="full"
          onClick={() => setShowHistory(true)}
        >
          <RepeatIcon />
          <Text ml={2}>Transaction History</Text>
        </Button>

        {services?.history && showHistory && (
          <TransactionHistory
            transactions={services.history.getTransactions()}
            onDismiss={() => setShowHistory(false)}
          />
        )}
      </Flex>
    </Box>
  );
}
