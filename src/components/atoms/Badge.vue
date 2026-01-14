<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

// Stagecraft definitions
type BadgeVariant = 'solid' | 'subtle' | 'outline'
type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    /** Text content of the badge */
    label: string
    /** Visual style variant */
    variant?: BadgeVariant
    /** Semantic color tone */
    tone?: BadgeTone
    /** Size step */
    size?: BadgeSize
    /** Optional icon component to render before text */
    icon?: Component
  }>(),
  {
    variant: 'subtle',
    tone: 'neutral',
    size: 'md',
    icon: undefined
  }
)

const classes = computed(() => [
  'ui-badge',
  `ui-badge--${props.variant}`,
  `ui-badge--${props.tone}`,
  `ui-badge--${props.size}`
])
</script>

<template>
  <span :class="classes">
    <component 
      v-if="icon" 
      :is="icon" 
      class="ui-badge__icon" 
      aria-hidden="true" 
    />
    
    <span class="ui-badge__label">{{ label }}</span>
  </span>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-badge {
  /* Default token mapping (neutral/subtle) */
  --badge-bg: var(--color-cable-steel-800);
  --badge-fg: var(--color-text-secondary);
  --badge-border: transparent;
  
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.02em;
  line-height: 1;
  white-space: nowrap;
  
  border-radius: var(--radius-sm);
  background-color: var(--badge-bg);
  color: var(--badge-fg);
  border: 1px solid var(--badge-border);
  
  user-select: none;
}

/* --- Sizes --- */
.ui-badge--sm {
  font-size: 0.7rem; /* ~11px */
  padding: 0.125rem 0.375rem;
  height: 1.25rem;
}

.ui-badge--md {
  font-size: var(--font-size-xs); /* 12px */
  padding: 0.25rem 0.5rem;
  height: 1.5rem;
}

/* --- Tones & Variants --- */

/* Neutral (Default) */
.ui-badge--neutral {
  &.ui-badge--solid {
    --badge-bg: var(--color-cable-steel-500);
    --badge-fg: var(--color-text-primary);
  }
  &.ui-badge--subtle {
    --badge-bg: rgba(255, 255, 255, 0.1);
    --badge-fg: var(--color-text-secondary);
  }
  &.ui-badge--outline {
    --badge-bg: transparent;
    --badge-fg: var(--color-text-secondary);
    --badge-border: var(--color-border-subtle);
  }
}

/* Brand */
.ui-badge--brand {
  &.ui-badge--solid {
    --badge-bg: var(--color-accent-primary);
    --badge-fg: var(--color-text-primary);
  }
  &.ui-badge--subtle {
    --badge-bg: rgba(66, 165, 245, 0.15); /* Spotlight Blue alpha */
    --badge-fg: var(--color-spotlight-blue-400);
  }
  &.ui-badge--outline {
    --badge-bg: transparent;
    --badge-fg: var(--color-spotlight-blue-400);
    --badge-border: var(--color-spotlight-blue-500);
  }
}

/* Success */
.ui-badge--success {
  &.ui-badge--solid {
    --badge-bg: var(--color-accent-success);
    --badge-fg: #000; /* Contrast Check */
  }
  &.ui-badge--subtle {
    --badge-bg: rgba(139, 195, 74, 0.15); /* Laser Green alpha */
    --badge-fg: var(--color-laser-green-400);
  }
  &.ui-badge--outline {
    --badge-bg: transparent;
    --badge-fg: var(--color-laser-green-400);
    --badge-border: var(--color-laser-green-500);
  }
}

/* Warning */
.ui-badge--warning {
  &.ui-badge--solid {
    --badge-bg: var(--color-accent-warning);
    --badge-fg: #000;
  }
  &.ui-badge--subtle {
    --badge-bg: rgba(255, 183, 77, 0.15); /* Scene Amber alpha */
    --badge-fg: var(--color-scene-amber-500);
  }
  &.ui-badge--outline {
    --badge-bg: transparent;
    --badge-fg: var(--color-scene-amber-500);
    --badge-border: var(--color-scene-amber-500);
  }
}

/* Danger */
.ui-badge--danger {
  &.ui-badge--solid {
    --badge-bg: var(--color-accent-danger);
    --badge-fg: var(--color-text-primary);
  }
  &.ui-badge--subtle {
    --badge-bg: rgba(239, 83, 80, 0.15); /* Caution Red alpha */
    --badge-fg: var(--color-caution-red-400);
  }
  &.ui-badge--outline {
    --badge-bg: transparent;
    --badge-fg: var(--color-caution-red-400);
    --badge-border: var(--color-caution-red-500);
  }
}

/* --- Child Elements --- */
.ui-badge__icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  opacity: 0.9;
}

.ui-badge__label {
  transform: translateY(0.5px); /* Optical alignment */
}
</style>