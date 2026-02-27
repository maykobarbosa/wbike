# Histórico de Versionamento

Este arquivo segue o padrão **Semantic Versioning (SemVer)**: MAJOR.MINOR.PATCH.

---

## [0.2.3] - 2025-02-27
### Tipo
- Patch

### Alterações
- Correção do build no Vercel: cliente Prisma passou a ser obtido via `getPrisma()` (lazy) em vez de import direto, evitando "Failed to collect page data for /api/testimonials"; script de build passa a executar `prisma generate` antes de `next build`.

---

## [0.2.2] - 2025-02-27
### Tipo
- Patch

### Alterações
- Depoimentos passam a usar **Prisma** para acesso ao banco: schema em `prisma/schema.prisma`, cliente em `lib/prisma.ts` (adapter pg), API em `app/api/testimonials/route.ts`; script `pnpm run create-table` executa `prisma db push`. Removidos `@supabase/supabase-js` e `lib/supabase.ts`.

---

## [0.2.1] - 2025-02-27
### Tipo
- Patch

### Alterações
- Persistência de depoimentos migrada de Vercel Blob para **Supabase**: API usa `@supabase/supabase-js`; tabela `testimonials` com RLS para leitura e inserção; migração em `supabase/migrations/`.

---

## [0.2.0] - 2025-02-27
### Tipo
- Minor

### Alterações
- Nova página `/depoimentos` com formulário para o cliente avaliar o serviço e deixar depoimento (nome, modelo da bike, avaliação em estrelas, texto).
- API `GET/POST /api/testimonials` para listar e persistir depoimentos (Supabase).
- Seção de depoimentos na landing page passa a exibir depoimentos da API mesclados aos estáticos; botão "Deixar seu depoimento" na seção e link "Deixar depoimento" no navbar.

---

## [0.1.0] - (inicial)
### Tipo
- Minor

### Alterações
- Landing page W-BIKE SERVICE: hero, serviços, sobre, depoimentos estáticos, contato, footer.
