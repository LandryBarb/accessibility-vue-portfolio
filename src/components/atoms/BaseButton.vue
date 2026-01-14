<script setup lang="ts">
import { computed } from 'vue'

// Stagecraft Definitions
type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Visual hierarchy variant. */
    variant?: Variant
    /** Size step affecting padding and font-size. */
    size?: Size
    /** Prevent interaction and apply disabled visual state. */
    disabled?: boolean
    /** Replaces content with a spinner and disables interaction. */
    loading?: boolean
    /** Native button type attribute. */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button'
  }
)

// Compute accessibility state
const isDisabled = computed(() => props.disabled || props.loading)

// BEM Class Construction
const classes = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  `ui-button--${props.size}`,
  props.loading ? 'ui-button--loading' : ''
])
</script>

<template>
  <button
    :type="props.type"
    :disabled="isDisabled"
    :class="classes"
    :aria-busy="props.loading || undefined"
    :aria-disabled="isDisabled || undefined"
  >
    <span v-if="props.loading" class="ui-button__spinner" aria-hidden="true" />

    <span class="ui-button__content">
      <slot>Submit Request</slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-button {
  /* Default token mapping */
  --btn-bg: var(--color-bg-surface);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-border-subtle);
  
  /* Interactive token mapping defaults */
  --btn-bg-hover: var(--color-bg-elevated);
  --btn-border-hover: var(--color-border-strong);
  --btn-bg-active: var(--color-bg-root);
  --btn-border-active: var(--color-border-strong);

  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--tap-target-min); /* 44px minimum */
  
  /* Typography */
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  white-space: nowrap;

  /* Shape */
  border-radius: var(--radius-md);
  border: 1px solid var(--btn-border);
  background-color: var(--btn-bg);
  color: var(--btn-fg);

  /* Interaction */
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  /* Motion */
  transition:
    background-color var(--motion-base) var(--easing-standard),
    border-color var(--motion-base) var(--easing-standard),
    color var(--motion-base) var(--easing-standard),
    transform var(--motion-fast) var(--easing-standard);

  /* --- States --- */

  &:hover:not(:disabled) {
    background-color: var(--btn-bg-hover);
    border-color: var(--btn-border-hover);
  }

  &:active:not(:disabled) {
    background-color: var(--btn-bg-active);
    border-color: var(--btn-border-active);
    transform: translateY(var(--space-1));
  }

  /* Focus: High Visibility Ring */
  &:focus-visible:not(:disabled) {
    outline: none;
    border-color: var(--color-border-strong);
    box-shadow: 0 0 0 4px var(--color-focus-ring);
  }

  /* Disabled */
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-bg-surface);
    color: var(--color-text-muted);
    border-color: var(--color-border-subtle);
    opacity: 0.7;
  }

  /* Reduced Motion Override */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:active:not(:disabled) { transform: none; }
  }
}

/* --- Variants --- */

.ui-button--primary {
  --btn-bg: var(--color-accent-primary);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-accent-primary);
  --btn-bg-hover: var(--color-accent-primary-hover);
  --btn-bg-active: var(--color-accent-primary-active);
}

.ui-button--secondary {
  --btn-bg: var(--color-bg-surface);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-border-strong);
}

.ui-button--tertiary {
  --btn-bg: transparent;
  --btn-fg: var(--color-text-secondary);
  --btn-border: transparent;
}

.ui-button--destructive {
  --btn-bg: var(--color-accent-danger);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-accent-danger);
  --btn-bg-hover: var(--color-caution-red-600);
  --btn-bg-active: var(--color-caution-red-700);
}

/* --- Sizes --- */

.ui-button--sm {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-3);
}

.ui-button--md {
  font-size: var(--font-size-md);
  padding: var(--space-3) var(--space-4);
}

.ui-button--lg {
  font-size: var(--font-size-md);
  padding: var(--space-4) var(--space-5);
}

/* --- Internals --- */

.ui-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.ui-button__spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
  margin-right: var(--space-2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ui-button--loading {
  cursor: not-allowed;
}
</style>