# Política de Segurança

## Versões Suportadas

| Versão | Suportada          |
| ------- | ------------------ |
| 2.2.x   | :white_check_mark: |
| < 2.2   | :x:                |

## Reportando uma Vulnerabilidade

Se você descobrir uma vulnerabilidade de segurança no BCRM, por favor envie um e-mail para [security@bcrm.dev](mailto:security@bcrm.dev). Todas as vulnerabilidades de segurança serão prontamente atendidas.

**Por favor, não reporte vulnerabilidades de segurança através de issues públicas no GitHub.**

### O que incluir

- Tipo de vulnerabilidade (ex: injeção SQL, XSS, bypass de autenticação)
- Caminhos completos dos arquivos-fonte relacionados à vulnerabilidade
- A localização do código-fonte afetado (tag/branch/commit ou URL direta)
- Qualquer configuração especial necessária para reproduzir o problema
- Instruções passo a passo para reproduzir o problema
- Prova de conceito ou código de exploit (se possível)
- Avaliação de impacto

### Cronograma de resposta

- **Confirmação**: Dentro de 48 horas
- **Avaliação inicial**: Dentro de 1 semana
- **Lançamento da correção**: Depende da gravidade

### Porto seguro

Nós apoiamos porto seguro para pesquisadores de segurança que:

- Fazem um esforço de boa fé para evitar violações de privacidade, destruição de dados ou interrupções
- Interagem apenas com contas que possuem ou com permissão explícita
- Não exploram uma vulnerabilidade além do necessário para confirmar sua existência
- Reportam vulnerabilidades prontamente e não as divulgam publicamente antes que uma correção esteja disponível

## Melhores Práticas de Segurança

### Variáveis de Ambiente

- Nunca faça commit de arquivos `.env` no controle de versão
- Use `.env.local` para desenvolvimento local
- Use variáveis de ambiente do Vercel para produção
- Renove as chaves do Supabase periodicamente

### Autenticação

- O Supabase Auth gerencia toda a autenticação
- Segurança Nível de Linha (RLS) está habilitada em todas as tabelas
- A chave de função de serviço é usada apenas no lado do servidor
- Tokens de sessão são atualizados via middleware

### Proteção de Dados

- Todos os dados do usuário são isolados via políticas RLS
- Dados sensíveis são criptografados em repouso no Supabase
- Nenhum dado sensível é armazenado em cookies ou localStorage
