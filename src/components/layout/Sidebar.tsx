import { GlassCard } from '../ui/GlassCard';
import { 
  Home,
  LineChart,
  Wallet,
  Settings,
  PieChart,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'DEX Trading', href: '/dex', icon: LineChart },
  { name: 'Portfolio', href: '/portfolio', icon: Wallet },
  { name: 'MEV Protection', href: '/mev', icon: Shield },
  { name: 'Analytics', href: '/analytics', icon: PieChart },
  { name: 'Arbitrage', href: '/arbitrage', icon: Zap },
  { name: 'Monitoring', href: '/monitoring', icon: Activity },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <GlassCard className="w-64 p-4 m-4 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-space font-bold bg-gradient-to-r from-gods-primary to-gods-green bg-clip-text text-transparent">
          GODS
        </h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg
                     text-gods-secondary hover:text-gods-primary hover:bg-gods-primary/5
                     transition-colors duration-200"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </GlassCard>
  );
};
