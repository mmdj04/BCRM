# Contribuindo para o BCRM

Obrigado pelo seu interesse em contribuir para o BCRM! Este documento fornece diretrizes e informações sobre como contribuir para este projeto.

## Sumário

- [Código de Conduta](#código-de-conduta)
- [Primeiros Passos](#primeiros-passos)
- [Configuração do Desenvolvimento](#configuração-do-desenvolvimento)
- [Como Contribuir](#como-contribuir)
- [Processo de Pull Request](#processo-de-pull-request)
- [Diretrizes de Estilo](#diretrizes-de-estilo)
- [Mensagens de Commit](#mensagens-de-commit)
- [Reportando Problemas](#reportando-problemas)

## Código de Conduta

Este projeto e todos que participam dele são regidos pelo nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você deve cumprir este código. Por favor, reporte comportamentos inaceitáveis para [conduct@bcrm.dev](mailto:conduct@bcrm.dev).

## Primeiros Passos

1. Faça o fork do repositório
2. Clone o seu fork
3. Crie uma branch para a funcionalidade
4. Faça suas alterações
5. Envie um pull request

## Configuração do Desenvolvimento

### Pré-requisitos

- Node.js 20+ (recomendado: use [nvm](https://github.com/nvm-sh/nvm))
- npm 10+
- Git
- Conta no Supabase (plano gratuito funciona)

### Instalação

```bash
# Clone o seu fork
git clone https://github.com/YOUR_USERNAME/BCRM.git
cd BCRM

# Instale as dependências
npm install

# Copie as variáveis de ambiente
cp .env.local.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

### Variáveis de Ambiente

Obtenha suas credenciais do Supabase em https://supabase.com/dashboard → Project Settings → API:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SECRET_KEY=your-service-role-key
```

## Como Contribuir

### Reportando Bugs

Antes de criar um reporte de bug, por favor verifique as [issues existentes](https://github.com/mmdj04/BCRM/issues) para evitar duplicatas.

Ao criar um reporte de bug, inclua:

- Um título claro e descritivo
- Passos para reproduzir o problema
- Comportamento esperado vs comportamento atual
- Capturas de tela, se aplicável
- Detalhes do ambiente

### Sugerindo Funcionalidades

Solicitações de funcionalidades são bem-vindas. Por favor, forneça:

- Uma descrição clara da funcionalidade
- Caso de uso / motivação
- Qualquer mockup ou exemplo

### Contribuindo com Código

1. Encontre uma issue marcada como `good first issue` ou `help wanted`
2. Comente na issue para que outros saibam que você está trabalhando nela
3. Crie uma branch a partir de `main`
4. Faça suas alterações
5. Escreva ou atualize testes, se aplicável
6. Envie um pull request

## Processo de Pull Request

1. Atualize o README.md se suas alterações afetarem a documentação
2. Certifique-se de que seu código segue as diretrizes de estilo do projeto
3. Vincule a issue relacionada na descrição do seu PR
4. Solicite uma revisão dos mantenedores
5. Responda a qualquer feedback prontamente

### Formato do Título do PR

Use o formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new dashboard widget
fix: resolve login issue on mobile
docs: update installation guide
refactor: improve auth flow
```

## Diretrizes de Estilo

### TypeScript

- Use o modo estrito
- Evite tipos `any`
- Use anotações de tipo adequadas
- Prefira interfaces em vez de types para formas de objetos

### React

- Use componentes funcionais com hooks
- Mantenha os componentes pequenos e focados
- Use tipos de prop adequados
- Siga o padrão de co-localização (componentes próximos às suas rotas)

### CSS/Tailwind

- Use nomes de classe semânticos
- Siga o sistema de design existente
- Use tokens do tema para cores
- Garanta design responsivo

### Estrutura de Arquivos

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/
│   │   ├── auth/          # Páginas de autenticação
│   │   └── dashboard/     # Páginas do dashboard
│   └── layout.tsx         # Layout raiz
├── components/             # Componentes compartilhados
│   └── ui/                # Componentes shadcn/ui
├── lib/                    # Utilitários e helpers
│   └── supabase/          # Configuração do cliente Supabase
├── hooks/                  # Hooks React personalizados
└── styles/                 # Estilos globais
```

## Mensagens de Commit

Siga a especificação [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve sidebar collapse issue
docs: add API documentation
style: format code with biome
refactor: extract auth logic
test: add login form tests
chore: update dependencies
```

### Tipos de Commit

- **feat**: Uma nova funcionalidade
- **fix**: Uma correção de bug
- **docs**: Alterações apenas na documentação
- **style**: Alterações no estilo do código (formatação, etc.)
- **refactor**: Refatoração do código
- **test**: Adicionando ou atualizando testes
- **chore**: Tarefas de manutenção

## Reportando Problemas

Use o [issue tracker](https://github.com/mmdj04/BCRM/issues) para reportar bugs ou solicitar funcionalidades.

Ao reportar vulnerabilidades de segurança, por favor siga nossa [Política de Segurança](SECURITY.md).

## Dúvidas?

Se você tem dúvidas sobre como contribuir, fique à vontade para:

- Abrir uma [discussão](https://github.com/mmdj04/BCRM/discussions)
- Entrar em contato no [Discord](https://discord.gg/bcrm)

Obrigado por contribuir para o BCRM!
