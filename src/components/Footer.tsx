import { Github, Twitter, Send, BookOpen, TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t-2 border-yellow-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/degen_.png" alt="degen.xyz" className="w-10 h-10" />
              <span className="text-2xl font-bold gradient-text retro-font">degen.xyz</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              A decentralized prediction market platform on BNB Chain. Trade on real-world events
              with zero fees using DEGEN tokens.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/betify"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-black border-2 border-yellow-400/30 hover:border-yellow-400 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white/60 hover:text-yellow-400" />
              </a>
              <a
                href="https://t.me/coinsult_tg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-black border-2 border-yellow-400/30 hover:border-yellow-400 flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 text-white/60 hover:text-yellow-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-black border-2 border-yellow-400/30 hover:border-yellow-400 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-white/60 hover:text-yellow-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://betify-bnb.gitbook.io/betify-whitepaper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-yellow-400 transition-colors flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Whitepaper</span>
                </a>
              </li>
              <li>
                <a
                  href="https://betify.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-yellow-400 transition-colors"
                >
                  Official Website
                </a>
              </li>
              <li>
                <a
                  href="https://bscscan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-yellow-400 transition-colors"
                >
                  BscScan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-white/70">Network: BNB Chain</span>
              </li>
              <li>
                <span className="text-white/70">Token: $DEGEN</span>
              </li>
              <li>
                <span className="text-white/70">Fee: 0% (DEGEN) / 2% (1% creator, 1% platform)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-400/30 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-sm">
              © 2024 degen.xyz. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                Risk Disclaimer
              </a>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-4 text-center md:text-left">
            ⚠️ Crypto betting involves financial risk. Trade responsibly. No profit guarantees.
          </p>
        </div>
      </div>
    </footer>
  );
}
