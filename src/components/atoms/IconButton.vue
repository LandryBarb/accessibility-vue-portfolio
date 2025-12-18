<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    icon?: Component;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    label?: string;   // Visible text label
    srLabel?: string; // Screen-reader only label
    pressed?: boolean | undefined; 
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    label: '',
    srLabel: '',
    pressed: undefined,
  }
);

const accessibleLabel = computed(() => {
  if (props.loading) return 'Loading';
  // Use label prop or default slot content logic (handled by browser accessibility tree usually, but good to be explicit)
  if (props.label) return undefined; 
  return props.srLabel || 'Button';
});

const classes = computed(() => [
  'icon-btn',
  `icon-btn--${props.variant}`,
  `icon-btn--${props.size}`,
  {
    'icon-btn--disabled': props.disabled || props.loading,
    'icon-btn--loading': props.loading,
    'icon-btn--with-label': !!props.label
  }
]);
</script>

<template>
  <button
    :class="classes"
    :disabled="props.disabled || props.loading"
    :aria-disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    :aria-label="accessibleLabel"
    :aria-pressed="props.pressed"
    type="button"
  >
    <span v-if="props.loading" class="spinner" aria-hidden="true"></span>

    <template v-else>
      <component 
        v-if="props.icon" 
        :is="props.icon" 
        class="icon-btn__icon"
        aria-hidden="true" 
      />
      
      <span v-if="props.label" class="icon-btn__label">{{ props.label }}</span>
      
      <slot v-else />
    </template>
  </button>
</template>

<style scoped>
/* --- Base Styles --- */
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px; 
  font-family: var(--font-sans, sans-serif);
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent; 
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  user-select: none;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
}

/* --- Focus States (WCAG AAA) --- */
.icon-btn:focus-visible {
  outline: 2px solid var(--brand-primary, #3b82f6);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

/* --- Disabled State --- */
.icon-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none; 
  filter: grayscale(0.8);
}

/* --- Sizes --- */
.icon-btn--sm {
  padding: 0.375rem;
  font-size: 0.75rem;
  min-width: 32px;
  min-height: 32px;
}

.icon-btn--md {
  padding: 0.625rem;
  font-size: 0.875rem;
  min-width: 44px; /* WCAG Target Size */
  min-height: 44px;
}

.icon-btn--lg {
  padding: 0.875rem;
  font-size: 1rem;
  min-width: 56px;
  min-height: 56px;
}

/* Padding adjustments when label is present */
.icon-btn--with-label.icon-btn--sm { padding-left: 0.75rem; padding-right: 0.75rem; }
.icon-btn--with-label.icon-btn--md { padding-left: 1rem; padding-right: 1rem; }
.icon-btn--with-label.icon-btn--lg { padding-left: 1.5rem; padding-right: 1.5rem; }

/* --- Variants --- */
.icon-btn--primary {
  background: linear-gradient(135deg, var(--brand-primary, #3b82f6), var(--brand-focus, #2563eb));
  color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}
.icon-btn--primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.icon-btn--secondary {
  background-color: rgba(255, 255, 255, 0.05); 
  color: var(--text-primary, #f8fafc);
  border-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}
.icon-btn--secondary:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.icon-btn--ghost {
  background: transparent;
  color: var(--text-secondary, #94a3b8);
  border-color: transparent;
}
.icon-btn--ghost:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--brand-primary, #3b82f6);
}

.icon-btn--danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--status-error, #ef4444);
  border-color: rgba(239, 68, 68, 0.2);
}
.icon-btn--danger:hover:not(:disabled) {
  background-color: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
}

/* Pressed State */
.icon-btn[aria-pressed="true"] {
  background-color: var(--brand-primary, #3b82f6);
  color: white;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

/* --- Content Styling --- */
.icon-btn__icon {
  width: 1.25em; 
  height: 1.25em;
  flex-shrink: 0;
}

.icon-btn__label {
  line-height: 1.2;
}

/* --- Spinner --- */
.spinner {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent; 
  animation: spin 0.75s linear infinite;
  opacity: 0.8;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>