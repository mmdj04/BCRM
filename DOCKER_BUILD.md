# Build de APK com Docker (act)

Quando o GitHub Actions está bloqueado por billing, use `act` para rodar workflows localmente via Docker.

## Pré-requisitos

- Docker instalado e rodando
- `act` instalado: `curl -sfSL https://raw.githubusercontent.com/nektos/act/master/install.sh | bash -s -- -b ~/bin`

## Comandos Essenciais

### Build do APK (Android)

```bash
cd /home/thematheusgemini123/next-shadcn-admin-dashboard

# Listar jobs disponíveis
~/bin/act -W .github/workflows/android-build.yml --list

# Rodar build do APK
~/bin/act -W .github/workflows/android-build.yml \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest \
  -j build

# Copiar APK do container Docker
CONTAINER_ID=$(docker ps -a --filter "ancestor=catthehacker/ubuntu:act-latest" --format "{{.ID}}" | head -1)
docker cp $CONTAINER_ID:/home/thematheusgemini123/next-shadcn-admin-dashboard/android/app/build/outputs/apk/debug/app-debug.apk ./app-debug.apk
```

### CI Workflow (TypeCheck, Lint, Build, Security)

```bash
# TypeCheck
~/bin/act -W .github/workflows/ci.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j typecheck

# Security Audit
~/bin/act -W .github/workflows/ci.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j security

# Lint (pode ter warnings, não bloqueia build)
~/bin/act -W .github/workflows/ci.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j lint

# Build Next.js (precisa de STRIPE_SECRET_KEY para API routes)
~/bin/act -W .github/workflows/ci.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j build
```

### CodeQL Analysis

```bash
~/bin/act -W .github/workflows/codeql.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest -j analyze
```

## Publicar APK no GitHub Releases

```bash
# Criar release com o APK
gh release create v1.0.0 app-debug.apk \
  --repo mmdj04/BCRM \
  --title "BCRM v1.0.0 - Debug APK" \
  --notes "Debug APK gerado localmente via act"
```

## Workflow: android-build.yml

O workflow usa:
- `runs-on: ubuntu-latest` (gratuito em repos públicos)
- Node.js 22 (requerido pelo Capacitor 8)
- Java 21 (requerido pelo Capacitor Android)
- Android SDK via `android-actions/setup-android@v3`

### Jobs disponíveis

| Job | Descrição |
|-----|-----------|
| `build` | Build do debug APK (cap sync + gradle assembleDebug) |

## Solução de Problemas

### "Could not find any stages to run"
Use `--list` para ver os jobs disponíveis e `-j <job_id>` para especificar.

### "The Capacitor CLI requires NodeJS >=22.0.0"
O workflow precisa de Node 22. Verifique `node-version` no yaml.

### "invalid source release: 21"
O Capacitor Android precisa de Java 21. Verifique `java-version` no yaml.

### "Unable to get ACTIONS_RUNTIME_TOKEN"
Esperado no `act` local. O upload de artifact não funciona localmente — copie o APK manualmente do container.

### Container Docker ainda rodando
```bash
# Parar e remover containers do act
docker ps -a --filter "ancestor=catthehacker/ubuntu:act-latest" --format "{{.ID}}" | xargs docker rm -f
```

## Notas Importantes

- O `act` roda workflows em containers Docker — os arquivos buildados ficam dentro do container
- Use `docker cp` para copiar o APK gerado para o host
- O `act` baixa imagens Docker na primeira execução (~1.5GB)
- Containers antigos podem acumular — limpe regularmente
- O build do APK leva ~4 minutos via `act`
