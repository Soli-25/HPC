# 📧 CONFIGURAÇÃO DE EMAIL PARA O PASTOR

## ✅ O QUE FOI FEITO

Todo o código foi atualizado para enviar emails para:
### **📬 otavioamorim@houseprayeratl.com** (Pastor Otávio Amorim)

**Todos os 7 formulários** agora estão configurados para este email:
1. ✅ Cartão de Conexão
2. ✅ Descubra a HPC
3. ✅ Junte-se à Equipe
4. ✅ Pedido de Batismo
5. ✅ Grupos de Conexão
6. ✅ Pedidos de Oração
7. ✅ Ofertas e Dízimos

---

## ⚠️ PROBLEMA ATUAL

O **Resend está em modo de teste** e só permite enviar emails para:
- **info@somamotors.pt** (email cadastrado na conta Resend)

**Erro recebido**:
```
You can only send testing emails to your own email address (info@somamotors.pt). 
To send emails to other recipients, please verify a domain at resend.com/domains.
```

---

## 🎯 SOLUÇÃO: 3 OPÇÕES

### **OPÇÃO 1: Verificar Domínio houseprayeratl.com** ⭐ RECOMENDADO (10 min)

**Por que é a melhor opção?**
- ✅ Emails virão de `@houseprayeratl.com` (profissional!)
- ✅ Pode enviar para **qualquer email** (pastor, membros, etc.)
- ✅ Melhor taxa de entrega
- ✅ Não fica preso ao modo de teste

**Passos**:

1. **Acesse o Resend Dashboard**:
   👉 https://resend.com/domains

2. **Clique em "Add Domain"**

3. **Digite**: `houseprayeratl.com`

4. **O Resend mostrará registros DNS como estes**:
   ```
   Tipo: TXT
   Nome: resend._domainkey
   Valor: p=MIGfMA0GCSqG... (valor longo)
   
   Tipo: MX
   Nome: @
   Valor: feedback-smtp.resend.com
   Prioridade: 10
   ```

5. **Adicione os registros DNS**:
   - Se o domínio está no **Cloudflare**: Dashboard → DNS → Add Record
   - Se está em **GoDaddy**: DNS Management → Add Record
   - Se está em **outro provedor**: Painel de DNS

6. **Aguarde verificação** (5-30 minutos)

7. **Pronto!** Emails funcionarão para o pastor e qualquer destinatário

**Depois da verificação, os emails virão de**:
```
From: HPC Atlanta <noreply@houseprayeratl.com>
To: otavioamorim@houseprayeratl.com
```

---

### **OPÇÃO 2: Usar Email Temporário (info@somamotors.pt)** ⚡ FUNCIONA AGORA

**Como funciona?**
- Mantemos emails indo para `info@somamotors.pt`
- Você **reencaminha manualmente** para o pastor

**Vantagens**:
- ✅ Funciona IMEDIATAMENTE
- ✅ Não precisa configurar DNS

**Desvantagens**:
- ❌ Emails não vão direto para o pastor
- ❌ Precisa reencaminhar manualmente cada email
- ❌ Não é profissional para produção

**Se quiser esta opção**, eu configuro em 1 minuto!

---

### **OPÇÃO 3: Cadastrar Email do Pastor no Resend** 🔧 ALTERNATIVA (5 min)

**Como funciona?**
- Adicionar `otavioamorim@houseprayeratl.com` na conta Resend
- Resend enviará email de verificação para o pastor
- Depois de verificado, pode receber emails

**Passos**:

1. **Acesse Resend Dashboard**:
   👉 https://resend.com/domains

2. **Vá em "Verified Email Addresses"**

3. **Adicione**: `otavioamorim@houseprayeratl.com`

4. **Pastor receberá email de verificação** no Gmail dele

5. **Pastor clica no link de verificação**

6. **Pronto!** Emails funcionarão

**Vantagens**:
- ✅ Mais rápido que verificar domínio
- ✅ Não precisa mexer em DNS

**Desvantagens**:
- ❌ Emails virão de `onboarding@resend.dev` (não profissional)
- ❌ Só funciona para UM email por vez
- ❌ Limitado a emails verificados manualmente

---

## 🚀 RECOMENDAÇÃO FINAL

### **Para PRODUÇÃO (Igreja Real)**:
✅ **OPÇÃO 1**: Verificar domínio `houseprayeratl.com`
- Emails profissionais @houseprayeratl.com
- Enviar para qualquer destinatário
- **TEMPO: 10-15 minutos**

### **Para TESTAR AGORA**:
✅ **OPÇÃO 2**: Usar `info@somamotors.pt` temporariamente
- Funciona em 1 minuto
- Você reencaminha para o pastor

### **Alternativa Rápida**:
✅ **OPÇÃO 3**: Verificar email do pastor individualmente
- Mais rápido que domínio
- Limitado a 1 email por vez

---

## 📝 DECISÃO NECESSÁRIA

**Me diga qual opção você prefere**:

### **A) Verificar domínio houseprayeratl.com** (10 min) ⭐ MELHOR
- Você tem acesso ao DNS do domínio?
- Precisa de ajuda para adicionar registros?

### **B) Usar info@somamotors.pt temporariamente** (1 min) ⚡ RÁPIDO
- Você reencaminha emails manualmente para o pastor
- Depois fazemos OPÇÃO A

### **C) Verificar email do pastor individualmente** (5 min) 🔧 ALTERNATIVA
- Pastor precisa clicar no link de verificação
- Funciona só para este email

---

## 📊 STATUS ATUAL

| Item | Status |
|------|--------|
| Código do site | ✅ Configurado para pastor |
| Email destino | ✅ otavioamorim@houseprayeratl.com |
| Formulários funcionando | ✅ Todos os 7 |
| Resend configurado | ⏳ Em modo de teste |
| **Precisa**: | Verificar domínio ou email |

---

## 🎯 PRÓXIMO PASSO

**Escolha UMA das opções acima** e me avise para eu ajudar a configurar!

**Minha recomendação**: OPÇÃO 1 (verificar domínio) - é definitivo e profissional! 🚀

---

**Última atualização**: 20 de Novembro de 2024
**Status**: Aguardando decisão sobre verificação de domínio/email
