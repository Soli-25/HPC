# 🚀 INÍCIO RÁPIDO - HPC Atlanta

**Última Atualização:** 2025-11-02  
**Tempo Estimado:** 10-15 minutos  

---

## ⚡ Acesso Rápido ao Sistema (AGORA)

### 🌐 URLs Públicas (Sandbox - Temporárias)

**Homepage:**
https://3000-ihvtjt4eoboqu6y8hpg0r-c07dda5e.sandbox.novita.ai/

**Admin Login:**
https://3000-ihvtjt4eoboqu6y8hpg0r-c07dda5e.sandbox.novita.ai/admin

**Credenciais:**
- Usuário: `pastor`
- Senha: `HPC@2025!`

---

## 📋 Próximos Passos (Em Ordem)

### PASSO 1: Configurar GitHub ⚠️ OBRIGATÓRIO

**Você precisa fazer isso ANTES de fazer push:**

1. **Na interface do sandbox:**
   - Procure a aba/seção **"GitHub"** ou **"#github"**
   - Configure a autorização do GitHub
   - Pode precisar de:
     - GitHub App authorization
     - OAuth authorization
     - Personal Access Token

2. **Repositórios Existentes:**
   - O sistema pode mostrar repositórios que você já tem
   - **PRIORIDADE:** Use um repositório existente se disponível
   - Se não tiver, pode criar um novo

3. **Após configurar:**
   ```bash
   # Executar este comando no terminal:
   # setup_github_environment
   
   # Deve retornar informações sobre autenticação e repositórios
   ```

---

### PASSO 2: Push para GitHub

**Depois de configurar o GitHub no Passo 1:**

```bash
cd /home/user/webapp

# A. Se houver repositório existente sugerido:
git remote add origin https://github.com/SEU_USUARIO/REPO_EXISTENTE.git
git push -f origin main  # -f porque é primeira vez

# B. Ou criar novo repositório:
gh repo create hpc-atlanta --public --source=. --remote=origin
git push -u origin main
```

---

### PASSO 3: Escolher Método de Deploy

Você tem **3 opções** (veja detalhes em `DEPLOY_CPANEL.md`):

#### ✅ Opção 1: Cloudflare Pages (RECOMENDADO)
**Prós:** Funciona 100%, gratuito, rápido (5 min)  
**Contras:** Nenhum

**Como fazer:**
```bash
# 1. Configurar Cloudflare (ferramenta disponível)
# setup_cloudflare_api_key

# 2. Deploy
npm run build
npx wrangler pages deploy dist --project-name webapp

# 3. Pronto! URL: https://webapp.pages.dev
```

---

#### ⚠️ Opção 2: cPanel Tradicional
**Prós:** Usa hospedagem que você já tem  
**Contras:** **NÃO FUNCIONA diretamente** - precisa reescrever TODO o backend

**Motivo:** Este projeto usa Cloudflare Workers + D1 Database que não existem no cPanel

**O que precisa fazer:**
1. Reescrever backend de Hono para Express.js (4-8 horas)
2. Substituir D1 por MySQL do cPanel
3. Configurar Node.js no cPanel
4. Reconfigurar todas as rotas

**Arquivos para modificar:**
- Criar novo `server.js` com Express
- Converter queries D1 para MySQL
- Criar schema MySQL via phpMyAdmin
- Configurar `.env` com credenciais cPanel

*Veja código completo em `DEPLOY_CPANEL.md`*

---

#### 🔀 Opção 3: Híbrido
**Frontend no cPanel + API no Cloudflare**

**Estrutura:**
- cPanel serve HTML/CSS/JS estáticos (homepage, etc.)
- Cloudflare serve API + Admin + Banco de dados
- Frontend chama API via CORS

**Vantagens:**
- Usa cPanel para site público
- Usa Cloudflare para funcionalidades complexas
- Não precisa reescrever backend

---

## 📊 Status Atual do Projeto

### ✅ O Que Está Pronto

| Funcionalidade | Status | URL |
|---------------|--------|-----|
| Homepage | ✅ | `/` |
| Formulário de Doação | ✅ | Modal na homepage |
| Guia HPC Vivencial PDF | ✅ | Download na homepage |
| Admin Login | ✅ | `/admin` |
| Admin Dashboard | ✅ | `/admin/dashboard` |
| Criar Post | ⭐ | `/admin/posts/new` |
| API Auth | ✅ | `/api/auth/login`, `/api/auth/verify` |
| API Posts | ✅ | `/api/posts` (GET, POST, PUT, DELETE) |
| Banco de Dados D1 | ✅ | 3 posts iniciais |

### 🚧 O Que Falta Implementar

| Funcionalidade | Prioridade | Tempo Estimado |
|---------------|-----------|----------------|
| Editar Post | Alta | 30 min |
| Gerenciar Posts | Alta | 1 hora |
| Post Individual | Média | 1 hora |
| Blog Listing | Média | 1 hora |
| Email Service | Baixa | 30 min |

---

## 🎯 Decisão Rápida: Qual Caminho Seguir?

### Você tem cPanel E quer usar?

**SIM** → Vá para `DEPLOY_CPANEL.md` e leia as 3 opções  
**Recomendo:** Opção 3 (Híbrido)

### Você quer deploy rápido e simples?

**SIM** → Use Cloudflare Pages (Opção 1)  
**Tempo:** 5-10 minutos  
**Custo:** $0 (free tier)

### Você não tem pressa?

**Converter tudo para cPanel** → Opção 2  
**Tempo:** 4-8 horas  
**Requer:** Conhecimento de Express.js e MySQL

---

## 📚 Documentação Disponível

| Arquivo | Para Quê? | Tamanho |
|---------|-----------|---------|
| `INICIO_RAPIDO.md` | ⭐ Este arquivo - Start aqui | 4KB |
| `CHEAT_SHEET.md` | Comandos essenciais | 4KB |
| `QUICK_REFERENCE.md` | Referência rápida | 9KB |
| `PROJECT_SUMMARY.md` | Documentação técnica completa | 31KB |
| `DEPLOY_CPANEL.md` | Guia de deploy cPanel | 10KB |
| `GITHUB_PUSH.md` | Guia de push GitHub | 9KB |
| `README.md` | Visão geral do projeto | 10KB |

---

## 🔧 Comandos Mais Usados

```bash
# Reiniciar servidor
cd /home/user/webapp && pm2 restart webapp

# Ver logs
pm2 logs webapp --nostream --lines 20

# Build
npm run build

# Ver status
pm2 status

# Banco de dados local
npx wrangler d1 execute webapp-blog --local --command="SELECT * FROM blog_posts"

# Git
git status
git log --oneline -10
```

---

## ⚠️ ATENÇÃO: URLs do Sandbox São Temporárias

As URLs que estão funcionando agora:
```
https://3000-ihvtjt4eoboqu6y8hpg0r-c07dda5e.sandbox.novita.ai/
```

São **temporárias** e só funcionam enquanto o sandbox está ativo.

**Para URL permanente**, você precisa fazer deploy em:
- Cloudflare Pages → `https://webapp.pages.dev`
- cPanel → `https://hpcatlanta.com` (seu domínio)

---

## 🎯 Checklist de Ações

### ☐ AGORA (Urgente)

- [ ] Testar sistema atual nas URLs do sandbox acima
- [ ] Logar no admin: `/admin` com usuário `pastor` e senha `HPC@2025!`
- [ ] Testar criar um post em `/admin/posts/new`
- [ ] Verificar se post aparece na homepage

### ☐ HOJE (Próximas horas)

- [ ] Configurar GitHub na interface do sandbox
- [ ] Executar `setup_github_environment` no terminal
- [ ] Push para GitHub usando `GITHUB_PUSH.md`

### ☐ ESTA SEMANA

- [ ] Escolher método de deploy (Cloudflare ou cPanel)
- [ ] Fazer deploy em produção
- [ ] Implementar edição de posts (`/admin/posts/edit/:id`)
- [ ] Implementar gerenciamento de posts (`/admin/posts`)

---

## 📞 Precisa de Ajuda?

### Para problemas técnicos:
1. Verificar logs: `pm2 logs webapp --nostream`
2. Consultar `CHEAT_SHEET.md` para troubleshooting
3. Consultar `PROJECT_SUMMARY.md` para documentação técnica

### Para deploy:
1. Cloudflare → `PROJECT_SUMMARY.md` seção "Deployment"
2. cPanel → `DEPLOY_CPANEL.md`

### Para GitHub:
1. `GITHUB_PUSH.md` - guia passo a passo

---

## 🎉 Resumo Final

**Você tem:**
- ✅ Sistema de blog CMS funcionando no sandbox
- ✅ 16 commits no Git
- ✅ 1050+ linhas de código TypeScript
- ✅ Documentação completa (7 arquivos)
- ✅ Pronto para GitHub e deploy

**Próximas 3 ações:**
1. **TESTAR** o sistema nas URLs acima
2. **CONFIGURAR** GitHub na interface
3. **FAZER PUSH** para GitHub

**Depois:**
4. **DEPLOY** (Cloudflare ou cPanel)
5. **COMPLETAR** páginas faltantes

---

**Boa sorte! 🚀**

---

**Criado em:** 2025-11-02  
**Versão:** 1.0
