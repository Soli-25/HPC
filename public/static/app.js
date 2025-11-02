// Grace Church Melbourne - Interactive Features

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
  
  // Scroll Indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.body.prepend(scrollIndicator);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight);
    scrollIndicator.style.transform = `scaleX(${scrolled})`;
  });
  
  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});

// Modal Functionality
const modalData = {
  discover: {
    title: 'Inscreva-se: Descubra a HPC Atlanta',
    extraFields: ''
  },
  team: {
    title: 'Junte-se à Equipe da HPC',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Área de Interesse</label>
        <select name="interest" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione uma área</option>
          <option value="worship">Louvor e Adoração</option>
          <option value="kids">Ministério Infantil</option>
          <option value="youth">Ministério Jovem</option>
          <option value="hospitality">Hospitalidade</option>
          <option value="media">Mídia e Tecnologia</option>
          <option value="prayer">Equipe de Oração</option>
          <option value="other">Outro</option>
        </select>
      </div>
    `
  },
  baptism: {
    title: 'Quero ser Batizado',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Já foi batizado antes?</label>
        <select name="previous_baptism" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione</option>
          <option value="no">Não</option>
          <option value="yes">Sim</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Conte-nos sua história com Jesus</label>
        <textarea name="testimony" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Compartilhe brevemente como você conheceu Jesus..."></textarea>
      </div>
    `
  },
  groups: {
    title: 'Encontre Seu Grupo de Conexão',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Tipo de Grupo</label>
        <select name="group_type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione um tipo</option>
          <option value="bible">Estudo Bíblico</option>
          <option value="activity">Grupo de Atividades</option>
          <option value="service">Grupo de Serviço</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Dia Preferido</label>
        <select name="preferred_day" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione um dia</option>
          <option value="sunday">Domingo</option>
          <option value="monday">Segunda-feira</option>
          <option value="tuesday">Terça-feira</option>
          <option value="wednesday">Quarta-feira</option>
          <option value="thursday">Quinta-feira</option>
          <option value="friday">Sexta-feira</option>
          <option value="saturday">Sábado</option>
        </select>
      </div>
    `
  },
  connect: {
    title: 'Cartão de Conexão',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Como posso orar por você?</label>
        <textarea name="prayer_request" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Compartilhe seus pedidos de oração..."></textarea>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Como conheceu a HPC Atlanta?</label>
        <select name="how_found" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione</option>
          <option value="friend">Amigo/Familiar</option>
          <option value="online">Busca Online</option>
          <option value="social">Redes Sociais</option>
          <option value="event">Evento</option>
          <option value="other">Outro</option>
        </select>
      </div>
    `
  },
  prayer: {
    title: 'Pedido de Oração',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Seu Pedido de Oração</label>
        <textarea name="prayer_request" rows="5" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Compartilhe como podemos orar por você..."></textarea>
      </div>
      <div>
        <label class="flex items-center">
          <input type="checkbox" name="public_prayer" class="mr-2" />
          <span class="text-gray-700">Permitir que este pedido seja compartilhado publicamente (anônimo)</span>
        </label>
      </div>
    `
  },
  give: {
    title: 'Ofertas e Dízimos - HPC Atlanta',
    extraFields: `
      <div class="bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-300 rounded-lg p-6 mb-6">
        <div class="flex items-start gap-3 mb-4">
          <i class="fas fa-heart text-red-500 text-2xl mt-1"></i>
          <div>
            <p class="text-gray-800 font-semibold mb-2">Sua Generosidade Faz a Diferença</p>
            <p class="text-gray-700 text-sm leading-relaxed">
              Sua contribuição ajuda a manter a casa de oração aberta e espalhar o amor de Jesus para todas as nações.
            </p>
          </div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-md p-4">
          <p class="text-sm text-gray-600 italic">
            <i class="fas fa-bible text-neutral-500 mr-2"></i>
            "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria." - 2 Coríntios 9:7
          </p>
        </div>
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-800 font-bold mb-3 text-lg">Tipo de Contribuição</label>
        <div class="grid grid-cols-2 gap-4">
          <button type="button" onclick="selectGivingType('offering')" class="giving-type-btn border-2 border-neutral-300 rounded-lg p-4 text-center hover:border-neutral-900 hover:bg-neutral-50 transition" data-type="offering">
            <i class="fas fa-hand-holding-heart text-3xl text-neutral-600 mb-2"></i>
            <p class="font-semibold text-neutral-900">Oferta</p>
            <p class="text-xs text-gray-600 mt-1">Contribuição voluntária</p>
          </button>
          <button type="button" onclick="selectGivingType('tithe')" class="giving-type-btn border-2 border-neutral-300 rounded-lg p-4 text-center hover:border-neutral-900 hover:bg-neutral-50 transition" data-type="tithe">
            <i class="fas fa-percentage text-3xl text-neutral-600 mb-2"></i>
            <p class="font-semibold text-neutral-900">Dízimo</p>
            <p class="text-xs text-gray-600 mt-1">10% da renda</p>
          </button>
        </div>
        <input type="hidden" name="giving_type" id="giving_type" required />
      </div>

      <div class="mb-6">
        <label class="block text-gray-800 font-bold mb-3">Valor em USD ($)</label>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <button type="button" onclick="setAmount(20)" class="amount-btn border-2 border-neutral-300 rounded-lg py-3 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition">
            $20
          </button>
          <button type="button" onclick="setAmount(50)" class="amount-btn border-2 border-neutral-300 rounded-lg py-3 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition">
            $50
          </button>
          <button type="button" onclick="setAmount(100)" class="amount-btn border-2 border-neutral-300 rounded-lg py-3 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition">
            $100
          </button>
          <button type="button" onclick="setAmount(200)" class="amount-btn border-2 border-neutral-300 rounded-lg py-3 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition">
            $200
          </button>
          <button type="button" onclick="setAmount(500)" class="amount-btn border-2 border-neutral-300 rounded-lg py-3 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition">
            $500
          </button>
          <button type="button" onclick="setAmount(1000)" class="amount-btn border-2 border-neutral-300 rounded-lg py-3 font-semibold hover:border-neutral-900 hover:bg-neutral-50 transition">
            $1000
          </button>
        </div>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
          <input type="number" name="amount" id="amount" min="1" step="0.01" placeholder="Outro valor" required class="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-neutral-900 text-lg font-semibold" />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-gray-800 font-bold mb-3">Frequência</label>
        <select name="frequency" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-neutral-900 font-semibold">
          <option value="once">Uma vez</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensal</option>
        </select>
      </div>

      <div class="mb-6">
        <label class="block text-gray-800 font-bold mb-3 text-lg">
          <i class="fas fa-credit-card mr-2"></i>
          Formas de Pagamento
        </label>
        
        <div class="bg-white border-2 border-neutral-200 rounded-lg p-5 space-y-4">
          <!-- USA Payment Methods -->
          <div class="pb-4 border-b border-neutral-200">
            <p class="text-sm font-bold text-neutral-700 mb-3 uppercase tracking-wide">
              <i class="fas fa-flag-usa mr-2"></i>
              Pagamentos nos EUA
            </p>
            <div class="space-y-2">
              <a href="https://www.paypal.com" target="_blank" class="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fab fa-paypal text-2xl text-blue-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">PayPal</p>
                    <p class="text-xs text-gray-600">Cartão de crédito, débito ou conta PayPal</p>
                  </div>
                </div>
                <i class="fas fa-external-link-alt text-blue-600 opacity-0 group-hover:opacity-100 transition"></i>
              </a>
              
              <a href="https://venmo.com" target="_blank" class="flex items-center justify-between p-3 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fas fa-mobile-alt text-2xl text-sky-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">Venmo</p>
                    <p class="text-xs text-gray-600">Pagamento rápido via app</p>
                  </div>
                </div>
                <i class="fas fa-qrcode text-sky-600 text-xl"></i>
              </a>
              
              <a href="https://cash.app" target="_blank" class="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fas fa-dollar-sign text-2xl text-green-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">Cash App</p>
                    <p class="text-xs text-gray-600">Transferência instantânea</p>
                  </div>
                </div>
                <i class="fas fa-qrcode text-green-600 text-xl"></i>
              </a>

              <a href="https://www.zellepay.com" target="_blank" class="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fas fa-bolt text-2xl text-purple-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">Zelle</p>
                    <p class="text-xs text-gray-600">Transferência bancária direta</p>
                  </div>
                </div>
                <i class="fas fa-external-link-alt text-purple-600 opacity-0 group-hover:opacity-100 transition"></i>
              </a>
            </div>
          </div>

          <!-- International Payment Methods -->
          <div>
            <p class="text-sm font-bold text-neutral-700 mb-3 uppercase tracking-wide">
              <i class="fas fa-globe mr-2"></i>
              Pagamentos Internacionais
            </p>
            <div class="space-y-2">
              <a href="https://wise.com" target="_blank" class="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fas fa-exchange-alt text-2xl text-emerald-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">Wise (TransferWise)</p>
                    <p class="text-xs text-gray-600">Transferência internacional com baixas taxas</p>
                  </div>
                </div>
                <i class="fas fa-external-link-alt text-emerald-600 opacity-0 group-hover:opacity-100 transition"></i>
              </a>

              <a href="https://www.paypal.com" target="_blank" class="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fab fa-paypal text-2xl text-blue-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">PayPal Internacional</p>
                    <p class="text-xs text-gray-600">Aceita cartões de todo o mundo</p>
                  </div>
                </div>
                <i class="fas fa-external-link-alt text-blue-600 opacity-0 group-hover:opacity-100 transition"></i>
              </a>

              <a href="https://www.westernunion.com" target="_blank" class="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fas fa-globe-americas text-2xl text-yellow-600"></i>
                  <div>
                    <p class="font-semibold text-gray-900">Western Union</p>
                    <p class="text-xs text-gray-600">Transferência internacional em dinheiro</p>
                  </div>
                </div>
                <i class="fas fa-external-link-alt text-yellow-600 opacity-0 group-hover:opacity-100 transition"></i>
              </a>

              <button type="button" onclick="showQRCode()" class="w-full flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition group">
                <div class="flex items-center gap-3">
                  <i class="fas fa-qrcode text-2xl text-neutral-600"></i>
                  <div class="text-left">
                    <p class="font-semibold text-gray-900">PIX / QR Code</p>
                    <p class="text-xs text-gray-600">Pagamento via QR Code (Brasil e outros)</p>
                  </div>
                </div>
                <i class="fas fa-chevron-right text-neutral-600"></i>
              </button>
            </div>
          </div>

          <div class="pt-4 border-t border-neutral-200">
            <div class="bg-neutral-50 rounded-lg p-4">
              <p class="text-sm text-gray-700 font-semibold mb-2">
                <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                Pagamento Seguro e Protegido
              </p>
              <p class="text-xs text-gray-600 leading-relaxed">
                Todas as transações são processadas de forma segura através de plataformas confiáveis e certificadas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-neutral-100 to-neutral-50 border border-neutral-300 rounded-lg p-4 mb-4">
        <p class="text-sm text-gray-700 text-center">
          <i class="fas fa-info-circle text-neutral-600 mr-2"></i>
          Após selecionar o método de pagamento, você será redirecionado para completar sua doação de forma segura.
        </p>
      </div>

      <!-- Contact Information (Optional) -->
      <div class="border-t border-neutral-300 pt-6 mt-6">
        <p class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          <i class="fas fa-user-circle mr-2"></i>
          Informações de Contato (Opcional)
        </p>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Nome Completo</label>
            <input type="text" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Seu nome (opcional)" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="seu@email.com (opcional)" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Telefone</label>
            <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="(000) 000-0000 (opcional)" />
          </div>
        </div>
      </div>
    `
  }
};

function openModal(type) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalExtraFields = document.getElementById('modal-extra-fields');
  const modalForm = document.getElementById('modal-form');
  
  if (modal && modalData[type]) {
    modalTitle.textContent = modalData[type].title;
    modalExtraFields.innerHTML = modalData[type].extraFields;
    modalForm.dataset.formType = type;
    
    // Hide base contact fields for 'give' modal (they're in extraFields now)
    const baseContactFields = modalForm.querySelectorAll('input[name="name"], input[name="email"], input[name="phone"]');
    baseContactFields.forEach(field => {
      const fieldContainer = field.closest('div');
      if (fieldContainer && fieldContainer.parentElement === modalForm) {
        if (type === 'give') {
          fieldContainer.style.display = 'none';
        } else {
          fieldContainer.style.display = '';
        }
      }
    });
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      document.getElementById('modal-form').reset();
    }, 300);
  }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
  const modalForm = document.getElementById('modal-form');
  
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      const formData = new FormData(modalForm);
      const data = Object.fromEntries(formData.entries());
      
      console.log('Form submitted:', {
        type: modalForm.dataset.formType,
        data: data
      });
      
      // Reset button
      submitBtn.classList.remove('loading');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show success and close modal
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.textContent = 'Obrigado! Entraremos em contato em breve.';
      modalForm.appendChild(successDiv);
      
      setTimeout(() => {
        closeModal();
        successDiv.remove();
      }, 2000);
    });
  }
});

// Giving modal functions
function selectGivingType(type) {
  const buttons = document.querySelectorAll('.giving-type-btn');
  buttons.forEach(btn => {
    if (btn.dataset.type === type) {
      btn.classList.remove('border-neutral-300');
      btn.classList.add('border-neutral-900', 'bg-neutral-900', 'text-white');
      btn.querySelector('i').classList.remove('text-neutral-600');
      btn.querySelector('i').classList.add('text-white');
      btn.querySelector('p').classList.remove('text-neutral-900');
      btn.querySelector('p').classList.add('text-white');
      btn.querySelector('.text-gray-600').classList.remove('text-gray-600');
      btn.querySelector('.text-gray-600').classList.add('text-neutral-200');
    } else {
      btn.classList.add('border-neutral-300');
      btn.classList.remove('border-neutral-900', 'bg-neutral-900', 'text-white');
      btn.querySelector('i').classList.add('text-neutral-600');
      btn.querySelector('i').classList.remove('text-white');
      btn.querySelector('p').classList.add('text-neutral-900');
      btn.querySelector('p').classList.remove('text-white');
      if (!btn.querySelector('.text-neutral-200')) {
        btn.querySelector('.text-xs').classList.add('text-gray-600');
      }
    }
  });
  document.getElementById('giving_type').value = type;
}

function setAmount(amount) {
  const amountInput = document.getElementById('amount');
  if (amountInput) {
    amountInput.value = amount;
    
    // Visual feedback on buttons
    const buttons = document.querySelectorAll('.amount-btn');
    buttons.forEach(btn => {
      btn.classList.remove('border-neutral-900', 'bg-neutral-900', 'text-white');
      btn.classList.add('border-neutral-300');
    });
    
    event.target.classList.add('border-neutral-900', 'bg-neutral-900', 'text-white');
    event.target.classList.remove('border-neutral-300');
  }
}

function showQRCode() {
  const qrModal = document.createElement('div');
  qrModal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4';
  qrModal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
      <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <i class="fas fa-times text-2xl"></i>
      </button>
      <div class="text-center">
        <div class="mb-6">
          <i class="fas fa-qrcode text-6xl text-neutral-700 mb-4"></i>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Pagamento via QR Code</h3>
          <p class="text-sm text-gray-600">Escaneie o código com seu aplicativo de pagamento</p>
        </div>
        
        <div class="bg-white border-4 border-neutral-900 rounded-lg p-6 mb-6 inline-block">
          <div class="w-64 h-64 bg-neutral-100 flex items-center justify-center">
            <div class="text-center">
              <i class="fas fa-qrcode text-8xl text-neutral-400 mb-3"></i>
              <p class="text-sm text-gray-600 font-semibold">QR Code será<br/>disponibilizado em breve</p>
            </div>
          </div>
        </div>

        <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
          <p class="text-sm font-semibold text-gray-800 mb-2">Chave PIX (Brasil):</p>
          <div class="flex items-center justify-between bg-white border border-neutral-300 rounded px-3 py-2">
            <code class="text-sm text-neutral-700">contato@hpcatlanta.com</code>
            <button onclick="copyToClipboard('contato@hpcatlanta.com')" class="text-neutral-600 hover:text-neutral-900">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="space-y-2 text-left">
          <p class="text-xs text-gray-600">
            <i class="fas fa-check-circle text-green-600 mr-2"></i>
            PIX (Brasil)
          </p>
          <p class="text-xs text-gray-600">
            <i class="fas fa-check-circle text-green-600 mr-2"></i>
            Pagamentos QR Code internacionais
          </p>
          <p class="text-xs text-gray-600">
            <i class="fas fa-check-circle text-green-600 mr-2"></i>
            Transferência instantânea e segura
          </p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(qrModal);
  
  // Close on backdrop click
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
      qrModal.remove();
    }
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[70] flex items-center gap-2';
    toast.innerHTML = '<i class="fas fa-check-circle"></i> <span>Copiado!</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  });
}

// Download HPC Guide Function
async function downloadGuide() {
  // Show loading notification
  const loadingToast = document.createElement('div');
  loadingToast.className = 'fixed bottom-4 right-4 bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg z-[70] flex items-center gap-3';
  loadingToast.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Preparando Guia HPC...</span>';
  document.body.appendChild(loadingToast);
  
  // Create download link for pre-generated PDF
  // For now, we'll create a simple text version that can be opened in a new window
  // In production, you would host the actual PDF file
  const guideWindow = window.open('', '_blank');
  guideWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Método HPC Vivencial - Guia Completo</title>
      <style>
        body {
          font-family: Georgia, serif;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background: #fafafa;
          color: #333;
        }
        h1 { 
          color: #1a1a1a; 
          font-size: 2.5em; 
          margin-bottom: 10px;
          text-align: center;
          border-bottom: 3px solid #333;
          padding-bottom: 20px;
        }
        h2 { 
          color: #2a2a2a; 
          font-size: 2em; 
          margin-top: 40px;
          margin-bottom: 15px;
          border-left: 5px solid #333;
          padding-left: 15px;
        }
        h3 { 
          color: #3a3a3a; 
          font-size: 1.5em; 
          margin-top: 30px;
          margin-bottom: 10px;
        }
        h4 {
          color: #4a4a4a;
          font-size: 1.2em;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        p { 
          margin-bottom: 15px;
          text-align: justify;
        }
        .subtitle {
          text-align: center;
          font-size: 1.3em;
          color: #666;
          font-style: italic;
          margin-bottom: 40px;
        }
        .section-divider {
          border-top: 2px solid #ddd;
          margin: 50px 0;
        }
        blockquote {
          border-left: 4px solid #ccc;
          padding-left: 20px;
          margin: 20px 0;
          font-style: italic;
          color: #666;
          background: #f5f5f5;
          padding: 15px 20px;
          border-radius: 4px;
        }
        ul, ol {
          margin: 15px 0;
          padding-left: 30px;
        }
        li {
          margin-bottom: 10px;
        }
        strong {
          color: #000;
          font-weight: 700;
        }
        .print-button {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 24px;
          background: #333;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.3s;
        }
        .print-button:hover {
          background: #444;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        @media print {
          body {
            background: white;
            padding: 20px;
          }
          .print-button {
            display: none;
          }
        }
        .highlight-box {
          background: #fff;
          border: 2px solid #333;
          padding: 25px;
          margin: 30px 0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .commitment-section {
          background: linear-gradient(135deg, #f5f5f5 0%, #e9e9e9 100%);
          border: 3px solid #333;
          padding: 30px;
          margin: 40px 0;
          border-radius: 12px;
        }
        code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
      </style>
    </head>
    <body>
      <button class="print-button" onclick="window.print()">
        <i class="fas fa-print"></i> Imprimir/Salvar PDF
      </button>
      
      <h1>MÉTODO HPC VIVENCIAL</h1>
      <p class="subtitle">Guia Completo para Encontro Transformador com a Palavra de Deus</p>
      
      <div class="section-divider"></div>
      
      <h2>FUNDAMENTOS DO MÉTODO HPC VIVENCIAL</h2>
      
      <h3>A Necessidade de Um Método Contemplativo</h3>
      <p>Vivemos numa era de distração perpétua. A mente moderna, constantemente bombardeada por estímulos, perdeu a capacidade contemplativa que caracterizava os grandes místicos e sábios da história. Como afirmou Blaise Pascal: <em>"Todas as desgraças do homem derivam de uma única causa: sua incapacidade de permanecer quieto em um quarto sozinho."</em></p>

      <p>A Escritura sempre exigiu mais do que leitura superficial. O salmista declara: <em>"Bem-aventurado o homem que não anda segundo o conselho dos ímpios... antes tem o seu prazer na lei do Senhor, e na sua lei medita de dia e de noite"</em> (Salmos 1:1-2). A palavra hebraica para "meditar" (hagah) significa murmurar, sussurrar, ruminar - uma atividade contínua e profunda, não uma leitura apressada.</p>

      <p>O Método HPC Vivencial recupera essa antiga prática de meditação profunda na Palavra, integrando insights da neurociência sobre formação de hábitos, da filosofia sobre descoberta de propósito, e da psicologia sobre mudança comportamental duradoura.</p>

      <h3>Os Três Pilares do Método</h3>
      
      <div class="highlight-box">
        <h4><strong>H - HABITAR NA PALAVRA</strong></h4>
        <p>A primeira dimensão é ontológica - trata do nosso ser. Não se trata apenas de ler sobre Deus, mas de habitar em Sua presença através da Palavra. Como Cristo declarou: <em>"Se permanecerdes em mim, e as minhas palavras permanecerem em vós, pedireis o que quiserdes, e vos será feito"</em> (João 15:7). O verbo grego "meno" (permanecer) sugere residência permanente, não visita casual.</p>
      </div>

      <div class="highlight-box">
        <h4><strong>P - PERCEBER O CHAMADO</strong></h4>
        <p>A segunda dimensão é epistemológica - trata do nosso conhecer. Aqui aplicamos o discernimento, aquela capacidade de distinguir entre o bem e o melhor, entre nossa vontade e a vontade de Deus. Paulo instruiu: <em>"Não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus"</em> (Romanos 12:2).</p>
      </div>

      <div class="highlight-box">
        <h4><strong>C - CUMPRIR EM ORAÇÃO</strong></h4>
        <p>A terceira dimensão é praxiológica - trata do nosso agir. Conhecimento sem ação é morto. Como Tiago advertiu severamente: <em>"Não sejais apenas ouvintes da palavra, enganando-vos a vós mesmos. Sede, porém, praticantes da palavra"</em> (Tiago 1:22). A oração de compromisso transforma insight em obediência, contemplação em transformação.</p>
      </div>

      <div class="section-divider"></div>

      <h2>PRIMEIRA ETAPA: HABITAR NA PALAVRA</h2>

      <h3>Fundamentos Teológicos do Habitar</h3>
      <p>A ideia de habitar na Palavra tem raízes profundas na tradição judaico-cristã. Moisés instruiu Israel: <em>"Estas palavras que hoje te ordeno estarão no teu coração; tu as inculcarás a teus filhos, e delas falarás assentado em tua casa, e andando pelo caminho, e ao deitar-te e ao levantar-te"</em> (Deuteronômio 6:6-7). Não é conhecimento externo, mas internação profunda.</p>

      <p>Cristo, ao resistir às tentações no deserto, demonstrou o poder da Palavra interiorizada: <em>"Está escrito: Não só de pão viverá o homem, mas de toda palavra que sai da boca de Deus"</em> (Mateus 4:4). A Palavra não é complemento opcional da vida espiritual - é seu sustento essencial.</p>

      <h3>Prática Contemplativa do Habitar</h3>
      
      <h4>Preparação do Espaço Interior</h4>
      <p>Antes de abrir a Escritura, pratique o que os antigos chamavam de "recolhimento" - o ato deliberado de trazer sua mente dispersa para um ponto focal. Santo Agostinho orou: <em>"Tu estavas dentro de mim, mas eu estava fora, e era lá fora que Te procurava."</em></p>

      <p>Sente-se em postura digna. Respire profundamente três vezes. Em cada expiração, libere ansiedades e distrações. Em cada inspiração, convide a presença do Espírito Santo. O salmista instrui: <em>"Aquietai-vos e sabei que eu sou Deus"</em> (Salmos 46:10).</p>

      <h4>Lectio Divina - Leitura Sagrada</h4>
      <p>A tradição monástica desenvolveu a Lectio Divina, método de quatro etapas que o HPC Vivencial incorpora:</p>
      <ol>
        <li><strong>Lectio</strong> (Leitura) - Leia o texto devagar, como se fosse carta de amor de Deus endereçada pessoalmente a você. Não busque informação, mas transformação. Permita que as palavras ressoem em seu ser.</li>
        <li><strong>Meditatio</strong> (Meditação) - Ruminar sobre palavras ou frases específicas que capturaram sua atenção. Como vaca que mastiga o capim repetidamente para extrair nutrientes, mastigue a Palavra até que libere seu sabor espiritual.</li>
        <li><strong>Observe padrões, repetições, contrastes</strong> - A Escritura usa recursos literários intencionalmente. Palavras repetidas revelam ênfase. Contrastes iluminam verdades.</li>
      </ol>

      <h4>Registro Contemplativo</h4>
      <p>Anote não apenas o que leu, mas o que sentiu, percebeu, intuiu. O filósofo Søren Kierkegaard distinguiu entre conhecimento objetivo e subjetivo - ambos necessários. O conhecimento objetivo entende o texto; o subjetivo permite que o texto entenda você.</p>

      <p><strong>Registre:</strong></p>
      <ul>
        <li>Versículo(s) que reverberaram profundamente</li>
        <li>Palavras ou frases que parecem iluminadas pelo Espírito</li>
        <li>Questões que o texto levanta em sua alma</li>
        <li>Resistências internas que você percebe ao ler</li>
      </ul>

      <div class="section-divider"></div>

      <h2>SEGUNDA ETAPA: PERCEBER O CHAMADO</h2>

      <h3>Fundamentos Teológicos do Discernimento</h3>
      <p>Discernimento espiritual é a capacidade de distinguir entre vozes que competem por nossa atenção - a voz de Deus, a voz do mundo, a voz do ego, a voz do adversário. Paulo orou pelos filipenses: <em>"que o vosso amor cresça mais e mais em ciência e em todo o conhecimento, para que aproveis as coisas excelentes"</em> (Filipenses 1:9-10).</p>

      <h3>Prática do Discernimento</h3>
      
      <h4>Perguntas de Discernimento Profundo</h4>
      <p>Após habitar na Palavra, submeta-se a estas perguntas:</p>

      <p><strong>Sobre o Texto:</strong></p>
      <ul>
        <li>Que verdade sobre o caráter de Deus este texto revela?</li>
        <li>Que verdade sobre a condição humana este texto expõe?</li>
        <li>Que promessa de Deus está disponível aqui?</li>
        <li>Que comando de Deus está presente aqui?</li>
        <li>Que advertência está implícita ou explícita?</li>
      </ul>

      <p><strong>Sobre Minha Vida:</strong></p>
      <ul>
        <li>Onde estou resistindo a esta verdade?</li>
        <li>Que mentira tenho acreditado que este texto desafia?</li>
        <li>Que pecado oculto esta Palavra ilumina?</li>
        <li>Que área da minha vida está desalinhada com este ensino?</li>
        <li>Que próximo passo de obediência Deus está solicitando?</li>
      </ul>

      <p><strong>Sobre Meu Propósito:</strong></p>
      <ul>
        <li>Como este chamado específico serve ao meu propósito último de glorificar a Deus?</li>
        <li>Que virtude Deus está cultivando em mim através deste texto?</li>
        <li>Como este chamado me prepara para servir outros?</li>
        <li>Que aspecto da imagem de Deus em mim está sendo restaurado?</li>
      </ul>

      <h4>Método Inaciano de Discernimento</h4>
      <p>Santo Inácio de Loyola desenvolveu critérios para distinguir verdadeiro chamado divino:</p>
      <ol>
        <li><strong>Consolação espiritual</strong> - Paz profunda, mesmo se o chamado for desafiador</li>
        <li><strong>Alinhamento com Escritura</strong> - Nunca contradiz revelação bíblica</li>
        <li><strong>Fruto do Espírito</strong> - Produz amor, alegria, paz, longanimidade (Gálatas 5:22-23)</li>
        <li><strong>Confirmação comunitária</strong> - Corpo de Cristo reconhece e confirma</li>
        <li><strong>Crescimento em virtude</strong> - Aumenta fé, esperança e amor</li>
      </ol>

      <div class="section-divider"></div>

      <h2>TERCEIRA ETAPA: CUMPRIR EM ORAÇÃO</h2>

      <h3>Fundamentos Teológicos da Obediência</h3>
      <p>A palavra hebraica para obediência (shama) significa literalmente "ouvir". Verdadeira audição resulta em ação. Jesus declarou: <em>"Se me amais, guardareis os meus mandamentos"</em> (João 14:15). Obediência não é legalismo, mas expressão de amor.</p>

      <h3>Estrutura da Oração de Compromisso</h3>

      <div class="highlight-box">
        <h4>PARTE 1: ADORAÇÃO - Reconhecer Quem Deus É</h4>
        <p>Inicie honrando o caráter de Deus revelado no texto. Não liste apenas atributos teológicos, mas declare como eles impactam sua vida.</p>
        <p><em>Exemplo:</em> "Senhor, Tu és o Deus que vê. Como revelaste a Agar no deserto, Tu me vês em meu deserto de ansiedade financeira..."</p>
      </div>

      <div class="highlight-box">
        <h4>PARTE 2: CONFISSÃO - Admitir Falhas Específicas</h4>
        <p>Confissão genuína é específica, não genérica. Não diga "Perdoa meus pecados", mas nomeie-os.</p>
        <p><em>Exemplo:</em> "Confesso que tenho vivido como ateu funcional nas finanças. Embora professe que Tu és provedor, ajo como se minha segurança dependesse do saldo bancário..."</p>
      </div>

      <div class="highlight-box">
        <h4>PARTE 3: COMPROMISSO - Declarar Obediência Específica</h4>
        <p>Aqui transformamos discernimento em ação. Compromissos eficazes são SMART: Específicos, Mensuráveis, Alcançáveis, Relevantes, Temporalmente definidos.</p>
        <p><strong>Exemplos de compromissos:</strong></p>
        <ul>
          <li><strong>Ritual Matinal</strong> - Diariamente às 6h, antes de qualquer atividade, passarei 15 minutos em oração de entrega</li>
          <li><strong>Pausa Decisória</strong> - Antes de qualquer decisão importante, farei pausa de 24 horas para oração e consulta à Escritura</li>
          <li><strong>Prestação de Contas</strong> - Compartilharei estes compromissos com mentor e permitirei questionamento semanal</li>
        </ul>
      </div>

      <div class="highlight-box">
        <h4>PARTE 4: CAPACITAÇÃO - Solicitar Poder do Espírito</h4>
        <p>Reconheça dependência total do Espírito Santo. Como Jesus ensinou: <em>"Sem mim nada podeis fazer"</em> (João 15:5).</p>
        <p><em>Exemplo:</em> "Senhor, sei que estas resoluções são pó sem Teu Espírito. Minha força de vontade é insuficiente..."</p>
      </div>

      <div class="highlight-box">
        <h4>PARTE 5: INTERCESSÃO - Orar Pelos Outros</h4>
        <p>Verdadeira transformação nunca é apenas individual. Somos parte do Corpo de Cristo.</p>
        <p><em>Exemplo:</em> "Oro por [nome], que enfrenta [situação] e vive [desafio]. Que ela também descubra que Tu és [atributo de Deus]..."</p>
      </div>

      <div class="section-divider"></div>

      <h2>PLANO DE TRANSFORMAÇÃO DE 90 DIAS</h2>

      <h3>FASE 1: DIAS 1-30 - FUNDAÇÃO</h3>
      <p><strong>Tema:</strong> Aprendendo a Habitar</p>
      <p><strong>Objetivo:</strong> Desenvolver capacidade contemplativa. Desacelerar ritmo frenético. Criar espaço interior para voz de Deus.</p>

      <p><strong>Passagens Sugeridas - Semana 1: A Natureza da Palavra de Deus</strong></p>
      <ul>
        <li>Dia 1: Salmo 19:7-14 (A lei do Senhor é perfeita)</li>
        <li>Dia 2: Salmo 119:105 (Lâmpada para os meus pés)</li>
        <li>Dia 3: Josué 1:8 (Medita nela dia e noite)</li>
        <li>Dia 4: Hebreus 4:12 (Palavra viva e eficaz)</li>
        <li>Dia 5: 2 Timóteo 3:16-17 (Toda Escritura é inspirada)</li>
        <li>Dia 6: Jeremias 15:16 (Tuas palavras foram achadas)</li>
        <li>Dia 7: Mateus 4:4 (Não só de pão viverá o homem)</li>
      </ul>

      <p><strong>Semana 2: Conhecendo o Caráter de Deus</strong></p>
      <ul>
        <li>Dia 8: Êxodo 34:6-7</li>
        <li>Dia 9: Salmo 103</li>
        <li>Dia 10: Salmo 139</li>
        <li>Dia 11: Isaías 40:28-31</li>
        <li>Dia 12: Jeremias 29:11</li>
        <li>Dia 13: Lamentações 3:22-26</li>
        <li>Dia 14: Malaquias 3:6</li>
      </ul>

      <p><strong>Semana 3: Fundamentos da Confiança</strong></p>
      <ul>
        <li>Dia 15: Provérbios 3:5-6</li>
        <li>Dia 16: Salmo 37:3-7</li>
        <li>Dia 17: Salmo 91</li>
        <li>Dia 18: Isaías 26:3-4</li>
        <li>Dia 19: Filipenses 4:6-7</li>
        <li>Dia 20: 1 Pedro 5:6-7</li>
        <li>Dia 21: Mateus 6:25-34</li>
      </ul>

      <p><strong>Semana 4: Habitando em Cristo</strong></p>
      <ul>
        <li>Dia 22: João 15:1-8</li>
        <li>Dia 23: João 14:1-6</li>
        <li>Dia 24: Colossenses 3:1-4</li>
        <li>Dia 25: Efésios 3:14-21</li>
        <li>Dia 26: Romanos 8:38-39</li>
        <li>Dia 27: Salmo 23</li>
        <li>Dia 28: Salmo 46</li>
      </ul>

      <p><strong>Dias 29-30: Avaliação e Reflexão</strong></p>
      <ul>
        <li>Revise todas as anotações do mês</li>
        <li>Identifique tema recorrente em chamados de Deus</li>
        <li>Avalie: que capacidade contemplativa desenvolvi?</li>
        <li>Prepare coração para próxima fase</li>
      </ul>

      <h3>FASE 2: DIAS 31-60 - DISCERNIMENTO</h3>
      <p><strong>Tema:</strong> Aprendendo a Perceber</p>
      <p><strong>Objetivo:</strong> Desenvolver sensibilidade ao chamado de Deus. Distinguir Sua voz em meio a ruído. Conectar passagens bíblicas com propósito de vida.</p>

      <h3>FASE 3: DIAS 61-90 - OBEDIÊNCIA</h3>
      <p><strong>Tema:</strong> Aprendendo a Cumprir</p>
      <p><strong>Objetivo:</strong> Transformar insights em ação. Desenvolver obediência como hábito. Testemunhar transformação real em caráter e comportamento.</p>

      <div class="section-divider"></div>

      <div class="commitment-section">
        <h2>COMPROMISSO FINAL - PACTO DE TRANSFORMAÇÃO</h2>
        
        <p><strong>EU, ________________________________,</strong></p>

        <p>Reconhecendo que fui criado(a) por Deus com propósito eterno, que Cristo morreu para me reconciliar com esse propósito, e que o Espírito Santo habita em mim para capacitar-me a viver esse propósito,</p>

        <p><strong>COMPROMETO-ME SOLENEMENTE:</strong></p>

        <ol>
          <li><strong>HABITAR</strong> diariamente na Palavra de Deus com reverência, contemplação e expectativa de encontro transformador, não como leitura obrigatória, mas como encontro com o Deus vivo.</li>
          
          <li><strong>PERCEBER</strong> com sensibilidade crescente os chamados específicos que Deus dirige a minha vida, submetendo minha vontade à Sua, meu entendimento à Sua sabedoria, meus planos ao Seu propósito.</li>
          
          <li><strong>CUMPRIR</strong> em obediência radical tudo o que Deus revelar, dependendo totalmente do poder do Espírito Santo, pois reconheço que sem Cristo nada posso fazer.</li>
        </ol>

        <p><strong>Especificamente, comprometo-me a:</strong></p>
        <ul>
          <li>Praticar o método HPC Vivencial _____ dias por semana (mínimo 5)</li>
          <li>Horário dedicado: ______________________</li>
          <li>Local dedicado: ________________________</li>
          <li>Duração mínima por sessão: _____ minutos</li>
          <li>Parceiro(s) de prestação de contas: _______________________</li>
        </ul>

        <p><strong>Data:</strong> ____/____/______</p>
        <p><strong>Assinatura:</strong> _______________________________</p>

        <blockquote>
          <p><strong>Oração de Consagração:</strong></p>
          <p>"Senhor Deus, criador dos céus e da terra, diante de Ti faço este compromisso solene. Consagro este tempo, esta prática, esta jornada a Ti.</p>
          
          <p>Habitar-Te-ei através de Tua Palavra. Perceberei Teus chamados com ouvidos atentos. Cumprirei em obediência com coração disposto.</p>
          
          <p>Sei que sou pó, facilmente disperso. Por isso rogo: envia Teu Espírito Santo como meu guia, meu mestre, meu capacitador. Quando eu fraquejar, sustenta-me. Quando eu me desviar, redireciona-me. Quando eu cair, levanta-me.</p>
          
          <p>Transforma-me de glória em glória à imagem de Cristo. Que minha vida inteira - pensamentos, palavras, ações - sejam oferenda viva, santa e agradável a Ti.</p>
          
          <p>Em nome de Jesus Cristo, meu Senhor e Salvador, amém."</p>
        </blockquote>
      </div>

      <div class="section-divider"></div>

      <h2>PALAVRA CONCLUSIVA</h2>
      
      <p>O método HPC Vivencial que você acabou de estudar não é mera técnica de leitura bíblica. É convite radical a jornada de transformação profunda - uma jornada que integrará você mais completamente ao propósito eterno de Deus.</p>

      <p>Lembre-se das palavras de Paulo: <em>"Estou plenamente certo de que aquele que começou boa obra em vós há de completá-la até ao dia de Cristo Jesus"</em> (Filipenses 1:6). Deus que iniciou esta obra - que despertou em você desejo de conhecê-Lo mais profundamente através de Sua Palavra - é fiel para completá-la.</p>

      <p><strong>Não espere perfeição. Espere progressão.</strong><br>
      <strong>Não espere facilidade. Espere transformação.</strong><br>
      <strong>Não espere religiosidade vazia. Espere encontros vivos com o Deus vivo.</strong></p>

      <p>Ao habitar na Palavra, você habita Nele.<br>
      Ao perceber Seu chamado, você descobre seu propósito.<br>
      Ao cumprir em obediência, você se torna quem sempre foi destinado a ser.</p>

      <p style="text-align: center; margin-top: 50px; font-size: 1.3em; font-weight: bold;">
        Esta não é jornada de 90 dias, mas de toda vida.<br>
        Dê esse passo hoje.
      </p>

      <div class="section-divider"></div>

      <p style="text-align: center; margin-top: 40px;">
        <strong>HPC VIVENCIAL</strong><br>
        <em>"Habitar na Palavra. Perceber o Chamado. Cumprir em Oração."</em><br><br>
        Material produzido com reverência e compromisso com a fidelidade bíblica.<br>
        Novembro 2025 - Versão 3.0<br>
        Distribuição livre para fins ministeriais e pessoais. Vedada comercialização.
      </p>

      <script>
        // Auto-focus on print button
        document.querySelector('.print-button').focus();
      </script>
    </body>
    </html>
  `);
  
  loadingToast.remove();
  
  const successToast = document.createElement('div');
  successToast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[70] flex items-center gap-2';
  successToast.innerHTML = '<i class="fas fa-check-circle"></i> <span>Guia HPC aberto! Use Ctrl+P para salvar como PDF</span>';
  document.body.appendChild(successToast);
  setTimeout(() => successToast.remove(), 4000);
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.selectGivingType = selectGivingType;
window.setAmount = setAmount;
window.showQRCode = showQRCode;
window.copyToClipboard = copyToClipboard;
window.downloadGuide = downloadGuide;
