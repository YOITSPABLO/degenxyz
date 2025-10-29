import { useState, useEffect } from 'react';
import { Plus, Filter, BookOpen } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TokenInfo } from './components/TokenInfo';
import { Footer } from './components/Footer';
import { MarketCard } from './components/MarketCard';
import { CreateMarketModal } from './components/CreateMarketModal';
import { MarketDetailsModal } from './components/MarketDetailsModal';
import { BettingModal } from './components/BettingModal';
import { ResolveMarketModal } from './components/ResolveMarketModal';
import { UserPortfolio } from './components/UserPortfolio';
import { TrendingMarkets } from './components/TrendingMarkets';
import { SearchBar } from './components/SearchBar';
import { Leaderboard } from './components/Leaderboard';
import { RecentActivity } from './components/RecentActivity';
import { DocsLayout } from './pages/DocsLayout';
import { Introduction } from './pages/docs/Introduction';
import { BuyDegen } from './pages/docs/BuyDegen';
import { Tokenomics } from './pages/docs/Tokenomics';
import { TaxStructure } from './pages/docs/TaxStructure';
import { MarketResolution } from './pages/docs/MarketResolution';
import { FAQ } from './pages/docs/FAQ';
import { Market, supabase } from './lib/supabase';
import { connectWallet, getBalance } from './lib/web3';

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0.00');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'markets' | 'portfolio'>('markets');
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarkets();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    filterMarkets();
  }, [markets, selectedCategory, selectedStatus, searchQuery]);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setWalletAddress(null);
      setBalance('0.00');
    } else {
      setWalletAddress(accounts[0]);
      loadBalance(accounts[0]);
    }
  };

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      loadBalance(address);
    }
  };

  const loadBalance = async (address: string) => {
    const bal = await getBalance(address);
    setBalance(bal);
  };

  const loadMarkets = async () => {
    try {
      const { data, error } = await supabase
        .from('markets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMarkets(data || []);
    } catch (error) {
      console.error('Error loading markets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMarkets = () => {
    let filtered = markets;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter((m) => m.status === selectedStatus);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.category.toLowerCase().includes(query)
      );
    }

    setFilteredMarkets(filtered);
  };

  const handleMarketClick = (market: Market) => {
    setSelectedMarket(market);
  };

  const handleCloseDetails = () => {
    setSelectedMarket(null);
    setShowBettingModal(false);
    setShowResolveModal(false);
  };

  const handleBetClick = () => {
    setShowBettingModal(true);
  };

  const handleResolveClick = () => {
    setShowResolveModal(true);
  };

  const handleSuccess = () => {
    loadMarkets();
    if (walletAddress) {
      loadBalance(walletAddress);
    }
  };

  const categories = ['all', 'crypto', 'sports', 'politics', 'entertainment', 'other'];
  const statuses = ['all', 'open', 'closed', 'resolved'];

  const renderDocsPage = () => {
    switch (currentPage) {
      case 'home':
      case 'getting-started':
        return <Introduction />;
      case 'buy-degen':
        return <BuyDegen />;
      case 'tokenomics':
      case 'token-overview':
      case 'distribution':
      case 'utility':
        return <Tokenomics />;
      case 'fees':
        return <TaxStructure />;
      case 'resolution':
        return <MarketResolution />;
      case 'faq':
        return <FAQ />;
      default:
        return <Introduction />;
    }
  };

  if (currentPage !== 'home' && !currentPage.startsWith('markets') && !currentPage.startsWith('portfolio')) {
    return (
      <DocsLayout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        walletAddress={walletAddress}
        balance={balance}
        onConnect={handleConnect}
      >
        {renderDocsPage()}
      </DocsLayout>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header walletAddress={walletAddress} balance={balance} onConnect={handleConnect} />
      <Hero />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveTab('markets')}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'markets'
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-black border-2 border-yellow-400/30 text-white hover:border-yellow-400'
                }`}
              >
                Markets
              </button>
              {walletAddress && (
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all text-sm sm:text-base whitespace-nowrap ${
                    activeTab === 'portfolio'
                      ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/50'
                      : 'bg-black border-2 border-yellow-400/30 text-white hover:border-yellow-400'
                  }`}
                >
                  Portfolio
                </button>
              )}
              <button
                onClick={() => setCurrentPage('getting-started')}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold transition-all bg-black border-2 border-yellow-400/30 text-white hover:border-yellow-400 flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Docs</span>
              </button>
            </div>

            {walletAddress && activeTab === 'markets' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl flex items-center space-x-1.5 sm:space-x-2 transition-all shadow-lg shadow-yellow-500/50 text-sm sm:text-base whitespace-nowrap w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Create Market</span>
                <span className="xs:hidden">Create</span>
              </button>
            )}
          </div>

          {activeTab === 'markets' && (
            <div className="space-y-3 sm:space-y-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 sm:space-x-4">
                <div className="flex items-center space-x-2 flex-1">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0" />
                  <span className="text-white/60 font-medium text-sm sm:text-base whitespace-nowrap">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-black border-2 border-yellow-400/30 text-white rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-1 sm:flex-initial"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-white/60 font-medium text-sm sm:text-base whitespace-nowrap">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-black border-2 border-yellow-400/30 text-white rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-1 sm:flex-initial"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {activeTab === 'markets' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                <TrendingMarkets onMarketClick={handleMarketClick} />
                <RecentActivity limit={8} />
              </div>
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <TokenInfo />
                <Leaderboard />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">Loading markets...</p>
              </div>
            ) : filteredMarkets.length > 0 ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6 md:mb-8">
                  {searchQuery ? 'Search Results' : 'All Markets'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {filteredMarkets.map((market) => (
                    <MarketCard
                      key={market.id}
                      market={market}
                      onClick={() => handleMarketClick(market)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-black rounded-2xl border-2 border-yellow-400/30 p-12 text-center">
                <p className="text-white/60 text-lg mb-4">No markets found</p>
                {walletAddress && !searchQuery && (
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl inline-flex items-center space-x-2 transition-all shadow-lg shadow-yellow-500/50"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create First Market</span>
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          walletAddress && <UserPortfolio walletAddress={walletAddress} />
        )}
      </main>

      {showCreateModal && walletAddress && (
        <CreateMarketModal
          walletAddress={walletAddress}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {selectedMarket && !showBettingModal && !showResolveModal && (
        <MarketDetailsModal
          market={selectedMarket}
          walletAddress={walletAddress}
          onClose={handleCloseDetails}
          onBet={handleBetClick}
          onResolve={handleResolveClick}
        />
      )}

      {showBettingModal && selectedMarket && walletAddress && (
        <BettingModal
          market={selectedMarket}
          walletAddress={walletAddress}
          onClose={() => setShowBettingModal(false)}
          onSuccess={() => {
            handleSuccess();
            setShowBettingModal(false);
            setSelectedMarket(null);
          }}
        />
      )}

      {showResolveModal && selectedMarket && (
        <ResolveMarketModal
          market={selectedMarket}
          onClose={() => setShowResolveModal(false)}
          onSuccess={() => {
            handleSuccess();
            setShowResolveModal(false);
            setSelectedMarket(null);
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
