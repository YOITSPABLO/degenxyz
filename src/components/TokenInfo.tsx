import { Coins, ExternalLink, Copy, Check, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function TokenInfo() {
  const [copied, setCopied] = useState(false);
  const contractAddress = 'TBA - Post Launch';

  const handleCopy = () => {
    if (contractAddress !== 'TBA - Post Launch') {
      navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-black rounded-2xl p-8 border-2 border-yellow-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-400/5" />
      <div className="relative">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-400">
            <Coins className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">$DEGEN Token</h2>
            <p className="text-sm text-white/60">degen.xyz • BNB Chain</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-black rounded-xl p-4 border border-yellow-400/30">
            <p className="text-sm text-white/60 mb-2">Contract Address</p>
            <div className="flex items-center justify-between">
              <code className="text-white font-mono text-sm break-all pr-4">
                {contractAddress}
              </code>
              <button
                onClick={handleCopy}
                disabled={contractAddress === 'TBA - Post Launch'}
                className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                  contractAddress === 'TBA - Post Launch'
                    ? 'bg-black border border-yellow-400/20 text-white/40 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/30 mb-4">
            <div className="flex items-start space-x-3">
              <Coins className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Launching on four.meme</p>
                <p className="text-sm text-white/70 mb-3">
                  $DEGEN will launch on four.meme, the premier meme token launchpad on BNB Chain
                </p>
                <a
                  href="https://www.four.meme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <span>Visit four.meme</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black rounded-xl p-4 border border-yellow-400/30">
              <p className="text-sm text-white/60 mb-1">Network</p>
              <p className="text-white font-semibold">BNB Chain</p>
            </div>
            <div className="bg-black rounded-xl p-4 border border-yellow-400/30">
              <p className="text-sm text-white/60 mb-1">Trading Fee</p>
              <p className="text-yellow-400 font-semibold">0% on DEGEN markets</p>
            </div>
          </div>

          <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/30">
            <div className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Documentation</p>
                <p className="text-sm text-white/70 mb-3">
                  Read our docs to understand tokenomics, platform mechanics, and how to get started
                </p>
                <button
                  onClick={() => window.location.href = '#docs'}
                  className="inline-flex items-center space-x-2 text-sm text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <span>View Documentation</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-yellow-400/30">
          <h3 className="text-yellow-400 font-semibold mb-3">Key Benefits</h3>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-white/70">Zero trading fees on all DEGEN token markets</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-white/70">Fast and secure transactions on BNB Chain</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-white/70">Transparent and auditable smart contracts</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <p className="text-sm text-white/70">Community-driven governance and development</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
