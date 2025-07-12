# GODS DeFi Platform

GODS is an advanced DeFi platform featuring MEV protection, multi-DEX integration, and optimal trading strategies.

## Core Features

- **Multi-RPC Endpoint Support**: Integrate Alchemy, Infura, QuickNode for redundancy
- **DEX & Aggregator Integration**: Support for major DEXes and aggregators
- **Mempool Monitoring**: Using Blocknative for frontrunning and MEV detection
- **MEV Builder Submission**: Integration with Flashbots, Titan, Beaver
- **Advanced Pathfinding**: Optimal multi-hop, multi-DEX routes
- **Oracle Integration**: Price validation from Chainlink, Pyth, RedStone
- **Risk Controls**: Smart contract parameter management
- **Analytics & Monitoring**: Real-time data and performance tracking

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- TailwindCSS
- Ethers.js / Viem
- Wagmi Hooks
- RainbowKit
- Framer Motion
- Recharts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js 13 app router pages
├── components/         
│   ├── dex/            # DEX trading components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and constants
└── styles/             # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details