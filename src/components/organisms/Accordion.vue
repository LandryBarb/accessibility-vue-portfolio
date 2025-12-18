<script setup lang="ts">
import AccordionItem from '../molecules/AccordionItem.vue';

// Define the shape of our data
interface AccordionData {
  title: string;
  content: string;
  startOpen?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<{
  items: AccordionData[];
  // Future-proofing: You could add 'allowMultiple' prop here 
  // if you refactor AccordionItem to be controlled.
}>(), {
  items: () => []
});
</script>

<template>
  <section class="accordion-group" aria-label="FAQ Accordion">
    <AccordionItem
      v-for="(item, i) in props.items" 
      :key="i"
      :title="item.title"
      :start-open="item.startOpen"
      :disabled="item.disabled"
    >
      <p class="accordion-text">{{ item.content }}</p>
    </AccordionItem>
  </section>
</template>

<style scoped>
.accordion-group {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Standard spacing between stacked items */
  width: 100%;
}

.accordion-text {
  margin: 0;
  /* Ensure text reads well on dark backgrounds */
  color: var(--text-secondary, #cbd5e1); 
  font-size: 1rem;
  line-height: 1.6;
}
</style>