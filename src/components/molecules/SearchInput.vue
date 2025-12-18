<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { Search, X, Loader2 } from 'lucide-vue-next';

type Size = 'sm' | 'md' | 'lg';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
  (e: 'clear'): void;
}>();

const props = withDefaults(defineProps<{
  modelValue?: string;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean; // Added loading state visual
  debounce?: number;
  size?: Size;
  // A11y props
  label?: string;
  srClearLabel?: string;
}>(), {
  modelValue: '',
  size: 'md',
  placeholder: 'Search...',
  clearable: true,
  disabled: false,
  loading: false,
  debounce: 300,
  label: 'Search content',
  srClearLabel: 'Clear search query',
});

const inputValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

// --- Watch for External Model Changes ---
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});

// --- Debounce Logic ---
watch(inputValue, (val) => {
  emit('update:modelValue', val);

  if (props.debounce > 0) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      emit('search', val);
    }, props.debounce);
  } else {
    emit('search', val);
  }
});

// --- Actions ---
function clearInput() {
  inputValue.value = '';
  emit('clear');
  emit('search', '');
  
  // A11Y CRITICAL: Return focus to input so user isn't lost
  nextTick(() => {
    inputRef.value?.focus();
  });
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div 
    class="search-wrapper" 
    :class="[`search-wrapper--${props.size}`, { 'is-disabled': props.disabled }]"
    role="search"
  >
    <Search class="search-icon" aria-hidden="true" />

    <input
      ref="inputRef"
      v-model="inputValue"
      class="search-field"
      type="search"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :aria-label="props.label"
      :aria-busy="props.loading"
      autocomplete="off"
      spellcheck="false"
    />

    <div class="search-actions">
      <Loader2 v-if="loading" class="spinner-icon" aria-hidden="true" />
      
      <button
        v-else-if="props.clearable && inputValue"
        class="clear-btn"
        type="button"
        @click="clearInput"
        :aria-label="props.srClearLabel"   
      >
        <X size?="100%" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* --- Container (Glass Effect) --- */
.search-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05); /* Glass Background */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: 100%;
}

/* Hover State */
.search-wrapper:hover:not(.is-disabled) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Focus State (:focus-within handles the ring for the whole box) */
.search-wrapper:focus-within {
  background: rgba(0, 0, 0, 0.2); /* Darken slightly for contrast */
  border-color: var(--brand-primary, #3b82f6);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); /* AAA Focus Ring */
}

/* Disabled State */
.is-disabled {
  opacity: 0.5;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.02);
}

/* --- Icons --- */
.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-tertiary, #94a3b8);
  margin-left: 0.75rem; /* Internal padding */
  flex-shrink: 0;
}

/* --- Input Field --- */
.search-field {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary, #f8fafc);
  font-family: var(--font-sans, sans-serif);
  font-size: 1rem;
  outline: none; /* Handled by wrapper :focus-within */
  padding: 0.5rem 0;
  min-width: 0; /* Flexbox safety */
}

/* Native Search Cancel Button Removal (We use custom) */
.search-field::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.search-field::placeholder {
  color: var(--text-tertiary, #64748b); /* Ensure AAA contrast against dark bg */
}

/* --- Actions (Clear / Loading) --- */
.search-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--text-tertiary, #94a3b8);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary, #fff);
}

.clear-btn:focus-visible {
  outline: 2px solid var(--brand-primary, #3b82f6);
  background: rgba(59, 130, 246, 0.1);
  color: var(--brand-primary, #3b82f6);
}

/* Loading Spinner */
.spinner-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--brand-primary, #3b82f6);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --- Sizes --- */
.search-wrapper--sm { min-height: 36px; font-size: 0.875rem; }
.search-wrapper--md { min-height: 48px; font-size: 1rem; }
.search-wrapper--lg { min-height: 60px; font-size: 1.125rem; }
</style>