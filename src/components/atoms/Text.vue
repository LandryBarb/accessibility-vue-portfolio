<script setup lang="ts">
import { computed } from 'vue'

type TextTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'li'
type TextVariant = 'body' | 'heading' | 'subheading' | 'caption' | 'meta'
type TextTone = 'default' | 'muted' | 'brand' | 'success' | 'warning' | 'danger'
type TextWeight = 'regular' | 'medium' | 'semibold'

const props = withDefaults(
  defineProps<{
    /** The HTML tag to render. Defaults based on variant if not provided. */
    as?: TextTag
    /** Semantic style preset. Sets default size/weight/leading. */
    variant?: TextVariant
    /** Color tone from the palette. */
    tone?: TextTone
    /** Explicit weight override. */
    weight?: TextWeight
    /** Truncate text with an ellipsis if it overflows. */
    truncate?: boolean
  }>(),
  {
    as: 'p',
    variant: 'body',
    tone: 'default',
    weight: undefined, // undefined lets the variant dictate the weight
    truncate: false
  }
)

const classes = computed(() => [
  'ui-text',
  `ui-text--variant-${props.variant}`,
  `ui-text--tone-${props.tone}`,
  props.weight ? `ui-text--weight-${props.weight}` : '',
  props.truncate ? 'ui-text--truncate' : ''
])
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-text {
  margin: 0;
  font-family: var(--font-family-base);
  /* Default color handling */
  color: var(--text-color, var(--color-text-primary));
  transition: color var(--motion-fast) var(--easing-standard);
}

/* --- Variants (Size + Leading + Default Weight) --- */

/* Body: Standard reading text */
.ui-text--variant-body {
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-regular);
}

/* Heading: Large, tight tracking (Use 'as="h2"' etc.) */
.ui-text--variant-heading {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.01em;
}

/* Subheading: Moderate size, usually for card titles */
.ui-text--variant-subheading {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-medium);
}

/* Caption: Small explanatory text */
.ui-text--variant-caption {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-regular);
}

/* Meta: Tiny, uppercase, tracked out (Labels, timestamps) */
.ui-text--variant-meta {
  font-size: var(--font-size-xs);
  line-height: 1;
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* --- Tones (Colors) --- */
.ui-text--tone-default { --text-color: var(--color-text-primary); }
.ui-text--tone-muted   { --text-color: var(--color-text-secondary); }
.ui-text--tone-brand   { --text-color: var(--color-accent-primary); }
.ui-text--tone-success { --text-color: var(--color-status-success); }
.ui-text--tone-warning { --text-color: var(--color-accent-warning); }
.ui-text--tone-danger  { --text-color: var(--color-accent-danger); }

/* --- Weight Overrides --- */
.ui-text--weight-regular  { font-weight: var(--font-weight-regular) !important; }
.ui-text--weight-medium   { font-weight: var(--font-weight-medium) !important; }
.ui-text--weight-semibold { font-weight: var(--font-weight-semibold) !important; }

/* --- Utilities --- */
.ui-text--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block; /* Truncation requires block/inline-block context */
  max-width: 100%;
}
</style>