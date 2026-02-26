import Image from "next/image"
import { ArrowRight, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        <div className="relative mb-10 flex items-center justify-center">
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
        </div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <Wrench className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Especialista em MTB
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-balance text-center font-[family-name:var(--font-heading)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-primary">Performance</span> que voce{" "}
          sente na <span className="text-accent">trilha</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          Revisao completa de suspensoes, manutencao profissional e preparacao
          de bikes para qualquer terreno. Sua MTB nas maos de quem entende.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#contato">
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
            >
              Agendar Servico
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="#servicos">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-border text-foreground hover:bg-secondary text-base px-8"
            >
              Ver Servicos
            </Button>
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 border-t border-border/50 pt-8">
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
            <p className="mt-1 text-sm text-muted-foreground">Anos de experiencia</p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-accent">
              100%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Satisfacao</p>
          </div>
        </div>
      </div>
    </section>
  )
}
