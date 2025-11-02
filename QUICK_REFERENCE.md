# HPC Atlanta - Referência Rápida 🚀

**Última Atualização:** 2025-11-02  
**Status:** ✅ Sistema de criação de posts implementado (pronto para teste)

---

## 🎯 O Que Foi Implementado?

### ✅ Funcionalidades Completas

| Funcionalidade | Status | Descrição |
|---------------|--------|-----------|
| **Website da Igreja** | ✅ | Homepage com seções sobre, serviços, galeria |
| **Formulário de Doação** | ✅ | Campos opcionais (nome/email/telefone) no final |
| **Guia HPC Vivencial** | ✅ | Download PDF com conteúdo completo (90 dias) |
| **Banco de Dados D1** | ✅ | SQLite serverless com 3 posts iniciais |
| **API REST** | ✅ | CRUD completo (GET, POST, PUT, DELETE) |
| **Autenticação JWT** | ✅ | Tokens de 7 dias, login persistente |
| **Painel Admin** | ✅ | Dashboard com estatísticas |
| **Editor de Posts** | ⭐ | Quill.js, campos completos (ACABOU DE SER IMPLEMENTADO) |

### 🚧 Próximos Passos Recomendados

1. **TESTAR** página de criação (`/admin/posts/new`)
2. **IMPLEMENTAR** página de edição (`/admin/posts/edit/:id`)
3. **IMPLEMENTAR** página de gerenciamento (`/admin/posts`)
4. **IMPLEMENTAR** exibição individual de posts (`/blog/:slug`)
5. **IMPLEMENTAR** listagem completa de posts (`/blog`)

---

## 🔑 Informações de Acesso

### Admin Login
- **URL:** http://localhost:3000/admin
- **Usuário:** `pastor`
- **Senha:** `HPC@2025!`
- **Email para tokens:** infipros@solihull.pt

### Métodos de Login
1. **Com Senha** (gera token novo)
2. **Com Token** (usar token existente)

---

## 📂 Arquivos Principais

```
webapp/
├── src/index.tsx                      # ⭐ Aplicação principal (1050+ linhas)
│   ├── Homepage (/)
│   ├── Admin (/admin, /admin/dashboard, /admin/posts/new)
│   ├── API Auth (/api/auth/login, /api/auth/verify)
│   └── API Posts (/api/posts CRUD)
│
├── public/static/app.js               # ⭐ JavaScript frontend (390+ linhas)
│   ├── Sistema de modais
│   ├── downloadGuide() - PDF HPC Vivencial
│   └── Validação de formulários
│
├── src/auth-config.ts                 # Configuração de autenticação
├── migrations/0001_create_blog_posts.sql  # Schema do banco
└── wrangler.jsonc                     # Config Cloudflare D1
```

---

## 🛠️ Comandos Essenciais

### Desenvolvimento Local

```bash
cd /home/user/webapp

# 1. Build (necessário antes do primeiro start)
npm run build

# 2. Limpar porta 3000
fuser -k 3000/tcp 2>/dev/null || true

# 3. Iniciar com PM2
pm2 start ecosystem.config.cjs

# 4. Testar
curl http://localhost:3000

# 5. Ver logs
pm2 logs webapp --nostream
```

### Gerenciar PM2

```bash
pm2 list                    # Listar serviços
pm2 restart webapp          # Reiniciar
pm2 stop webapp            # Parar
pm2 delete webapp          # Remover
pm2 logs webapp --lines 20 --nostream  # Ver últimas 20 linhas
```

### Banco de Dados D1

```bash
# Aplicar migrations (desenvolvimento)
npx wrangler d1 migrations apply webapp-blog --local

# Consultar banco local
npx wrangler d1 execute webapp-blog --local --command="SELECT * FROM blog_posts"

# Resetar banco local
rm -rf .wrangler/state/v3/d1 && npx wrangler d1 migrations apply webapp-blog --local
```

### Git

```bash
git status                              # Status atual
git log --oneline -10                   # Últimos 10 commits
git add . && git commit -m "mensagem"   # Commit
git push origin main                    # Push (após setup_github_environment)
```

---

## 🌐 API Endpoints

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Login com usuário/senha, gera token |
| POST | `/api/auth/verify` | Verifica validade do token |

### Blog Posts

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/posts` | Listar todos os posts |
| POST | `/api/posts` | Criar novo post |
| PUT | `/api/posts/:id` | Atualizar post existente |
| DELETE | `/api/posts/:id` | Deletar post |

---

## 📊 Schema do Banco de Dados

```sql
-- Tabela: blog_posts
id INTEGER PRIMARY KEY AUTOINCREMENT
title TEXT NOT NULL                    -- "A Casa de Oração Para Todas as Nações"
slug TEXT UNIQUE NOT NULL               -- "casa-de-oracao-para-todas-nacoes"
excerpt TEXT NOT NULL                   -- Resumo curto (max 200 chars)
content TEXT NOT NULL                   -- HTML completo do post
author TEXT DEFAULT 'Pr. Otávio Amorim'
category TEXT NOT NULL                  -- "Mensagens", "Adoração", etc.
image_url TEXT                          -- URL da imagem de capa
read_time TEXT DEFAULT '5 min'
featured INTEGER DEFAULT 0              -- 0 = não, 1 = sim
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

-- Indexes
idx_blog_posts_slug (slug)
idx_blog_posts_featured (featured)
idx_blog_posts_created_at (created_at DESC)
```

---

## 🎨 Página de Criação de Posts

**URL:** `/admin/posts/new`

**Campos do Formulário:**
- ✅ **Título** (obrigatório) - Gera slug automaticamente
- ✅ **Categoria** (obrigatório) - Dropdown com 8 opções
- ✅ **Tempo de Leitura** (opcional) - Ex: "5 min"
- ✅ **Post em Destaque** (opcional) - Checkbox
- ✅ **Resumo** (obrigatório) - Textarea com contador (max 200 chars)
- ✅ **URL da Imagem** (opcional) - Com botões de seleção rápida
- ✅ **Conteúdo** (obrigatório) - Editor Quill.js com formatação rica

**Recursos do Editor:**
- Negrito, itálico, sublinhado, tachado
- Títulos (H1, H2, H3)
- Listas ordenadas e não ordenadas
- Citações e blocos de código
- Links
- Alinhamento de texto
- Limpar formatação

**Botões de Ação:**
- 💾 **Salvar Rascunho** (em branco por enquanto)
- 👁️ **Prévia** (abre nova janela com preview)
- ✅ **Publicar Mensagem** (salva no banco via POST /api/posts)
- ❌ **Cancelar** (volta para dashboard)

---

## 🔄 Fluxo de Trabalho do Pastor

### 1️⃣ Primeiro Acesso
1. Abrir `/admin`
2. Fazer login com **usuário e senha**
3. Sistema gera token JWT (7 dias)
4. Token aparece nos logs do PM2
5. Token pode ser enviado por email (manual ou automático)

### 2️⃣ Acessos Subsequentes
1. Abrir `/admin`
2. Colar token na aba "Login com Token"
3. Token armazenado no localStorage
4. Não precisa fazer login novamente por 7 dias

### 3️⃣ Criar Nova Mensagem
1. Dashboard → Clicar "Nova Mensagem"
2. Preencher formulário `/admin/posts/new`
3. Escrever conteúdo no editor Quill.js
4. Preview (opcional)
5. Publicar
6. Mensagem aparece na homepage automaticamente

### 4️⃣ Editar Mensagem (A IMPLEMENTAR)
1. Dashboard → Listar posts
2. Clicar "Editar" no post desejado
3. Formulário pré-preenchido
4. Fazer alterações
5. Salvar

### 5️⃣ Deletar Mensagem (A IMPLEMENTAR)
1. Dashboard → Listar posts
2. Clicar "Deletar" no post desejado
3. Confirmar ação
4. Post removido do banco

---

## 🐛 Problemas Conhecidos

| Problema | Impacto | Solução |
|----------|---------|---------|
| `/blog` retorna 404 | Não tem página de listagem de posts | Implementar rota `/blog` |
| `/blog/:slug` retorna 404 | Não tem páginas individuais de posts | Implementar rota `/blog/:slug` |
| Token via console | Distribuição manual | Integrar serviço de email (Resend, etc.) |
| Sem status de rascunho | Posts publicados imediatamente | Adicionar coluna `status` no banco |

---

## 📝 O Que Fazer Agora?

### Opção A: Testar Sistema Atual
```bash
cd /home/user/webapp
npm run build
pm2 restart webapp

# Abrir no navegador:
# http://localhost:3000/admin (fazer login)
# http://localhost:3000/admin/posts/new (testar criação)
```

### Opção B: Implementar Edição de Posts
1. Criar rota `/admin/posts/edit/:id`
2. Buscar post do banco pelo ID
3. Pré-preencher formulário (mesmo do `/new`)
4. Submeter via PUT `/api/posts/:id`

### Opção C: Implementar Gerenciamento
1. Criar rota `/admin/posts`
2. Listar todos os posts em tabela
3. Botões "Editar" e "Deletar" em cada linha
4. Filtros e busca (opcional)

---

## 🎓 Recursos Técnicos

### Tecnologias Principais
- **Hono** - Framework web (~11KB)
- **Cloudflare D1** - SQLite serverless
- **Cloudflare Pages** - Hosting edge
- **Quill.js** - Editor WYSIWYG
- **TailwindCSS** - Estilização via CDN
- **TypeScript** - Type safety
- **Vite** - Build tool
- **PM2** - Process manager

### Limites do Cloudflare D1 (Free Tier)
- 100,000 leituras/dia
- 1,000 escritas/dia
- 500MB de armazenamento

### Limites do Cloudflare Workers (Free Tier)
- 100,000 requisições/dia
- 10ms CPU time por requisição

---

## 📞 Suporte

**Para dúvidas técnicas:**
- Consultar `PROJECT_SUMMARY.md` (documentação completa)
- Revisar comentários no código
- Verificar histórico de commits (`git log --oneline`)

**Para problemas:**
- Verificar logs do PM2 (`pm2 logs webapp --nostream`)
- Testar banco local (`npx wrangler d1 execute webapp-blog --local`)
- Rebuild (`npm run build && pm2 restart webapp`)

---

**Versão:** 1.0  
**Gerado em:** 2025-11-02  
**Próxima Atualização:** Após implementar edição de posts

