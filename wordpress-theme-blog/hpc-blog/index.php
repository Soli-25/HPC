<?php
/**
 * The main template file
 *
 * @package HPC_Blog
 */

get_header();
?>

<main id="primary" class="site-content">
    <div class="container">
        <div class="content-area">
            
            <?php if (have_posts()) : ?>
                
                <?php while (have_posts()) : the_post(); ?>
                    
                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                        
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="post-thumbnail">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('hpc-blog-featured'); ?>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <header class="entry-header">
                            <div class="entry-meta">
                                <span class="posted-on">
                                    <i class="far fa-calendar"></i>
                                    <?php echo get_the_date(); ?>
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
                                <span class="comments">
                                    <i class="far fa-comments"></i>
                                    <?php comments_number('0 comentários', '1 comentário', '% comentários'); ?>
                                </span>
                            </div>
                            
                            <?php the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
                        </header>
                        
                        <div class="entry-content">
                            <?php the_excerpt(); ?>
                        </div>
                        
                        <footer class="entry-footer">
                            <a href="<?php the_permalink(); ?>" class="read-more">
                                Ler Mensagem Completa <i class="fas fa-arrow-right"></i>
                            </a>
                            
                            <?php if (has_tag()) : ?>
                                <div class="tags-links">
                                    <i class="fas fa-tags"></i>
                                    <?php the_tags('', ', ', ''); ?>
                                </div>
                            <?php endif; ?>
                        </footer>
                        
                    </article>
                    
                <?php endwhile; ?>
                
                <?php hpc_blog_pagination(); ?>
                
            <?php else : ?>
                
                <article class="post no-results">
                    <header class="entry-header">
                        <h1 class="entry-title">Nenhum post encontrado</h1>
                    </header>
                    <div class="entry-content">
                        <p>Desculpe, mas nenhum post corresponde aos seus critérios de pesquisa. Por favor, tente novamente com palavras-chave diferentes.</p>
                    </div>
                </article>
                
            <?php endif; ?>
            
        </div>
        
        <?php get_sidebar(); ?>
        
    </div>
</main>

<?php
get_footer();
