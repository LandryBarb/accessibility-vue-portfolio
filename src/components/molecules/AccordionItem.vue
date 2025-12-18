<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  title: string;
  startOpen?: boolean;
  disabled?: boolean;
  headingTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Semantic heading level
}>(), {
  startOpen: false,
  disabled: false,
  headingTag: 'h3' // Default to h3 for typical document flow
});

const isOpen = ref(props.startOpen);

// Stable ID generation (simplified for client-side)
const uid = Math.random().toString(36).slice(2, 9);
const headerId = `accordion-header-${uid}`;
const panelId = `accordion-panel-${uid}`;

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div 
    class="accordion-item" 
    :class="{ 'is-open': isOpen, 'is-disabled': props.disabled }"
  >
    <component :is="props.headingTag" class="accordion-heading">
      <button
        :id="headerId"
        class="accordion-trigger"
        type="button"
        @click="toggle"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        :disabled="props.disabled"
      >
        <span class="accordion-title">{{ props.title }}</span>
        
        <ChevronDown 
          class="accordion-icon" 
          aria-hidden="true" 
          :class="{ 'is-rotated': isOpen }"
        />
      </button>
    </component>

    <div 
      class="accordion-content-wrapper"
      :aria-hidden="!isOpen"
    >
      <div 
        :id="panelId"
        class="accordion-inner"
        role="region"
        :aria-labelledby="headerId"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

/* Hover State (only if not open/disabled) */
.accordion-item:hover:not(.is-open):not(.is-disabled) {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
}

/* Active Open State */
.accordion-item.is-open {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
}

/* Disabled State */
.accordion-item.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* --- Trigger Button --- */
.accordion-heading {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}

.accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  color: var(--text-primary, #f8fafc);
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
}

/* Focus State (AAA) */
.accordion-trigger:focus-visible {
  background: rgba(255,255,255,0.05);
  box-shadow: inset 0 0 0 2px var(--brand-primary, #3b82f6);
}

.accordion-title {
  margin-right: 1rem;
}

/* --- Icon Animation --- */
.accordion-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-tertiary, #94a3b8);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.is-rotated {
  transform: rotate(180deg);
  color: var(--brand-primary, #3b82f6);
}

/* --- Smooth Content Animation (Grid Trick) --- */
.accordion-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 1px solid transparent; /* Prepare for border transition */
}

/* When open, animate to 1fr */
.is-open .accordion-content-wrapper {
  grid-template-rows: 1fr;
  border-top-color: rgba(255, 255, 255, 0.1);
}

.accordion-inner {
  overflow: hidden;
  color: var(--text-secondary, #cbd5e1);
  line-height: 1.6;
}

/* Content Padding applied to inner div to prevent jerky animation */
.accordion-inner > :deep(*) {
  padding: 1.25rem;
  margin: 0; /* Reset standard block margins */
}
</style>