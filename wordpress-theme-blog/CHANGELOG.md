# 📋 CHANGELOG - HPC Atlanta Blog Theme

## Versão 2.0.1 (23 Nov 2024)

### ✅ Correções:
- **Logo agora retorna ao site principal**: Clicar no logo HPC Atlanta leva para https://houseprayeratl.com
- **Link "Site Principal" corrigido**: Aponta para https://houseprayeratl.com (não mais para home do blog)
- **Comentário padrão do WordPress removido**: O comentário "A WordPress Commenter" é deletado automaticamente ao ativar o tema
- **Sistema de comentários mantido**: Comentários de pessoas reais continuam funcionando normalmente

### 🔧 Alterações Técnicas:
- `header.php`: Logo envolto em `<a href="https://houseprayeratl.com">`
- `header.php`: Link "Site Principal" aponta para https://houseprayeratl.com
- `footer.php`: Link "Voltar ao Site Principal" aponta para https://houseprayeratl.com
- `functions.php`: Adicionada função `hpc_blog_remove_default_comment()` que deleta o comentário ID 1 automaticamente

---

## Versão 2.0.0 (23 Nov 2024)

### 🎉 Lançamento Inicial:
- Tema WordPress completo para HPC Atlanta Blog
- Design preto/branco/cinza matching site principal
- Layout responsivo com sidebar
- Sistema de comentários completo
- Compartilhamento social (Facebook, Twitter, WhatsApp)
- Tempo de leitura automático
- Botões de imprimir e copiar link
- Customizer com opções da igreja
- 4 áreas de widgets (1 sidebar + 3 footer)
- Templates: index, single, archive, search, 404
- Integração com site principal
- SEO otimizado
