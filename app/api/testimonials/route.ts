import { NextResponse } from "next/server"
import type { Testimonial } from "@/lib/testimonials"
import { getSupabase } from "@/lib/supabase"

const TABLE = "testimonials"

function rowToTestimonial(row: {
  name: string
  bike: string
  quote: string
  rating: number | null
  created_at: string
}): Testimonial {
  return {
    name: row.name,
    bike: row.bike,
    quote: row.quote,
    rating: row.rating ?? 5,
    createdAt: row.created_at,
  }
}

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from(TABLE)
      .select("name, bike, quote, rating, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase GET testimonials:", error)
      return NextResponse.json([])
    }
    const list = (data ?? []).map(rowToTestimonial)
    return NextResponse.json(list)
  } catch (e) {
    if (String(e).includes("Supabase:")) return NextResponse.json([])
    console.error("GET testimonials:", e)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  let supabase
  try {
    supabase = getSupabase()
  } catch (e) {
    if (String(e).includes("Supabase:")) {
      return NextResponse.json(
        { error: "Depoimentos não configurados no servidor (Supabase)." },
        { status: 503 }
      )
    }
    throw e
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
    const { error } = await supabase.from(TABLE).insert({
      name: name.trim().slice(0, 120),
      bike: bike.trim().slice(0, 120),
      quote: quote.trim().slice(0, 800),
      rating: stars,
    })

    if (error) {
      console.error("Supabase POST testimonial:", error)
      return NextResponse.json(
        { error: "Não foi possível salvar o depoimento." },
        { status: 500 }
      )
    }
    return NextResponse.json({ ok: true, message: "Depoimento enviado com sucesso!" })
  } catch (e) {
    console.error("Erro ao salvar depoimento:", e)
    return NextResponse.json(
      { error: "Não foi possível salvar o depoimento." },
      { status: 500 }
    )
  }
}
