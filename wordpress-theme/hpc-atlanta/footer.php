<?php
/**
 * Footer Template
 * 
 * @package HPC_Atlanta
 */
?>

    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-content">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-2')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-2'); ?>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-3')) : ?>
                    <div class="footer-section">
                        <?php dynamic_sidebar('footer-3'); ?>
                    </div>
                <?php else : ?>
                    <div class="footer-section">
                        <h3><?php _e('Contato', 'hpc-atlanta'); ?></h3>
                        <p>
                            <i class="fas fa-map-marker-alt"></i>
                            <?php echo get_theme_mod('hpc_address', '3379 Canton Rd, Marietta, GA 30066'); ?>
                        </p>
                        <p>
                            <i class="fas fa-phone"></i>
                            <a href="tel:<?php echo esc_attr(str_replace(array(' ', '(', ')', '-'), '', get_theme_mod('hpc_phone', '+17708620756'))); ?>">
                                <?php echo get_theme_mod('hpc_phone', '+1 (770) 862-0756'); ?>
                            </a>
                        </p>
                        <p>
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:<?php echo get_theme_mod('hpc_email', 'contato@hpcatlanta.com'); ?>">
                                <?php echo get_theme_mod('hpc_email', 'contato@hpcatlanta.com'); ?>
                            </a>
                        </p>
                    </div>

                    <div class="footer-section">
                        <h3><?php _e('Horários de Cultos', 'hpc-atlanta'); ?></h3>
                        <ul style="list-style: none;">
                            <li><strong><?php _e('Domingo:', 'hpc-atlanta'); ?></strong> 10:00 AM</li>
                            <li><strong><?php _e('Quarta-feira:', 'hpc-atlanta'); ?></strong> 7:00 PM</li>
                            <li><strong><?php _e('Sexta-feira:', 'hpc-atlanta'); ?></strong> 7:00 PM</li>
                            <li><strong><?php _e('Segunda-feira:', 'hpc-atlanta'); ?></strong> Escola Teológica</li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3><?php _e('Redes Sociais', 'hpc-atlanta'); ?></h3>
                        <div class="social-links">
                            <a href="#" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <div class="footer-bottom">
                <p>
                    <?php
                    printf(
                        __('&copy; %1$s %2$s. Todos os direitos reservados.', 'hpc-atlanta'),
                        date('Y'),
                        get_bloginfo('name')
                    );
                    ?>
                </p>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
