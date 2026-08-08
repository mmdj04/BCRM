# Registro de Alterações

Todas as alterações notáveis neste projeto são documentadas aqui, organizadas por mês.

---

## Versão 1.0.0 — BCRM: Painel Administrativo SaaS para o Brasil

**67 commits** | Período: 08/08/2026 - 09/08/2026

### Resumo da Versão

Esta é a primeira versão oficial do **BCRM** — um painel administrativo SaaS completo, traduzido para Português Brasileiro, com operações CRUD reais, integração com Stripe para cobrança em Reais (BRL) e modo de demonstração permanente.

O projeto é baseado no [next-shadcn-admin-dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard) e foi transformado em um produto SaaS funcional e pronto para o mercado brasileiro.

### O que foi construído

#### Infraestrutura e Backend
- **Supabase completo**: Autenticação, banco de dados com 26 tabelas, RLS (Row Level Security), índices e triggers
- **Stripe integrado**: Checkout, webhook e portal de clientes — tudo em Reais (BRL)
- **Modo de demonstração**: Credenciais permanentes via cookie (`admin@bcrm.com` / `10092004m`), sem depender de autenticação do Supabase
- **CRUD funcional**: Todas as páginas possuem operações Create, Read, Update e Delete reais com fallback para dados mock

#### Interface e Design
- **100% em PT-BR**: Tradução completa de todos os textos, dados mock, navegação, componentes e páginas
- **Diacríticos corretos**: Uso adequado de ç, á, é, ê, í, ó, ú, ã, õ em todo o projeto
- **Moeda em Reais**: Formatação brasileira (R$ 1.234,56) com ponto para milhares e vírgula para decimais
- **20+ páginas funcionais**: Dashboard, Finance, CRM, Analytics, E-commerce, Academy, Logistics, Infrastructure, File Manager, Patient Monitoring, Mail, Chat, Kanban, Calendar, Tasks, Invoice, Billing, Users, Roles, Productivity
- **Todas com dados mock alinhados ao template original**

#### Financeiras
- **Planos de assinatura em BRL**: Inicial R$ 789,90/mês, Pro R$ 1.889,90/mês, Empresarial R$ 7.989,90/mês
- **Comparação de recursos** detalhada entre os planos
- **Página de faturamento** completa com portal de clientes

#### Segurança e CI/CD
- **Dependabot** configurado para dependências npm e GitHub Actions
- **GitHub Actions** para CI, CodeQL e deploy
- **Schema idempotente** com `IF NOT EXISTS` para implantações seguras

#### Migrações e Atualizações
- **Tanstack Table v9**: Migração completa de `useReactTable` para `useTable` com `dataTableFeatures`
- **Dnd Kit atualizado**: Migração para implementação e pacotes mais recentes
- **Upstream sincronizado**: Merge de todos os commits do repositório original (628 commits)

---

### Funcionalidades

- feat: configuração inicial — painel administrativo Next.js com autenticação e banco de dados Supabase
- feat: abas de contas e transações na seção de finanças
- feat: página de faturamento com planos de assinatura
- feat: redesign do faturamento com 4 planos e comparação de recursos expansível
- feat: atualização de preços com custos Supabase + lucro, layout em grade vertical
- feat: alinhamento de preços com camadas Supabase — Inicial 5, Pro 35, Equipe 650
- feat: atualização de preços 0/50/200, adição de seções Ajuste Fino e Perguntas Frequentes
- feat: páginas de Conta e Notificações, atualização de CTAs para Agora
- feat: página de Changelog sincronizada com CHANGELOG.md
- feat: integração Stripe com preços em BRL e modo de demonstração
- feat: migração do dnd kit para implementação e pacotes mais recentes
- feat: migração da tabela de dados para usar tanstack table v9
- feat: tradução PT-BR completa em todas as páginas do painel
- feat: tradução dos componentes de barra lateral, cabeçalhos, conta, notificações e interface para PT-BR
- feat: tradução dos dados mock Padrão e CRM para PT-BR
- feat: tradução dos dados mock e componentes de Finanças para PT-BR
- feat: tradução dos dados mock de Produtividade e E-commerce para PT-BR
- feat: tradução dos dados mock de Academia e Logística para PT-BR
- feat: tradução dos dados mock de Infraestrutura e Gerenciador de Arquivos para PT-BR
- feat: tradução completa de todos os dados mock restantes para PT-BR
- feat: substituição de USD por BRL em todas as exibições de moeda

### Correções

- fix: esquema idempotente com IF NOT EXISTS
- fix: adição de IF NOT EXISTS aos índices
- fix: correção dos caminhos de importação nos componentes de faturamento
- fix: resolução de erros TypeScript nos componentes de gráfico
- fix: conexão de logout + links de navegação de faturamento, atualização de preços para 45+ planos
- fix: ajuste de preços com markups inteligentes baseados no Supabase
- fix: alinhamento da Comparação de Recursos exatamente com os preços do Supabase
- fix: renderização de markdown no Changelog, adição de espaçamento accordion
- fix: correção dos diacríticos do português brasileiro
- fix: modo de demonstração usando cookies para compatibilidade com middleware
- fix: correção da comparação Pinned no chat-conversation-list.tsx
- fix: atualização das colunas de transações financeiras para corresponder ao esquema PT-BR
- fix: pontuação de saúde do CRM usando valores PT-BR
- fix: migração tanstack table v9 e pacotes ausentes
- fix: resolução de todos os erros de lint, avisos e problemas de formatação

### Manutenção

- chore: atualização de dependências
- ci(deps): atualização de actions/checkout de 4 para 7
- ci(deps): atualização de recharts no grupo de produção
- ci(deps): atualização de github/codeql-action de 3 para 4
- ci(deps): atualização de @types/node de 22.20.1 para 26.1.2
- ci(deps): atualização de actions/dependency-review-action de 4 para 5
- ci(deps): atualização de lint-staged de 16.4.0 para 17.3.0
- ci(deps): atualização de actions/upload-artifact de 4 para 7
- ci(deps): atualização de actions/github-script de 7 para 9
- ci(deps): atualização de softprops/action-gh-release de 2 para 3
- ci(deps): atualização de actions/stale de 9 para 11
- ci(deps): adição de configuração do Dependabot
- docs: adição de arquivos comunitários de código aberto e GitHub Actions
- docs: tradução do changelog para PT-BR com acentos corretos
- docs: conclusão do changelog com todos os 628 commits organizados por mês

### Mesclagens

- Merge pull request #1 from mmdj04/dependabot/github_actions/actions/checkout-7
- Merge pull request #2 from mmdj04/dependabot/npm_and_yarn/production-d71c4100fc
- Merge pull request #3 from mmdj04/dependabot/github_actions/github/codeql-action-4
- Merge pull request #5 from mmdj04/dependabot/npm_and_yarn/types/node-26.1.2
- Merge pull request #6 from mmdj04/dependabot/github_actions/actions/dependency-review-action-5
- Merge pull request #7 from mmdj04/dependabot/github_actions/actions/setup-node-7
- Merge pull request #8 from mmdj04/dependabot/npm_and_yarn/lint-staged-17.3.0
- Merge pull request #10 from mmdj04/dependabot/github_actions/actions/upload-artifact-7
- Merge pull request #11 from mmdj04/dependabot/github_actions/actions/github-script-9
- Merge pull request #12 from mmdj04/dependabot/softprops/action-gh-release-3
- Merge pull request #13 from mmdj04/dependabot/github_actions/actions/stale-11
- merge: sincronização com upstream arhamkhnz/next-shadcn-admin-dashboard

---

## Versão Agosto de 2026

**25 commits** | Período: 01/08/2026 - 09/08/2026

### Funcionalidades
- feat: migrar dnd kit para implementação e pacotes mais recentes
- feat: migrar tabela de dados para usar tanstack table v9
- feat: adicionar dashboard de monitoramento de pacientes
- feat: adicionar dashboard do gerenciador de arquivos

### Manutenção
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências e componentes
- chore: adicionar componente de questionário shadcn
- chore: atualizar dependências
- chore: atualizar versão do next
- chore: atualizar dependências
- chore: correção rápida
- chore: atualizações
- chore: atualizar readme
- chore: correção rápida
- chore: atualizações
- chore: correções rápidas
- chore: correção rápida
- chore: atualizações
- chore: atualizar readme
- chore: atualizar dependências
- chore: correção rápida

### Outros
- Merge pull request #79 from arhamkhnz/feat/patient-monitoring
- Merge pull request #78 from arhamkhnz/feat/file-manager

---

## Versão Julho de 2026

**36 commits** | Período: 01/07/2026 - 31/07/2026

### Funcionalidades
- feat: adicionar dropdown de versões do projeto no cabeçalho do dashboard

### Refatoração
- refactor: organizar componentes do dashboard
- refactor: simplificar atualizações de preferências
- refactor: corrigir achados de manutenção (por react doctor)

### Documentação
- docs: adicionar link do dashboard React Aria

### Manutenção
- chore: limpeza de código
- chore: atualizar dependências
- chore: correção rápida
- chore: atualizar dependências
- chore: adicionar análises
- chore: correção rápida
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: reverter versão do radix
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar readme
- chore: atualizar readme
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências e correções de lint
- chore: correção rápida
- chore: atualizações
- chore: correção rápida
- chore: correção rápida
- chore: otimizar preferências
- chore: correção rápida
- chore: atualizar dependências

### Outros
- Merge pull request #76 from arhamkhnz/chore/optimize-prefs

---

## Versão Junho de 2026

**68 commits** | Período: 01/06/2026 - 30/06/2026

### Funcionalidades
- feat: adicionar novos componentes shadcn e atualizar dependências
- feat: adicionar tarefas
- feat: melhorar dados de saúde da infraestrutura
- feat: refinar dashboard de infraestrutura
- feat: adicionar dashboard de infraestrutura
- feat: adicionar calendário completo
- feat: adicionar calendário
- feat(invoice): refinar padrões e itens móveis
- feat(invoice): refinar layout do papel de pré-visualização

### Correções
- fix: aprimorar navegação da barra lateral recolhida

### Refatoração
- refactor(sidebar): reforçar modelo de dados dos itens de navegação
- refactor(sidebar): simplificar renderização dos itens de navegação
- refactor(sidebar): simplificar renderização dos itens de navegação
- refactor(invoice): limpar componentes do construtor
- refactor(kanban): dividir em componentes, corrigir cancelamento de arrasto e status de conclusão

### Documentação
- docs: adicionar diretrizes do AGENTS.md
- docs: adicionar dashboard de infraestrutura ao readme

### Manutenção
- chore: atualizar dependências e componentes
- chore: atualizar dependências
- chore: correções rápidas
- chore: adicionar fade de rolagem na lista de e-mail
- chore: usar componentes de chat shadcn para tela de chat
- chore: adicionar regra de lint para ternário aninhado e limpar avisos
- chore: atualizar dependências
- chore: correções rápidas
- chore: atualizar dependências e componentes
- chore(calendar): adicionar configuração do componente FullCalendar v7
- chore: atualizar dependências e componentes
- chore: atualizar dependências e componentes
- chore: correção rápida
- chore: atualizar readme
- chore: atualizar readme
- chore: adicionar impressão de fatura
- chore: correção rápida
- chore: atualizações
- chore: atualizar dependências e corrigir avisos de lint
- chore: atualizar readme
- chore: atualizar dependências
- chore: corrigir layout
- chore: atualizar dependências e componentes
- chore: correção rápida
- chore: atualizações
- chore: correção rápida
- chore: atualização do chat
- chore: correção rápida
- chore: atualizar dependências
- chore: atualizar dependências

### Outros
- Merge pull request #73 from arhamkhnz/feat/tasks
- Merge pull request #71 from arhamkhnz/feat/infra
- Merge pull request #70 from arhamkhnz/feat/calendar
- Merge branch 'main' into feat/calendar
- Merge pull request #69 from arhamkhnz/feat/invoice
- Criar tela do construtor de fatura
- Criar tela de fatura
- Merge branch 'main' into feat/invoice
- Merge pull request #68 from arhamkhnz/feat/kanban
- Limpar dados das colunas do kanban
- Refinar quadro de tarefas do kanban
- Merge branch 'main' into feat/kanban
- Merge pull request #67 from arhamkhnz/feat/chat
- Tornar chat responsivo
- Refinar interface do chat
- Refinar interface do chat
- Refatorar layout da caixa de entrada do chat
- Adicionar interface de chat independente
- Merge branch 'main' into feat/chat
- Merge pull request #65 from arhamkhnz/feat/roles
- Refatorar tabela de funções

---

## Versão Maio de 2026

**94 commits** | Período: 01/05/2026 - 31/05/2026

### Funcionalidades
- feat: adicionar layouts iniciais do chat
- feat: adicionar layout inicial do kanban
- feat: layout inicial da página de usuários
- feat: adicionar dashboard de logística
- feat: adicionar rota de funções
- feat: adicionar rota de usuários
- feat: adicionar rota de fatura
- feat: adicionar rota de kanban
- feat: adicionar rota de calendário
- feat: adicionar rota de chat
- feat: adicionar pré-visualização de e-mail no dashboard
- feat: mover e-mail para layout independente
- feat: adicionar estrutura da barra lateral de e-mail
- feat: melhorar responsividade da página de e-mail
- feat(academy): finalizar layout do dashboard da academia e cartões de KPI
- feat: promover rota de análises v2
- feat: adicionar cartão de desempenho da página de análises
- feat: adicionar cartão de fontes de tráfego de análises
- feat: refinar gráficos de qualidade das análises v2
- feat: adicionar cartões de tempo real e qualidade de análises

### Refatoração
- refactor barra lateral de e-mail e layout da caixa de entrada

### Documentação
- docs: adicionar análises v1 ao readme

### Manutenção
- chore: atualizar dependências e componente
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar layout de funções
- chore: atualizações
- chore: atualizações
- chore: atualizar filtros
- chore: completar design dos usuários
- chore: funcionalidade inicial da página de funções
- chore: atualizar dependências e componente
- chore: correção rápida
- chore: remover dependência indesejada
- chore: atualizações
- chore: atualizações
- chore: atualizações
- chore: atualizar readme
- chore: atualizar padrões da barra lateral de e-mail
- chore: atualizar dependências e componentes
- chore: atualizar responsividade do recolhido
- chore: atualizar responsividade
- chore: correção rápida
- chore: correção rápida
- chore: atualizações
- chore: correções rápidas
- chore: atualizações
- chore: atualizar KPI
- chore: correção rápida
- chore: reverter versão do react-day-picker
- chore: atualizar dependências
- chore: reverter versão do react-day-picker
- chore: atualizar dependências
- chore: atualizações
- chore: atualizar dependências
- chore: correção rápida
- chore: correção de altura
- chore: correção rápida
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: alinhar preenchimento da aba de fontes de análises
- chore: ajustar espaçamento das fontes de análises
- chore: atualizar indicador
- chore: atualizações

### Outros
- Merge branch 'main' into feat/roles
- Merge pull request #63 from arhamkhnz/feat/users
- Merge branch 'main' into feat/kanban
- Merge branch 'main' into feat/roles
- Merge branch 'main' into feat/users
- Merge pull request #62 from arhamkhnz/feat/logistics
- Tornar detalhes da logística responsivos
- Refinar detalhes de envio da logística
- Merge pull request #60 from arhamkhnz/update-mail-sidebar
- Merge pull request #58 from arhamkhnz/feat/mail
- Enriquecer conjunto de dados de e-mail com anexos e carimbos de data/hora dinâmicos
- construir barra de ferramentas da visualização de mensagem de e-mail
- Substituir estado do e-mail por Zustand
- Atualizar persistência do layout de e-mail
- Merge branch 'main' into feat/mail
- Atualizar disponibilidade do dashboard
- Merge pull request #57 from arhamkhnz/feat/academy
- Refinar dashboard do professor da academia
- Adicionar dashboard do professor da academia
- commit inicial: exemplo de e-mail shadcn
- Merge pull request #55 from arhamkhnz/feat/ecommerce
- Adicionar insights do dashboard de e-commerce
- Adicionar tabela de pedidos recentes do e-commerce
- Adicionar cartão de fontes de tráfego do e-commerce
- Adicionar gráfico de tráfego da loja do e-commerce
- Refinar filtros do dashboard de e-commerce
- Adicionar visão geral do dashboard de e-commerce
- Refinar estado ativo do alternador de conta
- Merge pull request #54 from arhamkhnz/feat/analytics-v2

---

## Versão Abril de 2026

**69 commits** | Período: 01/04/2026 - 30/04/2026

### Funcionalidades
- feat: refinar controles das análises v2
- feat: adicionar dashboard de análises v2
- feat(finance-v2): refatorar componente de carteira com ativos criptografados e informações de cofre físico, renomear componentes para melhor ressonância
- feat(finance-v2): refatorar interface de transações pendentes
- feat: adicionar busca na barra lateral
- feat: mover crm v2 para crm e crm legado para crm-v1
- feat: refinar tabela de oportunidades do crm v2
- feat: adicionar seções de atividade do crm v2
- feat: adicionar dashboard do crm v2
- feat: alternar rotas do dashboard padrão
- feat: refinar tabela de clientes do padrão v2
- feat: refinar tabelas do dashboard padrão v2
- feat: refinar visão geral de desempenho do padrão v2
- feat: refinar estilo do gráfico e dashboard do padrão v2
- feat: refinar gráficos de visão geral do padrão v2
- feat: atualizar datas de produtividade dinamicamente
- feat: adicionar layout do dashboard de produtividade
- feat: adicionar dashboard padrão-v2 e atualizar primitivas de interface

### Correções
- fix(finance): adicionar diretiva use client ao componente de transações pendentes
- fix(finance): adicionar importação ausente de tabs content e ordenar classes
- fix(finance): renomear componente de transações pendentes para remover sufixo de tabela e corrigir importação
- fix: substituir busca customizada por busca integrada do cmdk
- fix: resolver problemas de revisão de código no diálogo de busca
- fix: ajustar espaçamento do rodapé das oportunidades de CRM
- fix: reforçar filtragem da tabela crm e progresso da proposta
- fix: corrigir análise de datas do gráfico do dashboard padrão
- fix: estilizar opções de seleção nativas

### Documentação
- docs: mover nota do base ui no readme
- docs: adicionar link do repositório base ui ao readme
- docs: remover análises do "em breve" do README
- docs: atualizar nomes das telas do README

### Manutenção
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar readme
- chore: reorganizar rotas de finanças para tornar v2 o padrão e mover v1 para legado
- chore: atualizar dependências
- chore: correção rápida
- chore: atualizar dependências do biome e ícones
- chore: adicionar rota de finanças
- chore: atualizar dependências de interface
- chore: atualizar dependências shadcn
- chore: correções rápidas
- chore: ocultar dashboard de produtividade da barra lateral
- chore: aplicar atualizações de interface geradas
- chore: atualizar fonte padrão
- chore: atualizar dependências
- chore: atualizar dependências de interface e ferramentas
- chore: atualizar next e react
- chore: atualizar dependências shadcn
- chore: atualizar dependências e ícone do dashboard
- chore: atualizar painéis e ajustar layout do dashboard
- chore: atualizar next para 16.2.2
- chore: atualizar componentes de interface shadcn

### Outros
- Merge pull request #49 from arhamkhnz/feat/finance-v2
- Merge pull request #51 from Muhammadrizo14/feature/added-search
- Derivar itens do diálogo de busca a partir da barra lateral
- Adicionar gráfico de visão geral de gastos financeiros
- Refinar layout do dashboard de finanças v2
- Atualizar link de contato de suporte da barra lateral
- Refinar layout do dashboard de finanças v2
- Adicionar visão geral do dashboard de finanças v2
- Corrigir transbordamento do dashboard de análises na largura média
- Reforçar regras do Biome e atualizar preferências do dashboard
- Merge pull request #47 from arhamkhnz/feat/crm-v2
- Reforçar cópia do projeto de produtividade
- Usar ícone mais claro da barra lateral de produtividade
- Merge pull request #46 from arhamkhnz/3.0.0
- Merge branch 'main' into 3.0.0
- style: refinar gráfico de atividade do dashboard padrão

---

## Versão Março de 2026

**28 commits** | Período: 07/03/2026 - 27/03/2026

### Funcionalidades
- feat(header): adicionar atalho do github
- feat(sidebar): adicionar card de suporte no rodapé
- feat(theme): alternar cor base do shadcn para mist
- feat(ui): atualizar estilo do shadcn para radix-vega
- feat(fonts): expandir seletor de fontes e adicionar Geist Pixel Square
- feat: implementar redesign do dashboard de análises

### Correções
- fix(select): agrupar itens de seleção do dashboard
- fix(sidebar): refinar layout do card de suporte
- fix(ui): alinhar seletores de controles de layout
- fix(ui): correções menores no dashboard e paleta de comandos
- fix(scripts): executar biome via node para evitar problemas de spawn no Windows
- fix(husky): fazer geração de presets e lint-staged funcionarem multiplataforma

### Refatoração
- refactor(tables): localizar implementações de tabelas do dashboard
- refactor(auth): adotar formulários baseados em campos rhf
- refactor(analytics): finalizar estrutura de dashboard de 3 linhas e limpeza de nomenclatura

### Manutenção
- chore: remover nota de armazenamento de preferências
- chore: remover dependências não utilizadas
- chore: atualizar dependências e componentes shadcn
- chore: atualizar dependências
- chore: atualizar dependências e componente vazio shadcn
- chore: atualizar dependências
- chore: atualizar componentes shadcn
- chore(analytics): atualizar nomes dos proprietários do dashboard
- chore: atualizar dependências e componente shadcn
- chore(analytics): alinhar métricas estáticas entre seções do dashboard

### Outros
- style(layout): dividir seletores de layout centralizado
- Merge pull request #41 from arhamkhnz/codex/fix-windows-precommit-generate-presets
- Merge pull request #35 from arhamkhnz/feat/analytics-dashboard

---

## Versão Fevereiro de 2026

**3 commits** | Período: 11/02/2026 - 15/02/2026

### Manutenção
- chore: atualizar dependências
- chore: atualizar dependências e componentes shadcn
- chore: correções menores

---

## Versão Janeiro de 2026

**34 commits** | Período: 01/01/2026 - 28/01/2026

### Funcionalidades
- feat(analytics): adicionar resumo de receita e risco
- feat(analytics): adicionar controles de visão geral
- feat: definir automaticamente resolvedThemeMode no setThemeMode
- feat: adicionar modo de tema do sistema
- feat: adicionar botão de restaurar padrões
- feat: adicionar preferência de fonte dinâmica
- feat(finance): completar seções restantes do dashboard

### Correções
- fix: alternar entre claro/escuro/sistema no alternador de tema

### Manutenção
- chore: atualizar dependências
- chore: atualizar componentes shadcn
- chore: atualizar dependências
- chore: correção rápida
- chore: correção rápida
- chore: correções menores
- chore: correção rápida
- chore: atualizar script de inicialização
- chore: melhorar lógica de alternância de tema
- chore: renomear variáveis para melhor compreensão
- chore: otimizar script de inicialização
- chore: atualizar dependências
- chore: aplicar sugestões
- chore: habilitar preload para todas as fontes
- chore: corrigir fonte padrão
- chore: atualizar fontes
- chore: corrigir ordem de camadas css
- chore: correções menores
- chore: refinar tema padrão e ajustes menores de interface
- chore: atualizar dependências e correções menores
- chore(finance): renomear componentes e pequenas correções

### Outros
- Merge pull request #32 from likui628/system-theme
- Merge pull request #30 from likui628/main
- Merge pull request #29 from arhamkhnz/feat/font-preferences
- Merge pull request #27 from arhamkhnz/feat/finance-dashboard-redesign
- 2.2.0

---

## Versão Dezembro de 2025

**50 commits** | Período: 01/12/2025 - 31/12/2025

### Funcionalidades
- feat: adicionar linha de KPI
- feat: inicialização do biome
- feat: melhorar tratamento de preferências de layout para renderização instantânea da barra lateral
- feat: adicionar "use no memo" em todos os componentes de tabela para prevenir memorização do React Compiler e corrigir problemas de estado
- feat: adicionar ponte de preferências da janela e correção temporária de flicker no provedor
- feat: configuração de persistência de preferências concluída
- feat: mover configuração da barra lateral para a loja global e conectá-la dentro do AppSidebar
- feat: adicionar configuração de preferências
- feat: adicionar utilitários de cookie do lado do cliente

### Correções
- fix: alinhar padrões de inicialização do tema e usar seletor raso da barra lateral

### Manutenção
- chore: redesenhar meus cartões
- chore: redesenhar gráfico de visão geral do fluxo de caixa
- chore: atualizar design inicial do dashboard
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizações menores
- chore: usar biome para formatação de código gerado por presets
- chore: atualizar componentes shadcn
- chore: atualizar comandos do Biome e limpar estilos
- chore: remover configuração eslint do next
- chore: verificar e formatar código do projeto usando Biome
- chore: remover configurações do ESLint e Prettier e uso
- chore: migrar configuração do prettier e eslint para biome
- chore: atualizar dependências
- chore: atualizar dependências
- chore: correção rápida
- chore: atualizar dependências
- chore: atualizar texto de preferências dos controles de layout
- chore: lógica de preferências simplificada
- chore: correção de estilo e tipo
- chore: atualizar seletores de estilo da barra de navegação para usar atributos de dados html
- chore: atualizar configuração de preferências e correção de estilo
- chore: adicionar await ausente no persistPreference
- chore: desabilitar controles de layout e aplicar correções menores
- chore: adicionar configuração de preferências e persistência condicional no servidor
- chore: atualizar dependências
- chore: atualizar dependências
- chore: alterações menores
- chore: atualizar controles de layout e corrigir lógica de estado da barra lateral
- chore: simplificar manipuladores dos controles de layout e melhorar inicialização do provedor de preferências

### Outros
- Merge pull request #25 from arhamkhnz/chore/eslint-to-biome
- Adicionar instruções de formatação e verificação de código ao README
- 2.1.0
- style: corrigir alinhamento de ícones da barra lateral
- Merge pull request #24 from arhamkhnz/chore/optimize-preference-store
- Merge pull request #22 from arhamkhnz/optimize-sidebar-pref
- Merge pull request #21 from arhamkhnz/fix/datatable
- Merge pull request #20 from arhamkhnz/feature/prefs-and-style-fixes
- Merge pull request #18 from arhamkhnz/fix/layout-settings
- Merge branch 'main' into fix/layout-settings

---

## Versão Novembro de 2025

**20 commits** | Período: 02/11/2025 - 30/11/2025

### Funcionalidades
- feat: adicionar script de inicialização do tema e tornar layout raiz estático

### Manutenção
- chore: atualizar lógica da loja de preferências e aplicar correções menores
- chore: habilitar controles de layout
- chore: remover análises
- chore: atualizar dependências
- chore: atualizar avatar para url externa
- chore: desabilitar prefetch no next Link
- chore: desabilitar temporariamente lógica de cookie no layout raiz para evitar bug de re-renderização
- chore: desabilitar controles de layout
- chore: atualizar dependências
- chore: desabilitar prefetch nos links da barra lateral para evitar requisitos de rota desnecessários
- chore: adicionar análises do vercel
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar estilos de alternância dos controles de layout
- chore: atualizar dependências e aplicar dimensionamento uniforme dos itens de alternância e classes de texto
- chore: atualizar dependências
- chore: atualizar dependências

### Outros
- style: adicionar overscroll-behavior

---

## Versão Outubro de 2025

**22 commits** | Período: 01/10/2025 - 29/10/2025

### Funcionalidades
- feat: migrar para Next 16, habilitar React Compiler e atualizar configuração do ESLint

### Correções
- fix: usar DropdownMenuTrigger do Shadcn em vez de Radix UI no data-table-view-options.tsx

### Refatoração
- refactor: renomear middleware para proxy, limpar código e atualizar tsconfig

### Documentação
- docs: atualizar referências de versão do Next.js em docs e meta
- docs(readme): atualizar imagem do dashboard e versão na URL de demonstração

### Manutenção
- chore: atualizar dependências
- chore: atualizar dependências e componente shadcn
- chore: atualizar dependências e remover pacotes não utilizados
- chore: atualizar dependências e componente shadcn
- chore: atualizar dependências e componente shadcn
- chore: atualizar dependências e componente shadcn
- chore: atualizar dependências
- chore: atualizar dependências e componente shadcn
- chore: atualizar dependências
- chore: adicionar novos componentes shadcn
- chore: atualizar dependências
- chore: adicionar contributing.md

### Outros
- Atualizar README com link da versão Next.js 15
- Atualizar README para refletir mudança de versão do Next.js
- Atualizar README.md
- Atualizar CONTRIBUTING.md
- Atualizar CONTRIBUTING.md

---

## Versão Setembro de 2025

**14 commits** | Período: 05/09/2025 - 29/09/2025

### Funcionalidades
- feat: Atualizar controles de layout do dashboard e utilitários de layout com cabeçalho fixo

### Manutenção
- chore: limpeza de código, correções menores e atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências e componentes shadcn
- chore: atualizar dependências
- chore: atualizar componentes shadcn
- chore: atualizar dependências e atualizar componentes shadcn/ui
- chore: atualizar dependências
- chore: atualizar dependências
- chore: adicionar página em breve e atualizar dependências
- chore: atualizar rotas inexistentes para /dashboard e atualizar dependências

### Outros
- style(layout): refinar estilos de barra de navegação fixa para consistência
- Merge pull request #10 from fiifiofosu/main
- Atualizar layout de navegação e tratamento de preferências

---

## Versão Agosto de 2025

**11 commits** | Período: 01/08/2025 - 31/08/2025

### Manutenção
- chore: adicionar rotas temporárias, atualização de dependências e habilitar turbopack
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: adicionar página não encontrada e limpeza de código
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências

---

## Versão Julho de 2025

**52 commits** | Período: 07/07/2025 - 30/07/2025

### Funcionalidades
- feat: adicionar script de geração de presets de tema, padronizar tipos e atualizar interface
- feat: adicionar loja zustand para tema e preset com provedor baseado em contexto
- feat: adicionar alternador de presets de tema e corrigir problemas menores de UI/UX
- feat: adicionar páginas de autenticação v2
- feat: adicionar dashboard de finanças
- feat: adicionar dashboard de CRM e melhorar layout

### Correções
- fix: sobrescrever utilitários de sombra para respeitarem presets de tema e atualizar dependências

### Manutenção
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar dependências
- chore: atualizar imagem de mídia
- chore: atualizar mídia
- chore: atualizar imagem de mídia
- chore: correção de acessibilidade do eslint
- chore: remover dependências não utilizadas e melhorias menores
- chore: corrigir avisos do eslint
- chore: corrigir importações de tipo
- chore: atualizar hook de pré-commit para adicionar automaticamente presets de tema
- chore: atualizar dependências e remover logs de teste
- chore: adicionar logs de teste no ThemeSwitcher para depuração
- chore: mover loja e provedor de preferências para o diretório stores/
- chore: adicionar funções utilitárias de layout e tema, simplificar lógica de controle de layout e tema
- chore: otimizar uso do layout de conteúdo e correções de bugs menores
- chore: desabilitar middleware temporariamente para evitar execuções de funções edge desnecessárias
- chore: correções menores
- chore: atualizar dependências e componentes shadcn
- chore: correções de cores e limpeza de código
- chore: corrigir rota do CRM
- chore: reverter tema
- chore: atualizar dependências
- chore: atualizar gráficos do CRM

### Outros
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Atualizar README.md
- Merge pull request #7 from Manasa0424/feat/update-dashboard
- Merge branch 'main' into feat/update-dashboard
- Merge pull request #6 from Manasa0424/feat/add-crm-dashboard
- Merge branch 'main' into feat/add-crm-dashboard

---

## Versão Junho de 2025

**25 commits** | Período: 04/06/2025 - 30/06/2025

### Funcionalidades
- feat: adicionar telas de autenticação v1 e limpeza de código
- feat: adicionar alternador de layout de conteúdo para layouts de largura total e centralizado

### Manutenção
- chore: limpeza de código
- chore: substituir ícones estáticos pelo pacote simple icons e limpeza de código
- chore: melhorar lógica de renderização da tabela de dados para melhor legibilidade
- chore: melhorar tabela de dados
- chore: melhorar tabela de dados
- chore: atualizar dependências
- chore: melhorar tabela de dados
- chore: melhorar lógica de renderização da tabela de dados para melhor legibilidade
- chore: migrar componentes shadcn para o pacote mono radix-ui
- chore: atualizar dependências
- chore: refatorar componentes do dashboard padrão, reestruturação da tabela de dados e atualizar dependências
- chore: adicionar diálogo de busca e refatorar código
- chore: descartar último commit e reverter alterações
- chore: atualizar readme
- chore: atualizar componentes shadcn e dependências
- chore: atualizar lógica de margem responsiva para layout centralizado e barra lateral inset
- chore: limpeza de código e melhorar tabela de dados
- chore: limpeza de código e tabela de dados modificada
- chore: atualizar implementação da tabela de dados, limpeza de código e atualizar dependências

### Outros
- commit de finanças
- Merge branch 'feat/add-crm-dashboard' of github.com:Manasa0424/next-shadcn-admin-dashboard into feat/add-crm-dashboard
- Corrigir erro de contexto de cookies passando cookieStore como parâmetro
- Atualizado .gitignore

---

## Versão Maio de 2025

**26 commits** | Período: 04/05/2025 - 30/05/2025

### Funcionalidades
- feat: adicionar componente de alternância de conta
- feat: adicionar alternador de tema
- feat: atualizar barra lateral para usar menu dropdown no estado recolhido
- feat: adicionar painel de preferências de layout com configurações de variante da barra lateral e recolhível
- feat: migrar para Next.js 15 e Tailwind CSS v4 com novo esquema de cores

### Correções
- fix: fallback para layout recolhível na barra lateral móvel

### Refatoração
- refactor: remover arquivo desnecessário

### Manutenção
- chore: atualizar dependências
- chore: atualizar dependências, configuração do app e correções menores de qualidade de código
- chore: atualizar dependências
- chore: limpeza de código
- chore: atualizar imagem de mídia
- chore: atualizar imagem de mídia
- chore: adicionar eslint-plugin-sonarjs para detecção de código comentado, limpar código e atualizar dependências
- chore: reestruturar componentes do projeto para _components e atualizar dependências
- chore: atualizar estrutura de arquivos do projeto com grupos de rotas (main) e (external)
- chore: código de redirecionamento descomentado
- chore: limpeza de código, otimizar re-renderizações da barra lateral, adicionar prettier-plugin-tailwindcss e verificar código do projeto
- chore: atualizar imagem de pré-visualização e readme
- chore: atualizar README e imagem de pré-visualização

### Outros
- Atualizar README.md
- atualizar: avatar, nome e e-mail
- estilo de código: atualização de props readonly em todos os componentes
- Atualizar README.md
- Atualizar README.md
- Merge pull request #4 from arhamkhnz/migration/next15-tailwindv4

---

## Versão Abril de 2025

**1 commits** | Período: 28/04/2025 - 28/04/2025

### Manutenção
- chore: atualizar dependências e componentes shadcn

---

## Versão Março de 2025

**7 commits** | Período: 04/03/2025 - 19/03/2025

### Funcionalidades
- feat: redesenhar dashboard, limpar código e atualizar esquema de cores

### Manutenção
- chore: atualizar dependências e componentes shadcn
- chore: habilitar espaçamento de colchetes na configuração do Prettier
- chore(eslint): aplicar regra eslint de memorização de valores de contexto
- chore: atualizar dependências do projeto e atualizar componentes shadcn
- chore(eslint): aplicar regra sem importações duplicadas e verificar código
- chore: atualizar dependências

---

## Versão Fevereiro de 2025

**2 commits** | Período: 27/02/2025 - 27/02/2025

### Manutenção
- chore: atualizar configuração do eslint
- chore: atualizar componentes shadcn e pacotes para versão mais recente

---

## Versão Janeiro de 2025

**2 commits** | Período: 17/01/2025 - 17/01/2025

### Manutenção
- chore: atualizar configuração do eslint para convenções de nomenclatura de arquivos e regras de verificação, código verificado
- chore: atualizar dependências e limpeza de código

---

## Versão Dezembro de 2024

**3 commits** | Período: 23/12/2024 - 31/12/2024

### Manutenção
- chore: atualizar dependências
- chore: atualizar configuração do ESLint para regras de espaçamento de funções e verificar código
- chore: atualizar dependências, configuração do eslint e prettier e verificar código

---

## Versão Novembro de 2024

**14 commits** | Período: 08/11/2024 - 27/11/2024

### Funcionalidades
- feat: remover configuração do Airbnb e atualizar ESLint para versão mais recente com configuração plana e regras customizadas
- feat: inicialização do husky

### Correções
- fix: Remover configuração do SonarJS para resolver problemas de compatibilidade do ESLint

### Manutenção
- chore: atualizar dependências para versões mais recentes
- chore: atualizar package-lock e verificar código
- chore: atualizar dependências
- chore: atualizar configuração do eslint
- chore: atualizar configuração do Next.js para remover comentários na compilação de produção
- chore: atualizar itens da barra lateral, layout do dashboard e melhorias de estilo
- chore: refatorar código e atualizar componentes Shadcn
- chore: atualizar dependências, refatorar código da barra lateral e atualizar componentes Shadcn

### Outros
- Merge pull request #3 from arhamkhnz/chore/eslint-config-update
- Merge branch 'main' into chore/eslint-config-update
- Merge pull request #2 from arhamkhnz/chore/eslint-config-update

---

## Versão Outubro de 2024

**7 commits** | Período: 11/10/2024 - 25/10/2024

### Funcionalidades
- feat: adicionar componente de barra lateral shadcn, atualizar para estilo new-york, atualizar dependências e remover barra lateral customizada

### Manutenção
- chore: limpeza de código
- chore: atualizar versão
- chore: atualizar readme
- chore: atualizar imagem de pré-visualização do dashboard
- chore: atualizar dependências
- chore: atualizar dependências, componentes de interface e configuração do app

---

## Versão Agosto de 2024

**15 commits** | Período: 01/08/2024 - 24/08/2024

### Correções
- fix: melhorar responsividade dos títulos da barra lateral no estado recolhido
- fix: redirecionamento da rota raiz

### Manutenção
- chore: atualizar configuração do ESLint e aplicar correções de verificação
- chore: atualizar marca
- chore: atualizar imagem de pré-visualização do dashboard e README
- chore: refatorar código e corrigir problemas de estilo da barra lateral
- chore: corrigir redirecionamento da rota raiz
- chore: refatoração de código e ajustes menores de estilo
- chore: remover workflow do github
- chore: alterações menores
- chore: adicionar mídia do projeto

### Outros
- Atualizar README.md
- Atualizar README.md
- commit inicial
- Commit inicial

---
