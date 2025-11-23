<?php
/**
 * The template for displaying the footer
 *
 * @package HPC_Blog
 */
?>

    <footer id="colophon" class="site-footer">
        <div class="container">
            
            <?php if (is_active_sidebar('footer-1') || is_active_sidebar('footer-2') || is_active_sidebar('footer-3')) : ?>
                <div class="footer-widgets">
                    <?php if (is_active_sidebar('footer-1')) : ?>
                        <div class="footer-widget-area">
                            <?php dynamic_sidebar('footer-1'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (is_active_sidebar('footer-2')) : ?>
                        <div class="footer-widget-area">
                            <?php dynamic_sidebar('footer-2'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (is_active_sidebar('footer-3')) : ?>
                        <div class="footer-widget-area">
                            <?php dynamic_sidebar('footer-3'); ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <div class="site-info">
                <p>
                    &copy; <?php echo date('Y'); ?> 
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        <?php bloginfo('name'); ?>
                    </a>
                    - House of Prayer for All Nations
                </p>
                <p>
                    <?php
                    $address = get_theme_mod('church_address', '3379 Canton Rd, Marietta, GA 30066');
                    $phone = get_theme_mod('church_phone', '+1 (770) 862-0756');
                    ?>
                    <i class="fas fa-map-marker-alt"></i> <?php echo esc_html($address); ?> | 
                    <i class="fas fa-phone"></i> <?php echo esc_html($phone); ?>
                </p>
                <p class="social-links">
                    <?php
                    $instagram = get_theme_mod('church_instagram', 'https://www.instagram.com/hpcatlanta/');
                    $facebook = get_theme_mod('church_facebook', '#');
                    $youtube = get_theme_mod('church_youtube', '#');
                    
                    if ($instagram) : ?>
                        <a href="<?php echo esc_url($instagram); ?>" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-instagram"></i>
                        </a>
                    <?php endif;
                    
                    if ($facebook) : ?>
                        <a href="<?php echo esc_url($facebook); ?>" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-facebook"></i>
                        </a>
                    <?php endif;
                    
                    if ($youtube) : ?>
                        <a href="<?php echo esc_url($youtube); ?>" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-youtube"></i>
                        </a>
                    <?php endif; ?>
                </p>
                <p class="back-to-main-site">
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        <i class="fas fa-arrow-left"></i> Voltar ao Site Principal
                    </a>
                </p>
            </div>
            
        </div>
    </footer>
    
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
