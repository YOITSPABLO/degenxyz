import { useEffect, useState } from 'react';
import { Activity, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Bet, supabase } from '../lib/supabase';
import { shortenAddress } from '../lib/web3';

interface RecentActivityProps {
  limit?: number;
}

export function RecentActivity({ limit = 10 }: RecentActivityProps) {
  const [recentBets, setRecentBets] = useState<(Bet & { market: { title: string } })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();

    const channel = supabase
      .channel('bets_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bets',
        },
        () => {
          loadActivity();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  const loadActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('bets')
        .select('*, market:markets(title)')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setRecentBets(data as any || []);
    } catch (error) {
      console.error('Error loading activity:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
        <p className="text-white/60 text-center">Loading activity...</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-xl border-2 border-yellow-400 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-yellow-400">Recent Activity</h2>
      </div>

      <div className="space-y-2">
        {recentBets.length > 0 ? (
          recentBets.map((bet) => (
            <div
              key={bet.id}
              className="bg-black border border-yellow-400/30 rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                {bet.position === 'yes' ? (
                  <ArrowUpCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                ) : (
                  <ArrowDownCircle className="w-5 h-5 text-white flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {bet.market?.title || 'Unknown Market'}
                  </p>
                  <p className="text-xs text-white/60">
                    {shortenAddress(bet.user_address)} •{' '}
                    <span className={bet.position === 'yes' ? 'text-yellow-400' : 'text-white'}>
                      {bet.position.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-white font-semibold text-sm">{bet.amount.toFixed(2)} BNB</p>
                <p className="text-xs text-white/60">
                  {new Date(bet.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/60 text-center py-4">No recent activity</p>
        )}
      </div>
    </div>
  );
}
