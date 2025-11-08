<?php
/**
 * Template do Formulário de Busca
 * 
 * @package HPC_Atlanta
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <label for="search-input">
        <span class="screen-reader-text"><?php _e('Buscar por:', 'hpc-atlanta'); ?></span>
    </label>
    <div class="search-form-wrapper" style="display: flex; gap: 0.5rem; max-width: 500px; margin: 0 auto;">
        <input 
            type="search" 
            id="search-input"
            class="search-field" 
            placeholder="<?php echo esc_attr_x('Digite sua busca...', 'placeholder', 'hpc-atlanta'); ?>" 
            value="<?php echo get_search_query(); ?>" 
            name="s"
            style="flex: 1; padding: 1rem; border: 2px solid var(--color-border); border-radius: 0.5rem; font-size: 1rem;"
        />
        <button 
            type="submit" 
            class="search-submit btn"
            style="padding: 1rem 2rem;"
        >
            <i class="fas fa-search"></i> <?php echo esc_attr_x('Buscar', 'submit button', 'hpc-atlanta'); ?>
        </button>
    </div>
</form>
