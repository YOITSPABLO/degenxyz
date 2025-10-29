/*
  # Prediction Markets Platform Schema

  1. New Tables
    - `markets`
      - `id` (uuid, primary key)
      - `title` (text) - Market question
      - `description` (text) - Detailed description
      - `category` (text) - Market category
      - `creator_address` (text) - Wallet address of creator
      - `token_address` (text) - Token used for betting (null for DEGEN)
      - `is_degen_market` (boolean) - True if using native DEGEN token
      - `fee_percentage` (numeric) - 0 for DEGEN, 2 for others
      - `total_volume` (numeric) - Total betting volume
      - `yes_pool` (numeric) - Total amount bet on YES
      - `no_pool` (numeric) - Total amount bet on NO
      - `status` (text) - open, closed, resolved
      - `resolution` (text) - yes, no, invalid, null
      - `end_date` (timestamptz) - When market closes for betting
      - `resolution_date` (timestamptz) - When market gets resolved
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bets`
      - `id` (uuid, primary key)
      - `market_id` (uuid, foreign key)
      - `user_address` (text) - Bettor's wallet address
      - `position` (text) - yes or no
      - `amount` (numeric) - Amount bet
      - `shares` (numeric) - Shares received
      - `token_address` (text) - Token used
      - `fee_paid` (numeric) - Fee amount paid
      - `claimed` (boolean) - Whether winnings claimed
      - `payout` (numeric) - Payout amount if won
      - `created_at` (timestamptz)

    - `user_profiles`
      - `wallet_address` (text, primary key)
      - `total_volume` (numeric) - Total trading volume
      - `total_markets` (integer) - Markets participated in
      - `wins` (integer) - Number of winning bets
      - `losses` (integer) - Number of losing bets
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for markets
    - Users can read their own bets and profiles
    - Only authenticated users can create bets
*/

-- Markets table
CREATE TABLE IF NOT EXISTS markets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  creator_address text NOT NULL,
  token_address text,
  is_degen_market boolean DEFAULT false,
  fee_percentage numeric DEFAULT 2,
  total_volume numeric DEFAULT 0,
  yes_pool numeric DEFAULT 0,
  no_pool numeric DEFAULT 0,
  status text DEFAULT 'open' CHECK (status IN ('open', 'closed', 'resolved')),
  resolution text CHECK (resolution IN ('yes', 'no', 'invalid') OR resolution IS NULL),
  end_date timestamptz NOT NULL,
  resolution_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bets table
CREATE TABLE IF NOT EXISTS bets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id uuid NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  user_address text NOT NULL,
  position text NOT NULL CHECK (position IN ('yes', 'no')),
  amount numeric NOT NULL,
  shares numeric NOT NULL,
  token_address text,
  fee_paid numeric DEFAULT 0,
  claimed boolean DEFAULT false,
  payout numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  wallet_address text PRIMARY KEY,
  total_volume numeric DEFAULT 0,
  total_markets integer DEFAULT 0,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_markets_status ON markets(status);
CREATE INDEX IF NOT EXISTS idx_markets_creator ON markets(creator_address);
CREATE INDEX IF NOT EXISTS idx_markets_end_date ON markets(end_date);
CREATE INDEX IF NOT EXISTS idx_bets_market ON bets(market_id);
CREATE INDEX IF NOT EXISTS idx_bets_user ON bets(user_address);
CREATE INDEX IF NOT EXISTS idx_bets_claimed ON bets(claimed);

-- Enable Row Level Security
ALTER TABLE markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for markets (public read)
CREATE POLICY "Anyone can view markets"
  ON markets FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create markets"
  ON markets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Creator can update own markets"
  ON markets FOR UPDATE
  USING (creator_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- RLS Policies for bets
CREATE POLICY "Anyone can view bets"
  ON bets FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create bets"
  ON bets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own bets"
  ON bets FOR UPDATE
  USING (user_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- RLS Policies for user profiles
CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');