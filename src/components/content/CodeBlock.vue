<template>
<figure
  class="code-block"
  :aria-labelledby="filename ? labelId : undefined"
>
  <figcaption
    v-if="filename"
    :id="labelId"
    class="code-block__header"
  >
    <span class="code-block__filename">{{ filename }}</span>
    <button
      class="code-block__expand"
      @click="expanded = !expanded"
      :aria-expanded="expanded"
    >
      {{ expanded ? 'Collapse' : 'View full code' }}
    </button>
  </figcaption>

  <pre :class="{ 'is-expanded': expanded }">
    <code><slot /></code>
  </pre>
</figure>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  filename?: string
}
const expanded = ref(false);
const props = defineProps<Props>()

const labelId = computed(() =>
  props.filename
    ? `code-${props.filename.replace(/\W+/g, '-').toLowerCase()}`
    : undefined
)
</script>


<style scoped lang="scss">
.code-block {
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-m);
  overflow: hidden;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.02),
    var(--shadow-surface);
    max-width: 1000px;
}

/* Header stays fixed */
.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-xs) var(--space-m);
  font-size: var(--font-size-xs);
  background: #161616;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* NEW: constrained code viewport */
.code-block pre {
  position: relative;
  max-height: 220px; /* 👈 key value */
  overflow: hidden;
  padding: var(--space-l);
  font-size: var(--font-size-xs);
  line-height: 1.6;
  color: #e5e7eb;
}

/* NEW: bottom fade cue */
.code-block pre::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 64px;
  background: linear-gradient(
    to bottom,
    rgba(13,13,13,0),
    rgba(13,13,13,0.85)
  );
  pointer-events: none;
}

.code-block__expand {
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: 600;
  cursor: pointer;
}

.code-block__expand:hover,
.code-block__expand:focus-visible {
  text-decoration: underline;
}

.code-block pre.is-expanded {
  max-height: none;
  overflow-x: auto;
}

.code-block pre.is-expanded::after {
  display: none;
}
.code-block pre,
.code-block code {
  white-space: pre-wrap;      /* allow wrapping */
  word-break: break-word;     /* break long tokens */
  overflow-wrap: anywhere;    /* last-resort wrap */
}

/* ================================
   Responsive
   ================================ */
@media (max-width: 768px) {
  .code-block__header {
     flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2xs);
    padding: var(--space-xs);
    font-size: var(--font-size-2xs);
  }

  .code-block__lang {
    display: none; /* reduce header noise on mobile */
  }

  pre {
    overflow-x: hidden;
    padding: var(--space-m);
    font-size: var(--font-size-2xs);
    max-height: 160px;
    line-height: 1.5;
    -webkit-overflow-scrolling: touch;
  }
}

</style>
