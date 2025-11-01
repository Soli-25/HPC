# 📸 Instruções para Adicionar Fotos do Instagram

## 🎯 Fotos para Adicionar:

### **Foto 1:** https://www.instagram.com/p/DNJ1R_6BUp2/
- **Onde usar:** Hero Section (Página Inicial - Topo)
- **Nome do arquivo:** `hero-principal.jpg`

### **Foto 2:** https://www.instagram.com/p/DNKBO_iOTVU/
- **Onde usar:** Galeria de Fotos
- **Nome do arquivo:** `galeria-01.jpg`

---

## 📋 Passo a Passo:

### **1. Baixar as Fotos do Instagram**

**Opção A - Usando Site de Download:**
1. Acesse: https://snapinsta.app/ ou https://igram.io/
2. Cole o link do post: `https://www.instagram.com/p/DNJ1R_6BUp2/`
3. Clique em "Download"
4. Salve a imagem como `hero-principal.jpg`
5. Repita para o segundo link, salvando como `galeria-01.jpg`

**Opção B - Pelo Celular:**
1. Abra o Instagram no celular
2. Abra o post
3. Clique nos 3 pontinhos (⋯)
4. Selecione "Salvar"
5. A foto será salva na galeria do celular
6. Transfira para o computador

**Opção C - Inspecionando o Instagram:**
1. Abra o post no navegador
2. Clique com botão direito → "Inspecionar" (F12)
3. Na aba "Network", filtre por "Images"
4. Recarregue a página
5. Encontre a imagem maior (geralmente 1080x1080)
6. Clique com direito na URL → "Open in new tab"
7. Salve a imagem

---

### **2. Adicionar as Fotos ao Projeto**

```bash
# Criar pasta de imagens (se não existir)
mkdir -p public/images

# Copiar as fotos baixadas para o projeto
# Coloque os arquivos em: /home/user/webapp/public/images/

# hero-principal.jpg → Foto principal do topo
# galeria-01.jpg → Primeira foto da galeria
```

---

### **3. Atualizar o Código**

#### **A) Hero Section (Foto Principal)**

Edite o arquivo: `src/index.tsx`

**Procure por:**
```tsx
{/* Hero Section */}
<section class="pt-20 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 text-white">
```

**Substitua por:**
```tsx
{/* Hero Section */}
<section class="pt-20 relative overflow-hidden">
  {/* Background Image */}
  <div class="absolute inset-0 z-0">
    <img 
      src="/images/hero-principal.jpg" 
      alt="HPC Atlanta - House of Prayer for all Nations"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-800/70 to-neutral-900/80"></div>
  </div>
  
  {/* Content */}
  <div class="relative z-10 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
      <div class="text-center max-w-4xl mx-auto">
        <p class="text-sm font-medium tracking-widest text-neutral-200 uppercase mb-6">HPC - House of Prayer for all Nations</p>
        <h2 class="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white drop-shadow-lg">Dê Seu Próximo Passo.</h2>
        <p class="text-xl md:text-2xl mb-10 text-neutral-100 font-light leading-relaxed drop-shadow">
          Uma casa de oração para todas as nações. Venha viver o que Deus tem para você!
        </p>
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 inline-block">
          <p class="text-base font-medium text-neutral-100 mb-2 uppercase tracking-wide">
            Inscrevendo Agora
          </p>
          <p class="text-2xl font-serif font-bold">
            2 de Dezembro de 2025
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### **B) Galeria de Fotos**

**Procure pela primeira foto da galeria:**
```tsx
{/* Instagram Photo 1 */}
<div class="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative">
  <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition flex items-center justify-center">
    <i class="fas fa-church text-neutral-400 text-6xl opacity-30"></i>
  </div>
```

**Substitua por:**
```tsx
{/* Instagram Photo 1 */}
<a href="https://www.instagram.com/p/DNKBO_iOTVU/" target="_blank" class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative block">
  <img 
    src="/images/galeria-01.jpg" 
    alt="Momentos da HPC Atlanta"
    class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
  />
  <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition"></div>
  <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
    <p class="text-white text-sm font-medium">HPC Atlanta</p>
    <p class="text-white text-xs opacity-80">@hpcatlanta</p>
  </div>
</a>
```

---

### **4. Rebuild e Testar**

```bash
cd /home/user/webapp

# Rebuild o projeto
npm run build

# Restart o servidor
pm2 restart webapp

# Ou se preferir limpar e reiniciar
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

---

### **5. Verificar**

Abra o site e verifique:
- ✅ Foto principal aparece no hero (topo)
- ✅ Foto na galeria está visível
- ✅ Hover effects funcionando
- ✅ Links para Instagram funcionando

---

## 🎨 **Otimização (Opcional)**

Para melhor performance, otimize as imagens antes:

1. **Redimensionar:** 
   - Hero: 1920x1080px (landscape)
   - Galeria: 800x800px (quadrado)

2. **Comprimir:**
   - Use: https://tinypng.com/
   - Ou: https://squoosh.app/

3. **Formato:**
   - Use JPG para fotos
   - Qualidade: 80-85%

---

## 📞 **Precisa de Ajuda?**

Se tiver dúvidas ou problemas:
1. Verifique se os arquivos estão em `/home/user/webapp/public/images/`
2. Verifique os nomes dos arquivos (case-sensitive!)
3. Faça rebuild após adicionar as fotos
4. Limpe o cache do navegador (Ctrl+F5)

---

**Boa sorte! 🚀**
