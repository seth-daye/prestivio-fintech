import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type NewContactInquiry = {
  full_name: string;
  email: string;
  phone?: string;
  loan_type?: string;
  loan_amount?: number;
  loan_duration?: number;
  message?: string;
};
