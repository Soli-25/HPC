<?php
/**
 * Template 404 - Página Não Encontrada
 * 
 * @package HPC_Atlanta
 */

get_header(); ?>

<main id="main" class="site-main">
    <section class="error-404 not-found section text-center">
        <div class="container" style="max-width: 700px;">
            <header class="page-header">
                <h1 class="page-title" style="font-size: 6rem; color: var(--color-text-gray);">404</h1>
                <h2><?php _e('Oops! Página não encontrada', 'hpc-atlanta'); ?></h2>
            </header>

            <div class="page-content">
                <p><?php _e('A página que você está procurando não existe ou foi movida.', 'hpc-atlanta'); ?></p>
                <p><?php _e('Tente procurar usando o campo abaixo:', 'hpc-atlanta'); ?></p>
                
                <?php get_search_form(); ?>

                <div style="margin-top: 3rem;">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="btn">
                        <i class="fas fa-home"></i> <?php _e('Voltar para Início', 'hpc-atlanta'); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
