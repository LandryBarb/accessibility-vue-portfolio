<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { 
  Search, X, Filter, Monitor, Smartphone, 
  FileText, Layers, ChevronRight 
} from 'lucide-vue-next';
import { projects } from '../content/projects';

// --- State ---
const searchQuery = ref('');
const activeCategory = ref('All');
const searchInput = ref(null);

// --- Config ---
const categories = [
  { id: 'All', label: 'All' },
  { id: 'Case Study', label: 'Case Studies' },
  { id: 'Audit', label: 'Audits' },
  { id: 'System Design', label: 'Systems' },
  { id: 'Docs', label: 'Docs' }
];

// --- Filtering Logic ---
const filteredProjects = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  
  return projects.filter(project => {
    // 1. Category Filter
    const matchesCategory = activeCategory.value === 'All' || project.genre === activeCategory.value;
    
    // 2. Search Query (Checks Title, Tags, Stack, and Tagline)
    const searchableText = [
      project.title,
      project.tagline,
      project.stack,
      ...project.tags
    ].join(' ').toLowerCase();
    
    const matchesSearch = !query || searchableText.includes(query);
    
    return matchesCategory && matchesSearch;
  });
});

// --- Actions ---
const clearSearch = () => {
  searchQuery.value = '';
  activeCategory.value = 'All';
  // Return focus to input for keyboard users
  nextTick(() => searchInput.value?.focus());
};

// Auto-focus on desktop mount
onMounted(() => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    searchInput.value?.focus();
  }
});
</script>

<template>
  <div class="page-container">
    <div class="content-wrapper search-layout">
      
      <header class="search-header">
        <div class="search-bar-wrapper">
          <Search class="search-icon" aria-hidden="true" />
          <input 
            ref="searchInput"
            v-model="searchQuery"
            type="text" 
            placeholder="Search projects, stacks, or tags..." 
            class="search-input"
            aria-label="Search projects"
          />
          <button 
            v-if="searchQuery"
            @click="clearSearch"
            class="clear-btn"
            aria-label="Clear search"
          >
            <X size="20" />
          </button>
        </div>

        <div class="filter-row">
          <span class="filter-label">Filter:</span>
          <div class="filter-list">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="activeCategory = cat.id"
              class="filter-pill"
              :class="{ 'is-active': activeCategory === cat.id }"
              :aria-pressed="activeCategory === cat.id"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </header>

      <main class="results-area" aria-live="polite">
        
        <div class="results-meta" v-if="searchQuery || activeCategory !== 'All'">
          <span class="count">{{ filteredProjects.length }} Result{{ filteredProjects.length !== 1 ? 's' : '' }}</span>
          <span v-if="searchQuery" class="query">for "{{ searchQuery }}"</span>
        </div>

        <transition-group name="grid-anim" tag="div" class="poster-grid">
          <article 
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="search-card"
          >
            <router-link :to="`/case-studies/${project.id}`" class="card-link">
              
              <div class="card-layout">
                <div class="card-image" :class="project.imageClass"></div>
                
                <div class="card-content">
                  <div class="card-header">
                    <span class="card-genre">{{ project.genre }}</span>
                    <span class="card-match">{{ project.match }} Match</span>
                  </div>
                  
                  <h3 class="card-title">
                    <span class="highlight-mark" v-if="searchQuery">{{ project.title }}</span>
                    <span v-else>{{ project.title }}</span>
                  </h3>
                  
                  <p class="card-stack">{{ project.stack }}</p>
                  
                  <div class="card-tags">
                    <span v-for="tag in project.tags.slice(0,3)" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
                
                <div class="card-arrow">
                  <ChevronRight />
                </div>
              </div>

            </router-link>
          </article>
        </transition-group>

        <div v-if="filteredProjects.length === 0" class="empty-state">
          <div class="empty-icon-box">
            <Search size="48" stroke-width="1.5" />
          </div>
          <h2 class="empty-title">No matches found</h2>
          <p class="empty-desc">Try adjusting your search terms or filters.</p>
          <button @click="clearSearch" class="btn-reset">Reset Search</button>
        </div>

      </main>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
  min-height: 100vh;
  width: 100%;
  /* Mobile Nav Clearance */
  padding-bottom: var(--space-2xl);
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-xl));
  }
}

.search-layout {
  max-width: 1000px; /* Search is often centered and narrower */
  margin: 0 auto;
  padding-top: var(--space-xl);
  
  @include respond-to('mobile') {
    padding-top: var(--space-lg);
  }
}

/* --- HEADER --- */
.search-header {
  margin-bottom: var(--space-xl);
}

.search-bar-wrapper {
  position: relative;
  margin-bottom: var(--space-lg);
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
  }
}

.search-input {
  width: 100%;
  background: var(--bg-surface);
  border: 2px solid transparent;
  color: white;
  font-size: 1.25rem; /* Large accessible text */
  padding: 1.2rem 3rem 1.2rem 3.5rem;
  border-radius: 8px;
  transition: all 0.2s var(--ease-cinematic);
  
  &::placeholder { color: rgba(255,255,255,0.3); }
  
  &:focus {
    background: var(--bg-surface-hover);
    border-color: var(--brand-primary);
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
  }
  
  @include respond-to('mobile') {
    font-size: 1.1rem;
    padding: 1rem 2.5rem 1rem 3rem;
  }
}

.clear-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover { background: rgba(255,255,255,0.2); color: white; }
}

/* --- FILTERS --- */
.filter-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-tertiary);
  letter-spacing: 0.05em;
}

.filter-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.filter-pill {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--text-secondary);
  padding: 6px 16px;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover { 
    border-color: white; 
    color: white; 
  }
  
  &.is-active {
    background: white;
    color: black;
    border-color: white;
  }
}

/* --- RESULTS AREA --- */
.results-meta {
  margin-bottom: var(--space-lg);
  color: var(--text-tertiary);
  font-size: 0.9rem;
  
  .count { color: white; font-weight: 700; margin-right: 4px; }
  .query { font-style: italic; }
}

.poster-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* --- SEARCH CARD (Horizontal List Style) --- */
.search-card {
  width: 100%;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  
  /* Focus interactions */
  &:hover, &:focus-visible {
    .card-layout {
      background: var(--bg-surface-hover);
      transform: translateX(4px);
      border-color: rgba(255,255,255,0.2);
    }
    .card-arrow { opacity: 1; transform: translateX(0); }
    .card-title { color: var(--brand-primary); }
  }
}

.card-layout {
  display: flex;
  align-items: center;
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: var(--space-sm);
  gap: var(--space-md);
  transition: all 0.2s var(--ease-cinematic);
}

.card-image {
  width: 120px;
  aspect-ratio: 16/9;
  border-radius: 4px;
  flex-shrink: 0;
  
  /* Gradients */
  &.poster-blue { background: linear-gradient(135deg, #1e3a8a, #000); }
  &.poster-purple { background: linear-gradient(135deg, #581c87, #000); }
  &.poster-emerald { background: linear-gradient(135deg, #064e3b, #000); }
  &.poster-orange { background: linear-gradient(135deg, #7c2d12, #000); }
  
  /* Hide image on mobile to save space if needed, usually keep for recognition */
  @include respond-to('mobile') { width: 80px; aspect-ratio: 1; }
}

.card-content {
  flex: 1;
  min-width: 0; /* Text truncation fix */
}

.card-header {
  display: flex;
  gap: var(--space-sm);
  font-size: 0.75rem;
  margin-bottom: 4px;
  
  .card-genre { color: var(--text-tertiary); text-transform: uppercase; font-weight: 700; }
  .card-match { color: var(--status-success); font-weight: 700; }
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @include respond-to('mobile') { font-size: 1rem; }
}

.card-stack {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  margin-bottom: var(--space-xs);
}

.card-tags {
  display: flex;
  gap: 6px;
  
  .tag {
    font-size: 0.7rem;
    color: var(--text-secondary);
    background: rgba(255,255,255,0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
}

.card-arrow {
  color: var(--text-tertiary);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s ease;
  
  @include respond-to('mobile') { display: none; }
}

/* --- EMPTY STATE --- */
.empty-state {
  text-align: center;
  padding: var(--space-2xl) 0;
  color: var(--text-tertiary);
  
  .empty-icon-box {
    background: var(--bg-surface);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-md);
    color: var(--text-secondary);
  }
  
  .empty-title { color: white; font-size: 1.25rem; margin-bottom: var(--space-xs); }
  .btn-reset { margin-top: var(--space-md); color: var(--brand-primary); background: none; border: none; font-weight: 700; cursor: pointer; &:hover { text-decoration: underline; } }
}

/* ANIMATION */
.grid-anim-move,
.grid-anim-enter-active,
.grid-anim-leave-active {
  transition: all 0.3s var(--ease-cinematic);
}
.grid-anim-enter-from,
.grid-anim-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.grid-anim-leave-active { position: absolute; width: 100%; }
</style>