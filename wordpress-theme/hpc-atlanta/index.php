<?php
/**
 * Template Principal
 * 
 * @package HPC_Atlanta
 */

get_header(); ?>

<main id="main" class="site-main">
    <div class="container">
        <div class="section">
            <?php if (have_posts()) : ?>
                
                <header class="page-header text-center mb-4">
                    <?php if (is_home() && !is_front_page()) : ?>
                        <h1 class="page-title"><?php single_post_title(); ?></h1>
                    <?php elseif (is_archive()) : ?>
                        <h1 class="page-title"><?php the_archive_title(); ?></h1>
                        <?php the_archive_description('<div class="archive-description">', '</div>'); ?>
                    <?php elseif (is_search()) : ?>
                        <h1 class="page-title">
                            <?php printf(__('Resultados da busca por: %s', 'hpc-atlanta'), '<span>' . get_search_query() . '</span>'); ?>
                        </h1>
                    <?php else : ?>
                        <h1 class="page-title"><?php _e('Blog do Pastor', 'hpc-atlanta'); ?></h1>
                        <p class="page-subtitle"><?php _e('Reflexões, sermões e estudos bíblicos', 'hpc-atlanta'); ?></p>
                    <?php endif; ?>
                </header>

                <div class="blog-grid">
                    <?php
                    while (have_posts()) :
                        the_post();
                        get_template_part('template-parts/content', get_post_type());
                    endwhile;
                    ?>
                </div>

                <?php hpc_atlanta_pagination(); ?>

            <?php else : ?>
                
                <?php get_template_part('template-parts/content', 'none'); ?>

            <?php endif; ?>
        </div>
    </div>
</main>

<?php
get_footer();
