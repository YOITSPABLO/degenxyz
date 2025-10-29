import { Clock, TrendingUp, Users } from 'lucide-react';
import { Market } from '../lib/supabase';
import { calculateProbability } from '../lib/web3';

interface MarketCardProps {
  market: Market;
  onClick: () => void;
}

export function MarketCard({ market, onClick }: MarketCardProps) {
  const probability = calculateProbability(market.yes_pool, market.no_pool);
  const timeLeft = new Date(market.end_date).getTime() - Date.now();
  const daysLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hoursLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  const getStatusColor = () => {
    switch (market.status) {
      case 'open':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-black rounded-2xl border-2 border-yellow-400/30 hover:border-yellow-400 transition-all duration-300 cursor-pointer overflow-hidden group card-hover shadow-xl shadow-yellow-500/10"
    >
      <div className="p-4 sm:p-6 relative">
        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-2">
                <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  {market.category}
                </span>
                {market.is_degen_market && (
                  <span className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded border border-yellow-400/30 whitespace-nowrap">
                    DEGEN • 0% Fee
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 transition-all line-clamp-2">
                {market.title}
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full border ${getStatusColor()} ml-2 flex-shrink-0`}
            >
              {market.status.toUpperCase()}
            </span>
          </div>

          <p className="text-white/70 text-sm mb-4 sm:mb-6 line-clamp-2">{market.description}</p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-center flex-1">
                  <div className="text-xs text-white/50 mb-1">YES</div>
                  <div className="text-lg sm:text-xl font-bold text-green-400">{probability.toFixed(1)}%</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-xs text-white/50 mb-1">NO</div>
                  <div className="text-lg sm:text-xl font-bold text-red-400">{(100 - probability).toFixed(1)}%</div>
                </div>
              </div>
              <div className="h-2.5 sm:h-3 bg-black rounded-full overflow-hidden border border-yellow-400/30">
                <div
                  className="h-full bg-yellow-400 shadow-lg shadow-yellow-500/50"
                  style={{ width: `${probability}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-yellow-400/30">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                </div>
                <div>
                  <div className="text-xs text-white/50">Volume</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{market.total_volume.toFixed(2)} BNB</div>
                </div>
              </div>
              {market.status === 'open' && (
                <div className="flex items-center space-x-1 sm:space-x-1.5">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-semibold text-yellow-400">
                    {daysLeft > 0 ? `${daysLeft}d ${hoursLeft}h` : `${hoursLeft}h`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {market.status === 'resolved' && market.resolution && (
        <div
          className={`px-4 sm:px-6 py-2.5 sm:py-3 ${
            market.resolution === 'yes'
              ? 'bg-yellow-400/10 border-t border-yellow-400/30'
              : market.resolution === 'no'
              ? 'bg-white/10 border-t border-white/30'
              : 'bg-white/10 border-t border-white/30'
          }`}
        >
          <p className="text-sm font-medium text-center">
            <span className="text-white/70">Resolved: </span>
            <span
              className={`${
                market.resolution === 'yes'
                  ? 'text-yellow-400'
                  : market.resolution === 'no'
                  ? 'text-white'
                  : 'text-white'
              } uppercase font-bold`}
            >
              {market.resolution}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
