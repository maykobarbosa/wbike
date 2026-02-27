-- Tabela de depoimentos (formulário /depoimentos)
-- Execute no SQL Editor do Supabase: https://supabase.com/dashboard/project/_/sql

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bike text not null,
  quote text not null,
  rating smallint not null default 5 check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now()
);

-- Índice para ordenar por data (mais recentes primeiro)
create index if not exists idx_testimonials_created_at on public.testimonials (created_at desc);

-- RLS: permitir leitura pública e inserção anônima (para o formulário)
alter table public.testimonials enable row level security;

create policy "Permitir leitura pública"
  on public.testimonials for select
  using (true);

create policy "Permitir inserção anônima"
  on public.testimonials for insert
  with check (true);
