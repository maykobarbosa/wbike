import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="W-BIKE SERVICE"
            width={240}
            height={103}
            className="h-20 w-auto mix-blend-screen"
          />

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#hero" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Início
            </a>
            <a href="#servicos" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Serviços
            </a>
            <a href="#sobre" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Sobre
            </a>
            <a href="#depoimentos" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Depoimentos
            </a>
            <a href="#contato" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Contato
            </a>
          </nav>

          {/* Divider */}
          <div className="h-px w-full max-w-xs bg-border" />

          <p className="text-xs text-muted-foreground">
            {"W-BIKE SERVICE. Todos os direitos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
