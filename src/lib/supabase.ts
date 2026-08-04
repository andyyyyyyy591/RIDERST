import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Order = {
  id: string;
  tracking_code: string;
  created_at: string;       // YYYY-MM-DD — día 0 del tracking
  customer_name: string;
  product_type: "motorcycle" | "solar_kit" | "electric_tricycle";
  model: string;
  seller: string;
  inserted_at: string;      // timestamp de cuándo se cargó en el sistema
};
