<?php
/**
 * Template para Post Individual
 * 
 * @package HPC_Atlanta
 */

get_header(); ?>

<main id="main" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class('single-post'); ?>>
            
            <header class="single-post-header">
                <div class="container" style="max-width: 900px;">
                    <?php the_title('<h1 class="single-post-title">', '</h1>'); ?>
                    
                    <div class="single-post-meta">
                        <?php
                        hpc_atlanta_posted_on();
                        echo ' ';
                        hpc_atlanta_posted_by();
                        ?>
                        
                        <?php
                        $categories = get_the_category();
                        if (!empty($categories)) {
                            echo ' | <span class="categories-links">';
                            foreach ($categories as $category) {
                                echo '<a href="' . esc_url(get_category_link($category->term_id)) . '">' . esc_html($category->name) . '</a> ';
                            }
                            echo '</span>';
                        }
                        ?>
                    </div>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="single-post-thumbnail">
                    <div class="container" style="max-width: 1200px;">
                        <?php the_post_thumbnail('large', array('class' => 'img-fluid')); ?>
                    </div>
                </div>
            <?php endif; ?>

            <div class="single-post-content">
                <div class="container" style="max-width: 800px;">
                    <?php
                    the_content();

                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . __('Páginas:', 'hpc-atlanta'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
            </div>

            <footer class="single-post-footer">
                <div class="container" style="max-width: 800px;">
                    <?php
                    $tags = get_the_tags();
                    if ($tags) {
                        echo '<div class="post-tags"><strong>' . __('Tags:', 'hpc-atlanta') . '</strong> ';
                        foreach ($tags as $tag) {
                            echo '<a href="' . esc_url(get_tag_link($tag->term_id)) . '" class="tag-link">' . esc_html($tag->name) . '</a> ';
                        }
                        echo '</div>';
                    }
                    ?>

                    <div class="post-navigation mt-4">
                        <?php
                        $prev_post = get_previous_post();
                        $next_post = get_next_post();
                        ?>
                        
                        <div class="nav-links" style="display: flex; justify-content: space-between; gap: 2rem;">
                            <?php if ($prev_post) : ?>
                                <div class="nav-previous">
                                    <a href="<?php echo get_permalink($prev_post); ?>">
                                        <i class="fas fa-chevron-left"></i> <?php _e('Post Anterior', 'hpc-atlanta'); ?>
                                    </a>
                                </div>
                            <?php endif; ?>

                            <?php if ($next_post) : ?>
                                <div class="nav-next">
                                    <a href="<?php echo get_permalink($next_post); ?>">
                                        <?php _e('Próximo Post', 'hpc-atlanta'); ?> <i class="fas fa-chevron-right"></i>
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </footer>

        </article>

        <?php
        // Comentários
        if (comments_open() || get_comments_number()) :
            ?>
            <div class="container" style="max-width: 800px; margin-top: 3rem;">
                <?php comments_template(); ?>
            </div>
        <?php endif; ?>

    <?php endwhile; ?>
</main>

<?php
get_footer();
