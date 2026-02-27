# W-BIKE SERVICE

Landing page da **W-BIKE SERVICE**, oficina especializada em mountain bike (MTB): revisão de suspensões, manutenção geral e preparação de bikes para trilha.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

---

## Sobre o projeto

Site institucional em uma única página com:

- **Hero** – Apresentação da marca e CTAs (Agendar Serviço / Ver Serviços)
- **Serviços** – Suspensões, Manutenção Geral, Montagem & Setup, Preparação para Trilha
- **Sobre** – Diferenciais (qualidade, experiência, agilidade, atendimento)
- **Depoimentos** – Avaliações de clientes
- **Contato** – WhatsApp, endereço, horário, Instagram e botão para agendar
- **Footer** – Navegação e créditos

Inclui animações de entrada e ao scroll (Framer Motion), navbar fixa com menu mobile animado e layout responsivo.

---

## Tecnologias

| Tecnologia        | Uso                    |
|-------------------|------------------------|
| **Next.js 16**    | Framework React (App Router) |
| **React 19**      | UI e componentes       |
| **TypeScript**    | Tipagem estática       |
| **Tailwind CSS 4**| Estilos e tema         |
| **Framer Motion** | Animações              |
| **Lucide React**  | Ícones                 |
| **Radix UI**      | Componentes acessíveis (via shadcn/ui) |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (ou npm/yarn)

---

## Como rodar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/wbike.git
cd wbike

# Instale as dependências
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Abre em [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

### Produção

```bash
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## Estrutura do projeto

```
wbike/
├── app/
│   ├── layout.tsx      # Layout raiz e metadata
│   ├── page.tsx        # Página principal (landing)
│   └── globals.css     # Estilos globais
├── components/
│   ├── navbar.tsx      # Cabeçalho e menu
│   ├── hero.tsx        # Seção hero
│   ├── services.tsx     # Serviços
│   ├── about.tsx       # Sobre / diferenciais
│   ├── testimonials.tsx # Depoimentos
│   ├── contact.tsx     # Contato (WhatsApp, etc.)
│   ├── footer.tsx      # Rodapé
│   ├── animated-section.tsx  # Utilitários de animação
│   └── ui/             # Componentes de interface (shadcn/ui)
├── public/
│   └── images/         # Imagens (logo, hero, workshop, etc.)
├── package.json
└── README.md
```

---

## Contato no site

- **WhatsApp:** +55 98 9242-7859 (Wenderson Clemente)
- **Instagram:** @wbikeservice

*(Altere esses dados em `components/contact.tsx` e no link do botão WhatsApp.)*

---

## Depoimentos (Supabase)

Os depoimentos do formulário (`/depoimentos`) são salvos no **Supabase**. Para ativar:

1. Crie um projeto em [supabase.com](https://supabase.com) e anote a **URL** e a **Service Role Key** (ou Anon Key) em *Settings → API*.
2. Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

   Ou, usando a chave anônima com RLS (leitura e inserção públicas):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

3. No **SQL Editor** do Supabase, execute o conteúdo do arquivo `supabase/migrations/20250227000000_create_testimonials.sql` para criar a tabela `testimonials` e as políticas RLS.

Sem essas variáveis, a API retorna lista vazia no GET e 503 no POST; a landing continua exibindo apenas os depoimentos estáticos.

---

## Licença

Projeto privado. Todos os direitos reservados.
