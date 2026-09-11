import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Service-role client: bypasses RLS entirely. Only ever import this from
// route handlers / server code — never from a client component. Used for
// registration writes, payment verification, and admin dashboard reads that
// need to cross RLS (e.g. joining registrations to attendees).
export function getServiceRoleClient() {
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
