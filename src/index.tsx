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
                <button onclick="editPost(1)" class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition" title="Editar post">
                  <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePost(1)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" title="Deletar post">
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
                <button onclick="editPost(2)" class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition" title="Editar post">
                  <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePost(2)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" title="Deletar post">
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
                <button onclick="editPost(3)" class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition" title="Editar post">
                  <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePost(3)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" title="Deletar post">
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
          window.location.href = '/admin/posts/new';
        }

        function showPostsList() {
          window.location.href = '/admin/posts';
        }

        function editPost(postId) {
          window.location.href = '/admin/posts/edit/' + postId;
        }

        async function deletePost(postId) {
          if (!confirm('Tem certeza que deseja deletar este post?\\n\\nEsta ação não pode ser desfeita!')) {
            return;
          }

          try {
            const response = await fetch('/api/posts/' + postId, {
              method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
              alert('Post deletado com sucesso! ✅');
              window.location.reload();
            } else {
              alert('Erro ao deletar post: ' + (data.error || 'Erro desconhecido'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Erro ao deletar post. Por favor, tente novamente.');
          }
        }
      </script>
    </body>
    </html>
  `)
})

// Admin - Create/Edit Post Page
app.get('/admin/posts/new', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Mensagem - HPC Atlanta Blog</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <!-- Quill Editor -->
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    </head>
    <body class="bg-neutral-50">
      <!-- Check authentication -->
      <script>
        const token = localStorage.getItem('hpc_admin_token');
        if (!token) {
          window.location.href = '/admin';
        }
      </script>

      <!-- Top Navigation -->
      <nav class="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-4">
              <a href="/admin/dashboard" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-arrow-left text-xl"></i>
              </a>
              <div class="flex items-center gap-3">
                <i class="fas fa-church text-2xl text-neutral-900"></i>
                <div>
                  <h1 class="text-lg font-bold text-neutral-900">Nova Mensagem</h1>
                  <p class="text-xs text-neutral-500">Criar novo post para o blog</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button onclick="saveDraft()" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-save mr-2"></i>Salvar Rascunho
              </button>
              <button onclick="previewPost()" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-eye mr-2"></i>Prévia
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form id="postForm" class="space-y-6">
          
          <!-- Title -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-heading mr-2"></i>Título da Mensagem *
            </label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              class="w-full px-4 py-4 text-2xl font-bold border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
              placeholder="Ex: O Poder da Oração que Transforma"
            />
            <p class="text-xs text-neutral-500 mt-2">
              <i class="fas fa-info-circle mr-1"></i>
              Será gerada automaticamente uma URL amigável baseada no título
            </p>
          </div>

          <!-- Category and Settings -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-bold text-neutral-700 mb-3">
                  <i class="fas fa-tag mr-2"></i>Categoria *
                </label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
                >
                  <option value="">Selecione...</option>
                  <option value="Mensagens">Mensagens</option>
                  <option value="Adoração">Adoração</option>
                  <option value="Batismo">Batismo</option>
                  <option value="Estudo Bíblico">Estudo Bíblico</option>
                  <option value="Testemunhos">Testemunhos</option>
                  <option value="Oração">Oração</option>
                  <option value="Família">Família</option>
                  <option value="Juventude">Juventude</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-bold text-neutral-700 mb-3">
                  <i class="fas fa-clock mr-2"></i>Tempo de Leitura
                </label>
                <input 
                  type="text" 
                  id="readTime" 
                  name="readTime" 
                  placeholder="Ex: 5 min"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-neutral-700 mb-3">
                  <i class="fas fa-star mr-2"></i>Post em Destaque?
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" id="featured" name="featured" class="mr-3 w-5 h-5" />
                  <span class="text-neutral-700">Destacar na homepage</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Excerpt -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-align-left mr-2"></i>Resumo da Mensagem *
            </label>
            <textarea 
              id="excerpt" 
              name="excerpt" 
              required
              rows="3"
              class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
              placeholder="Breve resumo que aparecerá nos cards do blog (máx. 200 caracteres)"
              maxlength="200"
            ></textarea>
            <p class="text-xs text-neutral-500 mt-2">
              <span id="excerptCount">0</span>/200 caracteres
            </p>
          </div>

          <!-- Image URL -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-image mr-2"></i>URL da Imagem de Capa
            </label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <p class="text-xs text-neutral-500 mt-2">
              <i class="fas fa-info-circle mr-1"></i>
              Deixe em branco para usar imagem padrão. Imagens sugeridas das fotos da HPC:
              <br>
              <button type="button" onclick="useDefaultImage('worship')" class="text-blue-600 hover:underline text-xs mt-1">Adoração</button> • 
              <button type="button" onclick="useDefaultImage('preaching')" class="text-blue-600 hover:underline text-xs">Pregação</button> • 
              <button type="button" onclick="useDefaultImage('baptism')" class="text-blue-600 hover:underline text-xs">Batismo</button>
            </p>
          </div>

          <!-- Content Editor -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-pen mr-2"></i>Conteúdo da Mensagem *
            </label>
            <div id="editor" style="min-height: 500px;"></div>
            <input type="hidden" id="content" name="content" />
            
            <div class="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-800">
                <i class="fas fa-lightbulb mr-2"></i>
                <strong>Dicas de formatação:</strong> Use os botões da barra de ferramentas para:
                <br>• <strong>Negrito</strong> para ênfase
                <br>• <em>Itálico</em> para citações
                <br>• Títulos (H2, H3) para organizar o conteúdo
                <br>• Listas para pontos importantes
                <br>• Blockquotes para versículos bíblicos
              </p>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <div class="flex gap-4">
              <button 
                type="submit"
                class="flex-1 bg-neutral-900 text-white py-4 rounded-lg font-bold hover:bg-neutral-800 transition transform hover:scale-105 shadow-lg"
              >
                <i class="fas fa-check-circle mr-2"></i>Publicar Mensagem
              </button>
              <button 
                type="button"
                onclick="window.location.href='/admin/dashboard'"
                class="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-lg font-bold hover:bg-neutral-100 transition"
              >
                <i class="fas fa-times mr-2"></i>Cancelar
              </button>
            </div>
          </div>

        </form>
      </div>

      <script>
        // Initialize Quill editor
        const quill = new Quill('#editor', {
          theme: 'snow',
          placeholder: 'Escreva aqui o conteúdo da mensagem...',
          modules: {
            toolbar: [
              [{ 'header': [2, 3, false] }],
              ['bold', 'italic', 'underline'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ]
          }
        });

        // Character counter for excerpt
        document.getElementById('excerpt').addEventListener('input', (e) => {
          document.getElementById('excerptCount').textContent = e.target.value.length;
        });

        // Use default images
        function useDefaultImage(type) {
          const imageUrl = document.getElementById('imageUrl');
          const images = {
            worship: 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
            preaching: 'https://page.gensparksite.com/v1/base64_upload/f48ffac985009bf0799538a2150bb9fb',
            baptism: 'https://page.gensparksite.com/v1/base64_upload/ae40562804a7da5523cd995eb819d9b5'
          };
          imageUrl.value = images[type];
        }

        // Save draft (TODO: implement)
        function saveDraft() {
          alert('Funcionalidade de rascunho em desenvolvimento. Por enquanto, use Publicar para salvar.');
        }

        // Preview post (TODO: implement)
        function previewPost() {
          const title = document.getElementById('title').value;
          const content = quill.root.innerHTML;
          
          if (!title) {
            alert('Digite um título primeiro');
            return;
          }
          
          const previewWindow = window.open('', '_blank');
          previewWindow.document.write(\`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>Prévia: \${title}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { font-family: Georgia, serif; line-height: 1.8; }
                h2 { font-size: 1.8em; font-weight: bold; margin: 30px 0 15px; }
                h3 { font-size: 1.4em; font-weight: bold; margin: 25px 0 12px; }
                p { margin-bottom: 15px; }
                blockquote { border-left: 4px solid #ddd; padding-left: 20px; font-style: italic; margin: 20px 0; }
                ul, ol { margin: 15px 0; padding-left: 30px; }
              </style>
            </head>
            <body class="bg-neutral-50 p-8">
              <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-12">
                <h1 class="text-4xl font-bold mb-6">\${title}</h1>
                <div class="prose">\${content}</div>
              </div>
            </body>
            </html>
          \`);
        }

        // Form submission
        document.getElementById('postForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = e.target.querySelector('button[type="submit"]');
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Publicando...';
          
          // Get form data
          const formData = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            excerpt: document.getElementById('excerpt').value,
            content: quill.root.innerHTML,
            image_url: document.getElementById('imageUrl').value || 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
            read_time: document.getElementById('readTime').value || '5 min',
            featured: document.getElementById('featured').checked
          };
          
          // Validate
          if (!formData.title || !formData.category || !formData.excerpt) {
            alert('Por favor, preencha todos os campos obrigatórios (*)');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Publicar Mensagem';
            return;
          }
          
          try {
            const response = await fetch('/api/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
              alert('✅ Mensagem publicada com sucesso!\\n\\nRedirecionando para o dashboard...');
              window.location.href = '/admin/dashboard';
            } else {
              alert('❌ Erro ao publicar mensagem: ' + data.error);
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Publicar Mensagem';
            }
          } catch (error) {
            alert('❌ Erro ao conectar com servidor: ' + error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Publicar Mensagem';
          }
        });
      </script>
    </body>
    </html>
  `)
})

// Edit post page
app.get('/admin/posts/edit/:id', async (c) => {
  const postId = c.req.param('id')
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Editar Mensagem - HPC Atlanta Blog</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <!-- Quill Editor -->
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    </head>
    <body class="bg-neutral-50">
      <!-- Check authentication -->
      <script>
        const token = localStorage.getItem('hpc_admin_token');
        if (!token) {
          window.location.href = '/admin';
        }
      </script>

      <!-- Top Navigation -->
      <nav class="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-4">
              <a href="/admin/dashboard" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-arrow-left text-xl"></i>
              </a>
              <div class="flex items-center gap-3">
                <i class="fas fa-church text-2xl text-neutral-900"></i>
                <div>
                  <h1 class="text-lg font-bold text-neutral-900">Editar Mensagem</h1>
                  <p class="text-xs text-neutral-500">Atualizar post existente</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button onclick="saveDraft()" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-save mr-2"></i>Salvar Rascunho
              </button>
              <button onclick="previewPost()" class="text-neutral-600 hover:text-neutral-900 transition">
                <i class="fas fa-eye mr-2"></i>Prévia
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Loading State -->
      <div id="loadingState" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-neutral-400 mb-4"></i>
        <p class="text-neutral-600">Carregando post...</p>
      </div>

      <!-- Main Content -->
      <div id="editForm" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 hidden">
        <form id="postForm" class="space-y-6">
          
          <!-- Title -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-heading mr-2"></i>Título da Mensagem *
            </label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              class="w-full px-4 py-4 text-2xl font-bold border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
              placeholder="Ex: O Poder da Oração que Transforma"
            />
            <p class="text-xs text-neutral-500 mt-2">
              <i class="fas fa-info-circle mr-1"></i>
              O slug (URL) será atualizado baseado no título
            </p>
          </div>

          <!-- Category and Settings -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <div class="grid md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-bold text-neutral-700 mb-3">
                  <i class="fas fa-tag mr-2"></i>Categoria *
                </label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
                >
                  <option value="">Selecione...</option>
                  <option value="Mensagens">Mensagens</option>
                  <option value="Adoração">Adoração</option>
                  <option value="Batismo">Batismo</option>
                  <option value="Estudo Bíblico">Estudo Bíblico</option>
                  <option value="Testemunhos">Testemunhos</option>
                  <option value="Oração">Oração</option>
                  <option value="Família">Família</option>
                  <option value="Juventude">Juventude</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-bold text-neutral-700 mb-3">
                  <i class="fas fa-clock mr-2"></i>Tempo de Leitura
                </label>
                <input 
                  type="text" 
                  id="readTime" 
                  name="readTime" 
                  placeholder="Ex: 5 min"
                  class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-neutral-700 mb-3">
                  <i class="fas fa-star mr-2"></i>Post em Destaque?
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="checkbox" id="featured" name="featured" class="mr-3 w-5 h-5" />
                  <span class="text-neutral-700">Destacar na homepage</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Excerpt -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-align-left mr-2"></i>Resumo da Mensagem *
            </label>
            <textarea 
              id="excerpt" 
              name="excerpt" 
              required
              rows="3"
              class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition"
              placeholder="Breve resumo que aparecerá nos cards do blog (máx. 200 caracteres)"
              maxlength="200"
            ></textarea>
            <p class="text-xs text-neutral-500 mt-2">
              <span id="excerptCount">0</span>/200 caracteres
            </p>
          </div>

          <!-- Image URL -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-image mr-2"></i>URL da Imagem de Capa
            </label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              class="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-neutral-900 focus:outline-none transition mb-3"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <div class="flex flex-wrap gap-2">
              <button type="button" onclick="setImage('https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa')" class="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded text-xs transition">
                📸 Foto 1
              </button>
              <button type="button" onclick="setImage('https://page.gensparksite.com/v1/base64_upload/b49314cd2e986919e25794a9b6e028fc')" class="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded text-xs transition">
                📸 Foto 2
              </button>
              <button type="button" onclick="setImage('https://page.gensparksite.com/v1/base64_upload/ae40562804a7da5523cd995eb819d9b5')" class="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded text-xs transition">
                📸 Foto 3
              </button>
            </div>
          </div>

          <!-- Content Editor -->
          <div class="bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <label class="block text-sm font-bold text-neutral-700 mb-3">
              <i class="fas fa-pen mr-2"></i>Conteúdo Completo *
            </label>
            <div id="editor" style="min-height: 500px;"></div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-between items-center bg-white rounded-xl shadow-md border border-neutral-200 p-8">
            <a href="/admin/dashboard" class="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition">
              <i class="fas fa-times mr-2"></i>Cancelar
            </a>
            <button 
              type="submit"
              class="px-8 py-3 bg-neutral-900 text-white rounded-lg font-bold hover:bg-neutral-800 transition transform hover:scale-105 shadow-lg"
            >
              <i class="fas fa-save mr-2"></i>Atualizar Mensagem
            </button>
          </div>
        </form>
      </div>

      <script>
        let quill;
        let currentPost = null;
        const postId = ${postId};

        // Load post data
        async function loadPost() {
          try {
            const response = await fetch(\`/api/posts/\${postId}\`, {
              method: 'GET'
            });
            
            if (!response.ok) {
              throw new Error('Post not found');
            }
            
            const data = await response.json();
            currentPost = data.post;
            
            // Populate form
            document.getElementById('title').value = currentPost.title;
            document.getElementById('category').value = currentPost.category;
            document.getElementById('readTime').value = currentPost.read_time || '';
            document.getElementById('featured').checked = currentPost.featured === 1;
            document.getElementById('excerpt').value = currentPost.excerpt;
            document.getElementById('imageUrl').value = currentPost.image_url || '';
            
            // Update excerpt counter
            document.getElementById('excerptCount').textContent = currentPost.excerpt.length;
            
            // Initialize Quill with content
            initializeQuill();
            quill.root.innerHTML = currentPost.content;
            
            // Show form, hide loading
            document.getElementById('loadingState').classList.add('hidden');
            document.getElementById('editForm').classList.remove('hidden');
            
          } catch (error) {
            console.error('Error loading post:', error);
            alert('Erro ao carregar post. Redirecionando para dashboard...');
            window.location.href = '/admin/dashboard';
          }
        }

        function initializeQuill() {
          quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
              ]
            }
          });
        }

        // Excerpt counter
        document.addEventListener('DOMContentLoaded', () => {
          const excerptField = document.getElementById('excerpt');
          if (excerptField) {
            excerptField.addEventListener('input', (e) => {
              document.getElementById('excerptCount').textContent = e.target.value.length;
            });
          }
        });

        // Set image
        function setImage(url) {
          document.getElementById('imageUrl').value = url;
        }

        // Preview
        function previewPost() {
          const title = document.getElementById('title').value;
          const content = quill.root.innerHTML;
          
          const previewWindow = window.open('', '_blank');
          previewWindow.document.write(\`
            <!DOCTYPE html>
            <html>
            <head>
              <title>\${title}</title>
              <script src="https://cdn.tailwindcss.com"><\/script>
              <style>
                body { font-family: system-ui; line-height: 1.6; }
                .content h1 { font-size: 2em; font-weight: bold; margin: 1em 0 0.5em; }
                .content h2 { font-size: 1.5em; font-weight: bold; margin: 1em 0 0.5em; }
                .content h3 { font-size: 1.25em; font-weight: bold; margin: 1em 0 0.5em; }
                .content p { margin: 1em 0; }
                .content ul, .content ol { margin: 1em 0; padding-left: 2em; }
                .content blockquote { border-left: 4px solid #ccc; padding-left: 1em; margin: 1em 0; font-style: italic; }
              </style>
            </head>
            <body class="bg-gray-50 p-8">
              <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 class="text-4xl font-bold mb-4">\${title}</h1>
                <div class="content">\${content}</div>
              </div>
            </body>
            </html>
          \`);
        }

        // Save draft
        function saveDraft() {
          alert('Funcionalidade de rascunho será implementada em breve!');
        }

        // Form submission
        document.getElementById('postForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = {
            title: document.getElementById('title').value,
            slug: document.getElementById('title').value.toLowerCase()
              .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, ''),
            excerpt: document.getElementById('excerpt').value,
            content: quill.root.innerHTML,
            category: document.getElementById('category').value,
            image_url: document.getElementById('imageUrl').value || 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa',
            read_time: document.getElementById('readTime').value || '5 min',
            featured: document.getElementById('featured').checked ? 1 : 0
          };
          
          try {
            const response = await fetch(\`/api/posts/\${postId}\`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
              alert('Post atualizado com sucesso! ✅');
              window.location.href = '/admin/dashboard';
            } else {
              alert('Erro ao atualizar post: ' + (data.error || 'Erro desconhecido'));
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Erro ao enviar dados. Por favor, tente novamente.');
          }
        });

        // Load post on page load
        loadPost();
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

// GET single post by ID
app.get('/api/posts/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Check if it's a number (ID) or string (slug)
    const isNumeric = /^\d+$/.test(id)
    
    let query, param
    if (isNumeric) {
      query = 'SELECT * FROM blog_posts WHERE id = ?'
      param = parseInt(id)
    } else {
      query = 'SELECT * FROM blog_posts WHERE slug = ?'
      param = id
    }
    
    const post = await c.env.DB.prepare(query).bind(param).first()
    
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

// Contact form API route - Send emails to Pastor Otávio
app.post('/api/contact', async (c) => {
  try {
    const data = await c.req.json()
    
    // Prepare email content based on form type
    const formType = data.formType || 'contact'
    let emailSubject = ''
    let emailBody = ''
    
    switch(formType) {
      case 'discover':
        emailSubject = `[HPC Atlanta] Nova Inscrição: Descubra a HPC`
        emailBody = `
          Nova Inscrição - Descubra a HPC Atlanta
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
        break
        
      case 'team':
        emailSubject = `[HPC Atlanta] Novo Voluntário: Junte-se à Equipe`
        emailBody = `
          Novo Voluntário - Equipe HPC
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          Área de Interesse: ${data.interest || 'Não especificada'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
        break
        
      case 'baptism':
        emailSubject = `[HPC Atlanta] Pedido de Batismo`
        emailBody = `
          Novo Pedido de Batismo
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          Já foi batizado antes: ${data.previous_baptism === 'yes' ? 'Sim' : 'Não'}
          
          Testemunho:
          ${data.testimony || 'Não fornecido'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
        break
        
      case 'groups':
        emailSubject = `[HPC Atlanta] Interesse em Grupo de Conexão`
        emailBody = `
          Interesse em Grupo de Conexão
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          Tipo de Grupo: ${data.group_type || 'Não especificado'}
          Dia Preferido: ${data.preferred_day || 'Não especificado'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
        break
        
      case 'connect':
        emailSubject = `[HPC Atlanta] Cartão de Conexão`
        emailBody = `
          Novo Cartão de Conexão
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          Como conheceu a HPC: ${data.how_found || 'Não informado'}
          
          Pedido de Oração:
          ${data.prayer_request || 'Não fornecido'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
        break
        
      case 'prayer':
        emailSubject = `[HPC Atlanta] Pedido de Oração`
        emailBody = `
          Novo Pedido de Oração
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          Permitir compartilhar publicamente: ${data.public_prayer ? 'Sim (anônimo)' : 'Não'}
          
          Pedido de Oração:
          ${data.prayer_request || 'Não fornecido'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
        break
        
      case 'give':
        emailSubject = `[HPC Atlanta] Nova Contribuição/Doação`
        emailBody = `
          Nova Intenção de Contribuição
          
          Tipo: ${data.giving_type === 'tithe' ? 'Dízimo' : 'Oferta'}
          Valor: $${data.amount || '0'}
          Frequência: ${data.frequency || 'Não informada'}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
          
          Nota: O doador deve prosseguir com o pagamento através das plataformas indicadas.
        `
        break
        
      default:
        emailSubject = `[HPC Atlanta] Novo Contato do Site`
        emailBody = `
          Novo Contato do Site
          
          Nome: ${data.name || 'Não informado'}
          Email: ${data.email || 'Não informado'}
          Telefone: ${data.phone || 'Não informado'}
          
          Dados completos:
          ${JSON.stringify(data, null, 2)}
          
          Formulário recebido em: ${new Date().toLocaleString('pt-BR')}
        `
    }
    
    // Send email via Resend API
    try {
      const resendApiKey = c.env.RESEND_API_KEY || ''
      
      if (!resendApiKey) {
        console.warn('RESEND_API_KEY not configured. Email will not be sent.')
        console.log('Email data:', { to: 'otavioamorim@houseprayeratl.com', subject: emailSubject, body: emailBody })
        
        return c.json({ 
          success: true, 
          message: 'Mensagem recebida! (Email não configurado ainda)' 
        })
      }
      
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'HPC Atlanta <onboarding@resend.dev>',
          to: ['otavioamorim@houseprayeratl.com'],
          subject: emailSubject,
          text: emailBody
        })
      })
      
      const emailResult = await emailResponse.json()
      
      if (!emailResponse.ok) {
        console.error('Failed to send email:', emailResult)
        return c.json({ 
          success: false, 
          message: 'Erro ao enviar email. Por favor, tente novamente.' 
        }, 500)
      }
      
      console.log('Email sent successfully:', emailResult)
      
      return c.json({ 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      })
      
    } catch (emailError) {
      console.error('Email send error:', emailError)
      return c.json({ 
        success: false, 
        message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.' 
      }, 500)
    }
    
  } catch (error) {
    console.error('Error processing contact form:', error)
    return c.json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Por favor, tente novamente.' 
    }, 500)
  }
})

// Blog listing page
app.get('/blog', async (c) => {
  let blogPosts = []
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    ).all()
    blogPosts = results
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }

  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Palavra - Mensagens e Estudos | HPC Atlanta</title>
      <link rel="icon" type="image/png" href="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" />
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
      <div class="min-h-screen bg-neutral-50">
        <!-- Navigation -->
        <nav class="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-neutral-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
              <div class="flex items-center gap-3">
                <img src="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" alt="HPC Atlanta Logo" class="h-12 w-12 object-contain" />
                <h1 class="text-2xl font-serif font-bold tracking-tight text-neutral-900">HPC Atlanta</h1>
              </div>
              <div class="flex items-center gap-6">
                <a href="/" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition">
                  <i class="fas fa-home mr-2"></i>Início
                </a>
                <a href="/#connect" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition">
                  <i class="fas fa-envelope mr-2"></i>Contato
                </a>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="pt-32 pb-16 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-sm font-medium tracking-widest text-neutral-300 uppercase mb-4">
              <i class="fas fa-book-open mr-2"></i>Palavra do Pastor
            </p>
            <h2 class="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Mensagens e Estudos
            </h2>
            <p class="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Reflexões, ensinamentos e palavra profética do Pr. Otávio Amorim para edificar sua vida espiritual.
            </p>
            <div class="flex items-center justify-center gap-4">
              <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3">
                <p class="text-2xl font-bold">${blogPosts.length}</p>
                <p class="text-sm text-neutral-300">Mensagens</p>
              </div>
              <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3">
                <p class="text-2xl font-bold">∞</p>
                <p class="text-sm text-neutral-300">Vidas Transformadas</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Posts Grid -->
        <section class="py-16 md:py-24 bg-neutral-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            ${blogPosts.length === 0 ? `
              <div class="text-center py-16">
                <i class="fas fa-book-open text-6xl text-neutral-300 mb-6"></i>
                <h3 class="text-2xl font-bold text-neutral-700 mb-3">Nenhuma mensagem publicada ainda</h3>
                <p class="text-neutral-600">Em breve teremos novas mensagens disponíveis.</p>
              </div>
            ` : `
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${blogPosts.map(post => `
                  <a href="/blog/${post.slug}" class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
                    <div class="relative h-64 overflow-hidden">
                      <img 
                        src="${post.image_url || 'https://page.gensparksite.com/v1/base64_upload/b962530fc486ec44113a0438919408aa'}" 
                        alt="${post.title}" 
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div class="absolute top-4 left-4 bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ${post.category}
                      </div>
                      ${post.featured ? '<div class="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold"><i class="fas fa-star mr-1"></i>Destaque</div>' : ''}
                    </div>
                    <div class="p-6 flex-1 flex flex-col">
                      <div class="flex items-center text-sm text-neutral-500 mb-3">
                        <i class="far fa-calendar mr-2"></i>
                        <span>${new Date(post.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span class="mx-2">•</span>
                        <i class="far fa-clock mr-2"></i>
                        <span>${post.read_time}</span>
                      </div>
                      <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-600 transition line-clamp-2">
                        ${post.title}
                      </h3>
                      <p class="text-neutral-600 mb-4 leading-relaxed flex-1 line-clamp-3">
                        ${post.excerpt}
                      </p>
                      <div class="flex items-center text-neutral-900 font-semibold group-hover:gap-2 transition-all">
                        <span>Ler mensagem</span>
                        <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  </a>
                `).join('')}
              </div>
            `}
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-neutral-900 text-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 class="text-3xl font-serif font-bold mb-4">Quer Receber Nossas Mensagens?</h3>
            <p class="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Inscreva-se para receber as últimas mensagens e estudos bíblicos diretamente no seu email.
            </p>
            <a href="/#connect" class="inline-block bg-white text-neutral-900 px-8 py-4 rounded-lg font-bold hover:bg-neutral-100 transition transform hover:scale-105">
              <i class="fas fa-envelope mr-2"></i>Inscrever-se
            </a>
          </div>
        </section>

        <!-- Footer -->
        <footer class="bg-neutral-900 border-t border-neutral-800 text-white py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <img src="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" alt="HPC Atlanta Logo" class="h-12 w-12 object-contain" />
                  <h4 class="text-xl font-serif font-bold">HPC Atlanta</h4>
                </div>
                <p class="text-neutral-400 text-sm">House of Prayer for all Nations</p>
              </div>
              <div>
                <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Contato</h4>
                <p class="text-neutral-400 text-sm mb-2"><i class="fas fa-map-marker-alt mr-2"></i>3379 Canton Rd, Marietta, GA 30066</p>
                <p class="text-neutral-400 text-sm mb-2"><i class="fas fa-phone mr-2"></i>+1 (770) 862-0756</p>
                <p class="text-neutral-400 text-sm"><i class="fas fa-users mr-2"></i>Pastores: Pr. Otávio Amorim e Natália Müller</p>
              </div>
              <div>
                <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Siga-nos</h4>
                <div class="flex gap-4">
                  <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
                    <i class="fab fa-facebook"></i>
                  </a>
                  <a href="#" class="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
                    <i class="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="border-t border-neutral-800 pt-8 text-center">
              <p class="text-neutral-500 text-sm">© 2025 HPC Atlanta - House of Prayer for All Nations. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>

      <script src="/static/app.js"></script>
    </body>
    </html>
  `)
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
            alt="HPC Atlanta - Adoração e Louvor"
            class="w-full h-full object-cover"
            onError="this.style.display='none'; this.parentElement.style.background='linear-gradient(to bottom right, rgb(38, 38, 38), rgb(64, 64, 64), rgb(23, 23, 23))'"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-neutral-900/85 via-neutral-800/75 to-neutral-900/85"></div>
        </div>
        
        {/* Content */}
        <div class="relative z-10 w-full text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div class="text-center max-w-4xl mx-auto">
            <p class="text-sm font-medium tracking-widest text-neutral-300 uppercase mb-6">HPC Atlanta - House of Prayer for All Nations</p>
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
                Conheça a Igreja
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

      {/* Discover Church Section - HPC Atlanta */}
      <section id="discover" class="py-24 md:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Church Introduction */}
          <div class="text-center mb-20">
            <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Bem-vindo</p>
            <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-8 leading-tight">Descubra a Igreja</h3>
            <p class="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Uma casa de oração para todas as nações. Há 10 anos servindo a comunidade em Marietta, Georgia.
            </p>
          </div>

          {/* Nossa História - Enhanced with Timeline */}
          <div class="mb-20">
            {/* Header Centralizado */}
            <div class="text-center mb-16">
              <h4 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Nossa História</h4>
              <p class="text-2xl font-serif text-neutral-700 italic max-w-3xl mx-auto">
                Como Tudo Começou
              </p>
            </div>

            {/* História Principal - Centralizada */}
            <div class="max-w-4xl mx-auto mb-16">
              <p class="text-xl text-neutral-700 mb-8 leading-relaxed text-center font-medium">
                Deixe-me contar como Deus escreveu esta história.
              </p>
              
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                Há alguns anos, eu estava na Flórida quando Deus me deu uma visão que mudaria completamente minha vida. Não foi algo vago ou confuso - foi claro, direto: <strong>"Vá para Atlanta"</strong>.
              </p>
              
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                Mas não era só um endereço. Naquela experiência com Deus, Ele me mostrou algo que mexeu profundamente comigo: havia um povo esperando naquela cidade. Pessoas que Ele já havia preparado. Corações já sensibilizados. E de alguma forma, eu faria parte do propósito divino na vida delas.
              </p>
              
              <p class="text-lg text-neutral-700 mb-8 leading-relaxed italic text-center font-medium">
                Eu não sabia como isso ia acontecer. Mas conhecia o Deus que estava me chamando.
              </p>
            </div>

            {/* Foto do Pastor - Centralizada */}
            <div class="max-w-md mx-auto mb-16">
              <div class="relative">
                <div class="aspect-square bg-gradient-to-br from-neutral-300 via-neutral-200 to-neutral-100 rounded-xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/6bfe356fa6a0d80d8f425c6c3735ada0" 
                    alt="Pr. Otávio Amorim - Pastor da HPC Atlanta" 
                    class="w-full h-full object-cover object-center"
                    style="object-position: center 30%;"
                  />
                </div>
                <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-neutral-900 rounded-xl -z-10"></div>
              </div>
              <p class="text-center text-sm text-neutral-500 mt-6 font-medium uppercase tracking-wide">
                Pr. Otávio Amorim - Pastor da HPC Atlanta
              </p>
            </div>

            {/* Continuação da História - Centralizada */}
            <div class="max-w-4xl mx-auto mb-16">
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                O mais incrível é que Deus já estava orquestrando tudo nos bastidores. Os pastores <strong>Dione Souza e Tatiana Souza</strong> - com quem servi por anos lado a lado no ministério House of Prayer na Flórida - já moravam em Marietta, Georgia, bem na região de Atlanta. Eles nem sabiam que faziam parte da resposta à minha visão.
              </p>
              
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                Quando nos reencontramos e começamos a conversar, foi como se peças de um quebra-cabeça celestial se encaixassem perfeitamente. Eles me contaram o que Deus estava fazendo em suas vidas. Eu compartilhei a visão que havia recebido. E ali, naquele momento, entendemos: nossos propósitos se encontraram.
              </p>
              
              <p class="text-xl text-neutral-900 mb-8 leading-relaxed text-center font-bold italic">
                Não foi coincidência. Foi Deus.
              </p>
              
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                Começamos pequenos - cultos na casa deles, em Marietta. Mas desde o primeiro encontro, sentíamos algo diferente no ar. A presença de Deus era tangível. Pessoas chegavam feridas e saíam restauradas. Corações fechados se abriam. Vidas eram transformadas.
              </p>
              
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                Aqueles encontros caseiros eram simples, mas carregavam peso de eternidade. Ali, sem holofotes ou grande estrutura, Deus estava cumprindo o que havia me mostrado na visão: <strong>o povo que Ele disse que estaria esperando começou a aparecer.</strong>
              </p>
              
              <p class="text-xl text-neutral-900 mb-8 leading-relaxed text-center font-bold">
                E Deus fez crescer o que começou pequeno.
              </p>
              
              <p class="text-lg text-neutral-600 mb-6 leading-relaxed">
                Há 10 anos, encontramos nosso lar permanente aqui na <strong>3379 Marietta Highway</strong>. Mas posso dizer com toda sinceridade: este não é apenas um endereço ou um prédio. <strong>Este é o cumprimento de uma promessa que Deus me fez.</strong> Este é o lugar onde aquela visão se tornou realidade.
              </p>
              
              <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
                Cada pessoa que entra por estas portas faz parte daquele "povo esperando" que Deus me mostrou. Cada história de transformação é uma confirmação de que não estávamos seguindo nossos sonhos - estávamos obedecendo à voz de Deus.
              </p>
            </div>

            {/* Timeline - Three Phases */}
            <div class="grid md:grid-cols-3 gap-8 mb-16">
              {/* Phase 1 - A Visão */}
              <div class="bg-neutral-50 rounded-xl p-8 border-2 border-neutral-200 shadow-md hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-full mb-6 mx-auto">
                  <i class="fas fa-eye text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3 text-center">A Visão</h5>
                <p class="text-sm font-semibold text-neutral-500 mb-4 text-center uppercase tracking-wide">Flórida</p>
                <p class="text-neutral-600 leading-relaxed text-center">
                  Deus me deu uma visão clara: "Vá para Atlanta". Havia um povo esperando. Corações já preparados. Um propósito divino a ser cumprido.
                </p>
              </div>

              {/* Phase 2 - Os Cultos em Lares */}
              <div class="bg-neutral-50 rounded-xl p-8 border-2 border-neutral-200 shadow-md hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-center w-16 h-16 bg-neutral-700 rounded-full mb-6 mx-auto">
                  <i class="fas fa-home text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3 text-center">O Começo</h5>
                <p class="text-sm font-semibold text-neutral-500 mb-4 text-center uppercase tracking-wide">Cultos em Lares</p>
                <p class="text-neutral-600 leading-relaxed text-center">
                  Na casa dos pastores Dione e Tatiana em Marietta. Simples, mas com peso de eternidade. A presença de Deus era tangível. Vidas eram transformadas.
                </p>
              </div>

              {/* Phase 3 - A Promessa Cumprida */}
              <div class="bg-neutral-50 rounded-xl p-8 border-2 border-neutral-200 shadow-md hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-full mb-6 mx-auto">
                  <i class="fas fa-church text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3 text-center">O Cumprimento</h5>
                <p class="text-sm font-semibold text-neutral-500 mb-4 text-center uppercase tracking-wide">3379 Marietta Highway</p>
                <p class="text-neutral-600 leading-relaxed text-center">
                  Há 10 anos em nosso lar permanente. A visão se tornou realidade. A promessa foi cumprida. Uma casa de oração para todas as nações.
                </p>
              </div>
            </div>

            {/* Continuação Final da História - Centralizada */}
            <div class="mb-12 max-w-4xl mx-auto">
              <p class="text-lg text-neutral-600 mb-8 leading-relaxed text-center">
                Hoje, olho para trás e me emociono. Da Flórida à Georgia. Da visão ao cumprimento. Dos propósitos separados ao alinhamento divino. Da casa à igreja estabelecida.
              </p>
              
              <p class="text-2xl text-neutral-900 mb-8 leading-relaxed text-center font-bold">
                Nossa missão continua clara: ser uma casa de oração para todas as nações.
              </p>
              
              <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
                Um lugar onde brasileiros e pessoas de qualquer lugar do mundo podem encontrar mais do que programas religiosos - podem encontrar uma família, podem encontrar esperança, podem encontrar a Deus.
              </p>
              
              <p class="text-lg text-neutral-700 mb-8 leading-relaxed italic bg-neutral-50 border-l-4 border-neutral-900 pl-6 py-4">
                Aprendi algo profundo nesta jornada: <strong>quando você obedece à voz de Deus, descobre que Ele já estava trabalhando muito antes de você chegar.</strong> Ele já havia preparado pessoas. Já havia alinhado propósitos. Já havia garantido que nada falharia.
              </p>
              
              <div class="text-center mt-12">
                <button class="btn-primary text-lg px-10 py-4" onclick="openModal('discover')">
                  <i class="fas fa-heart mr-2"></i>
                  Faça Parte Desta História
                </button>
              </div>
            </div>

            {/* Mission Statement Banner */}
            <div class="mt-12 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl p-10 text-center shadow-xl">
              <p class="text-xl md:text-2xl font-serif text-white leading-relaxed mb-6">
                "Por isso, quando você chega aqui, não é visitante. <strong>Você é família.</strong>"
              </p>
              <p class="text-lg text-neutral-200 mb-3">
                Você é parte desta visão que Deus nos deu.
              </p>
              <p class="text-lg text-neutral-200 mb-6">
                <strong>Você é um dos que estavam esperando.</strong>
              </p>
              <p class="text-2xl font-serif font-bold text-white italic">
                Bem-vindo à House of Prayer.
              </p>
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
              Ficaríamos felizes se você participasse do Batismo!
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
            <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Momentos da Igreja</h3>
            <p class="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Confira os momentos especiais da HPC Atlanta através do Instagram
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
                <a href={`https://houseprayeratl.com/blog/${post.slug}`} class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
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
            <a href="https://houseprayeratl.com/blog" class="inline-flex items-center bg-neutral-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 transition transform hover:scale-105">
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
                Compartilhe seus pedidos de oração conosco. Ficaríamos felizes em orar por você.
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

          {/* Detailed Church History Section - After HPC Guide */}
          <div class="mt-24 mb-24">
            <div class="text-center mb-16">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">House of Prayer</p>
              <h4 class="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-6">Nossa Jornada de Fé</h4>
              <p class="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Uma casa de oração nascida em lares, crescida na fé e estabelecida no propósito de Deus
              </p>
            </div>

            {/* Timeline Cards - Elegant Black/White/Gray */}
            <div class="space-y-12 mb-16">
              {/* O COMEÇO */}
              <div class="relative">
                <div class="flex flex-col md:flex-row gap-8 items-center">
                  <div class="md:w-1/3 text-center md:text-right">
                    <div class="inline-block bg-neutral-900 text-white rounded-full w-24 h-24 flex items-center justify-center mb-4 md:mb-0 shadow-xl">
                      <i class="fas fa-home text-3xl"></i>
                    </div>
                  </div>
                  <div class="md:w-2/3 bg-neutral-50 rounded-xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition">
                    <h5 class="text-2xl font-bold text-neutral-900 mb-3">O COMEÇO - Cultos em Lares</h5>
                    <p class="text-neutral-600 leading-relaxed mb-4">
                      A Igreja House of Prayer nasceu na cidade de Atlanta, em Marietta, na casa do casal de pastores <strong>Dione Souza e Tatiana Souza</strong>.
                    </p>
                    <p class="text-neutral-600 leading-relaxed">
                      O início foi marcado por cultos realizados em lares, onde a presença de Deus se manifestava de maneira poderosa, atraindo um número crescente de pessoas que buscavam a fé e um encontro genuíno com o Senhor.
                    </p>
                  </div>
                </div>
              </div>

              {/* O CRESCIMENTO */}
              <div class="relative">
                <div class="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div class="md:w-1/3 text-center md:text-left">
                    <div class="inline-block bg-neutral-700 text-white rounded-full w-24 h-24 flex items-center justify-center mb-4 md:mb-0 shadow-xl">
                      <i class="fas fa-building text-3xl"></i>
                    </div>
                  </div>
                  <div class="md:w-2/3 bg-neutral-50 rounded-xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition">
                    <h5 class="text-2xl font-bold text-neutral-900 mb-3">O CRESCIMENTO - Cultos em Hotel</h5>
                    <p class="text-neutral-600 leading-relaxed mb-4">
                      Com o crescimento da congregação, Deus abriu uma porta para realizarmos nossos cultos em um hotel, proporcionando um espaço maior para acolher todos aqueles que chegavam sedentos pela Palavra.
                    </p>
                    <p class="text-neutral-600 leading-relaxed">
                      Essa nova fase foi um grande passo de fé, demonstrando que Deus estava ampliando nossas fronteiras e preparando algo ainda maior.
                    </p>
                  </div>
                </div>
              </div>

              {/* A PERMANÊNCIA */}
              <div class="relative">
                <div class="flex flex-col md:flex-row gap-8 items-center">
                  <div class="md:w-1/3 text-center md:text-right">
                    <div class="inline-block bg-neutral-900 text-white rounded-full w-24 h-24 flex items-center justify-center mb-4 md:mb-0 shadow-xl">
                      <i class="fas fa-church text-3xl"></i>
                    </div>
                  </div>
                  <div class="md:w-2/3 bg-neutral-50 rounded-xl p-8 shadow-lg border-2 border-neutral-200 hover:shadow-xl transition">
                    <h5 class="text-2xl font-bold text-neutral-900 mb-3">A PERMANÊNCIA - Nossa Sede</h5>
                    <p class="text-neutral-600 leading-relaxed mb-4">
                      Logo percebemos a necessidade de um local próprio e permanente, um lugar que pudéssemos chamar de lar espiritual.
                    </p>
                    <p class="text-neutral-600 leading-relaxed">
                      Assim, alugamos um espaço na <strong>3379 Marietta</strong>, onde estamos <strong>há 10 anos</strong>, servindo a comunidade, edificando vidas e expandindo o Reino de Deus através de projetos missionários, sociais e evangelísticos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Cards Grid - Elegant Black/White/Gray */}
            <div class="grid md:grid-cols-3 gap-8 mb-16">
              {/* Nossos Cultos */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
                <div class="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-hands-praying text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-4">Nossos Cultos</h5>
                <p class="text-neutral-600 leading-relaxed">
                  Os cultos são momentos centrais da vida da nossa igreja, onde nos reunimos para louvar, aprender e crescer juntos na fé. Experimentamos a manifestação poderosa da presença de Deus, edificando vidas, curando corações e fortalecendo a comunhão entre os irmãos.
                </p>
              </div>

              {/* Nossa Essência */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
                <div class="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-heart text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-4">Nossa Essência</h5>
                <p class="text-neutral-600 leading-relaxed mb-4">
                  Uma casa de oração nascida em lares, crescida na fé e estabelecida no propósito de Deus.
                </p>
                <p class="text-neutral-700 font-semibold italic">
                  "Um lugar onde pertencemos e crescemos juntos"
                </p>
              </div>

              {/* Our Impact */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-8 text-center shadow-md hover:shadow-xl transition">
                <div class="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-globe-americas text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-4">Nosso Impacto</h5>
                <div class="space-y-3 text-neutral-700">
                  <p class="flex items-center justify-center">
                    <i class="fas fa-check-circle text-neutral-900 mr-2"></i>
                    <span><strong>10 anos</strong> servindo Marietta</span>
                  </p>
                  <p class="flex items-center justify-center">
                    <i class="fas fa-check-circle text-neutral-900 mr-2"></i>
                    <span>Expandindo em <strong>5 continentes</strong></span>
                  </p>
                  <p class="flex items-center justify-center">
                    <i class="fas fa-check-circle text-neutral-900 mr-2"></i>
                    <span>Família unida em Cristo</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Banner */}
            <div class="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl p-12 text-center text-white shadow-2xl">
              <p class="text-3xl md:text-4xl font-serif italic mb-6 leading-relaxed">
                "Somos uma família unida pelo amor de Cristo, comprometida em impactar vidas e transformar comunidades através do Evangelho e da oração."
              </p>
              <div class="border-t border-neutral-700 pt-6 mt-6">
                <p class="text-xl font-bold mb-2">Igreja House of Prayer</p>
                <p class="text-neutral-300">3379 Marietta, Georgia - Atlanta, USA</p>
              </div>
            </div>
          </div>

          {/* MISSÕES - Nova Seção com Fotos */}
          <div class="mt-32 mb-24">
            <div class="text-center mb-16">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Nosso Coração Missionário</p>
              <h4 class="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">Missões</h4>
              <p class="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                A HPC Atlanta tem um coração voltado para as missões globais. Levamos esperança, amor e o Evangelho a comunidades carentes, 
                impactando vidas em diferentes continentes através de projetos sociais, educacionais e evangelísticos.
              </p>
            </div>

            {/* Estatísticas de Impacto */}
            <div class="grid md:grid-cols-4 gap-6 mb-16">
              <div class="bg-neutral-900 text-white rounded-xl p-8 text-center shadow-lg">
                <div class="text-4xl font-bold mb-2">5</div>
                <p class="text-neutral-300 text-sm uppercase tracking-wide">Continentes</p>
              </div>
              <div class="bg-neutral-700 text-white rounded-xl p-8 text-center shadow-lg">
                <div class="text-4xl font-bold mb-2">1000+</div>
                <p class="text-neutral-300 text-sm uppercase tracking-wide">Crianças Alcançadas</p>
              </div>
              <div class="bg-neutral-900 text-white rounded-xl p-8 text-center shadow-lg">
                <div class="text-4xl font-bold mb-2">50+</div>
                <p class="text-neutral-300 text-sm uppercase tracking-wide">Projetos Realizados</p>
              </div>
              <div class="bg-neutral-700 text-white rounded-xl p-8 text-center shadow-lg">
                <div class="text-4xl font-bold mb-2">10</div>
                <p class="text-neutral-300 text-sm uppercase tracking-wide">Anos de Missões</p>
              </div>
            </div>

            {/* Grid de Fotos Missionárias */}
            <div class="grid md:grid-cols-2 gap-8 mb-12">
              {/* Foto 1 - Crianças com Presentes */}
              <div class="bg-neutral-50 rounded-xl overflow-hidden shadow-lg border-2 border-neutral-200 hover:shadow-2xl transition group">
                <div class="aspect-video overflow-hidden">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/74297c0a9d329ebdac912832fc4eccb6" 
                    alt="Projeto Missionário - Crianças" 
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-gift text-white"></i>
                    </div>
                    <h5 class="text-xl font-bold text-neutral-900">Doação de Presentes</h5>
                  </div>
                  <p class="text-neutral-600 leading-relaxed">
                    Levamos alegria e esperança a crianças em comunidades carentes, distribuindo presentes e compartilhando o amor de Cristo através de ações práticas.
                  </p>
                </div>
              </div>

              {/* Foto 2 - Escola/Comunidade */}
              <div class="bg-neutral-50 rounded-xl overflow-hidden shadow-lg border-2 border-neutral-200 hover:shadow-2xl transition group">
                <div class="aspect-video overflow-hidden">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/962b03a14b7bc582d21ba22c74d55939" 
                    alt="Projeto Missionário - Escola" 
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-school text-white"></i>
                    </div>
                    <h5 class="text-xl font-bold text-neutral-900">Projetos Educacionais</h5>
                  </div>
                  <p class="text-neutral-600 leading-relaxed">
                    Apoiamos comunidades através de projetos educacionais, fornecendo material escolar, recursos e palavras de esperança para centenas de crianças.
                  </p>
                </div>
              </div>

              {/* Foto 3 - Quadra Esportiva */}
              <div class="bg-neutral-50 rounded-xl overflow-hidden shadow-lg border-2 border-neutral-200 hover:shadow-2xl transition group">
                <div class="aspect-video overflow-hidden">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/02df4000e5537052f53ae95f81ce465f" 
                    alt="Projeto Missionário - Esporte" 
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-futbol text-white"></i>
                    </div>
                    <h5 class="text-xl font-bold text-neutral-900">Infraestrutura Comunitária</h5>
                  </div>
                  <p class="text-neutral-600 leading-relaxed">
                    Construímos e reformamos espaços comunitários, como quadras esportivas, criando ambientes seguros para crianças e jovens crescerem com dignidade.
                  </p>
                </div>
              </div>

              {/* Foto 4 - Arrecadação de Suprimentos */}
              <div class="bg-neutral-50 rounded-xl overflow-hidden shadow-lg border-2 border-neutral-200 hover:shadow-2xl transition group">
                <div class="aspect-video overflow-hidden">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/bcfd0e5e8f712a2a2d6d32fcc135c2a4" 
                    alt="Projeto Missionário - Arrecadação" 
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center mr-3">
                      <i class="fas fa-hands-helping text-white"></i>
                    </div>
                    <h5 class="text-xl font-bold text-neutral-900">Arrecadação e Envio</h5>
                  </div>
                  <p class="text-neutral-600 leading-relaxed">
                    Mobilizamos nossa comunidade para arrecadar alimentos, roupas, medicamentos e suprimentos essenciais, enviando esperança a quem mais precisa.
                  </p>
                </div>
              </div>
            </div>

            {/* Chamado para Ação Missionária */}
            <div class="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl p-12 text-center text-white shadow-2xl">
              <div class="max-w-3xl mx-auto">
                <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i class="fas fa-heart text-neutral-900 text-3xl"></i>
                </div>
                <h5 class="text-3xl font-bold mb-4">Faça Parte desta Missão</h5>
                <p class="text-xl text-neutral-300 mb-8 leading-relaxed">
                  Cada contribuição, cada oração, cada gesto de amor transforma vidas. 
                  Junte-se a nós nesta jornada de levar esperança ao mundo.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="#contact" class="inline-flex items-center px-8 py-4 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-100 transition shadow-lg">
                    <i class="fas fa-envelope mr-3"></i>
                    Entre em Contato
                  </a>
                  <a href="tel:+17708620756" class="inline-flex items-center px-8 py-4 bg-neutral-700 text-white rounded-full font-bold hover:bg-neutral-600 transition">
                    <i class="fas fa-phone mr-3"></i>
                    +1 (770) 862-0756
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule and Leadership Section - After HPC Guide */}
          <div class="mt-24 mb-24">
            <div class="text-center mb-16">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Informações da Igreja</p>
              <h4 class="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">Horários e Liderança</h4>
              <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
                Conheça nossos horários de cultos e a liderança da HPC Atlanta
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-16">
              {/* Schedule Card - Elegant Black/White/Gray */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                <div class="flex items-center mb-6">
                  <div class="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center mr-4">
                    <i class="far fa-calendar-alt text-white text-2xl"></i>
                  </div>
                  <h5 class="text-2xl font-bold text-neutral-900">Horários de Cultos</h5>
                </div>
                
                <div class="space-y-4">
                  <div class="bg-white rounded-lg p-5 border-2 border-neutral-200 hover:shadow-md transition">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xl font-bold text-neutral-900 mb-1">Domingo</p>
                        <p class="text-neutral-600 text-sm">Culto de Celebração</p>
                      </div>
                      <div class="text-right">
                        <p class="text-2xl font-bold text-neutral-900">10:00 AM</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white rounded-lg p-5 border-2 border-neutral-200 hover:shadow-md transition">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xl font-bold text-neutral-900 mb-1">Quarta-feira</p>
                        <p class="text-neutral-600 text-sm">Culto de Oração</p>
                      </div>
                      <div class="text-right">
                        <p class="text-2xl font-bold text-neutral-900">19:00</p>
                        <p class="text-xs text-neutral-500">7:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white rounded-lg p-5 border-2 border-neutral-200 hover:shadow-md transition">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xl font-bold text-neutral-900 mb-1">Sexta-feira</p>
                        <p class="text-neutral-600 text-sm">Estudo Bíblico</p>
                      </div>
                      <div class="text-right">
                        <p class="text-2xl font-bold text-neutral-900">19:00</p>
                        <p class="text-xs text-neutral-500">7:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white rounded-lg p-5 border-2 border-neutral-200 hover:shadow-md transition">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-xl font-bold text-neutral-900 mb-1">Segunda-feira</p>
                        <p class="text-neutral-600 text-sm">Escola Teológica</p>
                      </div>
                      <div class="text-right">
                        <p class="text-2xl font-bold text-neutral-900">Noite</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 pt-6 border-t border-neutral-300">
                  <div class="flex items-center text-neutral-600">
                    <i class="fas fa-map-marker-alt mr-3 text-neutral-900"></i>
                    <div>
                      <p class="font-semibold text-neutral-900">3379 Canton Rd</p>
                      <p class="text-sm">Marietta, GA 30066</p>
                    </div>
                  </div>
                  <div class="flex items-center text-neutral-600 mt-3">
                    <i class="fas fa-phone mr-3 text-neutral-900"></i>
                    <p class="font-semibold">+1 (770) 862-0756</p>
                  </div>
                </div>
              </div>

              {/* Leadership Card */}
              <div class="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-xl p-8 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-4">
                    <i class="fas fa-users text-neutral-900 text-2xl"></i>
                  </div>
                  <h5 class="text-2xl font-bold">Liderança da Igreja</h5>
                </div>

                {/* Fundadores */}
                <div class="mb-6 pb-6 border-b border-neutral-700">
                  <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-3">
                    <i class="fas fa-crown mr-2"></i>Fundadores
                  </p>
                  <p class="text-lg font-semibold text-white">Pr. Otávio Amorim e Natália Müller</p>
                </div>

                {/* Co-Fundadores */}
                <div class="mb-6 pb-6 border-b border-neutral-700">
                  <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-3">
                    <i class="fas fa-hands-helping mr-2"></i>Co-Fundadores
                  </p>
                  <p class="text-base text-neutral-200">Luciane Gomes e Ilson Gomes</p>
                </div>

                {/* Diretoria */}
                <div class="mb-6 pb-6 border-b border-neutral-700">
                  <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">
                    <i class="fas fa-user-tie mr-2"></i>Diretoria
                  </p>
                  <div class="grid grid-cols-1 gap-2 text-sm text-neutral-200">
                    <div class="flex items-center">
                      <i class="fas fa-circle text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Douglas Fontes</strong> - Presidente</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-circle text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Taís Fontes</strong> - Vice Presidente</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-circle text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Elias Silveira</strong> - 1º Secretário</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-circle text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Priscila Silveira</strong> - 2ª Secretária</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-circle text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Sandra Godfrey</strong> - Tesoureira</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-circle text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Fabiano Ventura</strong> - 2º Tesoureiro</span>
                    </div>
                  </div>
                </div>

                {/* Ministério de Louvor */}
                <div>
                  <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">
                    <i class="fas fa-music mr-2"></i>Ministério de Louvor
                  </p>
                  <div class="space-y-2 text-sm text-neutral-200">
                    <div class="flex items-center">
                      <i class="fas fa-microphone text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Renata Ventura</strong> - Líder</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-microphone text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Pra. Natália Müller</strong> - Diretora Musical</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-microphone text-xs mr-3 text-neutral-500"></i>
                      <span><strong>Fabiano e Ana</strong> - Coordenadores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Missionary Projects Section - Moved after HPC Guide */}
          <div class="mt-24 mb-24">
            <div class="text-center mb-12">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Alcançando Nações</p>
              <h4 class="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">Projetos Missionários</h4>
              <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
                Levando o amor de Cristo às nações através de projetos transformadores
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Guinea-Bissau */}
              <div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-globe-africa text-white text-xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Guiné-Bissau</h5>
                <p class="text-neutral-600 mb-3">Projeto missionário na África apoiando orfanato infantil e escola para crianças.</p>
                <p class="text-sm text-neutral-500">
                  <i class="fas fa-user mr-2"></i>Missionário: Gilbert
                </p>
              </div>

              {/* India */}
              <div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-hands-praying text-white text-xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Índia</h5>
                <p class="text-neutral-600 mb-3">Capacitação de 30 pastores indígenas através do Project Compassion.</p>
                <p class="text-sm text-neutral-500">
                  <i class="fas fa-user mr-2"></i>Missionário: Marcelo
                </p>
              </div>

              {/* Portugal */}
              <div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-church text-white text-xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Portugal</h5>
                <p class="text-neutral-600 mb-3">Implantação de congregação e apoio a missões portuguesas.</p>
                <p class="text-sm text-neutral-500">
                  <i class="fas fa-user mr-2"></i>Missionário: Pr. Carlos Antunes
                </p>
              </div>

              {/* Brazil */}
              <div class="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div class="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-heart text-white text-xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Brasil</h5>
                <p class="text-neutral-600 mb-3">Apoio a projetos sociais e evangelísticos em comunidades brasileiras.</p>
                <p class="text-sm text-neutral-500">
                  <i class="fas fa-map-marker-alt mr-2"></i>Várias regiões
                </p>
              </div>
            </div>
          </div>

          {/* Programs Section - Moved after HPC Guide */}
          <div class="mb-16">
            <div class="text-center mb-12">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Servindo a Comunidade</p>
              <h4 class="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">Programas e Iniciativas</h4>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              {/* Sports Program - Elegant Black/White/Gray */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-8 shadow-md hover:shadow-xl transition">
                <div class="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                  <i class="fas fa-futbol text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Escola de Futebol</h5>
                <p class="text-neutral-700 mb-3 font-semibold">Pavillion One</p>
                <p class="text-neutral-600">
                  Programa esportivo para crianças e jovens, desenvolvendo talentos e valores cristãos através do esporte.
                </p>
              </div>

              {/* Social Initiatives - Elegant Black/White/Gray */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-8 shadow-md hover:shadow-xl transition">
                <div class="w-14 h-14 bg-neutral-700 rounded-full flex items-center justify-center mb-4">
                  <i class="fas fa-hands-helping text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Iniciativas Sociais</h5>
                <p class="text-neutral-600 space-y-2">
                  <span class="block">• Visitas a lares de idosos</span>
                  <span class="block">• Apoio a orfanatos</span>
                  <span class="block">• Cafés comunitários</span>
                  <span class="block">• Assistência a necessitados</span>
                </p>
              </div>

              {/* Special Projects - Elegant Black/White/Gray */}
              <div class="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-8 shadow-md hover:shadow-xl transition">
                <div class="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                  <i class="fas fa-star text-white text-2xl"></i>
                </div>
                <h5 class="text-xl font-bold text-neutral-900 mb-3">Projeto Taysha Souza</h5>
                <p class="text-neutral-600 mb-3">
                  Desfiles de moda evangelísticos apresentando a mensagem de Cristo através da arte e da moda.
                </p>
                <p class="text-sm text-neutral-500 italic">
                  Unindo criatividade e evangelismo
                </p>
              </div>
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
