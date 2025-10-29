import { useState } from 'react';
import { Menu, X, ChevronRight, Home } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface DocsLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  walletAddress: string | null;
  balance: string;
  onConnect: () => void;
}

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    id: 'home',
    title: 'Introduction',
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    children: [
      { id: 'connect-wallet', title: 'Connect Your Wallet' },
      { id: 'buy-degen', title: 'Buy $DEGEN on four.meme' },
      { id: 'first-bet', title: 'Place Your First Bet' },
    ],
  },
  {
    id: 'tokenomics',
    title: 'Tokenomics',
    children: [
      { id: 'token-overview', title: 'Token Overview' },
      { id: 'distribution', title: 'Distribution' },
      { id: 'utility', title: 'Utility & Benefits' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform Mechanics',
    children: [
      { id: 'how-it-works', title: 'How It Works' },
      { id: 'market-creation', title: 'Creating Markets' },
      { id: 'betting', title: 'Placing Bets' },
      { id: 'resolution', title: 'Market Resolution' },
      { id: 'fees', title: 'Fee & Tax Structure' },
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
  },
  {
    id: 'risks',
    title: 'Risk Disclaimer',
  },
];

export function DocsLayout({ children, currentPage, onNavigate, walletAddress, balance, onConnect }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header walletAddress={walletAddress} balance={balance} onConnect={onConnect} />

      <div className="flex-1 flex">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-black border-r-2 border-yellow-400 transition-transform duration-300 overflow-y-auto pt-20 lg:pt-0`}
        >
          <div className="p-6">
            <button
              onClick={() => {
                onNavigate('home');
                setSidebarOpen(false);
              }}
              className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-500 mb-6 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Back to Platform</span>
            </button>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-yellow-400 text-black font-bold'
                        : 'text-white hover:bg-yellow-400/10 hover:text-yellow-400'
                    }`}
                  >
                    {item.title}
                  </button>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            onNavigate(child.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                            currentPage === child.id
                              ? 'bg-yellow-400/20 text-yellow-400'
                              : 'text-white/60 hover:bg-yellow-400/5 hover:text-white'
                          }`}
                        >
                          <ChevronRight className="w-3 h-3" />
                          <span>{child.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
        </button>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
