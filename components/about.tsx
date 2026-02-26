import Image from "next/image"
import { ShieldCheck, Award, Clock, ThumbsUp } from "lucide-react"

const reasons = [
  {
    icon: ShieldCheck,
    title: "Qualidade Garantida",
    text: "Usamos apenas peças originais e de alta qualidade com garantia em todos os serviços.",
  },
  {
    icon: Award,
    title: "Experiência Comprovada",
    text: "Mais de 8 anos de experiência com mountain bikes de todos os níveis.",
  },
  {
    icon: Clock,
    title: "Agilidade",
    text: "Prazos cumpridos e comunicação direta para que você não fique sem pedalar.",
  },
  {
    icon: ThumbsUp,
    title: "Atendimento Personalizado",
    text: "Cada bike recebe atenção individual para um resultado perfeito.",
  },
]

export function About() {
  return (
    <section id="sobre" className="relative py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
            <Image
              src="/images/workshop.jpg"
              alt="Oficina W-BIKE SERVICE"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-border/50 bg-card/90 p-4 backdrop-blur-sm">
              <p className="font-[family-name:var(--font-heading)] text-lg font-bold uppercase text-foreground">
                W-BIKE SERVICE
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Oficina especializada em MTB desde 2017
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Por que nos escolher
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl text-balance">
              Sua bike merece o <span className="text-primary">melhor</span> cuidado
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Na W-BIKE SERVICE, cada bicicleta é tratada com o mesmo cuidado que
              dedicaríamos à nossa própria bike. Somos apaixonados por mountain bike
              e isso se reflete na qualidade de cada serviço.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <r.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
