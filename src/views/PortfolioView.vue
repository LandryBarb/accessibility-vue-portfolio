<script setup>
import { ref, computed } from 'vue';
import { 
  Monitor, Smartphone, FileText, Layers, Filter, 
  Code2, AlertCircle, ChevronRight 
} from 'lucide-vue-next';
import { experiments } from '../data/experiments'; // ONLY Experiments

// --- State ---
const activeFilter = ref("All");

// --- Config ---
const categories = [
  { id: "All", label: "All Experiments" },
  { id: "Component", label: "Components", icon: Code2 },
  { id: "Form", label: "Forms", icon: FileText },
  { id: "Pattern", label: "Patterns", icon: Layers },
  { id: "Utility", label: "Utilities", icon: Monitor },
];

// --- Filtering Logic ---
const filteredItems = computed(() => {
  if (activeFilter.value === "All") return experiments;
  return experiments.filter(e => e.category === activeFilter.value);
});
</script>

<template>
  <div class="page-container">
    
    <header class="content-wrapper header">
      <div class="header__eyebrow">
        <Code2 class="icon" aria-hidden="true" />
        <span>Experiments Lab</span>
      </div>
      <h1 class="header__title">Component Library & Prototypes</h1>
      <p class="header__desc">
        A collection of atomic accessible components, isolated patterns, and utility hooks. 
        These are the building blocks of inclusive interfaces.
      </p>
    </header>

    <nav class="filter-bar" aria-label="Experiment Filters">
      <div class="content-wrapper filter-container">
        <div class="filter-label" aria-hidden="true">
          <Filter size="14" />
          <span>Filter:</span>
        </div>
        <div class="filter-scroll-area">
          <div class="filter-list" role="group">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="activeFilter = cat.id"
              class="filter-pill"
              :class="{ 'is-active': activeFilter === cat.id }"
              :aria-pressed="activeFilter === cat.id"
            >
              <component v-if="cat.icon" :is="cat.icon" class="pill-icon" aria-hidden="true" />
              {{ cat.label }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <section class="content-wrapper section-grid" aria-live="polite">
      <TransitionGroup name="grid-anim" tag="div" class="projects-grid">
        
        <article 
          v-for="item in filteredItems" 
          :key="item.id" 
          class="project-card"
        >
          <router-link :to="`/experiments/${item.id}`" class="card-link">
            
            <div class="card-thumbnail" :class="item.imageClass">
              <div class="badge-overlay">
                <span class="compliance-badge">{{ item.compliance }}</span>
              </div>
              <div class="hover-overlay">
                <Code2 class="play-icon" />
                <span class="play-text">View Code</span>
              </div>
            </div>

            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.desc }}</p>
              
              <ul class="card-tags">
                <li v-for="tag in item.tags" :key="tag" class="tag">
                  {{ tag }}
                </li>
              </ul>
            </div>

          </router-link>
        </article>

      </TransitionGroup>

      <div v-if="filteredItems.length === 0" class="empty-state">
        <AlertCircle size="48" class="empty-icon" aria-hidden="true" />
        <p class="empty-text">No experiments found.</p>
        <button @click="activeFilter = 'All'" class="btn-reset">Clear Filters</button>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

/* CUBE: Composition Layer */
.page-container {
  padding-bottom: var(--space-2xl);
  min-height: 100vh;
  /* Adjust bottom padding for mobile nav */
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-lg));
  }
}

.content-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  @include respond-to('mobile') { padding: 0 var(--space-sm); }
}

/* BLOCK: Header */
.header {
  padding-top: var(--space-xl);
  padding-bottom: var(--space-lg);

  &__eyebrow {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--brand-primary);
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-sm);
    .icon { width: 1.25rem; height: 1.25rem; }
  }

  &__title {
    font-size: var(--text-h1);
    font-weight: 800;
    margin-bottom: var(--space-md);
    line-height: 1.1;
  }

  &__desc {
    font-size: 1.125rem;
    color: var(--text-tertiary);
    max-width: 65ch;
    line-height: 1.6;
  }
}

/* BLOCK: Sticky Filter Bar */
.filter-bar {
  position: sticky;
  top: 0;
  z-index: 90; /* Lower than Sidebar (100) */
  background-color: var(--bg-glass);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: var(--space-md) 0;
  margin-bottom: var(--space-xl);
}

.filter-container {
  display: flex;
  align-items: center;
  gap: var(--space-md);
    @include respond-to('mobile') {
    flex-direction: column;
    
  }
}

.filter-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

/* Responsive Horizontal Scroll Area */
.filter-scroll-area {
  flex: 1;
  overflow-x: auto;
  /* Hide scrollbars but keep functionality */
  scrollbar-width: none; 
  &::-webkit-scrollbar { display: none; }
  
  /* Mask fade effect on edges if content overflows (optional enhancement) */
  mask-image: linear-gradient(to right, transparent, black 10px, black 95%, transparent);
}

.filter-list {
  display: flex;
  gap: var(--space-xs);
  padding-bottom: 2px; /* Prevent scrollbar clip */
   @include respond-to('mobile') {
    flex-direction: column;
  }
}

/* Filter Pill */
.filter-pill {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(255,255,255,0.1);
  background-color: rgba(255,255,255,0.05);
  color: var(--text-tertiary);
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s var(--ease-cinematic);

  &:hover {
    background-color: rgba(255,255,255,0.1);
    color: white;
  }

  &.is-active {
    background-color: var(--brand-primary);
    border-color: var(--brand-primary);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  .pill-icon {
    width: 1rem;
    height: 1rem;
    opacity: 0.7;
  }
}

/* BLOCK: Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-lg);
  
  @include respond-to('mobile') {
    grid-template-columns: 1fr;
  }
}

/* BLOCK: Card */
.project-card {
  position: relative;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  
  &:hover, &:focus-visible {
    .card-thumbnail {
      transform: scale(1.02);
      border-color: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .hover-overlay { opacity: 1; }
    .card-title { color: var(--brand-primary); }
  }
}

.card-thumbnail {
  aspect-ratio: 16/9;
  border-radius: 8px;
  background-color: var(--bg-surface);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s var(--ease-cinematic);
  margin-bottom: var(--space-sm);

  /* Gradients */
  &.poster-blue { background: linear-gradient(135deg, #1e3a8a, #0f172a); }
  &.poster-purple { background: linear-gradient(135deg, #581c87, #0f172a); }
  &.poster-emerald { background: linear-gradient(135deg, #064e3b, #0f172a); }
  &.poster-orange { background: linear-gradient(135deg, #7c2d12, #0f172a); }
  &.poster-cyan { background: linear-gradient(135deg, #0e7490, #0f172a); }
  &.poster-pink { background: linear-gradient(135deg, #831843, #0f172a); }
  &.poster-indigo { background: linear-gradient(135deg, #3730a3, #0f172a); }
}

.badge-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.compliance-badge {
  background-color: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.2);
  text-transform: uppercase;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;

  .play-icon { width: 3rem; height: 3rem; color: white; }
  .play-text { color: var(--brand-primary); font-size: 0.875rem; font-weight: 600; }
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  transition: color 0.2s;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 4px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--space-sm);
  /* Reset handled by _reset.scss but forcing safety here just in case */
  list-style: none; 
  padding: 0;
  
  .tag {
    font-size: 0.7rem;
    color: var(--text-tertiary);
    background: rgba(255,255,255,0.05);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.1);
  }
}

/* BLOCK: Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl) 0;
  color: var(--text-tertiary);
  text-align: center;

  .empty-icon { margin-bottom: var(--space-sm); opacity: 0.5; }
  .empty-text { font-size: 1.25rem; margin-bottom: var(--space-md); }
}

.btn-reset {
  background: none;
  border: none;
  color: var(--brand-primary);
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
  &:hover { color: white; }
}

/* ANIMATION: Grid Shuffle */
.grid-anim-move,
.grid-anim-enter-active,
.grid-anim-leave-active {
  transition: all 0.4s var(--ease-cinematic);
}

.grid-anim-enter-from,
.grid-anim-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.grid-anim-leave-active {
  position: absolute; 
}
</style>