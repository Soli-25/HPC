<?php
/**
 * Template para Páginas Estáticas
 * 
 * @package HPC_Atlanta
 */

get_header(); ?>

<main id="main" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class('single-page'); ?>>
            
            <header class="page-header text-center section">
                <div class="container" style="max-width: 900px;">
                    <?php the_title('<h1 class="page-title">', '</h1>'); ?>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="page-thumbnail section">
                    <div class="container" style="max-width: 1200px;">
                        <?php the_post_thumbnail('large', array('class' => 'img-fluid', 'style' => 'border-radius: 1rem;')); ?>
                    </div>
                </div>
            <?php endif; ?>

            <div class="page-content">
                <div class="container" style="max-width: 900px;">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . __('Páginas:', 'hpc-atlanta'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
            </div>

        </article>

        <?php
        // Comentários (se habilitado)
        if (comments_open() || get_comments_number()) :
            ?>
            <div class="container" style="max-width: 900px; margin-top: 3rem;">
                <?php comments_template(); ?>
            </div>
        <?php endif; ?>

    <?php endwhile; ?>
</main>

<?php
get_footer();
