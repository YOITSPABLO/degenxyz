import { useState, useEffect } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import { Market, supabase } from '../lib/supabase';
import { calculateShares, calculateProbability } from '../lib/web3';

interface BettingModalProps {
  market: Market;
  walletAddress: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function BettingModal({ market, walletAddress, onClose, onSuccess }: BettingModalProps) {
  const [position, setPosition] = useState<'yes' | 'no'>('yes');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [estimatedShares, setEstimatedShares] = useState(0);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const amountNum = parseFloat(amount);
      const shares = calculateShares(amountNum, market.yes_pool, market.no_pool, position);
      setEstimatedShares(shares);
      setFee((amountNum * market.fee_percentage) / 100);
    } else {
      setEstimatedShares(0);
      setFee(0);
    }
  }, [amount, position, market]);

  const handlePlaceBet = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;

    setLoading(true);
    try {
      const amountNum = parseFloat(amount);
      const shares = calculateShares(amountNum, market.yes_pool, market.no_pool, position);
      const feeAmount = (amountNum * market.fee_percentage) / 100;

      const { error: betError } = await supabase.from('bets').insert({
        market_id: market.id,
        user_address: walletAddress,
        position,
        amount: amountNum,
        shares,
        token_address: market.is_degen_market ? null : market.token_address,
        fee_paid: feeAmount,
      });

      if (betError) throw betError;

      const newYesPool = position === 'yes' ? market.yes_pool + amountNum : market.yes_pool;
      const newNoPool = position === 'no' ? market.no_pool + amountNum : market.no_pool;

      const { error: updateError } = await supabase
        .from('markets')
        .update({
          yes_pool: newYesPool,
          no_pool: newNoPool,
          total_volume: market.total_volume + amountNum,
        })
        .eq('id', market.id);

      if (updateError) throw updateError;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();

      if (profile) {
        await supabase
          .from('user_profiles')
          .update({
            total_volume: profile.total_volume + amountNum,
            total_markets: profile.total_markets + 1,
          })
          .eq('wallet_address', walletAddress);
      } else {
        await supabase.from('user_profiles').insert({
          wallet_address: walletAddress,
          total_volume: amountNum,
          total_markets: 1,
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('Failed to place bet');
    } finally {
      setLoading(false);
    }
  };

  const probability = calculateProbability(market.yes_pool, market.no_pool);
  const newProbability = calculateProbability(
    position === 'yes' ? market.yes_pool + parseFloat(amount || '0') : market.yes_pool,
    position === 'no' ? market.no_pool + parseFloat(amount || '0') : market.no_pool
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-black rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-yellow-400/30 flex items-center justify-between sticky top-0 bg-black z-10">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Place Bet</h2>
            <p className="text-white/60 text-xs sm:text-sm mt-1 line-clamp-1">{market.title}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white flex-shrink-0">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {market.is_degen_market && (
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 sm:p-4 flex items-start space-x-2 sm:space-x-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-semibold text-sm sm:text-base">DEGEN Market - Zero Fees</p>
                <p className="text-white/70 text-xs sm:text-sm mt-1">
                  This market uses the native DEGEN token with no trading fees
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={() => setPosition('yes')}
              className={`py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all ${
                position === 'yes'
                  ? 'bg-yellow-400 text-white shadow-lg shadow-green-500/30'
                  : 'bg-black text-white/70 hover:bg-yellow-400/10'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1">YES</div>
              <div className="text-xs sm:text-sm opacity-80">{probability.toFixed(1)}%</div>
            </button>
            <button
              onClick={() => setPosition('no')}
              className={`py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all ${
                position === 'no'
                  ? 'bg-white text-white shadow-lg shadow-red-500/30'
                  : 'bg-black text-white/70 hover:bg-yellow-400/10'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1">NO</div>
              <div className="text-xs sm:text-sm opacity-80">{(100 - probability).toFixed(1)}%</div>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Amount (BNB)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full bg-black border border-slate-600 rounded-lg px-4 py-3 text-white text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {amount && !isNaN(parseFloat(amount)) && (
            <div className="bg-black rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Estimated Shares</span>
                <span className="text-white font-semibold">{estimatedShares.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Trading Fee</span>
                <span className="text-white font-semibold">
                  {market.is_degen_market ? (
                    <span className="text-yellow-400">FREE</span>
                  ) : (
                    `${fee.toFixed(4)} BNB (${market.fee_percentage}%)`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">New Probability</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white/50">{probability.toFixed(1)}%</span>
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">{newProbability.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-black hover:bg-yellow-400/10 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceBet}
              disabled={loading || !amount || isNaN(parseFloat(amount))}
              className={`flex-1 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                position === 'yes'
                  ? 'bg-yellow-400 hover:bg-green-600 text-white'
                  : 'bg-white hover:bg-red-600 text-white'
              }`}
            >
              {loading ? 'Placing Bet...' : `Bet ${position.toUpperCase()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
