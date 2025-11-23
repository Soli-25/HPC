# 📘 GUIA DE INSTALAÇÃO - TEMA HPC ATLANTA BLOG

## ✅ O QUE FOI CRIADO

Um tema WordPress personalizado **100% compatível** com o design do site principal da HPC Atlanta!

### **Características**:
- 🎨 Design preto/branco/cinza igual ao site principal
- 📱 100% responsivo (mobile/tablet/desktop)
- ⚡ Rápido e otimizado
- 🔍 SEO-friendly
- 📝 Perfeito para sermões e mensagens do pastor
- 🎯 Integrado com o site principal
- 💬 Sistema de comentários
- 📂 Sidebar com widgets
- 🔗 Compartilhamento social
- 🖨️ Botão de imprimir
- 🔗 Link para voltar ao site principal

---

## 🚀 INSTALAÇÃO RÁPIDA (5 MINUTOS)

### **PASSO 1: BAIXAR O TEMA**
O arquivo está em: `/home/user/webapp/wordpress-theme-blog/hpc-blog.zip` (18KB)

### **PASSO 2: ACESSAR O WORDPRESS**
1. Acesse: https://houseprayeratl.com/blog/wp-admin
2. Faça login com suas credenciais

### **PASSO 3: INSTALAR O TEMA**
1. No menu lateral, clique em **Aparência** → **Temas**
2. Clique no botão **Adicionar Novo**
3. Clique no botão **Enviar Tema**
4. Clique em **Escolher Arquivo**
5. Selecione o arquivo `hpc-blog.zip`
6. Clique em **Instalar Agora**
7. Aguarde o upload terminar
8. Clique em **Ativar**

**PRONTO!** O tema está instalado e ativo! 🎉

---

## ⚙️ CONFIGURAÇÕES INICIAIS

### **1. CONFIGURAR MENU**
1. Vá em **Aparência** → **Menus**
2. Crie um novo menu chamado "Menu Principal"
3. Adicione links:
   - Início (link para o blog)
   - Todas as Mensagens
   - Categorias (se houver)
4. Marque a opção **Menu Principal** em "Exibir local"
5. Clique em **Salvar Menu**

### **2. CONFIGURAR WIDGETS DA SIDEBAR**
1. Vá em **Aparência** → **Widgets**
2. Na área **Sidebar Principal**, adicione:
   - **Pesquisa**: Para buscar mensagens
   - **Categorias**: Para filtrar por categoria
   - **Posts Recentes**: Últimas mensagens
   - **Arquivo**: Por mês/ano
   - **Tags**: Nuvem de tags

### **3. CONFIGURAR WIDGETS DO RODAPÉ**
1. Vá em **Aparência** → **Widgets**
2. Arraste widgets para **Rodapé 1**, **Rodapé 2** e **Rodapé 3**

**Sugestões**:
- **Rodapé 1**: Sobre a Igreja (widget de texto)
- **Rodapé 2**: Links Úteis (menu customizado)
- **Rodapé 3**: Horários de Culto (widget de texto)

### **4. CONFIGURAR INFORMAÇÕES DA IGREJA**
1. Vá em **Aparência** → **Personalizar**
2. Clique em **Informações da Igreja**
3. Preencha:
   - **Endereço**: 3379 Canton Rd, Marietta, GA 30066
   - **Telefone**: +1 (770) 862-0756
   - **Email**: otavioamorim@houseprayeratl.com
   - **Instagram**: https://www.instagram.com/hpcatlanta/
   - **Facebook**: URL do Facebook
   - **YouTube**: URL do YouTube
4. Clique em **Publicar**

### **5. CONFIGURAR LOGO (OPCIONAL)**
1. Vá em **Aparência** → **Personalizar**
2. Clique em **Identidade do Site**
3. Clique em **Selecionar Logo**
4. Faça upload do logo da igreja
5. Clique em **Publicar**

---

## 📝 CRIAR PRIMEIRA MENSAGEM

### **PASSO 1: CRIAR POST**
1. No menu lateral, clique em **Posts** → **Adicionar Novo**

### **PASSO 2: ADICIONAR TÍTULO**
```
Exemplo: "O Poder da Oração que Transforma"
```

### **PASSO 3: ADICIONAR CONTEÚDO**
Escreva a mensagem usando o editor WordPress

### **PASSO 4: ADICIONAR IMAGEM DESTACADA**
1. No painel direito, clique em **Imagem Destacada**
2. Faça upload de uma imagem (1200x600px recomendado)
3. Clique em **Definir Imagem Destacada**

### **PASSO 5: ADICIONAR CATEGORIA**
1. No painel direito, em **Categorias**
2. Crie categorias como:
   - Sermões
   - Estudos Bíblicos
   - Reflexões
   - Testemunhos

### **PASSO 6: ADICIONAR TAGS**
```
Exemplos: oração, fé, transformação, Deus
```

### **PASSO 7: PUBLICAR**
1. Clique no botão **Publicar**
2. Confirme clicando em **Publicar** novamente

**PRONTO!** Sua primeira mensagem está publicada! 🎉

---

## 🎨 PERSONALIZAÇÃO AVANÇADA

### **CORES DO TEMA**
Cores principais estão definidas em `style.css`:
```css
--color-primary: #1a1a1a;      /* Preto principal */
--color-secondary: #4a4a4a;    /* Cinza escuro */
--color-bg-light: #f5f5f5;     /* Cinza claro de fundo */
--color-white: #ffffff;         /* Branco */
```

### **FONTES**
```css
--font-serif: Georgia, 'Times New Roman', serif;  /* Títulos */
--font-sans: -apple-system, BlinkMacSystemFont, sans-serif;  /* Texto */
```

### **TAMANHOS DE IMAGEM**
- **Featured Image**: 1200x600px (principal)
- **Thumbnail**: 400x300px (miniaturas)
- **Logo**: 100x100px (máximo)

---

## 🔗 INTEGRAÇÃO COM SITE PRINCIPAL

### **LINKS AUTOMÁTICOS**
O tema já inclui automaticamente:
- ✅ Link "Site Principal" no header
- ✅ Link "Voltar ao Site Principal" no footer
- ✅ Breadcrumb mostrando "Site > Blog"

### **CONFIGURAR URL DO SITE PRINCIPAL**
No arquivo `header.php`, a função `home_url('/')` automaticamente aponta para:
```
https://houseprayeratl.com
```

Se o blog está em subdiretório `/blog`, o WordPress detecta automaticamente.

---

## 📂 ESTRUTURA DO TEMA

```
hpc-blog/
├── style.css               # CSS principal (12KB)
├── functions.php           # Funções do tema (10KB)
├── index.php               # Lista de posts
├── single.php              # Post individual
├── archive.php             # Arquivo de posts
├── search.php              # Busca
├── 404.php                 # Página não encontrada
├── header.php              # Cabeçalho
├── footer.php              # Rodapé
├── sidebar.php             # Sidebar
├── comments.php            # Comentários
├── screenshot.png          # Preview do tema
└── assets/
    └── js/
        └── main.js         # JavaScript (6KB)
```

---

## ✨ RECURSOS DO TEMA

### **Funcionalidades Incluídas**:
- ✅ **Sidebar responsiva**: 2 colunas no desktop, 1 coluna no mobile
- ✅ **Paginação**: Navegação entre páginas de posts
- ✅ **Breadcrumbs**: Navegação clara
- ✅ **Tempo de leitura**: Calculado automaticamente
- ✅ **Compartilhamento social**: Facebook, Twitter, WhatsApp
- ✅ **Botão imprimir**: Para sermões
- ✅ **Copiar link**: Facilita compartilhamento
- ✅ **Comentários**: Sistema completo de comentários
- ✅ **Busca**: Sistema de busca integrado
- ✅ **Tags e Categorias**: Organização de conteúdo
- ✅ **Widgets**: 4 áreas de widgets (sidebar + 3 footer)
- ✅ **SEO-friendly**: Meta tags otimizadas
- ✅ **Acessibilidade**: WCAG compliant

### **Plugins Recomendados** (Opcionais):
- **Yoast SEO**: Melhorar SEO
- **Akismet**: Anti-spam para comentários
- **WP Super Cache**: Cache e velocidade
- **Wordfence**: Segurança

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### **Tema não aparece na lista**
- Verifique se o arquivo ZIP contém a pasta `hpc-blog/`
- Tente descompactar e recompactar o ZIP

### **Imagens não aparecem**
- Vá em **Configurações** → **Mídia**
- Verifique os tamanhos de imagem
- Regenere miniaturas usando plugin "Regenerate Thumbnails"

### **CSS não carrega**
- Limpe cache do WordPress
- Limpe cache do navegador (Ctrl+F5)
- Desative plugins de cache temporariamente

### **Sidebar não aparece**
- Vá em **Aparência** → **Widgets**
- Adicione pelo menos 1 widget na "Sidebar Principal"

### **Menu não aparece**
- Vá em **Aparência** → **Menus**
- Certifique-se de marcar "Menu Principal" em "Exibir local"

---

## 📞 SUPORTE

### **Documentação WordPress**:
👉 https://wordpress.org/documentation/

### **Como Fazer**:
- **Adicionar Posts**: Posts → Adicionar Novo
- **Gerenciar Categorias**: Posts → Categorias
- **Configurar Widgets**: Aparência → Widgets
- **Personalizar Tema**: Aparência → Personalizar
- **Gerenciar Menus**: Aparência → Menus

---

## 🎉 PRONTO PARA USAR!

Seu blog HPC Atlanta está **100% configurado** e pronto para:
- ✅ Publicar sermões e mensagens
- ✅ Organizar conteúdo por categoria
- ✅ Receber comentários dos membros
- ✅ Compartilhar nas redes sociais
- ✅ Integrar perfeitamente com o site principal

**Comece agora mesmo a publicar as mensagens do pastor!** 🚀

---

**VERSÃO DO TEMA**: 2.0.0
**DATA**: Novembro de 2024
**COMPATIBILIDADE**: WordPress 5.0+
**ARQUIVO**: hpc-blog.zip (18KB)
