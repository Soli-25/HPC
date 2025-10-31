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
    title: 'Inscreva-se: Descubra a Grace Church',
    extraFields: ''
  },
  team: {
    title: 'Junte-se à Equipe dos Sonhos',
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
        <label class="block text-gray-700 font-semibold mb-2">Como conheceu a Grace Church?</label>
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
    title: 'Contribuir para a Grace Church',
    extraFields: `
      <div class="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6">
        <p class="text-gray-700 mb-4 leading-relaxed">
          Sua generosidade ajuda a transformar vidas e espalhar o amor de Jesus em nossa comunidade e além.
        </p>
        <p class="text-sm text-gray-600">
          "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria." - 2 Coríntios 9:7
        </p>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Valor da Contribuição</label>
        <input type="number" name="amount" min="1" step="0.01" placeholder="R$ 0,00" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Frequência</label>
        <select name="frequency" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="once">Uma vez</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensal</option>
        </select>
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

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
