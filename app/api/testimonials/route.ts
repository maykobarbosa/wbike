import { get, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import type { Testimonial } from "@/lib/testimonials"
import { BLOB_PATH } from "@/lib/testimonials"

const ACCESS = "private" as const

async function readStoredTestimonials(): Promise<Testimonial[]> {
  try {
    const blob = await get(BLOB_PATH, { access: ACCESS })
    if (!blob) return []
    const text = await new Response(blob.stream).text()
    const parsed = JSON.parse(text) as unknown
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json([])
  }
  try {
    const list = await readStoredTestimonials()
    return NextResponse.json(list)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Depoimentos não configurados no servidor." },
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

  const newItem: Testimonial = {
    name: name.trim().slice(0, 120),
    bike: bike.trim().slice(0, 120),
    quote: quote.trim().slice(0, 800),
    rating: stars,
    createdAt: new Date().toISOString(),
  }

  try {
    const existing = await readStoredTestimonials()
    const updated = [newItem, ...existing]
    await put(BLOB_PATH, JSON.stringify(updated), {
      access: ACCESS,
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
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
