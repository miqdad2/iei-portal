import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Shared client for web (NEXT_PUBLIC_*) + mobile (EXPO_PUBLIC_*). */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.EXPO_PUBLIC_SUPABASE_URL ??
    "";
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
    "";
  if (!url || !anon) throw new Error("Missing Supabase env (URL/ANON_KEY)");
  client = createClient(url, anon);
  return client;
}

/** Realtime channels EC Desk publishes; web+mobile subscribe for instant sync. */
export const channels = {
  events: "realtime:events",
  notices: "realtime:notices",
  jobs: "realtime:jobs",
  polls: "realtime:polls",
} as const;
