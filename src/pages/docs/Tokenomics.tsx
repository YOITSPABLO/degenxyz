import { Coins, PieChart, Zap, Lock } from 'lucide-react';

export function Tokenomics() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold gradient-text mb-6">$DEGEN Tokenomics</h1>

      <p className="text-lg text-white/70 leading-relaxed mb-8">
        $DEGEN is the native utility token of the degen.xyz platform, designed to incentivize
        participation and reward accurate predictions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <Coins className="w-8 h-8 text-yellow-400" />
            <h3 className="text-xl font-bold text-white mb-0">Token Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Name</span>
              <span className="text-white font-semibold">DEGEN</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Symbol</span>
              <span className="text-white font-semibold">$DEGEN</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Network</span>
              <span className="text-white font-semibold">BNB Chain</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Standard</span>
              <span className="text-white font-semibold">BEP-20</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-yellow-400/30/50">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h3 className="text-xl font-bold text-white mb-0">Key Benefits</h3>
          </div>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-yellow-400 mt-1">✓</span>
              <span>Zero trading fees on all DEGEN markets</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-400 mt-1">✓</span>
              <span>Lower barrier to entry for traders</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-400 mt-1">✓</span>
              <span>Governance rights (future)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-400 mt-1">✓</span>
              <span>Premium features access</span>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Distribution</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <PieChart className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white mb-0">Token Allocation</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 font-semibold">Public Sale (four.meme)</span>
              <span className="text-yellow-400 font-bold">95%</span>
            </div>
            <div className="h-3 bg-black rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500" style={{ width: '95%' }} />
            </div>
            <p className="text-sm text-white/60 mt-2">
              Fair launch on four.meme platform accessible to all participants. Maximum distribution to the community.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 font-semibold">Platform Rewards</span>
              <span className="text-yellow-400 font-bold">5%</span>
            </div>
            <div className="h-3 bg-black rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500" style={{ width: '5%' }} />
            </div>
            <p className="text-sm text-white/60 mt-2">
              Incentives for traders, market creators, and active participants
            </p>
          </div>
        </div>

        <div className="bg-yellow-400/10 border border-cyan-500/20 rounded-lg p-4 mt-6">
          <p className="text-sm text-cyan-300 mb-0">
            <strong>Note:</strong> All fees accumulated from platform operations go towards project development and team compensation. No tokens are allocated to team or development upfront.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Utility & Use Cases</h2>

      <div className="space-y-4">
        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <h3 className="text-xl font-bold text-white mb-3">Zero Fee Trading</h3>
          <p className="text-white/70 mb-0">
            All prediction markets using $DEGEN as the trading currency have zero fees, making it
            the most cost-effective way to trade on the platform. This encourages higher trading
            volumes and better price discovery.
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <h3 className="text-xl font-bold text-white mb-3">Market Creation</h3>
          <p className="text-white/70 mb-0">
            Users can create custom prediction markets on any topic. Market creators who use $DEGEN
            markets attract more traders due to the zero-fee advantage.
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <h3 className="text-xl font-bold text-white mb-3">Governance (Coming Soon)</h3>
          <p className="text-white/70 mb-0">
            $DEGEN holders will be able to vote on platform upgrades, new features, and fee
            structures through decentralized governance.
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <h3 className="text-xl font-bold text-white mb-3">Staking Rewards (Coming Soon)</h3>
          <p className="text-white/70 mb-0">
            Stake $DEGEN to earn a share of platform fees from non-DEGEN markets and receive
            exclusive perks like early access to new markets.
          </p>
        </div>
      </div>

      <div className="bg-yellow-400/10 border border-green-500/20 rounded-xl p-6 mt-12">
        <div className="flex items-start space-x-3">
          <Lock className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-3">Security & Transparency</h3>
            <ul className="text-white/70 space-y-2">
              <li>• 95% of tokens distributed to public - maximum community ownership</li>
              <li>• Smart contracts audited by reputable firms</li>
              <li>• No team token allocation - team funded through platform fees</li>
              <li>• All transactions verifiable on-chain</li>
              <li>• No hidden minting capabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
