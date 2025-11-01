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
            src="https://page.gensparksite.com/v1/base64_upload/69b8d7407c00cb3f6eb54c1c9442525c" 
            alt="HPC Atlanta - House of Prayer for all Nations - Momento de Louvor"
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
                  src="https://page.gensparksite.com/v1/base64_upload/83e4ca4ceb1cb41bfa31534864273b94" 
                  alt="Pastores Pr. Otávio Amorim e Natália Müller - HPC Atlanta" 
                  class="w-full h-full object-cover"
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
                  src="https://page.gensparksite.com/v1/base64_upload/a9eef18df924d19ddf1f7d71fcaf3398" 
                  alt="Pregação na HPC Atlanta - Pr. Otávio Amorim" 
                  class="w-full h-full object-cover"
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
              <div class="aspect-square bg-gradient-to-br from-neutral-200 via-neutral-100 to-white rounded-lg shadow-xl flex items-center justify-center overflow-hidden border border-neutral-200 p-12">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" 
                  alt="House of Prayer Logo" 
                  class="w-full h-full object-contain"
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
            {/* Instagram Photo 1 */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://scontent.cdninstagram.com/v/t51.82787-15/530569080_17855597928490585_2936669851301207883_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_cat=108&ccb=1-7&_nc_sid=58cdad&_nc_ohc=EZ9XwkJZ3qAQ7kNvwFyu8e1&_nc_ht=scontent.cdninstagram.com" 
                alt="HPC Atlanta - Comunidade"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Culto de Domingo</p>
              </div>
            </a>

            {/* Instagram Photo 2 - Pastores */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/83e4ca4ceb1cb41bfa31534864273b94" 
                alt="HPC Atlanta - Pastores Pr. Otávio Amorim e Natália Müller"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Nossos Pastores</p>
              </div>
            </a>

            {/* Instagram Photo 3 - Pregação */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/a9eef18df924d19ddf1f7d71fcaf3398" 
                alt="HPC Atlanta - Pregação com Pr. Otávio Amorim"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Palavra de Deus</p>
              </div>
            </a>

            {/* Instagram Photo 4 */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://scontent.cdninstagram.com/v/t51.82787-15/561096550_1437843977690829_3319828866027055270_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=yF8g1J3QkIEQ7kNvgGXFhRY&_nc_ht=scontent.cdninstagram.com" 
                alt="HPC Atlanta - Culto"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Culto Especial</p>
              </div>
            </a>

            {/* Instagram Photo 5 */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://scontent.cdninstagram.com/v/t51.82787-15/559894457_18372738904194154_4937057567211985368_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=v8XKHzN8mX8Q7kNvgHLXbJt&_nc_ht=scontent.cdninstagram.com" 
                alt="HPC Atlanta - Mensagem de Fé"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Palavra de Fé</p>
              </div>
            </a>

            {/* Instagram Photo 6 */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://scontent.cdninstagram.com/v/t51.82787-15/559776359_17862050721490585_5944130804050215600_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_cat=106&ccb=1-7&_nc_sid=18de74&_nc_ohc=wP9Xf5b2XNMQ7kNvgHKp8Fh&_nc_ht=scontent.cdninstagram.com" 
                alt="HPC Atlanta - Família Reunida"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Nossa Família</p>
              </div>
            </a>

            {/* Instagram Photo 7 */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://scontent.cdninstagram.com/v/t51.82787-15/554906771_18371893435194154_4303645085401162689_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=dL8PmJ9vYy0Q7kNvgFZRXwN&_nc_ht=scontent.cdninstagram.com" 
                alt="HPC Atlanta - Dia Especial"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Dia Especial</p>
              </div>
            </a>

            {/* Instagram Photo 8 */}
            <a href="https://www.instagram.com/hpcatlanta/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
              <img 
                src="https://scontent.cdninstagram.com/v/t51.82787-15/552573643_17860612692490585_6881815553668219175_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=KL9YmF8jXB4Q7kNvgHwXcNz&_nc_ht=scontent.cdninstagram.com" 
                alt="HPC Atlanta - Visita do Bispo"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p class="text-white text-sm font-medium">Visita do Bispo</p>
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
