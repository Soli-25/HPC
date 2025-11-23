<?php
/**
 * HPC Atlanta Blog Theme Functions
 * 
 * @package HPC_Blog
 * @since 2.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function hpc_blog_setup() {
    // Adicionar suporte a título dinâmico
    add_theme_support('title-tag');
    
    // Adicionar suporte a imagens destacadas
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 600, true);
    
    // Adicionar tamanhos de imagem personalizados
    add_image_size('hpc-blog-featured', 1200, 600, true);
    add_image_size('hpc-blog-thumbnail', 400, 300, true);
    
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
    
    // Adicionar suporte a feeds automáticos
    add_theme_support('automatic-feed-links');
    
    // Registrar menus
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'hpc-blog'),
        'footer' => __('Menu Rodapé', 'hpc-blog')
    ));
    
    // Adicionar suporte a editor de blocos
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    
    // Adicionar suporte a custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 100,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Adicionar suporte a custom header
    add_theme_support('custom-header', array(
        'default-image'      => '',
        'width'              => 1200,
        'height'             => 400,
        'flex-height'        => true,
        'flex-width'         => true,
        'header-text'        => true,
    ));
    
    // Adicionar suporte a custom background
    add_theme_support('custom-background', array(
        'default-color' => 'f5f5f5',
    ));
}
add_action('after_setup_theme', 'hpc_blog_setup');

/**
 * Registrar Widget Areas
 */
function hpc_blog_widgets_init() {
    // Sidebar Principal
    register_sidebar(array(
        'name'          => __('Sidebar Principal', 'hpc-blog'),
        'id'            => 'sidebar-1',
        'description'   => __('Aparece na lateral direita de posts e páginas', 'hpc-blog'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    // Footer Widgets
    register_sidebar(array(
        'name'          => __('Rodapé 1', 'hpc-blog'),
        'id'            => 'footer-1',
        'description'   => __('Primeira coluna do rodapé', 'hpc-blog'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Rodapé 2', 'hpc-blog'),
        'id'            => 'footer-2',
        'description'   => __('Segunda coluna do rodapé', 'hpc-blog'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Rodapé 3', 'hpc-blog'),
        'id'            => 'footer-3',
        'description'   => __('Terceira coluna do rodapé', 'hpc-blog'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'hpc_blog_widgets_init');

/**
 * Enqueue Scripts and Styles
 */
function hpc_blog_scripts() {
    // Stylesheet principal
    wp_enqueue_style('hpc-blog-style', get_stylesheet_uri(), array(), '2.0.0');
    
    // FontAwesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');
    
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // JavaScript principal
    wp_enqueue_script('hpc-blog-script', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '2.0.0', true);
    
    // Comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'hpc_blog_scripts');

/**
 * Customizar excerpt
 */
function hpc_blog_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'hpc_blog_excerpt_length');

function hpc_blog_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'hpc_blog_excerpt_more');

/**
 * Adicionar classes ao body
 */
function hpc_blog_body_classes($classes) {
    // Adicionar classe se tem sidebar
    if (is_active_sidebar('sidebar-1') && (is_home() || is_archive() || is_search() || is_single())) {
        $classes[] = 'has-sidebar';
    }
    
    return $classes;
}
add_filter('body_class', 'hpc_blog_body_classes');

/**
 * Paginação customizada
 */
function hpc_blog_pagination() {
    global $wp_query;
    
    if ($wp_query->max_num_pages <= 1) return;
    
    $paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
    $max = intval($wp_query->max_num_pages);
    
    echo '<nav class="pagination">';
    
    // Link para página anterior
    if ($paged > 1) {
        echo '<a href="' . get_pagenum_link($paged - 1) . '"><i class="fas fa-chevron-left"></i> Anterior</a>';
    }
    
    // Números das páginas
    for ($i = 1; $i <= $max; $i++) {
        if ($i == $paged) {
            echo '<span class="current">' . $i . '</span>';
        } else {
            echo '<a href="' . get_pagenum_link($i) . '">' . $i . '</a>';
        }
    }
    
    // Link para próxima página
    if ($paged < $max) {
        echo '<a href="' . get_pagenum_link($paged + 1) . '">Próxima <i class="fas fa-chevron-right"></i></a>';
    }
    
    echo '</nav>';
}

/**
 * Formatar data em português
 */
function hpc_blog_time_ago($time) {
    $time_difference = time() - $time;
    
    if ($time_difference < 1) return 'agora mesmo';
    
    $condition = array(
        12 * 30 * 24 * 60 * 60 => 'ano',
        30 * 24 * 60 * 60       => 'mês',
        24 * 60 * 60            => 'dia',
        60 * 60                 => 'hora',
        60                      => 'minuto',
        1                       => 'segundo'
    );
    
    foreach ($condition as $secs => $str) {
        $d = $time_difference / $secs;
        
        if ($d >= 1) {
            $t = round($d);
            return 'há ' . $t . ' ' . $str . ($t > 1 ? 's' : '');
        }
    }
}

/**
 * Adicionar link "Voltar ao Site Principal"
 */
function hpc_blog_admin_bar_menu($wp_admin_bar) {
    $args = array(
        'id'    => 'voltar-site',
        'title' => '<span class="ab-icon dashicons-before dashicons-admin-home"></span> Voltar ao Site Principal',
        'href'  => home_url('/'),
        'meta'  => array(
            'class' => 'voltar-site-principal',
        ),
    );
    $wp_admin_bar->add_node($args);
}
add_action('admin_bar_menu', 'hpc_blog_admin_bar_menu', 100);

/**
 * Customizer
 */
function hpc_blog_customize_register($wp_customize) {
    // Seção de Informações da Igreja
    $wp_customize->add_section('hpc_church_info', array(
        'title'    => __('Informações da Igreja', 'hpc-blog'),
        'priority' => 30,
    ));
    
    // Endereço
    $wp_customize->add_setting('church_address', array(
        'default'   => '3379 Canton Rd, Marietta, GA 30066',
        'transport' => 'refresh',
    ));
    
    $wp_customize->add_control('church_address', array(
        'label'    => __('Endereço', 'hpc-blog'),
        'section'  => 'hpc_church_info',
        'type'     => 'text',
    ));
    
    // Telefone
    $wp_customize->add_setting('church_phone', array(
        'default'   => '+1 (770) 862-0756',
        'transport' => 'refresh',
    ));
    
    $wp_customize->add_control('church_phone', array(
        'label'    => __('Telefone', 'hpc-blog'),
        'section'  => 'hpc_church_info',
        'type'     => 'text',
    ));
    
    // Email
    $wp_customize->add_setting('church_email', array(
        'default'   => 'otavioamorim@houseprayeratl.com',
        'transport' => 'refresh',
    ));
    
    $wp_customize->add_control('church_email', array(
        'label'    => __('Email', 'hpc-blog'),
        'section'  => 'hpc_church_info',
        'type'     => 'email',
    ));
    
    // Instagram
    $wp_customize->add_setting('church_instagram', array(
        'default'   => 'https://www.instagram.com/hpcatlanta/',
        'transport' => 'refresh',
    ));
    
    $wp_customize->add_control('church_instagram', array(
        'label'    => __('Instagram URL', 'hpc-blog'),
        'section'  => 'hpc_church_info',
        'type'     => 'url',
    ));
    
    // Facebook
    $wp_customize->add_setting('church_facebook', array(
        'default'   => '#',
        'transport' => 'refresh',
    ));
    
    $wp_customize->add_control('church_facebook', array(
        'label'    => __('Facebook URL', 'hpc-blog'),
        'section'  => 'hpc_church_info',
        'type'     => 'url',
    ));
    
    // YouTube
    $wp_customize->add_setting('church_youtube', array(
        'default'   => '#',
        'transport' => 'refresh',
    ));
    
    $wp_customize->add_control('church_youtube', array(
        'label'    => __('YouTube URL', 'hpc-blog'),
        'section'  => 'hpc_church_info',
        'type'     => 'url',
    ));
}
add_action('customize_register', 'hpc_blog_customize_register');

/**
 * Adicionar meta box para tempo de leitura
 */
function hpc_blog_reading_time($content) {
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // 200 palavras por minuto
    return $reading_time;
}

/**
 * Remover comentário padrão do WordPress automaticamente
 * Roda apenas uma vez quando o tema é ativado
 */
function hpc_blog_remove_default_comment() {
    // Deletar o comentário padrão "A WordPress Commenter" (ID 1)
    $default_comment = get_comment(1);
    
    if ($default_comment && $default_comment->comment_author === 'A WordPress Commenter') {
        wp_delete_comment(1, true); // true = forçar deleção permanente
    }
}
add_action('after_switch_theme', 'hpc_blog_remove_default_comment');

/**
 * Também executar na ativação do tema pela primeira vez
 */
function hpc_blog_theme_activation() {
    hpc_blog_remove_default_comment();
}
add_action('after_setup_theme', 'hpc_blog_theme_activation');
