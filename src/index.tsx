import { Hono } from 'hono'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)

// Admin login route
app.get('/admin', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin - HPC Atlanta Blog</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 min-h-screen flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <i class="fas fa-church text-6xl text-white mb-4"></i>
          <h1 class="text-3xl font-bold text-white mb-2">HPC Atlanta</h1>
          <p class="text-neutral-300">Painel Administrativo do Blog</p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <!-- Tab Navigation -->
          <div class="flex mb-6 bg-neutral-100 rounded-lg p-1">
            <button onclick="showLoginTab('credentials')" id="tab-credentials" class="flex-1 py-2 rounded-lg font-semibold transition bg-white shadow">
              Login com Senha
            </button>
            <button onclick="showLoginTab('token')" id="tab-token" class="flex-1 py-2 rounded-lg font-semibold transition text-neutral-600">
              Login com Token
            </button>
          </div>

          <!-- Credentials Login Form -->
          <form id="loginForm" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                <i class="fas fa-user mr-2"></i>Usuário
              </label>
              <input 
                type="text" 
                id="username" 
                required
                class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
                placeholder="Digite seu usuário"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                <i class="fas fa-lock mr-2"></i>Senha
              </label>
              <input 
                type="password" 
                id="password" 
                required
                class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
                placeholder="Digite sua senha"
              />
            </div>

            <button 
              type="submit"
              class="w-full bg-neutral-900 text-white py-4 rounded-lg font-bold hover:bg-neutral-800 transition transform hover:scale-105 shadow-lg"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>Entrar no Painel
            </button>
          </form>

          <!-- Token Login Form -->
          <form id="tokenForm" class="space-y-6 hidden">
            <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
              <p class="text-sm text-blue-800">
                <i class="fas fa-info-circle mr-2"></i>
                <strong>Já tem um token?</strong> Cole-o abaixo para fazer login automaticamente.
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                <i class="fas fa-key mr-2"></i>Token de Acesso
              </label>
              <textarea 
                id="tokenInput" 
                required
                rows="4"
                class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition font-mono text-sm"
                placeholder="Cole seu token aqui..."
              ></textarea>
            </div>

            <button 
              type="submit"
              class="w-full bg-neutral-900 text-white py-4 rounded-lg font-bold hover:bg-neutral-800 transition transform hover:scale-105 shadow-lg"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>Entrar com Token
            </button>

            <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <p class="text-xs text-yellow-800">
                <i class="fas fa-shield-alt mr-2"></i>
                <strong>Primeira vez?</strong> Faça login com usuário e senha para gerar seu token de acesso.
              </p>
            </div>
          </form>

          <div id="error-message" class="hidden mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p class="text-red-700 text-sm font-semibold">
              <i class="fas fa-exclamation-circle mr-2"></i>
              <span id="error-text">Usuário ou senha incorretos</span>
            </p>
          </div>

          <div class="mt-6 pt-6 border-t border-neutral-200">
            <p class="text-xs text-neutral-500 text-center">
              <i class="fas fa-shield-alt mr-1"></i>
              Acesso restrito apenas para administradores autorizados
            </p>
          </div>
        </div>

        <div class="text-center mt-6">
          <a href="/" class="text-white hover:text-neutral-300 transition">
            <i class="fas fa-arrow-left mr-2"></i>Voltar ao site
          </a>
        </div>
      </div>

      <script>
        // Tab switching
        function showLoginTab(tab) {
          const credForm = document.getElementById('loginForm');
          const tokenForm = document.getElementById('tokenForm');
          const credTab = document.getElementById('tab-credentials');
          const tokenTab = document.getElementById('tab-token');
          
          if (tab === 'credentials') {
            credForm.classList.remove('hidden');
            tokenForm.classList.add('hidden');
            credTab.classList.add('bg-white', 'shadow');
            credTab.classList.remove('text-neutral-600');
            tokenTab.classList.remove('bg-white', 'shadow');
            tokenTab.classList.add('text-neutral-600');
          } else {
            credForm.classList.add('hidden');
            tokenForm.classList.remove('hidden');
            tokenTab.classList.add('bg-white', 'shadow');
            tokenTab.classList.remove('text-neutral-600');
            credTab.classList.remove('bg-white', 'shadow');
            credTab.classList.add('text-neutral-600');
          }
        }

        // Check if already has token in localStorage
        window.addEventListener('DOMContentLoaded', () => {
          const token = localStorage.getItem('hpc_admin_token');
          if (token) {
            // Verify token and redirect if valid
            fetch('/api/auth/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token })
            })
            .then(res => res.json())
            .then(data => {
              if (data.success && data.valid) {
                window.location.href = '/admin/dashboard';
              }
            });
          }
        });

        // Login with credentials
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const errorDiv = document.getElementById('error-message');
          const errorText = document.getElementById('error-text');
          const submitBtn = e.target.querySelector('button[type="submit"]');
          
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Entrando...';
          
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
              // Save token in localStorage
              localStorage.setItem('hpc_admin_token', data.token);
              
              // Show success message with token
              errorDiv.classList.remove('hidden', 'bg-red-50', 'border-red-200');
              errorDiv.classList.add('bg-green-50', 'border-green-200');
              errorText.classList.remove('text-red-700');
              errorText.classList.add('text-green-700');
              errorText.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Token gerado com sucesso! Redirecionando...';
              
              // Show token details
              setTimeout(() => {
                alert('✅ Token gerado e salvo!\\n\\n📧 Email: ' + data.email + '\\n🔑 Token: ' + data.token.substring(0, 50) + '...\\n\\n⚠️  Seu token foi salvo localmente. Você permanecerá logado por 7 dias.');
                window.location.href = '/admin/dashboard';
              }, 1000);
            } else {
              errorDiv.classList.remove('hidden');
              errorText.textContent = data.error || 'Credenciais inválidas';
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar no Painel';
            }
          } catch (error) {
            errorDiv.classList.remove('hidden');
            errorText.textContent = 'Erro ao conectar com servidor';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar no Painel';
          }
        });

        // Login with token
        document.getElementById('tokenForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const token = document.getElementById('tokenInput').value.trim();
          const errorDiv = document.getElementById('error-message');
          const errorText = document.getElementById('error-text');
          const submitBtn = e.target.querySelector('button[type="submit"]');
          
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Verificando...';
          
          try {
            const response = await fetch('/api/auth/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token })
            });
            
            const data = await response.json();
            
            if (data.success && data.valid) {
              // Save token in localStorage
              localStorage.setItem('hpc_admin_token', token);
              
              errorDiv.classList.remove('hidden', 'bg-red-50', 'border-red-200');
              errorDiv.classList.add('bg-green-50', 'border-green-200');
              errorText.classList.remove('text-red-700');
              errorText.classList.add('text-green-700');
              errorText.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Token válido! Entrando...';
              
              setTimeout(() => {
                window.location.href = '/admin/dashboard';
              }, 1000);
            } else {
              errorDiv.classList.remove('hidden');
              errorText.textContent = 'Token inválido ou expirado. Faça login com usuário e senha para gerar um novo.';
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar com Token';
            }
          } catch (error) {
            errorDiv.classList.remove('hidden');
            errorText.textContent = 'Erro ao verificar token';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar com Token';
          }
        });

        // Make showLoginTab global
        window.showLoginTab = showLoginTab;
      </script>
    </body>
    </html>
  `)
})

// Admin dashboard route
app.get('/admin/dashboard', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard Admin - HPC Atlanta Blog</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-neutral-50">
      <!-- Check authentication -->
      <script>
        // Verify token on page load
        const token = localStorage.getItem('hpc_admin_token');
        if (!token) {
          window.location.href = '/admin';
        } else {
          // Verify token is still valid
          fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          })
          .then(res => res.json())
          .then(data => {
            if (!data.success || !data.valid) {
              localStorage.removeItem('hpc_admin_token');
              window.location.href = '/admin';
            }
          });
        }
      </script>

      <!-- Top Navigation -->
      <nav class="bg-white border-b border-neutral-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-3">
              <i class="fas fa-church text-2xl text-neutral-900"></i>
              <div>
                <h1 class="text-lg font-bold text-neutral-900">HPC Atlanta</h1>
                <p class="text-xs text-neutral-500">Painel Administrativo</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <a href="/" target="_blank" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-external-link-alt mr-2"></i>Ver Site
              </a>
              <button onclick="logout()" class="text-red-600 hover:text-red-700 transition font-semibold">
                <i class="fas fa-sign-out-alt mr-2"></i>Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Welcome Header -->
        <div class="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white mb-8">
          <h2 class="text-3xl font-bold mb-2">Bem-vindo, Pastor Otávio!</h2>
          <p class="text-neutral-300">Gerencie as mensagens e estudos do blog da HPC Atlanta</p>
        </div>

        <!-- Action Buttons -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <button onclick="showNewPostForm()" class="bg-white border-2 border-neutral-900 text-neutral-900 p-8 rounded-xl hover:bg-neutral-900 hover:text-white transition transform hover:scale-105 shadow-lg group">
            <i class="fas fa-plus-circle text-5xl mb-4 group-hover:scale-110 transition"></i>
            <h3 class="text-xl font-bold mb-2">Nova Mensagem</h3>
            <p class="text-sm opacity-75">Criar um novo post para o blog</p>
          </button>

          <button onclick="showPostsList()" class="bg-white border-2 border-neutral-200 text-neutral-900 p-8 rounded-xl hover:border-neutral-900 transition transform hover:scale-105 shadow-lg group">
            <i class="fas fa-list text-5xl mb-4 group-hover:scale-110 transition"></i>
            <h3 class="text-xl font-bold mb-2">Gerenciar Posts</h3>
            <p class="text-sm opacity-75">Ver, editar ou deletar mensagens existentes</p>
          </button>
        </div>

        <!-- Statistics Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-md border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-file-alt text-3xl text-blue-600"></i>
              <span class="text-3xl font-bold text-neutral-900">3</span>
            </div>
            <p class="text-sm text-neutral-600 font-semibold">Total de Posts</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-star text-3xl text-yellow-600"></i>
              <span class="text-3xl font-bold text-neutral-900">2</span>
            </div>
            <p class="text-sm text-neutral-600 font-semibold">Posts em Destaque</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-tags text-3xl text-green-600"></i>
              <span class="text-3xl font-bold text-neutral-900">3</span>
            </div>
            <p class="text-sm text-neutral-600 font-semibold">Categorias</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-calendar text-3xl text-purple-600"></i>
              <span class="text-3xl font-bold text-neutral-900">Jan</span>
            </div>
            <p class="text-sm text-neutral-600 font-semibold">Último Post</p>
          </div>
        </div>

        <!-- Recent Posts Preview -->
        <div class="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
          <h3 class="text-2xl font-bold text-neutral-900 mb-6">
            <i class="fas fa-clock mr-3 text-neutral-600"></i>Posts Recentes
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
              <div class="flex-1">
                <h4 class="font-bold text-neutral-900 mb-1">A Casa de Oração Para Todas as Nações</h4>
                <p class="text-sm text-neutral-600">
                  <i class="far fa-calendar mr-2"></i>15 de janeiro de 2025
                  <span class="mx-2">•</span>
                  <span class="px-2 py-1 bg-neutral-900 text-white text-xs rounded-full">Mensagens</span>
                </p>
              </div>
              <div class="flex gap-2">
                <button class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
              <div class="flex-1">
                <h4 class="font-bold text-neutral-900 mb-1">O Poder da Adoração Autêntica</h4>
                <p class="text-sm text-neutral-600">
                  <i class="far fa-calendar mr-2"></i>8 de janeiro de 2025
                  <span class="mx-2">•</span>
                  <span class="px-2 py-1 bg-neutral-900 text-white text-xs rounded-full">Adoração</span>
                </p>
              </div>
              <div class="flex gap-2">
                <button class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
              <div class="flex-1">
                <h4 class="font-bold text-neutral-900 mb-1">Batismo: Declaração Pública de Fé</h4>
                <p class="text-sm text-neutral-600">
                  <i class="far fa-calendar mr-2"></i>1 de janeiro de 2025
                  <span class="mx-2">•</span>
                  <span class="px-2 py-1 bg-neutral-900 text-white text-xs rounded-full">Batismo</span>
                </p>
              </div>
              <div class="flex gap-2">
                <button class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Help -->
        <div class="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 class="font-bold text-blue-900 mb-3">
            <i class="fas fa-info-circle mr-2"></i>Como usar o painel administrativo
          </h4>
          <ul class="text-sm text-blue-800 space-y-2">
            <li><i class="fas fa-check mr-2"></i>Clique em "Nova Mensagem" para criar um novo post</li>
            <li><i class="fas fa-check mr-2"></i>Use "Gerenciar Posts" para editar ou deletar mensagens existentes</li>
            <li><i class="fas fa-check mr-2"></i>Os posts aparecem automaticamente no site após serem salvos</li>
            <li><i class="fas fa-check mr-2"></i>Use formatação HTML no conteúdo para títulos, listas e destaques</li>
          </ul>
        </div>
      </div>

      <script>
        function logout() {
          if (confirm('Tem certeza que deseja sair?\\n\\nSeu token permanecerá válido e você pode fazer login novamente sem senha.')) {
            localStorage.removeItem('hpc_admin_token');
            window.location.href = '/admin';
          }
        }

        function showNewPostForm() {
          alert('Funcionalidade de criar novo post será implementada em breve!\\n\\nPor enquanto, entre em contato com o desenvolvedor para adicionar novos posts.');
        }

        function showPostsList() {
          alert('Funcionalidade de gerenciar posts será implementada em breve!\\n\\nPor enquanto, os posts existentes estão funcionando perfeitamente no site.');
        }
      </script>
    </body>
    </html>
  `)
})

// Authentication API Routes

// Login with credentials and generate token
app.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json()
    const { username, password } = body
    
    // Verify credentials
    if (username === 'pastor' && password === 'HPC@2025!') {
      // Generate access token
      const token = generateSimpleToken({ username, email: 'infipros@solihull.pt', role: 'admin' })
      
      // Log token for email (in production, send via email service)
      console.log('='.repeat(80))
      console.log('🔐 NOVO TOKEN GERADO')
      console.log('='.repeat(80))
      console.log(`Email: infipros@solihull.pt`)
      console.log(`Token: ${token}`)
      console.log(`Validade: 7 dias`)
      console.log('='.repeat(80))
      console.log('⚠️  COPIE ESTE TOKEN - Ele não será mostrado novamente!')
      console.log('='.repeat(80))
      
      return c.json({ 
        success: true, 
        token,
        message: 'Login realizado com sucesso. Token gerado!',
        email: 'infipros@solihull.pt'
      })
    } else {
      return c.json({ success: false, error: 'Credenciais inválidas' }, 401)
    }
  } catch (error) {
    return c.json({ success: false, error: 'Erro ao fazer login' }, 500)
  }
})

// Verify token
app.post('/api/auth/verify', async (c) => {
  try {
    const body = await c.req.json()
    const { token } = body
    
    const payload = verifySimpleToken(token)
    
    if (payload) {
      return c.json({ success: true, valid: true, user: payload })
    } else {
      return c.json({ success: false, valid: false, error: 'Token inválido ou expirado' }, 401)
    }
  } catch (error) {
    return c.json({ success: false, valid: false, error: 'Erro ao verificar token' }, 500)
  }
})

// Simple token generation (no external dependencies)
function generateSimpleToken(payload: any): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  
  const tokenPayload = {
    ...payload,
    iat: Date.now(),
    exp: exp
  }
  
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
  const encodedPayload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64')
  const signature = Buffer.from(`${encodedHeader}.${encodedPayload}.hpc-secret-2025`).toString('base64')
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function verifySimpleToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now()) {
      return null
    }
    
    return payload
  } catch (error) {
    return null
  }
}

// API Routes for Blog Management

// GET all posts
app.get('/api/posts', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    ).all()
    
    return c.json({ success: true, posts: results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch posts' }, 500)
  }
})

// GET single post by slug
app.get('/api/posts/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')
    const post = await c.env.DB.prepare(
      'SELECT * FROM blog_posts WHERE slug = ?'
    ).bind(slug).first()
    
    if (!post) {
      return c.json({ success: false, error: 'Post not found' }, 404)
    }
    
    return c.json({ success: true, post })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch post' }, 500)
  }
})

// CREATE new post
app.post('/api/posts', async (c) => {
  try {
    const body = await c.req.json()
    const { title, slug, excerpt, content, category, image_url, read_time, featured } = body
    
    // Generate slug from title if not provided
    const postSlug = slug || title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    
    await c.env.DB.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, read_time, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      title,
      postSlug,
      excerpt,
      content,
      category,
      image_url || 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
      read_time || '5 min',
      featured ? 1 : 0
    ).run()
    
    return c.json({ success: true, message: 'Post created successfully', slug: postSlug })
  } catch (error) {
    console.error('Error creating post:', error)
    return c.json({ success: false, error: 'Failed to create post' }, 500)
  }
})

// UPDATE post
app.put('/api/posts/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { title, slug, excerpt, content, category, image_url, read_time, featured } = body
    
    await c.env.DB.prepare(`
      UPDATE blog_posts 
      SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, 
          image_url = ?, read_time = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      title,
      slug,
      excerpt,
      content,
      category,
      image_url,
      read_time,
      featured ? 1 : 0,
      id
    ).run()
    
    return c.json({ success: true, message: 'Post updated successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update post' }, 500)
  }
})

// DELETE post
app.delete('/api/posts/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    await c.env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: 'Post deleted successfully' })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete post' }, 500)
  }
})

app.get('/', async (c) => {
  // Fetch latest 3 blog posts from database
  let blogPosts = []
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT 3'
    ).all()
    blogPosts = results
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // Use empty array if database fails
  }

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return c.render(
    <div class="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav class="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center gap-3">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" 
                alt="House of Prayer - New Destiny Logo" 
                class="h-12 w-12 object-contain"
              />
              <h1 class="text-2xl font-serif font-bold tracking-tight text-neutral-900">HPC Atlanta</h1>
            </div>
            <div class="hidden md:flex space-x-8 items-center">
              <a href="#discover" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Descobrir</a>
              <a href="#team" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Servir</a>
              <a href="#baptism" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Batismo</a>
              <a href="#blog" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Palavra</a>
              <a href="#groups" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Grupos</a>
              <a href="#connect" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Conectar</a>
              <button onclick="openModal('give')" class="bg-neutral-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-neutral-800 transition transform hover:scale-105 shadow-md flex items-center gap-2">
                <i class="fas fa-hand-holding-heart"></i>
                Ofertar
              </button>
            </div>
            <button id="mobile-menu-btn" class="md:hidden text-neutral-700">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-neutral-200">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a href="#discover" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Descobrir</a>
            <a href="#team" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Servir</a>
            <a href="#baptism" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Batismo</a>
            <a href="#blog" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Palavra</a>
            <a href="#groups" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Grupos</a>
            <a href="#connect" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Conectar</a>
            <button onclick="openModal('give')" class="w-full text-left px-3 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition font-semibold flex items-center gap-2">
              <i class="fas fa-hand-holding-heart"></i>
              Ofertar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="pt-20 relative overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div class="absolute inset-0 z-0">
          <img 
            src="https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa" 
            alt="HPC Atlanta - House of Prayer for all Nations - Adoração e Louvor"
            class="w-full h-full object-cover"
            onError="this.style.display='none'; this.parentElement.style.background='linear-gradient(to bottom right, rgb(38, 38, 38), rgb(64, 64, 64), rgb(23, 23, 23))'"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-neutral-900/85 via-neutral-800/75 to-neutral-900/85"></div>
        </div>
        
        {/* Content */}
        <div class="relative z-10 w-full text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div class="text-center max-w-4xl mx-auto">
            <p class="text-sm font-medium tracking-widest text-neutral-300 uppercase mb-6">HPC - House of Prayer for all Nations</p>
            <h2 class="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Dê Seu Próximo Passo.</h2>
            <p class="text-xl md:text-2xl mb-12 text-neutral-200 font-light leading-relaxed">
              Uma casa de oração para todas as nações. Venha viver o que Deus tem para você!
            </p>
            
            {/* Call to Action Buttons */}
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <button onclick="openModal('discover')" class="bg-white text-neutral-900 px-10 py-4 rounded-lg text-lg font-bold hover:bg-neutral-100 transition transform hover:scale-105 shadow-xl">
                Faça Parte
              </button>
              <a href="#discover" class="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-neutral-900 transition transform hover:scale-105">
                Conheça a HPC
              </a>
            </div>

            {/* Service Times Badge */}
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 inline-block">
              <p class="text-sm font-medium text-neutral-200 mb-3 uppercase tracking-wide">
                <i class="far fa-clock mr-2"></i>
                Nossos Cultos
              </p>
              <div class="flex flex-col sm:flex-row gap-4 text-center">
                <div>
                  <p class="text-lg font-bold text-white">Domingo</p>
                  <p class="text-neutral-200">10:00 AM</p>
                </div>
                <div class="hidden sm:block text-neutral-400">|</div>
                <div>
                  <p class="text-lg font-bold text-white">Terça</p>
                  <p class="text-neutral-200">8:00 PM</p>
                </div>
                <div class="hidden sm:block text-neutral-400">|</div>
                <div>
                  <p class="text-lg font-bold text-white">Quinta</p>
                  <p class="text-neutral-200">8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Discover Grace Church Section */}
      <section id="discover" class="py-24 md:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Bem-vindo</p>
              <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-8 leading-tight">Descubra a HPC</h3>
              <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
                Na HPC Atlanta, somos uma igreja brasileira apaixonada por criar uma casa de oração para todas as nações. Venha celebrar e experimentar o amor de Deus conosco!
              </p>
              <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-8 mb-8">
                <p class="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wide">
                  <i class="far fa-calendar mr-2"></i>
                  Horários de Culto
                </p>
                <p class="text-xl font-semibold text-neutral-900 mb-2">Domingo às 10:00 AM</p>
                <p class="text-neutral-600 mb-1">Terça-feira às 8:00 PM</p>
                <p class="text-neutral-600">Quinta-feira às 8:00 PM</p>
              </div>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                Pastores: Pr. Otávio Amorim e Natália Müller. Uma comunidade onde todos são bem-vindos!
              </p>
              <button class="btn-primary" onclick="openModal('discover')">
                Inscreva-se Agora
              </button>
            </div>
            <div class="relative">
              <div class="aspect-square bg-gradient-to-br from-neutral-300 via-neutral-200 to-neutral-100 rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/6bfe356fa6a0d80d8f425c6c3735ada0" 
                  alt="Pr. Otávio Amorim - Pastor HPC Atlanta" 
                  class="w-full h-full object-cover object-center"
                  style="object-position: center 30%;"
                />
              </div>
              <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-neutral-900 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dream Team Section */}
      <section id="team" class="py-24 md:py-32 bg-neutral-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="order-2 md:order-1 relative">
              <div class="aspect-square bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-800 rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/b49314cd2e986919e25794a9b6e028fc" 
                  alt="Adoração na HPC Atlanta - Momento de louvor intenso" 
                  class="w-full h-full object-cover"
                  style="object-position: center 40%;"
                />
              </div>
              <div class="absolute -top-6 -left-6 w-32 h-32 bg-neutral-100 rounded-lg -z-10"></div>
            </div>
            <div class="order-1 md:order-2">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Oportunidades de Servir</p>
              <h3 class="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Faça Parte da Equipe</h3>
              <p class="text-lg text-neutral-300 mb-8 leading-relaxed">
                Explore a vida da HPC Atlanta, incluindo nossos ministérios vibrantes, eventos futuros e oportunidades de servir no Reino de Deus.
              </p>
              <p class="text-neutral-300 mb-8 leading-relaxed">
                Seja parte de uma casa de oração para todas as nações. Venha usar seus dons e talentos para abençoar vidas e glorificar a Deus!
              </p>
              <button class="bg-white text-neutral-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-neutral-100 transition tracking-wide" onclick="openModal('team')">
                Junte-se à Equipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Baptism Section */}
      <section id="baptism" class="py-24 md:py-32 bg-neutral-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Um Passo de Fé</p>
            <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Batismo</h3>
            <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
              Adoraríamos que você participasse do Batismo!
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="relative">
              <div class="aspect-square bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 rounded-lg shadow-xl overflow-hidden border border-blue-200">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/ae40562804a7da5523cd995eb819d9b5" 
                  alt="Batismo na HPC Atlanta - Momento poderoso de nova vida em Cristo" 
                  class="w-full h-full object-cover"
                  style="object-position: center 45%;"
                />
              </div>
              <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-neutral-900 rounded-lg -z-10"></div>
            </div>
            <div>
              <div class="bg-white border border-neutral-200 rounded-lg p-8 mb-8 shadow-sm">
                <p class="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wide">
                  <i class="fas fa-book-bible mr-2"></i>
                  Atos 2:38
                </p>
                <p class="text-lg text-neutral-700 italic leading-relaxed">
                  "Arrependam-se, e cada um de vocês seja batizado em nome de Jesus Cristo para perdão dos seus pecados, e receberão o dom do Espírito Santo."
                </p>
              </div>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                O batismo é um passo importante na jornada de fé. É uma declaração pública do seu compromisso com Cristo e uma celebração da nova vida que você encontrou Nele.
              </p>
              <button class="btn-primary" onclick="openModal('baptism')">
                Quero ser Batizado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section class="py-24 md:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Nossa Comunidade</p>
            <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Momentos da HPC</h3>
            <p class="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Confira os momentos especiais da nossa igreja através do Instagram
            </p>
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="inline-flex items-center text-neutral-900 hover:text-neutral-600 transition font-semibold">
              <i class="fab fa-instagram text-2xl mr-2"></i>
              @hpcatlanta
            </a>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Instagram Photo 1 - Worship with hands raised */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa" 
                alt="HPC Atlanta - Adoração com Mãos Levantadas"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Louvor e Adoração</p>
              </div>
            </a>

            {/* Instagram Photo 2 - Preacher Blue Blazer */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/f48ffac985009bf0799538a2150bb9fb" 
                alt="HPC Atlanta - Pregador Ministrando"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Ministração</p>
              </div>
            </a>

            {/* Instagram Photo 3 - Worship moment intense */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/b49314cd2e986919e25794a9b6e028fc" 
                alt="HPC Atlanta - Momento Intenso de Adoração"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Adoração</p>
              </div>
            </a>

            {/* Instagram Photo 4 - Baptism */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/ae40562804a7da5523cd995eb819d9b5" 
                alt="HPC Atlanta - Batismo"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Batismo</p>
              </div>
            </a>

          </div>

          <div class="text-center mt-12">
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="inline-flex items-center bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition">
              <i class="fab fa-instagram text-xl mr-3"></i>
              Siga-nos no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section - Pastor's Messages */}
      <section id="blog" class="py-24 md:py-32 bg-neutral-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Palavra do Pastor</p>
            <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Mensagens e Estudos</h3>
            <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
              Reflexões, ensinamentos e palavra profética do Pr. Otávio Amorim
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.length > 0 ? (
              blogPosts.map((post: any) => (
                <a href={`/blog/${post.slug}`} class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div class="relative h-64 overflow-hidden">
                    <img 
                      src={post.image_url || 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa'} 
                      alt={post.title}
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div class="absolute top-4 left-4 bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div class="p-6 flex-1 flex flex-col">
                    <div class="flex items-center text-sm text-neutral-500 mb-3">
                      <i class="far fa-calendar mr-2"></i>
                      <span>{formatDate(post.created_at)}</span>
                      <span class="mx-2">•</span>
                      <i class="far fa-clock mr-2"></i>
                      <span>{post.read_time}</span>
                    </div>
                    <h4 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-600 transition">
                      {post.title}
                    </h4>
                    <p class="text-neutral-600 mb-4 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div class="flex items-center text-neutral-900 font-semibold group-hover:gap-2 transition-all">
                      <span>Ler mensagem</span>
                      <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div class="col-span-3 text-center py-12">
                <i class="fas fa-book-open text-6xl text-neutral-300 mb-4"></i>
                <p class="text-xl text-neutral-500">Nenhuma mensagem publicada ainda.</p>
              </div>
            )}
          </div>

          <div class="text-center">
            <a href="/blog" class="inline-flex items-center bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition">
              <i class="fas fa-book-open text-xl mr-3"></i>
              Ver Todas as Mensagens
            </a>
          </div>
        </div>
      </section>

      {/* Connection Groups Section */}
      <section id="groups" class="py-24 md:py-32 bg-neutral-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Comunidade</p>
            <h3 class="text-4xl md:text-5xl font-serif font-bold mb-6">Grupos de Conexão</h3>
            <p class="text-2xl font-serif font-semibold mb-4 text-neutral-100">Somos Melhores Juntos</p>
            <p class="text-lg text-neutral-300 max-w-2xl mx-auto">
              As inscrições estão abertas para grupos de outono!
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-8 hover:bg-neutral-750 transition">
              <i class="fas fa-book-open text-4xl mb-6 text-neutral-400"></i>
              <h4 class="text-xl font-semibold mb-4 text-neutral-100">Estudo Bíblico</h4>
              <p class="text-neutral-300 leading-relaxed">
                Aprofunde-se na Palavra de Deus com outros crentes em um ambiente acolhedor e encorajador.
              </p>
            </div>
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-8 hover:bg-neutral-750 transition">
              <i class="fas fa-heart text-4xl mb-6 text-neutral-400"></i>
              <h4 class="text-xl font-semibold mb-4 text-neutral-100">Grupos de Atividades</h4>
              <p class="text-neutral-300 leading-relaxed">
                Construa amizades através de interesses compartilhados e atividades divertidas.
              </p>
            </div>
            <div class="bg-neutral-800 border border-neutral-700 rounded-lg p-8 hover:bg-neutral-750 transition">
              <i class="fas fa-hands-helping text-4xl mb-6 text-neutral-400"></i>
              <h4 class="text-xl font-semibold mb-4 text-neutral-100">Grupos de Serviço</h4>
              <p class="text-neutral-300 leading-relaxed">
                Sirva juntos e faça a diferença na comunidade enquanto cresce em fé.
              </p>
            </div>
          </div>
          <div class="text-center">
            <p class="text-lg mb-8 text-neutral-300">
              Construa amizades, compartilhe a vida e desenvolva relacionamentos autênticos.
            </p>
            <button class="bg-white text-neutral-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-neutral-100 transition tracking-wide" onclick="openModal('groups')">
              Encontre Seu Grupo
            </button>
          </div>
        </div>
      </section>

      {/* Get Connected Section */}
      <section id="connect" class="py-24 md:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Faça Parte</p>
            <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Conecte-se Conosco</h3>
            <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
              Não importa em que fase da vida você esteja, queremos ajudá-lo a dar o próximo passo.
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-10 bg-neutral-50 border border-neutral-200 rounded-lg hover:shadow-xl hover:border-neutral-300 transition">
              <i class="fas fa-id-card text-5xl text-neutral-700 mb-6"></i>
              <h4 class="text-xl font-semibold text-neutral-900 mb-4">Cartão de Conexão</h4>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                Preencha um cartão de conexão para nos contar mais sobre você.
              </p>
              <button class="btn-secondary" onclick="openModal('connect')">
                Preencher Cartão
              </button>
            </div>
            <div class="text-center p-10 bg-neutral-50 border border-neutral-200 rounded-lg hover:shadow-xl hover:border-neutral-300 transition">
              <i class="fas fa-praying-hands text-5xl text-neutral-700 mb-6"></i>
              <h4 class="text-xl font-semibold text-neutral-900 mb-4">Pedidos de Oração</h4>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                Compartilhe seus pedidos de oração conosco. Adoraríamos orar por você.
              </p>
              <button class="btn-secondary" onclick="openModal('prayer')">
                Enviar Pedido
              </button>
            </div>
            <div class="text-center p-10 bg-neutral-50 border border-neutral-200 rounded-lg hover:shadow-xl hover:border-neutral-300 transition">
              <i class="fas fa-hand-holding-heart text-5xl text-neutral-700 mb-6"></i>
              <h4 class="text-xl font-semibold text-neutral-900 mb-4">Contribuir</h4>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                Apoie o ministério da HPC Atlanta com sua generosidade.
              </p>
              <button class="btn-secondary" onclick="openModal('give')">
                Fazer Doação
              </button>
            </div>
          </div>
          <div class="mt-16 bg-neutral-900 rounded-lg p-10 md:p-12 text-white">
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="mb-8 md:mb-0 md:mr-8">
                <h4 class="text-2xl font-serif font-bold mb-3">Guia HPC Vivencial</h4>
                <p class="text-neutral-300 leading-relaxed">
                  Método completo HPC: Habitar na Palavra, Perceber o Chamado, Cumprir em Oração. Guia transformador de 90 dias.
                </p>
              </div>
              <button onclick="downloadGuide()" class="bg-white text-neutral-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-neutral-100 transition tracking-wide whitespace-nowrap flex items-center gap-2">
                <i class="fas fa-download"></i>
                Baixar Guia PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-neutral-900 border-t border-neutral-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" 
                  alt="House of Prayer - New Destiny Logo" 
                  class="h-16 w-16 object-contain"
                />
                <h4 class="text-xl font-serif font-bold">HPC Atlanta</h4>
              </div>
              <p class="text-neutral-400 leading-relaxed mb-4">
                House of Prayer for all Nations - Uma casa de oração para todas as nações.
              </p>
              <p class="text-sm text-neutral-500">
                Brazilian Church em Marietta, GA. Venha viver o que Deus tem para você!
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Horários de Culto</h4>
              <p class="text-neutral-400 mb-2">
                <i class="fas fa-calendar-alt mr-2"></i>
                Domingo às 10:00 AM
              </p>
              <p class="text-neutral-400 mb-2">
                <i class="fas fa-calendar-alt mr-2"></i>
                Terça-feira às 8:00 PM
              </p>
              <p class="text-neutral-400 mb-6">
                <i class="fas fa-calendar-alt mr-2"></i>
                Quinta-feira às 8:00 PM
              </p>
              <div class="mt-6">
                <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Contato & Localização</h4>
                <p class="text-neutral-400 mb-2">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  3379 Canton Rd, Marietta, GA 30066
                </p>
                <p class="text-neutral-400 mb-2">
                  <i class="fas fa-phone mr-2"></i>
                  +1 (770) 862-0756
                </p>
                <p class="text-neutral-400">
                  <i class="fas fa-users mr-2"></i>
                  Pastores: Pr. Otávio Amorim e Natália Müller
                </p>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Siga-nos</h4>
              <div class="flex space-x-4 mb-8">
                <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="w-12 h-12 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
                  <i class="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" class="w-12 h-12 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
                  <i class="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" class="w-12 h-12 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
                  <i class="fab fa-youtube text-xl"></i>
                </a>
              </div>
              <p class="text-sm text-neutral-500 leading-relaxed">
                Junte-se à nossa comunidade online e fique por dentro de todos os eventos e notícias.
              </p>
            </div>
          </div>
          <div class="border-t border-neutral-800 pt-8 text-center">
            <p class="text-neutral-500 text-sm">&copy; 2025 HPC Atlanta - House of Prayer for all Nations. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <div id="modal" class="modal-overlay hidden">
        <div class="modal-content">
          <div class="flex justify-between items-center mb-6">
            <h3 id="modal-title" class="text-2xl font-bold text-gray-900"></h3>
            <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
          <form id="modal-form" class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Nome Completo</label>
              <input type="text" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Telefone</label>
              <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div id="modal-extra-fields"></div>
            <div class="flex justify-end space-x-4 mt-6">
              <button type="button" onclick="closeModal()" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Cancelar
              </button>
              <button type="submit" class="btn-primary">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>

      <script src="/static/app.js"></script>
    </div>
  )
})

export default app
