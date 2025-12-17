<script setup lang="ts">
import { computed } from 'vue';

// Types are good documentation for the code snippet view
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(defineProps<{
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button'
});

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  props.disabled ? 'btn--disabled' : '',
  props.loading ? 'btn--loading' : ''
]);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
  >
    <span v-if="loading" class="spinner" aria-hidden="true"></span>
    <span><slot>Click Me</slot></span>
  </button>
</template>

<style lang="scss" scoped>
/* Using SCSS for consistency with your portfolio */

.btn {
  font-weight: 700;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s var(--ease-cinematic);
  border: 2px solid transparent; /* Reserve space for border */
}

/* Sizing Tokens */
.btn--sm { padding: 0.5rem 0.8rem; font-size: 0.8rem; }
.btn--md { padding: 0.75rem 1.5rem; font-size: 1rem; }
.btn--lg { padding: 1rem 2rem; font-size: 1.125rem; }

/* Focus-visible AAA requirement ( Inherits from your global reset, but we enforce it here ) */
.btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--brand-primary);
}

/* Variant: Primary */
.btn--primary {
  background: var(--brand-primary); 
  color: #fff;
  
  &:hover { background: var(--brand-primary-hover); }
}

/* Variant: Ghost (Transparent) */
.btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  
  &:hover { background: rgba(255,255,255,0.1); color: white; }
}

/* Disabled State */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading Spinner */
.spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>