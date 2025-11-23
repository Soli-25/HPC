/**
 * HPC Atlanta Blog - Main JavaScript
 * 
 * @package HPC_Blog
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        
        /**
         * Smooth Scroll para links de âncora
         */
        $('a[href*="#"]').on('click', function(e) {
            if (this.pathname === window.location.pathname) {
                e.preventDefault();
                var target = $(this.hash);
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 800);
                }
            }
        });
        
        /**
         * Adicionar classe ao header no scroll
         */
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.site-header').addClass('scrolled');
            } else {
                $('.site-header').removeClass('scrolled');
            }
        });
        
        /**
         * Back to top button
         */
        var backToTop = $('<button class="back-to-top" aria-label="Voltar ao topo"><i class="fas fa-chevron-up"></i></button>');
        $('body').append(backToTop);
        
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                backToTop.addClass('show');
            } else {
                backToTop.removeClass('show');
            }
        });
        
        backToTop.on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });
        
        /**
         * Adicionar animação de fade-in nos posts
         */
        if ($('.post').length) {
            $('.post').each(function(index) {
                $(this).css('opacity', '0');
                setTimeout(() => {
                    $(this).animate({ opacity: 1 }, 600);
                }, index * 100);
            });
        }
        
        /**
         * Melhorar responsividade de tabelas
         */
        $('.entry-content table').wrap('<div class="table-responsive"></div>');
        
        /**
         * Adicionar classe aos links externos
         */
        $('.entry-content a[href^="http"]').not('[href*="' + window.location.hostname + '"]').attr({
            target: '_blank',
            rel: 'noopener noreferrer'
        }).addClass('external-link');
        
        /**
         * Lazy loading de imagens (se não estiver usando plugin)
         */
        if ('loading' in HTMLImageElement.prototype) {
            $('.post-thumbnail img').each(function() {
                if (!$(this).attr('loading')) {
                    $(this).attr('loading', 'lazy');
                }
            });
        }
        
        /**
         * Copiar link do post
         */
        if ($('.single-post').length) {
            var copyButton = $('<button class="copy-link-btn" title="Copiar link"><i class="fas fa-link"></i> Copiar Link</button>');
            $('.entry-footer').prepend(copyButton);
            
            copyButton.on('click', function() {
                var url = window.location.href;
                navigator.clipboard.writeText(url).then(function() {
                    copyButton.html('<i class="fas fa-check"></i> Link Copiado!');
                    setTimeout(function() {
                        copyButton.html('<i class="fas fa-link"></i> Copiar Link');
                    }, 2000);
                });
            });
        }
        
        /**
         * Print button
         */
        if ($('.single-post').length) {
            var printButton = $('<button class="print-btn" title="Imprimir" onclick="window.print()"><i class="fas fa-print"></i> Imprimir</button>');
            $('.entry-footer').prepend(printButton);
        }
        
    });
    
})(jQuery);

/**
 * CSS adicional injetado via JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    var style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #1a1a1a;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: #4a4a4a;
            transform: translateY(-4px);
        }
        
        .table-responsive {
            overflow-x: auto;
            margin: 1.5rem 0;
        }
        
        .external-link::after {
            content: " \\f35d";
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            font-size: 0.75em;
            margin-left: 0.25rem;
            opacity: 0.5;
        }
        
        .copy-link-btn,
        .print-btn {
            background: #f5f5f5;
            border: 1px solid #e5e5e5;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .copy-link-btn:hover,
        .print-btn:hover {
            background: #1a1a1a;
            color: white;
            border-color: #1a1a1a;
        }
        
        .site-header.scrolled {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .share-facebook:hover {
            background: #145dbf !important;
        }
        
        .share-twitter:hover {
            background: #1a8cd8 !important;
        }
        
        .share-whatsapp:hover {
            background: #1eb854 !important;
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
});
