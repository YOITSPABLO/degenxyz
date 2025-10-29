import { DollarSign, AlertCircle, Wallet, TrendingUp } from 'lucide-react';

export function TaxStructure() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold gradient-text mb-6">Fee & Tax Structure</h1>

      <p className="text-lg text-white/70 leading-relaxed mb-8">
        degen.xyz implements a fair and transparent fee structure to support platform development,
        market integrity, and community rewards.
      </p>

      <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-xl p-6 mb-12">
        <div className="flex items-start space-x-3">
          <DollarSign className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Zero Fees for DEGEN Markets</h3>
            <p className="text-white/70 mb-0">
              Markets using $DEGEN tokens have absolutely zero trading fees. This is our commitment
              to rewarding token holders and encouraging ecosystem growth.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Trading Fees</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-0">DEGEN Markets</h3>
          </div>
          <p className="text-3xl font-bold text-green-400 mb-2">0% Fee</p>
          <p className="text-white/70 text-sm">
            Any market using $DEGEN tokens for betting has zero trading fees. Buy, sell, and win
            without any platform commission.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-yellow-400/30/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-0">Other Markets</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-400 mb-2">2% Fee</p>
          <p className="text-white/70 text-sm">
            Markets using BNB or other tokens have a 2% trading fee: 1% goes to the market creator and 1% supports platform development.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Market Creation Fee</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-3">0.02 BNB Creation Fee</h3>
            <p className="text-white/70 mb-4">
              Anyone can create a prediction market by paying a one-time fee of 0.02 BNB. This fee
              helps prevent spam and ensures quality market creation.
            </p>
            <div className="bg-black/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-white/60 mb-2">Fee Distribution:</p>
              <ul className="text-sm text-white/70 space-y-2">
                <li className="flex items-center justify-between">
                  <span>• Platform Development</span>
                  <span className="text-yellow-400 font-semibold">40%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Marketing & Growth</span>
                  <span className="text-yellow-400 font-semibold">30%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Liquidity & Rewards Pool</span>
                  <span className="text-yellow-400 font-semibold">30%</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-yellow-400 font-semibold">
              Note: Market creators earn 1% of all trading fees from non-DEGEN markets they create as an incentive for quality market creation.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Tax Wallet Information</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Platform Fee Wallet</h3>
        <div className="bg-black/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-white/60 mb-2">Wallet Address</p>
          <code className="text-white font-mono text-sm break-all">
            0x4e2899227205b476001c339ee360e02c61807834
          </code>
        </div>
        <p className="text-white/70 text-sm">
          All platform fees are collected in this transparent, publicly visible wallet. Fees accumulated go towards project development and team compensation. All transactions are verifiable on BscScan.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Token Tax Structure</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <p className="text-white/70 mb-4">
          The $DEGEN token itself has a tax structure on buys and sells to support ecosystem growth:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Buy Tax: TBA%</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Marketing: TBA%</li>
              <li>• Development: TBA%</li>
              <li>• Liquidity: TBA%</li>
            </ul>
          </div>

          <div className="bg-black/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Sell Tax: TBA%</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Marketing: TBA%</li>
              <li>• Development: TBA%</li>
              <li>• Liquidity: TBA%</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-300 mb-0">
            <strong>Note:</strong> Final tax percentages will be announced before the four.meme
            launch. All taxes are used exclusively for project development and growth.
          </p>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mt-12">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Important Notes</h3>
            <ul className="text-white/70 space-y-2">
              <li>
                • All fees are transparent and verifiable on-chain through BscScan
              </li>
              <li>
                • Fee structures may be adjusted through community governance in the future
              </li>
              <li>
                • Market creation fees are non-refundable, even if the market is cancelled
              </li>
              <li>
                • Token taxes apply to $DEGEN transactions on DEXs, not platform trading
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
