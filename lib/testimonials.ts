/**
 * Tipos e dados estáticos de depoimentos.
 * Depoimentos enviados pelo formulário são persistidos no Supabase e
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
