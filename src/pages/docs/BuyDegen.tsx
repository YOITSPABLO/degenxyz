import { ExternalLink, Coins, Wallet, ArrowRight } from 'lucide-react';

export function BuyDegen() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold gradient-text mb-6">Buy $DEGEN on four.meme</h1>

      <p className="text-lg text-white/70 leading-relaxed mb-8">
        $DEGEN is launching on four.meme, the premier meme token launchpad on BNB Chain. Follow this
        guide to purchase $DEGEN tokens and start trading with zero fees on degen.xyz.
      </p>

      <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Coins className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Why four.meme?</h3>
            <p className="text-white/70 mb-0">
              four.meme is a trusted launchpad on BNB Chain that ensures fair launches, liquidity
              locking, and transparent tokenomics. All tokens launched on four.meme undergo thorough
              vetting to protect investors.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Step-by-Step Guide</h2>

      <div className="space-y-6">
        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center font-bold text-white">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Set Up Your Wallet</h3>
          </div>
          <p className="text-white/70 mb-4">
            Install MetaMask or Trust Wallet browser extension. Make sure you're connected to BNB
            Smart Chain network.
          </p>
          <div className="bg-black/50 rounded-lg p-4">
            <p className="text-sm text-white/60 mb-2">Network Details:</p>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Network Name: BNB Smart Chain</li>
              <li>• Chain ID: 56</li>
              <li>• RPC URL: https://bsc-dataseed.binance.org/</li>
              <li>• Currency Symbol: BNB</li>
            </ul>
          </div>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center font-bold text-white">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Get BNB</h3>
          </div>
          <p className="text-white/70 mb-4">
            You'll need BNB to purchase $DEGEN tokens. Buy BNB from any major exchange like
            Binance, Coinbase, or directly through your wallet.
          </p>
          <p className="text-sm text-white/60">
            Recommended amount: At least 0.1 BNB to cover token purchase and gas fees.
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center font-bold text-white">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Visit four.meme</h3>
          </div>
          <p className="text-white/70 mb-4">
            Navigate to the four.meme platform and find the $DEGEN token listing.
          </p>
          <a
            href="https://www.four.meme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/25"
          >
            <span>Go to four.meme</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center font-bold text-white">
              4
            </div>
            <h3 className="text-xl font-bold text-white">Connect & Buy</h3>
          </div>
          <p className="text-white/70 mb-4">
            Connect your wallet to four.meme, enter the amount of BNB you want to spend, and confirm
            the transaction. Your $DEGEN tokens will be sent directly to your wallet.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <p className="text-sm text-yellow-300 mb-0">
              <strong>Tip:</strong> Always check the contract address before buying. The official
              $DEGEN contract will be listed on our token info page after launch.
            </p>
          </div>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center font-bold text-white">
              5
            </div>
            <h3 className="text-xl font-bold text-white">Start Trading</h3>
          </div>
          <p className="text-white/70 mb-4">
            Once you have $DEGEN tokens, return to degen.xyz and start trading on prediction
            markets with zero fees!
          </p>
          <div className="flex items-center space-x-2 text-yellow-400">
            <span className="text-sm font-semibold">Ready to trade?</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mt-12">
        <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
        <p className="text-white/70 mb-4">
          If you encounter any issues or have questions about buying $DEGEN, join our community:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://t.me/coinsult_tg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-black hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>Telegram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com/betify"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-black hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>Twitter</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
