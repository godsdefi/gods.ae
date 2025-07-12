'use client';

import { useState } from 'react';
import { Container, Flex, Heading } from '@chakra-ui/react';
import DexSelector from '@/components/DexSelector';
import SwapInterface from '@/components/SwapInterface';
import { MEVProtectionService } from '@/lib/mevProtection';
import { MultiRPCService } from '@/lib/multiRPC';

export default function Home() {
	const [selectedDex, setSelectedDex] = useState('');

	// Initialize services
	const rpcUrls = process.env.NEXT_PUBLIC_RPC_URLS?.split(',') || [];
	const multiRPC = new MultiRPCService(rpcUrls);
	const mevProtection = new MEVProtectionService(multiRPC.getCurrentProvider());

	return (
		<Container maxW="container.md" py={8}>
			<Flex direction="column" gap={8} align="center">
				<Heading size="2xl">GODS DeFi</Heading>
				<DexSelector onSelect={setSelectedDex} />
				{selectedDex && <SwapInterface mevProtection={mevProtection} multiRPC={multiRPC} />}
			</Flex>
		</Container>
	);
}
