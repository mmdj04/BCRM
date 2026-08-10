# BCRM — Documentação de Precificação

## Visão Geral

O BCRM é uma plataforma SaaS que utiliza **Supabase** como infraestrutura backend,
**Stripe** para processamento de pagamentos e **Vercel** para hospedagem do frontend.

## Fórmula de Cálculo

```
Plano:     Preço = Supabase_USD × 6,20 × 6
Compute:   Preço = Supabase_USD × 6,20 × 3
Câmbio:    USD 1 = BRL 6,20 (fixo)
```

---

## Planos

| Plano | Supabase USD | Fórmula | Preço Mensal |
|-------|-------------|---------|-------------|
| **Pro** | $25 | 25 × 6,20 × 6 | **R$ 930,00** |
| **Enterprise** | $599 | 599 × 6,20 × 6 | **R$ 22.282,80** |

### Diferenças entre Planos

| Recurso | Pro | Enterprise |
|---------|-----|------------|
| Disco por projeto | 8 GB | 8 GB |
| Egress mensal | 250 GB | 250 GB |
| Egress em cache | 250 GB | 250 GB |
| Armazenamento | 100 GB | 100 GB |
| MAUs | 100.000 | 100.000 |
| Edge Functions | 2 milhões | 2 milhões |
| Conexões Realtime | 500 | 500 |
| Mensagens Realtime | 5 milhões | 5 milhões |
| Transformações de imagem | 100 | 100 |
| SAML/SSO | 50 | 50 |
| Backups automáticos | 7 dias | 14 dias |
| Retenção de logs | 7 dias | 28 dias |
| **SOC2 + ISO 27001** | — | ✅ |
| **HIPAA** | — | Adicional |
| **SSO Dashboard** | — | ✅ |
| **Platform Audit Logs** | — | ✅ |
| **AWS PrivateLink** | — | ✅ |
| **Suporte SLA** | — | ✅ |
| **Access Roles** | Owner, Admin, Dev | + Read-only, Predefined |

---

## Compute (Preço Mensal Adicional)

Fórmula: **Supabase_USD × 6,20 × 3**

| Tier | Supabase USD | Fórmula | Preço BCRM | CPU | RAM | Conex. Diretas | Pooler | Dedicado |
|------|-------------|---------|------------|-----|-----|----------------|--------|----------|
| Micro | $10 | 10 × 6,20 × 3 | **R$ 186,00** | 2 núcleos ARM | 1 GB | 60 | 200 | Não |
| Pequeno | $15 | 15 × 6,20 × 3 | **R$ 279,00** | 2 núcleos ARM | 2 GB | 90 | 400 | Não |
| Médio | $60 | 60 × 6,20 × 3 | **R$ 1.116,00** | 2 núcleos ARM | 4 GB | 120 | 600 | Não |
| Grande | $110 | 110 × 6,20 × 3 | **R$ 2.046,00** | 2 núcleos ARM | 8 GB | 160 | 800 | Sim |
| XL | $210 | 210 × 6,20 × 3 | **R$ 3.906,00** | 4 núcleos ARM | 16 GB | 240 | 1.000 | Sim |
| 2XL | $410 | 410 × 6,20 × 3 | **R$ 7.626,00** | 8 núcleos ARM | 32 GB | 380 | 1.500 | Sim |
| 4XL | $960 | 960 × 6,20 × 3 | **R$ 17.856,00** | 16 núcleos ARM | 64 GB | 480 | 3.000 | Sim |
| 8XL | $1.870 | 1.870 × 6,20 × 3 | **R$ 34.782,00** | 32 núcleos ARM | 128 GB | 490 | 6.000 | Sim |
| 12XL | $2.800 | 2.800 × 6,20 × 3 | **R$ 51.720,00** | 48 núcleos ARM | 192 GB | 500 | 9.000 | Sim |
| 16XL | $3.730 | 3.730 × 6,20 × 3 | **R$ 69.078,00** | 64 núcleos ARM | 256 GB | 500 | 12.000 | Sim |

---

## Total Mensal por Plano + Compute

### Pro (R$ 930/mês base)

| Compute | Preço Total | Custo Real | Lucro | Margem |
|---------|-----------|-----------|-------|--------|
| Micro | R$ 1.116 | R$ 217 | R$ 899 | 81% |
| Pequeno | R$ 1.209 | R$ 248 | R$ 961 | 79% |
| Médio | R$ 2.046 | R$ 527 | R$ 1.519 | 74% |
| Grande | R$ 2.976 | R$ 837 | R$ 2.139 | 72% |
| XL | R$ 4.836 | R$ 1.457 | R$ 3.379 | 70% |
| 2XL | R$ 8.556 | R$ 2.697 | R$ 5.859 | 68% |
| 4XL | R$ 18.786 | R$ 6.107 | R$ 12.679 | 67% |
| 8XL | R$ 35.712 | R$ 11.749 | R$ 23.963 | 67% |
| 12XL | R$ 53.010 | R$ 17.515 | R$ 35.495 | 67% |
| 16XL | R$ 70.308 | R$ 23.281 | R$ 47.027 | 67% |

### Enterprise (R$ 22.282,80/mês base)

| Compute | Preço Total | Custo Real | Lucro | Margem |
|---------|-----------|-----------|-------|--------|
| Micro | R$ 22.469 | R$ 3.776 | R$ 18.693 | 83% |
| Pequeno | R$ 22.562 | R$ 3.807 | R$ 18.755 | 83% |
| Médio | R$ 23.399 | R$ 4.086 | R$ 19.313 | 83% |
| Grande | R$ 24.329 | R$ 4.396 | R$ 19.933 | 82% |
| XL | R$ 26.189 | R$ 5.016 | R$ 21.173 | 81% |
| 2XL | R$ 29.909 | R$ 6.256 | R$ 23.653 | 79% |
| 4XL | R$ 40.139 | R$ 9.666 | R$ 30.473 | 76% |
| 8XL | R$ 57.065 | R$ 15.308 | R$ 41.757 | 73% |
| 12XL | R$ 74.363 | R$ 21.074 | R$ 53.289 | 72% |
| 16XL | R$ 91.661 | R$ 26.840 | R$ 64.821 | 71% |

---

## Taxas de Sobreuso (Uso Extra)

Modelo: **Soft Cap** — o cliente pode exceder o limite e será cobrado no final do mês via **Stripe Metered Billing**.

| Recurso | Supabase USD | Preço BCRM (×3) |
|---------|-------------|-----------------|
| Disco do banco | $0,125/GB | **R$ 2,33/GB** |
| Egress | $0,09/GB | **R$ 1,67/GB** |
| Egress em cache | $0,03/GB | **R$ 0,56/GB** |
| Armazenamento | $0,0213/GB | **R$ 0,40/GB** |
| MAUs | $0,00325/MAU | **R$ 0,06/MAU** |
| Edge Functions | $2/1M | **R$ 37,20/1M** |
| Realtime conexões | $10/1000 | **R$ 186/1000** |
| Realtime mensagens | $2,50/Milhão | **R$ 46,50/Milhão** |
| Transformações imagem | $5/1000 | **R$ 93/1000** |
| SAML/SSO | $0,015/MAU | **R$ 0,28/MAU** |

---

## Adicionais (Add-ons)

### PITR Backup — Recuperação Ponto a Ponto

Fonte: [supabase.com/docs/guides/platform/backups](https://supabase.com/docs/guides/platform/backups)

Fórmula: **Supabase_USD × 6,20 × 6** (mesmo multiplicador dos planos)

| Retenção | Supabase USD | Fórmula | Preço BCRM |
|----------|-------------|---------|------------|
| 7 dias | $100/mês | 100 × 6,20 × 6 | **R$ 3.720,00** |
| 14 dias | $200/mês | 200 × 6,20 × 6 | **R$ 7.440,00** |
| 28 dias | $400/mês | 400 × 6,20 × 6 | **R$ 14.880,00** |

> **Nota:** O PITR substitui os backups diários. Pro, Team e Enterprise podem adicionar PITR.
> Requer pelo menos compute Small para funcionar corretamente.

---

## Fluxo de Cobrança

1. **Assinatura Inicial** — Cliente seleciona plano + compute, Stripe cobra mensalmente
2. **Monitoramento** — BCRM monitora uso via Supabase Management API
3. **Sobreuso** — Uso excedente registrado via Stripe Usage Records no fim do ciclo
4. **Spend Cap** — Supabase spend cap ativado automaticamente

---

## Constantes no Código

```typescript
// data.ts
export const EXCHANGE_RATE = 6.2;
export const PLAN_MULTIPLIER = 6;
export const COMPUTE_MULTIPLIER = 3;

export function planPrice(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * PLAN_MULTIPLIER * 100) / 100;
}

export function computePrice(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * COMPUTE_MULTIPLIER * 100) / 100;
}

// billing.ts / checkout/route.ts
function planAmount(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * PLAN_MULTIPLIER);
}

function computeAmount(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * COMPUTE_MULTIPLIER);
}
```

---

*Atualizado em: 2026-08-09 | USD 1 = BRL 6,20 | Planos ×6 | Compute ×3*
