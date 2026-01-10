<script setup lang="ts">
import { computed } from 'vue'

// Stagecraft variant and size types
type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button'
})

// Apply classes for Stagecraft styling
const classes = computed(() => [
  'ui-button',
  `ui-button--${props.variant}`,
  `ui-button--${props.size}`,
  props.loading ? 'ui-button--loading' : ''
])

// Native disabled when disabled or loading
const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <!-- Native button with no internal .ds-stagecraft wrapper -->
  <button
    :type="type"
    :disabled="isDisabled"
    :class="classes"
    :aria-busy="props.loading || undefined"
  >
    <!-- Optional spinner for loading state. aria-hidden so SRs ignore it -->
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />

    <!-- Content slot: always visible; becomes the accessible name -->
    <span class="ui-button__content">
      <slot>Submit Request</slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
/* import mixins/functions without emitting CSS */
@use "../../styles/stagecraft/tokens.scope.css" as *;

/* Base Stagecraft button styling */
.ui-button {
  /* Default component variables; will be overridden by variants */
  --btn-bg: var(--color-bg-surface);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-border-subtle);
  --btn-bg-hover: var(--color-bg-elevated);
  --btn-border-hover: var(--color-border-strong);
  --btn-bg-active: var(--color-bg-root);
  --btn-border-active: var(--color-border-strong);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  min-height: var(--tap-target-min);
  padding: var(--space-3) var(--space-4);

  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);

  border-radius: var(--radius-md);
  border: 1px solid var(--btn-border);
  background-color: var(--btn-bg);
  color: var(--btn-fg);

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  transition:
    background-color var(--motion-base) var(--easing-standard),
    border-color var(--motion-base) var(--easing-standard),
    color var(--motion-base) var(--easing-standard),
    transform var(--motion-fast) var(--easing-standard);

  /* Hover & active states */
  &:hover:not(:disabled) {
    background-color: var(--btn-bg-hover);
    border-color: var(--btn-border-hover);
  }

  &:active:not(:disabled) {
    background-color: var(--btn-bg-active);
    border-color: var(--btn-border-active);
    transform: translateY(var(--space-1));
  }

  /* Focus: rely on global outline; just reinforce with a subtle color shift */
  &:focus-visible:not(:disabled) {
    border-color: var(--color-border-strong);
    background-color: var(--btn-bg-hover);
  }

  /* Disabled */
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-bg-surface);
    color: var(--color-text-muted);
    border-color: var(--color-border-subtle);
  }

  /* Reduced motion: disable transforms/animations */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active:not(:disabled) {
      transform: none;
    }
  }
}

/* Variant definitions: assign local variables only */
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

/* Size modifiers: adjust font-size and padding */
.ui-button--sm {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-3);
}

.ui-button--md {
  font-size: var(--font-size-md);
}

.ui-button--lg {
  font-size: var(--font-size-md);
  padding: var(--space-4) var(--space-5);
}

/* Content wrapper: maintain spacing for icon + text */
.ui-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

/* Optional spinner styles */
.ui-button__spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
  margin-right: var(--space-1);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Loading state: show not-allowed cursor on entire button */
.ui-button--loading {
  cursor: not-allowed;
}
</style>
