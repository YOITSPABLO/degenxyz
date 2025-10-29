import { Wallet } from 'lucide-react';
import { shortenAddress } from '../lib/web3';

interface HeaderProps {
  walletAddress: string | null;
  balance: string;
  onConnect: () => void;
}

export function Header({ walletAddress, balance, onConnect }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-yellow-500/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src="/degen_.png" alt="degen.xyz" className="w-10 h-10 sm:w-12 sm:h-12" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold gradient-text retro-font">degen.xyz</h1>
              <p className="text-xs text-white/60 hidden sm:block">Powered by BNB Chain</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="hidden lg:block text-right bg-black/50 rounded-lg px-4 py-2 border border-yellow-500/30">
                  <p className="text-xs text-white/60">Balance</p>
                  <p className="text-white font-semibold">{balance} BNB</p>
                </div>
                <div className="bg-yellow-400 p-0.5 rounded-lg sm:rounded-xl">
                  <div className="bg-black rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-4 sm:py-2">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-white font-medium text-xs sm:text-base">
                        {shortenAddress(walletAddress)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center space-x-1 sm:space-x-2 transition-all shadow-lg shadow-yellow-500/50 text-sm sm:text-base"
              >
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline sm:inline">Connect</span>
                <span className="hidden sm:inline">Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
