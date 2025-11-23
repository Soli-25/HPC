<?php
/**
 * The template for displaying search results pages
 *
 * @package HPC_Blog
 */

get_header();
?>

<main id="primary" class="site-content">
    <div class="container">
        <div class="content-area">
            
            <header class="page-header" style="background: white; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h1 class="page-title">
                    <?php
                    printf(
                        esc_html__('Resultados da busca por: %s', 'hpc-blog'),
                        '<span>' . get_search_query() . '</span>'
                    );
                    ?>
                </h1>
            </header>
            
            <?php if (have_posts()) : ?>
                
                <?php while (have_posts()) : the_post(); ?>
                    
                    <?php get_template_part('template-parts/content', 'search'); ?>
                    
                <?php endwhile; ?>
                
                <?php hpc_blog_pagination(); ?>
                
            <?php else : ?>
                
                <div class="post no-results" style="background: white; padding: 3rem; border-radius: 8px; text-align: center;">
                    <h2>Nenhum resultado encontrado</h2>
                    <p>Desculpe, mas nada foi encontrado para sua busca. Tente novamente com palavras-chave diferentes.</p>
                    <?php get_search_form(); ?>
                </div>
                
            <?php endif; ?>
            
        </div>
        
        <?php get_sidebar(); ?>
        
    </div>
</main>

<?php
get_footer();
