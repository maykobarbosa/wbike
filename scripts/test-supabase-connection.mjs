#!/usr/bin/env node
/**
 * Teste de integração: conexão Prisma + Supabase.
 * Roda: pnpm exec node scripts/test-supabase-connection.mjs
 * Requer .env com NEXT_SUPABASE_URL_POSTGRES_PRISMA_URL (ou DATABASE_URL).
 */
import "dotenv/config"
import pg from "pg"

const connectionString =
  process.env.NEXT_SUPABASE_URL_POSTGRES_PRISMA_URL ||
  process.env.NEXT_SUPABASE_URL_POSTGRES_URL ||
  process.env.DATABASE_URL

if (!connectionString) {
  console.error("❌ Defina NEXT_SUPABASE_URL_POSTGRES_PRISMA_URL ou DATABASE_URL no .env")
  process.exit(1)
}

const isSupabase = connectionString.includes("supabase.com")
let url = connectionString
if (isSupabase && url.includes("sslmode=")) {
  url = url.replace(/\?sslmode=[^&]+&?/, "?").replace(/&sslmode=[^&]+/g, "").replace(/\?&/, "?").replace(/\?$/, "")
}

const client = new pg.Client({
  connectionString: url,
  ...(isSupabase && { ssl: { rejectUnauthorized: false } }),
})

async function main() {
  try {
    await client.connect()
    const res = await client.query("SELECT 1 as ok")
    console.log("✅ Conexão Supabase/Postgres OK:", res.rows[0])
    const table = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'testimonials'
      ) as exists
    `)
    console.log("   Tabela testimonials existe:", table.rows[0].exists)
    await client.end()
  } catch (err) {
    console.error("❌ Erro:", err.message)
    process.exit(1)
  }
}

main()
