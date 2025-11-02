# 🔗 Integração com WordPress - Guia Completo

**Data:** 2025-11-02  
**Domínio:** houseofprayeratl.com  
**Subdomínio Blog:** blog.houseofprayeratl.com (WordPress)  

---

## 🎯 Arquitetura da Solução

### 📦 Componentes:

```
┌─────────────────────────────────────────────────┐
│  houseofprayeratl.com (Site Principal)          │
│  - Homepage com informações da igreja           │
│  - Últimas 3 mensagens (via WordPress API)      │
│  - Botão "Ver Todas" → Redireciona para WP      │
│  - cPanel (HTML estático)                       │
└─────────────────────────────────────────────────┘
                      ↓ (WordPress REST API)
┌─────────────────────────────────────────────────┐
│  blog.houseofprayeratl.com (WordPress)          │
│  - Blog completo gerenciado pelo Pastor         │
│  - Editor visual com upload de imagens          │
│  - Sistema completo de posts                    │
│  - cPanel + WordPress instalado                 │
└─────────────────────────────────────────────────┘
```

---

## 📋 PASSO A PASSO - Implementação Completa

### FASE 1: Configurar WordPress no cPanel

#### 1️⃣ Criar Subdomínio no cPanel

```
1. Login no cPanel
2. Ir em "Subdomínios" ou "Subdomains"
3. Criar subdomínio:
   - Subdomínio: blog
   - Domínio: houseofprayeratl.com
   - Document Root: /public_html/blog
4. Clicar "Criar"
```

**Resultado:** `blog.houseofprayeratl.com` criado

---

#### 2️⃣ Instalar WordPress

**Opção A: Via Softaculous (Recomendado)**
```
1. cPanel → "WordPress" (em Software/Softaculous)
2. Clicar "Install Now"
3. Configurações:
   - Choose Protocol: https://
   - Choose Domain: blog.houseofprayeratl.com
   - In Directory: (deixar em branco)
   - Site Name: HPC Atlanta - Palavra
   - Site Description: Mensagens e Estudos Bíblicos
   - Admin Username: pastor
   - Admin Password: [escolher senha forte]
   - Admin Email: infipros@solihull.pt
   - Language: Portuguese (Brazil)
4. Clicar "Install"
5. Aguardar 2-3 minutos
```

**Opção B: Manual (se não tiver Softaculous)**
```
1. Baixar WordPress: https://br.wordpress.org/download/
2. Upload via FTP para /public_html/blog/
3. Criar banco MySQL no cPanel
4. Acessar blog.houseofprayeratl.com/wp-admin/install.php
5. Seguir instalação
```

---

#### 3️⃣ Configurar WordPress

```
1. Login: blog.houseofprayeratl.com/wp-admin
   - Usuário: pastor
   - Senha: [a que você escolheu]

2. Painel → Configurações → Geral:
   - Título do site: HPC Atlanta - Palavra
   - Slogan: Mensagens e Estudos Bíblicos do Pastor Otávio
   - Idioma: Português do Brasil
   - Timezone: America/New_York (Atlanta)

3. Painel → Configurações → Links Permanentes:
   - Selecionar: "Nome do Post"
   - URL ficará: blog.houseofprayeratl.com/nome-do-post/

4. Painel → Aparência → Temas:
   - Instalar tema leve e bonito (sugestões abaixo)

5. Painel → Plugins:
   - Instalar "Yoast SEO" (SEO)
   - Instalar "Classic Editor" (editor clássico mais fácil)
```

---

#### 4️⃣ Temas WordPress Recomendados

**Opção 1: Astra (Gratuito) ⭐**
```
- Muito leve e rápido
- Customização fácil
- Responsivo
- Instalação: Aparência → Temas → Adicionar Novo → Buscar "Astra"
```

**Opção 2: GeneratePress (Gratuito)**
```
- Ultra-leve
- Carrega rápido
- Acessível
```

**Opção 3: Neve (Gratuito)**
```
- Design moderno
- Blocos prontos
- Fácil de usar
```

---

### FASE 2: Configurar WordPress REST API

#### 5️⃣ Habilitar REST API

WordPress já vem com REST API habilitada por padrão!

**Testar se funciona:**
```bash
# Listar posts
curl https://blog.houseofprayeratl.com/wp-json/wp/v2/posts

# Ver informações da API
curl https://blog.houseofprayeratl.com/wp-json/
```

**Endpoints Úteis:**
```
GET /wp-json/wp/v2/posts        # Lista todos os posts
GET /wp-json/wp/v2/posts/{id}   # Post específico
GET /wp-json/wp/v2/categories   # Categorias
GET /wp-json/wp/v2/media        # Imagens
```

---

#### 6️⃣ Criar Categorias no WordPress

```
1. Painel → Posts → Categorias
2. Criar categorias:
   - Mensagens
   - Adoração
   - Batismo
   - Estudo Bíblico
   - Testemunhos
   - Oração
   - Família
   - Juventude
```

---

#### 7️⃣ Criar Primeiro Post de Teste

```
1. Painel → Posts → Adicionar Novo
2. Título: "Bem-vindo ao Blog da HPC Atlanta"
3. Conteúdo: (escrever mensagem de boas-vindas)
4. Imagem Destacada: (upload de imagem)
5. Categoria: Mensagens
6. Clicar "Publicar"
```

---

### FASE 3: Modificar Site Principal

#### 8️⃣ Criar Arquivo JavaScript para WordPress API

Vou criar arquivo que busca posts do WordPress:

**Arquivo:** `/public_html/js/wordpress-integration.js`

```javascript
// WordPress Integration - HPC Atlanta
const WORDPRESS_API = 'https://blog.houseofprayeratl.com/wp-json/wp/v2';

// Buscar últimos 3 posts do WordPress
async function fetchWordPressPosts(limit = 3) {
  try {
    const response = await fetch(`${WORDPRESS_API}/posts?per_page=${limit}&_embed`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar posts');
    }
    
    const posts = await response.json();
    
    // Transformar para formato usado no site
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 200),
      content: post.content.rendered,
      date: new Date(post.date).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      link: `https://blog.houseofprayeratl.com/${post.slug}`,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
             'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Mensagens',
      readTime: calcularTempoLeitura(post.content.rendered)
    }));
  } catch (error) {
    console.error('Erro ao buscar posts do WordPress:', error);
    return [];
  }
}

// Calcular tempo de leitura
function calcularTempoLeitura(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // 200 palavras por minuto
  return `${minutes} min`;
}

// Renderizar posts na homepage
async function renderizarPostsHomepage() {
  const postsContainer = document.getElementById('blog-posts-container');
  
  if (!postsContainer) return;
  
  // Mostrar loading
  postsContainer.innerHTML = `
    <div class="col-span-3 text-center py-12">
      <i class="fas fa-spinner fa-spin text-4xl text-neutral-400 mb-4"></i>
      <p class="text-neutral-600">Carregando mensagens...</p>
    </div>
  `;
  
  // Buscar posts
  const posts = await fetchWordPressPosts(3);
  
  if (posts.length === 0) {
    postsContainer.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <i class="fas fa-book-open text-6xl text-neutral-300 mb-6"></i>
        <h3 class="text-2xl font-bold text-neutral-700 mb-3">Nenhuma mensagem publicada ainda</h3>
        <p class="text-neutral-600">Em breve teremos novas mensagens disponíveis.</p>
      </div>
    `;
    return;
  }
  
  // Renderizar cards
  postsContainer.innerHTML = posts.map(post => `
    <a href="${post.link}" target="_blank" class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div class="relative h-64 overflow-hidden">
        <img 
          src="${post.image}" 
          alt="${post.title}" 
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div class="absolute top-4 left-4 bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ${post.category}
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <div class="flex items-center text-sm text-neutral-500 mb-3">
          <i class="far fa-calendar mr-2"></i>
          <span>${post.date}</span>
          <span class="mx-2">•</span>
          <i class="far fa-clock mr-2"></i>
          <span>${post.readTime}</span>
        </div>
        <h4 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-600 transition">
          ${post.title}
        </h4>
        <p class="text-neutral-600 mb-4 leading-relaxed flex-1">
          ${post.excerpt}
        </p>
        <div class="flex items-center text-neutral-900 font-semibold group-hover:gap-2 transition-all">
          <span>Ler mensagem</span>
          <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </a>
  `).join('');
}

// Carregar quando página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderizarPostsHomepage);
} else {
  renderizarPostsHomepage();
}
```

---

#### 9️⃣ Modificar Homepage HTML

**Arquivo:** `/public_html/index.html`

**Modificar seção de blog:**

```html
<!-- ANTES (seção atual com posts estáticos) -->
<section id="blog" class="py-24 md:py-32 bg-neutral-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Palavra do Pastor</p>
      <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Mensagens e Estudos</h3>
      <p class="text-xl text-neutral-600 max-w-2xl mx-auto">Reflexões, ensinamentos e palavra profética do Pr. Otávio Amorim</p>
    </div>
    
    <!-- SUBSTITUIR ESTA PARTE -->
    <div class="grid md:grid-cols-3 gap-8 mb-12">
      <!-- Posts estáticos atuais aqui -->
    </div>
    
    <div class="text-center">
      <a href="/blog" class="...">Ver Todas as Mensagens</a>
    </div>
  </div>
</section>

<!-- DEPOIS (nova versão com WordPress) -->
<section id="blog" class="py-24 md:py-32 bg-neutral-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Palavra do Pastor</p>
      <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Mensagens e Estudos</h3>
      <p class="text-xl text-neutral-600 max-w-2xl mx-auto">Reflexões, ensinamentos e palavra profética do Pr. Otávio Amorim</p>
    </div>
    
    <!-- Container dinâmico para posts do WordPress -->
    <div id="blog-posts-container" class="grid md:grid-cols-3 gap-8 mb-12">
      <!-- Posts carregados dinamicamente via JavaScript -->
    </div>
    
    <div class="text-center">
      <a href="https://blog.houseofprayeratl.com" target="_blank" class="inline-flex items-center bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition">
        <i class="fas fa-book-open text-xl mr-3"></i>
        Ver Todas as Mensagens
      </a>
    </div>
  </div>
</section>

<!-- Adicionar script no final do <body>, ANTES do </body> -->
<script src="/js/wordpress-integration.js"></script>
```

---

### FASE 4: Upload e Configuração Final

#### 🔟 Estrutura de Arquivos no cPanel

```
public_html/
├── index.html (homepage modificada)
├── css/
│   └── style.css (seus estilos)
├── js/
│   ├── app.js (JavaScript existente)
│   └── wordpress-integration.js (NOVO - integração WordPress)
├── images/
│   └── (suas imagens)
└── blog/ (WordPress instalado aqui)
    ├── wp-admin/
    ├── wp-content/
    ├── wp-includes/
    └── (arquivos WordPress)
```

---

#### 1️⃣1️⃣ Testar Integração

```
1. Abrir: https://houseofprayeratl.com
2. Rolar até seção "Mensagens e Estudos"
3. Verificar se aparecem os 3 últimos posts do WordPress
4. Clicar "Ver Todas as Mensagens" → Deve abrir blog.houseofprayeratl.com
5. Clicar em um post → Deve abrir post completo no WordPress
```

---

## 🎯 Fluxo do Pastor Otávio

### ✍️ Para Criar Nova Mensagem:

```
1. Acessar: blog.houseofprayeratl.com/wp-admin
2. Login: pastor / [sua senha]
3. Posts → Adicionar Novo
4. Escrever:
   - Título
   - Conteúdo (editor visual completo)
   - Upload de imagens (arrastar e soltar)
   - Categoria
5. Imagem Destacada → Adicionar imagem de capa
6. Clicar "Publicar"
7. PRONTO! Post aparece automaticamente:
   - No blog WordPress (todas as mensagens)
   - Na homepage do site (se for um dos 3 últimos)
```

---

## 🎨 Customização Visual do WordPress

### Opção 1: Usar Customizador do WordPress

```
1. Painel → Aparência → Customizar
2. Cores:
   - Cor Primária: #171717 (neutral-900)
   - Cor Secundária: #525252 (neutral-600)
   - Cor de Link: #171717
3. Tipografia:
   - Títulos: Fonte serif (Georgia ou similar)
   - Texto: Sans-serif (Arial ou similar)
4. Layout:
   - Sidebar: Remover (layout full-width)
   - Header: Simples com logo
5. Salvar
```

### Opção 2: CSS Customizado

```css
/* Adicionar em: Aparência → Customizar → CSS Adicional */

/* Cores HPC Atlanta */
:root {
  --primary: #171717;
  --secondary: #525252;
  --accent: #404040;
}

/* Header */
.site-header {
  background: #171717;
  border-bottom: 1px solid #404040;
}

/* Posts */
.entry-title a {
  color: #171717;
  font-family: Georgia, serif;
}

.entry-title a:hover {
  color: #525252;
}

/* Botões */
.wp-block-button__link {
  background: #171717;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
}

.wp-block-button__link:hover {
  background: #404040;
}

/* Categorias */
.cat-links a {
  background: #171717;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}
```

---

## 🔒 Segurança do WordPress

### Medidas Recomendadas:

```
1. Senha Forte:
   - Usar senha gerada aleatoriamente
   - Mínimo 16 caracteres
   - Salvar no gerenciador de senhas

2. SSL/HTTPS:
   - Ativar no cPanel (Let's Encrypt grátis)
   - Forçar HTTPS no WordPress

3. Plugins de Segurança:
   - Wordfence Security (gratuito)
   - ou iThemes Security (gratuito)

4. Backup Automático:
   - UpdraftPlus (gratuito)
   - Backup diário automático
   - Salvar no Google Drive ou Dropbox

5. Ocultar wp-admin:
   - Instalar WPS Hide Login (gratuito)
   - Mudar URL de login
```

---

## 📊 Vantagens desta Solução

### ✅ Benefícios:

| Aspecto | Benefício |
|---------|-----------|
| **Editor** | Visual completo do WordPress |
| **Imagens** | Upload direto (arrastar e soltar) |
| **Gerenciamento** | Interface conhecida e fácil |
| **Plugins** | Milhares disponíveis (SEO, backup, etc.) |
| **Temas** | Centenas de opções gratuitas |
| **Manutenção** | Simples e bem documentado |
| **Performance** | Site principal rápido (HTML estático) |
| **Flexibilidade** | Pastor tem controle total |
| **Custo** | $0 (WordPress é gratuito) |

---

## 🚀 Resumo de URLs

```
Site Principal:       https://houseofprayeratl.com
Blog WordPress:       https://blog.houseofprayeratl.com
Admin WordPress:      https://blog.houseofprayeratl.com/wp-admin
API WordPress:        https://blog.houseofprayeratl.com/wp-json/wp/v2/posts
```

---

## 📝 Checklist de Implementação

### Checklist Completo:

- [ ] Criar subdomínio `blog.houseofprayeratl.com`
- [ ] Instalar WordPress via Softaculous
- [ ] Configurar WordPress (idioma, timezone, permalinks)
- [ ] Instalar tema (Astra ou similar)
- [ ] Criar categorias
- [ ] Criar primeiro post de teste
- [ ] Testar WordPress REST API
- [ ] Criar arquivo `wordpress-integration.js`
- [ ] Upload para `/public_html/js/`
- [ ] Modificar `index.html` (seção blog)
- [ ] Upload `index.html` atualizado
- [ ] Testar integração na homepage
- [ ] Testar link "Ver Todas as Mensagens"
- [ ] Configurar SSL/HTTPS
- [ ] Instalar plugins de segurança
- [ ] Configurar backup automático
- [ ] Treinar Pastor Otávio no WordPress

---

## 🎓 Tutoriais para o Pastor

### Como Criar um Post:

```
PASSO A PASSO SIMPLES:

1. Abrir: blog.houseofprayeratl.com/wp-admin
2. Login (usuário e senha)
3. Clicar "Posts" → "Adicionar Novo"
4. Escrever título (ex: "O Poder da Oração")
5. Escrever conteúdo (editor visual como Word)
6. Formatação:
   - Selecionar texto → Negrito, itálico, etc.
   - Adicionar títulos (dropdown no topo)
   - Inserir listas (botões na toolbar)
7. Adicionar imagens:
   - Clicar "+" → "Imagem"
   - Arrastar foto do computador
   - OU clicar "Upload" e escolher arquivo
8. Imagem de capa:
   - Lado direito → "Imagem destacada"
   - Clicar "Definir imagem destacada"
   - Upload ou escolher da biblioteca
9. Categoria:
   - Lado direito → "Categorias"
   - Marcar checkbox (Mensagens, Adoração, etc.)
10. PUBLICAR:
    - Clicar botão azul "Publicar" (canto superior direito)
    - Confirmar "Publicar" novamente
    - PRONTO! Post está no ar!
```

---

## 🆘 Suporte e Ajuda

### Recursos Úteis:

- **WordPress em Português:** https://br.wordpress.org/
- **Documentação:** https://br.wordpress.org/support/
- **Tutoriais YouTube:** Buscar "WordPress tutorial português"
- **Fórum:** https://br.forums.wordpress.org/

---

## 🎉 Conclusão

Esta solução híbrida oferece o melhor dos dois mundos:

✅ **Site principal rápido** (HTML estático no cPanel)  
✅ **Blog profissional** (WordPress com todos os recursos)  
✅ **Fácil de gerenciar** (Pastor usa WordPress)  
✅ **Imagens funcionam** (upload direto no WordPress)  
✅ **Integração perfeita** (API REST)  
✅ **Custo zero** (WordPress é gratuito)  

**Resultado:** Sistema completo, profissional e fácil de usar! 🚀

---

**Precisa de ajuda com algum passo específico? Estou aqui para ajudar!**
