import { CheckCircle, XCircle, AlertTriangle, Users, Shield } from 'lucide-react';

export function MarketResolution() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold gradient-text mb-6">Market Resolution</h1>

      <p className="text-lg text-white/70 leading-relaxed mb-8">
        Market resolution is the process of determining the final outcome of a prediction market.
        Accurate and fair resolution is crucial for maintaining platform integrity and user trust.
      </p>

      <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-xl p-6 mb-12">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Resolution Principle</h3>
            <p className="text-white/70 mb-0">
              Markets are resolved based on verifiable, objective information from trusted sources.
              The market creator is initially responsible for resolution, with community oversight
              and future decentralized oracle integration planned.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Who Resolves Markets?</h2>

      <div className="space-y-4 mb-12">
        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <h3 className="text-xl font-bold text-white mb-3">Phase 1: Creator Resolution (Current)</h3>
          <p className="text-white/70 mb-4">
            The market creator is responsible for resolving their markets once the event outcome is
            known. Creators must resolve markets honestly based on verifiable facts.
          </p>
          <div className="bg-black/50 rounded-lg p-4">
            <p className="text-sm text-white/60 mb-2">Why creator resolution?</p>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Creators have the most context about their market's resolution criteria</li>
              <li>• Fast resolution times benefit all participants</li>
              <li>• Creator reputation system incentivizes honest behavior</li>
              <li>• Community can report dishonest resolutions</li>
            </ul>
          </div>
        </div>

        <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50">
          <h3 className="text-xl font-bold text-white mb-3">Phase 2: Decentralized Oracles (Coming Soon)</h3>
          <p className="text-white/70 mb-0">
            Future versions will integrate decentralized oracle solutions like Chainlink or UMA to
            enable trustless, automated market resolution for standard event types.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Resolution Outcomes</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 mx-auto">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 text-center">YES</h3>
          <p className="text-white/70 text-sm text-center">
            The event occurred as described. All YES position holders win and can claim their share
            of the total pool.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 mb-4 mx-auto">
            <XCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 text-center">NO</h3>
          <p className="text-white/70 text-sm text-center">
            The event did not occur as described. All NO position holders win and can claim their
            share of the total pool.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 mb-4 mx-auto">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 text-center">INVALID</h3>
          <p className="text-white/70 text-sm text-center">
            The market cannot be fairly resolved. All participants receive their original bets back.
            No one wins or loses.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">When to Mark Invalid</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <p className="text-white/70 mb-4">
          Markets should be resolved as INVALID in these situations:
        </p>
        <ul className="text-white/70 space-y-3">
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
            <div>
              <strong className="text-white">Ambiguous Outcome:</strong> The event occurred but
              doesn't clearly match YES or NO criteria
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
            <div>
              <strong className="text-white">Event Cancelled:</strong> The event was cancelled or
              postponed indefinitely before resolution
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
            <div>
              <strong className="text-white">Unclear Criteria:</strong> The market description was
              too vague to determine a clear outcome
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
            <div>
              <strong className="text-white">No Reliable Source:</strong> No trustworthy source can
              confirm the outcome
            </div>
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Resolution Timeline</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center font-bold text-white flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">Market Closes</h4>
              <p className="text-white/70 text-sm">
                When the end date is reached, the market automatically closes and no more bets can
                be placed.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center font-bold text-white flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">Outcome Determined</h4>
              <p className="text-white/70 text-sm">
                The real-world event occurs and the outcome becomes known through reliable sources.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center font-bold text-white flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">Creator Resolves</h4>
              <p className="text-white/70 text-sm mb-2">
                The market creator selects YES, NO, or INVALID based on the verified outcome.
              </p>
              <p className="text-xs text-white/60 italic">
                Best practice: Resolve within 24-48 hours of outcome confirmation
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center font-bold text-white flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">Winners Claim Payouts</h4>
              <p className="text-white/70 text-sm">
                Winning position holders can immediately claim their share of the pool through their
                portfolio page.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">Creator Reputation System</h2>

      <div className="bg-black/50 rounded-xl p-6 border border-yellow-400/30/50 mb-8">
        <div className="flex items-start space-x-4">
          <Users className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-white/70 mb-4">
              Market creators build reputation based on their resolution history. Users can see a
              creator's track record before participating in their markets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/50 rounded-lg p-4">
                <p className="text-sm text-white/60 mb-1">Total Markets</p>
                <p className="text-white font-semibold">Created & Resolved</p>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <p className="text-sm text-white/60 mb-1">Resolution Rate</p>
                <p className="text-white font-semibold">Timely vs Delayed</p>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <p className="text-sm text-white/60 mb-1">Community Reports</p>
                <p className="text-white font-semibold">Disputes Filed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mt-12">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Dispute Resolution</h3>
            <p className="text-white/70 mb-3">
              If you believe a market was resolved incorrectly, you can report it to the team
              through our community channels. Include:
            </p>
            <ul className="text-white/70 space-y-1 text-sm">
              <li>• Market ID and title</li>
              <li>• Evidence supporting the correct outcome</li>
              <li>• Links to reliable sources</li>
            </ul>
            <p className="text-white/70 mt-3 text-sm">
              The team will review disputes and may override incorrect resolutions. Repeat offenders
              may be restricted from creating markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
