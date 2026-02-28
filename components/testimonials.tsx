"use client"

import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { getStaggerContainer, getStaggerItem } from "@/components/animated-section"
import type { Testimonial } from "@/lib/testimonials"
import { DEFAULT_TESTIMONIALS } from "@/lib/testimonials"

const MOBILE_LIMIT = 6
const DESKTOP_LIMIT = 9

type PaginatedResponse = {
  data: Testimonial[]
  total: number
  averageRating: number
  page: number
  limit: number
  totalPages: number
}

function TestimonialCard({
  quote,
  name,
  bike,
  rating = 5,
  noMotion,
}: Testimonial & { noMotion?: boolean }) {
  const stars = Math.min(5, Math.max(1, rating))
  const content = (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 lg:p-8">
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
    </div>
  )
  if (noMotion) return content
  return <motion.div variants={getStaggerItem()}>{content}</motion.div>
}

export function Testimonials() {
  const [list, setList] = useState<Testimonial[]>([])
  const [total, setTotal] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isTargetSection, setIsTargetSection] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const limit = isMobile ? MOBILE_LIMIT : DESKTOP_LIMIT

  const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "")
  useEffect(() => {
    if (typeof window === "undefined") return
    const checkHash = () => {
      const h = window.location.hash
      setHash(h)
      setIsTargetSection(h === "#depoimentos")
    }
    checkHash()
    window.addEventListener("hashchange", checkHash)
    return () => window.removeEventListener("hashchange", checkHash)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const h = window.location.hash
    if (h === "#depoimentos") {
      setIsTargetSection(true)
      setHash(h)
    }
    const t = setTimeout(() => {
      const h2 = window.location.hash
      if (h2 === "#depoimentos") {
        setIsTargetSection(true)
        setHash(h2)
      }
    }, 0)
    return () => clearTimeout(t)
  }, [])

  const fetchPage = useCallback(
    (page: number, append: boolean) => {
      const url = `/api/testimonials?page=${page}&limit=${limit}`
      return fetch(url, { cache: "no-store" })
        .then((res) => res.json())
        .then((body: PaginatedResponse) => {
          if (!body || typeof body.total !== "number") return
          if (append) {
            setList((prev) => [...prev, ...(body.data || [])])
          } else {
            setList(body.total > 0 ? body.data ?? [] : DEFAULT_TESTIMONIALS)
          }
          setTotal(body.total)
          setAverageRating(body.averageRating ?? 0)
          setCurrentPage(body.page ?? page)
          setTotalPages(body.totalPages ?? 0)
        })
        .catch(() => {})
    },
    [limit],
  )

  useEffect(() => {
    setLoaded(false)
    fetchPage(1, false).finally(() => setLoaded(true))
    // Refetch when hash changes (e.g. after submitting a new testimonial). Use limit from closure.
  }, [hash, fetchPage])

  const loadMore = useCallback(() => {
    if (loadingMore || currentPage >= totalPages) return
    setLoadingMore(true)
    fetchPage(currentPage + 1, true).finally(() => setLoadingMore(false))
  }, [loadingMore, currentPage, totalPages, fetchPage])

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return
    setCarouselIndex(api.selectedScrollSnap())
  }, [])
  useEffect(() => {
    if (!carouselApi) return
    onSelect(carouselApi)
    carouselApi.on("reInit", onSelect).on("select", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi, onSelect])

  // Quando a lista cresce (load more), Embla precisa recalcular os slides
  useEffect(() => {
    carouselApi?.reInit()
  }, [carouselApi, list.length])

  const sectionVariants = getStaggerContainer(0.15, 0.08)
  const hasMore = total > 0 && list.length < total

  return (
    <motion.section
      id="depoimentos"
      className="relative py-24 lg:py-32"
      initial="hidden"
      animate={isTargetSection ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-7xl px-6">
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

          {loaded && (total > 0 || list.length > 0) && (
            <motion.div
              variants={getStaggerItem()}
              className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">
                  {total > 0 ? total : list.length}
                </span>
                {(total > 0 ? total : list.length) === 1 ? " depoimento" : " depoimentos"}
              </span>
              {total > 0 && (
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">
                    {averageRating.toFixed(1)}
                  </span>
                  <span>média</span>
                </span>
              )}
            </motion.div>
          )}

          <motion.div variants={getStaggerItem()} className="mt-6">
            <a
              href="/depoimentos"
              className="inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Deixar seu depoimento
            </a>
          </motion.div>
        </motion.div>

        {!loaded ? null : (
          <>
            {/* Mobile: carousel */}
            <div className="mt-16 lg:hidden">
              {list.length > 0 ? (
                <Carousel
                  setApi={setCarouselApi}
                  opts={{
                    align: "start",
                    loop: false,
                    dragFree: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {list.map((t, i) => (
                      <CarouselItem key={t.createdAt ? `${t.name}-${t.createdAt}` : `${t.name}-${i}`} className="pl-4">
                        <TestimonialCard {...t} noMotion />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {list.length > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                      {list.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Ir para depoimento ${i + 1}`}
                          onClick={() => carouselApi?.scrollTo(i)}
                          className={`h-2 rounded-full transition-all ${
                            i === carouselIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </Carousel>
              ) : null}
            </div>

            {/* Desktop: grid (noMotion para todos os cards aparecerem, inclusive os carregados depois) */}
            <div className="mt-16 hidden gap-6 lg:grid lg:grid-cols-3">
              {list.map((t, i) => (
                <TestimonialCard
                  key={t.createdAt ? `${t.name}-${t.createdAt}` : `${t.name}-${i}`}
                  {...t}
                  noMotion
                />
              ))}
            </div>

            {hasMore && (
              <motion.div variants={getStaggerItem()} className="mt-10 text-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                >
                  {loadingMore
                    ? "Carregando..."
                    : `Ver mais depoimentos (${list.length} de ${total})`}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.section>
  )
}
