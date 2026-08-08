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

- 22d4e44 feat: configuração inicial — painel administrativo Next.js com autenticação e banco de dados Supabase
- c6a6b3f feat: abas de contas e transações na seção de finanças
- 58d6b44 feat: página de faturamento com planos de assinatura
- 0466ab7 feat: redesign do faturamento com 4 planos e comparação de recursos expansível
- affa501 feat: atualização de preços com custos Supabase + lucro, layout em grade vertical
- db4ff7e feat: alinhamento de preços com camadas Supabase — Inicial 5, Pro 35, Equipe 650
- f0f28ed feat: atualização de preços 0/50/200, adição de seções Ajuste Fino e Perguntas Frequentes
- 3ede86a feat: páginas de Conta e Notificações, atualização de CTAs para Agora
- ed05564 feat: página de Changelog sincronizada com CHANGELOG.md
- 32c5509 feat: integração Stripe com preços em BRL e modo de demonstração
- 150bf4a feat: migração do dnd kit para implementação e pacotes mais recentes
- 934daf7 feat: migração da tabela de dados para usar tanstack table v9
- 22a3770 feat: tradução PT-BR completa em todas as páginas do painel
- 640c42a feat: tradução dos componentes de barra lateral, cabeçalhos, conta, notificações e interface para PT-BR
- 4ff31e7 feat: tradução dos dados mock Padrão e CRM para PT-BR
- 54c98dd feat: tradução dos dados mock e componentes de Finanças para PT-BR
- 0aeb395 feat: tradução dos dados mock de Produtividade e E-commerce para PT-BR
- 5598152 feat: tradução dos dados mock de Academia e Logística para PT-BR
- e4c2022 feat: tradução dos dados mock de Infraestrutura e Gerenciador de Arquivos para PT-BR
- 9ec2ad6 feat: tradução completa de todos os dados mock restantes para PT-BR
- 1fc76d9 feat: substituição de USD por BRL em todas as exibições de moeda

### Correções

- cf4102b fix: esquema idempotente com IF NOT EXISTS
- 61bbff4 fix: adição de IF NOT EXISTS aos índices
- 4e279fa fix: resolução de erros de lint nos arquivos de cliente Supabase
- e5603c4 fix: correção dos caminhos de importação nos componentes de faturamento
- d60a1fa fix: resolução de erros TypeScript nos componentes de gráfico
- 747b794 fix: conexão de logout + links de navegação de faturamento, atualização de preços para 45+ planos
- c5ad179 fix: ajuste de preços com markups inteligentes baseados no Supabase
- cc67b42 fix: alinhamento da Comparação de Recursos exatamente com os preços do Supabase
- cda60c9 fix: renderização de markdown no Changelog, adição de espaçamento accordion
- 1d1376b fix: correção dos diacríticos do português brasileiro
- eb3f1f4 fix: modo de demonstração usando cookies para compatibilidade com middleware
- 1c371dd fix: correção da comparação Pinned no chat-conversation-list.tsx
- 90a0407 fix: atualização das colunas de transações financeiras para corresponder ao esquema PT-BR
- acbfc89 fix: pontuação de saúde do CRM usando valores PT-BR
- 1008db1 fix: migração tanstack table v9 e pacotes ausentes
- 7fcb809 fix: resolução de todos os erros de lint, avisos e problemas de formatação

### Manutenção

- 798b5db chore: atualização de dependências
- e8577c1 chore: atualização de dependências
- ccb56a2 chore: atualização de dependências
- 326e9d5 ci(deps): atualização de actions/checkout de 4 para 7
- ac57ffb ci(deps): atualização de recharts no grupo de produção
- a2c50ad ci(deps): atualização de github/codeql-action de 3 para 4
- 1376977 ci(deps): atualização de @types/node de 22.20.1 para 26.1.2
- 3286049 ci(deps): atualização de actions/dependency-review-action de 4 para 5
- b17f0b5 ci(deps): atualização de actions/setup-node de 4 para 7
- 09c0f6b ci(deps): atualização de lint-staged de 16.4.0 para 17.3.0
- b774838 ci(deps): atualização de actions/upload-artifact de 4 para 7
- b800403 ci(deps): atualização de actions/github-script de 7 to 9
- a492f0f ci(deps): atualização de softprops/action-gh-release de 2 para 3
- dccaaab ci(deps): atualização de actions/stale de 9 para 11
- c5de2e7 ci(deps): adição de configuração do Dependabot
- 775dcf4 docs: adição de arquivos comunitários de código aberto e GitHub Actions
- e0eb480 docs: tradução do changelog para PT-BR com acentos corretos
- c437a78 docs: conclusão do changelog com todos os 628 commits organizados por mês

### Mesclagens

- 86d602f Merge pull request #1 from mmdj04/dependabot/github_actions/actions/checkout-7
- ffc8aad Merge pull request #2 from mmdj04/dependabot/npm_and_yarn/production-d71c4100fc
- f643deb Merge pull request #3 from mmdj04/dependabot/github_actions/github/codeql-action-4
- f89ee2d Merge pull request #5 from mmdj04/dependabot/npm_and_yarn/types/node-26.1.2
- 9d5a571 Merge pull request #6 from mmdj04/dependabot/github_actions/actions/dependency-review-action-5
- 62cae12 Merge pull request #7 from mmdj04/dependabot/github_actions/actions/setup-node-7
- 652da36 Merge pull request #8 from mmdj04/dependabot/npm_and_yarn/lint-staged-17.3.0
- 13e1d27 Merge pull request #10 from mmdj04/dependabot/github_actions/actions/upload-artifact-7
- e196b22 Merge pull request #11 from mmdj04/dependabot/github_actions/actions/github-script-9
- a5a7f88 Merge pull request #12 from mmdj04/dependabot/softprops/action-gh-release-3
- a5f33cf Merge pull request #13 from mmdj04/dependabot/github_actions/actions/stale-11
- 6184f1d merge: sincronização com upstream arhamkhnz/next-shadcn-admin-dashboard

---

## Versão Agosto de 2026

**25 commits** | Período: 01/08/2026 - 09/08/2026

### Funcionalidades
- 150bf4a feat: migrar dnd kit para implementação e pacotes mais recentes
- 934daf7 feat: migrar tabela de dados para usar tanstack table v9
- abffba2 feat: adicionar dashboard de monitoramento de pacientes
- cc0675b feat: adicionar dashboard do gerenciador de arquivos

### Manutenção
- ccb56a2 chore: atualizar dependências
- e8577c1 chore: atualizar dependências
- 798b5db chore: atualizar dependências
- c4517b6 chore: atualizar dependências e componentes
- a70abdc chore: adicionar componente de questionário shadcn
- e9c4365 chore: atualizar dependências
- b1a2da9 chore: atualizar versão do next
- 0491c13 chore: atualizar dependências
- 8cf3956 chore: correção rápida
- 45f4e6c chore: atualizações
- 8a4037d chore: atualizar readme
- a7a2f4e chore: correção rápida
- 303bf89 chore: atualizações
- fb66296 chore: correções rápidas
- e37ed9c chore: correção rápida
- f51b777 chore: atualizações
- 4727cc7 chore: atualizar readme
- 3424936 chore: atualizar dependências
- 2b53622 chore: correção rápida

### Outros
- a1889cf Merge pull request #79 from arhamkhnz/feat/patient-monitoring
- b0669e9 Merge pull request #78 from arhamkhnz/feat/file-manager

---

## Versão Julho de 2026

**36 commits** | Período: 01/07/2026 - 31/07/2026

### Funcionalidades
- 4177da6 feat: adicionar dropdown de versões do projeto no cabeçalho do dashboard

### Refatoração
- 8236988 refactor: organizar componentes do dashboard
- 1709bad refactor: simplificar atualizações de preferências
- 43f47b8 refactor: corrigir achados de manutenção (por react doctor)

### Documentação
- d292e08 docs: adicionar link do dashboard React Aria

### Manutenção
- 1b4780a chore: limpeza de código
- d673cae chore: atualizar dependências
- bf5714c chore: correção rápida
- b7457dc chore: atualizar dependências
- c710eb0 chore: adicionar análises
- 2ec9b47 chore: correção rápida
- a5d645d chore: atualizar dependências
- ca3c4d4 chore: atualizar dependências
- 742353f chore: atualizar dependências
- 58c6645 chore: reverter versão do radix
- 0a00491 chore: atualizar dependências
- cf132a3 chore: atualizar dependências
- b484645 chore: atualizar dependências
- ba4978a chore: atualizar dependências
- 60a000a chore: atualizar dependências
- 17ac307 chore: atualizar dependências
- d0d2835 chore: atualizar readme
- 5c28b09 chore: atualizar readme
- 3191bf0 chore: atualizar dependências
- 95eaf90 chore: atualizar dependências
- 3504473 chore: atualizar dependências
- 00b1a2e chore: atualizar dependências
- 7cec408 chore: atualizar dependências e correções de lint
- 75eb9c8 chore: correção rápida
- c73d4fd chore: atualizações
- 1227d0c chore: correção rápida
- 7bd1fed chore: correção rápida
- 948471f chore: otimizar preferências
- cd10abd chore: correção rápida
- 6cd8312 chore: atualizar dependências

### Outros
- a9be558 Merge pull request #76 from arhamkhnz/chore/optimize-prefs

---

## Versão Junho de 2026

**68 commits** | Período: 01/06/2026 - 30/06/2026

### Funcionalidades
- 4cbf771 feat: adicionar novos componentes shadcn e atualizar dependências
- 4f43f13 feat: adicionar tarefas
- 61c9d1b feat: melhorar dados de saúde da infraestrutura
- 4d75100 feat: refinar dashboard de infraestrutura
- 927f156 feat: adicionar dashboard de infraestrutura
- 4edb326 feat: adicionar calendário completo
- 1b483a3 feat: adicionar calendário
- 81956cd feat(invoice): refinar padrões e itens móveis
- 198d77c feat(invoice): refinar layout do papel de pré-visualização

### Correções
- 2ae27c6 fix: aprimorar navegação da barra lateral recolhida

### Refatoração
- 8d2b082 refactor(sidebar): reforçar modelo de dados dos itens de navegação
- 5ebca71 refactor(sidebar): simplificar renderização dos itens de navegação
- 6a9a4a2 refactor(sidebar): simplificar renderização dos itens de navegação
- 0129e3e refactor(invoice): limpar componentes do construtor
- 962cd6f refactor(kanban): dividir em componentes, corrigir cancelamento de arrasto e status de conclusão

### Documentação
- 07078ce docs: adicionar diretrizes do AGENTS.md
- 02fe0af docs: adicionar dashboard de infraestrutura ao readme

### Manutenção
- b3aaddb chore: atualizar dependências e componentes
- 361ac22 chore: atualizar dependências
- 6be1585 chore: correções rápidas
- 9dc0e89 chore: adicionar fade de rolagem na lista de e-mail
- 57faadc chore: usar componentes de chat shadcn para tela de chat
- baad672 chore: adicionar regra de lint para ternário aninhado e limpar avisos
- 369ca1d chore: atualizar dependências
- b4087b3 chore: correções rápidas
- a0d1044 chore: atualizar dependências e componentes
- a37b9be chore(calendar): adicionar configuração do componente FullCalendar v7
- af7bb15 chore: atualizar dependências e componentes
- 557c66c chore: atualizar dependências
- d21f968 chore: correção rápida
- b6a5b44 chore: atualizar readme
- 290f978 chore: atualizar readme
- fcc9add chore: adicionar impressão de fatura
- c144309 chore: correção rápida
- bc7eea1 chore: atualizações
- 992b375 chore: atualizar dependências e corrigir avisos de lint
- 6ea0077 chore: atualizar readme
- 0412505 chore: atualizar dependências
- fc53c8c chore: corrigir layout
- c869910 chore: atualizar dependências e componentes
- 38058da chore: correção rápida
- 014e48d chore: atualizações
- c354474 chore: correção rápida
- 0f899cd chore: atualização do chat
- 2fcaf9e chore: correção rápida
- 916ec2c chore: atualizar dependências
- 36d0705 chore: atualizar dependências

### Outros
- cc90bbc Merge pull request #73 from arhamkhnz/feat/tasks
- df4898f Merge pull request #71 from arhamkhnz/feat/infra
- 4b5a334 Merge pull request #70 from arhamkhnz/feat/calendar
- 8b6f1ff Merge branch 'main' into feat/calendar
- b9f907d Merge pull request #69 from arhamkhnz/feat/invoice
- 527a778 Criar tela do construtor de fatura
- 1e7ef04 Criar tela de fatura
- 730c0ac Merge branch 'main' into feat/invoice
- ca2b42b Merge pull request #68 from arhamkhnz/feat/kanban
- 804d8e4 Limpar dados das colunas do kanban
- 003cef0 Refinar quadro de tarefas do kanban
- 25ae18f Merge branch 'main' into feat/kanban
- 3ed82f3 Merge pull request #67 from arhamkhnz/feat/chat
- cd485a7 Tornar chat responsivo
- 3ea8416 Refinar interface do chat
- 4bc95b4 Refinar interface do chat
- 014e48d Refatorar layout da caixa de entrada do chat
- c819dbb Adicionar interface de chat independente
- a4e5cf2 Merge branch 'main' into feat/chat
- 2764a7d Merge pull request #65 from arhamkhnz/feat/roles
- 8c956e8 Refatorar tabela de funções

---

## Versão Maio de 2026

**94 commits** | Período: 01/05/2026 - 31/05/2026

### Funcionalidades
- d9ad326 feat: adicionar layouts iniciais do chat
- b13977d feat: adicionar layout inicial do kanban
- 9bea0ea feat: layout inicial da página de usuários
- 824abfc feat: adicionar dashboard de logística
- 5b6feff feat: adicionar rota de funções
- 1bac9e5 feat: adicionar rota de usuários
- 503e42c feat: adicionar rota de fatura
- a0f0d30 feat: adicionar rota de kanban
- e21fd47 feat: adicionar rota de calendário
- 5fc2523 feat: adicionar rota de chat
- 46b059d feat: adicionar pré-visualização de e-mail no dashboard
- 973d300 feat: mover e-mail para layout independente
- 5b68489 feat: adicionar estrutura da barra lateral de e-mail
- d2e6351 feat: melhorar responsividade da página de e-mail
- 5f905a5 feat(academy): finalizar layout do dashboard da academia e cartões de KPI
- 5d5baa5 feat: promover rota de análises v2
- b1c7e61 feat: adicionar cartão de desempenho da página de análises
- 10291eb feat: adicionar cartão de fontes de tráfego de análises
- 8b98b5a feat: refinar gráficos de qualidade das análises v2
- 175937a feat: adicionar cartões de tempo real e qualidade de análises

### Refatoração
- 6032c5e refactor barra lateral de e-mail e layout da caixa de entrada

### Documentação
- d3e5e10 docs: adicionar análises v1 ao readme

### Manutenção
- fe1c38c chore: atualizar dependências e componente
- 65aa86a chore: atualizar dependências
- 3e199b4 chore: atualizar dependências
- 1139a73 chore: atualizar layout de funções
- 2f608a9 chore: atualizações
- c093b24 chore: atualizações
- 17d1069 chore: atualizar filtros
- 6391871 chore: completar design dos usuários
- 4f28abd chore: funcionalidade inicial da página de funções
- 4d5a848 chore: atualizar dependências e componente
- 75ba611 chore: correção rápida
- 582e6c3 chore: remover dependência indesejada
- 6b3ae2f chore: atualizações
- bc63c26 chore: atualizações
- 4777e2b chore: atualizações
- 6013cce chore: atualizar readme
- 1119219 chore: atualizar padrões da barra lateral de e-mail
- 288395a chore: atualizar dependências e componentes
- a50e4d5 chore: atualizar responsividade do recolhido
- 4376ae9 chore: atualizar responsividade
- 98a4242 chore: correção rápida
- 36e24da chore: correção rápida
- 9beeb2b chore: atualizações
- 957d0f3 chore: correções rápidas
- dc96d69 chore: atualizações
- c0f9f79 chore: atualizar KPI
- 4b130a5 chore: correção rápida
- d1f4274 chore: reverter versão do react-day-picker
- 7b623b9 chore: atualizar dependências
- 1f5e18b chore: reverter versão do react-day-picker
- e0802bf chore: atualizar dependências
- 8693ee8 chore: atualizações
- 081277b chore: atualizar dependências
- 09fc03d chore: correção rápida
- 1024b22 chore: correção de altura
- 20f063c chore: correção rápida
- 0e1ef86 chore: atualizar dependências
- 77e2487 chore: atualizar dependências
- 1fecafa chore: atualizar dependências
- 0bcdcc5 chore: atualizar dependências
- 07128f3 chore: atualizar dependências
- 0626d5f chore: atualizar dependências
- 6c19e7d chore: atualizar readme
- 9e2e09d chore: alinhar preenchimento da aba de fontes de análises
- bb6cafb chore: ajustar espaçamento das fontes de análises
- 019de60 chore: atualizar indicador
- 71bdcc1 chore: atualizações

### Outros
- 1fc20d0 Merge branch 'main' into feat/roles
- 4ac4a91 Merge pull request #63 from arhamkhnz/feat/users
- b59bee2 Merge branch 'main' into feat/kanban
- e96e987 Merge branch 'main' into feat/roles
- 9f58902 Merge branch 'main' into feat/users
- 9a734de Merge pull request #62 from arhamkhnz/feat/logistics
- 808f7f8 Tornar detalhes da logística responsivos
- 060c547 Refinar detalhes de envio da logística
- 2d5dcc0 Merge pull request #60 from arhamkhnz/update-mail-sidebar
- e3ae25a Merge pull request #58 from arhamkhnz/feat/mail
- 4b7ce10 Enriquecer conjunto de dados de e-mail com anexos e carimbos de data/hora dinâmicos
- ce7589c construir barra de ferramentas da visualização de mensagem de e-mail
- bf0fb58 Substituir estado do e-mail por Zustand
- 0596c77 Atualizar persistência do layout de e-mail
- 02b4698 Merge branch 'main' into feat/mail
- e6fedb8 Atualizar disponibilidade do dashboard
- e6545ac Merge pull request #57 from arhamkhnz/feat/academy
- 0fbcb5a Refinar dashboard do professor da academia
- 5532e07 Adicionar dashboard do professor da academia
- 3ed2930 commit inicial: exemplo de e-mail shadcn
- 29e6da7 Merge pull request #55 from arhamkhnz/feat/ecommerce
- 8f5c37f Adicionar insights do dashboard de e-commerce
- 9a3cb0e Adicionar tabela de pedidos recentes do e-commerce
- 96fc15c Adicionar cartão de fontes de tráfego do e-commerce
- 9cc357e Adicionar gráfico de tráfego da loja do e-commerce
- 10994ac Refinar filtros do dashboard de e-commerce
- 8ae6ed5 Adicionar visão geral do dashboard de e-commerce
- 6b5e27b Refinar estado ativo do alternador de conta
- c773d0f Merge pull request #54 from arhamkhnz/feat/analytics-v2

---

## Versão Abril de 2026

**69 commits** | Período: 01/04/2026 - 30/04/2026

### Funcionalidades
- 62d50ad feat: refinar controles das análises v2
- 0bcdcc5 feat: adicionar dashboard de análises v2
- 5bea7e5 feat(finance-v2): refatorar componente de carteira com ativos criptografados e informações de cofre físico, renomear componentes para melhor ressonância
- 58f051c feat(finance-v2): refatorar interface de transações pendentes
- 88bb44f feat: adicionar busca na barra lateral
- 49945eb feat: mover crm v2 para crm e crm legado para crm-v1
- 1a491ef feat: refinar tabela de oportunidades do crm v2
- ef641a4 feat: adicionar seções de atividade do crm v2
- ed2fa81 feat: adicionar dashboard do crm v2
- 683b129 feat: alternar rotas do dashboard padrão
- 157861c feat: refinar tabela de clientes do padrão v2
- 355ccc8 feat: refinar tabelas do dashboard padrão v2
- ad228d2 feat: refinar visão geral de desempenho do padrão v2
- 9c3e4c4 feat: refinar estilo do gráfico e dashboard do padrão v2
- 61c70bc feat: refinar gráficos de visão geral do padrão v2
- f69585c feat: atualizar datas de produtividade dinamicamente
- d8531f8 feat: adicionar layout do dashboard de produtividade
- 0e587f2 feat: adicionar dashboard padrão-v2 e atualizar primitivas de interface

### Correções
- db984b4 fix(finance): adicionar diretiva use client ao componente de transações pendentes
- 6845b89 fix(finance): adicionar importação ausente de tabs content e ordenar classes
- 38cf3b2 fix(finance): renomear componente de transações pendentes para remover sufixo de tabela e corrigir importação
- d9e9e32 fix: substituir busca customizada por busca integrada do cmdk
- 0eb513a fix: resolver problemas de revisão de código no diálogo de busca
- 1c6eb5d fix: ajustar espaçamento do rodapé das oportunidades de CRM
- 9b0f50d fix: reforçar filtragem da tabela crm e progresso da proposta
- d2bee0c fix: corrigir análise de datas do gráfico do dashboard padrão
- ccf1de3 fix: estilizar opções de seleção nativas

### Documentação
- 316f796 docs: mover nota do base ui no readme
- 925b485 docs: adicionar link do repositório base ui ao readme
- e5fc7e5 docs: remover análises do "em breve" do README
- b6f127c docs: atualizar nomes das telas do README

### Manutenção
- 36bc8f4 chore: atualizar dependências
- 3838cb8 chore: atualizar dependências
- 6c19e7d chore: atualizar readme
- 2027ee6 chore: reorganizar rotas de finanças para tornar v2 o padrão e mover v1 para legado
- 0412505 chore: atualizar dependências
- f172cbd chore: correção rápida
- aab3e7b chore: atualizar dependências do biome e ícones
- e2198a7 chore: adicionar rota de finanças
- c0fff98 chore: atualizar dependências de interface
- 05f3ac9 chore: atualizar dependências shadcn
- 73ed88f chore: correções rápidas
- 4707e6c chore: ocultar dashboard de produtividade da barra lateral
- 12b4701 chore: aplicar atualizações de interface geradas
- e90ab54 chore: atualizar fonte padrão
- dd3c6c0 chore: atualizar dependências
- d4aa163 chore: atualizar dependências de interface e ferramentas
- 055861e chore: atualizar next e react
- 0da0cdc chore: atualizar dependências shadcn
- 464345f chore: atualizar dependências e ícone do dashboard
- b7e735d chore: atualizar painéis e ajustar layout do dashboard
- a9eae56 chore: atualizar next para 16.2.2
- 7b33444 chore: atualizar componentes de interface shadcn

### Outros
- 36369f2 Merge pull request #49 from arhamkhnz/feat/finance-v2
- a676773 Merge pull request #51 from Muhammadrizo14/feature/added-search
- b11292b Derivar itens do diálogo de busca a partir da barra lateral
- 54850e9 Adicionar gráfico de visão geral de gastos financeiros
- fe92f92 Refinar layout do dashboard de finanças v2
- c821628 Atualizar link de contato de suporte da barra lateral
- 53343fe Refinar layout do dashboard de finanças v2
- 99d936f Adicionar visão geral do dashboard de finanças v2
- 99d936f Corrigir transbordamento do dashboard de análises na largura média
- 1f98082 Reforçar regras do Biome e atualizar preferências do dashboard
- 94b3553 Merge pull request #47 from arhamkhnz/feat/crm-v2
- 8a0cc9a Reforçar cópia do projeto de produtividade
- 45ffea4 Usar ícone mais claro da barra lateral de produtividade
- 10eba8f Merge pull request #46 from arhamkhnz/3.0.0
- 6c9e0d2 Merge branch 'main' into 3.0.0
- 563720d style: refinar gráfico de atividade do dashboard padrão

---

## Versão Março de 2026

**28 commits** | Período: 07/03/2026 - 27/03/2026

### Funcionalidades
- a5eea3b feat(header): adicionar atalho do github
- 395a6ab feat(sidebar): adicionar card de suporte no rodapé
- 4c7be9f feat(theme): alternar cor base do shadcn para mist
- 8e86098 feat(ui): atualizar estilo do shadcn para radix-vega
- bf29717 feat(fonts): expandir seletor de fontes e adicionar Geist Pixel Square
- 7b6b2e8 feat: implementar redesign do dashboard de análises

### Correções
- 7401b5a fix(select): agrupar itens de seleção do dashboard
- 4697682 fix(sidebar): refinar layout do card de suporte
- 897c001 fix(ui): alinhar seletores de controles de layout
- 15bef4d fix(ui): correções menores no dashboard e paleta de comandos
- 847bd0f fix(scripts): executar biome via node para evitar problemas de spawn no Windows
- f1ba49f fix(husky): fazer geração de presets e lint-staged funcionarem multiplataforma

### Refatoração
- a7fdf1d refactor(tables): localizar implementações de tabelas do dashboard
- 68210a1 refactor(auth): adotar formulários baseados em campos rhf
- d75489f refactor(analytics): finalizar estrutura de dashboard de 3 linhas e limpeza de nomenclatura

### Manutenção
- 21295f5 chore: remover nota de armazenamento de preferências
- 231752d chore: remover dependências não utilizadas
- 1d09520 chore: atualizar dependências e componentes shadcn
- 75f361c chore: atualizar dependências
- 3be6f27 chore: atualizar dependências e componente vazio shadcn
- 7541627 chore: atualizar dependências
- b2fe6c4 chore: atualizar componentes shadcn
- 0341b27 chore(analytics): atualizar nomes dos proprietários do dashboard
- e5d98fb chore: atualizar dependências e componente shadcn
- 079e8d9 chore(analytics): alinhar métricas estáticas entre seções do dashboard

### Outros
- 3b5018b style(layout): dividir seletores de layout centralizado
- 4fd115a Merge pull request #41 from arhamkhnz/codex/fix-windows-precommit-generate-presets
- 8d65324 Merge pull request #35 from arhamkhnz/feat/analytics-dashboard

---

## Versão Fevereiro de 2026

**3 commits** | Período: 11/02/2026 - 15/02/2026

### Manutenção
- 3424936 chore: atualizar dependências
- 3191bf0 chore: atualizar dependências e componentes shadcn
- 233cc7a chore: correções menores

---

## Versão Janeiro de 2026

**34 commits** | Período: 01/01/2026 - 28/01/2026

### Funcionalidades
- a613c2d feat(analytics): adicionar resumo de receita e risco
- 1c30052 feat(analytics): adicionar controles de visão geral
- daf7b41 feat: definir automaticamente resolvedThemeMode no setThemeMode
- 4c0ea37 feat: adicionar modo de tema do sistema
- a65c42c feat: adicionar botão de restaurar padrões
- 23d6dc9 feat: adicionar preferência de fonte dinâmica
- 8ef6a27 feat(finance): completar seções restantes do dashboard

### Correções
- cd32748 fix: alternar entre claro/escuro/sistema no alternador de tema

### Manutenção
- d679b2e chore: atualizar dependências
- e3b47ca chore: atualizar componentes shadcn
- 36ada71 chore: atualizar dependências
- 8047940 chore: correção rápida
- c31f524 chore: correção rápida
- b639e94 chore: correções menores
- e1fee72 chore: correção rápida
- e01ebc7 chore: atualizar script de inicialização
- 14f2c60 chore: melhorar lógica de alternância de tema
- ea225fe chore: renomear variáveis para melhor compreensão
- 7e767fd chore: otimizar script de inicialização
- 4e00ee0 chore: atualizar dependências
- 361d45c chore: aplicar sugestões
- e1499dd chore: habilitar preload para todas as fontes
- eeb0b66 chore: corrigir fonte padrão
- 41ce1c5 chore: atualizar fontes
- 53e0d34 chore: corrigir ordem de camadas css
- 7745f74 chore: correções menores
- fd095a1 chore: refinar tema padrão e ajustes menores de interface
- dde7c96 chore: atualizar dependências e correções menores
- 0f34d30 chore(finance): renomear componentes e pequenas correções

### Outros
- 3da75ed Merge pull request #32 from likui628/system-theme
- fea7eb2 Merge pull request #30 from likui628/main
- bbd451a Merge pull request #29 from arhamkhnz/feat/font-preferences
- ada1b56 Merge pull request #27 from arhamkhnz/feat/finance-dashboard-redesign
- 57294b7 2.2.0

---

## Versão Dezembro de 2025

**50 commits** | Período: 01/12/2025 - 31/12/2025

### Funcionalidades
- 96a0532 feat: adicionar linha de KPI
- 094e38a feat: inicialização do biome
- 4c426b1 feat: melhorar tratamento de preferências de layout para renderização instantânea da barra lateral
- 322cb7b feat: adicionar "use no memo" em todos os componentes de tabela para prevenir memorização do React Compiler e corrigir problemas de estado
- 4d0c0b3 feat: adicionar ponte de preferências da janela e correção temporária de flicker no provedor
- bcce819 feat: configuração de persistência de preferências concluída
- 5ac5c93 feat: mover configuração da barra lateral para a loja global e conectá-la dentro do AppSidebar
- 716e97f feat: adicionar configuração de preferências
- ebb5a3d feat: adicionar utilitários de cookie do lado do cliente

### Correções
- 8a50c16 fix: alinhar padrões de inicialização do tema e usar seletor raso da barra lateral

### Manutenção
- da0a44b chore: redesenhar meus cartões
- 582fcbc chore: redesenhar gráfico de visão geral do fluxo de caixa
- 5eb63a3 chore: atualizar design inicial do dashboard
- 1361a71 chore: atualizar dependências
- 4907c5d chore: atualizar dependências
- 8841c0c chore: atualizações menores
- 6294c1b chore: usar biome para formatação de código gerado por presets
- e28277a chore: atualizar componentes shadcn
- 4b09fd2 chore: atualizar comandos do Biome e limpar estilos
- 3c98550 chore: remover configuração eslint do next
- 14b057e chore: verificar e formatar código do projeto usando Biome
- b92f625 chore: remover configurações do ESLint e Prettier e uso
- 121edb0 chore: migrar configuração do prettier e eslint para biome
- 2197d53 chore: atualizar dependências
- c64b95a chore: atualizar dependências
- c096da6 chore: correção rápida
- 9f9a86b chore: atualizar dependências
- 745b5ea chore: atualizar texto de preferências dos controles de layout
- 2785e03 chore: lógica de preferências simplificada
- 785b1fb chore: correção de estilo e tipo
- b5770b5 chore: atualizar seletores de estilo da barra de navegação para usar atributos de dados html
- 5b2c81b chore: atualizar configuração de preferências e correção de estilo
- ddf5e21 chore: adicionar await ausente no persistPreference
- c15ec5e chore: desabilitar controles de layout e aplicar correções menores
- f8313e7 chore: adicionar configuração de preferências e persistência condicional no servidor
- 6922089 chore: atualizar dependências
- 1d00212 chore: atualizar dependências
- 66704bd chore: alterações menores
- 9272537 chore: atualizar controles de layout e corrigir lógica de estado da barra lateral
- cf0ce93 chore: simplificar manipuladores dos controles de layout e melhorar inicialização do provedor de preferências

### Outros
- d06f62c Merge pull request #25 from arhamkhnz/chore/eslint-to-biome
- b704217 Adicionar instruções de formatação e verificação de código ao README
- eba378a 2.1.0
- c64b95a style: corrigir alinhamento de ícones da barra lateral
- ddc866b Merge pull request #24 from arhamkhnz/chore/optimize-preference-store
- 31a147c Merge pull request #22 from arhamkhnz/optimize-sidebar-pref
- 629937b Merge pull request #21 from arhamkhnz/fix/datatable
- 1898e64 Merge pull request #20 from arhamkhnz/feature/prefs-and-style-fixes
- 27bd9ff Merge pull request #18 from arhamkhnz/fix/layout-settings
- 27bd9ff Merge branch 'main' into fix/layout-settings

---

## Versão Novembro de 2025

**20 commits** | Período: 02/11/2025 - 30/11/2025

### Funcionalidades
- d948542 feat: adicionar script de inicialização do tema e tornar layout raiz estático

### Manutenção
- b986677 chore: atualizar lógica da loja de preferências e aplicar correções menores
- 2a2a216 chore: habilitar controles de layout
- 809bdd6 chore: remover análises
- 9f11dbe chore: atualizar dependências
- 47b9b36 chore: atualizar avatar para url externa
- 23fbdd5 chore: desabilitar prefetch no next Link
- ae4b5e3 chore: desabilitar temporariamente lógica de cookie no layout raiz para evitar bug de re-renderização
- aa004ab chore: desabilitar controles de layout
- 2d0a558 chore: atualizar dependências
- 5e1a22e chore: desabilitar prefetch nos links da barra lateral para evitar requisitos de rota desnecessários
- 26ed6ad chore: adicionar análises do vercel
- d2a3bf6 chore: atualizar dependências
- 141e014 chore: atualizar dependências
- 4484a4e chore: atualizar dependências
- b35aed9 chore: atualizar estilos de alternância dos controles de layout
- b7a6b62 chore: atualizar dependências e aplicar dimensionamento uniforme dos itens de alternância e classes de texto
- 899e9c4 chore: atualizar dependências
- 5fe592b chore: atualizar dependências

### Outros
- 8f8a21c style: adicionar overscroll-behavior

---

## Versão Outubro de 2025

**22 commits** | Período: 01/10/2025 - 29/10/2025

### Funcionalidades
- f1c109c feat: migrar para Next 16, habilitar React Compiler e atualizar configuração do ESLint

### Correções
- e5e99ef fix: usar DropdownMenuTrigger do Shadcn em vez de Radix UI no data-table-view-options.tsx

### Refatoração
- 81f2338 refactor: renomear middleware para proxy, limpar código e atualizar tsconfig

### Documentação
- f8b6935 docs: atualizar referências de versão do Next.js em docs e meta
- 9fedcf5 docs(readme): atualizar imagem do dashboard e versão na URL de demonstração

### Manutenção
- 98e9838 chore: atualizar dependências
- 33c1cf9 chore: atualizar dependências e componente shadcn
- 7e76e82 chore: atualizar dependências e remover pacotes não utilizados
- 4e3e737 chore: atualizar dependências e componente shadcn
- ee0b215 chore: atualizar dependências e componente shadcn
- 1aafd38 chore: atualizar dependências e componente shadcn
- dd9d328 chore: atualizar dependências
- 7a21380 chore: atualizar dependências e componente shadcn
- bb4b312 chore: atualizar dependências
- 17fc38b chore: adicionar novos componentes shadcn
- b943f7d chore: atualizar dependências
- 61b8db7 chore: adicionar contributing.md

### Outros
- 8554627 Atualizar README com link da versão Next.js 15
- c96a736 Atualizar README para refletir mudança de versão do Next.js
- bb4b312 Atualizar README.md
- 17fc38b Atualizar CONTRIBUTING.md
- b943f7d Atualizar CONTRIBUTING.md

---

## Versão Setembro de 2025

**14 commits** | Período: 05/09/2025 - 29/09/2025

### Funcionalidades
- 4bde1f1 feat: Atualizar controles de layout do dashboard e utilitários de layout com cabeçalho fixo

### Manutenção
- 158312e chore: limpeza de código, correções menores e atualizar dependências
- f6c7cff chore: atualizar dependências
- 1609c42 chore: atualizar dependências e componentes shadcn
- 5db804e chore: atualizar dependências
- a458ea4 chore: atualizar componentes shadcn
- 5bb59ad chore: atualizar dependências e atualizar componentes shadcn/ui
- 71bc78d chore: atualizar dependências
- 163c516 chore: atualizar dependências
- ab53bd8 chore: adicionar página em breve e atualizar dependências
- 4672ac6 chore: atualizar rotas inexistentes para /dashboard e atualizar dependências

### Outros
- 4ad2c58 style(layout): refinar estilos de barra de navegação fixa para consistência
- 069354c Merge pull request #10 from fiifiofosu/main
- 186480a Atualizar layout de navegação e tratamento de preferências

---

## Versão Agosto de 2025

**11 commits** | Período: 01/08/2025 - 31/08/2025

### Manutenção
- 430bafe chore: adicionar rotas temporárias, atualização de dependências e habilitar turbopack
- 0fa7058 chore: atualizar dependências
- 39e3589 chore: atualizar dependências
- 65951a1 chore: atualizar dependências
- 5318aa2 chore: atualizar dependências
- 4d330c5 chore: atualizar dependências
- db4b024 chore: atualizar dependências
- 4ab4018 chore: adicionar página não encontrada e limpeza de código
- ff06832 chore: atualizar dependências
- 2c114d4 chore: atualizar dependências
- cd69a92 chore: atualizar dependências

---

## Versão Julho de 2025

**52 commits** | Período: 07/07/2025 - 30/07/2025

### Funcionalidades
- 9e34fa5 feat: adicionar script de geração de presets de tema, padronizar tipos e atualizar interface
- 5944a62 feat: adicionar loja zustand para tema e preset com provedor baseado em contexto
- 5465097 feat: adicionar alternador de presets de tema e corrigir problemas menores de UI/UX
- 966b143 feat: adicionar páginas de autenticação v2
- aac7533 feat: adicionar dashboard de finanças
- 9c2af48 feat: adicionar dashboard de CRM e melhorar layout

### Correções
- 2d3dbb3 fix: sobrescrever utilitários de sombra para respeitarem presets de tema e atualizar dependências

### Manutenção
- 0fe2d66 chore: atualizar dependências
- 2d3dbb3 chore: atualizar dependências
- cec7ad1 chore: atualizar dependências
- 46e4049 chore: atualizar imagem de mídia
- 224b6f1 chore: atualizar mídia
- fad7c6a chore: atualizar imagem de mídia
- d5aed9d chore: correção de acessibilidade do eslint
- 47192ba chore: remover dependências não utilizadas e melhorias menores
- 8c59f5b chore: corrigir avisos do eslint
- c52db51 chore: corrigir importações de tipo
- 9b786f3 chore: atualizar hook de pré-commit para adicionar automaticamente presets de tema
- 789fbb6 chore: atualizar dependências e remover logs de teste
- 1f21a30 chore: adicionar logs de teste no ThemeSwitcher para depuração
- 1bab15e chore: mover loja e provedor de preferências para o diretório stores/
- 6e7b327 chore: adicionar funções utilitárias de layout e tema, simplificar lógica de controle de layout e tema
- b506c95 chore: otimizar uso do layout de conteúdo e correções de bugs menores
- 30dd61f chore: desabilitar middleware temporariamente para evitar execuções de funções edge desnecessárias
- 68bf2aa chore: correções menores
- ea390ca chore: atualizar dependências e componentes shadcn
- 2ea9f4a chore: correções de cores e limpeza de código
- b277e16 chore: corrigir rota do CRM
- 6a1b1d2 chore: reverter tema
- 6a251f7 chore: atualizar dependências
- b4e6cd9 chore: atualizar gráficos do CRM

### Outros
- 1077358 Atualizar README.md
- 1ef7199 Atualizar README.md
- f17740d Atualizar README.md
- 636b96b Atualizar README.md
- bd1b9e5 Atualizar README.md
- d49c69d Atualizar README.md
- 648e335 Atualizar README.md
- 6881cc9 Atualizar README.md
- 4a7388e Atualizar README.md
- f7c9754 Atualizar README.md
- 2b7ed0d Atualizar README.md
- ce53afe Atualizar README.md
- 7dce8ee Atualizar README.md
- b1ab351 Atualizar README.md
- a6aab1c Atualizar README.md
- 8b9ba1d Atualizar README.md
- 10aba02 Atualizar README.md
- 1f0d154 Merge pull request #7 from Manasa0424/feat/update-dashboard
- 56a4044 Merge branch 'main' into feat/update-dashboard
- f7c6125 Merge pull request #6 from Manasa0424/feat/add-crm-dashboard
- e33ab6d Merge branch 'main' into feat/add-crm-dashboard

---

## Versão Junho de 2025

**25 commits** | Período: 04/06/2025 - 30/06/2025

### Funcionalidades
- 6389e98 feat: adicionar telas de autenticação v1 e limpeza de código
- c0f84f5 feat: adicionar alternador de layout de conteúdo para layouts de largura total e centralizado

### Manutenção
- c606a95 chore: limpeza de código
- c02ea98 chore: substituir ícones estáticos pelo pacote simple icons e limpeza de código
- 292ea91 chore: melhorar lógica de renderização da tabela de dados para melhor legibilidade
- 51acde2 chore: melhorar tabela de dados
- 1b6519c chore: melhorar tabela de dados
- f7c77e4 chore: atualizar dependências
- b5d2878 chore: melhorar tabela de dados
- 75f209e chore: melhorar lógica de renderização da tabela de dados para melhor legibilidade
- 2cedc85 chore: migrar componentes shadcn para o pacote mono radix-ui
- 52615c4 chore: atualizar dependências
- 12bbbd2 chore: refatorar componentes do dashboard padrão, reestruturação da tabela de dados e atualizar dependências
- 73a390e chore: adicionar diálogo de busca e refatorar código
- d550b19 chore: descartar último commit e reverter alterações
- 86d2807 chore: atualizar readme
- d6d5136 chore: atualizar componentes shadcn e dependências
- acdad92 chore: atualizar lógica de margem responsiva para layout centralizado e barra lateral inset
- 5fbfb91 chore: limpeza de código e melhorar tabela de dados
- 9f94418 chore: limpeza de código e tabela de dados modificada
- 5739763 chore: atualizar implementação da tabela de dados, limpeza de código e atualizar dependências

### Outros
- df4160a commit de finanças
- 3b86598 Merge branch 'feat/add-crm-dashboard' of github.com:Manasa0424/next-shadcn-admin-dashboard into feat/add-crm-dashboard
- e52a8ce Corrigir erro de contexto de cookies passando cookieStore como parâmetro
- 7d6717c Atualizado .gitignore

---

## Versão Maio de 2025

**26 commits** | Período: 04/05/2025 - 30/05/2025

### Funcionalidades
- ef185da feat: adicionar componente de alternância de conta
- 99faf0e feat: adicionar alternador de tema
- 6ff72f1 feat: atualizar barra lateral para usar menu dropdown no estado recolhido
- 871c848 feat: adicionar painel de preferências de layout com configurações de variante da barra lateral e recolhível
- b2865a1 feat: migrar para Next.js 15 e Tailwind CSS v4 com novo esquema de cores

### Correções
- e582c62 fix: fallback para layout recolhível na barra lateral móvel

### Refatoração
- 48f4ae9 refactor: remover arquivo desnecessário

### Manutenção
- 06b1590 chore: atualizar dependências
- 6d43057 chore: atualizar dependências, configuração do app e correções menores de qualidade de código
- e824e3a chore: atualizar dependências
- f590c67 chore: limpeza de código
- 416860d chore: atualizar imagem de mídia
- b2da8fd chore: atualizar imagem de mídia
- d48b90e chore: adicionar eslint-plugin-sonarjs para detecção de código comentado, limpar código e atualizar dependências
- 16fbce8 chore: reestruturar componentes do projeto para _components e atualizar dependências
- cd09ec5 chore: atualizar estrutura de arquivos do projeto com grupos de rotas (main) e (external)
- d7291d6 chore: código de redirecionamento descomentado
- 31fb055 chore: limpeza de código, otimizar re-renderizações da barra lateral, adicionar prettier-plugin-tailwindcss e verificar código do projeto
- 9912041 chore: atualizar imagem de pré-visualização e readme
- 5a72e9c chore: atualizar README e imagem de pré-visualização

### Outros
- f55b9dd Atualizar README.md
- 1d0703b atualizar: avatar, nome e e-mail
- d09c505 estilo de código: atualização de props readonly em todos os componentes
- efb559a Atualizar README.md
- df5fb02 Atualizar README.md
- bd29bee Merge pull request #4 from arhamkhnz/migration/next15-tailwindv4

---

## Versão Abril de 2025

**1 commits** | Período: 28/04/2025 - 28/04/2025

### Manutenção
- 880bcfc chore: atualizar dependências e componentes shadcn

---

## Versão Março de 2025

**7 commits** | Período: 04/03/2025 - 19/03/2025

### Funcionalidades
- 04ec0ae feat: redesenhar dashboard, limpar código e atualizar esquema de cores

### Manutenção
- 72028c4 chore: atualizar dependências e componentes shadcn
- c877aa1 chore: habilitar espaçamento de colchetes na configuração do Prettier
- 760c2c4 chore(eslint): aplicar regra eslint de memorização de valores de contexto
- 8483c1d chore: atualizar dependências do projeto e atualizar componentes shadcn
- d266494 chore(eslint): aplicar regra sem importações duplicadas e verificar código
- 04ec0ae chore: atualizar dependências

---

## Versão Fevereiro de 2025

**2 commits** | Período: 27/02/2025 - 27/02/2025

### Manutenção
- 0d15864 chore: atualizar configuração do eslint
- 05d3178 chore: atualizar componentes shadcn e pacotes para versão mais recente

---

## Versão Janeiro de 2025

**2 commits** | Período: 17/01/2025 - 17/01/2025

### Manutenção
- ebcf6b2 chore: atualizar configuração do eslint para convenções de nomenclatura de arquivos e regras de verificação, código verificado
- cf35a03 chore: atualizar dependências e limpeza de código

---

## Versão Dezembro de 2024

**3 commits** | Período: 23/12/2024 - 31/12/2024

### Manutenção
- cbcba5c chore: atualizar dependências
- ef9b7e6 chore: atualizar configuração do ESLint para regras de espaçamento de funções e verificar código
- c2ee29b chore: atualizar dependências, configuração do eslint e prettier e verificar código

---

## Versão Novembro de 2024

**14 commits** | Período: 08/11/2024 - 27/11/2024

### Funcionalidades
- b493ed9 feat: remover configuração do Airbnb e atualizar ESLint para versão mais recente com configuração plana e regras customizadas
- 89d445e feat: inicialização do husky

### Correções
- 4435bfd fix: Remover configuração do SonarJS para resolver problemas de compatibilidade do ESLint

### Manutenção
- a36c300 chore: atualizar dependências para versões mais recentes
- 8456b52 chore: atualizar package-lock e verificar código
- 8b01781 chore: atualizar dependências
- c96dc5b chore: atualizar configuração do eslint
- fd016ff chore: atualizar configuração do Next.js para remover comentários na compilação de produção
- 5c2c9b8 chore: atualizar itens da barra lateral, layout do dashboard e melhorias de estilo
- 2e61794 chore: refatorar código e atualizar componentes Shadcn
- 2a63756 chore: atualizar dependências, refatorar código da barra lateral e atualizar componentes Shadcn

### Outros
- f449f53 Merge pull request #3 from arhamkhnz/chore/eslint-config-update
- b0c8a55 Merge branch 'main' into chore/eslint-config-update
- 599456f Merge pull request #2 from arhamkhnz/chore/eslint-config-update

---

## Versão Outubro de 2024

**7 commits** | Período: 11/10/2024 - 25/10/2024

### Funcionalidades
- 69076b4 feat: adicionar componente de barra lateral shadcn, atualizar para estilo new-york, atualizar dependências e remover barra lateral customizada

### Manutenção
- 8d3d385 chore: limpeza de código
- 192f4bb chore: atualizar versão
- b70404e chore: atualizar readme
- dd5739e chore: atualizar imagem de pré-visualização do dashboard
- f8aba09 chore: atualizar dependências
- 479db3a chore: atualizar dependências, componentes de interface e configuração do app

---

## Versão Agosto de 2024

**15 commits** | Período: 01/08/2024 - 24/08/2024

### Correções
- 17e3d10 fix: melhorar responsividade dos títulos da barra lateral no estado recolhido
- bf885ae fix: redirecionamento da rota raiz

### Manutenção
- 033af77 chore: atualizar configuração do ESLint e aplicar correções de verificação
- 1a01589 chore: atualizar marca
- 7faee33 chore: atualizar imagem de pré-visualização do dashboard e README
- f9c7d7c chore: refatorar código e corrigir problemas de estilo da barra lateral
- 9a64a2f chore: corrigir redirecionamento da rota raiz
- f4634cc chore: refatoração de código e ajustes menores de estilo
- c6974dd chore: remover workflow do github
- 82fae83 chore: alterações menores
- 1c0e45d chore: adicionar mídia do projeto

### Outros
- e27fec7 Atualizar README.md
- a7473eb Atualizar README.md
- 9850627 commit inicial
- c70ba81 Commit inicial

---
