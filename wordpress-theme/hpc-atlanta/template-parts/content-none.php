<?php
/**
 * Template para exibir quando nenhum conteúdo é encontrado
 * 
 * @package HPC_Atlanta
 */
?>

<section class="no-results not-found text-center" style="padding: 5rem 0;">
    <header class="page-header">
        <h1 class="page-title"><?php _e('Nada encontrado', 'hpc-atlanta'); ?></h1>
    </header>

    <div class="page-content" style="max-width: 600px; margin: 0 auto;">
        <?php if (is_home() && current_user_can('publish_posts')) : ?>

            <p><?php printf(__('Pronto para publicar seu primeiro post? <a href="%1$s">Comece aqui</a>.', 'hpc-atlanta'), esc_url(admin_url('post-new.php'))); ?></p>

        <?php elseif (is_search()) : ?>

            <p><?php _e('Desculpe, nada foi encontrado com esses termos de busca. Por favor, tente novamente com palavras diferentes.', 'hpc-atlanta'); ?></p>
            <?php get_search_form(); ?>

        <?php else : ?>

            <p><?php _e('Parece que não conseguimos encontrar o que você está procurando. Talvez a busca possa ajudar.', 'hpc-atlanta'); ?></p>
            <?php get_search_form(); ?>

        <?php endif; ?>
    </div>
</section>
