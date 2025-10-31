// Grace Church Next Steps - Interactive Features

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Modal Functions
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalForm = document.getElementById('modal-form');
const modalExtraFields = document.getElementById('modal-extra-fields');

const modalConfigs = {
  discover: {
    title: 'Inscreva-se para Descobrir a Grace Church',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Você já visitou nossa igreja?</label>
        <select name="visited" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="yes">Sim</option>
          <option value="no">Não</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Comentários ou Perguntas</label>
        <textarea name="comments" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
      </div>
    `
  },
  team: {
    title: 'Junte-se à Equipe dos Sonhos',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Áreas de Interesse</label>
        <select name="interest" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione uma área</option>
          <option value="worship">Louvor e Adoração</option>
          <option value="children">Ministério Infantil</option>
          <option value="youth">Ministério Jovem</option>
          <option value="hospitality">Hospitalidade</option>
          <option value="media">Mídia e Tecnologia</option>
          <option value="other">Outro</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Conte-nos sobre suas habilidades ou experiência</label>
        <textarea name="skills" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
      </div>
    `
  },
  baptism: {
    title: 'Quero Ser Batizado',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Você já aceitou Jesus como seu Salvador?</label>
        <select name="saved" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione</option>
          <option value="yes">Sim</option>
          <option value="no">Não tenho certeza</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Você já foi batizado antes?</label>
        <select name="previous_baptism" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="no">Não</option>
          <option value="yes">Sim</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Compartilhe brevemente seu testemunho</label>
        <textarea name="testimony" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Como você encontrou a fé em Cristo?"></textarea>
      </div>
    `
  },
  groups: {
    title: 'Encontre Seu Grupo',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Tipo de Grupo</label>
        <select name="group_type" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Selecione</option>
          <option value="bible">Estudo Bíblico</option>
          <option value="activity">Grupo de Atividades</option>
          <option value="serve">Grupo de Serviço</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Preferência de Horário</label>
        <select name="time_preference" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="weekday_morning">Dia de semana - Manhã</option>
          <option value="weekday_evening">Dia de semana - Noite</option>
          <option value="weekend">Final de semana</option>
        </select>
      </div>
    `
  },
  connect: {
    title: 'Cartão de Conexão',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Status de Visitante</label>
        <select name="visitor_status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="first">Primeira visita</option>
          <option value="second">Segunda visita</option>
          <option value="regular">Visitante regular</option>
          <option value="member">Membro</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Como podemos ajudá-lo?</label>
        <textarea name="help" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
      </div>
    `
  },
  prayer: {
    title: 'Pedidos de Oração',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Seu Pedido de Oração</label>
        <textarea name="prayer_request" rows="5" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Compartilhe seu pedido de oração conosco..."></textarea>
      </div>
      <div>
        <label class="flex items-center">
          <input type="checkbox" name="confidential" class="mr-2" />
          <span class="text-gray-700">Manter este pedido confidencial</span>
        </label>
      </div>
    `
  },
  give: {
    title: 'Fazer uma Contribuição',
    extraFields: `
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Tipo de Contribuição</label>
        <select name="giving_type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="tithe">Dízimo</option>
          <option value="offering">Oferta</option>
          <option value="mission">Missões</option>
          <option value="building">Fundo de Construção</option>
          <option value="other">Outro</option>
        </select>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Valor</label>
        <input type="number" name="amount" min="1" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="R$ 0,00" />
      </div>
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="text-sm text-gray-700">
          <i class="fas fa-info-circle mr-2 text-blue-600"></i>
          Após enviar este formulário, entraremos em contato com instruções para completar sua contribuição.
        </p>
      </div>
    `
  }
};

function openModal(type) {
  if (!modal || !modalConfigs[type]) return;
  
  const config = modalConfigs[type];
  modalTitle.textContent = config.title;
  modalExtraFields.innerHTML = config.extraFields;
  modal.classList.remove('hidden');
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  
  modal.classList.add('hidden');
  modalForm.reset();
  
  // Restore body scroll
  document.body.style.overflow = '';
}

// Close modal when clicking outside
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Handle form submission
if (modalForm) {
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(modalForm);
    const data = Object.fromEntries(formData.entries());
    
    // Get submit button
    const submitBtn = modalForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', data);
      
      // Show success message
      showSuccessMessage('Formulário enviado com sucesso! Entraremos em contato em breve.');
      
      // Close modal
      closeModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      showSuccessMessage('Erro ao enviar formulário. Tente novamente.', 'error');
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Success/Error Message
function showSuccessMessage(message, type = 'success') {
  const div = document.createElement('div');
  div.className = 'success-message';
  div.style.backgroundColor = type === 'error' ? '#ef4444' : '#10b981';
  div.innerHTML = `
    <div class="flex items-center">
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-3"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(div);
  
  setTimeout(() => {
    div.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => div.remove(), 300);
  }, 3000);
}

// Smooth scroll for anchor links
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

// Add scroll animation to sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Make functions globally accessible
window.openModal = openModal;
window.closeModal = closeModal;
