import { Star } from "lucide-react"

interface TestimonialProps {
  quote: string
  name: string
  bike: string
}

function TestimonialCard({ quote, name, bike }: TestimonialProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 lg:p-8">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {`"${quote}"`}
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
        {/* Avatar placeholder */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <span className="text-sm font-bold text-primary">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{bike}</p>
        </div>
      </div>
    </div>
  )
}

const testimonials: TestimonialProps[] = [
  {
    quote:
      "Levei minha Specialized Stumpjumper para revisão de suspensão e o resultado foi impressionante. A bike voltou melhor do que quando era nova! Recomendo demais.",
    name: "Rafael Costa",
    bike: "Specialized Stumpjumper",
  },
  {
    quote:
      "Atendimento excelente e muito transparente. Me explicaram tudo que seria feito e o preço foi justo. Minha Trek Fuel EX está voando na trilha agora.",
    name: "Camila Souza",
    bike: "Trek Fuel EX 8",
  },
  {
    quote:
      "Profissional de verdade! Fez o setup completo da minha bike nova e ainda deu várias dicas sobre regulagem de suspensão. Nota 10!",
    name: "Bruno Oliveira",
    bike: "Scott Spark 930",
  },
  {
    quote:
      "Já passei por várias oficinas e nenhuma chegou perto da qualidade da W-BIKE SERVICE. Minha Canyon Spectral está perfeita depois da manutenção geral.",
    name: "Juliana Mendes",
    bike: "Canyon Spectral 29",
  },
  {
    quote:
      "O cara entende de suspensão como ninguém. Fez a revisão do meu Fox 36 e ficou impecável. Parece outra bike na trilha. Super recomendo.",
    name: "Thiago Almeida",
    bike: "Giant Trance X",
  },
  {
    quote:
      "Serviço rápido e de altíssima qualidade. Deixei pra revisão de manhã e peguei no final do dia, tudo funcionando perfeitamente. Profissional demais!",
    name: "Fernanda Lima",
    bike: "Cannondale Scalpel",
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Depoimentos
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl text-balance">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A satisfação dos nossos clientes é nossa maior motivação.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
