<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';

// Expanded variants to match common UI needs
type Variant = 'primary' | 'secondary' | 'success' | 'accent' | 'danger' | 'warning' | 'info' | 'outline';
type Size = 'small' | 'medium' | 'large';

const props = withDefaults(defineProps<{
  variant?: Variant;
  size?: Size;
  label: string;
  icon?: Component; // Better typing for Vue components
  pill?: boolean;
}>(), {
  variant: 'primary',
  size: 'small',
  icon: undefined,
  pill: false
});

const classes = computed(() =>[
  'badge',
  `badge--${props.variant}`,
  `badge--${props.size}`,
  props.pill ? 'badge--pill' : ''
]);
</script>

<template>
  <span :class="classes">
    <component 
      v-if="icon"
      :is="icon"
      class="badge__icon"
      aria-hidden="true"
    />
    <span class="badge__label">{{ label }}</span>
  </span>
</template>

<style scoped>
/* --- Base Styles --- */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35em; /* Use em so gap scales with font-size */
  font-family: var(--font-sans, sans-serif);
  font-weight: 700;
  border-radius: 4px;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent; /* Preps for outline variant */
  user-select: none;
  letter-spacing: 0.02em;
}

/* Pill Modifier */
.badge--pill {
  border-radius: 9999px;
}

/* --- Variants (Using CSS Variables for Theme Consistency) --- */

/* Primary: Solid Brand Color */
.badge--primary {
  background-color: var(--brand-primary, #3b82f6);
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3); /* Glow */
}

/* Secondary: Subtle Surface */
.badge--secondary {
  background-color: var(--bg-surface-2, #334155);
  color: var(--text-primary, #f8fafc);
  border-color: rgba(255,255,255,0.1);
}

/* Accent: Brand Focus Color */
.badge--accent {
  background-color: var(--brand-accent, #8b5cf6);
  color: #ffffff;
}

/* --- Status Colors (Modern "Subtle" Style) --- */
/* Instead of solid blocks, we use transparent bg + colored text */

.badge--success {
  background-color: rgba(16, 185, 129, 0.15); 
  color: var(--status-success, #10b981);
  border-color: rgba(16, 185, 129, 0.2);
}

.badge--danger {
  background-color: rgba(239, 68, 68, 0.15);
  color: var(--status-error, #ef4444);
  border-color: rgba(239, 68, 68, 0.2);
}

.badge--warning {
  background-color: rgba(245, 158, 11, 0.15);
  color: var(--status-warning, #f59e0b);
  border-color: rgba(245, 158, 11, 0.2);
}

.badge--info {
  background-color: rgba(6, 182, 212, 0.15);
  color: #06b6d4;
  border-color: rgba(6, 182, 212, 0.2);
}

/* Outline: Useful for tags or non-critical info */
.badge--outline {
  background-color: transparent;
  border-color: currentColor;
  color: var(--text-tertiary, #94a3b8);
  opacity: 0.8;
}

/* --- Sizes --- */

.badge--small {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  height: 20px;
}

.badge--medium {
  font-size: 0.8rem;
  padding: 0.25rem 0.65rem;
  height: 26px;
}

.badge--large {
  font-size: 0.9rem;
  padding: 0.35rem 0.85rem;
  height: 32px;
}

/* Icon Sizing */
.badge__icon {
  width: 1em; /* Scales perfectly with font-size */
  height: 1em;
  flex-shrink: 0;
  opacity: 0.9;
}
</style>