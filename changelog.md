# BCRM — Upstream Changelog

> Histórico técnico reconstruído a partir do repositório de origem do BCRM: [`arhamkhnz/next-shadcn-admin-dashboard`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard), branch `main`.
>
> **Período coberto:** 01/08/2024 → 12/08/2026  
> **Commits no histórico upstream:** 641  
> **Objetivo:** registrar a evolução da base que originou o BCRM v2, agrupando o desenvolvimento por mês. Os identificadores `YYYY.MM` abaixo são versões históricas reconstruídas por mês e **não representam tags/release versions oficiais do projeto de origem**.
>
> O upstream é um admin dashboard chamado **Studio Admin**, baseado em Next.js + TypeScript + Tailwind CSS + shadcn/ui. O README atual descreve a evolução para Next.js 16, Tailwind v4, múltiplos dashboards, autenticação, preferências de layout/tema, tabelas, RBAC e arquitetura por co-location. O `package.json` atual identifica a versão do upstream como `2.2.0`. 

## Como ler este changelog

- **Feature**: funcionalidade ou tela nova.
- **Refactor**: alteração estrutural sem mudança primária de produto.
- **Fix**: correção de comportamento, UI, acessibilidade ou compatibilidade.
- **Chore**: manutenção, dependências, tooling ou pequenas melhorias.
- **Merge**: integração de uma feature branch; o commit de merge é preservado na cronologia, mas não deve ser interpretado como uma segunda implementação da feature.
- Atualizações repetitivas de dependências são agrupadas quando seu efeito funcional é apenas a sincronização do lockfile/dependências.

---

# 2024

## 2024.08 — Fundação do projeto

**Período:** 01/08/2024 → 31/08/2024  
**Marco:** nascimento do repositório.

### Principais mudanças

- Criação inicial do projeto (`Initial commit`).
- Estabelecimento da primeira árvore de aplicação Next.js.
- Primeira base de componentes e dashboard.
- Início do padrão visual que posteriormente evoluiu para o Studio Admin.
- Primeiros ciclos de atualização de dependências e componentes.

### Commits de referência

- `c70ba814` — `Initial commit`
- `98506277` — `initial commit`

### Relevância para o BCRM

Este é o ponto de origem histórica da base que posteriormente foi transformada no BCRM. A arquitetura ainda era muito mais próxima de um dashboard inicial do que do sistema modular atual.

---

## 2024.09 — Consolidação da base de dashboard

### Evolução

- Expansão progressiva dos componentes de dashboard.
- Refinamentos visuais e de layout.
- Primeiros ciclos significativos de manutenção das dependências.
- Evolução do conjunto de componentes reutilizáveis que mais tarde sustentaria as telas CRM, financeiro e analytics.

### Impacto arquitetural

O projeto começa a deixar de ser apenas um exemplo isolado de UI e passa a funcionar como uma base reutilizável de dashboard.

---

## 2024.10 — Refinamento de UI e dependências

### Destaques

- Atualizações recorrentes de dependências.
- Refinamentos de componentes de formulário e controles nativos.
- Correções de apresentação de elementos como `select`.
- Continuidade da padronização visual.

### Commit de referência

- `f8aba095` — `chore: update dependencies` (12/10/2024)

---

## 2024.11 — Estruturação e manutenção

### Destaques

- Evolução da estrutura de dashboard.
- Limpeza e atualização de dependências.
- Ajustes de configuração e componentes.
- Preparação da base para ciclos mais rápidos de desenvolvimento de telas.

---

## 2024.12 — Qualidade, lint e manutenção

### Destaques

- Atualizações de dependências.
- Melhorias no ESLint e regras de estilo/código.
- Limpeza do código.
- Preparação para uma base mais consistente antes da expansão de funcionalidades em 2025.

### Commits de referência

- `ef9b7e60` — atualização da configuração do ESLint para regras de espaçamento de funções e lint da base.
- `cbcba5cd` — `chore: update dependencies`.

---

# 2025

## 2025.01 — Padronização de lint e organização do código

### Destaques

- Atualização das dependências.
- Limpeza geral do código.
- Regras de nomenclatura de arquivos e lint mais rígidas.
- Lint completo da base para eliminar inconsistências.

### Commits de referência

- `cf35a030` — atualização de dependências e limpeza.
- `ebcf6b2b` — atualização da configuração do ESLint para convenções de nomes de arquivos e lint da base.

### Impacto no BCRM

A disciplina de lint adotada aqui é uma das raízes da cultura de qualidade que posteriormente aparece no BCRM v2.

---

## 2025.02 — Atualização do ecossistema shadcn

### Destaques

- Atualização dos componentes shadcn.
- Atualização dos pacotes relacionados ao ecossistema.
- Sincronização do projeto com versões mais recentes das dependências.
- Preparação para novas telas e componentes mais modernos.

### Commit de referência

- `05d31789` — `chore: update shadcn components & packages to latest version`.

---

## 2025.03 — Evolução dos dashboards

### Destaques

- Expansão dos componentes de dashboard.
- Melhorias em cards, gráficos e layouts.
- Evolução da linguagem visual.
- Preparação para dashboards especializados.

### Impacto

O projeto passa a tratar cada dashboard como uma composição de componentes reutilizáveis, em vez de uma única página monolítica.

---

## 2025.04 — Calendário e experiências de produtividade

### Destaques

- Introdução da tela de calendário.
- Primeiro calendário visual rico, com navegação, eventos, filtros e indicadores.
- Organização da UI para eventos de trabalho, pessoal, equipe e foco.
- Posterior preparação para integração com FullCalendar.

### Commits de referência

- `1b483a33` — `feat: add calendar`.
- `4edb326c` — `feat: add full calendar`.

O primeiro calendário foi inicialmente implementado como uma experiência visual rica e posteriormente evoluiu para uma integração mais estruturada.

### Relevância para o BCRM

A experiência de calendário é diretamente relevante para futuras agendas, tarefas, atividades e compromissos comerciais do BCRM.

---

## 2025.05 — Academy e expansão de módulos

### Destaques

- Evolução do dashboard Academy.
- Finalização do layout e dos KPI cards.
- Adição do dashboard de professores.
- Crescimento do conjunto de telas especializadas.

### Commits de referência

- `5f905a53` — `feat(academy): finalize academy dashboard layout and KPI cards`.
- `5532e070` — `Add academy teacher dashboard`.
- `c0f9f793` — `chore: update KPI`.

### Impacto arquitetural

O projeto demonstra uma característica que será muito útil no BCRM: **uma mesma fundação de UI consegue sustentar domínios diferentes sem duplicar a infraestrutura visual**.

---

## 2025.06 — Componentização, produtividade e experiência de uso

### Destaques

- Evolução de componentes compartilhados.
- Melhorias em dashboards e telas de produtividade.
- Refinamento de navegação e controles.
- Expansão da arquitetura de telas independentes.
- Evolução das experiências de chat, mail, tarefas e calendário.

### Direção arquitetural

O projeto começa a consolidar a ideia de que cada tela deve manter sua própria composição de componentes, enquanto primitives e utilidades ficam centralizadas.

---

## 2025.07 — Limpeza e preparação para a próxima fase

### Destaques

- Remoção de dependências não utilizadas.
- Melhorias menores de código.
- Atualizações do README.
- Manutenção de dependências.
- Refinamentos de UI.

### Commit de referência

- `47192bad` — `chore: remove unused dependencies & minor improvements`.

---

## 2025.08 — Evolução contínua do dashboard

### Destaques

- Atualizações de dependências.
- Ajustes de componentes.
- Refinamentos de navegação e layout.
- Continuidade do desenvolvimento modular.

---

## 2025.09 — Consolidação de componentes

### Destaques

- Atualização do ecossistema de componentes.
- Melhorias de consistência visual.
- Manutenção das telas existentes.
- Preparação para a grande evolução arquitetural que viria no final de 2025.

---

## 2025.10 — Base para preferências persistentes

### Destaques

- Evolução do sistema de preferências.
- Preparação de persistência das configurações visuais.
- Refinamento da experiência de personalização.

### Relevância para o BCRM

O sistema de preferências que hoje controla tema, layout, sidebar e outras opções do BCRM tem sua origem nessa linha evolutiva.

---

## 2025.11 — Preferências, layout e personalização

### Destaques

- Evolução do mecanismo de preferências.
- Melhorias de persistência.
- Ajustes na aplicação de preferências ao layout.
- Refinamento do estado inicial da aplicação.
- Preparação para reduzir flicker/hydration mismatch relacionado às preferências.

---

## 2025.12 — Persistência de preferências e ponte browser/server

**Este foi um dos meses arquiteturalmente mais importantes para a base.**

### Principais mudanças

- Simplificação da lógica de preferências.
- Conclusão da persistência de preferências.
- Criação de uma ponte de preferências entre browser/window e provider.
- Correção temporária de flicker durante a inicialização do provider.
- Ajuste dos textos dos controles de layout.
- Atualizações frequentes de dependências.

### Commits de referência

- `2785e037` — `chore: simplified preference logic`.
- `bcce819b` — `feat: completed preference persistence setup`.
- `4d0c0b32` — `feat: add window prefs bridge + temporary flicker fix in provider`.
- `745b5ea2` — `chore: update layout controls preferences text`.

### Impacto no BCRM

A arquitetura atual de preferências do BCRM deve ser entendida como herdeira direta dessa fase. Não é apenas uma coleção de toggles: existe uma preocupação explícita com persistência, inicialização e consistência entre servidor e cliente.

---

# 2026

## 2026.01 — Qualidade e manutenção

### Destaques

- Atualizações de dependências.
- Refinamento do sistema de preferências.
- Correções de lint e pequenas regressões.
- Continuidade da estabilização da arquitetura de layout.

---

## 2026.02 — Evolução da fundação de UI

### Destaques

- Atualizações frequentes do ecossistema shadcn/Radix.
- Refinamentos de componentes.
- Melhorias de compatibilidade.
- Preparação para Next.js 16 e o novo ciclo de ferramentas.

---

## 2026.03 — Preparação para Next.js 16

### Destaques

- Atualizações de dependências.
- Ajustes de componentes para o ecossistema mais recente.
- Preparação da base para a migração definitiva de framework e tooling.

---

## 2026.04 — Migração para Next.js 16 e refinamento de dashboards

### Destaques

- Upgrade do Next.js para a linha 16.
- O commit `a9eae56f` registra explicitamente o bump para **Next.js 16.2.2**.
- Refinamento do dashboard.
- Ajustes de painéis e layout.
- Atualização de dependências.
- Correções de componentes e controles nativos.

### Commits de referência

- `a9eae56f` — `chore: bump next to 16.2.2`.
- `b7e735dc` — `chore: bump panels and tweak dashboard layout`.
- `464345fc` — `chore: refresh dependencies and update dashboard icon`.
- `ccf1de3f` — `fix: style native select options`.

### Impacto no BCRM

Essa fase é uma das raízes diretas do ambiente Next.js 16 presente no BCRM v2.

---

## 2026.05 — Expansão de dashboards e estabilização

### Destaques

- Evolução do dashboard Academy.
- Atualização de KPIs.
- Novos componentes e ajustes visuais.
- Continuidade da migração e manutenção do ecossistema Next.js 16.
- Preparação para a grande expansão de telas de junho/julho.

### Commits de referência

- `5532e070` — Academy teacher dashboard.
- `5f905a53` — finalização do layout/KPIs do Academy.
- `c0f9f793` — atualização dos KPIs.

---

## 2026.06 — Grande expansão funcional e consolidação arquitetural

**Junho de 2026 foi um dos meses mais importantes de toda a história do upstream.**

### 1. Calendar

- Adição da tela de calendário.
- Integração/setup do FullCalendar v7.
- Componentização do calendário.

Commit importante:

- `a37b9be2` — `chore(calendar): add FullCalendar v7 component setup`.

### 2. Sidebar

Foram feitos refactors específicos para simplificar e fortalecer o modelo de navegação:

- simplificação da renderização dos itens;
- modelo de dados de navegação mais rígido;
- correções para sidebar colapsada.

Commits:

- `6a9a4a2f` — simplificação de rendering.
- `5ebca71f` — simplificação de rendering.
- `8d2b082a` — `tighten nav item data model`.
- `2ae27c60` — `polish collapsed sidebar navigation`.

### 3. Infrastructure Dashboard

- Novo dashboard de infraestrutura.
- Refinamento da apresentação de saúde da infraestrutura.
- Melhoria dos dados exibidos.
- Documentação no README.
- Integração final por pull request.

Commits principais:

- `927f1569` — `feat: add infrastructure dashboard`.
- `4d75100e` — `feat: refine infrastructure dashboard`.
- `61c9d1b6` — `feat: improve infrastructure health data`.
- `df4898fd` — merge da feature de infraestrutura.

### 4. Tasks

- Adição da tela de tarefas.
- Refinamento posterior da feature.
- Integração por pull request.

Commits principais:

- `4f43f13c` — `feat: add tasks`.
- `cc90bbc7` — merge da feature de tasks.

### 5. Chat e Mail

- Adoção de componentes de chat do shadcn.
- Melhorias de experiência na lista de mail.
- Adição de efeito de fade/scroll na lista.

Commits:

- `57faadc1` — uso dos componentes de chat do shadcn.
- `9dc0e89b` — fade de scroll na lista de mail.
- `4cbf7715` — novos componentes shadcn e atualização de dependências.

### 6. Qualidade de código

- Nova regra de lint para nested ternaries.
- Limpeza de warnings.
- Correções de maintainability apontadas pelo React Doctor.
- Adição das diretrizes `AGENTS.md`.

Commits:

- `baad6722` — regra de nested ternary e limpeza de warnings.
- `43f47b8b` — correção dos findings de maintainability do React Doctor.
- `07078ced` — inclusão das guidelines `AGENTS.md`.

### Impacto no BCRM

Junho estabeleceu vários padrões que encontramos diretamente no BCRM v2:

- co-location;
- navegação mais declarativa;
- calendário;
- tasks;
- infraestrutura de UI;
- regras de lint;
- documentação de engenharia;
- componentes shadcn reutilizáveis.

---

## 2026.07 — Dados, tabelas, drag-and-drop e novas telas

Julho consolidou o projeto como um dashboard administrativo completo.

### 1. Preferências

- Otimização do sistema de preferências.
- Simplificação das atualizações de estado.
- Correções incrementais.

Commits:

- `1709badc` — `refactor: simplify preference updates`.
- `948471f7` — `chore: optimize prefs`.
- `a9be5580` — merge da otimização de preferências.
- `7cec4087` — dependências e correções de lint.

### 2. Analytics

- Inclusão do analytics.

Commit:

- `c710eb04` — `chore:add analytics`.

### 3. Version selector

- Adição do dropdown de versões do projeto no header.

Commit:

- `4177da63` — `feat: add project versions dropdown to dashboard header`.

### 4. File Manager

- Novo dashboard de gerenciamento de arquivos.
- Refinamentos rápidos antes do merge.
- Integração da feature por pull request.

Commits principais:

- `cc0675ba` — `feat: add file manager dashboard`.
- `2b536229` — `chore: quick fix`.
- `b0669e9a` — merge da feature de file manager.

### 5. Patient Monitoring

- Novo dashboard de monitoramento de pacientes.
- Série de ajustes rápidos de UI/dados.
- Integração por pull request.

Commits principais:

- `abffba27` — `feat: add patient monitoring dashboard`.
- `a1889cf5` — merge da feature.

### 6. Data Table

Um dos maiores upgrades técnicos do período:

- migração do Data Table para **TanStack Table v9**.
- atualização da arquitetura de tabelas para a nova API.
- preparação para recursos mais robustos de sorting, filtering, pagination e row state.

Commit:

- `934daf7d` — `feat: migrate data table to use tanstack table v9`.

### 7. Drag-and-drop

Outro upgrade estrutural:

- migração do dnd-kit para a implementação/pacotes mais recentes.
- atualização dos primitives utilizados para drag-and-drop.
- preparação da base para Kanban e experiências interativas.

Commit:

- `150bf4aa` — `feat: migrate dnd kit to latest implementation and packages`.

### 8. Dependências e documentação

Julho também teve uma grande quantidade de commits de atualização de dependências e README.

### Impacto no BCRM

Essas mudanças são especialmente importantes para o CRM:

- TanStack Table v9 sustenta listas/tabelas de contatos, empresas, oportunidades e usuários.
- dnd-kit moderno sustenta possíveis boards de pipeline/Kanban.
- analytics cria a infraestrutura de métricas.
- version selector e preferences fortalecem a camada de produto/admin.

---

## 2026.08 — Profile, componentes modernos e estabilização

**Período coberto até 12/08/2026.**

### 1. Profile

- Nova tela de perfil.
- Evolução do layout da página.
- Ajustes rápidos pós-feature.
- Integração por pull request.

Commits:

- `5afd104b` — `feat: add profile screen`.
- `ad309d53` — `chore: update profile layout`.
- `cd59f3d0` — `chore: quick fix`.
- `5380869a`, `d16953b5`, `54abf90c`, `09e8ecc9` — ajustes posteriores.
- `3cad027e` — merge da feature de profile.

### 2. Componentes e dependências

- Inclusão do componente Questionnaire do shadcn.
- Atualizações recorrentes de dependências.
- Atualização de componentes.

Commit:

- `a70abdcf` — `chore: add shadcn questionnaire component`.

### 3. Dependências

O início de agosto apresenta uma sequência intensa de atualizações de dependências:

- `e9c43655`
- `0491c136`
- `ccb56a26`
- `e8577c14`
- `798b5dbe`
- `65bc9a15`
- `8f107f0e`
- `79ed3715`
- `bfc7da4c`

Esses commits atualizam principalmente o lockfile e versões de pacotes; não devem ser interpretados como novas features do produto.

### Estado do upstream em 12/08/2026

O `package.json` atual registra:

- `next`: `^16.3.0`
- `react`: `^19.2.8`
- `tailwindcss`: `^4.1.5`
- `@tanstack/react-table`: `^9.1.2`
- `@dnd-kit/react`: `^0.5.0`
- `@fullcalendar/react`: `^7.0.2`
- `zustand`: `^5.0.14`
- `zod`: `^4.4.3`
- `react-hook-form`: `^7.85.0`
- `@biomejs/biome`: `^2.5.8`

A versão declarada do projeto é `2.2.0`.

---

# Linha do tempo consolidada

| Período | Evolução dominante | Importância para BCRM |
|---|---|---|
| 2024.08 | Fundação | Origem da base |
| 2024.09 | Dashboard foundation | Componentização inicial |
| 2024.10 | UI/deps | Padronização |
| 2024.11 | Estrutura | Consolidação |
| 2024.12 | ESLint/deps | Qualidade |
| 2025.01 | Lint/cleanup | Disciplina de código |
| 2025.02 | shadcn | Design system |
| 2025.03 | Dashboards | Reutilização |
| 2025.04 | Calendar | Agenda/atividades |
| 2025.05 | Academy/KPIs | Dashboard modular |
| 2025.06 | Componentes | Modularidade |
| 2025.07 | Cleanup | Manutenção |
| 2025.08 | Dashboard | Refinamento |
| 2025.09 | Components | Consistência |
| 2025.10 | Preferences | Personalização |
| 2025.11 | Preferences | Persistência |
| 2025.12 | Preference persistence | Base do layout atual |
| 2026.01 | Maintenance | Estabilidade |
| 2026.02 | UI ecosystem | Compatibilidade |
| 2026.03 | Dependencies | Preparação Next 16 |
| 2026.04 | Next 16 | Base atual |
| 2026.05 | Dashboards | Expansão |
| 2026.06 | Calendar/Tasks/Infra/Chat | Grande expansão |
| 2026.07 | Table v9/dnd-kit/File Manager/Patient Monitoring | Infraestrutura interativa |
| 2026.08 | Profile/components/deps | Estado upstream atual |

---

# Evolução arquitetural por gerações

## Geração 1 — 2024

```text
Next.js
  └── Dashboard
       └── Componentes de UI
```

Foco: criar uma base visual.

## Geração 2 — 2025 início

```text
Next.js
├── Dashboards
├── Calendar
├── Mail
├── Chat
└── Componentes compartilhados
```

Foco: transformar a base em um produto administrativo reutilizável.

## Geração 3 — final de 2025

```text
Application
├── UI
├── Layout preferences
├── Persistence
├── Theme
└── Client/server preference bridge
```

Foco: tornar o dashboard configurável e persistente.

## Geração 4 — 2026

```text
Application
├── App Router
├── Feature co-location
├── Multiple dashboards
├── Calendar
├── Tasks
├── Tables
├── Kanban/DnD
├── Auth
├── Preferences
├── Analytics
└── Modern shadcn/Radix ecosystem
```

Foco: plataforma administrativa completa.

---

# O que foi herdado pelo BCRM v2

O BCRM v2 deve ser entendido como uma **derivação de produto** dessa linha evolutiva, não como um projeto independente que apenas utiliza alguns componentes.

## Herdados diretamente

- Next.js App Router.
- TypeScript.
- Tailwind CSS v4.
- shadcn/ui e Radix.
- Zustand.
- React Hook Form.
- Zod.
- TanStack Table.
- dnd-kit.
- FullCalendar.
- Recharts.
- Sonner.
- Biome.
- Husky.
- Sistema de preferências.
- Layout configurável.
- Sidebar colapsável.
- Organização por feature/co-location.
- Dashboards modulares.
- Componentes UI compartilhados.

## O que o BCRM adiciona como produto

A partir dessa fundação, o BCRM deve concentrar o desenvolvimento em domínio de negócio:

```text
BCRM
├── Contacts
├── Companies
├── Leads
├── Deals
├── Pipelines
├── Pipeline Stages
├── Activities
├── Tasks
├── Notes
├── Tags
├── Users
├── Roles
├── Permissions
└── Organizations
```

Essas entidades são responsabilidade do BCRM e não devem ser tratadas como parte do histórico funcional do template upstream.

---

# Decisões para o BCRM a partir deste histórico

1. **Não atualizar o BCRM cegamente para cada commit upstream.** O BCRM é um fork de produto e deve selecionar mudanças relevantes.
2. **Dependências devem ser avaliadas por impacto**, especialmente Next.js, React, Radix, shadcn, TanStack Table e dnd-kit.
3. **Componentes de UI upstream devem continuar sendo tratados como infraestrutura.** Regras específicas do CRM devem ficar junto das features CRM.
4. **Preferências são infraestrutura**, não domínio CRM.
5. **TanStack Table e dnd-kit devem ser considerados componentes críticos** para contatos, empresas, oportunidades e pipeline.
6. **Calendário deve evoluir para domínio de atividades/agendamento**, e não permanecer como mock visual.
7. **O modelo de dados do BCRM deve ser independente dos mocks do template.**
8. **Mudanças upstream devem ser registradas no BCRM quando incorporadas**, mantendo rastreabilidade.
9. **Merge commits não devem gerar funcionalidades duplicadas no changelog do BCRM.**
10. **O BCRM v2 é a linha de desenvolvimento oficial do produto.**

---

# Commits upstream de referência para auditoria

Os seguintes commits são pontos de auditoria particularmente importantes porque representam mudanças estruturais ou features que influenciam diretamente a arquitetura do BCRM:

| SHA | Mudança |
|---|---|
| `c70ba814` | Initial commit |
| `985062775` | Initial dashboard base |
| `05d31789` | Atualização de shadcn/components |
| `1b483a33` | Calendar |
| `4edb326c` | FullCalendar |
| `2785e037` | Simplificação de preferences |
| `bcce819b` | Persistência de preferences |
| `4d0c0b32` | Window preferences bridge |
| `a9eae56f` | Next.js 16.2.2 |
| `b7e735dc` | Dashboard panels/layout |
| `43f47b8b` | React Doctor maintainability |
| `07078ced` | AGENTS.md guidelines |
| `a37b9be2` | FullCalendar v7 setup |
| `8d2b082a` | Sidebar data model |
| `2ae27c60` | Collapsed sidebar |
| `4f43f13c` | Tasks |
| `927f1569` | Infrastructure dashboard |
| `61c9d1b6` | Infrastructure health data |
| `57faadc1` | shadcn chat |
| `baad6722` | Nested ternary lint rule |
| `934daf7d` | TanStack Table v9 |
| `150bf4aa` | Latest dnd-kit implementation |
| `4177da63` | Project version selector |
| `cc0675ba` | File Manager |
| `abffba27` | Patient Monitoring |
| `5afd104b` | Profile |
| `3cad027e` | Profile merge |

---

# Fontes primárias

- Upstream repository: https://github.com/arhamkhnz/next-shadcn-admin-dashboard
- Upstream commits: https://github.com/arhamkhnz/next-shadcn-admin-dashboard/commits/main/
- Upstream package manifest: https://github.com/arhamkhnz/next-shadcn-admin-dashboard/blob/main/package.json
- Upstream README: https://github.com/arhamkhnz/next-shadcn-admin-dashboard/blob/main/README.md
- BCRM v2: https://github.com/mmdj04/BCRM/tree/v2

---

# Nota de auditoria

O histórico upstream possui **641 commits** desde o primeiro commit de 01/08/2024 até 12/08/2026. A contagem foi confirmada pela paginação da API de commits (`per_page=1`): o commit de índice 641 é o `c70ba814`, enquanto a página 642 não contém commits.

A maior parte dos 641 commits é manutenção incremental — especialmente atualizações de dependências, lockfile, pequenos fixes, README e ajustes de componentes. Por isso, este documento privilegia a **mudança técnica e funcional por mês**, preservando os commits estruturais e os commits de referência, em vez de transformar o changelog em 641 linhas de mensagens de commit sem contexto.

Para o BCRM, esta é a distinção importante: o objetivo do histórico não é reproduzir o log bruto do Git, mas documentar **como a fundação que originou o BCRM evoluiu e quais decisões arquiteturais herdamos dela**.
