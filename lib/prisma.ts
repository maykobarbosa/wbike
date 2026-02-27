import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

/**
 * Runtime: URL do pooler (porta 6543, pgbouncer) para a aplicação.
 *
 * Variáveis (integração Vercel + Supabase):
 * - NEXT_SUPABASE_URL_POSTGRES_PRISMA_URL = pooler Prisma (recomendado)
 * Alternativas: NEXT_SUPABASE_URL_POSTGRES_URL, DATABASE_URL, SUPABASE_DB_URL.
 */
let connectionString =
  process.env.NEXT_SUPABASE_URL_POSTGRES_PRISMA_URL ||
  process.env.NEXT_SUPABASE_URL_POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.SUPABASE_DB_URL

const isSupabase = connectionString?.includes("supabase.com")

// Supabase: remover sslmode da URL para o adapter usar apenas ssl: { rejectUnauthorized: false } (evita P1011).
if (connectionString && isSupabase && connectionString.includes("sslmode=")) {
  connectionString = connectionString
    .replace(/\?sslmode=[^&]+&?/, "?")
    .replace(/&sslmode=[^&]+/g, "")
    .replace(/\?&/, "?")
    .replace(/\?$/, "")
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPrisma(): PrismaClient {
  if (!connectionString) {
    throw new Error(
      "Defina NEXT_SUPABASE_URL_POSTGRES_PRISMA_URL ou DATABASE_URL no .env (integração Vercel + Supabase gera essas variáveis)."
    )
  }
  const poolConfig: Record<string, unknown> = { connectionString }
  if (isSupabase) {
    poolConfig.ssl = { rejectUnauthorized: false }
  }
  const adapter = new PrismaPg(poolConfig as import("pg").PoolConfig)
  return new PrismaClient({ adapter })
}

function getPrismaClient(): PrismaClient | null {
  if (!connectionString) return null
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  globalForPrisma.prisma = createPrisma()
  return globalForPrisma.prisma
}

/**
 * Cliente Prisma (lazy). Chamar apenas em runtime (handlers), nunca em build.
 * Evita "Failed to collect page data" no deploy (Vercel) ao não instanciar o client na importação.
 */
export function getPrisma(): PrismaClient | null {
  return getPrismaClient()
}
