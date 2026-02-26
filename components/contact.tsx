"use client"

import { Phone, MapPin, Clock, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { getStaggerContainer, getStaggerItem } from "@/components/animated-section"

export function Contact() {
  return (
    <motion.section
      id="contato"
      className="relative py-24 lg:py-32 bg-secondary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={getStaggerContainer(0.1, 0.12)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Info */}
          <motion.div variants={getStaggerItem()}>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Contato
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl text-balance">
              Agende seu <span className="text-primary">serviço</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Entre em contato pelo WhatsApp para agendar sua revisão ou tirar
              suas dúvidas. Estamos prontos para atender você!
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Wenderson Clemente</p>
                  <p className="mt-1 text-sm text-muted-foreground">+55 98 9242-7859</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Endereço</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sua cidade - Estado
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Horário</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Seg - Sex: 08h às 18h | Sáb: 08h às 12h
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Instagram className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Instagram</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    @wbikeservice
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={getStaggerItem()}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center lg:p-12"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold uppercase text-foreground md:text-3xl">
              Fale conosco pelo WhatsApp
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Envie uma mensagem com o modelo da sua bike e o serviço desejado.
              Responderemos o mais rápido possível!
            </p>

            <a
              href="https://wa.me/559892427859?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20servi%C3%A7o%20na%20W-BIKE%20SERVICE."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8"
            >
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10"
              >
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </Button>
            </a>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-accent">
                  {"< 1h"}
                </p>
                <p className="text-xs text-muted-foreground">Tempo de resposta</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-accent">
                  Grátis
                </p>
                <p className="text-xs text-muted-foreground">Orçamento sem compromisso</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
