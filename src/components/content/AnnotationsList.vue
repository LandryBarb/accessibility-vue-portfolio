<template>
  <section
    class="annotations"
    aria-labelledby="headingId"
  >
    <h2 :id="headingId">{{ title }}</h2>

    <ul class="annotations__list">
      <li
        v-for="item in items"
        :key="item.title"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface Annotation {
  title: string
  description: string
}

interface Props {
  title: string
  items: Annotation[]
  headingId?: string
}

withDefaults(defineProps<Props>(), {
  headingId: 'annotations-heading',
})
</script>

<style scoped lang="scss">
.annotations__list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: var(--space-l);
}

.annotations h3 {
  margin-bottom: var(--space-2xs);
}
</style>
