# BCRM - Documentacao de Precificacao

## Visao Geral

O BCRM e uma plataforma SaaS que utiliza **Supabase** como infraestrutura backend,
**Stripe** para processamento de pagamentos e **Vercel** para hospedagem do frontend.

Os precos sao calculados com base nos custos reais do Supabase, aplicando-se
um **markup inteligente de 4x** sobre o custo (lucro = 4x o custo),
com reducao gradual para **2,5x** em valores muito altos (acima de R$ 50.000).
**Taxa de cambio fixa: USD 1 = BRL 6,20**.
**5% de acrescimo** para absorver as taxas do Stripe.

---

## Constantes de Calculo

```
EXCHANGE_RATE = 6,20 (USD para BRL)
STRIPE_FEE_RATE = 0,05 (5% para absorver taxas do Stripe)
COMPUTE_CREDIT_USD = 10 (credito mensal Supabase)
```

### Formula Inteligente

```
Se Custo BRL <= 5.000:  Preco = Custo x 5 / 0,95  (lucro = 4x)
Se Custo BRL >= 50.000: Preco = Custo x 3,5 / 0,95 (lucro = 2,5x)
Se 5.000 < Custo < 50.000: Interpolacao linear
```

---

## Taxas do Stripe (Absorvidas nos Precos)

| Taxa | Valor | Impacto |
|------|-------|---------|
| Transacao cartao nacional | 3,99% + R$ 0,39 | ~4,2% da receita |
| Transacao cartao internacional | +2% adicional | Variavel |
| Stripe Billing (assinaturas) | 0,7% do volume | ~0,7% da receita |
| **Total absorvido** | **~5%** | **Incluido nos precos** |

---

## Custo do Vercel (Custo Operacional da Organizacao)

O Vercel e custo da organizacao BCRM, **nao e repassado ao cliente**.

| Item | Plano Pro | Custo Mensal |
|------|-----------|--------------|
| Developer seat | $20/mes por dev | ~R$ 124/dev |
| Fast Data Transfer | 1TB incluido | R$ 0 (dentro do limite) |
| Edge Requests | 10M incluidos | R$ 0 (dentro do limite) |
| Functions | Uso incluido | R$ 0 (dentro do limite) |

**Exemplo**: Equipe de 5 devs = $100/mes (~R$ 620) — custo fixo da organizacao.

---

## Planos BCRM

| Plano | Preco Mensal | Custo Supabase | Credito Compute | Custo Liquido | Lucro | Margem |
|-------|-------------|----------------|-----------------|---------------|-------|--------|
| Pro | R$ 489,47 | $25 (~R$ 155) | -$10 (~R$ 62) | ~R$ 93 | ~R$ 396 | 81% |
| Enterprise | R$ 19.220 | $599 (~R$ 3.714) | -$10 (~R$ 62) | ~R$ 3.652 | ~R$ 15.568 | 81% |

### Detalhes por Plano

**Pro (R$ 489,47/mes)**
- 8 GB de disco por projeto
- 250 GB de egress mensal
- 250 GB de egress em cache
- 100 GB de armazenamento
- 100.000 MAUs
- 2M Edge Function invocations
- 500 conexoes Realtime simultaneas
- 5M mensagens Realtime
- 100 transformacoes de imagem
- 50 usuarios SAML/SSO
- Backups automaticos (7 dias)
- Logs retidos (7 dias)
- Suporte por e-mail
- Access Roles: Proprietario, Admin, Dev

**Enterprise (R$ 19.220/mes)**
- Tudo do Pro, mais:
- SOC2 + ISO 27001
- HIPAA (adicionais)
- SSO para Dashboard
- Platform Audit Logs
- AWS PrivateLink
- Backups (14 dias)
- Logs retidos (28 dias)
- Suporte prioritario com SLA
- Access Roles: + Read-only, Predefined
- Security Questionnaire Help

---

## Compute (Preco Mensal Adicional)

O Supabase fornece $10/mes em creditos compute (cobre 1 instancia Micro).
Instancias maiores cobram a diferenca. Preco BCRM = **Custo extra x 5 / 0,95**.

| Tier | Supabase USD | Custo Extra | Preco BCRM | CPU | RAM | Conex. Diretas | Pooler | Dedicado |
|------|-------------|-------------|------------|-----|-----|----------------|--------|----------|
| Micro | $10 | $0 (gratuito) | R$ 0,00 | 2 nucleos ARM | 1 GB | 60 | 200 | Nao |
| Pequeno | $15 | $5 | R$ 32,89 | 2 nucleos ARM | 2 GB | 90 | 400 | Nao |
| Medio | $60 | $50 | R$ 326,32 | 2 nucleos ARM | 4 GB | 120 | 600 | Nao |
| Grande | $110 | $100 | R$ 652,63 | 2 nucleos ARM | 8 GB | 160 | 800 | Sim |
| XL | $210 | $200 | R$ 1.305,26 | 4 nucleos ARM | 16 GB | 240 | 1.000 | Sim |
| 2XL | $410 | $400 | R$ 2.610,53 | 8 nucleos ARM | 32 GB | 380 | 1.500 | Sim |
| 4XL | $960 | $950 | R$ 6.263,16 | 16 nucleos ARM | 64 GB | 480 | 3.000 | Sim |
| 8XL | $1.870 | $1.860 | R$ 12.189,47 | 32 nucleos ARM | 128 GB | 490 | 6.000 | Sim |
| 12XL | $2.800 | $2.790 | R$ 18.347,37 | 48 nucleos ARM | 192 GB | 500 | 9.000 | Sim |
| 16XL | $3.730 | $3.720 | R$ 24.505,26 | 64 nucleos ARM | 256 GB | 500 | 12.000 | Sim |

---

## Total Mensal por Plano + Compute

### Pro

| Compute | Preco Total | Custo Total | Lucro | Margem |
|---------|-----------|-----------|-------|--------|
| Micro | R$ 489,47 | R$ 93 | R$ 396 | 81% |
| Pequeno | R$ 522,36 | R$ 124 | R$ 398 | 76% |
| Medio | R$ 815,79 | R$ 403 | R$ 412 | 51% |
| Grande | R$ 1.142,10 | R$ 713 | R$ 429 | 38% |
| XL | R$ 1.794,74 | R$ 1.333 | R$ 462 | 26% |
| 2XL | R$ 3.100,00 | R$ 2.573 | R$ 527 | 17% |
| 4XL | R$ 6.752,63 | R$ 5.983 | R$ 770 | 11% |
| 8XL | R$ 12.678,95 | R$ 11.625 | R$ 1.054 | 8% |
| 12XL | R$ 18.836,84 | R$ 17.391 | R$ 1.446 | 8% |
| 16XL | R$ 24.994,74 | R$ 23.157 | R$ 1.838 | 7% |

### Enterprise

| Compute | Preco Total | Custo Total | Lucro | Margem |
|---------|-----------|-----------|-------|--------|
| Micro | R$ 19.220 | R$ 3.652 | R$ 15.568 | 81% |
| Pequeno | R$ 19.253 | R$ 3.683 | R$ 15.570 | 81% |
| Medio | R$ 19.546 | R$ 3.962 | R$ 15.584 | 80% |
| Grande | R$ 19.873 | R$ 4.272 | R$ 15.601 | 79% |
| XL | R$ 20.525 | R$ 4.892 | R$ 15.633 | 76% |
| 2XL | R$ 21.831 | R$ 6.132 | R$ 15.699 | 72% |
| 4XL | R$ 25.483 | R$ 9.542 | R$ 15.941 | 63% |
| 8XL | R$ 31.409 | R$ 15.184 | R$ 16.225 | 52% |
| 12XL | R$ 37.567 | R$ 20.950 | R$ 16.617 | 44% |
| 16XL | R$ 43.725 | R$ 26.716 | R$ 17.009 | 39% |

---

## Limites por Plano (Supabase Real)

| Recurso | Pro | Enterprise |
|---------|-----|------------|
| Disco do banco | 8 GB | 8 GB |
| Egress (banda) | 250 GB | 250 GB |
| Egress em cache | 250 GB | 250 GB |
| Armazenamento (Storage) | 100 GB | 100 GB |
| MAUs (usuarios ativos) | 100.000 | 100.000 |
| Edge Functions (invocacoes) | 2 Milhoes | 2 Milhoes |
| Realtime (conexoes simultaneas) | 500 | 500 |
| Realtime (mensagens) | 5 Milhoes | 5 Milhoes |
| Transformacoes de imagem | 100 | 100 |
| SAML/SSO (usuarios) | 50 | 50 |
| Backup | 7 dias | 14 dias |
| Log retention | 7 dias | 28 dias |

> Nota: Pro e Enterprise tem os mesmos limites de uso.
> A diferenciacao e nas funcionalidades de plataforma (SOC2, ISO, HIPAA, SSO Dashboard, SLA, etc.)

---

## Taxas de Sobreusa (Uso Extra)

Modelo: **Soft Cap** — o cliente pode exceder o limite e sera cobrado no final do mes
via **Stripe Metered Billing**.

Taxas calculadas com: **(Supabase_USD x 6,20 x 5) / 0,95**

| Recurso | Supabase USD | Preco BCRM | Custo Supabase | Lucro |
|---------|-------------|------------|----------------|-------|
| Disco do banco | $0,125/GB | **R$ 4,10/GB** | R$ 0,78/GB | 81% |
| Egress | $0,09/GB | **R$ 2,95/GB** | R$ 0,56/GB | 81% |
| Egress em cache | $0,03/GB | **R$ 0,98/GB** | R$ 0,19/GB | 81% |
| Armazenamento | $0,0213/GB | **R$ 0,70/GB** | R$ 0,13/GB | 81% |
| MAUs | $0,00325/MAU | **R$ 0,106/MAU** | R$ 0,020/MAU | 81% |
| Edge Functions | $2/1M | **R$ 65,26/1M** | R$ 12,40/1M | 81% |
| Realtime conexoes | $10/1000 | **R$ 326,32/1000** | R$ 62,00/1000 | 81% |
| Realtime mensagens | $2,50/Milhao | **R$ 81,58/Milhao** | R$ 15,50/Milhao | 81% |
| Transformacoes imagem | $5/1000 | **R$ 163,16/1000** | R$ 31,00/1000 | 81% |
| SAML/SSO | $0,015/MAU | **R$ 0,49/MAU** | R$ 0,093/MAU | 81% |

---

## Fluxo de Cobranca

### 1. Assinatura Inicial
- Cliente seleciona plano + compute
- Stripe cobra: **Plano Base + Compute Extra** como assinatura mensal
- Projeto e criado na organizacao Supabase

### 2. Monitoramento de Uso
- BCRM monitora uso por projeto via Supabase Management API
- Alertas enviados aos 80% do limite (e-mail + WhatsApp)

### 3. Cobranca de Sobreusa (Stripe Metered Billing)
- No final do ciclo, uso excedente e registrado via **Stripe Usage Records**
- Stripe gera cobranca automatica baseada no uso registrado
- Cliente recebe notificacao com detalhes do uso

### 4. Spend Cap
- Supabase spend cap ativado automaticamente
- Protege a organizacao de custos inesperados
- Se atingido, projeto e pausado (nao bloqueado)

---

## Margens de Lucro

### Resumo Geral

| Metrica | Valor |
|---------|-------|
| **Markup base** | **4x o custo** (lucro = 4x investido) |
| **Markup alto** | **2,5x o custo** (acima de R$ 50.000) |
| **Cambio fixo** | USD 1 = BRL 6,20 |
| **Taxa Stripe absorvida** | 5% |
| **Custo Vercel** | Absorvido pela organizacao |
| **Margem Pro basica** | 81% |
| **Margem Enterprise basica** | 81% |

### Analise por Cenarios

**Cenario 1: Pro + Micro (plano mais barato)**
- Preco: R$ 489,47/mes
- Custo real: R$ 93/mes (Supabase $15)
- Lucro: R$ 396/mes
- Margem: 81%

**Cenario 2: Pro + Medium (mais popular)**
- Preco: R$ 815,79/mes
- Custo real: R$ 403/mes (Supabase $65)
- Lucro: R$ 412/mes
- Margem: 51%

**Cenario 3: Enterprise + Micro**
- Preco: R$ 19.220/mes
- Custo real: R$ 3.652/mes (Supabase $589)
- Lucro: R$ 15.568/mes
- Margem: 81%

---

## Custos Nao Incluidos (Riscos)

| Custo | Supabase USD | Nota |
|-------|-------------|------|
| Disk IOPS (alem de 3.000) | $0,024/IOPS | Pode variar por cliente |
| Disk Throughput (alem de 125MB/s) | $0,095/MB/s | Pode variar por cliente |
| High Performance Disk | $0,195/GB | Alternativa ao General Purpose |
| MFA Telefonico | $75/proj + $10/proj adic. | Add-on opcional |
| Custom Domain | $10/dominio/mes | Add-on opcional |
| Log Drains | $60/dreno + $0,20/1M events | Add-on opcional |
| Database Branching | $0,01344/branch/hora | Add-on opcional |
| PITR | $100/mes por 7 dias | Add-on opcional |

---

## Arquivos Relacionados

| Arquivo | Descricao |
|---------|-----------|
| `src/app/(main)/dashboard/billing/_components/data.ts` | Definicoes de planos, limites, taxas de sobreusa e compute |
| `src/lib/stripe/billing.ts` | Helpers de billing do Stripe |
| `src/app/api/stripe/checkout/route.ts` | Rota de checkout do Stripe |
| `src/app/(main)/dashboard/billing/_components/fine-tune.tsx` | Tabela de selecao de compute |
| `src/app/(main)/dashboard/billing/_components/pricing-cards.tsx` | Cards de planos com compute expansivel |
| `src/app/(main)/dashboard/billing/_components/change-plan-dialog.tsx` | Dialogo de alteracao de plano |

---

*Documento atualizado em: 2026-08-09*
*Cambio: USD 1 = BRL 6,20 | Markup: 4x (2,5x para altos) | Stripe Fee: 5%*