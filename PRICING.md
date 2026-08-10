# BCRM - Documentacao de Precificacao

## Visao Geral

O BCRM utiliza o Supabase como infraestrutura backend e o Stripe para processamento de pagamentos.
Os precos sao calculados com base nos custos do Supabase, aplicando-se markup de 2.5x sobre o custo real,
utilizando taxa de cambio fixa de **USD 1 = BRL 6,20**.

---

## Constantes de Calculo

```
EXCHANGE_RATE = 6.20 (USD para BRL)
MARKUP = 2.5 (250% sobre o custo do Supabase)
```

### Formula

```
Preco BCRM = Supabase_USD x EXCHANGE_RATE x MARKUP
```

Exemplo: Compute Micro = $10 x 6,20 x 2,5 = **R$ 155,00**

---

## Planos BCRM

| Plano | Preco Mensal | Supabase Base | Projeto Supabase |
|-------|-------------|---------------|------------------|
| Inicial | R$ 899,90 | $25 (~R$ 155) | Pro |
| Pro | R$ 2.299,90 | $25 (~R$ 155) | Pro |
| Equipe | R$ 8.999,90 | $599 (~R$ 3.713) | Team |

---

## Compute (Preco Mensal Adicional)

O preco do compute e: **(Supabase_USD x 6,20 x 2,5) + Preco do Plano Base**

| Tier | Supabase USD | Supabase R$ | Markup 2.5x | CPU | RAM | Conexoes Diretas | Pooler | Dedicado |
|------|-------------|-------------|-------------|-----|-----|-----------------|--------|----------|
| Micro | $10 | R$ 62,00 | R$ 155,00 | 2 nucleos ARM | 1 GB | 60 | 200 | Nao |
| Pequeno | $15 | R$ 93,00 | R$ 232,50 | 2 nucleos ARM | 2 GB | 90 | 400 | Nao |
| Medio | $60 | R$ 372,00 | R$ 930,00 | 2 nucleos ARM | 4 GB | 120 | 600 | Nao |
| Grande | $110 | R$ 682,00 | R$ 1.705,00 | 2 nucleos ARM | 8 GB | 160 | 800 | Sim |
| XL | $210 | R$ 1.302,00 | R$ 3.255,00 | 4 nucleos ARM | 16 GB | 240 | 1.000 | Sim |
| 2XL | $410 | R$ 2.542,00 | R$ 6.355,00 | 8 nucleos ARM | 32 GB | 380 | 1.500 | Sim |
| 4XL | $960 | R$ 5.952,00 | R$ 14.880,00 | 16 nucleos ARM | 64 GB | 480 | 3.000 | Sim |
| 8XL | $1.870 | R$ 11.594,00 | R$ 28.985,00 | 32 nucleos ARM | 128 GB | 490 | 6.000 | Sim |
| 12XL | $2.800 | R$ 17.360,00 | R$ 43.400,00 | 48 nucleos ARM | 192 GB | 500 | 9.000 | Sim |
| 16XL | $3.730 | R$ 23.126,00 | R$ 57.815,00 | 64 nucleos ARM | 256 GB | 500 | 12.000 | Sim |

### Total Mensal por Plano + Compute

| Tier | Total Inicial | Total Pro | Total Equipe |
|------|--------------|-----------|--------------|
| Micro | R$ 1.054,90 | R$ 2.454,90 | R$ 9.154,90 |
| Pequeno | R$ 1.132,40 | R$ 2.532,40 | R$ 9.232,40 |
| Medio | R$ 1.829,90 | R$ 3.229,90 | R$ 9.929,90 |
| Grande | R$ 2.604,90 | R$ 4.004,90 | R$ 10.704,90 |
| XL | R$ 4.154,90 | R$ 5.554,90 | R$ 12.254,90 |
| 2XL | R$ 7.254,90 | R$ 8.654,90 | R$ 15.354,90 |
| 4XL | R$ 15.779,90 | R$ 17.179,90 | R$ 23.879,90 |
| 8XL | R$ 29.884,90 | R$ 31.284,90 | R$ 37.984,90 |
| 12XL | R$ 44.299,90 | R$ 45.699,90 | R$ 52.399,90 |
| 16XL | R$ 58.714,90 | R$ 60.114,90 | R$ 66.814,90 |

---

## Limites por Plano

Cada plano inclui quantidades especificas de cada recurso. Se o cliente exceder o limite,
sera cobrado valor adicional (sobreusa) conforme a tabela abaixo.

| Recurso | Inicial | Pro | Equipe |
|---------|---------|-----|--------|
| Disco do banco | 8 GB | 50 GB | 200 GB |
| Egress (banda) | 250 GB | 1 TB | 5 TB |
| Egress em cache | 250 GB | 512 GB | 2 TB |
| Armazenamento (Storage) | 100 GB | 512 GB | 2 TB |
| MAUs (usuarios ativos) | 10.000 | 100.000 | 500.000 |
| Edge Functions (invocacoes) | 500K | 5M | 20M |
| Realtime (conexoes simultaneas) | 100 | 500 | 2.000 |
| Realtime (mensagens) | 1M | 5M | 25M |
| Transformacoes de imagem | 100 | 1.000 | 5.000 |
| SAML/SSO (usuarios) | - | 50 | 200 |
| Backup | 7 dias | 7 dias | 14 dias |
| Suporte | E-mail | Prioritario | SLA + Designado |

---

## Taxas de Sobreusa (Uso Extra)

Modelo: **Soft Cap** - o cliente pode exceder o limite e e cobrado no final do mes via Stripe invoice.

Taxas calculadas com: **Supabase_USD x 6,20 x 2,5**

| Recurso | Supabase USD | Supabase R$ | x 2,5 | BCRM Cobra |
|---------|-------------|-------------|-------|------------|
| Disco do banco | $0,125/GB | R$ 0,775/GB | x 2,5 | **R$ 1,94/GB** |
| Egress | $0,09/GB | R$ 0,558/GB | x 2,5 | **R$ 1,40/GB** |
| Egress em cache | $0,03/GB | R$ 0,186/GB | x 2,5 | **R$ 0,47/GB** |
| Armazenamento | $0,0213/GB | R$ 0,132/GB | x 2,5 | **R$ 0,33/GB** |
| MAUs | $0,00325/MAU | R$ 0,020/MAU | x 2,5 | **R$ 0,05/MAU** |
| Edge Functions | $2/1M | R$ 12,40/1M | x 2,5 | **R$ 31,00/1M** |
| Realtime conexoes | $10/1000 | R$ 62,00/1000 | x 2,5 | **R$ 155,00/1000** |
| Realtime mensagens | $2,50/Milhao | R$ 15,50/Milhao | x 2,5 | **R$ 38,75/Milhao** |
| Transformacoes imagem | $5/1000 | R$ 31,00/1000 | x 2,5 | **R$ 77,50/1000** |
| SAML/SSO | $0,015/MAU | R$ 0,093/MAU | x 2,5 | **R$ 0,23/MAU** |

### Exemplo de Cobranca de Sobreusa

**Cliente no Plano Pro (R$ 2.299,90) com Compute Medio (R$ 930,00):**

- Total base: R$ 3.229,90/mes
- Usou 1,5 TB de egress (limite: 1 TB)
- Excedeu: 500 GB
- Cobranca: 500 GB x R$ 1,40 = **R$ 700,00**
- **Total final: R$ 3.929,90**

---

## Fluxo de Cobranca

### 1. Assinatura Inicial
- Cliente seleciona plano + compute
- Stripe cobra: **Plano Base + Compute** como assinatura mensal
- Projeto e criado na organizacao Supabase

### 2. Monitoramento de Uso
- BCRM monitora uso por projeto via Supabase Management API
- Alertas enviados aos 80% do limite (e-mail + WhatsApp)

### 3. Cobranca de Sobreusa
- No final do ciclo, uso excedente e calculado
- Stripe gera invoice separado para a sobreusa
- Cliente recebe notificacao com detalhes do uso

### 4. Spend Cap
- Supabase spend cap ativado automaticamente
- Protege a organizacao de custos inesperados
- Se atingido, projeto e pausado (nao bloqueado)

---

## Protecao da Organizacao

O markup de 2.5x sobre o custo do Supabase garante:

1. **Cobertura do custo real** do Supabase
2. **Margem de seguranca** para flutuacoes de cambio
3. **Lucro operacional** para manutencao da plataforma
4. **Protecao contra uso abusivo** de clientes individuais

### Exemplo de Protecao

Se o Cliente A usa 5 TB de egress e o Cliente B usa 100 GB:
- Total Supabase: 5,1 TB x $0,09 = $459 (~R$ 2.845)
- Total BCRM cobrado: 5,1 TB x R$ 1,40 = R$ 7.140
- **Margem: R$ 4.295 (151% de lucro sobre o custo)**

---

## Arquivos Relacionados

| Arquivo | Descricao |
|---------|-----------|
| `src/app/(main)/dashboard/billing/_components/data.ts` | Definicoes de planos, limites, taxas de sobreusa e compute |
| `src/lib/stripe/billing.ts` | Helpers de billing do Stripe (PLAN_AMOUNTS, COMPUTE_AMOUNTS) |
| `src/app/api/stripe/checkout/route.ts` | Rota de checkout do Stripe |
| `src/app/(main)/dashboard/billing/_components/fine-tune.tsx` | Tabela de selecao de compute |
| `src/app/(main)/dashboard/billing/_components/pricing-cards.tsx` | Cards de planos com compute expansivel |
| `src/app/(main)/dashboard/billing/_components/change-plan-dialog.tsx` | Dialog de alteracao de plano com tabela de compute |

---

## Constantes no Codigo

```typescript
// data.ts
export const EXCHANGE_RATE = 6.20;
export const MARKUP = 2.5;

export function supabaseToBrl(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100) / 100;
}

// billing.ts
const EXCHANGE_RATE = 6.20;
const MARKUP = 2.5;

function supabaseToBrlCents(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100);
}

// checkout/route.ts
const EXCHANGE_RATE = 6.20;
const MARKUP = 2.5;

function supabaseToBrlCents(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100);
}
```

---

*Documento atualizado em: 2026-08-09*
*Cambio: USD 1 = BRL 6,20 | Markup: 2.5x*
