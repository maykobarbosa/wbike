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

const DEFAULT_LIMIT = 9
const MAX_LIMIT = 50

function paginatedResponse(
  data: Testimonial[],
  total: number,
  averageRating: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  return NextResponse.json({
    data,
    total,
    averageRating: Math.round(averageRating * 10) / 10,
    page,
    limit,
    totalPages,
  })
}

function emptyPaginatedResponse(page: number, limit: number) {
  return NextResponse.json({
    data: [],
    total: 0,
    averageRating: 0,
    page,
    limit,
    totalPages: 0,
  })
}

export async function GET(request: Request) {
  const prisma = getPrisma()
  if (!prisma) {
    return emptyPaginatedResponse(1, DEFAULT_LIMIT)
  }
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1)
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
  )
  const skip = (page - 1) * limit

  try {
    const [list, total, agg] = await Promise.all([
      prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
        select: { name: true, bike: true, quote: true, rating: true, createdAt: true },
        skip,
        take: limit,
      }),
      prisma.testimonial.count(),
      prisma.testimonial.aggregate({ _avg: { rating: true } }),
    ])
    const averageRating = total > 0 && agg._avg.rating != null ? agg._avg.rating : 0
    return paginatedResponse(list.map(toApiTestimonial), total, averageRating, page, limit)
  } catch (e) {
    if (String(e).includes("DATABASE_URL") || String(e).includes("SUPABASE_DB_URL")) {
      return emptyPaginatedResponse(page, limit)
    }
    console.error("GET testimonials:", e)
    return emptyPaginatedResponse(page, limit)
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
