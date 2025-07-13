'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Activity, 
  DollarSign, 
  BarChart3, 
  Globe, 
  Users, 
  Bot,
  Layers,
  Eye,
  Target,
  Cpu,
  Network,
  Gauge,
  Wallet,
  Settings,
  MessageCircle,
  Bell,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

// Hero Section Component
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
    "Multi-RPC Endpoint Support",
    "MEV Builder Integration", 
    "Advanced Pathfinding",
    "Real-time Analytics"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gods-dark via-gods-dark to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,157,0.06),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gods-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gods-primary via-gods-green to-gods-purple bg-clip-text text-transparent mb-6">
            GODS
          </h1>
          <p className="text-xl md:text-2xl text-gods-secondary mb-2">
            Secure and Powerful
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mb-8">
            <span className="text-gods-primary">DeFi</span> Platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-gods-secondary"
              >
                {features[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-gods-primary text-gods-dark font-semibold rounded-xl hover:bg-gods-green transition-all duration-300 flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Launch Platform
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <button className="px-8 py-4 bg-transparent border border-gods-border text-gods-primary font-semibold rounded-xl hover:bg-gods-primary hover:bg-opacity-10 transition-all duration-300">
            View Documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Core Features Section
const CoreFeaturesSection = () => {
  const coreFeatures = [
    {
      icon: Network,
      title: "Multi-RPC Endpoint Support",
      description: "Integrate Alchemy, Infura, QuickNode for redundancy",
      gradient: "from-gods-primary to-gods-green"
    },
    {
      icon: Layers,
      title: "DEX & Aggregator Integration",
      description: "Support Uniswap V2/V3, Sushiswap, PancakeSwap, Balancer, Curve, DODO, and 1inch",
      gradient: "from-gods-green to-gods-purple"
    },
    {
      icon: Eye,
      title: "Mempool Monitoring",
      description: "Use Blocknative or custom listeners for frontrunning and MEV detection",
      gradient: "from-gods-purple to-gods-yellow"
    },
    {
      icon: Bot,
      title: "MEV Builder Submission",
      description: "Integrate with Flashbots, Titan, Beaver for private, non-front-runnable execution",
      gradient: "from-gods-yellow to-gods-primary"
    },
    {
      icon: Target,
      title: "Advanced Pathfinding",
      description: "Implement Dijkstra's, Yen's K-Shortest Paths, and MMBF for optimal routes",
      gradient: "from-gods-primary to-gods-secondary"
    },
    {
      icon: Gauge,
      title: "Oracle Integration",
      description: "Fetch and compare prices from Chainlink, Pyth, or RedStone",
      gradient: "from-gods-secondary to-gods-green"
    },
    {
      icon: Cpu,
      title: "Simulation & Validation",
      description: "Simulate trades using callStatic and off-chain price checks",
      gradient: "from-gods-green to-gods-purple"
    },
    {
      icon: Shield,
      title: "Risk Controls",
      description: "Enforce contract parameters and dynamically manage blacklists/whitelists",
      gradient: "from-gods-purple to-gods-primary"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Core Features
          </h2>
          <p className="text-xl text-gods-secondary max-w-3xl mx-auto">
            Built with cutting-edge technology to provide the most advanced DeFi experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="gods-card p-6 hover:shadow-gods-glow transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gods-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dashboard Preview Section
const DashboardPreviewSection = () => {
  const [activeTab, setActiveTab] = useState('portfolio');

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'arbitrage', label: 'Arbitrage', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'controls', label: 'Controls', icon: Settings }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dashboard Preview
          </h2>
          <p className="text-xl text-gods-secondary max-w-3xl mx-auto">
            Experience the future of DeFi with our intuitive and powerful dashboard
          </p>
        </motion.div>

        <div className="gods-card p-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gods-primary text-gods-dark'
                    : 'bg-transparent text-gods-secondary hover:text-gods-primary'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="min-h-[400px] bg-gods-card rounded-lg p-6 border border-gods-border">
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Portfolio Overview</h3>
                  <span className="text-gods-green text-2xl font-bold">$23,547.00</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gods-secondary">Total Balance</span>
                      <TrendingUp className="w-5 h-5 text-gods-green" />
                    </div>
                    <span className="text-2xl font-bold text-white">$23,547.00</span>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gods-secondary">24h P&L</span>
                      <Activity className="w-5 h-5 text-gods-green" />
                    </div>
                    <span className="text-2xl font-bold text-gods-green">+$1,247.32</span>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gods-secondary">Active Positions</span>
                      <DollarSign className="w-5 h-5 text-gods-primary" />
                    </div>
                    <span className="text-2xl font-bold text-white">7</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'arbitrage' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Live Arbitrage Opportunities</h3>
                  <span className="text-gods-green text-sm">12 opportunities found</span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gods-dark rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gods-primary rounded-full flex items-center justify-center">
                          <span className="text-gods-dark font-bold text-sm">ETH</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">ETH/USDC</div>
                          <div className="text-gods-secondary text-sm">Uniswap V3 → Sushiswap</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gods-green font-semibold">+2.34%</div>
                        <div className="text-gods-secondary text-sm">$456.78</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Analytics Dashboard</h3>
                  <span className="text-gods-secondary text-sm">Last 30 days</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gods-dark rounded-lg p-4 text-center">
                    <div className="text-gods-primary text-2xl font-bold">142</div>
                    <div className="text-gods-secondary text-sm">Successful Trades</div>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4 text-center">
                    <div className="text-gods-green text-2xl font-bold">98.7%</div>
                    <div className="text-gods-secondary text-sm">Success Rate</div>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4 text-center">
                    <div className="text-gods-yellow text-2xl font-bold">$12.4K</div>
                    <div className="text-gods-secondary text-sm">Total Profit</div>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4 text-center">
                    <div className="text-gods-purple text-2xl font-bold">47ms</div>
                    <div className="text-gods-secondary text-sm">Avg Response</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'controls' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Smart Contract Controls</h3>
                  <span className="text-gods-green text-sm">All systems operational</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">Max Borrow Amount</span>
                      <button className="text-gods-primary text-sm">Edit</button>
                    </div>
                    <div className="text-gods-secondary">$50,000 USDC</div>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">Min Profit Threshold</span>
                      <button className="text-gods-primary text-sm">Edit</button>
                    </div>
                    <div className="text-gods-secondary">0.5%</div>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">Cooldown Period</span>
                      <button className="text-gods-primary text-sm">Edit</button>
                    </div>
                    <div className="text-gods-secondary">300 seconds</div>
                  </div>
                  <div className="bg-gods-dark rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">Emergency Pause</span>
                      <button className="text-gods-secondary text-sm">Disabled</button>
                    </div>
                    <div className="text-gods-green">System Active</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Workflow Section
const WorkflowSection = () => {
  const steps = [
    {
      icon: Eye,
      title: "Monitor",
      description: "Continuously fetch prices and liquidity from all supported DEXes and oracles",
      color: "text-gods-primary"
    },
    {
      icon: Target,
      title: "Detect",
      description: "Identify arbitrage opportunities using advanced pathfinding, validate with oracles",
      color: "text-gods-green"
    },
    {
      icon: Cpu,
      title: "Simulate",
      description: "Run off-chain and on-chain simulations for each candidate route",
      color: "text-gods-purple"
    },
    {
      icon: Zap,
      title: "Execute",
      description: "Submit profitable routes to smart contract via MEV builders or public mempool",
      color: "text-gods-yellow"
    },
    {
      icon: BarChart3,
      title: "Analyze",
      description: "Record results, profits, failures, and adjust strategies dynamically",
      color: "text-gods-secondary"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Workflow Process
          </h2>
          <p className="text-xl text-gods-secondary max-w-3xl mx-auto">
            Our sophisticated 5-step process ensures maximum efficiency and profitability
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gods-primary via-gods-green via-gods-purple via-gods-yellow to-gods-secondary hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="gods-card p-6 text-center hover:shadow-gods-glow transition-all duration-300 group">
                  <div className={`w-16 h-16 rounded-full border-2 ${step.color.replace('text-', 'border-')} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gods-secondary">{step.description}</p>
                </div>
                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gods-primary text-gods-dark rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { label: "Total Volume", value: "$2.4B", icon: DollarSign },
    { label: "Active Users", value: "45,000+", icon: Users },
    { label: "Supported DEXes", value: "15+", icon: Globe },
    { label: "Success Rate", value: "98.7%", icon: CheckCircle }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gods-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-gods-dark" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gods-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="gods-card p-12"
        >
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-gods-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-gods-secondary max-w-2xl mx-auto">
              Join thousands of traders who are already maximizing their profits with GODS DeFi
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gods-primary text-gods-dark font-semibold rounded-xl hover:bg-gods-green transition-all duration-300 flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Launch Platform
            </button>
            <button className="px-8 py-4 bg-transparent border border-gods-border text-gods-primary font-semibold rounded-xl hover:bg-gods-primary hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gods-dark text-white">
      <Navigation />
      <HeroSection />
      <CoreFeaturesSection />
      <DashboardPreviewSection />
      <WorkflowSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
