# Changelog

Todas as mudanças notáveis neste projeto são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

### Added
- **Supabase Integration**: Autenticação completa (login, registro, OAuth Google)
- **Supabase Database**: 25 tabelas com RLS, triggers e indexes
- **Middleware de Autenticação**: Refresh de sessão e proteção de rotas
- **GitHub Actions**: CI/CD completo (lint, typecheck, build, deploy, CodeQL, Dependabot)
- **Open Source Files**: SECURITY.md, CODE_OF_CONDUCT.md, CONTRIBUTING.md
- **Issue Templates**: Bug Report, Feature Request, Question
- **PR Template**: Template padronizado para Pull Requests
- **Dependabot**: Atualização automática de dependências
- **PR #61**: Accounts e Transactions tabs no Finance dashboard
  - Accounts tab com KPI strip, allocation bar, account list com sparklines
  - Transactions tab com TanStack Table, search, filters, sorting, pagination
  - Navegação cross-tab: clique no chevron para pular para Transactions com filtro

---

## [3.0.0] - 2026-04-17

### Added
- **Default Dashboard V2**: Novo design do dashboard padrão com métricas e gráficos atualizados
- **Productivity Dashboard**: Dashboard de produtividade com tarefas, projetos, calendário e notas
- **Search Dialog**: Busca global derivada dos itens da sidebar (PR #51)
- **Vercel Analytics**: Integração com analytics do Vercel

### Changed
- Dashboard routes reorganizados: v2 como padrão, v1 movido para legacy
- Sidebar refinada com support card e GitHub shortcut
- Layout controls habilitados com persistência de preferências
- Tema padrão atualizado para mist (shadcn base color)
- Fonte padrão atualizada para Geist

### Fixed
- Resolução de overflow no analytics dashboard em telas médias
- Alinhamento de selects nos layout controls
- Problemas de memoização do React Compiler na data table
- Parse de datas no gráfico do dashboard padrão

---

## [2.2.0] - 2026-01-01

### Added
- **Finance Dashboard Redesign**: Novo design completo do dashboard financeiro
  - Wallet com crypto assets e physical vault info
  - Income breakdown com gráficos
  - Balance distribution card
  - Upcoming transactions com datas dinâmicas
  - Quick actions
- **Theme Preset Switcher**: Seletor de presets de tema (Default, Brutalist, Soft Pop, Tangerine)
- **Font Preference**: 17 fontes selecionáveis dinamicamente
- **System Theme Mode**: Suporte a tema do sistema (light/dark/system)
- **Restore Defaults**: Botão para restaurar configurações padrão

### Changed
- Preferences store migrado para Zustand
- Layout preferences movidas para cookie-based persistence
- Boot script de tema otimizado para evitar flicker
- Sidebar preference handling otimizado para renderização instantânea

### Fixed
- Alinhamento de ícones na sidebar
- CSS layer order para presets de tema
- Default font configuration

---

## [2.1.0] - 2025-12-12

### Added
- **Biome Migration**: Migração completa de ESLint/Prettier para Biome
- **Preference Config**: Sistema de configurações com persistência
- **Theme Boot Script**: Script para aplicar tema antes do render para evitar flicker

### Changed
- Comandos de lint/format atualizados para Biome
- Codebase formatado e lintado com Biome
- Dependências ESLint/Prettier removidas

---

## [2.0.0] - 2025-10-24

### Added
- **Next.js 16**: Migração para Next.js 16 com React Compiler
- **React Compiler**: Habilitado para memoização automática
- **Proxy API**: Migração de middleware para proxy (Next.js 16)
- **Turbopack**: Habilitado para desenvolvimento

### Changed
- Configuração ESLint atualizada para Next.js 16
- Referências de versão atualizadas na documentação
- Componentes shadcn atualizados

### Fixed
- DropdownMenuTrigger migrado de Radix UI para shadcn

---

## [1.5.0] - 2025-08-01

### Added
- **Not Found Page**: Página 404 global
- **Coming Soon Page**: Página de em breve para rotas não implementadas
- **Placeholder Routes**: Rotas para dashboards não implementados

### Changed
- Rotas não existentes redirecionadas para /dashboard
- Dependências atualizadas

---

## [1.4.0] - 2025-07-09

### Added
- **V2 Auth Pages**: Novas páginas de autenticação (login e registro)
- **Finance Dashboard**: Dashboard financeiro com wallet, cash flow e spending
- **CRM Dashboard**: Dashboard de CRM com leads e métricas

### Changed
- Cores do tema atualizadas
- Código limpo e refatorado

---

## [1.3.0] - 2025-06-06

### Added
- **Content Layout Switcher**: Seletor de layout (full width e centered)
- **Account Switcher**: Componente para troca de contas
- **Theme Switcher**: Componente para troca de tema

### Changed
- Sidebar atualizada com dropdown menu no estado collapsed
- Lógica de margin responsiva atualizada para centered layout

### Fixed
- Fallback para layout collapsible no mobile sidebar

---

## [1.2.0] - 2025-05-04

### Added
- **Route Groups**: Organização com (main) e (external) route groups
- **Layout Preferences Panel**: Painel de configurações de layout com sidebar variant e collapsible
- **Prettier Plugin Tailwindcss**: Formatação automática de classes Tailwind

### Changed
- Estrutura de componentes reorganizada para _components
- Sidebar re-renderizations otimizadas
- Codebase lintado

---

## [1.1.0] - 2025-04-28

### Added
- **Next.js 15 + Tailwind CSS v4**: Migração para Next.js 15 e Tailwind CSS v4
- **Novo Color Theme**: Esquema de cores atualizado

### Changed
- Dependências e componentes shadcn atualizados

---

## [1.0.0] - 2024-08-01

### Added
- **Initial Release**: Primeira versão do Studio Admin Dashboard
- Dashboard padrão com métricas e gráficos
- Sidebar responsiva com variantes
- Theme switcher (light/dark)
- Layout controls (sidebar variant, collapsible, content layout, navbar style)
- Autenticação mock (UI apenas)
- 55+ componentes shadcn/ui
- 24+ telas de dashboard
- Suporte a 17 fontes
- 4 presets de tema (Default, Brutalist, Soft Pop, Tangerine)
- React 19 + TypeScript 5.9
- Vercel Analytics

---

## Histórico de Features por Dashboard

### Default Dashboard
- v1 (2024-08-01): Dashboard básico com métricas
- v2 (2026-04-17): Novo design com gráficos atualizados

### Analytics Dashboard
- v1 (2026-01-08): Dashboard com métricas de receita e risco
- v2 (2026-05-02): Dashboard com realtime visitors, traffic sources e quality charts

### Finance Dashboard
- v1 (2025-07-09): Dashboard com wallet, cash flow e spending
- v2 (2026-04-26): Refatorado com crypto assets e vault info
- v3 (PR #61): Adicionado Accounts e Transactions tabs

### CRM Dashboard
- v1 (2025-07-08): Dashboard com leads e métricas
- v2 (2026-04-18): Novo design com opportunities table e activity sections

### E-commerce Dashboard
- v1 (2025-05-05): Dashboard com overview, traffic, reviews e inventory
- v2 (2025-05-10): Adicionado recent orders table

### Academy Dashboard
- (2025-05-11): Dashboard com assignments, class schedule e KPIs

### Mail
- (2025-05-10): Interface de email com inbox, sidebar e message view
- (2025-05-18): Movido para layout standalone com shadcn sidebar

### Chat
- (2025-06-03): Interface de chat com conversations, threads e contacts
- (2025-06-08): Responsivo e refinado

### Kanban
- (2025-05-20): Board com drag-and-drop usando @dnd-kit
- (2025-06-11): Refatorado em componentes, fix drag cancel

### Tasks
- (2025-06-24): Tela de tarefas com filtros e toolbar

### Users
- (2025-05-20): Tela de gestão de usuários com tabela

### Roles
- (2025-05-18): Tela de gestão de papéis e permissões

### Infrastructure
- (2025-06-18): Dashboard com health data e environments

### Calendar
- (2025-06-15): Calendário com FullCalendar v7

### Invoice
- (2025-06-11): Construtor de faturas com preview e impressão

### File Manager
- (2025-07-31): Gerenciador de arquivos com grid/list view

### Patient Monitoring
- (2025-08-03): Monitoramento de pacientes com vital signs e waveforms

### Logistics
- (2025-05-19): Dashboard com shipment tracking e route map

### Productivity
- (2025-04-13): Dashboard com summary cards, focus, tasks e projects

---

## Contributors

Agradecimentos a todos os contribuidores:

- [@arhamkhnz](https://github.com/arhamkhnz) - Autor original
- [@Manasa0424](https://github.com/Manasa0424) - CRM Dashboard
- [@likui628](https://github.com/likui628) - System Theme Mode
- [@fiifiofosu](https://github.com/fiifiofosu) - Navigation Layout
- [@Muhammadrizo14](https://github.com/Muhammadrizo14) - Search Dialog

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
