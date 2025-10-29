import { TrendingUp, Target, Users, Zap } from 'lucide-react';

export function Introduction() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold gradient-text mb-6">Welcome to degen.xyz</h1>

      <div className="bg-yellow-400/10 border-2 border-yellow-400/30 rounded-xl p-6 mb-8">
        <p className="text-lg text-white/90 leading-relaxed mb-0">
          degen.xyz is a decentralized prediction market platform on BNB Chain where collective
          intelligence meets DeFi. Trade on real-world events with zero fees using $DEGEN tokens.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">What is degen.xyz?</h2>

      <p className="text-white/80 leading-relaxed mb-6">
        degen.xyz transforms collective human behavior into predictive insights. Our platform
        observes how people interact, learns from behavioral signals, and transforms activity into
        clear, predictive understanding. By leveraging the wisdom of crowds, we create a living
        network of intelligence that makes accurate predictions accessible to everyone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="bg-black rounded-xl p-6 border-2 border-yellow-400/30">
          <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Predictive Intelligence</h3>
          <p className="text-white/70">
            Harness the collective wisdom of thousands of traders to forecast outcomes on crypto,
            sports, politics, and more.
          </p>
        </div>

        <div className="bg-black rounded-xl p-6 border-2 border-yellow-400/30">
          <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Zero Fee Trading</h3>
          <p className="text-white/70">
            Trade on markets using $DEGEN tokens with absolutely no trading fees. Non-DEGEN markets have a 2% fee: 1% to the market creator, 1% to the platform.
          </p>
        </div>

        <div className="bg-black rounded-xl p-6 border-2 border-yellow-400/30">
          <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Transparent & Fair</h3>
          <p className="text-white/70">
            All trades are executed on-chain with transparent smart contracts. No manipulation, no
            central authority.
          </p>
        </div>

        <div className="bg-black rounded-xl p-6 border-2 border-yellow-400/30">
          <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Community Driven</h3>
          <p className="text-white/70">
            Anyone can create markets and participate. Rewards flow to users who contribute
            accurate insights.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Key Features</h2>

      <ul className="space-y-4 text-white/80">
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
          <div>
            <strong className="text-white">Automated Market Maker (AMM):</strong> Dynamic pricing
            based on supply and demand ensures fair market odds
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
          <div>
            <strong className="text-white">Instant Settlement:</strong> Winners receive payouts
            immediately after market resolution
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
          <div>
            <strong className="text-white">Multiple Categories:</strong> Trade on crypto, sports,
            politics, entertainment, and custom events
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
          <div>
            <strong className="text-white">Real-time Data:</strong> Live market updates, trending
            markets, and activity feeds
          </div>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
          <div>
            <strong className="text-white">Leaderboard System:</strong> Track top traders and
            compete for community recognition
          </div>
        </li>
      </ul>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mt-12">
        <h3 className="text-xl font-bold text-yellow-400 mb-3">⚠️ Important Disclaimer</h3>
        <p className="text-white/80 mb-0">
          Crypto betting involves financial risk. There are no profit guarantees. Users are
          responsible for understanding and complying with their local laws. All transactions are
          processed on-chain and are irreversible. Trade responsibly and never risk more than you
          can afford to lose.
        </p>
      </div>
    </div>
  );
}
