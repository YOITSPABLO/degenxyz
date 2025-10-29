import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, BarChart3, Twitter, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Hero() {
  const [stats, setStats] = useState({
    totalVolume: 0,
    activeMarkets: 0,
    totalTraders: 0,
    totalBets: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [marketsResult, betsResult, tradersResult] = await Promise.all([
        supabase.from('markets').select('total_volume, status'),
        supabase.from('bets').select('id', { count: 'exact', head: true }),
        supabase.from('user_profiles').select('wallet_address', { count: 'exact', head: true }),
      ]);

      const totalVolume = (marketsResult.data || []).reduce(
        (sum, m) => sum + m.total_volume,
        0
      );
      const activeMarkets = (marketsResult.data || []).filter(
        (m) => m.status === 'open'
      ).length;

      setStats({
        totalVolume,
        activeMarkets,
        totalTraders: tradersResult.count || 0,
        totalBets: betsResult.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="relative overflow-hidden bg-black border-b border-yellow-500/30">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/IMAGE 2025-10-29 16:34:06.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text retro-font">degen.xyz</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto mb-3 sm:mb-4 px-2">
            Trade on real-world events with zero fees using DEGEN tokens
          </p>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto px-2 mb-4 sm:mb-6">
            A decentralized prediction market on BNB Chain where collective intelligence meets DeFi
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 sm:mt-6">
            <a
              href="https://x.com/degenx_yz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/80 backdrop-blur-md border-2 border-yellow-400/30 hover:border-yellow-400 rounded-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2 transition-all group"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold text-sm sm:text-base">Follow Us</span>
            </a>
            <a
              href="https://github.com/YOITSPABLO/degenxyz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/80 backdrop-blur-md border-2 border-yellow-400/30 hover:border-yellow-400 rounded-lg px-4 sm:px-6 py-2 sm:py-3 flex items-center space-x-2 transition-all group"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold text-sm sm:text-base">GitHub</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-yellow-400 glow-effect">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-400 mb-2 sm:mb-4 mx-auto">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                {stats.totalVolume.toFixed(2)}
              </p>
              <p className="text-xs sm:text-sm text-white/70">Total Volume (BNB)</p>
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-yellow-400 glow-effect">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-400 mb-2 sm:mb-4 mx-auto">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{stats.activeMarkets}</p>
              <p className="text-xs sm:text-sm text-white/70">Active Markets</p>
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-yellow-400 glow-effect">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-400 mb-2 sm:mb-4 mx-auto">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{stats.totalTraders}</p>
              <p className="text-xs sm:text-sm text-white/70">Total Traders</p>
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-yellow-400 glow-effect">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-400 mb-2 sm:mb-4 mx-auto">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{stats.totalBets}</p>
              <p className="text-xs sm:text-sm text-white/70">Total Predictions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
