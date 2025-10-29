import { Github, Twitter, Send, BookOpen, TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t-2 border-yellow-400 mt-8 sm:mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <img src="/degen_.png" alt="degen.xyz" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-bold gradient-text retro-font">degen.xyz</span>
            </div>
            <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-6 max-w-md">
              A decentralized prediction market platform on BNB Chain. Trade on real-world events
              with zero fees using DEGEN tokens.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://twitter.com/betify"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black border-2 border-yellow-400/30 hover:border-yellow-400 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 hover:text-yellow-400" />
              </a>
              <a
                href="https://t.me/coinsult_tg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black border-2 border-yellow-400/30 hover:border-yellow-400 flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 hover:text-yellow-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black border-2 border-yellow-400/30 hover:border-yellow-400 flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 hover:text-yellow-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold text-sm sm:text-base mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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
            <h3 className="text-yellow-400 font-semibold text-sm sm:text-base mb-3 sm:mb-4">Platform</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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

        <div className="border-t border-yellow-400/30 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <p className="text-white/50 text-xs sm:text-sm text-center md:text-left">
              © 2024 degen.xyz. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
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
          <p className="text-white/50 text-xs sm:text-sm mt-3 sm:mt-4 text-center md:text-left px-2">
            ⚠️ Crypto betting involves financial risk. Trade responsibly. No profit guarantees.
          </p>
        </div>
      </div>
    </footer>
  );
}
