// WordPress Integration - HPC Atlanta
// Busca últimos posts do WordPress e exibe na homepage

const WORDPRESS_API = 'https://blog.houseofprayeratl.com/wp-json/wp/v2';

/**
 * Buscar posts do WordPress via REST API
 * @param {number} limit - Número de posts a buscar (padrão: 3)
 * @returns {Promise<Array>} - Array de posts formatados
 */
async function fetchWordPressPosts(limit = 3) {
  try {
    // Buscar posts com imagens e categorias incluídas
    const response = await fetch(`${WORDPRESS_API}/posts?per_page=${limit}&_embed`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // Transformar posts para formato usado no site
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: stripHtmlAndLimit(post.excerpt.rendered, 200),
      content: post.content.rendered,
      date: formatarData(post.date),
      link: `https://blog.houseofprayeratl.com/${post.slug}`,
      slug: post.slug,
      image: getImageUrl(post),
      category: getCategory(post),
      readTime: calcularTempoLeitura(post.content.rendered)
    }));
  } catch (error) {
    console.error('Erro ao buscar posts do WordPress:', error);
    return [];
  }
}

/**
 * Remover HTML e limitar caracteres
 */
function stripHtmlAndLimit(html, limit) {
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > limit ? text.substring(0, limit) + '...' : text;
}

/**
 * Formatar data para português brasileiro
 */
function formatarData(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Obter URL da imagem destacada
 */
function getImageUrl(post) {
  // Tentar pegar imagem destacada
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  
  // Imagem padrão se não houver
  return 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa';
}

/**
 * Obter primeira categoria do post
 */
function getCategory(post) {
  if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
    return post._embedded['wp:term'][0][0].name;
  }
  return 'Mensagens';
}

/**
 * Calcular tempo de leitura baseado no conteúdo
 */
function calcularTempoLeitura(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // 200 palavras por minuto
  return `${minutes} min`;
}

/**
 * Renderizar posts na homepage
 */
async function renderizarPostsHomepage() {
  const postsContainer = document.getElementById('blog-posts-container');
  
  if (!postsContainer) {
    console.warn('Container #blog-posts-container não encontrado');
    return;
  }
  
  // Mostrar loading
  postsContainer.innerHTML = `
    <div class="col-span-3 text-center py-12">
      <i class="fas fa-spinner fa-spin text-4xl text-neutral-400 mb-4"></i>
      <p class="text-neutral-600">Carregando mensagens do blog...</p>
    </div>
  `;
  
  // Buscar posts
  const posts = await fetchWordPressPosts(3);
  
  // Se não houver posts
  if (posts.length === 0) {
    postsContainer.innerHTML = `
      <div class="col-span-3 text-center py-12">
        <i class="fas fa-book-open text-6xl text-neutral-300 mb-6"></i>
        <h3 class="text-2xl font-bold text-neutral-700 mb-3">Nenhuma mensagem publicada ainda</h3>
        <p class="text-neutral-600">Em breve teremos novas mensagens disponíveis.</p>
        <p class="text-sm text-neutral-500 mt-4">
          <i class="fas fa-info-circle mr-2"></i>
          Verifique se o WordPress está configurado corretamente.
        </p>
      </div>
    `;
    return;
  }
  
  // Renderizar cards dos posts
  postsContainer.innerHTML = posts.map(post => `
    <a href="${post.link}" target="_blank" rel="noopener noreferrer" 
       class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div class="relative h-64 overflow-hidden">
        <img 
          src="${post.image}" 
          alt="${post.title}" 
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onerror="this.src='https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa'"
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
  
  console.log(`✅ ${posts.length} posts carregados com sucesso do WordPress`);
}

/**
 * Inicializar quando página carrega
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderizarPostsHomepage);
} else {
  renderizarPostsHomepage();
}

// Exportar funções para uso externo (opcional)
window.WordPressIntegration = {
  fetchPosts: fetchWordPressPosts,
  renderPosts: renderizarPostsHomepage
};
