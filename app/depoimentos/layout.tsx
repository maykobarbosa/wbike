import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deixar depoimento | W-BIKE SERVICE",
  description:
    "Avalie o serviço e deixe seu depoimento sobre a W-BIKE SERVICE. Sua opinião ajuda outros ciclistas.",
}

export default function DepoimentosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
