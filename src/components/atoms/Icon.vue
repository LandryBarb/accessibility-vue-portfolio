<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

// Stagecraft Tokens
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type IconTone = 'default' | 'muted' | 'danger' | 'success' | 'warning' | 'info' | 'brand'

const props = withDefaults(
  defineProps<{
    /** The SVG component to render (e.g. Lucide icon) */
    as: Component | string
    /** Size step from design system */
    size?: IconSize
    /** Semantic color tone */
    tone?: IconTone
    /** * If true, the icon is purely visual (aria-hidden). 
     * If false, it acts as an image and requires a label.
     */
    decorative?: boolean
    /** Accessible name (required if decorative is false) */
    label?: string
    /** Optional tooltip title for mouse users */
    title?: string
  }>(),
  {
    size: 'md',
    tone: 'default',
    decorative: true,
    label: undefined,
    title: undefined
  }
)

/* --- Accessibility Logic --- */
// Enforce: Non-decorative icons MUST have a role and a label
const isSemantic = computed(() => !props.decorative)

const computedRole = computed(() => (isSemantic.value ? 'img' : undefined))
const computedAriaHidden = computed(() => (props.decorative ? 'true' : undefined))
const computedAriaLabel = computed(() => 
  isSemantic.value ? props.label : undefined
)

/* --- Styling Logic --- */
const classes = computed(() => [
  'ui-icon',
  `ui-icon--size-${props.size}`,
  `ui-icon--tone-${props.tone}`
])
</script>

<template>
  <span
    :class="classes"
    :role="computedRole"
    :aria-hidden="computedAriaHidden"
    :aria-label="computedAriaLabel"
  >
    <component 
      :is="as" 
      class="ui-icon__glyph" 
      aria-hidden="true" 
      focusable="false" 
    />
    
    <title v-if="title">{{ title }}</title>
  </span>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
  
  /* Color defaults to currentColor but can be overridden by tone */
  color: var(--icon-color, currentColor);
  
  /* Transition for hover effects if parent changes color */
  transition: color var(--motion-fast) var(--easing-standard);
}

.ui-icon__glyph {
  width: 1em;
  height: 1em;
  fill: none; /* Lucide/Outline style */
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* --- Sizes (Map to Typography Scale) --- */
.ui-icon--size-xs { font-size: var(--font-size-xs); } /* 12px */
.ui-icon--size-sm { font-size: var(--font-size-sm); } /* 14px */
.ui-icon--size-md { font-size: var(--font-size-md); } /* 16px */
.ui-icon--size-lg { font-size: var(--font-size-lg); } /* 20px */
.ui-icon--size-xl { font-size: var(--font-size-xl); } /* 24px */

/* --- Tones (Map to Color Palette) --- */
.ui-icon--tone-default { --icon-color: var(--color-text-primary); }
.ui-icon--tone-muted   { --icon-color: var(--color-text-muted); }
.ui-icon--tone-brand   { --icon-color: var(--color-accent-primary); }
.ui-icon--tone-success { --icon-color: var(--color-status-success); }
.ui-icon--tone-warning { --icon-color: var(--color-status-warning); }
.ui-icon--tone-danger  { --icon-color: var(--color-status-error); }
.ui-icon--tone-info    { --icon-color: var(--color-status-info); }
</style>