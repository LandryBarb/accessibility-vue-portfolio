<script setup>
import { ref } from 'vue';
import { Home, Search, Folder, MonitorPlay, Settings, User, Share2, X, Globe } from 'lucide-vue-next';

// Profile Modal State
const isProfileOpen = ref(false);

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Search Work', path: '/search', icon: Search },
  { name: 'Portfolio', path: '/portfolio', icon: Folder },
  { name: 'Websites', path: '/websites', icon: Globe },
  { name: 'Case Studies', path: '/case-studies', icon: MonitorPlay },
  { name: 'About', path: '/about', icon: User }
];

// const openProfile = () => isProfileOpen.value = true;
// const closeProfile = () => isProfileOpen.value = false;
</script>

<template>
  <nav class="nav-container" aria-label="Main Navigation">
    <div class="nav-brand">
      <MonitorPlay class="brand-icon" aria-hidden="true" />
      <span class="brand-text">Landry Barb II</span>
    </div>

    <ul class="nav-list">
      <li v-for="item in navItems" :key="item.name" class="nav-item">
        <router-link 
          :to="item.path" 
          class="nav-link"
          active-class="is-active"
        >
          <component :is="item.icon" class="nav-icon" aria-hidden="true" />
          <span class="nav-label">{{ item.name }}</span>
        </router-link>
      </li>
      
      <!-- <li class="nav-item mobile-only">
        <router-link to="/about" class="nav-link" active-class="is-active">
          <User class="nav-icon" aria-hidden="true" />
          <span class="nav-label">Profile</span>
        </router-link>
      </li> -->
    </ul>

    <div class="nav-footer desktop-only">
      <router-link to="/settings" class="nav-link" active-class="is-active">
        <Settings class="nav-icon" aria-hidden="true" />
        Settings
      </router-link>
      
      <button 
        class="profile-btn" 
        @click="isProfileOpen = true"
        aria-label="View Profile Stats"
      >
        <div class="profile-avatar">AE</div>
        <div class="profile-meta">
          <span class="name">Access. Eng.</span>
          <span class="status">Online</span>
        </div>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isProfileOpen" class="modal-backdrop" @click="isProfileOpen = false">
          <div class="modal-content" role="dialog" aria-modal="true" @click.stop>
            <div class="modal-header">
              <h3>Engineer Stats</h3>
              <button @click="isProfileOpen = false" class="close-btn" aria-label="Close">
                <X />
              </button>
            </div>
            <dl class="stats-grid">
              <div class="stat"><dt>Accessibility</dt><dd>WCAG 2.2, ADA</dd></div>
              <div class="stat"><dt>Focus</dt><dd>Streaming Platforms</dd></div>
              <div class="stat"><dt>Build</dt><dd>Human-First</dd></div>
            </dl>
          </div>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<style lang="scss" scoped>
@use '../../styles/index.scss' as *;

/* --- Layout: Desktop (Sidebar) --- */
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background-color: black;
  border-right: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  padding: var(--space-lg);
  z-index: var(--z-sticky);

  /* --- Layout: Mobile (Bottom Bar) --- */
  @include respond-to('laptop') {
    top: auto;
    bottom: 0;
    width: 100%;
    height: var(--mobile-nav-height); /* ~64px */
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-top: 1px solid rgba(255,255,255,0.1);
    background-color: var(--bg-glass);
    backdrop-filter: blur(12px);
    justify-content: space-between;
  }
}

/* --- Brand (Desktop Only) --- */
.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
  color: var(--brand-primary);
  
  .brand-text { font-weight: 800; color: white; }

  @include respond-to('laptop') { display: none; }
}

/* --- Navigation List --- */
.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 100%;

  @include respond-to('laptop') {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    gap: 0;
  }
}

.nav-item {
  @include respond-to('laptop') { flex: 1; }
}

/* --- Links --- */
.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: var(--text-tertiary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s var(--ease-cinematic);
  border: 1px solid transparent;

  /* Desktop Hover/Active */
  &:hover, &:focus-visible {
    color: white;
    background-color: rgba(255,255,255,0.1);
  }

  &.is-active {
    background-color: rgba(59, 130, 246, 0.15);
    color: var(--brand-primary);
    box-shadow: var(--brand-glow);
    border-color: rgba(59, 130, 246, 0.3);
  }

  /* Mobile Styles */
  @include respond-to('laptop') {
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    padding: 0;
    height: 100%;
    border-radius: 0;
    background-color: transparent !important; /* Remove background on mobile */
    box-shadow: none !important;
    border: none;

    .nav-label { font-size: 0.65rem; font-weight: 600; }
    .nav-icon { width: 1.25rem; height: 1.25rem; }

    &.is-active {
      color: var(--brand-primary);
      /* Use a top indicator line for active state on mobile */
      border-top: 2px solid var(--brand-primary); 
      .nav-icon{
        margin-block-start: 0.5em;
      }

    }
  }
}

/* --- Utilities --- */
.desktop-only { @include respond-to('laptop') { display: none !important; } }
.mobile-only { display: none; @include respond-to('laptop') { display: block; } }

/* --- Desktop Footer Profile --- */
.nav-footer {
  margin-top: auto;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: none;
  border: none;
  padding: var(--space-xs);
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: white;

  &:hover { background: rgba(255,255,255,0.05); }
}

.profile-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--brand-primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  .name { font-size: 0.85rem; font-weight: 600; }
  .status { font-size: 0.7rem; color: var(--status-success); }
}

/* --- Modal Styles (Global because of Teleport) --- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: var(--bg-surface);
  padding: var(--space-lg);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.2);
  width: 90%;
  max-width: 320px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-md);
  h3 { font-size: 1.1rem; }
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  &:hover { color: white; }
}

.stats-grid .stat {
  display: flex;
  justify-content: space-between;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  dt { color: var(--text-tertiary); }
  dd { font-family: var(--font-mono); font-weight: 700; }
}

/* Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>