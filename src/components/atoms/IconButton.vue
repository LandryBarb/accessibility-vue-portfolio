<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

// Stagecraft definitions
type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Icon component (e.g. Lucide) */
    icon?: Component
    /** Visual style variant */
    variant?: Variant
    /** Size step (md = 44px min) */
    size?: Size
    /** Disable interaction */
    disabled?: boolean
    /** Loading state */
    loading?: boolean
    /** Accessible name (Required) */
    label: string
    /** Toggle state (renders aria-pressed) */
    pressed?: boolean | undefined
    /** Button type */
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

const classes = computed(() => [
  'ui-icon-button',
  `ui-icon-button--${props.variant}`,
  `ui-icon-button--${props.size}`,
  props.loading ? 'ui-icon-button--loading' : ''
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
    <span v-if="props.loading" class="ui-icon-button__spinner" aria-hidden="true" />

    <component
      v-else-if="props.icon"
      :is="props.icon"
      class="ui-icon-button__icon"
      aria-hidden="true"
      focusable="false"
    />
    
    <slot v-else />
  </button>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-icon-button {
  /* Base Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1; /* Enforce Square */
  padding: 0; 
  
  /* Typography & Shape */
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

  /* --- Variants (Mapped to Tokens) --- */
  
  /* Primary */
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

  /* Secondary (Default Surface) */
  &--secondary {
    background-color: var(--color-bg-elevated);
    color: var(--color-text-primary);
    border-color: var(--color-border-subtle);

    &:hover:not(:disabled) {
      border-color: var(--color-border-strong);
      background-color: var(--color-stage-black-700);
    }
  }

  /* Tertiary (Ghost) */
  &--tertiary {
    background-color: transparent;
    color: var(--color-text-secondary);
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--color-text-primary);
    }
  }

  /* Destructive */
  &--destructive {
    background-color: rgba(239, 68, 68, 0.1);
    color: var(--color-accent-danger);
    border-color: transparent;

    &:hover:not(:disabled) {
      background-color: rgba(239, 68, 68, 0.2);
      border-color: var(--color-accent-danger);
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
    min-width: 2.75rem; /* 44px */
    font-size: var(--font-size-md);
  }

  &--lg {
    min-width: 3.5rem; /* 56px */
    font-size: var(--font-size-lg);
  }

  /* --- States --- */
  &:focus-visible:not(:disabled) {
    outline: 2px solid var(--color-focus-ring);
    border-color: var(--color-focus-ring);
    box-shadow: 0 0 0 4px rgba(66, 165, 245, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(1);
  }
}

.ui-icon-button__icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
  /* Lucide defaults */
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ui-icon-button__spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>