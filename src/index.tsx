import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav class="bg-white shadow-sm fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">Grace Church</h1>
            </div>
            <div class="hidden md:flex space-x-8">
              <a href="#discover" class="text-gray-700 hover:text-blue-600 transition">Descobrir</a>
              <a href="#team" class="text-gray-700 hover:text-blue-600 transition">Equipe</a>
              <a href="#baptism" class="text-gray-700 hover:text-blue-600 transition">Batismo</a>
              <a href="#groups" class="text-gray-700 hover:text-blue-600 transition">Grupos</a>
              <a href="#connect" class="text-gray-700 hover:text-blue-600 transition">Conectar</a>
            </div>
            <button id="mobile-menu-btn" class="md:hidden text-gray-700">
              <i class="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a href="#discover" class="block px-3 py-2 text-gray-700 hover:bg-gray-100">Descobrir</a>
            <a href="#team" class="block px-3 py-2 text-gray-700 hover:bg-gray-100">Equipe</a>
            <a href="#baptism" class="block px-3 py-2 text-gray-700 hover:bg-gray-100">Batismo</a>
            <a href="#groups" class="block px-3 py-2 text-gray-700 hover:bg-gray-100">Grupos</a>
            <a href="#connect" class="block px-3 py-2 text-gray-700 hover:bg-gray-100">Conectar</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="pt-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div class="text-center">
            <h2 class="text-5xl md:text-6xl font-bold mb-6">Dê Seu Próximo Passo.</h2>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
              Junte-se a nós em uma jornada de fé, crescimento e comunidade.
            </p>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p class="text-lg font-semibold">
                <i class="far fa-calendar-check mr-2"></i>
                Agora inscrevendo para 2 de Dezembro de 2025
              </p>
            </div>
          </div>
        </div>
        <div class="wave-bottom"></div>
      </section>

      {/* Discover Grace Church Section */}
      <section id="discover" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-4xl font-bold text-gray-900 mb-6">Descubra a Grace Church</h3>
              <p class="text-lg text-gray-700 mb-6">
                Uma orientação especial para recém-chegados conhecerem nossa visão, valores fundamentais e como encontrar seu lugar em nossa comunidade.
              </p>
              <div class="bg-blue-50 rounded-lg p-6 mb-6">
                <p class="text-lg font-semibold text-blue-900 mb-2">
                  <i class="far fa-calendar mr-2"></i>
                  Próximo Evento
                </p>
                <p class="text-gray-700">20 de Novembro de 2025 às 18:00</p>
              </div>
              <p class="text-gray-700 mb-6">
                Este evento ajuda você a descobrir onde você pertence e como ser conectado, conhecido e amado em nossa comunidade.
              </p>
              <button class="btn-primary" onclick="openModal('discover')">
                Inscreva-se Agora
              </button>
            </div>
            <div class="relative">
              <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-2xl flex items-center justify-center">
                <i class="fas fa-church text-white text-9xl opacity-20"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dream Team Section */}
      <section id="team" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1 relative">
              <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-2xl flex items-center justify-center">
                <i class="fas fa-users text-white text-9xl opacity-20"></i>
              </div>
            </div>
            <div class="order-1 md:order-2">
              <h3 class="text-4xl font-bold text-gray-900 mb-6">Descubra a Equipe dos Sonhos</h3>
              <p class="text-lg text-gray-700 mb-6">
                Uma introdução ao serviço e envolvimento da equipe. Descubra como crescer espiritualmente através do serviço aos outros.
              </p>
              <p class="text-gray-700 mb-6">
                Perfeito para recém-chegados ou aqueles que se sentem estagnados em sua fé. Ajudamos você a encontrar os próximos passos para servir e fazer a diferença.
              </p>
              <button class="btn-primary" onclick="openModal('team')">
                Junte-se à Equipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Baptism Section */}
      <section id="baptism" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h3 class="text-4xl font-bold text-gray-900 mb-6">Batismo</h3>
            <p class="text-xl text-gray-700 mb-6">
              Adoraríamos que você participasse do Batismo!
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="relative">
              <div class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">
                <i class="fas fa-water text-white text-9xl opacity-20"></i>
              </div>
            </div>
            <div>
              <div class="bg-blue-50 rounded-lg p-8 mb-6">
                <p class="text-lg text-gray-800 mb-4">
                  <i class="fas fa-book-bible mr-2 text-blue-600"></i>
                  <strong>Atos 2:38</strong>
                </p>
                <p class="text-gray-700 italic">
                  "Arrependam-se, e cada um de vocês seja batizado em nome de Jesus Cristo para perdão dos seus pecados, e receberão o dom do Espírito Santo."
                </p>
              </div>
              <p class="text-gray-700 mb-6">
                O batismo é um passo importante na jornada de fé. É uma declaração pública do seu compromisso com Cristo e uma celebração da nova vida que você encontrou Nele.
              </p>
              <button class="btn-primary" onclick="openModal('baptism')">
                Quero ser Batizado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Connection Groups Section */}
      <section id="groups" class="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h3 class="text-4xl font-bold mb-6">Grupos de Conexão</h3>
            <p class="text-2xl font-semibold mb-4">Somos Melhores Juntos</p>
            <p class="text-xl text-purple-100">
              As inscrições estão abertas para grupos de outono!
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <i class="fas fa-book-open text-4xl mb-4"></i>
              <h4 class="text-xl font-bold mb-3">Estudo Bíblico</h4>
              <p class="text-purple-100">
                Aprofunde-se na Palavra de Deus com outros crentes em um ambiente acolhedor e encorajador.
              </p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <i class="fas fa-heart text-4xl mb-4"></i>
              <h4 class="text-xl font-bold mb-3">Grupos de Atividades</h4>
              <p class="text-purple-100">
                Construa amizades através de interesses compartilhados e atividades divertidas.
              </p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <i class="fas fa-hands-helping text-4xl mb-4"></i>
              <h4 class="text-xl font-bold mb-3">Grupos de Serviço</h4>
              <p class="text-purple-100">
                Sirva juntos e faça a diferença na comunidade enquanto cresce em fé.
              </p>
            </div>
          </div>
          <div class="text-center">
            <p class="text-xl mb-6">
              Construa amizades, compartilhe a vida e desenvolva relacionamentos autênticos.
            </p>
            <button class="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition" onclick="openModal('groups')">
              Encontre Seu Grupo
            </button>
          </div>
        </div>
      </section>

      {/* Get Connected Section */}
      <section id="connect" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h3 class="text-4xl font-bold text-gray-900 mb-6">Conecte-se Conosco</h3>
            <p class="text-xl text-gray-700">
              Não importa em que fase da vida você esteja, queremos ajudá-lo a dar o próximo passo.
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <i class="fas fa-id-card text-5xl text-blue-600 mb-4"></i>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Cartão de Conexão</h4>
              <p class="text-gray-700 mb-6">
                Preencha um cartão de conexão para nos contar mais sobre você.
              </p>
              <button class="btn-secondary" onclick="openModal('connect')">
                Preencher Cartão
              </button>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <i class="fas fa-praying-hands text-5xl text-green-600 mb-4"></i>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Pedidos de Oração</h4>
              <p class="text-gray-700 mb-6">
                Compartilhe seus pedidos de oração conosco. Adoraríamos orar por você.
              </p>
              <button class="btn-secondary" onclick="openModal('prayer')">
                Enviar Pedido
              </button>
            </div>
            <div class="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <i class="fas fa-hand-holding-heart text-5xl text-purple-600 mb-4"></i>
              <h4 class="text-2xl font-bold text-gray-900 mb-4">Contribuir</h4>
              <p class="text-gray-700 mb-6">
                Apoie o ministério da Grace Church com sua generosidade.
              </p>
              <button class="btn-secondary" onclick="openModal('give')">
                Fazer Doação
              </button>
            </div>
          </div>
          <div class="mt-16 bg-blue-50 rounded-lg p-8">
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="mb-6 md:mb-0">
                <h4 class="text-2xl font-bold text-gray-900 mb-2">Guia SOAP</h4>
                <p class="text-gray-700">
                  Leia a Bíblia usando o método de estudo SOAP: Escritura, Observação, Aplicação, Oração.
                </p>
              </div>
              <button class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                Baixar Guia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 class="text-xl font-bold mb-4">Grace Church</h4>
              <p class="text-gray-400">
                Uma comunidade de fé, esperança e amor.
              </p>
            </div>
            <div>
              <h4 class="text-xl font-bold mb-4">Contato</h4>
              <p class="text-gray-400 mb-2">
                <i class="fas fa-envelope mr-2"></i>
                contato@gracechurch.com
              </p>
              <p class="text-gray-400">
                <i class="fas fa-phone mr-2"></i>
                (11) 1234-5678
              </p>
            </div>
            <div>
              <h4 class="text-xl font-bold mb-4">Siga-nos</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-facebook text-2xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i class="fab fa-youtube text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Grace Church. Todos os direitos reservados.</p>
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
              <input type="text" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
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
