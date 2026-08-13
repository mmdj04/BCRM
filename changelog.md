# BCRM — Upstream Changelog

> Histórico técnico da base que originou o BCRM v2, a partir de `arhamkhnz/next-shadcn-admin-dashboard`, branch `main`.
>
> **Período:** 01/08/2024 → 12/08/2026  
> **Histórico upstream:** 641 commits  
> **Ordenação:** mais recente → mais antigo.
>
> Este documento é uma reconstrução histórica baseada **nas mensagens e datas dos commits do upstream**. Não depende da análise dos diffs individuais. Commits de manutenção repetitivos, principalmente atualizações de dependências, são consolidados quando não representam uma mudança funcional distinta; eles continuam fazendo parte da contagem histórica.
>
> Os identificadores `YYYY.MM` abaixo são versões históricas reconstruídas por mês e **não são tags/releases oficiais do upstream**.

## Objetivo

Este arquivo será futuramente consumido pela interface do BCRM como histórico de atualizações. Por isso, a ordem deliberadamente começa pelo período mais recente: o usuário deve encontrar primeiro o que mudou por último.

A estrutura também preserva a distinção entre:

- **Upstream:** histórico do projeto que serviu de base.
- **BCRM:** alterações próprias do nosso produto.
- **Herdado/reutilizável:** recursos da base que podem ser aproveitados no BCRM.
- **Template/demo:** módulos do upstream que não pertencem ao domínio CRM.

## Convenções

- **Feature:** funcionalidade ou tela nova.
- **Refactor:** reorganização estrutural ou arquitetural.
- **Fix:** correção de comportamento, UI, acessibilidade ou compatibilidade.
- **Chore:** manutenção, dependências, tooling, limpeza ou pequenos ajustes.
- **Docs:** documentação/README/guidelines.
- **Merge:** integração de uma branch/PR; não deve ser interpretado como uma segunda implementação da mesma feature.
- **Dependency churn:** sequências de commits de atualização de dependências são agrupadas quando a mensagem não fornece informação funcional adicional.

---

# 2026

## 2026.08 — Profile, Data Table v9, dnd-kit e atualizações finais

**Período:** 01/08/2026 → 12/08/2026

### Principais mudanças registradas no histórico

- Inclusão do **Profile screen**.
- Refinamento do layout do Profile.
- Migração do **dnd-kit** para a implementação e pacotes mais recentes.
- Migração da **Data Table para TanStack Table v9**.
- Inclusão do componente **Questionnaire** do shadcn.
- Atualizações recorrentes de dependências.
- Atualizações menores, quick fixes e ajustes de componentes.
- Atualização de versão do Next.js.
- Inclusão/integração do dashboard de monitoramento de pacientes.
- Atualizações de README.

### Commits de maior relevância

- `5afd104b` — `feat: add profile screen`
- `ad309d53` — `chore: update profile layout`
- `3cad027e` — merge de `feat/profile`
- `150bf4aa` — `feat: migrate dnd kit to latest implementation and packages`
- `934daf7d` — `feat: migrate data table to use tanstack table v9`
- `a70abdcf` — `chore: add shadcn questionnaire component`
- `a1889cf5` — merge de `feat/patient-monitoring`
- `abffba27` — `feat: add patient monitoring dashboard`
- `b1a2da92` — `chore: update next version`

### Padrão do mês

O mês foi fortemente concentrado em **modernização da infraestrutura de UI**, atualização do ecossistema e incorporação de novas telas/dashboards.

### Relevância para o BCRM

Alta para tabelas e drag-and-drop. O BCRM deve continuar usando a infraestrutura de tabela e DnD da versão v2, evitando criar implementações paralelas. Profile e Patient Monitoring são módulos de referência visual, não funcionalidades do domínio CRM.

---

## 2026.07 — File Manager, tabelas, preferências e expansão de módulos

### Principais mudanças

- Adição do **File Manager dashboard**.
- Organização/refatoração de componentes de dashboard.
- Limpeza de código.
- Inclusão de dropdown de versões do projeto no header.
- Inclusão de analytics.
- Otimização das preferências.
- Simplificação das atualizações de preferências.
- Correções de lint e manutenção.
- Atualizações frequentes de dependências.
- Atualizações de README.
- Documentação de dashboard React Aria.
- Ajustes de Radix.
- Evolução de componentes e infraestrutura para a fase seguinte do projeto.

### Commits de referência

- `b0669e9a` — merge de `feat/file-manager`
- `cc0675ba` — `feat: add file manager dashboard`
- `82369882` — `refactor: organize dashboard components`
- `1b4780a3` — `chore: code cleanup`
- `4177da63` — `feat: add project versions dropdown to dashboard header`
- `c710eb04` — `chore:add analytics`
- `a9be5580` — merge de `chore/optimize-prefs`
- `948471f7` — `chore: optimize prefs`
- `1709badc` — `refactor: simplify preference updates`
- `7cec4087` — `chore: update deps & lint fixes`
- `58c66454` — `chore: revert radix version`
- `d292e08a` — `docs: add React Aria dashboard link`

### Relevância para o BCRM

Alta para a infraestrutura de preferências, organização de componentes, tabelas, navegação e qualidade. O File Manager e outros módulos especializados são referências de UI, não módulos CRM.

---

## 2026.06 — Calendar, Tasks, Chat, Infrastructure e qualidade

**Um dos períodos mais importantes do histórico.**

### Calendar

- Introdução da tela de Calendar.
- Integração do FullCalendar.
- Setup do **FullCalendar v7**.
- Evolução da infraestrutura de calendário.

Commits de referência:

- `4b5a3349` — merge de `feat/calendar`
- `1b483a33` — `feat: add calendar`
- `4edb326c` — `feat: add full calendar`
- `a37b9be2` — `chore(calendar): add FullCalendar v7 component setup`

### Tasks

- Criação da tela de Tasks.
- Refinamentos e correções associados.
- Merge da feature de Tasks.

Commits:

- `4f43f13c` — `feat: add tasks`
- `cc90bbc7` — merge de `feat/tasks`

### Chat / Mail / componentes

- Uso de componentes shadcn no Chat.
- Novos componentes shadcn.
- Scroll fade na lista de Mail.
- Ajustes de lint e warnings.

Commits:

- `57faadc1` — `chore: use shadcn chat components for chat screen`
- `9dc0e89b` — `chore: add scroll fade in mail list`
- `4cbf7715` — `feat: add new shadcn components & update deps`
- `baad6722` — `chore: add nested ternary lint rule and clean warnings`

### Infrastructure Dashboard

- Criação do Infrastructure Dashboard.
- Refinamento dos dados.
- Melhoria da informação de saúde da infraestrutura.
- Documentação e merge da feature.

Commits:

- `927f1569` — `feat: add infrastructure dashboard`
- `4d75100e` — `feat: refine infrastructure dashboard`
- `61c9d1b6` — `feat: improve infrastructure health data`
- `02fe0af3` — documentação do dashboard
- `df4898fd` — merge de `feat/infra`

### Sidebar / navegação

- Simplificação do rendering dos itens.
- Modelo de dados de navegação mais rígido.
- Refinamento da sidebar colapsada.

Commits:

- `2ae27c60` — `fix: polish collapsed sidebar navigation`
- `6a9a4a2f` — `refactor(sidebar): simplify nav item rendering`
- `5ebca71f` — `refactor(sidebar): simplify nav item rendering`
- `8d2b082a` — `refactor(sidebar): tighten nav item data model`

### Qualidade e arquitetura

- Inclusão do `AGENTS.md` com guidelines do projeto.
- Correções de maintainability identificadas pelo React Doctor.
- Atualizações de dependências e componentes.

Commits:

- `07078ced` — `docs: add AGENTS.md guidelines`
- `43f47b8b` — `refactor: fix maintainability findings (by react doctor)`
- `af7bb159` — `chore: update deps & components`

### Relevância para o BCRM

**Muito alta.** Calendar, Tasks, navegação, componentes shadcn, preferências e padrões de qualidade são partes diretamente aproveitáveis na aplicação CRM.

---

## 2026.05 — Academy e dashboards especializados

### Principais mudanças

- Evolução do Academy Dashboard.
- Finalização de layout e KPI cards.
- Inclusão do Academy Teacher Dashboard.
- Atualização de KPIs.
- Atualizações de dependências.
- Ajustes e estabilização dos dashboards.

Commits de referência:

- `5f905a53` — `feat(academy): finalize academy dashboard layout and KPI cards`
- `5532e070` — `Add academy teacher dashboard`
- `c0f9f793` — `chore: update KPI`

### Relevância para o BCRM

Moderada. Os componentes de KPI, cards e dashboards são referências visuais; o domínio Academy não deve ser incorporado ao CRM.

---

## 2026.04 — Next.js 16 e estabilização

### Principais mudanças

- Upgrade do Next.js.
- Bump para Next.js `16.2.2`.
- Atualizações de dependências.
- Refinamentos de dashboards e painéis.
- Atualização do ícone do dashboard.
- Correção de estilos de opções nativas de `select`.

Commits:

- `a9eae56f` — `chore: bump next to 16.2.2`
- `b7e735dc` — `chore: bump panels and tweak dashboard layout`
- `464345fc` — `chore: refresh dependencies and update dashboard icon`
- `ccf1de3f` — `fix: style native select options`

### Relevância para o BCRM

**Muito alta.** Essa fase consolida a base Next.js 16 que posteriormente aparece no BCRM v2.

---

## 2026.03 — Preparação da nova geração da stack

### Principais mudanças

- Atualizações do ecossistema.
- Atualizações de dependências.
- Ajustes de componentes e compatibilidade.
- Preparação progressiva da base para a geração Next.js 16.

### Relevância para o BCRM

Infraestrutura. Deve ser considerada principalmente como histórico de estabilização da stack.

---

## 2026.02 — Evolução da fundação de UI

### Principais mudanças

- Atualizações de componentes.
- Evolução do ecossistema shadcn/Radix.
- Melhorias de compatibilidade.
- Manutenção contínua das dependências.

### Relevância para o BCRM

Infraestrutura visual e de componentes.

---

## 2026.01 — Qualidade e manutenção

### Principais mudanças

- Atualizações de dependências.
- Correções menores.
- Refinamentos da arquitetura de layout.
- Continuidade da evolução de preferências e componentes.

### Relevância para o BCRM

Baixa a moderada; principalmente manutenção da fundação.

---

# 2025

## 2025.12 — Persistência de preferências

**Um dos períodos arquiteturalmente mais importantes da base.**

### Principais mudanças

- Simplificação da lógica de preferências.
- Conclusão da persistência das preferências.
- Ponte entre window/browser e provider.
- Correção temporária de flicker durante a inicialização.
- Atualização dos textos dos controles de layout.
- Atualizações recorrentes de dependências.

Commits de referência:

- `2785e037` — `chore: simplified preference logic`
- `bcce819b` — `feat: completed preference persistence setup`
- `4d0c0b32` — `feat: add window prefs bridge + temporary flicker fix in provider`
- `745b5ea2` — `chore: update layout controls preferences text`

### Relevância para o BCRM

**Muito alta.** Tema, layout, sidebar e demais preferências da aplicação são herdeiros dessa arquitetura.

---

## 2025.11 — Preferências e personalização

### Principais mudanças

- Evolução do mecanismo de preferências.
- Persistência e aplicação das configurações visuais.
- Refinamento do estado inicial da aplicação.
- Preparação para reduzir flicker e problemas de hidratação.

### Relevância para o BCRM

Alta para a infraestrutura global de UI.

---

## 2025.10 — Base para preferências persistentes

### Principais mudanças

- Evolução inicial do sistema de preferências.
- Preparação da persistência das configurações visuais.
- Refinamento da experiência de personalização.

### Relevância para o BCRM

Alta para a arquitetura de preferences.

---

## 2025.09 — Consolidação de componentes

### Principais mudanças

- Atualizações do ecossistema de componentes.
- Melhorias de consistência visual.
- Manutenção das telas existentes.
- Preparação para a evolução arquitetural do final de 2025.

---

## 2025.08 — Evolução contínua

### Principais mudanças

- Atualizações de dependências.
- Ajustes de componentes.
- Refinamentos de navegação e layout.
- Continuidade do desenvolvimento modular.

---

## 2025.07 — Limpeza e preparação

### Principais mudanças

- Remoção de dependências não utilizadas.
- Melhorias menores de código.
- Atualizações de README.
- Manutenção de dependências.
- Refinamentos de UI.

Commit de referência:

- `47192bad` — `chore: remove unused dependencies & minor improvements`

---

## 2025.06 — Componentização e produtividade

### Principais mudanças

- Evolução de componentes compartilhados.
- Melhorias em dashboards e telas de produtividade.
- Refinamento de navegação e controles.
- Expansão de telas independentes.
- Evolução de Chat, Mail, Tasks e Calendar.

### Direção arquitetural

Consolidação do princípio de manter composição específica próxima da feature e primitives/utilidades compartilhadas em camadas centrais.

---

## 2025.05 — Academy e expansão de módulos

### Principais mudanças

- Evolução do dashboard Academy.
- Finalização de layout e KPI cards.
- Adição do dashboard de professores.
- Crescimento das telas especializadas.

Commits de referência:

- `5f905a53` — `feat(academy): finalize academy dashboard layout and KPI cards`
- `5532e070` — `Add academy teacher dashboard`
- `c0f9f793` — `chore: update KPI`

---

## 2025.04 — Calendar e FullCalendar

### Principais mudanças

- Introdução da tela de Calendar.
- Evolução da integração com FullCalendar.
- Componentização do calendário.
- Base para experiências de agenda.

Commits de referência:

- `1b483a33` — `feat: add calendar`
- `4edb326c` — `feat: add full calendar`

### Relevância para o BCRM

**Alta.** É a raiz da infraestrutura de agenda que pode suportar compromissos, atividades e tarefas comerciais.

---

## 2025.03 — Evolução dos dashboards

### Principais mudanças

- Expansão de componentes de dashboard.
- Melhorias em cards, gráficos e layouts.
- Evolução da linguagem visual.
- Preparação para dashboards especializados.

---

## 2025.02 — Ecossistema shadcn

### Principal mudança

- Atualização dos componentes shadcn e pacotes relacionados.

Commit de referência:

- `05d31789` — `chore: update shadcn components & packages to latest version`

### Relevância para o BCRM

Alta para a fundação de componentes.

---

## 2025.01 — Lint e organização

### Principais mudanças

- Atualizações de dependências.
- Limpeza geral do código.
- Convenções de nomenclatura de arquivos.
- Lint da base.

Commits de referência:

- `cf35a030` — atualização de dependências e limpeza.
- `ebcf6b2b` — convenções de nomes de arquivos e lint.

---

# 2024

## 2024.12 — Qualidade e lint

### Principais mudanças

- Atualizações de dependências.
- Melhorias na configuração do ESLint.
- Limpeza de código.
- Preparação para a expansão de 2025.

Commits de referência:

- `ef9b7e60` — atualização da configuração do ESLint.
- `cbcba5cd` — `chore: update dependencies`

---

## 2024.11 — Estruturação e manutenção

### Principais mudanças

- Evolução da estrutura de dashboard.
- Limpeza e atualização de dependências.
- Ajustes de configuração e componentes.
- Preparação para ciclos mais rápidos de desenvolvimento.

---

## 2024.10 — Refinamento de UI e dependências

### Principais mudanças

- Atualizações recorrentes de dependências.
- Refinamentos de componentes de formulário e controles nativos.
- Correções de apresentação de elementos como `select`.
- Continuidade da padronização visual.

Commit de referência:

- `f8aba095` — `chore: update dependencies`

---

## 2024.09 — Consolidação da base

### Principais mudanças

- Expansão progressiva dos componentes de dashboard.
- Refinamentos visuais e de layout.
- Ciclos de manutenção das dependências.
- Evolução dos componentes reutilizáveis.

---

## 2024.08 — Fundação do projeto

**Início da linha histórica.**

### Principais mudanças

- Criação inicial do projeto.
- Primeira árvore da aplicação Next.js.
- Primeira base de componentes e dashboard.
- Início do padrão visual que posteriormente evoluiu para o Studio Admin.
- Primeiros ciclos de atualização de dependências e componentes.

Commits de referência:

- `c70ba814` — `Initial commit`
- `98506277` — `initial commit`

### Relevância para o BCRM

É o ponto de origem histórico da base posteriormente transformada no BCRM.

---

# Cobertura do histórico

A auditoria usada para este documento considera o histórico alcançável do branch `main` do upstream até **12/08/2026**: **641 commits** no total.

A contagem inclui features, fixes, refactors, documentação, merges, atualizações de dependências, quick fixes, limpeza/manutenção e commits iniciais.

Para tornar o documento adequado ao uso futuro dentro do BCRM, commits puramente repetitivos de `chore: update deps`, `chore: updates`, `chore: quick fix` e equivalentes são consolidados dentro do mês em vez de ocupar centenas de entradas visualmente idênticas. Os commits funcionais e arquiteturalmente importantes permanecem identificados individualmente por SHA.

Isso significa que **todos os 641 commits são contabilizados na reconstrução mensal**, mas nem todos aparecem como uma linha individual quando a mensagem não acrescenta informação funcional ao changelog.

## Regra para futuras atualizações

Novas entradas devem ser adicionadas **no topo**, dentro do mês correspondente. Se surgir um novo mês, ele passa a ser a primeira versão do documento.

Exemplo:

```text
## 2026.09
...

## 2026.08
...

## 2026.07
...
```

O changelog do BCRM propriamente dito deve futuramente registrar separadamente as mudanças que **nós implementamos**, enquanto este histórico permanece como referência de origem/upstream.
