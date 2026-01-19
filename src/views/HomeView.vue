<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { 
  Play, Info, CheckCircle2, AlertTriangle, 
  Monitor, Award, CodeXml 
} from 'lucide-vue-next';



// --- Assets ---
// Placeholders - replace with your actual assets
const FEATURED_IMAGE = './images/hero.png'; 
const FEATURED_VIDEO = './videos/hero.mp4';
// --- State ---
const showVideo = ref(false);
let timer = null;
const VIDEO_DELAY_MS = 3000;

// --- Lifecycle ---
onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery.matches) {
    timer = setTimeout(() => {
      showVideo.value = true;
    }, VIDEO_DELAY_MS);
  }
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});

// --- Static Content ---
const featured = {
  title: "Human-Centered Accessibility for Entertainment Platforms",
  subtitle: "I design and build accessible frontend systems for streaming experiences focused on real users, compliance, and scale.",
};

// --- Projects / Experiments Data ---
// We only display the data points relevant to the "Poster" view
const projects = [
  {
    id: 101, // Unique ID
    title: "Accessible Button Atom",
    category: "Component",
    stack: "Vue 3 / TS",
    compliance: "AA",
    imageClass: "poster-blue",
    tags: ["UI Kit", "Focus", "States"],
  },
  {
    id: 102, // Unique ID
    title: "Icon Button Atom",
    category: "Component",
    stack: "Vue 3 / TS",
    compliance: "AAA",
    imageClass: "poster-purple", // Choose: poster-blue, poster-purple, poster-emerald, poster-orange
    tags: ["Touch Target", "Focus", "Interactive"],
  },
  {
    id: 103,
    title: "Search Input",
    category: "Form",
    stack: "Vue 3 / Debounce",
    compliance: "AAA",
    imageClass: "poster-emerald",
    tags: ["Input", "Focus Mgmt", "Debounce"],
  },
  {
    id: 104,
    title: "Reduced Motion",
    category: "Utility",
    stack: "CSS/JS",
    compliance: "Best Practice",
    imageClass: "poster-orange",
    tags: ["Animation", "Hook"],
  }

];
</script>

<template>
  <div class="page-container">
    
    <header class="hero" role="banner">
      <div class="hero__bg" aria-hidden="true">
        <div 
          class="bg-layer bg-image"
          :style="{ backgroundImage: `url(${FEATURED_IMAGE})` }"
        ></div>
        
        <transition name="crossfade">
          <div v-if="showVideo" class="bg-layer bg-video-wrapper">
             <video 
               class="bg-video" 
               autoplay 
               muted 
               loop 
               playsinline
               disablePictureInPicture
             >
               <source :src="FEATURED_VIDEO" type="video/mp4">
             </video>
          </div>
        </transition>
        
        <div class="bg-layer bg-vignette"></div>
      </div>

      <div class="content-wrapper hero__content">
        <div class="meta-row">
          <span class="meta-badge badge--new">Accessible Technologist</span>
          <span class="meta-text">2026</span>
          <span class="meta-box">CC</span>
          <span class="meta-box">ADA</span>
          <span class="meta-box">AAA</span>
        </div>

        <h1 class="hero__title">{{ featured.title }}</h1>
        <p class="hero__desc">{{ featured.subtitle }}</p>

        <div class="hero__actions">
          <router-link to="/case-studies/101" class="btn btn--primary">
            <Play class="btn-icon" fill="currentColor" />
            <span>Featured Case Study</span>
          </router-link>
          
          <router-link to="/about" class="btn btn--secondary">
            <Info class="btn-icon" />
            <span>More Info</span>
          </router-link>
        </div>
      </div>
    </header>

    <section class="content-wrapper section-trending" aria-labelledby="trending-heading">
      <h2 id="trending-heading" class="section-title">Trending Now</h2>
      
      <div class="grid-posters">
        <article v-for="project in projects" :key="project.id" class="poster-card">
          <router-link :to="`/experiments/${project.id}`" class="poster-link">
            
            <div class="poster-image" :class="project.imageClass">
              <div class="poster-overlay">
                <div class="play-circle"><Play fill="currentColor" /></div>
              </div>
            </div>

            <div class="poster-info">
              <h3 class="poster-title">{{ project.title }}</h3>
              
              <div class="poster-meta">
                <span class="match-score">{{ project.compliance }}</span>
                
                <span class="genre">{{ project.category }}</span>
                
                <span class="hd-badge">{{ project.stack }}</span>
              </div>
              
              <div class="poster-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>

          </router-link>
        </article>
      </div>
    </section>

    <footer class="content-wrapper section-specs">
      <div class="specs-grid">
        <div class="spec">
          <Monitor class="spec-icon" aria-hidden="true" />
          <span><strong>Accessibility</strong> Specialist</span>
        </div>
        <div class="spec">
          <CheckCircle2 class="spec-icon" aria-hidden="true" />
          <span><strong>WCAG 2.2</strong> Certified</span>
        </div>
        <div class="spec">
          <AlertTriangle class="spec-icon text-warning" aria-hidden="true" />
          <span><strong>Risk</strong> Mitigation</span>
        </div>
          <div class="spec">
          <CodeXml class="spec-icon text-icon" aria-hidden="true" />
          <span><strong>Vue / </strong> Nuxt</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

/* CUBE: Composition Layer */
.page-container {
  padding-bottom: var(--space-2xl);
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-lg));
  }
}

/* BLOCK: Hero */
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  @include respond-to('mobile') { min-height: 60vh; }

  &__bg {
    position: absolute;
    inset: 0;
    background-color: var(--bg-body);
    z-index:-1;
  }

  &__content {
    width: 100%;
    z-index: 10;
    margin-top: var(--space-xl);
  }

  &__title {
    font-size: var(--text-hero);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--space-sm);
    max-width: 25ch;
  }

  &__desc {
    font-size: var(--text-h2);
    color: var(--text-secondary);
    max-width: 60ch;
    margin-bottom: var(--space-lg);
  }

  &__actions {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
  }
}

.bg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.bg-image {
  background-size: cover;
  background-position: center top;
  background-color: #0f172a; 
}

.bg-video-wrapper {
  z-index: 1;
  overflow: hidden;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-vignette {
  z-index: 2;
  background: radial-gradient(circle at 75% 25%, rgba(30, 64, 175, 0.2) 0%, transparent 50%),
              linear-gradient(to top, var(--bg-body) 5%, rgba(5, 5, 5, 0.6) 25%, transparent 100%),
              linear-gradient(to right, rgba(5, 5, 5, 0.8) 0%, transparent 60%);
}

.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 2s ease-in-out;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}

/* --- TEXT & UI ELEMENTS --- */
.meta-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-tertiary);
  flex-wrap: wrap;
}

.meta-badge {
  color: var(--status-success);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-box {
  border: 1px solid var(--text-tertiary);
  padding: 1px 4px;
  border-radius: 2px;
  font-size: 0.75rem;
  line-height: 1;
}

/* BLOCK: Trending Section */
.section-trending {
  position: relative;
  z-index: 10;
  margin-top: -3rem;
  @include respond-to('mobile') { margin-top: 0; }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.grid-posters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-md);
  @include respond-to('mobile') { grid-template-columns: 1fr; }
}

/* BLOCK: Poster Card */
.poster-card {
  .poster-link {
    display: block;
    text-decoration: none;
    color: inherit;
    &:hover, &:focus-visible {
      .poster-image {
        transform: scale(1.05);
        border-color: white;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      }
      .poster-overlay { opacity: 1; }
    }
  }
}

.poster-image {
  aspect-ratio: 16/9;
  background: var(--bg-surface);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s var(--ease-cinematic);
  margin-bottom: var(--space-xs);

  &.poster-blue { background: linear-gradient(135deg, #1e3a8a, #000); }
  &.poster-purple { background: linear-gradient(135deg, #581c87, #000); }
  &.poster-emerald { background: linear-gradient(135deg, #064e3b, #000); }
  &.poster-orange { background: linear-gradient(135deg, #7c2d12, #000); }
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
  
  .play-circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid white;
    background: rgba(0,0,0,0.6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.poster-info {
  padding: 0 4px;
}

.poster-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.poster-meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.75rem;
  margin-bottom: 6px;

  .match-score { color: var(--status-success); font-weight: 700; }
  .genre { color: var(--text-secondary); }
  .hd-badge { border: 1px solid var(--text-tertiary); padding: 0 2px; border-radius: 2px; font-size: 0.65rem; }
}

.poster-tags {
  display: flex;
  gap: 8px;
  .tag {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    &::after { content: "•"; margin-left: 8px; }
    &:last-child::after { content: ""; }
  }
}

/* BLOCK: Specs Footer */
.section-specs {
  margin-top: var(--space-2xl);
  padding-top: var(--space-lg);
  border-top: 1px solid rgba(255,255,255,0.1);
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
  color: var(--text-secondary);
  text-align: center;
  
  .spec {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
  }
  
  .spec-icon { color: var(--text-tertiary); }
  .text-warning { color: var(--status-warning); }
}
</style>