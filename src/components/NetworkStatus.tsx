import { useNetwork } from 'wagmi';
import { GlassCard } from './ui/GlassCard';
import { Activity } from 'lucide-react';

export const NetworkStatus = () => {
  const { chain } = useNetwork();

  return (
    <GlassCard className="px-4 py-2 flex items-center space-x-2">
      <Activity className="h-4 w-4 text-gods-primary" />
      <span className="text-sm text-gods-secondary">
        {chain?.name || 'Not Connected'}
      </span>
    </GlassCard>
  );
};
