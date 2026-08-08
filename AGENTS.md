# AGENTS.md

## Visão geral do projeto

Studio Admin é um painel de administrador responsivo construído com Next.js 16, React 19, TypeScript, Tailwind CSS v4 e shadcn/ui.

Este repositório usa o estilo `radix-nova` do shadcn. O CLI do shadcn reporta `base: "radix"`, que se refere ao Radix UI. Sempre inspecione os componentes locais em `src/components/ui/` porque wrappers individuais podem usar primitivos diferentes.

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: SEMPRE leia a documentação antes de programar

Antes de qualquer trabalho com Next.js, encontre e leia a documentação relevante em `node_modules/next/dist/docs/`. Seus dados de treinamento estão desatualizados — a documentação é a fonte da verdade.

<!-- END:nextjs-agent-rules -->

## Habilidade shadcn

Use a habilidade shadcn para todo trabalho envolvendo componentes shadcn/ui, estilização, composição, registros, presets ou `components.json`.

Se a habilidade não estiver disponível, instale-a com:

```bash
npx skills add shadcn/ui
```

A habilidade contém as regras de componentes, estilização, composição, acessibilidade e CLI. Não duplique essas regras aqui. Sempre inspecione a fonte do componente local antes de usá-la.

Não modifique arquivos dentro de `src/components/ui/` ou `src/components/calendar/`. Mantenha esses componentes intactos e aplique estilização ou personalização onde são usados.

## Configuração

Este projeto usa npm.

```bash
npm install
npm run dev
```

Comandos disponíveis:

```bash
npm run build
npm run lint
npm run format
npm run check
npm run check:fix
npm run generate:presets
```

Atualmente não há comando de teste automatizado. Execute build, lint, check ou outros comandos de validação apenas quando o usuário solicitar explicitamente essa validação.

## Estrutura baseada em co-localização

Mantenha o código da funcionalidade perto da rota que a possui.

- Rotas do painel: `src/app/(main)/dashboard/<screen>/page.tsx`
- Componentes, dados e schemas específicos da tela: `src/app/(main)/dashboard/<screen>/_components/`
- Componentes compartilhados do painel: `src/app/(main)/dashboard/_components/`
- Componentes compartilhados da aplicação: `src/components/`
- Componentes shadcn locais: `src/components/ui/`
- Hooks e utilitários compartilhados: `src/hooks/` e `src/lib/`
- Presets de tema: `src/styles/presets/`

Mantenha um componente dentro de sua rota até que ele seja reutilizado por outra funcionalidade. Não mova código específico de tela para um diretório compartilhado preventivamente.

## Criando ou estendendo uma tela

1. Inspecione a tela atual mais próxima antes de escrever código. Finance, Infrastructure, CRM e Analytics são referências úteis. Não use rotas sob `(legacy)` como referências para novas telas, a menos que esteja mantendo uma rota legada.
2. Ao reproduzir uma interface a partir de uma captura de tela ou imagem, siga sua direção visual de perto, incluindo layout, hierarquia, espaçamento, estrutura de componentes e detalhes importantes. Implemente-a com os componentes existentes do projeto e tokens semânticos de tema em vez de copiar valores de cor brutos. Se o design precisar de uma cor que não está disponível através dos tokens de tema existentes, ou o usuário solicitar explicitamente uma cor fora do tema, use uma cor nomeada da paleta padrão do Tailwind. Não use valores hexadecimais, RGB, HSL ou OKLCH arbitrários.
3. Reutilize o shell existente do painel, componentes locais, controles de layout e tokens de tema.
4. Divida cada nova página em componentes focados dentro do diretório `_components/` da rota. Mantenha `page.tsx` pequeno e focado em compor essas partes.
5. Mantenha `page.tsx` como um Server Component por padrão. Mova código interativo ou dependente do navegador para um Client Component dedicado.
6. Adicione a tela a `src/navigation/sidebar/sidebar-items.ts` quando ela deve aparecer na navegação do painel.
7. Defina a hierarquia de informações antes de escolher os widgets. Deixe o conteúdo determinar a estrutura da página.
8. Mantenha o ritmo visual estabelecido onde se adequar: espaçamento compacto, hierarquia de tipografia clara, linhas de ação responsivas e grades que colapsam limpa em telas menores.
9. A seleção de widgets não é uma fórmula fixa. Experimente diferentes arranjos de cards, linhas de recursos, medidores, gráficos, abas, estados vazios e ações, depois mantenha a versão que comunica o conteúdo claramente e se sente consistente com o projeto.
10. Combine com telas próximas em densidade de cards, bordas, raio, espaçamento, largura do conteúdo e comportamento responsivo.
11. Use tokens semânticos de tema para que novas telas funcionem com modo claro, modo escuro e os presets de tema existentes.
12. Lide com estados relevantes de carregamento, vazio, erro, desabilitado e transbordamento.
13. Mantenha as telas acessíveis com HTML semântico, suporte a teclado, estados de foco visíveis, rótulos e atributos ARIA apropriados.

## Convenções de código

- O modo estrito do TypeScript está habilitado. Use tipos precisos e evite `any`.
- Use os aliases de importação `@/` existentes.
- Siga a configuração do Biome: aspas duplas, ponto e vírgula, indentação de dois espaços, importações ordenadas e largura de linha de 120 caracteres.
- Evite dependências desnecessárias.
- Mantenha as mudanças focadas e não refatore arquivos não relacionados.

## Contribuições

- Use prefixos de commit convencionais como `feat:`, `fix:`, `refactor:`, `docs:` e `chore:`.
- Inclua capturas de tela para novas telas e mudanças visuais materiais. Inclua estados de tema móvel e escuro quando relevante.
- Explique novos padrões reutilizáveis ou dependências no pull request.
- Siga `CONTRIBUTING.md` para o fluxo de trabalho de contribuição.

## Diacríticos Portugueses (CRÍTICO)

Ao escrever texto em português brasileiro, SEMPRE use diacríticos adequados:
- ç (cedilha): começar, ação, proteção, segurança, configuração
- á (a agudo): já, está, criar, preço, mensagem
- é (e agudo): é, também, você, próximo
- ê (e circunflexo): você, amanhã
- í (i agudo): iniciar, também, último
- ó (o agudo): também, último, pronto
- ú (u agudo): último, usuário
- ã (a til): também, manhã, começa
- õ (o til): também, não, são

NUNCA escreva português sem diacríticos. Exemplos:
- Errado: "Comecar", "voce", "tambem", "usuario", "seguranca"
- Certo: "Começar", "você", "também", "usuário", "segurança"

## Regras Importantes

### Git Push
- NUNCA faça push para GitHub a menos que o usuário solicite explicitamente
- Sempre espere a confirmação do usuário antes de `git push`

### Servidores MCP Configurados
- playwright: Automação de navegador para testes
- context7: Busca de documentação
- gh_grep: Busca de código no GitHub
- supabase: Gerenciamento de banco de dados
- stripe: Integração de pagamentos
- memory: Memória persistente entre sessões
- filesystem: Acesso a arquivos locais
- sqlite: Consultas a banco de dados local
- fetch: Requisições HTTP
- git: Operações Git
- github: API do GitHub (issues, PRs, repositórios, busca de código)

### Banco de Dados SQLite
- Localização: `/home/thematheusgemini123/bcrm-data.db`
- Usado para armazenar estado do projeto, memórias e resultados de análise
