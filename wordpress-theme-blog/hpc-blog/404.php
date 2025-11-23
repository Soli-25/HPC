<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package HPC_Blog
 */

get_header();
?>

<main id="primary" class="site-content">
    <div class="container">
        <div class="content-area">
            
            <section class="error-404 not-found" style="background: white; padding: 4rem 2rem; border-radius: 8px; text-align: center; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">
                <header class="page-header">
                    <h1 class="page-title" style="font-size: 6rem; margin-bottom: 1rem; color: #1a1a1a;">404</h1>
                    <h2 style="font-size: 2rem; margin-bottom: 2rem;">Página Não Encontrada</h2>
                </header>
                
                <div class="page-content">
                    <p style="font-size: 1.25rem; color: #666; margin-bottom: 2rem;">
                        Desculpe, mas a página que você está procurando não existe ou foi movida.
                    </p>
                    
                    <div style="margin-bottom: 2rem;">
                        <?php get_search_form(); ?>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="read-more">
                            <i class="fas fa-home"></i> Voltar ao Início do Blog
                        </a>
                        <a href="<?php echo esc_url(home_url('/'));  ?>" class="read-more" style="background: #4a4a4a;">
                            <i class="fas fa-arrow-left"></i> Ir para o Site Principal
                        </a>
                    </div>
                </div>
            </section>
            
        </div>
    </div>
</main>

<?php
get_footer();
