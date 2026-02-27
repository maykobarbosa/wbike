"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { getStaggerContainer, getStaggerItem } from "@/components/animated-section"
import type { Testimonial } from "@/lib/testimonials"
import { DEFAULT_TESTIMONIALS } from "@/lib/testimonials"

function TestimonialCard({ quote, name, bike, rating = 5 }: Testimonial) {
  const stars = Math.min(5, Math.max(1, rating))

  return (
    <motion.div
      variants={getStaggerItem()}
      className="flex flex-col rounded-xl border border-border bg-card p-6 lg:p-8"
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < stars ? "fill-accent text-accent" : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {`"${quote}"`}
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <span className="text-sm font-bold text-primary">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{bike}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const [dynamicList, setDynamicList] = useState<Testimonial[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data)) setDynamicList(data)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  const testimonials =
    dynamicList.length > 0 ? [...dynamicList, ...DEFAULT_TESTIMONIALS] : DEFAULT_TESTIMONIALS

  return (
    <motion.section
      id="depoimentos"
      className="relative py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={getStaggerContainer(0.15, 0.08)}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={getStaggerItem()}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Depoimentos
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl text-balance">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A satisfação dos nossos clientes é nossa maior motivação.
          </p>
          <motion.div variants={getStaggerItem()} className="mt-6">
            <a
              href="/depoimentos"
              className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Deixar seu depoimento
            </a>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={getStaggerContainer(0.25, 0.06)}
        >
          {loaded &&
            testimonials.map((t, i) => (
              <TestimonialCard
                key={t.createdAt ? `${t.name}-${t.createdAt}` : `${t.name}-${i}`}
                {...t}
              />
            ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
