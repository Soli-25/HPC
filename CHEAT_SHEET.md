# HPC Atlanta - Cheat Sheet 📋

## 🚀 Start/Stop/Restart

```bash
# Build (obrigatório na primeira vez)
cd /home/user/webapp && npm run build

# Limpar porta + Iniciar
fuser -k 3000/tcp 2>/dev/null || true && pm2 start ecosystem.config.cjs

# Restart rápido
pm2 restart webapp

# Ver status
pm2 status

# Ver logs (não bloqueia)
pm2 logs webapp --nostream --lines 20
```

---

## 🔑 Acesso Admin

| Tipo | Valor |
|------|-------|
| URL | http://localhost:3000/admin |
| Usuário | `pastor` |
| Senha | `HPC@2025!` |
| Email | infipros@solihull.pt |

---

## 📂 Arquivos Importantes

| Arquivo | O Que Faz |
|---------|-----------|
| `src/index.tsx` | ⭐ App principal (rotas, API, UI) |
| `public/static/app.js` | ⭐ Frontend (modais, download PDF) |
| `src/auth-config.ts` | JWT tokens, templates de email |
| `wrangler.jsonc` | Config do Cloudflare D1 |
| `ecosystem.config.cjs` | Config do PM2 |
| `migrations/0001_create_blog_posts.sql` | Schema do banco |

---

## 🌐 Rotas da Aplicação

### Públicas
- `/` - Homepage
- `/blog` - ❌ NÃO IMPLEMENTADO
- `/blog/:slug` - ❌ NÃO IMPLEMENTADO

### Admin
- `/admin` - Login
- `/admin/dashboard` - Dashboard
- `/admin/posts/new` - ⭐ Criar post (ACABOU DE SER IMPLEMENTADO)
- `/admin/posts/edit/:id` - ❌ NÃO IMPLEMENTADO
- `/admin/posts` - ❌ NÃO IMPLEMENTADO

### API
- `POST /api/auth/login` - Gera token
- `POST /api/auth/verify` - Valida token
- `GET /api/posts` - Lista posts
- `POST /api/posts` - Cria post
- `PUT /api/posts/:id` - Atualiza post
- `DELETE /api/posts/:id` - Deleta post

---

## 💾 Banco de Dados

```bash
# Aplicar migrations (local)
npx wrangler d1 migrations apply webapp-blog --local

# Ver dados
npx wrangler d1 execute webapp-blog --local --command="SELECT * FROM blog_posts"

# Contar posts
npx wrangler d1 execute webapp-blog --local --command="SELECT COUNT(*) FROM blog_posts"

# Deletar tudo (reset)
rm -rf .wrangler/state/v3/d1
npx wrangler d1 migrations apply webapp-blog --local
```

---

## 🎨 Criar Post (Campos)

| Campo | Obrigatório | Exemplo |
|-------|-------------|---------|
| Título | ✅ | "O Poder da Oração" |
| Categoria | ✅ | "Mensagens", "Adoração", etc. |
| Tempo Leitura | ❌ | "5 min" |
| Destaque | ❌ | Checkbox |
| Resumo | ✅ | Max 200 chars |
| URL Imagem | ❌ | https://... |
| Conteúdo | ✅ | Editor Quill.js |

---

## 🔄 Fluxo do Pastor

```
1. Login (/admin)
   ↓
2. Dashboard (/admin/dashboard)
   ↓
3. Clicar "Nova Mensagem"
   ↓
4. Preencher formulário (/admin/posts/new)
   ↓
5. Publicar
   ↓
6. Post aparece na homepage (/)
```

---

## 📊 Tabela blog_posts

```sql
id              INTEGER PRIMARY KEY
title           TEXT NOT NULL
slug            TEXT UNIQUE NOT NULL  -- Auto-gerado do título
excerpt         TEXT NOT NULL         -- Max 200 chars
content         TEXT NOT NULL         -- HTML do Quill
author          TEXT DEFAULT 'Pr. Otávio Amorim'
category        TEXT NOT NULL
image_url       TEXT
read_time       TEXT DEFAULT '5 min'
featured        INTEGER DEFAULT 0     -- 0 ou 1
created_at      DATETIME
updated_at      DATETIME
```

---

## 🛠️ Troubleshooting

| Problema | Solução |
|----------|---------|
| Porta 3000 ocupada | `fuser -k 3000/tcp` |
| PM2 não inicia | `pm2 delete all && pm2 start ecosystem.config.cjs` |
| Build falha | `rm -rf node_modules && npm install` |
| Banco não funciona | `rm -rf .wrangler && npm run build` |
| Token expirou | Login com usuário/senha para gerar novo |

---

## 🚧 Próximos Passos

1. ⭐ **TESTAR** `/admin/posts/new` (criação de post)
2. 🔨 **IMPLEMENTAR** `/admin/posts/edit/:id` (edição)
3. 🔨 **IMPLEMENTAR** `/admin/posts` (gerenciamento)
4. 🔨 **IMPLEMENTAR** `/blog/:slug` (post individual)
5. 🔨 **IMPLEMENTAR** `/blog` (listagem completa)

---

## 📦 Deploy (Produção)

```bash
# 1. Setup Cloudflare (uma vez)
# Call: setup_cloudflare_api_key

# 2. Build
npm run build

# 3. Migrations (primeira vez)
npx wrangler d1 migrations apply webapp-blog

# 4. Deploy
npx wrangler pages deploy dist --project-name webapp

# 5. URLs
# Production: https://random-id.webapp.pages.dev
# Branch: https://main.webapp.pages.dev
```

---

## 🎯 Links Úteis

- **Documentação Completa:** `PROJECT_SUMMARY.md`
- **Referência Rápida:** `QUICK_REFERENCE.md`
- **Este Cheat Sheet:** `CHEAT_SHEET.md`

---

**Última Atualização:** 2025-11-02
