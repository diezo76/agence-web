"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { SupabaseConfigError } from "./errors";

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Client Supabase pour composants client (browser).
 * Singleton : une seule instance partagée.
 */
export function createClient() {
  if (clientInstance) {
    return clientInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new SupabaseConfigError(
      "Variables Supabase manquantes. Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local"
    );
  }

  clientInstance = createBrowserClient<Database>(url, anonKey);
  return clientInstance;
}
