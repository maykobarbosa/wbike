import { NextResponse } from "next/server"
import type { Testimonial } from "@/lib/testimonials"
import { getPrisma } from "@/lib/prisma"

function toApiTestimonial(row: {
  name: string
  bike: string
  quote: string
  rating: number
  createdAt: Date
}): Testimonial {
  return {
    name: row.name,
    bike: row.bike,
    quote: row.quote,
    rating: row.rating,
    createdAt: row.createdAt.toISOString(),
  }
}

export async function GET() {
  // #region agent log
  await fetch("http://127.0.0.1:7244/ingest/d9320382-fce8-46de-a120-8375c1ed3cce", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "api/testimonials/route.ts:GET",
      message: "GET testimonials API called",
      data: { hypothesisId: "H2" },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion
  const prisma = getPrisma()
  if (!prisma) return NextResponse.json([])
  try {
    const list = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      select: { name: true, bike: true, quote: true, rating: true, createdAt: true },
    })
    // #region agent log
    await fetch("http://127.0.0.1:7244/ingest/d9320382-fce8-46de-a120-8375c1ed3cce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "api/testimonials/route.ts:GET",
        message: "GET returning list",
        data: { hypothesisId: "H2", count: list.length },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    return NextResponse.json(list.map(toApiTestimonial))
  } catch (e) {
    if (String(e).includes("DATABASE_URL") || String(e).includes("SUPABASE_DB_URL")) {
      return NextResponse.json([])
    }
    console.error("GET testimonials:", e)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const prisma = getPrisma()
  if (!prisma) {
    return NextResponse.json(
      { error: "Depoimentos não configurados no servidor (banco de dados)." },
      { status: 503 }
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    )
  }

  const { name, bike, quote, rating } = body as Record<string, unknown>
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof bike !== "string" ||
    !bike.trim() ||
    typeof quote !== "string" ||
    !quote.trim()
  ) {
    return NextResponse.json(
      { error: "Nome, bike e depoimento são obrigatórios." },
      { status: 400 }
    )
  }

  const stars = typeof rating === "number" ? Math.min(5, Math.max(1, Math.round(rating))) : 5

  try {
    await prisma.testimonial.create({
      data: {
        name: name.trim().slice(0, 120),
        bike: bike.trim().slice(0, 120),
        quote: quote.trim().slice(0, 800),
        rating: stars,
      },
    })
    return NextResponse.json({ ok: true, message: "Depoimento enviado com sucesso!" })
  } catch (e) {
    console.error("Erro ao salvar depoimento:", e)
    return NextResponse.json(
      { error: "Não foi possível salvar o depoimento." },
      { status: 500 }
    )
  }
}
