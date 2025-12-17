<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Play, Info, CheckCircle2, AlertTriangle, Monitor, Award } from 'lucide-vue-next';

// --- Assets (Replace with your real files) ---
// Ideally, import these from your assets folder or use a CMS
const FEATURED_IMAGE = '../images/hero/screenshot.png'; 
const FEATURED_VIDEO = '../videos/streaming-player-accessibility.mp4';

// --- State ---
const showVideo = ref(false);
let timer = null;
const VIDEO_DELAY_MS = 3000; // 3 Seconds like Hulu/Netflix

// --- Lifecycle ---
onMounted(() => {
  // A11y: Check for reduced motion preference before enabling auto-play behaviors
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

// Static Content
const featured = {
  title: "Ensuring entertainment is for everyone.",
  subtitle: "Senior Accessibility Engineer specializing in 10-foot experiences and WCAG compliance for streaming.",
};

const projects = [
  { id: 1, title: "Global Player Redesign", genre: "Case Study", meta: ["TVOS", "Focus"], imageClass: "poster-blue", match: "98%" },
  { id: 2, title: "Discovery Interface", genre: "Audit", meta: ["Grid", "Screen Reader"], imageClass: "poster-purple", match: "95%" },
  { id: 3, title: "Live Captioning System", genre: "System Design", meta: ["Real-time", "Cognitive"], imageClass: "poster-emerald", match: "99%" },
  { id: 4, title: "10ft Design System", genre: "Docs", meta: ["Components", "Aria"], imageClass: "poster-orange", match: "92%" }
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
      </div>

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

      <div class="content-wrapper hero__content">
        <div class="meta-row">
          <span class="meta-badge badge--new">New Premiere</span>
          <span class="meta-text">2024</span>
          <span class="meta-box">CC</span>
          <span class="meta-box">AD</span>
          <span class="meta-box">AAA</span>
        </div>

        <h1 class="hero__title">{{ featured.title }}</h1>
        <p class="hero__desc">{{ featured.subtitle }}</p>

        <div class="hero__actions">
          <router-link to="/case-studies/1" class="btn btn--primary">
            <Play class="btn-icon" fill="currentColor" />
            <span>Play Case Study</span>
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
          <router-link :to="`/case-studies/${project.id}`" class="poster-link">
            
            <div class="poster-image" :class="project.imageClass">
              <div class="poster-overlay">
                <div class="play-circle"><Play fill="currentColor" /></div>
              </div>
            </div>

            <div class="poster-info">
              <h3 class="poster-title">{{ project.title }}</h3>
              
              <div class="poster-meta">
                <span class="match-score">{{ project.match }} Match</span>
                <span class="genre">{{ project.genre }}</span>
                <span class="hd-badge">HD</span>
              </div>
              
              <div class="poster-tags">
                <span v-for="tag in project.meta" :key="tag" class="tag">{{ tag }}</span>
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
          <span><strong>10-foot UI</strong> Specialist</span>
        </div>
        <div class="spec">
          <CheckCircle2 class="spec-icon" aria-hidden="true" />
          <span><strong>WCAG 2.2</strong> Certified</span>
        </div>
        <div class="spec">
          <AlertTriangle class="spec-icon text-warning" aria-hidden="true" />
          <span><strong>Risk</strong> Mitigation</span>
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
  /* Adjust for mobile nav bottom bar */
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-lg));
  }
}


/* BLOCK: Hero */
.hero {
  position: relative;
  min-height: 80vh; /* Viewport height */
  display: flex;
  align-items: center;
  overflow: hidden;

  /* Make sure the background stays behind content */
  isolation: isolate;

  /* Responsive height */
  @include respond-to('mobile') { min-height: 60vh; }

  /* Background Management */
  &__bg {
    position: absolute;
    inset: 0;
    /* Cinematic Gradient */
    background-color: var(--bg-body);
   // background: radial-gradient(circle at 80% 20%, rgba(30, 64, 175, 0.4) 0%, transparent 60%),
              // linear-gradient(to top, var(--bg-body) 10%, transparent 100%);
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
    font-size: var(--text-h2); /* Responsive font var */
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
  /* If no image loads, fall back to dark blue/black gradient */
  background-color: #0f172a; 
}

.bg-video-wrapper {
  z-index: 1; /* Sits on top of image */
  overflow: hidden;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* The Vignette: Crucial for text readability */
.bg-vignette {
  z-index: 2; /* Sits on top of video and image */
  background: radial-gradient(circle at 75% 25%, rgba(30, 64, 175, 0.2) 0%, transparent 50%),
              linear-gradient(to top, var(--bg-body) 5%, rgba(5, 5, 5, 0.6) 25%, transparent 100%),
              linear-gradient(to right, rgba(5, 5, 5, 0.8) 0%, transparent 60%);
}

/* Transition: Smooth Crossfade */
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 2s ease-in-out;
}

.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
/* --- TEXT & UI ELEMENTS --- */
/* BLOCK: Meta Row (Tags) */
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



/* BLOCK: Trending Section (Grid) */
.section-trending {
  position: relative;
  z-index: 10;
  margin-top: -3rem; /* Overlap effect */
  
  @include respond-to('mobile') { margin-top: 0; }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.grid-posters {
  display: grid;
  /* Auto-fit handles responsiveness perfectly without explicit media queries */
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-md);
  
  @include respond-to('mobile') {
    /* On very small screens, 1 col */
    grid-template-columns: 1fr; 
  }
}

/* BLOCK: Poster Card */
.poster-card {
  .poster-link {
    display: block;
    text-decoration: none;
    color: inherit;

    /* Focus/Hover Interactions */
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

  /* Gradients */
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