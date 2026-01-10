<script setup>
import SidebarNavigation from './components/layout/SidebarNav.vue';
</script>

<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <SidebarNavigation class="app-sidebar" />

    <main id="main-content" class="app-main" tabindex="-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss">
@use './styles/portfolio/global.scss';

/* Composition Layer */
.app-shell {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.app-main {
  flex: 1;
  margin-left: 16rem; /* Sidebar width */
  min-height: 100vh;
  background-color: var(--bg-body);
  
  /* Focus management for skip link target */
  &:focus {
    outline: none;
  }
}

/* Block Layer: Skip Link */
.skip-link {
  position: absolute;
  top: -9999px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--brand-primary);
  color: white;
  padding: 1rem 2rem;
  z-index: 9999;
  font-weight: bold;
  text-decoration: none;
  border-radius: 0 0 8px 8px;

  &:focus {
    top: 0;
  }
}

/* Media Query for Mobile */
@media (max-width: 1024px) {
  .app-main {
    margin-left: 0;
    padding-bottom: 5rem; /* Space for mobile nav if bottom */
  }
}

/* Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>