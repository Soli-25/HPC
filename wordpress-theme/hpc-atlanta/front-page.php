<?php
/**
 * Template da Página Inicial
 * 
 * Este é o template personalizado para a página inicial do site HPC Atlanta.
 * Você pode editar este conteúdo direto no WordPress em: Páginas > Início > Editar
 * 
 * @package HPC_Atlanta
 */

get_header(); ?>

<main id="main" class="site-main front-page">
    
    <?php
    // Se houver uma página configurada como página inicial, exibe o conteúdo dela
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            ?>

            <!-- Hero Section -->
            <section class="hero-section">
                <div class="container">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="hero-image" style="margin-bottom: 2rem;">
                            <?php the_post_thumbnail('hpc-hero'); ?>
                        </div>
                    <?php endif; ?>

                    <h1><?php the_title(); ?></h1>
                    <div class="hero-content">
                        <?php the_content(); ?>
                    </div>
                </div>
            </section>

        <?php
        endwhile;
    else :
        // Conteúdo padrão se não houver página configurada
        ?>
        
        <!-- Hero Section Default -->
        <section class="hero-section">
            <div class="container text-center">
                <h1>Bem-vindo à Igreja House of Prayer Atlanta</h1>
                <p>Uma família unida pelo amor de Cristo</p>
                <a href="#sobre" class="btn">Conheça Nossa Igreja</a>
            </div>
        </section>

        <!-- Sobre Section -->
        <section id="sobre" class="section" style="background: white;">
            <div class="container">
                <div class="text-center mb-4">
                    <h2>Sobre Nós</h2>
                    <p style="max-width: 700px; margin: 0 auto;">
                        A Igreja House of Prayer nasceu em Atlanta com o propósito de ser uma casa de oração 
                        para todas as nações, onde vidas são transformadas pelo poder do Evangelho.
                    </p>
                </div>
            </div>
        </section>

        <!-- Horários Section -->
        <section class="section" style="background: var(--color-bg-light);">
            <div class="container">
                <div class="text-center mb-4">
                    <h2>Horários de Cultos</h2>
                </div>
                
                <div class="blog-grid">
                    <div class="card">
                        <h3><i class="far fa-calendar"></i> Domingo</h3>
                        <p class="text-center" style="font-size: 2rem; font-weight: bold; color: var(--color-primary);">10:00 AM</p>
                        <p class="text-center">Culto de Celebração</p>
                    </div>
                    
                    <div class="card">
                        <h3><i class="far fa-calendar"></i> Quarta-feira</h3>
                        <p class="text-center" style="font-size: 2rem; font-weight: bold; color: var(--color-primary);">7:00 PM</p>
                        <p class="text-center">Culto de Oração</p>
                    </div>
                    
                    <div class="card">
                        <h3><i class="far fa-calendar"></i> Sexta-feira</h3>
                        <p class="text-center" style="font-size: 2rem; font-weight: bold; color: var(--color-primary);">7:00 PM</p>
                        <p class="text-center">Estudo Bíblico</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Blog Section -->
        <section class="section" style="background: white;">
            <div class="container">
                <div class="text-center mb-4">
                    <h2>Últimas Publicações</h2>
                    <p>Acompanhe as mensagens e reflexões do Pastor</p>
                </div>

                <?php
                // Exibir últimos 3 posts do blog
                $recent_posts = new WP_Query(array(
                    'posts_per_page' => 3,
                    'post_status' => 'publish'
                ));

                if ($recent_posts->have_posts()) :
                    echo '<div class="blog-grid">';
                    while ($recent_posts->have_posts()) :
                        $recent_posts->the_post();
                        get_template_part('template-parts/content');
                    endwhile;
                    echo '</div>';
                    
                    echo '<div class="text-center mt-4">';
                    echo '<a href="' . get_permalink(get_option('page_for_posts')) . '" class="btn">Ver Todos os Posts</a>';
                    echo '</div>';
                    
                    wp_reset_postdata();
                else :
                    echo '<p class="text-center">Nenhum post publicado ainda.</p>';
                endif;
                ?>
            </div>
        </section>

        <!-- Contato Section -->
        <section id="contato" class="section" style="background: var(--color-primary); color: white;">
            <div class="container text-center">
                <h2 style="color: white;">Entre em Contato</h2>
                <p style="color: rgba(255, 255, 255, 0.9); margin-bottom: 2rem;">
                    Ficaríamos felizes em receber você em nossa igreja!
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 900px; margin: 0 auto;">
                    <div>
                        <i class="fas fa-map-marker-alt" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <h4 style="color: white;">Endereço</h4>
                        <p style="color: rgba(255, 255, 255, 0.8);">
                            <?php echo get_theme_mod('hpc_address', '3379 Canton Rd, Marietta, GA 30066'); ?>
                        </p>
                    </div>
                    
                    <div>
                        <i class="fas fa-phone" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <h4 style="color: white;">Telefone</h4>
                        <p style="color: rgba(255, 255, 255, 0.8);">
                            <a href="tel:<?php echo esc_attr(str_replace(array(' ', '(', ')', '-'), '', get_theme_mod('hpc_phone', '+17708620756'))); ?>" style="color: rgba(255, 255, 255, 0.8);">
                                <?php echo get_theme_mod('hpc_phone', '+1 (770) 862-0756'); ?>
                            </a>
                        </p>
                    </div>
                    
                    <div>
                        <i class="fas fa-envelope" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <h4 style="color: white;">Email</h4>
                        <p style="color: rgba(255, 255, 255, 0.8);">
                            <a href="mailto:<?php echo get_theme_mod('hpc_email', 'contato@hpcatlanta.com'); ?>" style="color: rgba(255, 255, 255, 0.8);">
                                <?php echo get_theme_mod('hpc_email', 'contato@hpcatlanta.com'); ?>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>

    <?php endif; ?>

</main>

<?php
get_footer();
