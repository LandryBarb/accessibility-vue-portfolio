<script setup>
import { ref } from 'vue';
import { 
  Globe, ExternalLink, Figma, Github, 
  Layout, ArrowUpRight 
} from 'lucide-vue-next';
import { webProjects } from '../data/webProjects';

const projects = ref(webProjects);
</script>

<template>
  <div class="page-container">
    
    <header class="content-wrapper header">
      <div class="header__eyebrow">
        <Globe class="icon" aria-hidden="true" />
        <span>Web Development</span>
      </div>
      <h1 class="header__title">Live Websites & Prototypes</h1>
      <p class="header__desc">
        Production websites and high-fidelity prototypes focusing on responsive design, 
        performance, and accessible navigation structures.
      </p>
    </header>

    <section class="content-wrapper section-grid" aria-live="polite">
      <div class="projects-grid">
        
        <article 
          v-for="item in projects" 
          :key="item.id" 
          class="project-card"
        >
          <component 
            :is="item.liveLink ? 'a' : 'router-link'"
            :href="item.liveLink ? item.liveLink : undefined"
            :to="!item.liveLink ? `/websites/${item.id}` : undefined"
            :target="item.liveLink ? '_blank' : undefined"
            :rel="item.liveLink ? 'noopener noreferrer' : undefined"
            class="card-link"
          >
            
            <div class="card-thumbnail" :class="item.imageClass">
              <img 
                v-if="item.thumbnail" 
                :src="item.thumbnail" 
                :alt="`Thumbnail for ${item.title}`"
                class="thumbnail-img" 
                loading="lazy"
              />
              
              <div class="badge-overlay">
                <span class="compliance-badge">{{ item.compliance }}</span>
              </div>
              
              <div class="hover-overlay">
                <component :is="item.liveLink ? ExternalLink : Layout" class="play-icon" />
                <span class="play-text">{{ item.liveLink ? 'Visit Site' : 'View Details' }}</span>
              </div>
            </div>

            <div class="card-content">
              <h3 class="card-title">
                {{ item.title }}
                <ArrowUpRight v-if="item.liveLink" class="arrow-icon" size="16" />
              </h3>
              <p class="card-desc">{{ item.desc }}</p>
              
              <ul class="card-tags">
                <li v-for="tag in item.tags" :key="tag" class="tag">
                  {{ tag }}
                </li>
              </ul>
            </div>
          </component>

          <div class="card-footer" v-if="item.figmaLink || item.repoLink">
            <a 
              v-if="item.figmaLink" 
              :href="item.figmaLink" 
              target="_blank" 
              class="footer-link"
              aria-label="View Figma Prototype"
            >
              <Figma size="14" />
              <span>Figma</span>
            </a>
            <a 
              v-if="item.repoLink" 
              :href="item.repoLink" 
              target="_blank" 
              class="footer-link"
              aria-label="View Code Repository"
            >
              <Github size="14" />
              <span>Code</span>
            </a>
          </div>

        </article>

      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
  padding-bottom: var(--space-2xl);
  min-height: 100vh;
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

/* --- HEADER --- */
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

/* --- GRID --- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-lg);
  
  @include respond-to('mobile') {
    grid-template-columns: 1fr;
  }
}

/* --- CARD --- */
.project-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;
  cursor: pointer;
  
  &:hover {
    border-color: rgba(255,255,255,0.25);
  }
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  
  &:hover, &:focus-visible {
    .card-thumbnail {
      transform: scale(1.02);
    }
    .hover-overlay { opacity: 1; }
    .card-title { color: var(--brand-primary); }
  }
}

/* Thumbnail Container */
.card-thumbnail {
  aspect-ratio: 16/9;
  background-color: var(--bg-surface);
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s var(--ease-cinematic);

  /* Gradients (Fallbacks) */
  &.poster-emerald { background: linear-gradient(135deg, #064e3b, #0f172a); }
  &.poster-blue { background: linear-gradient(135deg, #1e3a8a, #0f172a); }
  &.poster-purple { background: linear-gradient(135deg, #581c87, #0f172a); }
}

/* The actual image */
.thumbnail-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1; /* Sits above gradient but below badges/overlays */
}

/* Overlays */
.badge-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2; /* Above image */

}

.compliance-badge {
  background-color: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  color:var(--status-warning);
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
  background: rgba(0, 0, 0, 0.774);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3; /* Topmost */

  .play-icon { width: 3rem; height: 3rem; color: white; }
  .play-text { color: var(--brand-primary); font-size: 0.875rem; font-weight: 600; }
}

/* Content */
.card-content {
  padding: var(--space-md);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 6px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .arrow-icon { opacity: 0.5; }
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  line-height: 1.5;
  margin-bottom: var(--space-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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

.card-footer {
  padding: var(--space-xs) var(--space-md) var(--space-md);
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  gap: var(--space-md);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  
  &:hover { color: var(--brand-primary); }
}
</style>