import Image from "next/image"
import { Cog, Mountain, Wrench, CircleGauge, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

function ServiceCard({ icon: Icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:bg-card/80 lg:p-8">
      {/* Glow */}
      <div className="absolute -inset-px rounded-xl bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold uppercase tracking-wide text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <ul className="mt-5 flex flex-col gap-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const services: ServiceCardProps[] = [
  {
    icon: Mountain,
    title: "Suspensoes",
    description:
      "Revisao completa de garfos e amortecedores com troca de oleo, retentores e regulagem personalizada.",
    features: [
      "Revisao de garfo dianteiro",
      "Revisao de amortecedor traseiro",
      "Troca de retentores e oleo",
      "Regulagem de SAG e rebote",
    ],
  },
  {
    icon: Cog,
    title: "Manutencao Geral",
    description:
      "Desde ajuste de cambio ate revisao completa, sua bike fica pronta para qualquer desafio.",
    features: [
      "Regulagem de cambio e freios",
      "Troca de cabos e conduites",
      "Centralizacao de rodas",
      "Lubrificacao completa",
    ],
  },
  {
    icon: Wrench,
    title: "Montagem & Setup",
    description:
      "Montagem profissional de bikes novas e setup personalizado para seu estilo de pilotagem.",
    features: [
      "Montagem de bikes completas",
      "Setup de suspensao",
      "Ajuste de cockpit e selim",
      "Instalacao de acessorios",
    ],
  },
  {
    icon: CircleGauge,
    title: "Preparacao para Trilha",
    description:
      "Checklist completo e preparacao da bike para eventos, competicoes e trilhas desafiadoras.",
    features: [
      "Check-up pre-trilha completo",
      "Tubeless setup",
      "Ajuste fino de componentes",
      "Consultoria tecnica",
    ],
  },
]

export function Services() {
  return (
    <section id="servicos" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Nossos servicos
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl text-balance">
            Servicos <span className="text-primary">especializados</span> para sua bike
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Cada servico realizado com pecas de qualidade, ferramentas profissionais
            e atencao total aos detalhes.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        {/* Feature images */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
            <Image
              src="/images/suspension-service.jpg"
              alt="Servico de suspensao profissional"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-[family-name:var(--font-heading)] text-xl font-bold uppercase text-foreground">
                Revisao de Suspensoes
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Servico especializado com garantia
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
            <Image
              src="/images/maintenance.jpg"
              alt="Manutencao de drivetrain"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-[family-name:var(--font-heading)] text-xl font-bold uppercase text-foreground">
                Manutencao Completa
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Todos os componentes revisados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
