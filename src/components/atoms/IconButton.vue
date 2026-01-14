<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

// Stagecraft variant and size definitions
type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Vue component for the icon (required) */
    icon?: Component
    /** Visual variant; aligns with Stagecraft palette */
    variant?: Variant
    /** Size of the control; affects min dimensions and font */
    size?: Size
    /** Disable the button and prevent interaction */
    disabled?: boolean
    /** Show a spinner in place of the icon */
    loading?: boolean
    /** * Accessible name for screen readers. 
     * MANDATORY for icon-only buttons.
     */
    label: string
    /** * Optional pressed state for toggle buttons (e.g. Play/Pause). 
     * Renders `aria-pressed`.
     */
    pressed?: boolean | undefined
    /** Native button type */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    loading: false,
    pressed: undefined,
    type: 'button'
  }
)

const isDisabled = computed(() => props.disabled || props.loading)

// Compose a list of CSS classes based on props
const classes = computed(() => [
  'ui-icon-btn',
  `ui-icon-btn--${props.variant}`,
  `ui-icon-btn--${props.size}`,
  props.loading ? 'ui-icon-btn--loading' : ''
])
</script>

<template>
  <button
    :type="props.type"
    :class="classes"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="props.loading || undefined"
    :aria-label="props.label"
    :aria-pressed="props.pressed"
    :title="props.label" 
  >
    <span v-if="props.loading" class="ui-icon-btn__spinner" aria-hidden="true" />

    <component
      v-else-if="props.icon"
      :is="props.icon"
      class="ui-icon-btn__icon"
      aria-hidden="true"
    />
    
    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Enforce Square Aspect Ratio for Touch Targets */
  aspect-ratio: 1 / 1;
  padding: 0; 
  
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  /* Transitions */
  transition:
    background-color var(--motion-base) var(--easing-standard),
    border-color var(--motion-base) var(--easing-standard),
    color var(--motion-base) var(--easing-standard),
    transform var(--motion-fast) var(--easing-standard);

  /* --- Variants --- */
  
  /* Primary: High visibility actions */
  &--primary {
    background-color: var(--color-accent-primary);
    color: var(--color-text-primary);
    border-color: var(--color-accent-primary);

    &:hover:not(:disabled) {
      background-color: var(--color-accent-primary-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--color-accent-primary-active);
    }
  }

  /* Secondary: Default interface actions (Surface) */
  &--secondary {
    background-color: var(--color-bg-elevated);
    color: var(--color-text-primary);
    border-color: var(--color-border-subtle);

    &:hover:not(:disabled) {
      border-color: var(--color-border-strong);
      background-color: var(--color-stage-black-700);
    }
  }

  /* Ghost: Transparent until hovered (Media controls) */
  &--ghost {
    background-color: transparent;
    color: var(--color-text-secondary);
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--color-text-primary);
    }
  }

  /* Toggle State (Active) */
  &[aria-pressed="true"] {
    background-color: var(--color-accent-primary);
    color: var(--color-text-primary);
    border-color: var(--color-accent-primary);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  }

  /* --- Sizes --- */
  &--sm {
    min-width: 2rem; /* 32px */
    font-size: var(--font-size-sm);
  }

  &--md {
    min-width: 2.75rem; /* 44px - WCAG AA Touch Target */
    font-size: var(--font-size-md);
  }

  &--lg {
    min-width: 3.5rem; /* 56px */
    font-size: var(--font-size-lg);
  }

  /* --- State Modifiers --- */
  &:focus-visible:not(:disabled) {
    outline: none;
    border-color: var(--color-focus-ring);
    box-shadow: 0 0 0 4px rgba(66, 165, 245, 0.2); /* Matching focus ring token */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(1);
  }
}

.ui-icon-btn__icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
}

.ui-icon-btn__spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>