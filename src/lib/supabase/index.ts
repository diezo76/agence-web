/**
 * Client Supabase type-safe
 *
 * Client (browser) : import { createClient } from "@/lib/supabase/client"
 * Server : import { createClient } from "@/lib/supabase/server"
 */

export {
  SupabaseError,
  SupabaseConfigError,
  SupabaseQueryError,
  handleSupabaseError,
  toResult,
  type Result,
} from "./errors";

export type { Database } from "@/types/database";
