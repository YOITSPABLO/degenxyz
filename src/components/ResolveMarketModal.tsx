import { useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Market, supabase } from '../lib/supabase';

interface ResolveMarketModalProps {
  market: Market;
  onClose: () => void;
  onSuccess: () => void;
}

export function ResolveMarketModal({ market, onClose, onSuccess }: ResolveMarketModalProps) {
  const [resolution, setResolution] = useState<'yes' | 'no' | 'invalid'>('yes');
  const [loading, setLoading] = useState(false);

  const handleResolve = async () => {
    setLoading(true);
    try {
      const { error: marketError } = await supabase
        .from('markets')
        .update({
          status: 'resolved',
          resolution,
          resolution_date: new Date().toISOString(),
        })
        .eq('id', market.id);

      if (marketError) throw marketError;

      if (resolution !== 'invalid') {
        const { data: bets, error: betsError } = await supabase
          .from('bets')
          .select('*')
          .eq('market_id', market.id);

        if (betsError) throw betsError;

        const totalPool = market.yes_pool + market.no_pool;
        const winningPool = resolution === 'yes' ? market.yes_pool : market.no_pool;

        for (const bet of bets || []) {
          if (bet.position === resolution) {
            const payout = (bet.shares / winningPool) * totalPool;
            await supabase
              .from('bets')
              .update({ payout })
              .eq('id', bet.id);

            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('wallet_address', bet.user_address)
              .maybeSingle();

            if (profile) {
              await supabase
                .from('user_profiles')
                .update({ wins: profile.wins + 1 })
                .eq('wallet_address', bet.user_address);
            }
          } else {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('wallet_address', bet.user_address)
              .maybeSingle();

            if (profile) {
              await supabase
                .from('user_profiles')
                .update({ losses: profile.losses + 1 })
                .eq('wallet_address', bet.user_address);
            }
          }
        }
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error resolving market:', error);
      alert('Failed to resolve market');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-xl max-w-lg w-full">
        <div className="p-6 border-b border-yellow-400/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Resolve Market</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-black rounded-lg p-4">
            <p className="text-white font-semibold mb-2">{market.title}</p>
            <p className="text-white/60 text-sm">{market.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">
              Select Outcome
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setResolution('yes')}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all ${
                  resolution === 'yes'
                    ? 'bg-yellow-400 text-white shadow-lg shadow-green-500/30'
                    : 'bg-black text-white/70 hover:bg-yellow-400/10'
                }`}
              >
                <CheckCircle className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">YES</p>
                  <p className="text-sm opacity-80">The market outcome is YES</p>
                </div>
              </button>

              <button
                onClick={() => setResolution('no')}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all ${
                  resolution === 'no'
                    ? 'bg-white text-white shadow-lg shadow-red-500/30'
                    : 'bg-black text-white/70 hover:bg-yellow-400/10'
                }`}
              >
                <XCircle className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">NO</p>
                  <p className="text-sm opacity-80">The market outcome is NO</p>
                </div>
              </button>

              <button
                onClick={() => setResolution('invalid')}
                className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all ${
                  resolution === 'invalid'
                    ? 'bg-slate-500 text-white shadow-lg shadow-slate-500/30'
                    : 'bg-black text-white/70 hover:bg-yellow-400/10'
                }`}
              >
                <AlertTriangle className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">INVALID</p>
                  <p className="text-sm opacity-80">Refund all participants</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm">
              <span className="font-semibold">Warning:</span> This action cannot be undone.
              {resolution === 'invalid'
                ? ' All bets will be refunded.'
                : ' Winnings will be distributed to the winning side.'}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-black hover:bg-yellow-400/10 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleResolve}
              disabled={loading}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resolving...' : 'Resolve Market'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
