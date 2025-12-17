<template>
  <figure class="screenshot-card">
    <div class="screenshot-card__frame">
      <img
        :src="src"
        :alt="alt"
        class="screenshot-card__image"
      />
    </div>

    <figcaption
      v-if="caption"
      class="screenshot-card__caption"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  caption?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.screenshot-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.screenshot-card__frame {
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-l);
  overflow: hidden;

  /* gives it “artifact” weight */
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.02),
    var(--shadow-surface);
}

.screenshot-card__image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  opacity: 0.95;
}

.screenshot-card__caption {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: center;
  padding-top: var(--space-2xs);
}

/* ================================
   Responsive
   ================================ */
@media (max-width: 768px) {
  .screenshot-card {
    gap: var(--space-2xs);
  }

  .screenshot-card__frame {
    border-radius: var(--radius-m);
  }

  .screenshot-card__image {
    max-height: 60vh;
    object-fit: contain;
    background: #000;
  }

  .screenshot-card__caption {
    font-size: var(--font-size-2xs);
    line-height: 1.4;
    padding-inline: var(--space-xs);
  }
}

</style>
