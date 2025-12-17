<script setup>
import { ref } from 'vue';
import { projects } from '../content/projects';
import { 
  Star, Play, Info, MoreVertical, 
  ArrowRightCircle, PlusCircle, CheckCircle, CheckCircle2, Share2 
} from 'lucide-vue-next';

// --- Static Data ---
const featuredHero = {
  title: "Cognitive Accessibility in Design Systems",
  subtitle: "Reducing cognitive load through strict consistency and predictable navigation patterns.",
  tags: ["Editor's Choice", "System Design"],
  imageClass: "hero-gradient-indigo" 
};

const library = ref([
  { 
    id: 1, 
    title: "Global Player Redesign", 
    tagline: "Fixing the 10ft Experience",
    compliance: "WCAG AA",
    role: "Lead Engineer",
    imageClass: "poster-blue",
    saved: false
  },
  { 
    id: 2, 
    title: "TVOS Discovery", 
    tagline: "Solving Grid Navigation",
    compliance: "VoiceOver Optimized",
    role: "Audit Lead",
    imageClass: "poster-purple",
    saved: false
  },
  { 
    id: 3, 
    title: "Live Sports Captions", 
    tagline: "Real-time Text Engines",
    compliance: "FCC / CVAA",
    role: "System Architect",
    imageClass: "poster-emerald",
    saved: false
  },
  { 
    id: 4, 
    title: "Design System 2.0", 
    tagline: "The A11y Component Library",
    compliance: "Internal AAA",
    role: "Maintainer",
    imageClass: "poster-orange",
    saved: false
  }
]);

// --- Interactive Logic ---

// 1. Toggle "Save to Shortlist"
const toggleSave = (id) => {
  const item = library.value.find(i => i.id === id);
  if (item) {
    item.saved = !item.saved;
    // In a real app, this would persist to local storage or DB
  }
};

// 2. Share / Context Menu
const handleShare = (title) => {
  // Simple feedback for the portfolio demo
  alert(`Share link for "${title}" copied to clipboard!`);
};
</script>
<template>
  <div class="page-container">
    
    <header class="showcase-hero" role="banner">
      <div class="hero-bg" :class="featuredHero.imageClass" aria-hidden="true"></div>
      <div class="content-wrapper hero-content">
        <div class="meta-tag">
          <Star size="14" fill="currentColor" />
          <span>Featured Case Study</span>
        </div>
        <h1 class="hero-title">{{ featuredHero.title }}</h1>
        <p class="hero-desc">{{ featuredHero.subtitle }}</p>
        <div class="hero-actions">
          <router-link to="/case-studies/featured" class="btn btn--white">
            <Play class="icon-fill" fill="currentColor" aria-hidden="true" />
            <span>Read Case Study</span>
          </router-link>
        </div>
      </div>
    </header>

    <section class="content-wrapper section-library">
      <div class="section-header">
        <h2 class="section-title">My Library</h2>
        <span class="count-badge">{{ library.length }} Items</span>
      </div>

      <div class="poster-grid">
        <article v-for="item in library" :key="item.id" class="vertical-card">
          
          <div class="card-poster" :class="item.imageClass">
            <div class="poster-badge">
              <CheckCircle2 size="12" />
              <span>{{ item.compliance }}</span>
            </div>
            <div class="poster-overlay">
              <div class="play-btn">
                <Play fill="currentColor" size="24" />
              </div>
            </div>
          </div>

          <div class="card-info">
            <h3 class="card-title">
              <router-link :to="`/case-studies/${item.id}`" class="main-link">
                {{ item.title }}
              </router-link>
            </h3>
            <p class="card-tagline">{{ item.tagline }}</p>
            
            <div class="action-row">
              <span class="details-label">
                <ArrowRightCircle size="16" />
                Details
              </span>
              
              <div class="spacer"></div>
              
              <button 
                class="action-btn icon-only" 
                :class="{ 'is-active': item.saved }"
                @click.stop.prevent="toggleSave(item.id)"
                :aria-label="item.saved ? 'Remove from shortlist' : 'Add to shortlist'"
              >
                <CheckCircle v-if="item.saved" size="20" class="text-success" />
                <PlusCircle v-else size="20" />
              </button>
              
              <button 
                class="action-btn icon-only" 
                @click.stop.prevent="handleShare(item.title)"
                aria-label="Share case study"
              >
                <MoreVertical size="20" />
              </button>
            </div>
          </div>

        </article>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
  min-height: 100vh;
  width: 100%;
  padding-bottom: var(--space-2xl);
  
  /* Clear Fixed Bottom Nav on Mobile */
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-xl));
  }
}

.content-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  width: 100%;
  
  @include respond-to('mobile') { 
    padding: 0 var(--space-sm); 
  }
}

/* --- HERO (Condensed Version) --- */
.showcase-hero {
  position: relative;
  height: 50vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-xl);
  margin-bottom: var(--space-xl);
  overflow: hidden;
  
  @include respond-to('mobile') {
    height: auto;
    min-height: 45vh;
    align-items: center;
    text-align: center;
    padding-top: var(--space-2xl); /* Add top padding for spacing */
    padding-bottom: var(--space-lg);
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  /* Cinematic Vignette */
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  
  &.hero-gradient-indigo {
    background: radial-gradient(circle at 70% 30%, #4338ca 0%, #000 70%);
  }
}

.hero-content {
  width: 100%;
  z-index: 10;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--status-warning);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-sm);
  width: 100%;
  
  @media (min-width: 640px) { 
    width: auto; 
    justify-content: flex-start; 
  }
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-xs);
  max-width: 25ch;
  
  @include respond-to('mobile') { 
    margin-inline: auto; 
  }
}

.hero-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 60ch;
  margin-bottom: var(--space-lg);
  
  @include respond-to('mobile') { 
    margin-inline: auto; 
    font-size: 1rem;
  }
}

.hero-actions {
  @include respond-to('mobile') {
    display: flex;
    justify-content: center;
  }
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease;
  font-size: 1rem;
  
  &--white {
    background: white;
    color: black;
    border: 2px solid white;
    &:hover { background: rgba(255,255,255,0.9); transform: scale(1.02); }
  }
  
  @include respond-to('mobile') { 
    width: 100%; 
    justify-content: center; 
  }
}

/* --- LIBRARY GRID --- */
.section-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: var(--space-sm);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.count-badge {
  color: var(--text-tertiary);
  font-size: 0.9rem;
  font-family: var(--font-mono);
}

/* THE POSTER GRID */
.poster-grid {
  display: grid;
  /* Desktop: Auto-fill based on poster width */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-lg) var(--space-md);
  
  /* Mobile: Strictly 2 columns (Standard streaming pattern) */
  @include respond-to('mobile') {
    grid-template-columns: repeat(2, 1fr); 
    gap: var(--space-md) var(--space-sm);
  }
}

/* --- VERTICAL CARD (Stretched Link Logic) --- */
.vertical-card {
  position: relative; /* Context for stretched link */
  
  /* Hover Effects */
  &:hover {
    .card-poster {
      transform: scale(1.05);
      border-color: white;
      box-shadow: 0 12px 40px rgba(0,0,0,0.6);
      z-index: 5;
    }
    .poster-overlay { opacity: 1; }
    .main-link { color: var(--brand-primary); }
  }
}

/* The Poster Image (2:3 Aspect Ratio) */
.card-poster {
  aspect-ratio: 2/3;
  background-color: var(--bg-surface);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s var(--ease-cinematic);
  margin-bottom: var(--space-sm);
  
  /* Gradients mimicking movie posters */
  &.poster-blue { background: linear-gradient(160deg, #1e3a8a 0%, #000 80%); }
  &.poster-purple { background: linear-gradient(160deg, #581c87 0%, #000 80%); }
  &.poster-emerald { background: linear-gradient(160deg, #064e3b 0%, #000 80%); }
  &.poster-orange { background: linear-gradient(160deg, #7c2d12 0%, #000 80%); }
}

.poster-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(4px);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
}

.poster-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  /* Hide on touch devices to prevent stuck hover states */
  @include respond-to('mobile') { display: none; }
  
  .play-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(30,30,30,0.9);
    border: 2px solid white;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Card Info */
.card-info {
  padding: 0 2px;
}

.main-link {
  font-size: 1rem; font-weight: 700;
  text-decoration: none; color: inherit;
  transition: color 0.2s;
  
  /* THE MAGIC: Stretched Link */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1; /* Sits above background, below buttons */
  }
  
  &:focus-visible {
    outline: none;
    text-decoration: underline;
    /* Focus ring on the parent card for visual clarity */
  }
}

.vertical-card:focus-within .card-poster {
  border-color: white; /* Visual focus indicator for keyboard users */
}

.card-tagline {
  font-size: 0.8rem; color: var(--text-tertiary);
  margin-bottom: var(--space-sm);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Action Row */
.action-row {
  display: flex; align-items: center; gap: 8px;
  position: relative; 
  z-index: 10; /* Lifts buttons above the stretched link */
  
  @include respond-to('mobile') { display: none; }
}

.spacer { flex: 1; }

.details-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

.action-btn {
  background: transparent; border: none;
  color: var(--text-tertiary); cursor: pointer;
  padding: 6px; border-radius: 50%;
  transition: all 0.2s; display: flex; align-items: center; justify-content: center;
  
  &:hover { background: rgba(255,255,255,0.1); color: white; }
  
  &.is-active {
    color: var(--status-success);
    .text-success { color: var(--status-success); }
  }
}
</style>