# ⚠️ IMPORTANTE: Configuração do Resend

## 🔍 PROBLEMA IDENTIFICADO

O Resend detectou que está em **modo de teste** e só permite enviar emails para:
### **📧 info@somamotors.pt** (seu email de cadastro)

**Erro recebido**:
```
You can only send testing emails to your own email address.
To send emails to other recipients, please verify a domain.
```

---

## ✅ SOLUÇÃO: 2 OPÇÕES

### **OPÇÃO 1: Temporário - Enviar para seu próprio email** ⚡ RÁPIDO (2 min)

Enquanto você não verifica o domínio, podemos fazer os emails chegarem no seu email:
- **info@somamotors.pt**

**Vantagem**: Funciona AGORA mesmo
**Desvantagem**: Precisa depois reencaminhar para infipros@solihull.pt

**Quer fazer assim?** Me confirme e eu configuro em 1 minuto!

---

### **OPÇÃO 2: Definitivo - Verificar Domínio** ⭐ MELHOR (10 min)

Verificar um domínio no Resend para poder enviar para QUALQUER email.

#### **Qual domínio você tem?**
- `hpcatlanta.com`?
- `lisboagusak.com`?
- `somamotors.pt`?
- Outro?

#### **Passos para verificar domínio**:

**1. No Resend Dashboard**
👉 https://resend.com/domains

**2. Clique em "Add Domain"**

**3. Digite o domínio** (ex: `hpcatlanta.com`)

**4. O Resend mostrará registros DNS**
Exemplo:
```
TXT  resend._domainkey  p=MIGfMA0G...
MX   @                  feedback-smtp.resend.com
```

**5. Adicione esses registros no seu provedor DNS**
- Se o domínio está no Cloudflare: Dashboard → DNS → Add Record
- Se está em outro provedor: Painel de controle → DNS

**6. Aguarde verificação** (5-30 minutos)

**7. Emails funcionarão para QUALQUER destinatário!**

---

## 🚀 RECOMENDAÇÃO

**Para AGORA** (começar a testar):
✅ **OPÇÃO 1**: Enviar para `info@somamotors.pt`

**Para PRODUÇÃO** (depois):
✅ **OPÇÃO 2**: Verificar domínio `hpcatlanta.com` ou `lisboagusak.com`

---

## 📝 O QUE FAZER AGORA?

**Me diga qual opção você prefere**:

### **A) Enviar para info@somamotors.pt (temporário)**
→ Eu configuro em 1 minuto e você testa AGORA

### **B) Verificar domínio (definitivo)**
→ Me diga qual domínio (`hpcatlanta.com` ou outro)
→ Te guio passo a passo

### **C) Fazer AMBOS**
→ Primeiro A (teste rápido)
→ Depois B (produção)

**Qual você escolhe?** 🎯
