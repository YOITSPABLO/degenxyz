import { useState, useEffect } from 'react';
import { Trophy, TrendingDown, Activity, Coins } from 'lucide-react';
import { UserProfile, Bet, Market, supabase } from '../lib/supabase';

interface UserPortfolioProps {
  walletAddress: string;
}

export function UserPortfolio({ walletAddress }: UserPortfolioProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeBets, setActiveBets] = useState<(Bet & { market: Market })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortfolio();
  }, [walletAddress]);

  const loadPortfolio = async () => {
    try {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();

      setProfile(profileData);

      const { data: betsData, error: betsError } = await supabase
        .from('bets')
        .select('*, market:markets(*)')
        .eq('user_address', walletAddress)
        .eq('claimed', false);

      if (betsError) throw betsError;

      const activeBetsWithMarkets = (betsData || []).filter(
        (bet: any) => bet.market && bet.market.status !== 'resolved'
      );

      setActiveBets(activeBetsWithMarkets as any);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
        <p className="text-white/60 text-center">Loading portfolio...</p>
      </div>
    );
  }

  const winRate =
    profile && profile.wins + profile.losses > 0
      ? (profile.wins / (profile.wins + profile.losses)) * 100
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
          <div className="flex items-center space-x-2 text-white/60 mb-2">
            <Coins className="w-5 h-5" />
            <span className="text-sm font-medium">Total Volume</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {profile ? profile.total_volume.toFixed(2) : '0.00'} BNB
          </p>
        </div>

        <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
          <div className="flex items-center space-x-2 text-white/60 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium">Markets</span>
          </div>
          <p className="text-3xl font-bold text-white">{profile?.total_markets || 0}</p>
        </div>

        <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
          <div className="flex items-center space-x-2 text-white/60 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">Wins</span>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{profile?.wins || 0}</p>
        </div>

        <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
          <div className="flex items-center space-x-2 text-white/60 mb-2">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm font-medium">Win Rate</span>
          </div>
          <p className="text-3xl font-bold text-white">{winRate.toFixed(1)}%</p>
        </div>
      </div>

      {activeBets.length > 0 && (
        <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Active Positions</h3>
          <div className="space-y-3">
            {activeBets.map((bet) => (
              <div
                key={bet.id}
                className="bg-black border border-yellow-400/30 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">{bet.market.title}</p>
                  <div className="flex items-center space-x-3 text-sm">
                    <span
                      className={`font-semibold ${
                        bet.position === 'yes' ? 'text-yellow-400' : 'text-white'
                      }`}
                    >
                      {bet.position.toUpperCase()}
                    </span>
                    <span className="text-white/60">
                      {bet.amount.toFixed(4)} BNB • {bet.shares.toFixed(4)} shares
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">Potential Return</p>
                  <p className="text-lg font-bold text-white">
                    {((bet.shares / (bet.position === 'yes' ? bet.market.yes_pool : bet.market.no_pool)) *
                      (bet.market.yes_pool + bet.market.no_pool)).toFixed(4)}{' '}
                    BNB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeBets.length === 0 && (
        <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
          <p className="text-white/60 text-center">No active positions</p>
        </div>
      )}
    </div>
  );
}
