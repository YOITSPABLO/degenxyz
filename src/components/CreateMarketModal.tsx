import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CreateMarketModalProps {
  walletAddress: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateMarketModal({ walletAddress, onClose, onSuccess }: CreateMarketModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('crypto');
  const [endDate, setEndDate] = useState('');
  const [useDegenToken, setUseDegenToken] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('markets').insert({
        title,
        description,
        category,
        creator_address: walletAddress,
        is_degen_market: useDegenToken,
        fee_percentage: useDegenToken ? 0 : 2,
        end_date: new Date(endDate).toISOString(),
      });

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating market:', error);
      alert('Failed to create market');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-black rounded-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-yellow-400/30 flex items-center justify-between sticky top-0 bg-black z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Market</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white flex-shrink-0">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Market Question
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Will BTC reach $100k by end of 2025?"
              required
              className="w-full bg-black border border-slate-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the market resolution criteria..."
              rows={4}
              required
              className="w-full bg-black border border-slate-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="crypto">Crypto</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                End Date
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="bg-black rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={useDegenToken}
                onChange={(e) => setUseDegenToken(e.target.checked)}
                id="useDegenToken"
                className="mt-1 w-5 h-5 text-yellow-400 bg-slate-600 border-slate-500 rounded focus:ring-yellow-400"
              />
              <div className="flex-1">
                <label htmlFor="useDegenToken" className="text-white font-medium cursor-pointer">
                  Use DEGEN Native Token
                </label>
                <p className="text-sm text-white/60 mt-1">
                  {useDegenToken ? (
                    <span className="text-yellow-400">✓ Zero fees on this market</span>
                  ) : (
                    <span className="text-yellow-400">2% fee (1% to you, 1% to platform)</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <p className="text-sm text-cyan-300 font-semibold mb-1">Creation Fee: 0.02 BNB</p>
            <p className="text-xs text-white/60">
              A one-time fee of 0.02 BNB is required to create a market. This helps prevent spam
              and supports platform development.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-black hover:bg-yellow-400/10 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              <span>{loading ? 'Creating...' : 'Create Market'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
