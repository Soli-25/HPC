<?php
/**
 * The header for our theme
 *
 * @package HPC_Blog
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    
    <a class="skip-link screen-reader-text" href="#primary">Pular para o conteúdo</a>
    
    <header id="masthead" class="site-header">
        <div class="container">
            <div class="site-branding">
                <a href="https://houseprayeratl.com" title="Voltar ao Site Principal">
                    <?php
                    if (has_custom_logo()) :
                        the_custom_logo();
                    else : ?>
                        <img src="https://page.gensparksite.com/v1/base64_upload/c546526c278c1da817935bf43ab43ce9" alt="HPC Atlanta Logo" class="site-logo">
                    <?php endif; ?>
                </a>
                
                <div class="site-identity">
                    <?php
                    if (is_front_page() && is_home()) :
                        ?>
                        <h1 class="site-title">
                            <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                                <?php bloginfo('name'); ?>
                            </a>
                        </h1>
                        <?php
                    else :
                        ?>
                        <p class="site-title">
                            <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                                <?php bloginfo('name'); ?>
                            </a>
                        </p>
                        <?php
                    endif;
                    
                    $description = get_bloginfo('description', 'display');
                    if ($description || is_customize_preview()) :
                        ?>
                        <p class="site-description"><?php echo $description; ?></p>
                    <?php endif; ?>
                </div>
            </div>
            
            <nav id="site-navigation" class="main-navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'fallback_cb'    => false,
                ));
                ?>
                
                <a href="https://houseprayeratl.com" class="back-to-site">
                    <i class="fas fa-home"></i> Site Principal
                </a>
            </nav>
        </div>
    </header>
