# 📘 GUIA COMPLETO - Instalar WordPress e Tema HPC Atlanta no cPanel

## 🎯 O QUE VOCÊ VAI FAZER

1. ✅ Instalar WordPress no cPanel (5 minutos)
2. ✅ Fazer upload do tema HPC Atlanta (2 minutos)
3. ✅ Ativar e configurar o tema (5 minutos)
4. ✅ Criar primeira postagem no blog (3 minutos)

**Tempo total: ~15 minutos**

---

## 📋 PRÉ-REQUISITOS

Antes de começar, você precisa ter:
- ✅ Acesso ao cPanel da sua hospedagem
- ✅ Domínio configurado e funcionando (lisboagusak.com)
- ✅ Arquivo do tema: **hpc-atlanta.zip** (já criado)

---

## PARTE 1: INSTALAR WORDPRESS NO cPANEL

### **Passo 1: Acessar o cPanel**

1. Abra seu navegador
2. Acesse: `https://seudominio.com:2083` ou `https://seuservidor.com/cpanel`
3. Faça login com seu usuário e senha

---

### **Passo 2: Encontrar o Softaculous**

1. No painel do cPanel, procure por **"Softaculous Apps Installer"**
2. Está geralmente na seção **"Software"** ou **"Apps"**
3. Clique em **"WordPress"** (ícone azul com W branco)

---

### **Passo 3: Instalar WordPress**

1. Clique no botão **"Install Now"** (Instalar Agora)

2. **Configure a Instalação**:
   ```
   Choose Protocol: https://
   Choose Domain: lisboagusak.com
   In Directory: (deixe VAZIO para instalar na raiz)
   
   Site Name: HPC Atlanta
   Site Description: Igreja House of Prayer Atlanta
   
   Admin Username: (escolha um nome de usuário)
   Admin Password: (crie uma senha forte)
   Admin Email: seu@email.com
   
   Select Language: Portuguese (Brazil)
   ```

3. **Opções Avançadas** (opcional):
   - Desmarque "Send Installation details to the Email"
   - Marque "Limit Login Attempts" (segurança)

4. Clique em **"Install"** (Instalar)

5. **Aguarde 2-3 minutos** até aparecer:
   ```
   ✅ Congratulations, the software was installed successfully
   ```

6. **ANOTE ESTAS INFORMAÇÕES**:
   ```
   Site URL: https://lisboagusak.com
   Admin URL: https://lisboagusak.com/wp-admin
   Admin Username: [seu usuário]
   Admin Password: [sua senha]
   ```

---

## PARTE 2: FAZER LOGIN NO WORDPRESS

### **Passo 1: Acessar Painel Admin**

1. Abra: `https://lisboagusak.com/wp-admin`
2. Digite seu **usuário** e **senha**
3. Clique em **"Log In"**

---

### **Passo 2: Configurar Idioma (se necessário)**

1. Vá em: **Settings (Configurações) → General**
2. **Site Language**: Selecione "Português do Brasil"
3. Clique em **"Save Changes"**

---

## PARTE 3: INSTALAR O TEMA HPC ATLANTA

### **Passo 1: Upload do Tema**

1. No painel do WordPress, vá em: **Appearance (Aparência) → Themes (Temas)**

2. Clique no botão **"Add New"** (Adicionar Novo)

3. Clique no botão **"Upload Theme"** (Enviar Tema)

4. Clique em **"Choose File"** (Escolher Arquivo)

5. Selecione o arquivo **hpc-atlanta.zip**

6. Clique em **"Install Now"** (Instalar Agora)

7. Aguarde o upload e instalação (10-20 segundos)

8. Quando aparecer "Theme installed successfully", clique em **"Activate"** (Ativar)

✅ **Pronto! Tema instalado e ativado!**

---

## PARTE 4: CONFIGURAR O TEMA

### **Passo 1: Criar Página Inicial**

1. Vá em: **Pages (Páginas) → Add New (Adicionar Nova)**

2. **Título**: "Início"

3. **Conteúdo**: Adicione o conteúdo da página inicial:
   ```
   Bem-vindo à Igreja House of Prayer Atlanta
   
   Uma família unida pelo amor de Cristo, comprometida em impactar 
   vidas e transformar comunidades através do Evangelho e da oração.
   
   [Adicione mais conteúdo conforme desejar]
   ```

4. Clique em **"Publish"** (Publicar)

---

### **Passo 2: Criar Página de Blog**

1. Vá em: **Pages → Add New**

2. **Título**: "Blog"

3. **Conteúdo**: Deixe vazio (será preenchido automaticamente)

4. Clique em **"Publish"**

---

### **Passo 3: Configurar Leitura**

1. Vá em: **Settings (Configurações) → Reading (Leitura)**

2. **Your homepage displays**: Selecione "A static page"

3. **Homepage**: Selecione "Início"

4. **Posts page**: Selecione "Blog"

5. Clique em **"Save Changes"**

---

### **Passo 4: Criar Menu de Navegação**

1. Vá em: **Appearance (Aparência) → Menus**

2. **Menu Name**: "Menu Principal"

3. Clique em **"Create Menu"**

4. **Adicione páginas ao menu**:
   - Marque: Início, Blog (e outras páginas que você criar)
   - Clique em "Add to Menu"

5. **Display location**: Marque "Menu Principal"

6. Clique em **"Save Menu"**

---

### **Passo 5: Configurar Informações da Igreja**

1. Vá em: **Appearance → Customize (Personalizar)**

2. Clique em **"Informações da Igreja"**

3. Configure:
   ```
   Endereço: 3379 Canton Rd, Marietta, GA 30066
   Telefone: +1 (770) 862-0756
   Email: contato@hpcatlanta.com
   ```

4. Clique em **"Publish"**

---

## PARTE 5: CRIAR PRIMEIRA POSTAGEM DO BLOG

### **Passo 1: Adicionar Novo Post**

1. Vá em: **Posts (Publicações) → Add New (Adicionar Nova)**

2. **Título**: Ex: "Bem-vindo ao Blog da HPC Atlanta"

3. **Conteúdo**: Escreva a mensagem do pastor

4. **Categorias**: Crie e selecione (Ex: "Sermões", "Reflexões")

---

### **Passo 2: Adicionar Imagem Destacada**

1. No lado direito, procure **"Featured Image"** (Imagem Destacada)

2. Clique em **"Set featured image"**

3. Faça upload de uma imagem (recomendado: 1200x600px)

4. Clique em **"Set featured image"**

---

### **Passo 3: Publicar**

1. Clique no botão azul **"Publish"** (no topo direito)

2. Confirme clicando em **"Publish"** novamente

✅ **Primeiro post publicado!**

---

## PARTE 6: VERIFICAR O SITE

### **Acesse seu site**:
```
https://lisboagusak.com
```

**Você deve ver**:
- ✅ Página inicial com conteúdo
- ✅ Menu de navegação
- ✅ Seção de últimas publicações
- ✅ Informações de contato no rodapé

**Acesse o blog**:
```
https://lisboagusak.com/blog
```

**Você deve ver**:
- ✅ Seu post publicado
- ✅ Design elegante preto/branco/cinza
- ✅ Cards de blog responsivos

---

## 📝 CATEGORIAS SUGERIDAS PARA O BLOG

Vá em: **Posts → Categories** e crie:

1. **Sermões** - Mensagens pregadas nos cultos
2. **Estudos Bíblicos** - Aprofundamento nas Escrituras
3. **Reflexões** - Pensamentos e meditações
4. **Testemunhos** - Histórias de transformação
5. **Anúncios** - Eventos e avisos importantes
6. **Missões** - Notícias dos trabalhos missionários

---

## 🎨 PERSONALIZAR MAIS O TEMA

### **Adicionar Logo**:
1. Vá em: **Appearance → Customize → Site Identity**
2. Clique em "Select Logo"
3. Faça upload da logo da igreja
4. Publish

### **Alterar Cores** (se desejar):
1. Vá em: **Appearance → Customize → Additional CSS**
2. Adicione código CSS personalizado
3. Publish

### **Criar Páginas Adicionais**:
- Sobre Nós
- Nossa História
- Missões
- Horários
- Contato

---

## 🔧 CONFIGURAÇÕES IMPORTANTES

### **Permalinks (URLs Amigáveis)**:
1. Vá em: **Settings → Permalinks**
2. Selecione: **"Post name"**
3. Save Changes

### **Comentários**:
1. Vá em: **Settings → Discussion**
2. Configure se deseja permitir comentários nos posts
3. Save Changes

### **Plugins Recomendados**:
1. **Yoast SEO** - Otimização para motores de busca
2. **Contact Form 7** - Formulário de contato
3. **Akismet** - Anti-spam (já vem instalado)

---

## 📱 COMO O PASTOR VAI PUBLICAR POSTS

### **Processo Simples**:

1. **Login**: `https://lisboagusak.com/wp-admin`

2. **Novo Post**: **Posts → Add New**

3. **Escrever**:
   - Título da mensagem
   - Conteúdo do sermão/estudo
   - Adicionar imagem destacada

4. **Categorizar**: Selecione categoria apropriada

5. **Publicar**: Clique em "Publish"

✅ **Pronto! Post publicado e visível no site!**

---

## ⚠️ RESOLUÇÃO DE PROBLEMAS

### **Problema: "Erro ao estabelecer conexão com banco de dados"**
**Solução**: Verifique se o WordPress foi instalado corretamente. Reinstale se necessário.

### **Problema: Tema não aparece na lista**
**Solução**: Verifique se o arquivo .zip foi enviado corretamente. Tente fazer upload novamente.

### **Problema: Imagens não aparecem**
**Solução**: 
1. Vá em: **Settings → Media**
2. Certifique-se de que as pastas têm permissões corretas (755)

### **Problema: Página inicial mostra posts ao invés de página estática**
**Solução**: Vá em **Settings → Reading** e configure "A static page" corretamente.

---

## 📞 SUPORTE

**Precisa de ajuda?**

Email: contato@hpcatlanta.com
Telefone: +1 (770) 862-0756

---

## 🎉 PARABÉNS!

Você instalou com sucesso o WordPress e o tema HPC Atlanta!

**Próximos passos**:
1. ✅ Criar mais páginas de conteúdo
2. ✅ Publicar mais posts no blog
3. ✅ Adicionar fotos e mídia
4. ✅ Compartilhar o site com a congregação!

---

## 📦 ARQUIVOS INCLUÍDOS

```
wordpress-theme/
├── hpc-atlanta.zip          ← Arquivo do tema (19KB)
├── GUIA_INSTALACAO_WORDPRESS.md  ← Este guia
└── hpc-atlanta/             ← Código fonte do tema
    ├── style.css
    ├── functions.php
    ├── index.php
    ├── header.php
    ├── footer.php
    ├── single.php (posts)
    ├── page.php (páginas)
    ├── front-page.php (home)
    ├── 404.php
    ├── searchform.php
    ├── README.txt
    ├── assets/
    │   └── js/main.js
    └── template-parts/
        ├── content.php
        └── content-none.php
```

**Versão do Tema**: 1.0.0
**Data**: 06 de Novembro de 2024
**Desenvolvido para**: Igreja House of Prayer Atlanta
