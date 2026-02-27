/**
 * Configuração do Prisma CLI (migrate, generate, db push).
 * Usa a URL non-pooling (porta 5432) para migrations.
 *
 * Variáveis (integração Vercel + Supabase):
 * - NEXT_SUPABASE_URL_POSTGRES_URL_NON_POOLING = session/non-pooling (migrations)
 * Alternativas: DIRECT_URL, DATABASE_URL.
 */
import "dotenv/config"
import { defineConfig } from "prisma/config"

const directUrl =
  process.env.NEXT_SUPABASE_URL_POSTGRES_URL_NON_POOLING ||
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  "postgresql://localhost:5432/dummy"

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: directUrl,
  },
})
