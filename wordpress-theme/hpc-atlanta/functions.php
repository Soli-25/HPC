<?php
/**
 * HPC Atlanta Theme Functions
 * 
 * @package HPC_Atlanta
 * @since 1.0.0
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuração do Tema
 */
function hpc_atlanta_setup() {
    // Adicionar suporte a título dinâmico
    add_theme_support('title-tag');
    
    // Adicionar suporte a imagens destacadas
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 600, true);
    
    // Adicionar tamanhos de imagem personalizados
    add_image_size('hpc-blog-thumb', 400, 300, true);
    add_image_size('hpc-hero', 1920, 800, true);
    
    // Adicionar suporte a HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style'
    ));
    
    // Adicionar suporte a RSS feed links
    add_theme_support('automatic-feed-links');
    
    // Registrar menu de navegação
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'hpc-atlanta'),
        'footer' => __('Menu Rodapé', 'hpc-atlanta')
    ));
    
    // Adicionar suporte a Custom Logo
    add_theme_support('custom-logo', array(
        'height' => 100,
        'width' => 300,
        'flex-height' => true,
        'flex-width' => true
    ));
    
    // Adicionar suporte a Custom Header
    add_theme_support('custom-header', array(
        'default-image' => '',
        'width' => 1920,
        'height' => 800,
        'flex-height' => true,
        'flex-width' => true
    ));
    
    // Adicionar suporte a Custom Background
    add_theme_support('custom-background', array(
        'default-color' => 'ffffff'
    ));
    
    // Adicionar suporte a Editor Gutenberg
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'hpc_atlanta_setup');

/**
 * Enfileirar Scripts e Estilos
 */
function hpc_atlanta_scripts() {
    // Stylesheet principal
    wp_enqueue_style('hpc-atlanta-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Font Awesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // JavaScript do tema
    wp_enqueue_script('hpc-atlanta-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Comentários
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'hpc_atlanta_scripts');

/**
 * Registrar Áreas de Widgets
 */
function hpc_atlanta_widgets_init() {
    // Sidebar do Blog
    register_sidebar(array(
        'name' => __('Sidebar do Blog', 'hpc-atlanta'),
        'id' => 'blog-sidebar',
        'description' => __('Aparece na lateral das páginas do blog', 'hpc-atlanta'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>'
    ));
    
    // Footer - Coluna 1
    register_sidebar(array(
        'name' => __('Footer - Coluna 1', 'hpc-atlanta'),
        'id' => 'footer-1',
        'description' => __('Primeira coluna do rodapé', 'hpc-atlanta'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>'
    ));
    
    // Footer - Coluna 2
    register_sidebar(array(
        'name' => __('Footer - Coluna 2', 'hpc-atlanta'),
        'id' => 'footer-2',
        'description' => __('Segunda coluna do rodapé', 'hpc-atlanta'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>'
    ));
    
    // Footer - Coluna 3
    register_sidebar(array(
        'name' => __('Footer - Coluna 3', 'hpc-atlanta'),
        'id' => 'footer-3',
        'description' => __('Terceira coluna do rodapé', 'hpc-atlanta'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>'
    ));
}
add_action('widgets_init', 'hpc_atlanta_widgets_init');

/**
 * Customizar Excerpt Length
 */
function hpc_atlanta_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'hpc_atlanta_excerpt_length');

/**
 * Customizar Excerpt More
 */
function hpc_atlanta_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'hpc_atlanta_excerpt_more');

/**
 * Adicionar Classes ao Body
 */
function hpc_atlanta_body_classes($classes) {
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }
    
    if (is_front_page()) {
        $classes[] = 'front-page';
    }
    
    return $classes;
}
add_filter('body_class', 'hpc_atlanta_body_classes');

/**
 * Customizar Paginação
 */
function hpc_atlanta_pagination() {
    if (is_singular()) {
        return;
    }

    global $wp_query;

    if ($wp_query->max_num_pages <= 1) {
        return;
    }

    $paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
    $max = intval($wp_query->max_num_pages);

    if ($paged >= 1) {
        $links = array();
    }

    if ($paged >= 3 && $paged < $max && $max > 3) {
        $links[] = $paged - 1;
    }

    if ($paged >= 2 && $paged < ($max - 1) && $max > 2) {
        $links[] = $paged;
    }

    if ($paged >= 1 && $paged < ($max - 2) && $max > 1) {
        $links[] = $paged + 1;
    }

    echo '<div class="pagination-container"><nav class="pagination" aria-label="Paginação">' . "\n";

    if ($paged > 1) {
        echo '<a href="' . get_pagenum_link($paged - 1) . '" class="pagination-link pagination-prev"><i class="fas fa-chevron-left"></i> Anterior</a>' . "\n";
    }

    if (!in_array(1, $links)) {
        $class = 1 == $paged ? ' pagination-current' : '';
        printf('<a href="%s" class="pagination-link%s">%d</a>' . "\n", esc_url(get_pagenum_link(1)), $class, 1);

        if (!in_array(2, $links)) {
            echo '<span class="pagination-ellipsis">...</span>' . "\n";
        }
    }

    sort($links);
    foreach ((array)$links as $link) {
        $class = $paged == $link ? ' pagination-current' : '';
        printf('<a href="%s" class="pagination-link%s">%d</a>' . "\n", esc_url(get_pagenum_link($link)), $class, $link);
    }

    if (!in_array($max, $links)) {
        if (!in_array($max - 1, $links)) {
            echo '<span class="pagination-ellipsis">...</span>' . "\n";
        }

        $class = $paged == $max ? ' pagination-current' : '';
        printf('<a href="%s" class="pagination-link%s">%d</a>' . "\n", esc_url(get_pagenum_link($max)), $class, $max);
    }

    if ($paged < $max) {
        echo '<a href="' . get_pagenum_link($paged + 1) . '" class="pagination-link pagination-next">Próxima <i class="fas fa-chevron-right"></i></a>' . "\n";
    }

    echo '</nav></div>' . "\n";
}

/**
 * Formatar Data em Português
 */
function hpc_atlanta_posted_on() {
    $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';
    
    $time_string = sprintf($time_string,
        esc_attr(get_the_date('c')),
        esc_html(get_the_date())
    );
    
    echo '<span class="posted-on">' . $time_string . '</span>';
}

/**
 * Exibir Autor do Post
 */
function hpc_atlanta_posted_by() {
    echo '<span class="byline"> por <a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>';
}

/**
 * Adicionar Suporte a Customizer
 */
function hpc_atlanta_customize_register($wp_customize) {
    // Seção de Informações da Igreja
    $wp_customize->add_section('hpc_church_info', array(
        'title' => __('Informações da Igreja', 'hpc-atlanta'),
        'priority' => 30
    ));
    
    // Endereço
    $wp_customize->add_setting('hpc_address', array(
        'default' => '3379 Canton Rd, Marietta, GA 30066',
        'sanitize_callback' => 'sanitize_text_field'
    ));
    
    $wp_customize->add_control('hpc_address', array(
        'label' => __('Endereço', 'hpc-atlanta'),
        'section' => 'hpc_church_info',
        'type' => 'text'
    ));
    
    // Telefone
    $wp_customize->add_setting('hpc_phone', array(
        'default' => '+1 (770) 862-0756',
        'sanitize_callback' => 'sanitize_text_field'
    ));
    
    $wp_customize->add_control('hpc_phone', array(
        'label' => __('Telefone', 'hpc-atlanta'),
        'section' => 'hpc_church_info',
        'type' => 'text'
    ));
    
    // Email
    $wp_customize->add_setting('hpc_email', array(
        'default' => 'contato@hpcatlanta.com',
        'sanitize_callback' => 'sanitize_email'
    ));
    
    $wp_customize->add_control('hpc_email', array(
        'label' => __('Email', 'hpc-atlanta'),
        'section' => 'hpc_church_info',
        'type' => 'email'
    ));
}
add_action('customize_register', 'hpc_atlanta_customize_register');
