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

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.selectGivingType = selectGivingType;
window.setAmount = setAmount;
window.showQRCode = showQRCode;
window.copyToClipboard = copyToClipboard;
