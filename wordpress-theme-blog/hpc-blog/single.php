<?php
/**
 * The template for displaying all single posts
 *
 * @package HPC_Blog
 */

get_header();
?>

<main id="primary" class="site-content">
    <div class="container">
        <div class="content-area">
            
            <?php
            while (have_posts()) :
                the_post();
                ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail">
                            <?php the_post_thumbnail('hpc-blog-featured'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <header class="entry-header">
                        <div class="entry-meta">
                            <span class="posted-on">
                                <i class="far fa-calendar"></i>
                                <?php echo get_the_date('j \d\e F \d\e Y'); ?>
                            </span>
                            <span class="posted-by">
                                <i class="far fa-user"></i>
                                <?php the_author(); ?>
                            </span>
                            <?php if (has_category()) : ?>
                                <span class="cat">
                                    <i class="far fa-folder"></i>
                                    <?php the_category(', '); ?>
                                </span>
                            <?php endif; ?>
                            <span class="reading-time">
                                <i class="far fa-clock"></i>
                                <?php echo hpc_blog_reading_time(get_the_content()); ?> min de leitura
                            </span>
                        </div>
                        
                        <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                    </header>
                    
                    <div class="entry-content">
                        <?php
                        the_content();
                        
                        wp_link_pages(array(
                            'before' => '<div class="page-links">Páginas:',
                            'after'  => '</div>',
                        ));
                        ?>
                    </div>
                    
                    <footer class="entry-footer">
                        <?php if (has_tag()) : ?>
                            <div class="tags-links">
                                <i class="fas fa-tags"></i>
                                <strong>Tags:</strong>
                                <?php the_tags('', ', ', ''); ?>
                            </div>
                        <?php endif; ?>
                        
                        <div class="post-navigation">
                            <?php
                            $prev_post = get_previous_post();
                            $next_post = get_next_post();
                            
                            if ($prev_post) : ?>
                                <a href="<?php echo get_permalink($prev_post); ?>" class="nav-previous">
                                    <i class="fas fa-chevron-left"></i>
                                    <span><?php echo get_the_title($prev_post); ?></span>
                                </a>
                            <?php endif;
                            
                            if ($next_post) : ?>
                                <a href="<?php echo get_permalink($next_post); ?>" class="nav-next">
                                    <span><?php echo get_the_title($next_post); ?></span>
                                    <i class="fas fa-chevron-right"></i>
                                </a>
                            <?php endif; ?>
                        </div>
                        
                        <div class="share-buttons" style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e5e5;">
                            <p><strong>Compartilhe esta mensagem:</strong></p>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" target="_blank" rel="noopener" class="share-facebook" style="display: inline-block; padding: 0.5rem 1rem; background: #1877f2; color: white; border-radius: 4px; margin-right: 0.5rem;">
                                <i class="fab fa-facebook-f"></i> Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>" target="_blank" rel="noopener" class="share-twitter" style="display: inline-block; padding: 0.5rem 1rem; background: #1da1f2; color: white; border-radius: 4px; margin-right: 0.5rem;">
                                <i class="fab fa-twitter"></i> Twitter
                            </a>
                            <a href="https://wa.me/?text=<?php the_title(); ?> - <?php the_permalink(); ?>" target="_blank" rel="noopener" class="share-whatsapp" style="display: inline-block; padding: 0.5rem 1rem; background: #25d366; color: white; border-radius: 4px;">
                                <i class="fab fa-whatsapp"></i> WhatsApp
                            </a>
                        </div>
                    </footer>
                    
                </article>
                
                <?php
                // Se os comentários estiverem abertos ou houver pelo menos um comentário, carrega o template
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                
            endwhile;
            ?>
            
        </div>
        
        <?php get_sidebar(); ?>
        
    </div>
</main>

<?php
get_footer();
