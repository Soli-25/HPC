# 📤 Instruções de Upload para cPanel - HPC Atlanta

## 📋 O que tem nesta pasta:

Esta pasta contém **apenas o frontend estático** do site HPC Atlanta:

✅ `index.html` - Página principal do site  
✅ `.htaccess` - Configurações do servidor  
✅ `static/` - Arquivos CSS, JS e imagens (se existir)

⚠️ **IMPORTANTE:** Blog e Admin **NÃO estão incluídos** - eles funcionam via API Cloudflare

---

## 🚀 Passo a Passo: Upload para cPanel

### **1. Acesse o cPanel**
- Entre em: `https://seudominio.com:2083`
- Ou use o painel fornecido pela sua hospedagem

### **2. Abra o File Manager**
- No cPanel, procure por **"File Manager"** ou **"Gerenciador de Arquivos"**
- Clique para abrir

### **3. Navegue até public_html**
- No File Manager, abra a pasta **`public_html`**
- Esta é a pasta raiz do seu site

### **4. Faça Upload dos Arquivos**

**Opção A: Upload via Interface Web**
1. Clique no botão **"Upload"** no topo
2. Arraste todos os arquivos desta pasta (`cpanel-deploy/`)
3. Aguarde o upload completar
4. Volte para `public_html`

**Opção B: Upload via FTP**
1. Use um cliente FTP (FileZilla, WinSCP)
2. Conecte com credenciais do cPanel
3. Navegue até `/public_html/`
4. Arraste todos os arquivos desta pasta

### **5. Verifique a Estrutura**

Depois do upload, `public_html/` deve ter:
```
public_html/
├── index.html          ✅ Página principal
├── .htaccess           ✅ Configurações
└── static/             ✅ Assets (CSS, JS, imagens)
    ├── style.css
    └── (outros arquivos)
```

### **6. Teste o Site**
- Acesse: `http://seudominio.com`
- O site deve carregar normalmente!

---

## ⚙️ Configuração Adicional (Opcional)

### **A) Configurar Domínio no cPanel**
1. Em **"Domains"** ou **"Domínios"**
2. Adicione seu domínio: `hpcatlanta.com`
3. Document Root: `/public_html`

### **B) Forçar HTTPS**
- O `.htaccess` já força HTTPS automaticamente
- Certifique-se de ter SSL ativo no cPanel
- Em **"SSL/TLS Status"** ative o certificado

### **C) Configurar Email**
1. Em **"Email Accounts"**
2. Crie: `contato@hpcatlanta.com`
3. Use para formulários de contato

---

## 🔗 Como o Blog/Admin Funciona?

### **Frontend (cPanel):**
- ✅ Página principal (`index.html`)
- ✅ Seções: Descobrir, Servir, Batismo, Grupos, etc.
- ✅ Fotos, informações, horários

### **Backend (Cloudflare Workers):**
- ⚡ API do Blog (`/api/posts`)
- ⚡ Admin panel (`/admin`)
- ⚡ Autenticação
- ⚡ Banco de dados D1

**Como conectar:**

O `index.html` já está configurado para chamar a API do Cloudflare quando necessário. Você precisa:

1. **Deploy do backend no Cloudflare:**
   ```bash
   # No terminal/sandbox
   cd /home/user/webapp
   npm run build
   npx wrangler pages deploy dist --project-name hpc-api
   ```

2. **Anote a URL da API:**
   Exemplo: `https://hpc-api.pages.dev`

3. **Configure no HTML (se necessário):**
   O HTML estático já tem as chamadas para blog. Se precisar atualizar a URL da API, edite no JavaScript.

---

## 📊 Estatísticas dos Arquivos:

- **index.html:** ~200KB (contém todo o site)
- **.htaccess:** ~2KB (configurações)
- **static/:** Varia conforme assets

---

## ❓ Problemas Comuns

### **1. Site não carrega**
- Verifique se os arquivos estão em `public_html/` (não em subpasta)
- Certifique-se que `index.html` está presente
- Verifique permissões dos arquivos (644 para HTML, 755 para pastas)

### **2. CSS/JS não carregam**
- Verifique se pasta `static/` está no lugar certo
- Abra DevTools do navegador (F12) e veja erros no Console
- Verifique se caminhos no HTML estão corretos

### **3. Erros 404**
- Verifique `.htaccess` foi enviado corretamente
- Em alguns servidores, `.htaccess` pode estar oculto
- No File Manager, ative "Show Hidden Files"

### **4. HTTPS não funciona**
- Ative SSL no cPanel (**SSL/TLS Status**)
- Pode levar alguns minutos para propagar
- Certifique-se que domínio aponta para o servidor correto

### **5. Blog não aparece**
- Normal! Blog é dinâmico e precisa da API Cloudflare
- Faça deploy do backend no Cloudflare Workers (ver seção acima)
- Ou remova a seção de blog do HTML se não for usar

---

## 🔄 Atualizações Futuras

**Para atualizar o site:**

1. **Gere novo HTML:**
   ```bash
   # No sandbox/terminal
   curl -s http://localhost:3000 > cpanel-deploy/index.html
   ```

2. **Faça upload novamente via cPanel File Manager**
   - Sobrescreva `index.html`
   - Mantenha `.htaccess` e pasta `static/`

3. **Ou use Git + FTP automatizado**
   - Clone repositório localmente
   - Sincronize com FTP automático

---

## 📞 Suporte

**Se precisar de ajuda:**
- Verifique logs de erro no cPanel (**Error Log**)
- Teste em navegadores diferentes
- Limpe cache do navegador (Ctrl+Shift+Delete)

**Documentação completa:**
- `DEPLOY_CPANEL.md` - Guia completo
- `DEPLOY_CPANEL_RAPIDO.md` - Guia rápido
- `README.md` - Documentação do projeto

---

## ✅ Checklist Final

Antes de considerar pronto:

- [ ] Arquivos enviados para `public_html/`
- [ ] Site abre em `http://seudominio.com`
- [ ] HTTPS funciona (se configurado SSL)
- [ ] Todas as seções carregam corretamente
- [ ] Imagens aparecem
- [ ] Formulários funcionam (se tiver)
- [ ] Site responsivo (mobile)
- [ ] Analytics configurado (Google Analytics, se usar)

---

**Data:** 2025-11-03  
**Versão:** 1.0  
**Site:** HPC Atlanta - House of Prayer for All Nations
