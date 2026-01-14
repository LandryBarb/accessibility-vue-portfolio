<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Component } from 'vue'
import { User } from 'lucide-vue-next'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const props = withDefaults(
  defineProps<{
    /** Image source URL */
    src?: string
    /** Alt text for the image (required for semantic images) */
    alt?: string
    /** Fallback text (e.g. "JD" for John Doe) if image fails/missing */
    initials?: string
    /** Fallback icon component if no image or initials */
    icon?: Component
    /** Size step */
    size?: AvatarSize
    /** Accessible label for the container when showing fallbacks */
    label?: string 
  }>(),
  {
    size: 'md',
    icon: User,
    alt: 'User Avatar'
  }
)

const hasError = ref(false)
const isImageReady = ref(false)

// Reset error state if source changes
watch(() => props.src, () => {
  hasError.value = false
  isImageReady.value = false
})

const onError = () => {
  hasError.value = true
  isImageReady.value = false
}

const onLoad = () => {
  isImageReady.value = true
}

const showImage = computed(() => props.src && !hasError.value)

const classes = computed(() => [
  'ui-avatar',
  `ui-avatar--${props.size}`,
  { 'ui-avatar--loaded': isImageReady.value }
])

// A11y: Determine effective accessible name
const ariaLabel = computed(() => props.label || props.alt)
</script>

<template>
  <div 
    :class="classes" 
    :role="!showImage ? 'img' : undefined" 
    :aria-label="!showImage ? ariaLabel : undefined"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      class="ui-avatar__img"
      @error="onError"
      @load="onLoad"
    />
    
    <span 
      v-else-if="initials" 
      class="ui-avatar__initials" 
      aria-hidden="true"
    >
      {{ initials.slice(0, 2) }}
    </span>
    
    <component 
      v-else 
      :is="icon" 
      class="ui-avatar__icon" 
      aria-hidden="true" 
    />
  </div>
</template>

<style scoped lang="scss">
@use "../../styles/stagecraft/tokens.scope.css" as *;

.ui-avatar {
  /* Default Appearance */
  --avatar-bg: var(--color-cable-steel-700);
  --avatar-fg: var(--color-text-secondary);
  --avatar-border: rgba(255, 255, 255, 0.1);
  
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background-color: var(--avatar-bg);
  color: var(--avatar-fg);
  border: 1px solid var(--avatar-border);
  user-select: none;
  flex-shrink: 0;
}

.ui-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity var(--motion-base);
  opacity: 0; /* Prevent flash of unstyled content */
}

.ui-avatar--loaded .ui-avatar__img {
  opacity: 1;
}

.ui-avatar__initials {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 0.05em;
}

.ui-avatar__icon {
  width: 55%;
  height: 55%;
  opacity: 0.8;
}

/* --- Sizes --- */
.ui-avatar--xs {
  width: 1.5rem; height: 1.5rem;
  font-size: 0.625rem;
}
.ui-avatar--sm {
  width: 2rem; height: 2rem;
  font-size: 0.75rem;
}
.ui-avatar--md {
  width: 2.5rem; height: 2.5rem;
  font-size: 1rem;
}
.ui-avatar--lg {
  width: 3rem; height: 3rem;
  font-size: 1.125rem;
}
.ui-avatar--xl {
  width: 4rem; height: 4rem;
  font-size: 1.5rem;
}
.ui-avatar--2xl {
  width: 6rem; height: 6rem;
  font-size: 2.25rem;
}
</style>