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
    <div className="bg-black rounded-xl border-2 border-yellow-400 p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">Trending Markets</h2>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {trending.map((market, index) => {
          const probability = calculateProbability(market.yes_pool, market.no_pool);
          return (
            <div
              key={market.id}
              onClick={() => onMarketClick(market)}
              className="bg-black border border-yellow-400/30 hover:border-yellow-400 rounded-lg p-3 sm:p-4 cursor-pointer transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                <div className="flex-1 min-w-0 w-full sm:w-auto sm:pr-4">
                  <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-1">
                    <span className="text-yellow-400 font-bold text-base sm:text-lg">#{index + 1}</span>
                    <span className="text-xs text-white/60 uppercase">{market.category}</span>
                    {market.is_degen_market && (
                      <span className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap">
                        0% FEE
                      </span>
                    )}
                  </div>
                  <p className="text-white font-semibold mb-2 text-sm sm:text-base line-clamp-2">{market.title}</p>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1 sm:space-x-1.5 text-white/60">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{market.total_volume.toFixed(2)} BNB</span>
                    </div>
                    <div className="text-green-400 font-semibold">
                      YES {probability.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end w-full sm:w-auto">
                  <div className="text-xs text-white/60 mb-0 sm:mb-1">Liquidity</div>
                  <div className="text-white font-bold text-sm sm:text-base">
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
