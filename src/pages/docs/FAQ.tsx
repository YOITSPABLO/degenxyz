import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black/50 rounded-xl border border-yellow-400/30/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-black/70 transition-colors"
      >
        <span className="text-lg font-semibold text-white pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-yellow-400 flex-shrink-0 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-white/70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const faqs = [
    {
      question: 'What is degen.xyz?',
      answer:
        'degen.xyz is a decentralized prediction market platform on BNB Chain where users can trade on the outcomes of real-world events. It uses an automated market maker to ensure fair pricing and transparent on-chain settlement.',
    },
    {
      question: 'How do I buy $DEGEN tokens?',
      answer:
        '$DEGEN tokens are launching on four.meme, a trusted meme token launchpad on BNB Chain. Simply connect your wallet to four.meme, purchase $DEGEN with BNB, and start trading with zero fees on degen.xyz.',
    },
    {
      question: 'Why are there zero fees for DEGEN markets?',
      answer:
        'Markets using $DEGEN tokens have zero trading fees to incentivize usage of the native token and create the most cost-effective trading experience. Non-DEGEN markets have a 2% fee split: 1% goes to the market creator and 1% goes to platform development.',
    },
    {
      question: 'How does betting work?',
      answer:
        'When you place a bet, you choose YES or NO on a market outcome and specify your bet amount. The platform uses an AMM to calculate how many shares you receive. If your prediction is correct, you win a share of the total pool proportional to your shares.',
    },
    {
      question: 'How are markets resolved?',
      answer:
        'Markets are resolved by their creators once the event outcome is known. Market creators have a responsibility to resolve honestly, and their reputation is tracked on-platform. Future versions will implement decentralized oracle solutions.',
    },
    {
      question: 'Can anyone create a market?',
      answer:
        'Yes! Any user can create a prediction market on any topic. Simply connect your wallet, click "Create Market," fill in the details, and choose whether to use DEGEN tokens (0% fee) or other tokens (2% fee split: 1% to you as creator, 1% to platform).',
    },
    {
      question: 'What happens if I win?',
      answer:
        'When a market resolves in your favor, you can claim your winnings immediately. Your payout is calculated based on your share of the winning pool multiplied by the total market pool.',
    },
    {
      question: 'Is my money safe?',
      answer:
        'All funds are held in audited smart contracts on BNB Chain. The platform is non-custodial, meaning you always maintain control of your assets. However, crypto trading carries inherent risks, so only bet what you can afford to lose.',
    },
    {
      question: 'What are the trading fees?',
      answer:
        'DEGEN markets: 0% trading fee. Non-DEGEN markets: 2% trading fee (1% to market creator, 1% to platform). This fee structure incentivizes using the native $DEGEN token while rewarding quality market creation.',
    },
    {
      question: 'Can I withdraw my bet before resolution?',
      answer:
        'Once a bet is placed, it cannot be withdrawn. This is necessary to maintain market integrity and ensure fair pricing. Make sure you\'re confident in your prediction before placing a bet.',
    },
    {
      question: 'How is liquidity provided?',
      answer:
        'degen.xyz uses an automated market maker (AMM) where each bet adds to the liquidity pool. The more people bet, the deeper the liquidity becomes, ensuring fair pricing through supply and demand.',
    },
    {
      question: 'What happens if a market is invalid?',
      answer:
        'If a market is resolved as "invalid" (due to unclear outcome, event cancellation, etc.), all participants receive their original bets back. No one wins or loses.',
    },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold gradient-text mb-6">Frequently Asked Questions</h1>

      <p className="text-lg text-white/70 leading-relaxed mb-8">
        Find answers to common questions about degen.xyz, $DEGEN tokens, and prediction market
        trading.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="bg-yellow-400/10 border border-cyan-500/20 rounded-xl p-6 mt-12">
        <h3 className="text-xl font-bold text-yellow-400 mb-3">Still have questions?</h3>
        <p className="text-white/70 mb-4">
          Join our community on Telegram or Twitter for real-time support and discussions with other
          traders.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://t.me/coinsult_tg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/25"
          >
            <span>Join Telegram</span>
          </a>
          <a
            href="https://twitter.com/betify"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-black hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <span>Follow on Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}
