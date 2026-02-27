/**
 * Tipos e dados estáticos de depoimentos.
 * Depoimentos enviados pelo formulário são persistidos no banco via Prisma e
 * mesclados com esta lista na landing page.
 */

export interface Testimonial {
  quote: string
  name: string
  bike: string
  /** 1 a 5; opcional para depoimentos estáticos (default 5) */
  rating?: number
  /** ISO date; apenas para depoimentos vindos da API */
  createdAt?: string
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
 
]
