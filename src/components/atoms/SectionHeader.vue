<template>
  <header class="section-header">
    <div class="section-header__title">
      <span
        v-if="icon"
        class="section-header__icon"
        aria-hidden="true"
      >
        {{ icon }}
      </span>

      <component
        :is="as"
        :id="id"
        class="section-header__heading"
      >
        {{ title }}
      </component>
    </div>

    <p
      v-if="description"
      class="section-header__description"
    >
      {{ description }}
    </p>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
  as?: 'h2' | 'h3'
  id?: string
}

withDefaults(defineProps<Props>(), {
  as: 'h2',
})
</script>

<style scoped lang="scss">
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.section-header__title {
  display: flex;
  align-items: center;
  gap: var(--space-s);
}

.section-header__icon {
  font-size: 1.25em;
  line-height: 1;
}

.section-header__heading {
  margin: 0;
  font-size: var(--font-size-l);
  font-weight: 700;
}

.section-header__description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-s);
}
</style>
