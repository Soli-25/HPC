/**
 * HPC Atlanta Theme JavaScript
 * 
 * @package HPC_Atlanta
 */

(function($) {
    'use strict';

    // Mobile Menu Toggle
    $('.menu-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('#primary-menu').slideToggle(300);
        $(this).attr('aria-expanded', function(i, attr) {
            return attr === 'true' ? 'false' : 'true';
        });
    });

    // Smooth Scroll
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
                return false;
            }
        }
    });

    // Scroll to Top Button
    var scrollButton = $('<button class="scroll-to-top" aria-label="Voltar ao topo"><i class="fas fa-chevron-up"></i></button>');
    $('body').append(scrollButton);

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            scrollButton.fadeIn();
        } else {
            scrollButton.fadeOut();
        }
    });

    scrollButton.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    // Adicionar estilos para o botão de scroll
    var scrollStyles = `
        <style>
            .scroll-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                background: var(--color-primary);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: none;
                z-index: 999;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
            }
            .scroll-to-top:hover {
                background: var(--color-secondary);
                transform: translateY(-5px);
            }
            .scroll-to-top i {
                font-size: 1.2rem;
            }
            
            @media (max-width: 768px) {
                .main-navigation ul {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--color-primary);
                    padding: 1rem;
                }
                .menu-toggle {
                    display: block;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .menu-toggle.active i:before {
                    content: "\\f00d";
                }
            }
            
            @media (min-width: 769px) {
                .menu-toggle {
                    display: none;
                }
            }
        </style>
    `;
    $('head').append(scrollStyles);

    // Lazy Load Images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }

})(jQuery);
