"use client"

import Image from "next/image"
import { ArrowRight, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mtb.jpg"
          alt="Mountain bike em trilha"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Logo as the hero centerpiece */}
        <motion.div
          className="relative mb-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Blue glow behind logo */}
          <div className="absolute h-64 w-96 rounded-full bg-primary/15 blur-[100px]" />
          <Image
            src="/images/logo.png"
            alt="W-BIKE SERVICE"
            width={600}
            height={400}
            className="relative h-auto w-80 mix-blend-screen sm:w-96 md:w-[28rem] lg:w-[32rem]"
            priority
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5"
          initial={fadeUp.initial}
          animate={fadeUp.animate(0.2)}
        >
          <Wrench className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Especialista em MTB
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-balance text-center font-[family-name:var(--font-heading)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          initial={fadeUp.initial}
          animate={fadeUp.animate(0.35)}
        >
          <span className="text-primary">Performance</span> que você{" "}
          sente na <span className="text-accent">trilha</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground"
          initial={fadeUp.initial}
          animate={fadeUp.animate(0.5)}
        >
          Revisão completa de suspensões, manutenção profissional e preparação
          de bikes para qualquer terreno. Sua MTB nas mãos de quem entende.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={fadeUp.initial}
          animate={fadeUp.animate(0.65)}
        >
          <a href="#contato">
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
            >
              Agendar Serviço
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="#servicos">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-secondary text-base px-8"
            >
              Ver Serviços
            </Button>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-10 border-t border-border/50 pt-8"
          initial={fadeUp.initial}
          animate={fadeUp.animate(0.85)}
        >
          <div className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary">
              500+
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Bikes revisadas</p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-primary">
              8+
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Anos de experiência</p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-accent">
              100%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Satisfação</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
