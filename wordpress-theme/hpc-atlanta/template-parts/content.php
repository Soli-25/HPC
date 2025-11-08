<?php
/**
 * Template para exibir conteúdo do post
 * 
 * @package HPC_Atlanta
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('blog-card'); ?>>
    
    <?php if (has_post_thumbnail()) : ?>
        <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('hpc-blog-thumb', array('class' => 'blog-card-image')); ?>
        </a>
    <?php endif; ?>

    <div class="blog-card-content">
        <?php
        the_title(sprintf('<h2 class="blog-card-title"><a href="%s" rel="bookmark">', esc_url(get_permalink())), '</a></h2>');
        ?>

        <div class="blog-card-meta">
            <span class="posted-date">
                <i class="far fa-calendar"></i>
                <?php echo get_the_date(); ?>
            </span>
            <span class="posted-author">
                <i class="far fa-user"></i>
                <?php echo get_the_author(); ?>
            </span>
        </div>

        <div class="blog-card-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <a href="<?php the_permalink(); ?>" class="btn btn-small">
            <?php _e('Ler mais', 'hpc-atlanta'); ?> <i class="fas fa-arrow-right"></i>
        </a>
    </div>

</article>
