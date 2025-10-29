import { useEffect, useState } from 'react';
import { Flame, TrendingUp } from 'lucide-react';
import { Market, supabase } from '../lib/supabase';
import { calculateProbability } from '../lib/web3';

interface TrendingMarketsProps {
  onMarketClick: (market: Market) => void;
}

export function TrendingMarkets({ onMarketClick }: TrendingMarketsProps) {
  const [trending, setTrending] = useState<Market[]>([]);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      const { data, error } = await supabase
        .from('markets')
        .select('*')
        .eq('status', 'open')
        .order('total_volume', { ascending: false })
        .limit(5);

      if (error) throw error;
      setTrending(data || []);
    } catch (error) {
      console.error('Error loading trending:', error);
    }
  };

  if (trending.length === 0) return null;

  return (
    <div className="bg-black rounded-xl border-2 border-yellow-400 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-yellow-400">Trending Markets</h2>
      </div>

      <div className="space-y-3">
        {trending.map((market, index) => {
          const probability = calculateProbability(market.yes_pool, market.no_pool);
          return (
            <div
              key={market.id}
              onClick={() => onMarketClick(market)}
              className="bg-black border border-yellow-400/30 hover:border-yellow-400 rounded-lg p-4 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-yellow-400 font-bold text-lg">#{index + 1}</span>
                    <span className="text-xs text-white/60 uppercase">{market.category}</span>
                    {market.is_degen_market && (
                      <span className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded">
                        0% FEE
                      </span>
                    )}
                  </div>
                  <p className="text-white font-semibold mb-2">{market.title}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1.5 text-white/60">
                      <TrendingUp className="w-4 h-4" />
                      <span>{market.total_volume.toFixed(2)} BNB</span>
                    </div>
                    <div className="text-green-400 font-semibold">
                      YES {probability.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60 mb-1">Liquidity</div>
                  <div className="text-white font-bold">
                    {(market.yes_pool + market.no_pool).toFixed(2)} BNB
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
