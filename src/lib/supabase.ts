import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url?: string) => {
  if (!url || url.includes("PASTE_") || url.includes("YOUR_")) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl! : "https://placeholder-katsera.supabase.co";
const supabaseAnonKey = rawKey && !rawKey.includes("PASTE_") ? rawKey : "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);