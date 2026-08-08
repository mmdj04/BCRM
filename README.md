# Modelo de Admin Next.js com TypeScript & Shadcn UI

**Studio Admin** - Inclui múltiplos dashboards, layouts de autenticação, presets de tema personalizáveis e mais.

<img src="https://github.com/arhamkhnz/next-shadcn-admin-dashboard/blob/main/media/dashboard.png?version=5" alt="Screenshot do Dashboard">

A maioria dos templates de admin que encontrei, gratuitos ou pagos, pareciam desordenados, desatualizados ou muito rígidos. Criei este como uma alternativa mais limpa, com funcionalidades frequentemente ausentes em outros, como alternância de tema e controles de layout, mantendo o design moderno, minimalista e flexível.

> **Veja a demo:** [studio admin](https://next-shadcn-admin-dashboard.vercel.app)

> [!NOTE]
> Procurando a versão com Base UI? Confira [next-shadcn-admin-dashboard-baseui](https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui).
>
> Procurando a versão com React Aria? Confira [arhamkhnz/next-shadcn-admin-dashboard-aria](https://github.com/arhamkhnz/next-shadcn-admin-dashboard-aria).
>
> Procurando a versão com TanStack Start? Confira [tanstack-shadcn-admin-dashboard](https://github.com/arhamkhnz/tanstack-shadcn-admin-dashboard).

> [!TIP]
> Também estou trabalhando nas versões Nuxt.js e Svelte deste dashboard. Estarão disponíveis em breve.

## Funcionalidades

- Construído com Next.js 16, TypeScript, Tailwind CSS v4 e Shadcn UI
- Responsivo e compatível com dispositivos móveis
- Presets de tema personalizáveis (modos claro/escuro com esquemas de cores como Tangerine, Brutalist e mais)
- Layouts flexíveis (sidebar recolhível, larguras de conteúdo variáveis)
- Fluxos e telas de autenticação
- Dashboards pré-construídos (Default, CRM, Finance, Analytics, Productivity) além de variantes legadas
- Controle de Acesso Baseado em Papel (RBAC) com UI orientada por configuração e suporte multi-tenant *(planejado)*

> [!NOTE]
> O dashboard padrão usa o tema **shadcn neutral**.
> Também inclui presets de cores adicionais inspirados pelo [Tweakcn](https://tweakcn.com):
>
> - Tangerine
> - Neo Brutalism
> - Soft Pop
>
> Você pode criar mais presets seguindo a mesma estrutura dos existentes.

> Procurando a versão **Next.js 15**?
> Confira a branch [`archive/next15`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard/tree/archive/next15).
> Esta branch contém a configuração anterior à atualização para Next 16 e o React Compiler.

> Procurando a versão **Next.js 14 + Tailwind CSS v3**?
> Confira a branch [`archive/next14-tailwindv3`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard/tree/archive/next14-tailwindv3).
> Possui um tema de cores diferente e não é ativamente mantida, mas tento mantê-la atualizada com mudanças significativas.

## Stack Tecnológica

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Componentes UI**: Shadcn UI
- **Validação**: Zod
- **Formulários e Gerenciamento de Estado**: React Hook Form, Zustand
- **Tabelas e Tratamento de Dados**: TanStack Table
- **Ferramentas e DX**: Biome, Husky

## Telas

### Disponíveis
- Dashboard Padrão
- Dashboard CRM
- Dashboard Financeiro
- Dashboard de Análises
- Dashboard de Produtividade
- Dashboard de E-commerce
- Dashboard de Academia
- Dashboard de Logística
- Dashboard de Infraestrutura
- Gerenciador de Arquivos
- Monitoramento de Pacientes
- Página de Chat
- Página de Email
- Gerenciamento de Usuários
- Gerenciamento de Papéis
- Quadro Kanban
- Página de Tarefas
- Página de Faturas
- Página de Calendário
- Autenticação (4 telas)
- Legado: Default v1, CRM v1, Finance v1, Analytics v1

### Planejadas
Adicionei todas as telas planejadas. Sinta-se à vontade para abrir uma issue solicitando algo específico.

## Arquitetura de Sistema de Arquivos por Co-localização

Este projeto segue uma **arquitetura baseada em co-localização** - cada funcionalidade mantém suas próprias páginas, componentes e lógica dentro da pasta da sua rota.
Componentes UI compartilhados, hooks e configurações ficam no nível superior, tornando a base de código modular, escalável e mais fácil de manter conforme o aplicativo cresce.

Para uma análise completa da estrutura com exemplos, consulte o [Next Colocation Template](https://github.com/arhamkhnz/next-colocation-template).

## Primeiros Passos

Você pode executar este projeto localmente ou fazer deploy instantaneamente com o Vercel.

### Deploy com Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farhamkhnz%2Fnext-shadcn-admin-dashboard)

_Faça deploy da sua própria cópia com um clique._

### Executar localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/arhamkhnz/next-shadcn-admin-dashboard.git
   ```

2. **Navegue até o projeto**
   ```bash
    cd next-shadcn-admin-dashboard
   ```

3. **Instale as dependências**
   ```bash
    npm install
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

Seu aplicativo estará rodando em [http://localhost:3000](http://localhost:3000)

### Conta de Demonstração

O BCRM inclui um modo de demonstração integrado para testes e apresentações. Use estas credenciais para acessar a demo:

| Campo | Valor |
|-------|-------|
| Email | `admin@bcrm.com` |
| Senha | `10092004m` |

O modo de demonstração funciona com dados simulados e não requer uma conexão com o Supabase. Ao fazer login como demo, um selo "Demo" aparecerá no menu do usuário.

### Formatação e Lint

Formate, verifique o lint e organize os imports
```bash
npx @biomejs/biome check --write
```
> Para mais informações sobre regras disponíveis, correções e opções de CLI, consulte a [documentação do Biome](https://biomejs.dev/).

---

> [!IMPORTANT]
> Este projeto é atualizado frequentemente. Se você está trabalhando a partir de um fork ou clone antigo, puxe as últimas alterações antes de sincronizar. Algumas atualizações podem incluir mudanças incompatíveis.

---

Contribuições são bem-vindas. Sinta-se à vontade para abrir issues, solicitações de funcionalidades ou iniciar uma discussão.


**Bom Vibe Coding!**