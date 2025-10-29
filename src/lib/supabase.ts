import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  creator_address: string;
  token_address: string | null;
  is_degen_market: boolean;
  fee_percentage: number;
  total_volume: number;
  yes_pool: number;
  no_pool: number;
  status: 'open' | 'closed' | 'resolved';
  resolution: 'yes' | 'no' | 'invalid' | null;
  end_date: string;
  resolution_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Bet {
  id: string;
  market_id: string;
  user_address: string;
  position: 'yes' | 'no';
  amount: number;
  shares: number;
  token_address: string | null;
  fee_paid: number;
  claimed: boolean;
  payout: number;
  created_at: string;
}

export interface UserProfile {
  wallet_address: string;
  total_volume: number;
  total_markets: number;
  wins: number;
  losses: number;
  created_at: string;
  updated_at: string;
}
