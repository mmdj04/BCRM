# Registro de Alterações

Todas as alterações notáveis neste projeto são documentadas aqui, organizadas por mês.

---

## Versão Agosto de 2026

**25 commits** | Última atualização: 08/08/2026

### Funcionalidades
- Migrar dnd kit para implementação e pacotes mais recentes
- Migrar data table para usar tanstack table v9
- Adicionar dashboard de monitoramento de pacientes
- Adicionar dashboard de gerenciador de arquivos
- Adicionar componente de questionário shadcn

### Correções
- Correções rápidas e atualizações gerais
- Atualizar next.js e dependências

---

## Versão Julho de 2026

**36 commits** | Período: 02/07/2026 - 31/07/2026

### Funcionalidades
- Adicionar seletor de versões do projeto no cabeçalho do dashboard
- Adicionar analytics ao dashboard

### Refatoração
- Organizar componentes do dashboard
- Simplificar atualizações de preferências
- Corrigir achados de manutenibilidade (via react doctor)

### Correções
- Correções rápidas e atualização de dependências

---

## Versão Junho de 2026

**68 commits** | Período: 01/06/2026 - 27/06/2026

### Funcionalidades
- Adicionar tarefas (tasks)
- Adicionar novos componentes shadcn
- Adicionar configuração do FullCalendar v7
- Adicionar scroll fade na lista de e-mails
- Usar componentes shadcn de chat para tela de chat

### Refatoração
- Simplificar modelo de dados de itens de navegação
- Simplificar renderização de itens de navegação
- Adicionar regra de lint para ternário aninhado

### Correções
- Polir navegação da barra lateral recolhida
- Correções rápidas e atualização de dependências

---

## Versão Maio de 2026

**94 commits** | Período: 01/05/2026 - 31/05/2026

### Funcionalidades
- Adicionar layouts iniciais de chat
- Adicionar layout inicial de kanban
- Adicionar página inicial de funções (roles)
- Adicionar página inicial de usuários
- Adicionar logística ao dashboard

### Correções
- Correções rápidas e atualização de dependências

---

## Versão Abril de 2026

**69 commits** | Período: 01/04/2026 - 30/04/2026

### Funcionalidades
- Adicionar dashboard analytics v2
- Refatorar componente wallet com ativos crypto e informações de vault físico
- Refatorar UI de transações futuras

### Correções
- Substituir busca customizada pela busca integrada do cmdk
- Correções de finance (diretiva use client, imports, ordenação de classes)
- Refinar controles do analytics v2

---

## Versão Março de 2026

**28 commits** | Período: 01/03/2026 - 10/03/2026

### Funcionalidades
- Adicionar atalho GitHub no cabeçalho
- Adicionar card de suporte na barra lateral
- Trocar cor base do shadcn para mist
- Atualizar estilo shadcn para radix-vega

### Refatoração
- Localizar implementações de tabelas do dashboard
- Adotar formulários baseados em campos (rhf)

### Correções
- Corrigir seleção de itens de grupos no select
- Corrigir layout do card de suporte
- Alinhar selects de controle de layout
- Correções menores no dashboard e paleta de comandos

---

## Versão Fevereiro de 2026

**3 commits** | Período: 11/02/2026

### Correções
- Correções menores

---

## Versão Janeiro de 2026

**34 commits** | Período: 01/01/2026 - 09/01/2026

### Funcionalidades
- Adicionar controles de visão geral do analytics
- Adicionar resumo de receita e risco no analytics
- Adicionar modo de tema do sistema
- Adicionar botão de restaurar padrões
- Definir automaticamente resolvedThemeMode em setThemeMode

### Correções
- Alternar entre light/dark/system no theme-switcher
- Correções rápidas e menores

---

## Versão Dezembro de 2025

**50 commits** | Período: 01/12/2025 - 31/12/2025

### Funcionalidades
- Adicionar linha de KPIs
- Inicializar biome
- Adicionar script de boot de tema e tornar layout raiz estático
- Adicionar bridge de preferências de janela + correção temporária de flicker
- Adicionar "use no memo" em todos os componentes de tabela
- Melhorar tratamento de preferências de layout para renderização instantânea da sidebar

### Correções
- Alinhar ícones da barra lateral
- Corrigir padrões de boot de tema e seletor shallow da sidebar
- Estilo de alinhamento de ícones da sidebar

---

## Versão Novembro de 2025

**20 commits** | Período: 01/11/2025 - 30/11/2025

### Funcionalidades
- Adicionar script de boot de tema
- Tornar layout raiz estático

### Correções
- Atualizar lógica da loja de preferências e aplicar correções menores

---

## Versão Outubro de 2025

**22 commits** | Período: 01/10/2025 - 31/10/2025

### Funcionalidades
- Migrar para Next.js 16, habilitar React Compiler
- Atualizar configuração do ESLint

### Refatoração
- Renomear middleware para proxy, limpar código, atualizar tsconfig

### Correções
- Usar DropdownMenuTrigger do Shadcn em vez de Radix UI no data-table-view-options.tsx

---

## Versão Setembro de 2025

**14 commits** | Período: 01/09/2025 - 30/09/2025

### Funcionalidades
- Atualizar controles de layout do dashboard e utilitários de layout com cabeçalho fixo

### Correções
- Limpeza de código, correções menores e atualização de dependências

---

## Versão Agosto de 2025

**11 commits** | Período: 01/08/2025 - 31/08/2025

### Correções
- Atualização de dependências e correções gerais

---

## Versão Julho de 2025

**52 commits** | Período: 01/07/2025 - 31/07/2025

### Funcionalidades
- Adicionar script de geração de presets de tema
- Adicionar store zustand para tema e preset com provider baseado em contexto
- Adicionar alternador de presets de tema
- Corrigir problemas menores de UI/UX

### Refatoração
- Mover loja e provedor de preferências para diretório stores/
- Padronizar tipos e atualizar UI

### Correções
- Corrigir utilitários de sombra para respeitar presets de tema
- Correções de acessibilidade (eslint)
- Remover dependências não utilizadas
- Corrigir avisos do eslint e importações de tipo

---

## Versão Junho de 2025

**25 commits** | Período: 01/06/2025 - 30/06/2025

### Funcionalidades
- Adicionar telas de autenticação v1
- Adicionar alternador de layout de conteúdo para largura total e centralizado
- Adicionar diálogo de busca e refatorar código

### Refatoração
- Reestruturar componentes do dashboard padrão
- Melhorar lógica de renderização da tabela de dados

### Correções
- Corrigir erro de contexto de cookies passando cookieStore como parâmetro
- Limpeza de código e melhoria da tabela de dados

---

## Versão Maio de 2025

**26 commits** | Período: 01/05/2025 - 31/05/2025

### Funcionalidades
- Migrar para Next.js 15 e Tailwind CSS v4 com novo esquema de cores
- Adicionar alternador de tema
- Adicionar componente de alternância de conta
- Adicionar painel de preferências de layout com variante sidebar e configurações recolhíveis
- Atualizar sidebar para usar dropdown menu no estado recolhido

### Correções
- Fallback para layout recolhível no sidebar mobile

---

## Versão Abril de 2025

**1 commit** | Período: 01/04/2025 - 30/04/2025

### Correções
- Atualização de dependências e componentes shadcn

---

## Versão Março de 2025

**7 commits** | Período: 01/03/2025 - 31/03/2025

### Funcionalidades
- Redesenhar dashboard, limpar código e atualizar esquema de cores

### Correções
- Atualizar dependências e componentes shadcn
- Habilitar bracket spacing no config do Prettier
- Aplicar regra de memoização de contexto eslint
- Aplicar regra no-duplicate-imports e lintar código

---

## Versão Fevereiro de 2025

**2 commits** | Período: 01/02/2025 - 28/02/2025

### Correções
- Atualizar configuração do eslint
- Atualizar componentes shadcn e pacotes para versão mais recente

---

## Versão Janeiro de 2025

**2 commits** | Período: 01/01/2025 - 31/01/2025

### Correções
- Atualizar configuração do eslint para convenções de nomenclatura de arquivos e regras de lint
- Atualizar dependências e limpeza de código
