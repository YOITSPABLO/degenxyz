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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img src="/degen_.png" alt="degen.xyz" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold gradient-text retro-font">degen.xyz</h1>
              <p className="text-xs text-white/60">Powered by BNB Chain</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right bg-black/50 rounded-lg px-4 py-2 border border-yellow-500/30">
                  <p className="text-xs text-white/60">Balance</p>
                  <p className="text-white font-semibold">{balance} BNB</p>
                </div>
                <div className="bg-yellow-400 p-0.5 rounded-xl">
                  <div className="bg-black rounded-xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">
                        {shortenAddress(walletAddress)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-yellow-500/50"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
