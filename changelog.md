# BCRM — Upstream Changelog

> Histórico técnico da base que originou o BCRM v2, a partir de `arhamkhnz/next-shadcn-admin-dashboard`, branch `main`.
>
> **Período:** 01/08/2024 → 12/08/2026  
> **Histórico upstream:** 641 commits  
> **Ordenação:** mais recente → mais antigo.
>
> Os identificadores `YYYY.MM` são versões históricas reconstruídas por mês e **não são tags/releases oficiais do upstream**.

## Objetivo

Este arquivo será futuramente consumido pela interface do BCRM como histórico de atualizações. Por isso, a ordem deliberadamente começa pelo período mais recente: o usuário deve encontrar primeiro o que mudou por último.

## Como interpretar

- **Feature:** funcionalidade ou tela nova.
- **Refactor:** mudança estrutural/arquitetural.
- **Fix:** correção de comportamento, UI, acessibilidade ou compatibilidade.
- **Chore:** manutenção, dependências, tooling ou pequenas melhorias.
- **Merge:** integração de uma branch/PR; não representa necessariamente uma segunda implementação.
- Atualizações repetitivas de dependências podem ser agrupadas quando o efeito funcional é apenas sincronização de versões/lockfile, mas continuam contabilizadas no histórico.

---

# 2026

## 2026.08 — Atualizações mais recentes

**Período:** 01/08/2026 → 12/08/2026

### Destaques

- Novo **Profile screen**.
- Atualização do layout da tela de Profile.
- Migração do **dnd-kit** para a implementação mais recente.
- Migração da **Data Table para TanStack Table v9**.
- Novo componente **Questionnaire**.
- Atualizações contínuas de dependências e componentes.
- Refinamentos finais da base de UI antes do estado atual do upstream.

### Commits relevantes

- `5afd104b` — novo Profile screen.
- `ad309d53` — atualização do layout do Profile.
- `150bf4aa` — migração do dnd-kit.
- `934daf7d` — migração da Data Table para TanStack Table v9.
- `a70abdcf` — novo componente Questionnaire.

### Relevância para o BCRM

Este é o período que deve aparecer primeiro no changelog público do BCRM. A base técnica mais recente do upstream inclui Next.js 16, React 19, Tailwind 4, TanStack Table 9 e dnd-kit moderno; mudanças dessa fase devem ser avaliadas antes de qualquer atualização equivalente no BCRM.

---

## 2026.07 — Tabelas, drag-and-drop e expansão de módulos

### Destaques

- Evolução significativa da infraestrutura de tabelas.
- Migração/adoção de APIs mais recentes do TanStack Table.
- Modernização do drag-and-drop com dnd-kit.
- Expansão do File Manager.
- Novas telas e refinamentos de monitoramento.
- Atualizações de dependências e correções de compatibilidade.

### Impacto no BCRM

É uma fase especialmente relevante para listas de contatos, empresas, oportunidades e pipeline. O BCRM deve reutilizar os padrões de tabela e drag-and-drop do v2 em vez de criar implementações paralelas.

---

## 2026.06 — Grande expansão funcional

**Um dos meses mais importantes da evolução do upstream.**

### Calendar

- Expansão da experiência de calendário.
- Integração/setup do FullCalendar v7.
- Componentização do calendário.

Commit de referência:

- `a37b9be2` — `chore(calendar): add FullCalendar v7 component setup`.

### Sidebar e navegação

- Simplificação da renderização dos itens.
- Modelo de dados de navegação mais rígido.
- Correções para sidebar colapsada.
- Refinamentos da navegação.

Commits relevantes:

- `6a9a4a2f` — simplificação de rendering.
- `5ebca71f` — simplificação de rendering.
- `8d2b082a` — `tighten nav item data model`.
- `2ae27c60` — `polish collapsed sidebar navigation`.

### Infrastructure Dashboard

- Novo dashboard de infraestrutura.
- Refinamento da apresentação de saúde da infraestrutura.
- Melhoria dos dados exibidos.
- Documentação e integração da feature.

Commits relevantes:

- `927f1569` — `feat: add infrastructure dashboard`.
- `4d75100e` — `feat: refine infrastructure dashboard`.
- `61c9d1b6` — `feat: improve infrastructure health data`.
- `df4898fd` — merge da feature de infraestrutura.

### Outras evoluções

- Chat e módulos de produtividade.
- Tasks e experiências de trabalho.
- Refinamentos de layout e componentes.
- Atualizações de dependências.

### Relevância para o BCRM

Calendário, tarefas, navegação e componentes de dashboard são diretamente reutilizáveis no CRM. Entretanto, funcionalidades do domínio Infrastructure/Academy/etc. não devem ser confundidas com funcionalidades próprias do BCRM.

---

## 2026.05 — Expansão e estabilização

### Destaques

- Evolução de dashboards especializados.
- Atualização de KPIs.
- Novos componentes e refinamentos visuais.
- Atualizações de dependências.
- Continuidade da estabilização da base Next.js 16.

### Relevância

Período predominantemente de evolução incremental e preparação para a expansão funcional dos meses seguintes.

---

## 2026.04 — Next.js 16

### Destaques

- Upgrade para Next.js 16.
- Bump para Next.js `16.2.2`.
- Refinamento de dashboards e painéis.
- Atualização de dependências.
- Correções de componentes e controles nativos.

### Commits relevantes

- `a9eae56f` — `chore: bump next to 16.2.2`.
- `b7e735dc` — `chore: bump panels and tweak dashboard layout`.
- `464345fc` — `chore: refresh dependencies and update dashboard icon`.
- `ccf1de3f` — `fix: style native select options`.

### Relevância para o BCRM

Essa fase é uma das raízes diretas do ambiente Next.js 16 utilizado pelo BCRM v2.

---

## 2026.03 — Preparação para a nova geração da stack

### Destaques

- Atualizações de dependências.
- Ajustes de componentes para o ecossistema mais recente.
- Preparação da base para Next.js 16 e novas versões do tooling.

---

## 2026.02 — Evolução da fundação de UI

### Destaques

- Atualizações do ecossistema shadcn/Radix.
- Refinamentos de componentes.
- Melhorias de compatibilidade.
- Manutenção contínua da base.

---

## 2026.01 — Qualidade e manutenção

### Destaques

- Atualizações de dependências.
- Refinamentos do sistema de preferências.
- Correções de lint e pequenas regressões.
- Estabilização da arquitetura de layout.

---

# 2025

## 2025.12 — Persistência de preferências

**Um dos períodos arquiteturalmente mais importantes da base.**

### Destaques

- Simplificação da lógica de preferências.
- Conclusão da persistência das preferências.
- Ponte entre browser/window e provider.
- Correção temporária de flicker durante a inicialização.
- Ajustes dos textos dos controles de layout.
- Atualizações frequentes de dependências.

### Commits relevantes

- `2785e037` — `chore: simplified preference logic`.
- `bcce819b` — `feat: completed preference persistence setup`.
- `4d0c0b32` — `feat: add window prefs bridge + temporary flicker fix in provider`.
- `745b5ea2` — `chore: update layout controls preferences text`.

### Relevância para o BCRM

A arquitetura atual de preferências do BCRM é herdeira direta dessa evolução. Tema, layout, sidebar e demais preferências devem continuar centralizados nessa infraestrutura.

---

## 2025.11 — Preferências e personalização

### Destaques

- Evolução do mecanismo de preferências.
- Melhorias de persistência.
- Ajustes na aplicação das preferências ao layout.
- Refinamento do estado inicial da aplicação.
- Preparação para reduzir flicker/hydration mismatch.

---

## 2025.10 — Base para preferências persistentes

### Destaques

- Evolução inicial do sistema de preferências.
- Preparação da persistência das configurações visuais.
- Refinamento da experiência de personalização.

---

## 2025.09 — Consolidação de componentes

### Destaques

- Atualização do ecossistema de componentes.
- Melhorias de consistência visual.
- Manutenção das telas existentes.
- Preparação para a evolução arquitetural do final de 2025.

---

## 2025.08 — Evolução contínua

### Destaques

- Atualizações de dependências.
- Ajustes de componentes.
- Refinamentos de navegação e layout.
- Continuidade do desenvolvimento modular.

---

## 2025.07 — Limpeza e preparação

### Destaques

- Remoção de dependências não utilizadas.
- Melhorias menores de código.
- Atualizações do README.
- Manutenção de dependências.
- Refinamentos de UI.

### Commit relevante

- `47192bad` — `chore: remove unused dependencies & minor improvements`.

---

## 2025.06 — Componentização e produtividade

### Destaques

- Evolução de componentes compartilhados.
- Melhorias em dashboards e telas de produtividade.
- Refinamento de navegação e controles.
- Expansão de telas independentes.
- Evolução de chat, mail, tasks e calendário.

### Direção arquitetural

Consolidação do princípio de manter composição específica próxima da feature e primitives/utilidades compartilhadas em camadas centrais.

---

## 2025.05 — Academy e expansão de módulos

### Destaques

- Evolução do dashboard Academy.
- Finalização de layout e KPI cards.
- Adição do dashboard de professores.
- Crescimento do conjunto de telas especializadas.

### Commits relevantes

- `5f905a53` — `feat(academy): finalize academy dashboard layout and KPI cards`.
- `5532e070` — `Add academy teacher dashboard`.
- `c0f9f793` — `chore: update KPI`.

### Impacto arquitetural

Demonstração de que a mesma fundação visual consegue sustentar domínios diferentes sem duplicar infraestrutura.

---

## 2025.04 — Calendar e FullCalendar

### Destaques

- Introdução da tela de calendário.
- Evolução para uma integração mais estruturada com FullCalendar.
- Navegação, eventos, filtros e indicadores.
- Base para futuras experiências de agenda.

### Commits relevantes

- `1b483a33` — `feat: add calendar`.
- `4edb326c` — `feat: add full calendar`.

### Relevância para o BCRM

Base importante para agenda, atividades, compromissos e tarefas comerciais.

---

## 2025.03 — Evolução dos dashboards

### Destaques

- Expansão dos componentes de dashboard.
- Melhorias em cards, gráficos e layouts.
- Evolução da linguagem visual.
- Preparação para dashboards especializados.

---

## 2025.02 — Ecossistema shadcn

### Destaque principal

- Atualização dos componentes shadcn e pacotes relacionados para versões mais recentes.

### Commit relevante

- `05d31789` — `chore: update shadcn components & packages to latest version`.

---

## 2025.01 — Lint e organização

### Destaques

- Atualização de dependências.
- Limpeza geral do código.
- Regras de nomenclatura de arquivos mais rígidas.
- Lint completo da base.

### Commits relevantes

- `cf35a030` — atualização de dependências e limpeza.
- `ebcf6b2b` — convenções de nomes de arquivos e lint da base.

---

# 2024

## 2024.12 — Qualidade e lint

### Destaques

- Atualizações de dependências.
- Melhorias na configuração do ESLint.
- Limpeza do código.
- Preparação para a expansão de funcionalidades em 2025.

### Commits relevantes

- `ef9b7e60` — atualização da configuração do ESLint.
- `cbcba5cd` — `chore: update dependencies`.

---

## 2024.11 — Estruturação e manutenção

### Destaques

- Evolução da estrutura de dashboard.
- Limpeza e atualização de dependências.
- Ajustes de configuração e componentes.
- Preparação para ciclos mais rápidos de desenvolvimento.

---

## 2024.10 — Refinamento de UI e dependências

### Destaques

- Atualizações recorrentes de dependências.
- Refinamentos de componentes de formulário e controles nativos.
- Correções de apresentação de elementos como `select`.
- Continuidade da padronização visual.

### Commit relevante

- `f8aba095` — `chore: update dependencies` (12/10/2024).

---

## 2024.09 — Consolidação da base

### Destaques

- Expansão progressiva dos componentes de dashboard.
- Refinamentos visuais e de layout.
- Ciclos de manutenção das dependências.
- Evolução do conjunto de componentes reutilizáveis.

---

## 2024.08 — Fundação do projeto

**O início da linha histórica.**

### Destaques

- Criação inicial do projeto.
- Primeira árvore de aplicação Next.js.
- Primeira base de componentes e dashboard.
- Início do padrão visual que posteriormente evoluiu para o Studio Admin.
- Primeiros ciclos de atualização de dependências e componentes.

### Commits de referência

- `c70ba814` — `Initial commit`.
- `98506277` — `initial commit`.

### Relevância para o BCRM

Ponto de origem histórica da base posteriormente transformada no BCRM.

---

# Nota de manutenção

Este changelog representa a **história do upstream**, não uma lista de releases do BCRM. O BCRM deve manter suas próprias entradas de produto separadas das mudanças herdadas do upstream.

Quando novas mudanças do upstream forem incorporadas ao BCRM, a entrada correspondente deve aparecer **no topo do documento**, preservando a ordem decrescente por data.

Para a futura UI de atualizações, recomenda-se consumir os blocos `YYYY.MM` como grupos expansíveis, exibindo inicialmente os meses mais recentes e permitindo navegação para o histórico antigo.