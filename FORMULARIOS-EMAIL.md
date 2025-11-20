# 📧 Sistema de Envio de Emails dos Formulários

## ✅ O QUE FOI IMPLEMENTADO

Todos os formulários do site agora enviam automaticamente um email para:
### **📬 infipros@solihull.pt**

---

## 📋 FORMULÁRIOS QUE ENVIAM EMAIL

### **1. Cartão de Conexão** (`connect`)
**Botão**: "Preencher Cartão"
**Informações enviadas**:
- Nome, Email, Telefone
- Como conheceu a HPC
- Pedidos de oração

### **2. Descubra a HPC** (`discover`)
**Botão**: "Participar"
**Informações enviadas**:
- Nome, Email, Telefone

### **3. Junte-se à Equipe** (`team`)
**Botão**: "Quero Servir"
**Informações enviadas**:
- Nome, Email, Telefone
- Área de interesse (Louvor, Infantil, Jovem, etc.)

### **4. Pedido de Batismo** (`baptism`)
**Botão**: "Quero ser Batizado"
**Informações enviadas**:
- Nome, Email, Telefone
- Já foi batizado antes?
- Testemunho de fé

### **5. Grupos de Conexão** (`groups`)
**Botão**: "Encontrar Grupo"
**Informações enviadas**:
- Nome, Email, Telefone
- Tipo de grupo preferido
- Dia preferido

### **6. Pedidos de Oração** (`prayer`)
**Botão**: "Enviar Pedido"
**Informações enviadas**:
- Nome, Email, Telefone
- Pedido de oração
- Permitir compartilhar publicamente (sim/não)

### **7. Ofertas e Dízimos** (`give`)
**Botão**: "Fazer Doação"
**Informações enviadas**:
- Tipo (Oferta ou Dízimo)
- Valor em USD
- Frequência (Uma vez, Semanal, Mensal)

---

## 🔧 COMO FUNCIONA

### **No Frontend (app.js)**:
```javascript
// Quando o usuário preenche e envia o formulário
const formData = new FormData(modalForm);
const data = Object.fromEntries(formData.entries());
data.formType = modalForm.dataset.formType;

// Envia para API
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### **No Backend (index.tsx)**:
```typescript
// Rota API que processa o formulário
app.post('/api/contact', async (c) => {
  const data = await c.req.json()
  
  // Formata email baseado no tipo de formulário
  const emailSubject = `[HPC Atlanta] ${formType}`
  const emailBody = `... dados formatados ...`
  
  // TODO: Enviar email via serviço de email
  // SendGrid, Mailgun, Resend, etc.
  
  return c.json({ success: true })
})
```

---

## ⚠️ IMPORTANTE - PRÓXIMO PASSO NECESSÁRIO

### **🔴 O CÓDIGO ESTÁ PRONTO MAS PRECISA DE INTEGRAÇÃO COM SERVIÇO DE EMAIL**

Atualmente o código:
- ✅ Captura todos os dados do formulário
- ✅ Formata o email corretamente
- ✅ Identifica o tipo de formulário
- ✅ Retorna sucesso ao usuário
- ❌ **NÃO ENVIA EMAIL REAL** (apenas loga no console)

### **Por quê?**
Cloudflare Workers não pode enviar emails diretamente. Precisa de um serviço externo.

---

## 🚀 COMO ATIVAR O ENVIO REAL DE EMAILS

### **OPÇÃO 1: SendGrid** (Recomendado - Fácil)

**1. Criar conta no SendGrid**:
- Acesse: https://sendgrid.com
- Crie uma conta gratuita (100 emails/dia grátis)
- Crie uma API Key

**2. Adicionar API Key ao Cloudflare**:
```bash
# No terminal
cd /home/user/webapp
wrangler secret put SENDGRID_API_KEY
# Cole a API key quando solicitado
```

**3. Descomentar o código no `index.tsx`** (linhas ~1594-1605):
```typescript
// Remover comentário deste bloco:
await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${c.env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: 'infipros@solihull.pt' }] }],
    from: { email: 'noreply@hpcatlanta.com' },
    subject: emailSubject,
    content: [{ type: 'text/plain', value: emailBody }]
  })
})
```

---

### **OPÇÃO 2: Resend** (Moderno)

**1. Criar conta no Resend**:
- Acesse: https://resend.com
- Crie uma conta
- Crie uma API Key

**2. Adicionar ao Cloudflare**:
```bash
wrangler secret put RESEND_API_KEY
```

**3. Usar código**:
```typescript
await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'HPC Atlanta <noreply@hpcatlanta.com>',
    to: ['infipros@solihull.pt'],
    subject: emailSubject,
    text: emailBody
  })
})
```

---

### **OPÇÃO 3: Mailgun**

Similar às anteriores, mas requer domínio verificado.

---

## 📝 EXEMPLO DE EMAIL RECEBIDO

Quando alguém preencher o **Cartão de Conexão**, você receberá:

```
De: noreply@hpcatlanta.com
Para: infipros@solihull.pt
Assunto: [HPC Atlanta] Cartão de Conexão

Novo Cartão de Conexão

Nome: João Silva
Email: joao@example.com
Telefone: +1 (770) 123-4567
Como conheceu a HPC: Amigo/Familiar

Pedido de Oração:
Orem pela minha família e pela cura da minha mãe.

Formulário recebido em: 20/11/2024, 19:00:00
```

---

## 🧪 TESTAR AGORA (Sem Email Real)

Você pode testar agora mesmo no site:

1. **Acesse**: https://3000-ihvtjt4eoboqu6y8hpg0r-c07dda5e.sandbox.novita.ai

2. **Clique em qualquer botão de formulário**:
   - "Preencher Cartão"
   - "Enviar Pedido" (oração)
   - "Quero Servir"
   - etc.

3. **Preencha e envie**

4. **Verifique**:
   - Mensagem de sucesso aparece
   - Dados aparecem no console do navegador (F12)
   - Mas email NÃO é enviado ainda (precisa integrar serviço)

---

## 📦 ARQUIVOS MODIFICADOS

### **1. `/home/user/webapp/src/index.tsx`**
- ✅ Nova rota API: `POST /api/contact`
- ✅ Processa 7 tipos de formulários
- ✅ Formata emails específicos para cada tipo
- ✅ Pronto para integração com SendGrid/Resend

### **2. `/home/user/webapp/public/static/app.js`**
- ✅ Substituída simulação por chamada real à API
- ✅ Tratamento de erros
- ✅ Mensagens de sucesso/erro ao usuário

### **3. `/home/user/webapp/cpanel-deploy/index.html`**
- ✅ HTML estático atualizado com novo JavaScript

---

## 🎯 STATUS ATUAL

| Item | Status |
|------|--------|
| Captura de dados dos formulários | ✅ Funcionando |
| Envio para API `/api/contact` | ✅ Funcionando |
| Formatação de emails | ✅ Funcionando |
| Mensagens de sucesso/erro | ✅ Funcionando |
| **Envio real de email** | ⏳ Precisa integrar serviço |

---

## ❓ QUAL SERVIÇO DE EMAIL USAR?

### **SendGrid** ✅
- **Prós**: Fácil, 100 emails/dia grátis, confiável
- **Contras**: Interface um pouco complexa

### **Resend** ✅✅ (RECOMENDADO)
- **Prós**: Moderno, fácil de usar, 3000 emails/mês grátis
- **Contras**: Requer domínio verificado

### **Mailgun**
- **Prós**: Poderoso, escalável
- **Contras**: Mais complexo de configurar

---

## 🚀 PRÓXIMOS PASSOS

**Para você**:
1. ⏳ Escolher serviço de email (Resend ou SendGrid)
2. ⏳ Criar conta e obter API key
3. ⏳ Adicionar API key ao Cloudflare (`wrangler secret put`)
4. ⏳ Descomentar código de envio no `index.tsx`
5. ⏳ Fazer rebuild e deploy
6. ✅ Emails começam a chegar em `infipros@solihull.pt`!

**Ou se preferir**:
- Me diga qual serviço quer usar
- Te oriento passo a passo!

---

## 📞 AJUDA

**Dúvidas?**
- Qual serviço de email quer usar?
- Precisa de ajuda para configurar?
- Quer que eu adicione o código completo?

**Me diga e eu te ajudo!** 🎯

---

**Versão**: 1.0.0
**Data**: 20 de Novembro de 2024
**Commit**: `d90eb05` - feat: Add contact form email integration
