# Skill: Build de APK com Docker (act)

Use esta skill quando precisar buildar APKs do projeto BCRM localmente, especialmente quando o GitHub Actions está bloqueado por billing.

## Quando usar

- GitHub Actions falha com "account is locked due to a billing issue"
- Precisa gerar APK para teste local
- Precisa rodar workflows do GitHub localmente
- Deploy automático está bloqueado

## Pré-requisitos

- Docker rodando (`docker --version`)
- `act` instalado em `~/bin/act`

## Workflow de Build do APK

### 1. Build com act

```bash
cd /home/thematheusgemini123/next-shadcn-admin-dashboard

# Build do APK
~/bin/act -W .github/workflows/android-build.yml \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest \
  -j build
```

### 2. Copiar APK do container

```bash
# Encontrar container Docker
CONTAINER_ID=$(docker ps -a --filter "ancestor=catthehacker/ubuntu:act-latest" --format "{{.ID}}" | head -1)

# Copiar APK
docker cp $CONTAINER_ID:/home/thematheusgemini123/next-shadcn-admin-dashboard/android/app/build/outputs/apk/debug/app-debug.apk ./app-debug.apk
```

### 3. Publicar no GitHub Releases

```bash
gh release create v1.0.0 app-debug.apk \
  --repo mmdj04/BCRM \
  --title "BCRM v1.0.0 - Debug APK" \
  --notes "Debug APK gerado localmente"
```

## Rodar outros workflows

```bash
# CI - TypeCheck
~/bin/act -W .github/workflows/ci.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j typecheck

# CI - Security Audit
~/bin/act -W .github/workflows/ci.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j security

# CodeQL
~/bin/act -W .github/workflows/codeql.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j analyze
```

## Limpeza de containers

```bash
# Parar e remover todos os containers do act
docker ps -a --filter "ancestor=catthehacker/ubuntu:act-latest" --format "{{.ID}}" | xargs docker rm -f
```

## Solução de problemas

| Erro | Solução |
|------|---------|
| `Could not find any stages to run` | Usar `--list` para ver jobs, `-j <job_id>` para especificar |
| `Capacitor CLI requires NodeJS >=22` | Verificar `node-version: "22"` no workflow |
| `invalid source release: 21` | Verificar `java-version: "21"` no workflow |
| `ACTIONS_RUNTIME_TOKEN` | Esperado no act local — copiar APK manualmente |

## Configuração do projeto

- **Node.js**: 22 (Capacitor 8 requirement)
- **Java**: 21 (Capacitor Android requirement)
- **Android SDK**: via `android-actions/setup-android@v3`
- **Gradle**: 8.14.3 (bin distribution)

## Notas

- Build leva ~4 minutos via act
- Primeira execução baixa imagem Docker (~1.5GB)
- APK gerado: `app-debug.apk` (~4MB)
- O APK usa server URL mode (atualiza automaticamente com deploy no Vercel)
