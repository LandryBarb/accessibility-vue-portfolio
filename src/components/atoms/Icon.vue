<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

type IconSize = 'xs' | 'sm' | 'md' | 'lg'
type IconTone = 'default' | 'muted' | 'danger' | 'success' | 'info'

const props = withDefaults(
  defineProps<{
    as: Component | string
    size?: IconSize
    tone?: IconTone
    decorative?: boolean
    label?: string
    title?: string
    class?: string
  }>(),
  {
    size: 'md',
    tone: 'default',
    decorative: true
  }
)

/**
 * Accessible behavior:
 * - decorative === true → aria-hidden="true", no role/label
 * - decorative === false → role="img" + aria-label from label prop
 */
const isDecorative = computed(() => props.decorative)
const computedRole = computed(() =>
  isDecorative.value ? undefined : ('img' as const)
)
const computedAriaHidden = computed(() =>
  isDecorative.value ? 'true' : undefined
)
const computedAriaLabel = computed(() =>
  !isDecorative.value ? props.label : undefined
)

const classes = computed(() => [
  'ui-icon',
  `ui-icon--size-${props.size}`,
  `ui-icon--tone-${props.tone}`,
  props.class
])
</script>

<template>
  <!--
    We intentionally wrap the icon component so we can:
    - Apply Stagecraft sizing & color tokens
    - Attach ARIA semantics consistently
  -->
  <span
    :class="classes"
    :role="computedRole"
    :aria-hidden="computedAriaHidden"
    :aria-label="computedAriaLabel"
  >
    <!--
      We still render the underlying icon component.
      It may be an SVG (lucide-vue-next) or any other icon provider.
    -->
    <component :is="as" class="ui-icon__glyph" aria-hidden="true">
      <!-- Optional SVG title when the icon carries meaning -->
      <template v-if="title">
        <title>{{ title }}</title>
      </template>
    </component>
  </span>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

/**
 * Stagecraft Icon Atom
 *
 * - Uses token-derived values only
 * - Color is controlled via tone modifiers
 * - Size is controlled via font-size to keep 1em-based SVGs in sync
 */
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Default color follows currentColor but can be overridden via tone */
  color: var(--icon-color, currentColor);

  /* Ensure click/tap area can grow with surrounding controls */
  line-height: 1;
}

/* Glyph itself is square and scales with font-size */
.ui-icon__glyph {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}

/* Size modifiers map to Stagecraft typography tokens */
.ui-icon--size-xs {
  font-size: var(--font-size-xs);
}

.ui-icon--size-sm {
  font-size: var(--font-size-sm);
}

.ui-icon--size-md {
  font-size: var(--font-size-md);
}

.ui-icon--size-lg {
  font-size: var(--font-size-lg);
}

/* Tone modifiers – all token-derived */
.ui-icon--tone-default {
  --icon-color: var(--color-text-primary);
}

.ui-icon--tone-muted {
  --icon-color: var(--color-text-secondary);
}

.ui-icon--tone-danger {
  --icon-color: var(--color-accent-danger);
}

.ui-icon--tone-success {
  --icon-color: var(--color-status-success);
}

.ui-icon--tone-info {
  --icon-color: var(--color-accent-primary);
}
</style>
