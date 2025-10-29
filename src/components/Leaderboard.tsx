import { useEffect, useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { UserProfile, supabase } from '../lib/supabase';
import { shortenAddress } from '../lib/web3';

export function Leaderboard() {
  const [topTraders, setTopTraders] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('total_volume', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTopTraders(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-white" />;
      case 2:
        return <Award className="w-5 h-5 text-yellow-400" />;
      default:
        return <span className="text-white/60 font-bold">#{index + 1}</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-black rounded-xl border-2 border-yellow-400 p-4 sm:p-5 md:p-6">
        <p className="text-white/60 text-center text-sm sm:text-base">Loading leaderboard...</p>
      </div>
    );
  }

  if (topTraders.length === 0) {
    return (
      <div className="bg-black rounded-xl border-2 border-yellow-400 p-4 sm:p-5 md:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4">Top Traders</h2>
        <p className="text-white/60 text-center text-sm sm:text-base">No traders yet</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-xl border-2 border-yellow-400 p-4 sm:p-5 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6">Top Traders</h2>

      <div className="space-y-2">
        {topTraders.map((trader, index) => {
          const winRate =
            trader.wins + trader.losses > 0
              ? (trader.wins / (trader.wins + trader.losses)) * 100
              : 0;

          return (
            <div
              key={trader.wallet_address}
              className={`rounded-lg p-3 sm:p-4 flex items-center justify-between ${
                index < 3 ? 'bg-black border-2 border-yellow-400' : 'bg-black border border-yellow-400/30'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <div className="w-6 sm:w-8 flex items-center justify-center flex-shrink-0">
                  {getRankIcon(index)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">
                    {shortenAddress(trader.wallet_address)}
                  </p>
                  <p className="text-xs sm:text-sm text-white/60">
                    {trader.wins}W - {trader.losses}L ({winRate.toFixed(1)}%)
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-white font-bold text-sm sm:text-base">{trader.total_volume.toFixed(2)} BNB</p>
                <p className="text-xs text-white/60">{trader.total_markets} markets</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
