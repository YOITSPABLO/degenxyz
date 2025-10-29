import { useState, useEffect } from 'react';
import { X, Calendar, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { Market, Bet, supabase } from '../lib/supabase';
import { calculateProbability, shortenAddress } from '../lib/web3';

interface MarketDetailsModalProps {
  market: Market;
  walletAddress: string | null;
  onClose: () => void;
  onBet: () => void;
  onResolve?: () => void;
}

export function MarketDetailsModal({
  market,
  walletAddress,
  onClose,
  onBet,
  onResolve,
}: MarketDetailsModalProps) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [userBets, setUserBets] = useState<Bet[]>([]);

  useEffect(() => {
    loadBets();
  }, [market.id]);

  const loadBets = async () => {
    try {
      const { data, error } = await supabase
        .from('bets')
        .select('*')
        .eq('market_id', market.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBets(data || []);
      if (walletAddress) {
        setUserBets((data || []).filter((bet) => bet.user_address === walletAddress));
      }
    } catch (error) {
      console.error('Error loading bets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimWinnings = async (betId: string, payout: number) => {
    try {
      const { error } = await supabase
        .from('bets')
        .update({ claimed: true })
        .eq('id', betId);

      if (error) throw error;

      alert(`Successfully claimed ${payout.toFixed(4)} BNB!`);
      loadBets();
    } catch (error) {
      console.error('Error claiming winnings:', error);
      alert('Failed to claim winnings');
    }
  };

  const probability = calculateProbability(market.yes_pool, market.no_pool);
  const canResolve =
    walletAddress &&
    market.creator_address === walletAddress &&
    market.status === 'open' &&
    new Date(market.end_date) < new Date();

  const calculateUserPayout = (bet: Bet) => {
    if (market.resolution === bet.position) {
      const totalPool = market.yes_pool + market.no_pool;
      const winningPool = market.resolution === 'yes' ? market.yes_pool : market.no_pool;
      return (bet.shares / winningPool) * totalPool;
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-yellow-400/30 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wide">
                {market.category}
              </span>
              {market.is_degen_market && (
                <span className="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded border border-yellow-400/30">
                  DEGEN • 0% Fee
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{market.title}</h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-black rounded-lg p-4">
            <p className="text-white/70">{market.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black rounded-lg p-4">
              <div className="flex items-center space-x-2 text-white/60 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Volume</span>
              </div>
              <p className="text-2xl font-bold text-white">{market.total_volume.toFixed(2)} BNB</p>
            </div>
            <div className="bg-black rounded-lg p-4">
              <div className="flex items-center space-x-2 text-white/60 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Total Bets</span>
              </div>
              <p className="text-2xl font-bold text-white">{bets.length}</p>
            </div>
            <div className="bg-black rounded-lg p-4">
              <div className="flex items-center space-x-2 text-white/60 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Ends</span>
              </div>
              <p className="text-sm font-bold text-white">
                {new Date(market.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-white">Current Odds</span>
              <span className="text-sm text-white/60">
                {market.yes_pool.toFixed(2)} YES / {market.no_pool.toFixed(2)} NO
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-semibold">YES</span>
                <span className="text-white font-bold">{probability.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                  style={{ width: `${probability}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">NO</span>
                <span className="text-white font-bold">{(100 - probability).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {userBets.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Your Bets</h3>
              <div className="space-y-2">
                {userBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="bg-black rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <span
                        className={`font-semibold ${
                          bet.position === 'yes' ? 'text-yellow-400' : 'text-white'
                        }`}
                      >
                        {bet.position.toUpperCase()}
                      </span>
                      <span className="text-white/60 ml-2">
                        {bet.amount.toFixed(4)} BNB • {bet.shares.toFixed(4)} shares
                      </span>
                    </div>
                    {market.status === 'resolved' && market.resolution === bet.position && !bet.claimed && (
                      <button
                        onClick={() => handleClaimWinnings(bet.id, calculateUserPayout(bet))}
                        className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        Claim {calculateUserPayout(bet).toFixed(4)} BNB
                      </button>
                    )}
                    {bet.claimed && (
                      <span className="text-yellow-400 font-semibold">✓ Claimed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {bets.slice(0, 10).map((bet) => (
                <div
                  key={bet.id}
                  className="bg-black rounded-lg p-3 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-semibold ${
                        bet.position === 'yes' ? 'text-yellow-400' : 'text-white'
                      }`}
                    >
                      {bet.position.toUpperCase()}
                    </span>
                    <span className="text-white/60">{shortenAddress(bet.user_address)}</span>
                  </div>
                  <span className="text-white font-medium">{bet.amount.toFixed(4)} BNB</span>
                </div>
              ))}
            </div>
          </div>

          {canResolve && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-semibold">Ready to Resolve</p>
                  <p className="text-white/70 text-sm mt-1">
                    This market has ended. You can now resolve it.
                  </p>
                </div>
              </div>
              <button
                onClick={onResolve}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2 rounded-lg transition-colors"
              >
                Resolve Market
              </button>
            </div>
          )}

          {market.status === 'open' && walletAddress && !canResolve && (
            <button
              onClick={onBet}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 rounded-lg transition-colors"
            >
              Place Bet
            </button>
          )}

          {!walletAddress && (
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-white/60">Connect your wallet to place bets</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
