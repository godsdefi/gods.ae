import { GlassCard } from '../ui/GlassCard';
import { WalletConnection } from '../WalletConnection';
import { NetworkStatus } from '../NetworkStatus';

export const Header = () => {
  return (
    <GlassCard className="m-4 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <NetworkStatus />
      </div>
      <div className="flex items-center space-x-4">
        <WalletConnection />
      </div>
    </GlassCard>
  );
};
