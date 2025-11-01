# 📸 Como Adicionar Fotos Reais do Instagram da HPC

## 🎯 Opção 1: Usando URLs Diretas de Imagens

### Passo 1: Obter URLs das Fotos do Instagram

1. Acesse https://www.instagram.com/hpcatlanta/
2. Abra uma foto que deseja usar
3. Clique com botão direito na imagem → "Inspecionar" (ou F12)
4. Encontre a tag `<img>` e copie o valor do atributo `src`
5. A URL será algo como: `https://instagram.fxxx-x.fna.fbcdn.net/...`

### Passo 2: Adicionar as URLs no Código

Edite o arquivo `src/index.tsx` e substitua os placeholders por imagens reais:

**ANTES (placeholder):**
```tsx
<div class="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg overflow-hidden...">
  <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20...">
    <i class="fas fa-church text-neutral-400 text-6xl opacity-30"></i>
  </div>
  ...
</div>
```

**DEPOIS (com foto real):**
```tsx
<div class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative">
  <img 
    src="URL_DA_FOTO_AQUI" 
    alt="Culto de Domingo na HPC Atlanta" 
    class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
  />
  <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition"></div>
  <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
    <p class="text-white text-sm font-medium">Culto de Domingo</p>
  </div>
</div>
```

## 🎯 Opção 2: Salvando Fotos Localmente (Recomendado)

### Passo 1: Baixar as Fotos

1. Acesse https://www.instagram.com/hpcatlanta/
2. Baixe as fotos que deseja usar (clique direito → Salvar imagem)
3. Salve com nomes descritivos: `culto-domingo.jpg`, `louvor.jpg`, etc.

### Passo 2: Adicionar ao Projeto

```bash
# Criar pasta de imagens
mkdir -p public/images/gallery

# Mover as fotos para a pasta
# Coloque seus arquivos .jpg ou .png em: public/images/gallery/
```

### Passo 3: Atualizar o Código

```tsx
<div class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative">
  <img 
    src="/images/gallery/culto-domingo.jpg" 
    alt="Culto de Domingo na HPC Atlanta" 
    class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
  />
  <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition"></div>
  <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
    <p class="text-white text-sm font-medium">Culto de Domingo</p>
  </div>
</div>
```

## 📋 Lista de Fotos Sugeridas (8 fotos)

1. **culto-domingo.jpg** - Foto do culto de domingo (visão geral)
2. **oracao.jpg** - Momento de oração
3. **servir.jpg** - Equipe servindo
4. **comunhao.jpg** - Pessoas em comunhão
5. **louvor.jpg** - Equipe de louvor ou momento de adoração
6. **familia.jpg** - Foto da família da igreja
7. **palavra.jpg** - Pastor pregando ou momento da palavra
8. **nações.jpg** - Foto representando diversidade/todas as nações

## 🎨 Especificações das Imagens

- **Formato**: JPG ou PNG
- **Tamanho recomendado**: 800x800px (quadrado)
- **Peso máximo**: 500KB por imagem
- **Qualidade**: Alta resolução, boa iluminação

## 🔄 Após Adicionar as Fotos

```bash
# Rebuild o projeto
npm run build

# Restart o servidor
pm2 restart webapp

# Ou reinicie manualmente
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

## 💡 Dicas

1. **Otimize as imagens** antes de usar (use TinyPNG.com ou similar)
2. **Use fotos de alta qualidade** para melhor impressão visual
3. **Mantenha consistência** nas cores e estilo das fotos
4. **Adicione alt text descritivo** para acessibilidade
5. **Teste em diferentes dispositivos** (mobile, tablet, desktop)

## 🚀 Exemplo Completo

Aqui está um exemplo de como ficará uma foto real no código:

```tsx
{/* Instagram Photo 1 - CULTO DE DOMINGO */}
<div class="aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition relative">
  <img 
    src="/images/gallery/culto-domingo.jpg" 
    alt="Culto de Domingo na HPC Atlanta - Casa de Oração para Todas as Nações" 
    class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
    loading="lazy"
  />
  <div class="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition"></div>
  <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition">
    <p class="text-white text-sm font-medium">Culto de Domingo</p>
    <p class="text-white text-xs opacity-80">@hpcatlanta</p>
  </div>
</div>
```

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre como adicionar as fotos, me avise! Posso ajudar com:
- Scripts para automatizar o processo
- Otimização de imagens
- Ajustes no layout da galeria
- Integração com APIs do Instagram

---

**Desenvolvido para HPC Atlanta - House of Prayer for all Nations** 🙏
