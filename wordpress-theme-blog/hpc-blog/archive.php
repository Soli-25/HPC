<?php
/**
 * The template for displaying archive pages
 *
 * @package HPC_Blog
 */

get_header();
?>

<main id="primary" class="site-content">
    <div class="container">
        <div class="content-area">
            
            <header class="page-header" style="background: white; padding: 2rem; border-radius: 8px; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <?php
                the_archive_title('<h1 class="page-title">', '</h1>');
                the_archive_description('<div class="archive-description">', '</div>');
                ?>
            </header>
            
            <?php if (have_posts()) : ?>
                
                <?php while (have_posts()) : the_post(); ?>
                    
                    <?php get_template_part('template-parts/content', get_post_type()); ?>
                    
                <?php endwhile; ?>
                
                <?php hpc_blog_pagination(); ?>
                
            <?php else : ?>
                
                <?php get_template_part('template-parts/content', 'none'); ?>
                
            <?php endif; ?>
            
        </div>
        
        <?php get_sidebar(); ?>
        
    </div>
</main>

<?php
get_footer();
