# 🚀 Deploy HPC Atlanta no cPanel - Guia Rápido

## ⚠️ IMPORTANTE: Este projeto NÃO funciona diretamente no cPanel

Este site foi desenvolvido para **Cloudflare Workers/Pages** e usa tecnologias que não existem em hospedagem tradicional.

## 🎯 Suas 3 Opções:

---

### ✅ OPÇÃO 1: Cloudflare Pages (RECOMENDADO - GRATUITO)

**Melhor escolha! Funciona 100% sem modificações.**

#### Vantagens:
- ✅ Totalmente GRATUITO
- ✅ Funciona sem mudar NADA no código
- ✅ Ultra rápido (CDN global)
- ✅ HTTPS automático
- ✅ Deploy em 5 minutos

#### Como fazer:
1. Acesse https://dash.cloudflare.com/
2. Vá em "Workers & Pages" > "Create Application"
3. Conecte seu GitHub (repositório: Soli-25/HPC)
4. Configure:
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output: `dist`
5. Clique em "Save and Deploy"
6. Pronto! Você terá uma URL: `https://hpc.pages.dev`

#### Domínio personalizado (opcional):
- Em Custom Domains, adicione `hpcatlanta.com`
- Configure DNS no Cloudflare ou seu registrador de domínio

**URL do seu repositório GitHub:** https://github.com/Soli-25/HPC

---

### 🔄 OPÇÃO 2: Usar cPanel APENAS para arquivos HTML estáticos

**Se você realmente quer usar cPanel, pode hospedar apenas o frontend.**

#### O que fazer:
1. Build o projeto localmente ou no GitHub Actions
2. Faça upload da pasta `dist/` para `public_html/` no cPanel
3. Configure o backend (blog/admin) no Cloudflare Workers
4. Frontend chama API do Cloudflare

#### Limitações:
- ⚠️ Blog e Admin continuam no Cloudflare
- ⚠️ Você só hospeda HTML/CSS/JS no cPanel
- ⚠️ Requer dois lugares (cPanel + Cloudflare)

---

### 🛠️ OPÇÃO 3: Reescrever TUDO para funcionar no cPanel

**NÃO recomendo! Muito trabalho.**

#### O que precisa mudar:
- ❌ Substituir Cloudflare D1 por MySQL
- ❌ Reescrever todo código backend
- ❌ Substituir Hono por Express
- ❌ Configurar Node.js no cPanel (se disponível)
- ❌ 8-12 horas de trabalho

---

## 📦 O que JÁ está no GitHub:

✅ **Repositório:** https://github.com/Soli-25/HPC  
✅ **Código fonte completo**  
✅ **Banco de dados (migrations)**  
✅ **Documentação**  
✅ **Tudo commitado e atualizado**

---

## 🎯 Minha Recomendação Forte:

### Use a **OPÇÃO 1: Cloudflare Pages**

**Por quê?**
1. É **GRATUITO** (cPanel custa $5-20/mês)
2. É **MUITO MAIS RÁPIDO** que qualquer cPanel
3. Funciona **SEM MODIFICAR NADA**
4. Deploy automático quando você atualiza o GitHub
5. Segurança e performance de nível empresarial

**cPanel é bom para:** Sites PHP/WordPress tradicionais  
**Cloudflare é melhor para:** Aplicações modernas como a sua

---

## 📞 Precisa de Ajuda?

Se escolher Cloudflare Pages e tiver dúvida em algum passo, me avise!

Se REALMENTE quer usar cPanel (não recomendo), veja o arquivo `DEPLOY_CPANEL.md` com instruções detalhadas de como converter o projeto.

---

## ⚡ Deploy Cloudflare Passo a Passo (5 minutos):

1. **Abra:** https://dash.cloudflare.com/
2. **Login** com sua conta Cloudflare
3. **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**
4. **Selecione:** Repositório `Soli-25/HPC`
5. **Configure:**
   - Project name: `hpc-atlanta`
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. **Save and Deploy**
7. **Aguarde 2-3 minutos** enquanto build e deploy acontecem
8. **Pronto!** Seu site estará em `https://hpc-atlanta.pages.dev`

### Adicionar Domínio Personalizado:
1. No painel do projeto, vá em **Custom Domains**
2. Clique em **Set up a custom domain**
3. Digite: `hpcatlanta.com`
4. Siga instruções para configurar DNS

---

**Última atualização:** 2025-11-03  
**Status:** ✅ Código completo e pronto para deploy
