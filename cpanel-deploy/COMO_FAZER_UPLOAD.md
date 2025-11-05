# 📤 GUIA RÁPIDO - Upload para cPanel

## ✅ O QUE VOCÊ PRECISA FAZER

### **Passo 1: Apagar TUDO da pasta atual**

No cPanel File Manager, vá até `/home/solihull/lisboagusak.com/` e:
1. **Selecione TODOS os arquivos e pastas**
2. **Delete TUDO** (botão "Delete" no topo)
3. **Confirme** a exclusão

⚠️ **IMPORTANTE**: A pasta deve ficar **COMPLETAMENTE VAZIA** antes de fazer o upload!

---

### **Passo 2: Fazer Upload APENAS destes arquivos**

Você vai fazer upload de **APENAS 4 ITENS**:

```
📁 cpanel-deploy/          ← Esta é a pasta que você tem
    ├── index.html         ← 1. Arquivo principal (52KB)
    ├── .htaccess          ← 2. Configuração do servidor
    ├── 📁 static/         ← 3. Pasta com CSS e JS
    └── 📁 images/         ← 4. Pasta com imagens
```

**Como fazer upload no cPanel**:

1. **Abra o File Manager**
2. **Navegue até**: `/home/solihull/lisboagusak.com/`
3. **Clique em "Upload"** (botão no topo)
4. **Arraste estes 4 itens** para a área de upload:
   - `index.html`
   - `.htaccess`
   - Pasta `static/`
   - Pasta `images/`

5. **Aguarde o upload terminar**

---

### **Passo 3: Verificar estrutura final**

Após o upload, sua pasta `/home/solihull/lisboagusak.com/` deve ter **EXATAMENTE**:

```
/home/solihull/lisboagusak.com/
    ├── index.html          ✅
    ├── .htaccess           ✅
    ├── static/             ✅
    │   ├── app.js
    │   └── styles.css
    └── images/             ✅
        └── pastor.jpg
```

⚠️ **NÃO DEVE TER**:
- ❌ Pastas: `src/`, `migrations/`, `node_modules/`
- ❌ Arquivos: `app.js` (51KB), `*.ts`, `*.md`
- ❌ Código TypeScript ou arquivos de desenvolvimento

---

## 🌐 CONFIGURAÇÃO DO DOMÍNIO

**ANTES de acessar o site, você PRECISA configurar o domínio no cPanel!**

### **Verificar se o domínio está configurado**:

1. No cPanel, vá em **"Domains"** (ou "Domínios")
2. Procure por `lisboagusak.com` na lista
3. **Se NÃO aparecer**, clique em **"Create a New Domain"**:
   - **Domain**: `lisboagusak.com`
   - **Document Root**: `/home/solihull/lisboagusak.com`
   - Clique em **"Submit"**

---

## 🔍 DNS - CONFIGURAÇÃO CRUCIAL

**O erro `DNS_PROBE_FINISHED_NXDOMAIN` significa que o domínio não está apontando para o servidor.**

### **Você precisa configurar o DNS no registrador do domínio**:

**Onde você registrou o domínio `lisboagusak.com`?**
- GoDaddy? Namecheap? Registro.br? Outro?

**No painel do registrador, configure**:

**Opção 1 - Nameservers** (Recomendado):
```
Nameserver 1: [Fornecido pela hospedagem]
Nameserver 2: [Fornecido pela hospedagem]
```

**Opção 2 - Registro A**:
```
Tipo: A
Host: @
Valor: [IP do servidor cPanel]
```

💡 **Como descobrir o IP do servidor**:
- No cPanel, clique em **"Expandir Estatísticas"** (lado direito)
- O IP aparecerá ali
- OU pergunte ao suporte da hospedagem

---

## ⏱️ TEMPO DE PROPAGAÇÃO

Após configurar o DNS:
- **Tempo mínimo**: 1-2 horas
- **Tempo máximo**: 24-48 horas

**Teste com**:
```
http://[IP_DO_SERVIDOR]/~solihull/
```
Substitua `[IP_DO_SERVIDOR]` pelo IP real para testar sem DNS.

---

## 🎯 RESUMO - 3 ETAPAS

1. ✅ **Upload dos arquivos corretos**
2. ✅ **Configurar domínio no cPanel**
3. ✅ **Configurar DNS no registrador**

---

## 📞 PRECISA DE AJUDA?

**Se o erro persistir, me informe**:
1. O domínio está configurado no cPanel Domains?
2. Onde o domínio foi registrado?
3. Qual é o IP do servidor de hospedagem?

---

## ✨ NOVIDADES NESTA VERSÃO

✅ **Nova Seção de Missões** adicionada com:
- 4 fotos dos projetos missionários
- Estatísticas de impacto (5 continentes, 1000+ crianças)
- Descrição de projetos educacionais, esportivos e sociais
- Chamado para ação missionária

**Tamanho atualizado**: 52KB (antes 46KB)
