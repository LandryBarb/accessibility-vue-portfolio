<template>
<div class="l-app">
<SidebarNav />


<main id="main-content" class="l-main" tabindex="-1">
<slot />
</main>
</div>
</template>


<script setup lang="ts">
import SidebarNav from './SidebarNav.vue'
</script>


<style scoped lang="scss">
.l-app {
display: grid;
grid-template-columns: 260px 1fr;
min-height: 100vh;
  overflow: hidden;
  /* Tablet + down */
@media (max-width: 1023px) {
  .l-app {
    grid-template-columns: 1fr;
  }
}

}


.l-main {
     height: 100vh;
  overflow-y: auto;
padding: var(--space-xl);
}


@media (max-width: 900px) {
.l-app {
grid-template-columns: 1fr;
}
}
</style>