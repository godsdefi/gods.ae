import { GlassCard } from '@/components/ui/GlassCard';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, Settings, Info } from 'lucide-react';
import { DexSelector } from '@/components/dex/DexSelector';
import { TokenInput } from '@/components/dex/TokenInput';
import { PathFinder } from '@/components/dex/PathFinder';
import { PriceImpact } from '@/components/dex/PriceImpact';

export default function DexTrading() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Trade Card */}
          <GlassCard className="col-span-2 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Swap</h2>
              <button className="p-2 rounded-lg hover:bg-gods-card transition-colors">
                <Settings className="h-5 w-5 text-gods-secondary" />
              </button>
            </div>

            <div className="space-y-4">
              <TokenInput label="From" />
              
              <div className="flex justify-center">
                <button className="p-2 rounded-full bg-gods-card hover:bg-gods-primary/10 transition-colors">
                  <ArrowRight className="h-5 w-5 text-gods-primary" />
                </button>
              </div>
              
              <TokenInput label="To" />
            </div>

            <PriceImpact />

            <button className="gods-button w-full">
              Connect Wallet to Trade
            </button>
          </GlassCard>

          {/* Route Info */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Route</h3>
                <Info className="h-4 w-4 text-gods-secondary" />
              </div>
              <PathFinder />
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">DEX Selection</h3>
                <Info className="h-4 w-4 text-gods-secondary" />
              </div>
              <DexSelector />
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
