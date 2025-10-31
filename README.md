# Grace Church - Próximos Passos

Uma aplicação web moderna e responsiva inspirada na página "Next Steps" da Grace Church, recriada com Hono, Tailwind CSS e Cloudflare Pages.

## 🎯 Visão Geral do Projeto

Este site foi projetado para ajudar visitantes e membros da igreja a descobrir oportunidades de engajamento, crescimento espiritual e conexão com a comunidade.

## ✨ Funcionalidades Implementadas

### Seções Principais

1. **Hero Section** - Banner de boas-vindas com call-to-action e informações sobre próximos eventos
2. **Descobrir a Grace Church** - Orientação para recém-chegados sobre visão e valores da igreja
3. **Equipe dos Sonhos** - Introdução ao serviço voluntário e oportunidades de envolvimento
4. **Batismo** - Informações sobre batismo com citação bíblica (Atos 2:38) e formulário de inscrição
5. **Grupos de Conexão** - Apresentação de grupos de estudo bíblico, atividades e serviço
6. **Conectar-se** - Cartão de conexão, pedidos de oração e contribuições
7. **Guia SOAP** - Método de estudo bíblico (Escritura, Observação, Aplicação, Oração)

### Características Técnicas

- ✅ **Design Responsivo** - Layout adaptável para desktop, tablet e mobile
- ✅ **Navegação Smooth Scroll** - Rolagem suave entre seções
- ✅ **Menu Mobile** - Menu hambúrguer para dispositivos móveis
- ✅ **Sistema de Modais** - Formulários interativos para cada tipo de inscrição
- ✅ **Animações** - Transições suaves e efeitos visuais
- ✅ **Validação de Formulários** - Campos obrigatórios e validação de email
- ✅ **Mensagens de Sucesso** - Feedback visual após envio de formulários
- ✅ **Ícones Font Awesome** - Ícones modernos e profissionais
- ✅ **Tailwind CSS** - Estilização moderna e eficiente

## 🌐 URLs

- **Desenvolvimento Local**: https://3000-ihvtjt4eoboqu6y8hpg0r-c07dda5e.sandbox.novita.ai
- **Porta Local**: http://localhost:3000

## 🏗️ Arquitetura de Dados

### Estrutura de Dados dos Formulários

Cada modal coleta informações específicas baseadas no tipo de engajamento:

- **Discover** - Nome, Email, Telefone, Status de visita, Comentários
- **Team** - Nome, Email, Telefone, Área de interesse, Habilidades
- **Baptism** - Nome, Email, Telefone, Status de salvação, Batismo anterior, Testemunho
- **Groups** - Nome, Email, Telefone, Tipo de grupo, Preferência de horário
- **Connect** - Nome, Email, Telefone, Status de visitante, Como ajudar
- **Prayer** - Nome, Email, Telefone, Pedido de oração, Confidencialidade
- **Give** - Nome, Email, Telefone, Tipo de contribuição, Valor

### Serviços de Armazenamento

Atualmente os dados são simulados no frontend. Para produção, pode-se integrar:

- **Cloudflare D1** - Banco de dados SQLite para armazenar inscrições
- **Cloudflare KV** - Cache de configurações e conteúdo
- **APIs de Email** - SendGrid, Mailgun ou Resend para notificações

## 📱 Guia do Usuário

### Para Visitantes

1. **Explore as Seções** - Role a página ou use o menu de navegação
2. **Inscreva-se em Eventos** - Clique nos botões "Inscreva-se Agora" para registrar interesse
3. **Preencha Formulários** - Modais intuitivos guiam você pelo processo
4. **Conecte-se** - Use o cartão de conexão ou envie pedidos de oração

### Para Administradores

Os dados dos formulários podem ser enviados para:
- Sistema de gerenciamento de membros da igreja
- Planilhas Google via API
- Banco de dados Cloudflare D1
- Serviços de email marketing

## 🚀 Deployment

### Status Atual
- ✅ **Sandbox Ativo** - Rodando localmente com PM2
- ⏳ **Cloudflare Pages** - Pronto para deploy
- ⏳ **GitHub** - Pronto para versionamento

### Stack Tecnológica
- **Framework**: Hono (Edge-first web framework)
- **Frontend**: Tailwind CSS + Vanilla JavaScript
- **Runtime**: Cloudflare Workers/Pages
- **Build Tool**: Vite
- **Process Manager**: PM2 (desenvolvimento)

### Última Atualização
2 de Dezembro de 2025

## 🛠️ Comandos Úteis

```bash
# Build do projeto
npm run build

# Iniciar servidor de desenvolvimento
pm2 start ecosystem.config.cjs

# Ver logs
pm2 logs webapp --nostream

# Parar serviço
pm2 stop webapp

# Reiniciar serviço
pm2 restart webapp

# Deploy para Cloudflare Pages
npm run deploy
```

## 📋 Próximos Passos Recomendados

1. **Integração Backend** - Conectar formulários a um banco de dados real (Cloudflare D1)
2. **Sistema de Email** - Configurar notificações automáticas por email
3. **CMS Integration** - Adicionar painel administrativo para gerenciar conteúdo
4. **Analytics** - Implementar rastreamento de eventos e conversões
5. **SEO** - Otimizar meta tags e structured data
6. **Imagens Reais** - Substituir placeholders por fotos reais da igreja
7. **Autenticação** - Sistema de login para membros
8. **Calendário de Eventos** - Sistema de RSVP para eventos futuros
9. **Multilíngue** - Suporte para múltiplos idiomas
10. **Acessibilidade** - Melhorar ARIA labels e navegação por teclado

## 📄 Licença

Este é um projeto de demonstração inspirado no design da Grace Church Melbourne.
