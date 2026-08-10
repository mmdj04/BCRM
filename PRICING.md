# BCRM - Documentação de Precificação

## Visão Geral

O BCRM é uma plataforma SaaS que utiliza **Supabase** como infraestrutura backend,
**Stripe** para processamento de pagamentos e **Vercel** para hospedagem do frontend.

Os preços são calculados com base nos custos reais de cada serviço, aplicando-se
markup de **2,5x** sobre o custo do Supabase, com **taxa de câmbio fixa de USD 1 = BRL 6,20**,
e **acréscimo de 5%** sobre todos os valores para absorver as taxas do Stripe.

---

## Constantes de Cálculo

```
EXCHANGE_RATE = 6,20 (USD para BRL)
MARKUP = 2,5 (250% sobre o custo do Supabase)
STRIPE_FEE_RATE = 0,05 (5% para absorver taxas do Stripe)
```

### Fórmulas

```
Preço Supabase para BCRM = Supabase_USD × 6,20 × 2,5
Preço Final = Preço Supabase para BCRM × (1 + 0,05)
Sobreusa = (Supabase_USD × 6,20 × 2,5) × 1,05
```

---

## Taxas do Stripe (Absorvidas nos Preços)

| Taxa | Valor | Impacto |
|------|-------|---------|
| Transação cartão nacional | 3,99% + R$ 0,39 | ~4,2% da receita |
| Transação cartão internacional | +2% adicional | Variável |
| Stripe Billing (assinaturas) | 0,7% do volume | ~0,7% da receita |
| **Total absorvido** | **~5%** | **Incluído nos preços** |

---

## Custo do Vercel (Custo Operacional da Organização)

O Vercel é custo da organização BCRM, **não é repassado ao cliente**.

| Item | Plano Pro | Custo Mensal |
|------|-----------|--------------|
| Developer seat | $20/mês por dev | ~R$ 124/dev |
| Fast Data Transfer | 1TB incluído | R$ 0 (dentro do limite) |
| Edge Requests | 10M incluídos | R$ 0 (dentro do limite) |
| Functions | Uso incluído | R$ 0 (dentro do limite) |

**Exemplo**: Equipe de 5 devs = $100/mês (~R$ 620) — custo fixo da organização.

---

## Planos BCRM

| Plano | Preço Mensal | Custo Supabase | Markup | Margem Líquida |
|-------|-------------|----------------|--------|----------------|
| Inicial | R$ 944,90 | $25 (~R$ 155) | ~6,1x | 83,7% |
| Pro | R$ 2.414,90 | $25 (~R$ 155) | ~15,6x | 83,7% |
| Equipe | R$ 9.449,90 | $599 (~R$ 3.713) | ~2,5x | 83,7% |

---

## Compute (Preço Mensal Adicional)

Preço = **(Supabase_USD × 6,20 × 2,5) + Preço do Plano Base**

| Tier | Supabase USD | Supabase R$ | Markup 2,5x | CPU | RAM | Conexões Diretas | Pooler | Dedicado |
|------|-------------|-------------|-------------|-----|-----|-----------------|--------|----------|
| Micro | $10 | R$ 62,00 | R$ 155,00 | 2 núcleos ARM | 1 GB | 60 | 200 | Não |
| Pequeno | $15 | R$ 93,00 | R$ 232,50 | 2 núcleos ARM | 2 GB | 90 | 400 | Não |
| Médio | $60 | R$ 372,00 | R$ 930,00 | 2 núcleos ARM | 4 GB | 120 | 600 | Não |
| Grande | $110 | R$ 682,00 | R$ 1.705,00 | 2 núcleos ARM | 8 GB | 160 | 800 | Sim |
| XL | $210 | R$ 1.302,00 | R$ 3.255,00 | 4 núcleos ARM | 16 GB | 240 | 1.000 | Sim |
| 2XL | $410 | R$ 2.542,00 | R$ 6.355,00 | 8 núcleos ARM | 32 GB | 380 | 1.500 | Sim |
| 4XL | $960 | R$ 5.952,00 | R$ 14.880,00 | 16 núcleos ARM | 64 GB | 480 | 3.000 | Sim |
| 8XL | $1.870 | R$ 11.594,00 | R$ 28.985,00 | 32 núcleos ARM | 128 GB | 490 | 6.000 | Sim |
| 12XL | $2.800 | R$ 17.360,00 | R$ 43.400,00 | 48 núcleos ARM | 192 GB | 500 | 9.000 | Sim |
| 16XL | $3.730 | R$ 23.126,00 | R$ 57.815,00 | 64 núcleos ARM | 256 GB | 500 | 12.000 | Sim |

### Total Mensal por Plano + Compute

| Tier | Total Inicial | Total Pro | Total Equipe |
|------|--------------|-----------|--------------|
| Micro | R$ 1.099,90 | R$ 2.569,90 | R$ 9.604,90 |
| Pequeno | R$ 1.177,40 | R$ 2.647,40 | R$ 9.682,40 |
| Médio | R$ 1.874,90 | R$ 3.344,90 | R$ 10.379,90 |
| Grande | R$ 2.649,90 | R$ 4.119,90 | R$ 11.154,90 |
| XL | R$ 4.199,90 | R$ 5.669,90 | R$ 12.704,90 |
| 2XL | R$ 7.299,90 | R$ 8.769,90 | R$ 15.804,90 |
| 4XL | R$ 15.824,90 | R$ 17.294,90 | R$ 24.329,90 |
| 8XL | R$ 29.929,90 | R$ 31.399,90 | R$ 38.434,90 |
| 12XL | R$ 44.344,90 | R$ 45.814,90 | R$ 52.849,90 |
| 16XL | R$ 58.759,90 | R$ 60.229,90 | R$ 67.264,90 |

---

## Limites por Plano

Cada plano inclui quantidades específicas de cada recurso. Se o cliente exceder o limite,
será cobrado valor adicional (sobreusa) conforme a tabela abaixo.

| Recurso | Inicial | Pro | Equipe |
|---------|---------|-----|--------|
| Disco do banco | 8 GB | 50 GB | 200 GB |
| Egress (banda) | 250 GB | 1 TB | 5 TB |
| Egress em cache | 250 GB | 512 GB | 2 TB |
| Armazenamento (Storage) | 100 GB | 512 GB | 2 TB |
| MAUs (usuários ativos) | 10.000 | 100.000 | 500.000 |
| Edge Functions (invocações) | 500K | 5M | 20M |
| Realtime (conexões simultâneas) | 100 | 500 | 2.000 |
| Realtime (mensagens) | 1M | 5M | 25M |
| Transformações de imagem | 100 | 1.000 | 5.000 |
| SAML/SSO (usuários) | - | 50 | 200 |
| Backup | 7 dias | 7 dias | 14 dias |
| Suporte | E-mail | Prioritário | SLA + Designado |

---

## Taxas de Sobreusa (Uso Extra)

Modelo: **Soft Cap** — o cliente pode exceder o limite e será cobrado no final do mês
via **Stripe Metered Billing**.

Taxas calculadas com: **(Supabase_USD × 6,20 × 2,5) × 1,05 (Stripe fee)**

| Recurso | Supabase USD | Supabase R$ | × 2,5 | + 5% Stripe | BCRM Cobra |
|---------|-------------|-------------|-------|-------------|------------|
| Disco do banco | $0,125/GB | R$ 0,775/GB | R$ 1,94/GB | +R$ 0,10/GB | **R$ 2,04/GB** |
| Egress | $0,09/GB | R$ 0,558/GB | R$ 1,40/GB | +R$ 0,07/GB | **R$ 1,47/GB** |
| Egress em cache | $0,03/GB | R$ 0,186/GB | R$ 0,47/GB | +R$ 0,02/GB | **R$ 0,49/GB** |
| Armazenamento | $0,0213/GB | R$ 0,132/GB | R$ 0,33/GB | +R$ 0,02/GB | **R$ 0,35/GB** |
| MAUs | $0,00325/MAU | R$ 0,020/MAU | R$ 0,05/MAU | +R$ 0,003/MAU | **R$ 0,053/MAU** |
| Edge Functions | $2/1M | R$ 12,40/1M | R$ 31,00/1M | +R$ 1,55/1M | **R$ 32,55/1M** |
| Realtime conexões | $10/1000 | R$ 62,00/1000 | R$ 155,00/1000 | +R$ 7,75/1000 | **R$ 162,75/1000** |
| Realtime mensagens | $2,50/Milhão | R$ 15,50/Milhão | R$ 38,75/Milhão | +R$ 1,94/Milhão | **R$ 40,69/Milhão** |
| Transformações imagem | $5/1000 | R$ 31,00/1000 | R$ 77,50/1000 | +R$ 3,88/1000 | **R$ 81,38/1000** |
| SAML/SSO | $0,015/MAU | R$ 0,093/MAU | R$ 0,23/MAU | +R$ 0,01/MAU | **R$ 0,24/MAU** |

---

## Fluxo de Cobrança

### 1. Assinatura Inicial
- Cliente seleciona plano + compute
- Stripe cobra: **Plano Base + Compute** como assinatura mensal
- Projeto é criado na organização Supabase

### 2. Monitoramento de Uso
- BCRM monitora uso por projeto via Supabase Management API
- Alertas enviados aos 80% do limite (e-mail + WhatsApp)

### 3. Cobrança de Sobreusa (Stripe Metered Billing)
- No final do ciclo, uso excedente é registrado via **Stripe Usage Records**
- Stripe gera cobrança automática baseada no uso registrado
- Cliente recebe notificação com detalhes do uso

### 4. Spend Cap
- Supabase spend cap ativado automaticamente
- Protege a organização de custos inesperados
- Se atingido, projeto é pausado (não bloqueado)

---

## Proteção da Organização

### Markup de 2,5x
O markup sobre o custo do Supabase garante:
1. **Cobertura do custo real** do Supabase
2. **Margem de segurança** para flutuações de câmbio
3. **Lucro operacional** para manutenção da plataforma
4. **Proteção contra uso abusivo** de clientes individuais

### Acréscimo de 5% (Stripe Fees)
O acréscimo de 5% sobre todos os valores garante:
1. **Cobertura das taxas de transação** do Stripe (3,99% + R$ 0,39)
2. **Cobertura da taxa de Billing** do Stripe (0,7%)
3. **Margem de segurança** para variações nas taxas

### Exemplo de Proteção

Se o Cliente A usa 5 TB de egress e o Cliente B usa 100 GB:
- Total Supabase: 5,1 TB × $0,09 = $459 (~R$ 2.845)
- Total BCRM cobrado: 5,1 TB × R$ 1,47 = R$ 7.497
- **Margem: R$ 4.652 (163% de lucro sobre o custo)**

---

## Cálculo do Spread por Tipo de Item

### Plano Base (Assinatura Mensal)

| Plano | Receita Líquida (após Stripe) | Custo Supabase | Custo Vercel (rateado) | Lucro Bruto | Margem |
|-------|-------------------------------|----------------|------------------------|-------------|--------|
| Inicial | R$ 897,66 | R$ 155,00 | ~R$ 62,00 | R$ 680,66 | 75,8% |
| Pro | R$ 2.294,16 | R$ 155,00 | ~R$ 124,00 | R$ 2.015,16 | 83,7% |
| Equipe | R$ 8.977,41 | R$ 3.713,80 | ~R$ 248,00 | R$ 5.015,61 | 55,9% |

### Compute (Adicional Mensal)

| Tier | Markup 2,5x | Custo Supabase | Lucro Bruto | Margem |
|------|-------------|----------------|-------------|--------|
| Micro | R$ 155,00 | R$ 62,00 | R$ 93,00 | 60,0% |
| Pequeno | R$ 232,50 | R$ 93,00 | R$ 139,50 | 60,0% |
| Médio | R$ 930,00 | R$ 372,00 | R$ 558,00 | 60,0% |
| Grande | R$ 1.705,00 | R$ 682,00 | R$ 1.023,00 | 60,0% |
| XL | R$ 3.255,00 | R$ 1.302,00 | R$ 1.953,00 | 60,0% |
| 2XL | R$ 6.355,00 | R$ 2.542,00 | R$ 3.813,00 | 60,0% |
| 4XL | R$ 14.880,00 | R$ 5.952,00 | R$ 8.928,00 | 60,0% |
| 8XL | R$ 28.985,00 | R$ 11.594,00 | R$ 17.391,00 | 60,0% |
| 12XL | R$ 43.400,00 | R$ 17.360,00 | R$ 26.040,00 | 60,0% |
| 16XL | R$ 57.815,00 | R$ 23.126,00 | R$ 34.689,00 | 60,0% |

### Sobreusa (Uso Extra)

| Recurso | Preço BCRM | Custo Supabase | Lucro Bruto | Margem |
|---------|-----------|----------------|-------------|--------|
| Disco banco | R$ 2,04/GB | R$ 0,78/GB | R$ 1,26/GB | 61,8% |
| Egress | R$ 1,47/GB | R$ 0,56/GB | R$ 0,91/GB | 61,9% |
| Egress cache | R$ 0,49/GB | R$ 0,19/GB | R$ 0,30/GB | 61,2% |
| Armazenamento | R$ 0,35/GB | R$ 0,13/GB | R$ 0,22/GB | 62,9% |
| MAUs | R$ 0,053/MAU | R$ 0,020/MAU | R$ 0,033/MAU | 62,3% |
| Edge Functions | R$ 32,55/1M | R$ 12,40/1M | R$ 20,15/1M | 61,9% |
| Realtime conexões | R$ 162,75/1000 | R$ 62,00/1000 | R$ 100,75/1000 | 61,9% |
| Realtime mensagens | R$ 40,69/Milhão | R$ 15,50/Milhão | R$ 25,19/Milhão | 61,9% |
| Transformações imagem | R$ 81,38/1000 | R$ 31,00/1000 | R$ 50,38/1000 | 61,9% |
| SAML/SSO | R$ 0,24/MAU | R$ 0,093/MAU | R$ 0,147/MAU | 61,3% |

---

## Resumo de Margens

| Tipo de Item | Margem Líquida | Observação |
|-------------|----------------|------------|
| Plano Inicial | 75,8% | Maior margem por menor custo Supabase relativo |
| Plano Pro | 83,7% | Melhor margem — ideal para escalar |
| Plano Equipe | 55,9% | Menor margem — volume compensa |
| Compute (todos) | 60,0% | Fixo — markup puro sobre custo |
| Sobreusa (todos) | ~61,9% | Inclui absorção de 5% Stripe fee |
| **Margem Geral Ponderada** | **~72%** | **Média ponderada considerando mix de receita** |

---

## Custos Não Incluídos (Riscos)

| Custo | Supabase USD | Nota |
|-------|-------------|------|
| Disk IOPS (além de 3.000) | $0,024/IOPS | Pode variar por cliente |
| Disk Throughput (além de 125MB/s) | $0,095/MB/s | Pode variar por cliente |
| High Performance Disk | $0,195/GB | Alternativa ao General Purpose |
| MFA Telefonico | $75/proj + $10/proj adic. | Add-on opcional |
| Custom Domain | $10/dominio/mes | Add-on opcional |
| Log Drains | $60/dreno + $0,20/1M events | Add-on opcional |
| Database Branching | $0,01344/branch/hora | Add-on opcional |
| HIPAA (Equipe) | Adicional | Compliance |

---

## Arquivos Relacionados

| Arquivo | Descrição |
|---------|-----------|
| `src/app/(main)/dashboard/billing/_components/data.ts` | Definições de planos, limites, taxas de sobreusa e compute |
| `src/lib/stripe/billing.ts` | Helpers de billing do Stripe (PLAN_AMOUNTS, COMPUTE_AMOUNTS) |
| `src/app/api/stripe/checkout/route.ts` | Rota de checkout do Stripe |
| `src/app/(main)/dashboard/billing/_components/fine-tune.tsx` | Tabela de seleção de compute |
| `src/app/(main)/dashboard/billing/_components/pricing-cards.tsx` | Cards de planos com compute expansível |
| `src/app/(main)/dashboard/billing/_components/change-plan-dialog.tsx` | Diálogo de alteração de plano |

---

## Constantes no Código

```typescript
// data.ts
export const EXCHANGE_RATE = 6.2;
export const MARKUP = 2.5;
export const STRIPE_FEE_RATE = 0.05;

export function supabaseToBrl(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100) / 100;
}

export function overageWithStripe(basePrice: number): number {
  return Math.round(basePrice * (1 + STRIPE_FEE_RATE) * 100) / 100;
}

// billing.ts
const EXCHANGE_RATE = 6.2;
const MARKUP = 2.5;

function supabaseToBrlCents(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100);
}

// checkout/route.ts
const EXCHANGE_RATE = 6.2;
const MARKUP = 2.5;

function supabaseToBrlCents(usd: number): number {
  return Math.round(usd * EXCHANGE_RATE * MARKUP * 100);
}
```

---

*Documento atualizado em: 2026-08-09*
*Câmbio: USD 1 = BRL 6,20 | Markup: 2,5x | Stripe Fee: 5%*
