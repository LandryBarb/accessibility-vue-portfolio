<template>
  <section class="metric-card">
 <p
  v-if="eyebrow"
  class="metric-card__eyebrow"
  :id="eyebrowId"
>
  {{ eyebrow }}
</p>

<h3
  class="metric-card__title"
  :aria-describedby="eyebrow ? eyebrowId : undefined"
>
  {{ title }}
</h3>


    <p class="metric-card__description">
      {{ description }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  eyebrow?: string
  title: string
  description: string
}

const props = defineProps<Props>()

const eyebrowId = computed(() =>
  props.eyebrow
    ? `metric-${props.eyebrow.toLowerCase().replace(/\s+/g, '-')}`
    : undefined
)
</script>


<style scoped lang="scss">
.metric-card {
  background: var(--color-surface-1);
  border-radius: var(--radius-m);
  padding: var(--space-l);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  box-shadow: var(--shadow-surface);
}

.metric-card__eyebrow {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  font-weight: 600;
}

.metric-card__title {
  font-size: var(--font-size-s);
  font-weight: 700;
  margin: 0;
}

.metric-card__description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
/* ================================
   Responsive
   ================================ */

/* Tablet and below */
@media (max-width: 1024px) {
  .metric-card {
    padding: var(--space-m);
  }

  .metric-card__title {
    font-size: var(--font-size-s);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .metric-card {
    padding: var(--space-m);
    gap: var(--space-2xs);
  }

  .metric-card__eyebrow {
    font-size: var(--font-size-2xs);
    letter-spacing: 0.06em;
  }

  .metric-card__title {
    font-size: var(--font-size-s);
    line-height: 1.25;
  }

  .metric-card__description {
    font-size: var(--font-size-xs);
    line-height: 1.45;
    max-width: 38ch;
  }
}

/* Very small screens / dense layouts */
@media (max-width: 480px) {
  .metric-card {
    padding: var(--space-s);
  }

  .metric-card__description {
    max-width: none;
  }
}

</style>
