<?php
/**
 * The template for displaying comments
 *
 * @package HPC_Blog
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">
    
    <?php if (have_comments()) : ?>
        <h2 class="comments-title">
            <?php
            $comment_count = get_comments_number();
            if ('1' === $comment_count) {
                printf(
                    esc_html__('1 comentário', 'hpc-blog')
                );
            } else {
                printf(
                    esc_html(_n('%1$s comentário', '%1$s comentários', $comment_count, 'hpc-blog')),
                    number_format_i18n($comment_count)
                );
            }
            ?>
        </h2>
        
        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 60,
                'callback'    => 'hpc_blog_comment_callback',
            ));
            ?>
        </ol>
        
        <?php
        the_comments_navigation();
        
        if (!comments_open()) :
            ?>
            <p class="no-comments">Os comentários estão fechados.</p>
        <?php
        endif;
        
    endif;
    
    comment_form(array(
        'title_reply'          => __('Deixe seu comentário', 'hpc-blog'),
        'title_reply_to'       => __('Responder para %s', 'hpc-blog'),
        'title_reply_before'   => '<h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'    => '</h3>',
        'comment_notes_before' => '<p class="comment-notes">Seu endereço de email não será publicado. Campos obrigatórios são marcados com *</p>',
        'comment_field'        => '<p class="comment-form-comment"><label for="comment">Comentário *</label><textarea id="comment" name="comment" cols="45" rows="8" required="required"></textarea></p>',
        'submit_button'        => '<button name="%1$s" type="submit" id="%2$s" class="%3$s">%4$s</button>',
        'submit_field'         => '<p class="form-submit">%1$s %2$s</p>',
        'label_submit'         => __('Publicar Comentário', 'hpc-blog'),
    ));
    ?>
    
</div>

<?php
/**
 * Custom comment callback function
 */
function hpc_blog_comment_callback($comment, $args, $depth) {
    ?>
    <li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
        <article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
            <footer class="comment-meta">
                <div class="comment-author vcard">
                    <?php echo get_avatar($comment, 60); ?>
                    <?php
                    printf(
                        '<b class="fn">%s</b>',
                        get_comment_author_link()
                    );
                    ?>
                </div>
                
                <div class="comment-metadata">
                    <a href="<?php echo esc_url(get_comment_link($comment, $args)); ?>">
                        <time datetime="<?php comment_time('c'); ?>">
                            <?php
                            printf(
                                esc_html__('%1$s às %2$s', 'hpc-blog'),
                                get_comment_date('', $comment),
                                get_comment_time()
                            );
                            ?>
                        </time>
                    </a>
                    <?php edit_comment_link(__('Editar', 'hpc-blog'), '<span class="edit-link">', '</span>'); ?>
                </div>
                
                <?php if ('0' == $comment->comment_approved) : ?>
                    <p class="comment-awaiting-moderation">Seu comentário está aguardando moderação.</p>
                <?php endif; ?>
            </footer>
            
            <div class="comment-content">
                <?php comment_text(); ?>
            </div>
            
            <?php
            comment_reply_link(array_merge($args, array(
                'add_below' => 'div-comment',
                'depth'     => $depth,
                'max_depth' => $args['max_depth'],
                'before'    => '<div class="reply">',
                'after'     => '</div>',
            )));
            ?>
        </article>
    <?php
}
