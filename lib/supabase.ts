import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Cliente Supabase para uso em API Routes (servidor).
 * Use SUPABASE_SERVICE_ROLE_KEY para bypass de RLS; ou NEXT_PUBLIC_SUPABASE_ANON_KEY com RLS liberando insert/select na tabela testimonials.
 */
export function getSupabase() {
  if (!url || !key) {
    throw new Error("Supabase: faltam NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (ou NEXT_PUBLIC_SUPABASE_ANON_KEY)")
  }
  return createClient(url, key)
}
