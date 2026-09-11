import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Anon-key client for the browser: reads only, gated by the RLS policies in
// supabase/migrations/0001_init.sql. All registration writes go through
// server-side API routes with the service-role client instead.
export const supabase = createClient(url, anonKey);
