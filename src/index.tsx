import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav class="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center">
              <h1 class="text-2xl font-serif font-bold tracking-tight text-neutral-900">Grace Church Melbourne</h1>
            </div>
            <div class="hidden md:flex space-x-10">
              <a href="#discover" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Descobrir</a>
              <a href="#team" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Servir</a>
              <a href="#baptism" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Batismo</a>
              <a href="#groups" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Grupos</a>
              <a href="#connect" class="text-sm font-medium tracking-wide text-neutral-600 hover:text-neutral-900 transition uppercase">Conectar</a>
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
            <a href="#groups" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Grupos</a>
            <a href="#connect" class="block px-3 py-3 text-neutral-700 hover:bg-neutral-100 transition">Conectar</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="pt-20 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div class="text-center max-w-4xl mx-auto">
            <p class="text-sm font-medium tracking-widest text-neutral-300 uppercase mb-6">Grace Church Melbourne</p>
            <h2 class="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Dê Seu Próximo Passo.</h2>
            <p class="text-xl md:text-2xl mb-10 text-neutral-200 font-light leading-relaxed">
              Venha e encontre esperança real para a vida real que só pode ser encontrada em Jesus!
            </p>
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 inline-block">
              <p class="text-base font-medium text-neutral-100 mb-2 uppercase tracking-wide">
                Inscrevendo Agora
              </p>
              <p class="text-2xl font-serif font-bold">
                2 de Dezembro de 2025
              </p>
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
              <h3 class="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-8 leading-tight">Descubra a Grace Church</h3>
              <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
                Na Grace Church, somos apaixonados por criar uma atmosfera acolhedora onde as pessoas podem se reunir para celebrar e aprender sobre a esperança e o amor de Jesus.
              </p>
              <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-8 mb-8">
                <p class="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wide">
                  <i class="far fa-calendar mr-2"></i>
                  Próximo Evento
                </p>
                <p class="text-2xl font-serif font-bold text-neutral-900 mb-1">20 de Novembro de 2025</p>
                <p class="text-neutral-600">18:00</p>
              </div>
              <p class="text-neutral-600 mb-8 leading-relaxed">
                Nos esforçamos para criar um ambiente onde todos se sintam bem-vindos e amados, não importa quem você seja ou de onde você venha.
              </p>
              <button class="btn-primary" onclick="openModal('discover')">
                Inscreva-se Agora
              </button>
            </div>
            <div class="relative">
              <div class="aspect-square bg-gradient-to-br from-neutral-300 via-neutral-200 to-neutral-100 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
                <i class="fas fa-church text-neutral-400 text-9xl"></i>
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
              <div class="aspect-square bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-800 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
                <i class="fas fa-hands-helping text-neutral-400 text-9xl"></i>
              </div>
              <div class="absolute -top-6 -left-6 w-32 h-32 bg-neutral-100 rounded-lg -z-10"></div>
            </div>
            <div class="order-1 md:order-2">
              <p class="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">Oportunidades de Servir</p>
              <h3 class="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Descubra a Equipe dos Sonhos</h3>
              <p class="text-lg text-neutral-300 mb-8 leading-relaxed">
                Explore a vida da nossa igreja, incluindo nossos ministérios vibrantes, eventos futuros e oportunidades de servir.
              </p>
              <p class="text-neutral-300 mb-8 leading-relaxed">
                Perfeito para recém-chegados ou aqueles que se sentem estagnados em sua fé. Ajudamos você a encontrar os próximos passos para servir e fazer a diferença na comunidade.
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
              <div class="aspect-square bg-gradient-to-br from-neutral-200 via-neutral-100 to-white rounded-lg shadow-xl flex items-center justify-center overflow-hidden border border-neutral-200">
                <i class="fas fa-water text-neutral-300 text-9xl"></i>
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
                Apoie o ministério da Grace Church com sua generosidade.
              </p>
              <button class="btn-secondary" onclick="openModal('give')">
                Fazer Doação
              </button>
            </div>
          </div>
          <div class="mt-16 bg-neutral-900 rounded-lg p-10 md:p-12 text-white">
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="mb-8 md:mb-0 md:mr-8">
                <h4 class="text-2xl font-serif font-bold mb-3">Guia SOAP</h4>
                <p class="text-neutral-300 leading-relaxed">
                  Leia a Bíblia usando o método de estudo SOAP: Escritura, Observação, Aplicação, Oração.
                </p>
              </div>
              <button class="bg-white text-neutral-900 px-8 py-4 rounded-lg text-base font-semibold hover:bg-neutral-100 transition tracking-wide whitespace-nowrap">
                Baixar Guia
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
              <h4 class="text-xl font-serif font-bold mb-4">Grace Church Melbourne</h4>
              <p class="text-neutral-400 leading-relaxed mb-4">
                Transformando a Costa Espacial com o amor radical de Jesus.
              </p>
              <p class="text-sm text-neutral-500">
                Uma atmosfera acolhedora onde todos se sentem bem-vindos e amados.
              </p>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Horários de Culto</h4>
              <p class="text-neutral-400 mb-2">
                Quintas-feiras às 19:30
              </p>
              <p class="text-neutral-400 mb-2">
                Domingos às 8:30, 10:15 e 12:00
              </p>
              <div class="mt-6">
                <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Contato</h4>
                <p class="text-neutral-400 mb-2">
                  <i class="fas fa-envelope mr-2"></i>
                  contato@gracechurch.life
                </p>
                <p class="text-neutral-400">
                  <i class="fas fa-phone mr-2"></i>
                  (321) 555-0123
                </p>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4 uppercase tracking-wide text-neutral-300">Siga-nos</h4>
              <div class="flex space-x-4 mb-8">
                <a href="https://www.instagram.com/gracechurch.life/" target="_blank" class="w-12 h-12 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition">
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
            <p class="text-neutral-500 text-sm">&copy; 2025 Grace Church Melbourne. Todos os direitos reservados.</p>
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
