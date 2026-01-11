<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'


/**
 * Stagecraft Icon Button
 *
 * This component renders an icon-only or icon+label button using Stagecraft
 * design tokens for styling. It exposes a typed props API for variants,
 * sizes, disabled/loading states, optional pressed state for toggle buttons,
 * and accessible labelling via `label` (visible) or `srLabel` (screen reader only).
 *
 * The accessible name is computed as follows:
 *  - When `loading` is true, the button’s aria-label is “Loading”.
 *  - If a visible `label` is provided, the button’s name comes from the visible
 *    text, so `aria-label` is omitted to let assistive tech derive it.
 *  - Otherwise, the name falls back to `srLabel` or a generic “Button”.
 *
 * A `title` attribute mirrors the computed accessible name when no visible label
 * exists. Browsers display this as a tooltip on hover and focus, ensuring parity
 * between mouse and keyboard users.
 *
 * The internal classes map to Stagecraft CSS variables. Variants and sizes
 * correspond to the Stagecraft semantic palette (primary, secondary, tertiary,
 * destructive) and size scale (sm, md, lg).
 */

// Stagecraft variant and size definitions
type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Vue component for the icon (required for icon-only button) */
    icon?: Component
    /** Visual variant; aligns with Stagecraft palette */
    variant?: Variant
    /** Size of the control; affects min dimensions and font */
    size?: Size
    /** Disable the button and prevent interaction */
    disabled?: boolean
    /** Show a spinner in place of the icon/label */
    loading?: boolean
    /** Visible text label; when provided the icon button becomes icon + label */
    label?: string
    /** Screen-reader only label; used when there is no visible label */
    srLabel?: string
    /**
     * Optional pressed state for toggle buttons. When defined,
     * the button has a corresponding aria-pressed attribute.
     */
    pressed?: boolean | undefined
    /** Native button type */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'destructive',
    size: 'md',
    disabled: false,
    loading: false,
    label: '',
    srLabel: '',
    pressed: undefined,
    type: 'button'
  }
)

// Computed boolean representing if the control should be disabled
const isDisabled = computed(() => props.disabled || props.loading)

// Determine the accessible name and tooltip/title content
const accessibleName = computed((): string | undefined => {
  if (props.loading) {
    return 'Loading'
  }
  // When there is a visible label, let the text content provide the accessible name
  if (props.label) {
    return undefined
  }
  // Otherwise fall back to screen reader label or a generic name
  return props.srLabel || 'Button'
})

// Compose a list of CSS classes based on props
const classes = computed(() => {
  return [
    'ui-icon-button',
    `ui-icon-button--${props.variant}`,
    `ui-icon-button--${props.size}`,
    props.loading ? 'ui-icon-button--loading' : '',
    props.label ? 'ui-icon-button--with-label' : ''
  ]
})
</script>

<template>
  <button

    :type="props.type"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="props.loading || undefined"
    :aria-label="accessibleName"
    :aria-pressed="props.pressed"
    :class="classes"
    :title="accessibleName"
  >
    <!-- Loading spinner shown when loading -->
    <span v-if="props.loading" class="ui-icon-button__spinner" aria-hidden="true" />

    <!-- Normal content when not loading -->
    <template v-else>
      <!-- Icon component if provided -->
      <component
        v-if="props.icon"
        :is="props.icon"
        class="ui-icon-button__icon"
        aria-hidden="true"
      />

      <!-- Visible label if supplied -->
      <span v-if="props.label" class="ui-icon-button__label">{{ props.label }}</span>

      <!-- Slot content fallback -->
      <slot v-else-if="$slots.default" />

      <!-- Screen-reader only fallback label -->
      <span v-else class="sr-only">{{ props.srLabel || 'Button' }}</span>
    </template>
  </button>
</template>

<style scoped lang="scss">
/* Import Stagecraft tokens; adjust the path based on your project structure */
@use "../../styles/stagecraft/tokens.scope.css" as *;

/**
 * Base styling for the icon button. The component is square by default
 * (min-width equals min-height) to meet touch target guidelines. CSS variables
 * (--btn-bg, --btn-fg, etc.) are assigned by variant modifiers.
 */
.ui-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  /* Square touch target */
  min-height: var(--tap-target-min);
  min-width: var(--tap-target-min);

  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);

  border-radius: var(--radius-md);
  border: 1px solid var(--btn-border, var(--color-border-subtle));
  background-color: var(--btn-bg, var(--color-bg-surface));
  color: var(--btn-fg, var(--color-text-primary));

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  transition:
    background-color var(--motion-base) var(--easing-standard),
    border-color var(--motion-base) var(--easing-standard),
    color var(--motion-base) var(--easing-standard),
    transform var(--motion-fast) var(--easing-standard);

  /* Hover and active states */
  &:hover:not(:disabled) {
    background-color: var(--btn-bg-hover, var(--color-bg-elevated));
    border-color: var(--btn-border-hover, var(--color-border-strong));
  }

  &:active:not(:disabled) {
    background-color: var(--btn-bg-active, var(--color-bg-root));
    border-color: var(--btn-border-active, var(--color-border-strong));
    transform: translateY(var(--space-1));
  }

  /* Focus: rely on global outline; reinforce with subtle color change */
  &:focus-visible:not(:disabled) {
    border-color: var(--color-border-strong);
    background-color: var(--btn-bg-hover, var(--color-bg-elevated));
  }

  /* Disabled state */
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-bg-surface);
    color: var(--color-text-muted);
    border-color: var(--color-border-subtle);
  }

  /* Reduced motion: remove transforms/animations */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active:not(:disabled) {
      transform: none;
    }
  }
}

/* Variant modifiers assign token-derived variables only */
.ui-icon-button--primary {
  --btn-bg: var(--color-accent-primary);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-accent-primary);
  --btn-bg-hover: var(--color-accent-primary-hover);
  --btn-bg-active: var(--color-accent-primary-active);
}

.ui-icon-button--secondary {
  --btn-bg: var(--color-bg-surface);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-border-strong);
}

.ui-icon-button--tertiary {
  --btn-bg: transparent;
  --btn-fg: var(--color-text-secondary);
  --btn-border: transparent;
}

.ui-icon-button--destructive {
  --btn-bg: var(--color-accent-danger);
  --btn-fg: var(--color-text-primary);
  --btn-border: var(--color-accent-danger);
  --btn-bg-hover: var(--color-caution-red-600);
  --btn-bg-active: var(--color-caution-red-700);
}

/* Size modifiers adjust font-size; min dimensions remain square */
.ui-icon-button--sm {
  font-size: var(--font-size-sm);
}

.ui-icon-button--md {
  font-size: var(--font-size-md);
}

.ui-icon-button--lg {
  font-size: var(--font-size-md);
  /* Optionally enlarge icon on large buttons via font size */
}

/* Additional padding when a visible label is present */
.ui-icon-button--with-label.ui-icon-button--sm {
  padding-inline: var(--space-3);
}
.ui-icon-button--with-label.ui-icon-button--md {
  padding-inline: var(--space-4);
}
.ui-icon-button--with-label.ui-icon-button--lg {
  padding-inline: var(--space-5);
}

/* Icon styling */
.ui-icon-button__icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
}

/* Label styling */
.ui-icon-button__label {
  line-height: 1.2;
}

/* Spinner for loading state */
.ui-icon-button__spinner {
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

/* Loading state: change cursor */
.ui-icon-button--loading {
  cursor: not-allowed;
}
</style>