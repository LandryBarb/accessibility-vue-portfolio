<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { caseStudies } from '../data/caseStudies';
import { 
  ArrowLeft, Calendar, User, Layout, Eye, 
  AlertTriangle, CheckCircle2, Code2, Terminal, 
  Play, Video 
} from 'lucide-vue-next';

const route = useRoute();

// --- Data & Computed ---
const project = computed(() => {
  const id = parseInt(route.params.id);
  return caseStudies.find(p => p.id === id) || caseStudies[0];
});

const renderMarkdown = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "gap", label: "The Gap" },
  { id: "evidence", label: "Visual Audit" },
  { id: "constraints", label: "Constraints" },
  { id: "solution", label: "The Solution" },
  { id: "impact", label: "Impact" },
];

// --- Intersection Observer (Active TOC Tracking) ---
const activeSection = ref("overview");
let observer = null;

const setupObserver = () => {
  const options = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top of viewport
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  // Observe all sections defined in TOC
  toc.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  });
};

// --- Scroll Logic ---
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    // Offset for sticky headers/visual comfort
    const offset = 80; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Manually set active immediately for responsiveness
    activeSection.value = id;
  }
};

// --- Video Logic ---
const showHeroVideo = ref(false);
const isAuditPlaying = ref(false);
const auditVideoRef = ref(null);
let heroTimer = null;

const initHeroTimer = () => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery.matches) {
    heroTimer = setTimeout(() => { showHeroVideo.value = true; }, 2000);
  }
};

const playAuditVideo = async () => {
  isAuditPlaying.value = true;
  await nextTick();
  if (auditVideoRef.value) {
    auditVideoRef.value.focus();
  }
};

// --- Lifecycle ---
onMounted(() => {
  initHeroTimer();
  setupObserver();
});

onBeforeUnmount(() => {
  if (heroTimer) clearTimeout(heroTimer);
  if (observer) observer.disconnect();
});

watch(() => route.params.id, () => {
  showHeroVideo.value = false;
  isAuditPlaying.value = false;
  if (heroTimer) clearTimeout(heroTimer);
  // Re-init logic after DOM update
  nextTick(() => {
    initHeroTimer();
    if (observer) observer.disconnect();
    setupObserver();
  });
});
</script>

<template>
  <div class="page-container">
    
    <header class="hero" role="banner">
      <div class="hero__bg" aria-hidden="true">
        <div class="bg-layer bg-image" :style="{ backgroundImage: `url(${project.heroImage})` }"></div>
        <transition name="crossfade">
          <div v-if="showHeroVideo" class="bg-layer bg-video-wrapper">
             <video class="bg-video" autoplay muted loop playsinline>
               <source :src="project.heroVideo" type="video/mp4">
             </video>
          </div>
        </transition>
        <div class="bg-layer bg-vignette"></div>
      </div>

      <div class="content-wrapper hero__content">
        <router-link to="/case-studies" class="back-link">
          <ArrowLeft size="16" aria-hidden="true" />
          <span>Back to Library</span>
        </router-link>

        <h1 class="hero__title">
          {{ project.title }} <br />
          <span class="text-highlight">{{ project.subtitle }}</span>
        </h1>

        <dl class="hero__meta">
          <div class="meta-item">
            <dt><User size="16" class="icon" /></dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div class="meta-item">
            <dt><Calendar size="16" class="icon" /></dt>
            <dd>{{ project.timeline }}</dd>
          </div>
          <div class="meta-item">
            <dt><Layout size="16" class="icon" /></dt>
            <dd>{{ project.stack }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <div class="content-wrapper layout-grid">
      
      <aside class="sidebar-toc">
        <nav aria-label="Table of Contents" class="toc-nav">
          <span class="toc-label">Chapters</span>
          <ul class="toc-list">
            <li v-for="item in toc" :key="item.id">
              <button 
                @click="scrollTo(item.id)" 
                class="toc-link"
                :class="{ 'is-active': activeSection === item.id }"
                :aria-current="activeSection === item.id ? 'true' : undefined"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>
        </nav>

        <div class="compliance-badge">
          <div class="badge-ring">AA</div>
          <div class="badge-text">
            <strong>{{ project.compliance }}</strong>
            <span>Verified Audit</span>
          </div>
        </div>
      </aside>

      <main class="article-content">
        
        <section id="overview" class="section-block">
          <h2 class="section-heading">
            <Eye class="heading-icon" aria-hidden="true" />
            Overview
          </h2>
          <p class="text-body">{{ project.overview }}</p>
        </section>

        <section id="gap" class="section-block">
          <h2 class="section-heading">
            <AlertTriangle class="heading-icon text-warning" aria-hidden="true" />
            The Accessibility Gap
          </h2>
          <div class="grid-barriers">
            <div 
              v-for="(barrier, index) in project.barriers" 
              :key="index" 
              class="card-barrier"
            >
              <h3 class="barrier-title">{{ barrier.title }}</h3>
              <p class="barrier-desc">{{ barrier.desc }}</p>
              <div class="tag-row">
                <span class="tag tag--error">{{ barrier.severity }}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="evidence" class="section-block">
          <h2 class="section-heading">
            <Video class="heading-icon text-highlight" aria-hidden="true" />
            Visual Evidence
          </h2>
          <figure class="media-container">
            <transition name="fade" mode="out-in">
              <div v-if="!isAuditPlaying" class="media-placeholder" key="image">
                <img 
                  :src="project.auditScreenshot" 
                  :alt="`Visual audit screenshot for ${project.title}`" 
                  class="media-image" 
                />
                <div class="media-overlay">
                  <button 
                    class="play-fab" 
                    @click="playAuditVideo"
                    aria-label="Play audit walkthrough video"
                  >
                    <Play fill="currentColor" size="32" class="play-icon" />
                  </button>
                  <span class="overlay-label">Watch Audit Walkthrough</span>
                </div>
              </div>

              <div v-else class="media-player-wrapper" key="video">
                <video 
                  ref="auditVideoRef"
                  class="media-video" 
                  controls 
                  autoplay
                  tabindex="0"
                >
                  <source :src="project.auditVideo" type="video/mp4">
                </video>
              </div>
            </transition>
          </figure>
        </section>

        <section id="constraints" class="section-block">
          <h2 class="section-heading">
            <Terminal class="heading-icon text-accent" aria-hidden="true" />
            Technical Constraints
          </h2>
          <ul class="list-constraints">
            <li 
              v-for="(constraint, i) in project.constraints" 
              :key="i"
              v-html="renderMarkdown(constraint)"
            ></li>
          </ul>
        </section>

        <section id="solution" class="section-block">
          <h2 class="section-heading">
            <Code2 class="heading-icon text-brand" aria-hidden="true" />
            Remediation Strategy
          </h2>
          <div class="code-window">
            <div class="window-header">
              <span class="file-name">{{ project.solution.fileName }}</span>
              <div class="window-controls">
                <span class="dot"></span><span class="dot"></span>
              </div>
            </div>
            <pre class="code-block"><code>{{ project.solution.code }}</code></pre>
          </div>
          <div class="step-list">
            <div v-for="(step, i) in project.solution.steps" :key="i" class="step">
              <span class="step-num">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <p v-html="renderMarkdown(step)"></p>
            </div>
          </div>
        </section>

        <section id="impact" class="section-block">
          <h2 class="section-heading">
            <CheckCircle2 class="heading-icon text-success" aria-hidden="true" />
            Impact & Retrospective
          </h2>
          <div class="impact-card">
            <p class="impact-quote">"{{ project.impact.quote }}"</p>
            <div class="impact-author">
              <div class="author-avatar"></div>
              <div class="author-meta">
                <strong>{{ project.impact.author }}</strong>
                <span>{{ project.impact.context }}</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
 width: 100%;
 
}

/* --- HERO --- */
.hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-xl);
  margin-bottom: var(--space-2xl);
  overflow: hidden;
  width: 100%;

  @include respond-to('mobile') { 
    min-height: 50vh; 
    align-items: center;
    padding-bottom: 0;
  }
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: var(--bg-body);
}

.bg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.bg-image {
  background-size: cover;
  background-position: center;
  background-color: #111;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-vignette {
  z-index: 2;
  background: linear-gradient(to top, var(--bg-body) 10%, rgba(0,0,0,0.7) 100%);
}

.hero__content {
  width: 100%;
  z-index: 10;
  position: relative;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--brand-primary);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  margin-bottom: var(--space-md);
  
  &:hover { text-decoration: underline; }
}

.hero__title {
  font-size: var(--text-hero);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: var(--space-lg);
  max-width: 25ch;
  
  .text-highlight { color: var(--brand-primary); }
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--text-secondary);
    font-weight: 500;
    
    .icon { color: var(--brand-primary); }
  }
}

/* --- LAYOUT GRID --- */
.layout-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--space-2xl);
  align-items: start; /* Prevents sidebar from stretching full height */
  
  @include respond-to('laptop') {
    grid-template-columns: 100%;
    gap: var(--space-lg);
  }
}

/* --- SIDEBAR TOC (UPDATED) --- */
.sidebar-toc {
  position: sticky;
  position: -webkit-sticky;
  /* Top offset accounts for any global fixed nav + gap */
  top: 120px; 
  align-self: start; /* Crucial for grid item stickiness */
  height: fit-content;
  max-height: calc(100vh - 100px);
  min-width: 0;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  
  @include respond-to('laptop') {
    position: sticky; /* Keep it sticky on mobile too if desired, or 'relative' */
    top: 0; /* Stick to top of viewport on mobile */
    z-index: 50; /* Ensure it floats above content */
    background: var(--bg-body); /* Prevent see-through on scroll */
    margin-bottom: var(--space-xl);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: var(--space-md) 0;
    margin-top: -1rem; /* Pull up closer to hero */
  }
}

.toc-nav {
  margin-bottom: var(--space-lg);
  @include respond-to('laptop') { margin-bottom: 0; }
}

.toc-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.05em;
  
  @include respond-to('laptop') { display: none; } /* Hide label on mobile to save space */
}

.toc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-left: 2px solid rgba(255,255,255,0.1);
  padding-left: 0;
  
  /* Mobile: Horizontal scroll pill list */
  @include respond-to('laptop') {
    flex-direction: row;
    border-left: none;
    overflow-x: auto;
    gap: var(--space-xs);
    padding-bottom: 4px;
    scrollbar-width: none; 
    &::-webkit-scrollbar { display: none; }
  }
}

.toc-link {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: var(--text-secondary);
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-left: 2px solid transparent; /* Highlight marker */
  margin-left: -2px; /* Overlap parent border */
  transition: all 0.2s ease;
  
  &:hover { 
    color: var(--brand-primary); 
  }

  /* ACTIVE STATE */
  &.is-active {
    color: var(--brand-primary);
    font-weight: 600;
    border-left-color: var(--brand-primary);
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), transparent);
  }
  
  @include respond-to('laptop') {
    white-space: nowrap;
    border-left: none;
    margin-left: 0;
    background: rgba(255,255,255,0.05);
    padding: 6px 12px;
    border-radius: 99px;
    
    &.is-active {
      background: var(--brand-primary);
      color: white;
    }
  }
}

.compliance-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--bg-surface);
  padding: var(--space-md);
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  
  @include respond-to('laptop') { display: none; } /* Hide extra badge on mobile */
}

.badge-ring {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--status-success);
  color: var(--status-success);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.badge-text {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  span { color: var(--text-tertiary); }
}

/* --- MAIN CONTENT --- */
.article-content {
  max-width: 80ch;
  min-width: 0; 
  width: 100%;
}

.section-block {
  margin-bottom: var(--space-2xl);
  scroll-margin-top: 140px; /* Increased offset for comfortable scrolling */
}

.section-heading {
  font-size: var(--text-h2);
  font-weight: 700;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  
  .heading-icon { opacity: 0.8; }
  .text-warning { color: var(--status-warning); }
  .text-accent { color: #a855f7; }
  .text-brand { color: var(--brand-primary); }
  .text-success { color: var(--status-success); }
}

.text-body {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

/* BARRIERS GRID */
.grid-barriers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  @include respond-to('mobile') { grid-template-columns: 1fr; }
}

.card-barrier {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: var(--space-md);
  border-radius: 8px;
}

.barrier-title {
  color: #fca5a5;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.barrier-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.tag {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  &--error { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
}

/* TECHNICAL CONSTRAINTS */
.list-constraints {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  
  li {
    position: relative;
    padding-left: var(--space-lg);
    &::before {
      content: "→";
      position: absolute;
      left: 0;
      color: #a855f7;
    }
  }
  strong { color: white; }
}

/* CODE BLOCK */
.code-window {
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: var(--space-md) 0;
  font-family: var(--font-mono);
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.window-header {
  background: rgba(255,255,255,0.03);
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-name { font-size: 0.75rem; color: var(--text-tertiary); }
.window-controls { display: flex; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); }

.code-block {
  padding: var(--space-md);
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #e2e8f0;
  white-space: pre;
  width: 100%;
  display: block;
}

.step-list {
  margin-top: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  
  .step {
    display: flex;
    gap: var(--space-md);
    align-items: flex-start;
  }
  
  .step-num {
    font-family: var(--font-mono);
    color: var(--brand-primary);
    font-weight: 700;
    opacity: 0.5;
  }
}

/* IMPACT CARD */
.impact-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: var(--space-xl);
  border-radius: 12px;
}

.impact-quote {
  font-size: 1.25rem;
  font-style: italic;
  color: white;
  margin-bottom: var(--space-lg);
}

.impact-author {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.author-avatar {
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  background: var(--text-tertiary);
}

.author-meta {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  strong { color: white; }
  span { color: var(--text-tertiary); }
}

/* VISUAL EVIDENCE & TRANSITIONS */
.media-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  background: var(--bg-surface);
  position: relative;
  aspect-ratio: 16/9;
  width: 100%;
}

.media-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover .media-image {
    opacity: 0.7;
    transform: scale(1.02);
  }
}

.media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s var(--ease-cinematic);
}

.media-overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  z-index: 2;
}

.play-fab {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  border: 2px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  
  &:hover, &:focus-visible {
    background: var(--brand-primary);
    border-color: var(--brand-primary);
    transform: scale(1.1);
  }
}

.overlay-label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.media-player-wrapper {
  width: 100%;
  height: 100%;
}

.media-video {
  width: 100%;
  height: 100%;
  outline: none;
  
  &:focus-visible {
    outline: 2px solid var(--brand-primary);
    outline-offset: -2px;
  }
}

.crossfade-enter-active, .crossfade-leave-active { transition: opacity 2s ease; }
.crossfade-enter-from, .crossfade-leave-to { opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>