# Grace Church Melbourne - Próximos Passos

Uma página web elegante e luxuosa com design neutro para a Grace Church Melbourne, apresentando oportunidades de envolvimento e próximos passos na jornada de fé.

## 🌟 Visão Geral

Este site foi inspirado na página original da Grace Church Melbourne (https://www.gracechurch.life/nextsteps) e recriado com um design moderno, elegante e sofisticado usando tons neutros.

## 🎨 Design

- **Paleta de Cores**: Tons neutros elegantes (cinza, preto, branco, bege)
- **Tipografia**: Playfair Display (serif) + Inter (sans-serif)
- **Estilo**: Luxuoso, minimalista, clean e profissional
- **Responsivo**: Totalmente adaptável para mobile, tablet e desktop

## 🚀 URLs Públicas

- **Desenvolvimento**: https://3000-ihvtjt4eoboqu6y8hpg0r-c07dda5e.sandbox.novita.ai
- **Instagram**: https://www.instagram.com/gracechurch.life/

## ✨ Funcionalidades Implementadas

### Seções Principais

1. **Hero Section** (Cabeçalho Principal)
   - Título impactante: "Dê Seu Próximo Passo"
   - Frase de missão da igreja
   - Banner de inscrição com data destacada

2. **Descubra a Grace Church**
   - Informações sobre a orientação para novos membros
   - Próximo evento com data e horário
   - Formulário de inscrição via modal

3. **Equipe dos Sonhos**
   - Oportunidades de servir na igreja
   - Ministérios disponíveis
   - Formulário de interesse com áreas específicas

4. **Batismo**
   - Informações sobre o batismo
   - Versículo bíblico (Atos 2:38)
   - Formulário de interesse em ser batizado

5. **Grupos de Conexão**
   - Três tipos de grupos: Estudo Bíblico, Atividades, Serviço
   - Inscrições abertas
   - Formulário de interesse

6. **Conecte-se Conosco**
   - Cartão de conexão
   - Pedidos de oração
   - Contribuições
   - Guia SOAP para estudo bíblico

### Funcionalidades Interativas

- ✅ Menu de navegação responsivo com mobile menu
- ✅ Smooth scrolling para navegação interna
- ✅ Modais dinâmicos para formulários
- ✅ Sistema de formulários específicos para cada seção
- ✅ Animações suaves (fade-in, hover effects)
- ✅ Barra de progresso de scroll
- ✅ Estados de loading em formulários
- ✅ Validação de formulários
- ✅ Mensagens de sucesso

## 📊 Estrutura de Dados

### Horários de Culto
- Quintas-feiras às 19:30
- Domingos às 8:30, 10:15 e 12:00

### Informações de Contato
- Email: contato@gracechurch.life
- Telefone: (321) 555-0123
- Instagram: @gracechurch.life

## 🛠️ Tecnologias Utilizadas

- **Framework Backend**: Hono (TypeScript)
- **Runtime**: Cloudflare Workers/Pages
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Icons**: Font Awesome 6.4.0
- **Process Manager**: PM2

## 📁 Estrutura do Projeto

```
webapp/
├── src/
│   ├── index.tsx          # Aplicação principal Hono
│   └── renderer.tsx       # Renderizador JSX
├── public/
│   └── static/
│       ├── style.css      # Estilos customizados
│       └── app.js         # JavaScript interativo
├── dist/                  # Build de produção
├── ecosystem.config.cjs   # Configuração PM2
├── wrangler.jsonc         # Configuração Cloudflare
├── package.json
└── README.md
```

## 🚦 Como Executar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Build do projeto
npm run build

# Iniciar servidor de desenvolvimento com PM2
pm2 start ecosystem.config.cjs

# Verificar status
pm2 list

# Ver logs
pm2 logs webapp --nostream

# Parar servidor
pm2 stop webapp
```

### Comandos Úteis

```bash
# Limpar porta 3000
npm run clean-port

# Testar servidor
npm test  # ou curl http://localhost:3000

# Build para produção
npm run build

# Deploy para Cloudflare Pages
npm run deploy
```

## 🎯 Funcionalidades Pendentes

- [ ] Integração com backend para envio de formulários
- [ ] Sistema de autenticação
- [ ] Dashboard administrativo
- [ ] Integração com sistema de gerenciamento de membros
- [ ] Sistema de notificações por email
- [ ] Integração com calendário de eventos
- [ ] Sistema de pagamentos para contribuições
- [ ] Analytics e métricas de uso

## 📝 Próximos Passos Recomendados

1. **Backend API**: Implementar endpoints para processar formulários
2. **Database**: Configurar Cloudflare D1 para armazenar dados
3. **Email**: Integrar serviço de email (SendGrid, Mailgun)
4. **CMS**: Adicionar sistema de gerenciamento de conteúdo
5. **SEO**: Otimizar meta tags e structured data
6. **Analytics**: Integrar Google Analytics ou similar
7. **A/B Testing**: Testar variações de design e conteúdo

## 🎨 Customização

### Cores Principais

As cores podem ser ajustadas no arquivo `public/static/style.css`:

```css
:root {
  --color-primary: #2C2C2C;    /* Cinza escuro principal */
  --color-secondary: #1A1A1A;  /* Preto suave */
  --color-accent: #8B7355;     /* Bege/marrom */
  --color-text: #4A4A4A;       /* Cinza texto */
  --color-light: #F5F5F5;      /* Cinza claro */
}
```

### Tipografia

```css
--font-serif: 'Playfair Display', serif;  /* Títulos */
--font-sans: 'Inter', sans-serif;         /* Corpo de texto */
```

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Acessibilidade

- Navegação por teclado
- Estados de foco visíveis
- Contraste adequado de cores
- Textos alternativos para ícones
- Estrutura semântica HTML5

## 🔒 Segurança

- Validação de formulários no cliente
- Proteção contra XSS
- HTTPS obrigatório em produção
- Headers de segurança configurados

## 📄 Licença

© 2025 Grace Church Melbourne. Todos os direitos reservados.

## 👥 Missão da Igreja

**"Transformando a Costa Espacial com o amor radical de Jesus"**

Na Grace Church, somos apaixonados por criar uma atmosfera acolhedora onde as pessoas podem se reunir para celebrar e aprender sobre a esperança e o amor de Jesus. Nos esforçamos para criar um ambiente onde todos se sintam bem-vindos e amados, não importa quem você seja ou de onde você venha.

## 📞 Suporte

Para questões técnicas ou sugestões de melhorias, entre em contato através de:
- Email: contato@gracechurch.life
- Instagram: @gracechurch.life

---

**Desenvolvido com ❤️ usando Hono + Cloudflare Pages**
