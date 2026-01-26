<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { caseStudies } from '../data/caseStudies';
import {
  ArrowLeft, Calendar, User, Layout, Eye,
  AlertTriangle, CheckCircle2, Code2, Terminal,
  Play, Video, FileText, ChevronDown, ChevronRight,
  ShieldCheck, Monitor
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
  { id: "remediation", label: "Remediation" },
  { id: "verification", label: "Verification" },
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
    const isMobile = window.innerWidth < 1024;
    const offset = isMobile ? 120 : 80;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    activeSection.value = id;
  }
};

// --- Video Logic ---
const showHeroVideo = ref(false);
let heroTimer = null;

// Audit Video State
const isAuditPlaying = ref(false);
const auditVideoRef = ref(null);

// Remediation Video State (New)
const isRemediationPlaying = ref(false);
const remediationVideoRef = ref(null);

const initHeroTimer = () => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mediaQuery.matches) {
    heroTimer = setTimeout(() => { showHeroVideo.value = true; }, 2000);
  }
};

const playAuditVideo = async () => {
  // MUTEX: Stop the other video
  isRemediationPlaying.value = false;
  // if (auditVideoRef.value) {
  //   auditVideoRef.value.pause();
  //   auditVideoRef.value.currentTime = 0;
  // }

  isAuditPlaying.value = true;
  await nextTick();
  if (auditVideoRef.value) {
    auditVideoRef.value.focus();
  }
};

const playRemediationVideo = async () => {

  // MUTEX: Stop the other video
  isAuditPlaying.value = false;
    // if (remediationVideoRef.value) {
    //   remediationVideoRef.value.pause();
    //   remediationVideoRef.value.currentTime = 0;
    // }

  isRemediationPlaying.value = true;
  await nextTick();
  if (remediationVideoRef.value) remediationVideoRef.value.focus();
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
  isRemediationPlaying.value = false; // Reset new state
  if (heroTimer) clearTimeout(heroTimer);
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
        <div class="bg-layer bg-image" :style="{ backgroundImage: `url(${project.media.heroImage})` }"></div>
        <transition name="crossfade">
          <div v-if="showHeroVideo && project.media.heroVideo" class="bg-layer bg-video-wrapper">
            <video class="bg-video" autoplay muted loop playsinline>
              <source :src="project.media.heroVideo" type="video/mp4">
            </video>
          </div>
        </transition>
        <div class="bg-layer bg-vignette"></div>
      </div>

      <div class="content-wrapper hero__content">
        <router-link to="/case-studies" class="back-link">
          <ArrowLeft size="16" aria-hidden="true" />
          <span>Library</span>
        </router-link>

        <div class="hero__header-group">
          <span class="compliance-pill">{{ project.compliance }}</span>
          <h1 class="hero__title">{{ project.title }}</h1>
          <p class="hero__subtitle">{{ project.subtitle }}</p>
        </div>

        <dl class="hero__meta">
          <div class="meta-item">
            <dt>
              <User size="16" class="icon" />
            </dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div class="meta-item">
            <dt>
              <Calendar size="16" class="icon" />
            </dt>
            <dd>{{ project.timeline }}</dd>
          </div>
          <div class="meta-item">
            <dt>
              <Layout size="16" class="icon" />
            </dt>
            <dd>{{ project.stack }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <div class="content-wrapper layout-grid">

      <aside class="sidebar-toc">
        <nav aria-label="Table of Contents" class="toc-nav">
          <ul class="toc-list">
            <li v-for="item in toc" :key="item.id">
              <button @click="scrollTo(item.id)" class="toc-link" :class="{ 'is-active': activeSection === item.id }"
                :aria-current="activeSection === item.id ? 'true' : undefined">
                {{ item.label }}
              </button>
            </li>
          </ul>
        </nav>
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
            <div v-for="(barrier, index) in project.barriers" :key="index" class="card-barrier">
              <div class="barrier-header">
                <h3 class="barrier-title">{{ barrier.title }}</h3>
                <span class="wcag-badge">{{ barrier.wcag }}</span>
              </div>
              <p class="barrier-desc">{{ barrier.description }}</p>
              <div class="tag-row">
                <span class="tag tag--error">Severity: {{ barrier.severity }}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="evidence" class="section-block">
          <h2 class="section-heading">
            <Video class="heading-icon text-highlight" aria-hidden="true" />
            Evidence & Remediation
          </h2>
          <div class="evidence-grid">
            <div class="evidence-col">
              <h3 class="evidence-label text-error">
                <AlertTriangle size="16" /> Before: Audit Findings
              </h3>
              <figure class="media-container">
                <transition name="fade" mode="out-in">
                  <div v-if="!isAuditPlaying || !project.media.auditVideo" class="media-placeholder" key="image">
                    <img :src="project.media.auditScreenshot" alt="Audit Screenshot" class="media-image" />
                    <div v-if="project.media.auditVideo" class="media-overlay">
                      <button class="play-fab" @click="playAuditVideo" aria-label="Play audit video">
                        <Play fill="currentColor" size="32" class="play-icon" />
                      </button>
                      <span class="overlay-label">Watch Audit</span>
                    </div>
                  </div>
                  <div v-else class="media-player-wrapper" key="video">
                    <video ref="auditVideoRef" class="media-video" controls autoplay tabindex="0">
                      <source :src="project.media.auditVideo" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </transition>
              </figure>
            </div>

            <div v-if="project.media.remediationScreenshot || project.media.remediationVideo" class="evidence-col">
              <h3 class="evidence-label text-success">
                <CheckCircle2 size="16" /> After: Remediated
              </h3>

              <figure class="media-container">
                <transition name="fade" mode="out-in">
                  <div v-if="!isRemediationPlaying || !project.media.remediationVideo" class="media-placeholder"
                    key="image">
                    <img :src="project.media.remediationScreenshot || project.media.auditScreenshot"
                      alt="Fixed State Screenshot" class="media-image" />
                    <div v-if="project.media.remediationVideo" class="media-overlay">
                      <button class="play-fab success" @click="playRemediationVideo"
                        aria-label="Play remediation video">
                        <Play fill="currentColor" size="32" class="play-icon" />
                      </button>
                      <span class="overlay-label">Watch Fix</span>
                    </div>
                  </div>
                  <div v-else class="media-player-wrapper" key="video">
                    <video ref="remediationVideoRef" class="media-video" controls autoplay tabindex="0">
                      <source :src="project.media.remediationVideo" type="video/mp4">
                    </video>
                  </div>
                </transition>
              </figure>
            </div>

          </div>

        </section>

        <section id="constraints" class="section-block">
          <h2 class="section-heading">
            <Terminal class="heading-icon text-accent" aria-hidden="true" />
            Constraints
          </h2>
          <ul class="list-constraints">
            <li v-for="(constraint, i) in project.constraints" :key="i">{{ constraint }}</li>
          </ul>
        </section>

        <section id="remediation" class="section-block">
          <h2 class="section-heading">
            <Code2 class="heading-icon text-brand" aria-hidden="true" />
            Remediation
          </h2>
          <div class="code-window">
            <div class="window-header">
              <span class="file-name">{{ project.remediation.fileName }}</span>
              <div class="window-controls"><span class="dot"></span><span class="dot"></span></div>
            </div>
            <pre class="code-block"><code>{{ project.remediation.codeSnippet }}</code></pre>
          </div>
          <div class="step-list">
            <div v-for="(step, i) in project.remediation.steps" :key="i" class="step">
              <span class="step-num">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <p v-html="renderMarkdown(step)"></p>
            </div>
          </div>

          <div v-if="project.remediation.patterns?.length" class="patterns-grid">
            <h3 class="subsection-title">Applied Patterns</h3>
            <div v-for="pattern in project.remediation.patterns" :key="pattern.id" class="pattern-card">
              <div class="pattern-header">
                <span class="pattern-id">{{ pattern.id }}</span>
                <span class="pattern-summary">{{ pattern.summary }}</span>
              </div>
              <div class="pattern-meta">
                <span class="meta-label">Applied to:</span>
                <span class="meta-value">{{ pattern.appliedTo.join(', ') }}</span>
              </div>
              <div v-if="pattern.criteriaMap?.wcag22" class="pattern-tags">
                <span v-for="sc in pattern.criteriaMap.wcag22" :key="sc" class="wcag-tag">{{ sc }}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="verification" class="section-block">
          <h2 class="section-heading">
            <ShieldCheck class="heading-icon text-success" aria-hidden="true" />
            Verification
          </h2>

          <div class="verification-grid">
            <div class="verify-card manual">
              <h3 class="verify-title">Manual Testing</h3>
              <div class="verify-row">
                <span class="verify-label">Keyboard:</span>
                <span v-if="project.verification.manualTesting.keyboard" class="verify-status passed">
                  <CheckCircle2 size="14" /> Verified
                </span>
              </div>
              <div class="verify-row stack">
                <span class="verify-label">Screen Readers:</span>
                <div class="tags">
                  <span v-for="sr in project.verification.manualTesting.screenReaders" :key="sr" class="sr-tag">{{ sr
                    }}</span>
                </div>
              </div>
            </div>

            <div v-if="project.verification.automation" class="verify-card auto">
              <h3 class="verify-title">Automation</h3>
              <ul class="test-list">
                <li v-for="test in project.verification.automation.unit" :key="test">{{ test }}</li>
              </ul>
            </div>
          </div>

          <div v-if="project.verification.evidence?.length" class="evidence-list">
            <h3 class="subsection-title">Evidence of Compliance</h3>
            <div v-for="(ev, idx) in project.verification.evidence" :key="idx" class="evidence-item">
              <h4 class="evidence-summary">{{ ev.summary }}</h4>
              <div class="evidence-details">
                <div class="detail-row">
                  <strong>Steps:</strong>
                  <ul>
                    <li v-for="step in ev.reproSteps" :key="step">{{ step }}</li>
                  </ul>
                </div>
                <div class="detail-row">
                  <strong>Expected:</strong> <span class="text-success">{{ ev.expectedResult }}</span>
                </div>
                <div class="detail-row">
                  <strong>Actual:</strong> <span>{{ ev.actualResult }}</span>
                </div>
              </div>
            </div>
          </div>

          <p class="text-body summary-text">{{ project.verification.summary }}</p>
        </section>

        <section id="impact" class="section-block">
          <h2 class="section-heading">
            <Monitor class="heading-icon text-info" aria-hidden="true" />
            Impact
          </h2>
          <div class="impact-card">
            <p class="impact-quote">"{{ project.impact.quote }}"</p>
            <div class="impact-author">
              <div class="author-meta">
                <strong>{{ project.impact.author }}</strong>
                <span>{{ project.impact.context }}</span>
              </div>
            </div>
          </div>
        </section>

        <section v-if="project.appendix" id="appendix" class="section-block appendix-section">
          <details class="appendix-details">
            <summary class="appendix-summary">
              <FileText size="16" /><span>Appendix</span>
              <ChevronDown class="chevron" />
            </summary>
            <div class="appendix-content">
              <ul v-if="project.appendix.knownLimitations">
                <li v-for="lim in project.appendix.knownLimitations" :key="lim">{{ lim }}</li>
              </ul>

              <div v-if="project.appendix.defectLog?.length" class="defect-log">
                <h4>Defect Log / Audits</h4>
                <div class="table-responsive">
                  <table class="defect-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Severity</th>
                        <th>Issue</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="defect in project.appendix.defectLog" :key="defect.id">
                        <td>{{ defect.id }}</td>
                        <td><span :class="`severity-${defect.severity.toLowerCase()}`">{{ defect.severity }}</span></td>
                        <td>{{ defect.issue }}</td>
                        <td><span class="status-pill">{{ defect.status }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </details>
        </section>

      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

/* --- BASE TYPOGRAPHY & UTILS --- */
.subsection-title {
  font-size: 1rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  margin: var(--space-lg) 0 var(--space-md);
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: var(--space-xs);
}

/* --- HERO SECTION --- */
.hero {
  position: relative;
  min-height: 55vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-xl);
  margin-bottom: var(--space-2xl);
  width: 100%;
  overflow: hidden;
  isolation: isolate;

  @include respond-to('laptop') {
    min-height: 45vh;
    padding-bottom: var(--space-lg);
    align-items: center;
  }
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: var(--z-back);
  background-color: var(--bg-body);
}

.bg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-normal);
}

.bg-image {
  background-size: cover;
  background-position: center;
  background-color: #111;
  background-repeat: no-repeat;
  opacity: 0.4;
}

.bg-video-wrapper {
  z-index: var(--z-normal);
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.bg-vignette {
  z-index: 2;
  background: linear-gradient(to top, var(--bg-body) 15%, rgba(0, 0, 0, 0.8) 100%);
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
  color: var(--text-tertiary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: var(--text-xs);
  text-decoration: none;
  margin-bottom: var(--space-lg);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--brand-primary);
  }
}

.hero__header-group {
  margin-bottom: var(--space-lg);
}

.compliance-pill {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 800;
  color: var(--status-success);
  border: 1px solid var(--status-success);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: var(--space-sm);
}

.hero__title {
  font-size: var(--text-hero);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: var(--space-xs);
  max-width: 25ch;
  color: var(--text-primary);
  word-wrap: break-word;
}

.hero__subtitle {
  font-size: var(--text-h2);
  color: var(--text-secondary);
  font-weight: 400;
  max-width: 60ch;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--space-md);

  @include respond-to('mobile') {
    gap: var(--space-md);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: var(--text-secondary);
    font-size: var(--text-sm);

    .icon {
      color: var(--brand-primary);
    }
  }
}

/* --- LAYOUT GRID --- */
.layout-grid {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  gap: var(--space-2xl);
  align-items: start;

  @include respond-to('laptop') {
    grid-template-columns: 100%;
    gap: var(--space-lg);
  }
}

/* --- SIDEBAR NAV --- */
.sidebar-toc {
  position: sticky;
  top: var(--space-2xl);
  height: fit-content;

  @include respond-to('laptop') {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    margin: 0 calc(var(--space-sm) * -1);
    padding: var(--space-sm);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: var(--space-xl);
  }
}

.toc-nav {
  width: 100%;
  overflow: hidden;
}

.toc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 2px solid rgba(255, 255, 255, 0.05);

  @include respond-to('laptop') {
    flex-direction: row;
    border-left: none;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 var(--space-md) 4px var(--space-md);
    padding-bottom: 8px;
    gap: var(--space-sm);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.toc-link {
  display: block;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
  padding: 6px 16px;
  cursor: pointer;
  border-left: 2px solid transparent;
  margin-left: -2px;
  transition: all var(--duration-fast);

  &:hover {
    color: var(--text-primary);
  }

  &.is-active {
    color: var(--brand-primary);
    border-left-color: var(--brand-primary);
    font-weight: 600;
  }

  @include respond-to('laptop') {
    white-space: nowrap;
    border-left: none;
    margin-left: 0;
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 12px;
    border-radius: 99px;

    &.is-active {
      background: var(--brand-primary);
      color: white;
    }
  }
}

/* --- MAIN CONTENT --- */
.article-content {
  max-width: 80ch;
  width: 100%;
  min-width: 0;

  @include respond-to('laptop') {
    padding: 0 var(--space-sm);
  }
}

.section-block {
  margin-bottom: var(--space-2xl);
  scroll-margin-top: 140px;
}

.section-heading {
  font-size: var(--text-h2);
  font-weight: 700;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-primary);

  .heading-icon {
    opacity: 0.8;
  }

  .text-warning {
    color: var(--status-warning);
  }

  .text-accent {
    color: var(--code-purple);
  }

  .text-brand {
    color: var(--brand-primary);
  }

  .text-success {
    color: var(--status-success);
  }

  .text-info {
    color: var(--status-info);
  }

  .text-highlight {
    color: var(--text-primary);
  }
}

.text-body {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--text-secondary);
}

/* --- BARRIERS GRID --- */
.grid-barriers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
}

.card-barrier {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: var(--space-md);
  border-radius: 8px;
}

.barrier-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-xs);
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.barrier-title {
  color: #fca5a5;
  font-weight: 700;
  font-size: var(--text-body);
}

.wcag-badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: rgba(252, 165, 165, 0.8);
  border: 1px solid rgba(252, 165, 165, 0.3);
  padding: 1px 4px;
  border-radius: 2px;
}

.barrier-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.tag--error {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  color: #fca5a5;
}

/* --- EVIDENCE MEDIA --- */
.evidence-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-sm);
  
  @include respond-to('tablet') {
    grid-template-columns: 1fr; /* Stack on mobile/tablet */
    gap: var(--space-lg);
  }
}

.evidence-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.evidence-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &.text-error { color: #fca5a5; }
  &.text-success { color: var(--status-success); }
}

.media-container {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16/9;
  width: 100%;
  position: relative;
}

.media-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover .media-image {
    opacity: 0.6;
  }
}

.media-image,
.media-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity var(--duration-fast);
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
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--duration-fast);

  &:hover {
    transform: scale(1.1);
    background: var(--brand-primary);
    border-color: var(--brand-primary);
  }
  &.success {
    &:hover {
      background: var(--status-success);
      border-color: var(--status-success);
    }
  }

}

.overlay-label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: var(--text-xs);
  text-shadow: 0 2px 4px black;
}

/* --- CONSTRAINTS --- */
.list-constraints {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  li {
    position: relative;
    padding-left: var(--space-lg);
    color: var(--text-secondary);

    &::before {
      content: "→";
      position: absolute;
      left: 0;
      color: var(--code-purple);
    }
  }
}

/* --- REMEDIATION --- */
.code-window {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: var(--space-lg);
}

.window-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.file-name {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.window-controls {
  display: flex;
  gap: 4px;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
}

.code-block {
  padding: var(--space-md);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.5;
  color: #e2e8f0;
  white-space: pre;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  .step {
    display: flex;
    gap: var(--space-md);
  }

  .step-num {
    font-family: var(--font-mono);
    color: var(--brand-primary);
    font-weight: 700;
    opacity: 0.6;
    min-width: 2ch;
  }
}

/* --- NEW: REMEDIATION PATTERNS --- */
.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.pattern-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-md);
  border-radius: 6px;
}

.pattern-header {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-sm);

  .pattern-id {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--brand-primary);
  }

  .pattern-summary {
    font-weight: 600;
    color: var(--text-primary);
  }
}

.pattern-meta {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);

  .meta-label {
    color: var(--text-tertiary);
    font-size: 0.75rem;
    text-transform: uppercase;
    margin-right: 4px;
  }
}

.wcag-tag {
  display: inline-block;
  font-size: 0.7rem;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-right: 4px;
}

/* --- VERIFICATION GRID --- */
.verification-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-md);

  @include respond-to('mobile') {
    grid-template-columns: 1fr;
  }
}

.verify-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: var(--space-md);
  border-radius: 6px;

  &.manual {
    border-top: 2px solid var(--status-success);
  }

  &.auto {
    border-top: 2px solid var(--status-info);
  }
}

.verify-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}

.verify-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9rem;
  margin-bottom: var(--space-sm);

  &.stack {
    flex-direction: column;
    align-items: flex-start;
  }
}

.verify-label {
  color: var(--text-tertiary);
}

.verify-status.passed {
  color: var(--status-success);
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
}

.sr-tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  font-size: var(--text-xs);
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
}

.test-list {
  list-style: disc;
  padding-left: 1.2rem;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.summary-text {
  font-style: italic;
  border-left: 2px solid var(--text-tertiary);
  padding-left: var(--space-md);
}

/* --- NEW: EVIDENCE LIST --- */
.evidence-list {
  margin-top: var(--space-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--space-md);
}

.evidence-item {
  margin-bottom: var(--space-lg);

  .evidence-summary {
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
    font-size: 1rem;
  }

  .evidence-details {
    background: rgba(0, 0, 0, 0.2);
    padding: var(--space-md);
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .detail-row {
    margin-bottom: var(--space-sm);
  }

  ul {
    padding-left: 1.2rem;
    margin-top: 4px;
    color: var(--text-secondary);
  }
}

/* --- IMPACT --- */
.impact-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: var(--space-xl);
  border-radius: 8px;

  @include respond-to('mobile') {
    padding: var(--space-lg);
  }
}

.impact-quote {
  font-size: var(--text-h2);
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: var(--space-lg);
}

.author-meta {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;

  strong {
    color: var(--text-primary);
  }

  span {
    color: var(--text-tertiary);
  }
}

/* --- APPENDIX --- */
.appendix-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--space-lg);
}

.appendix-details {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.appendix-summary {
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 600;
  color: var(--text-secondary);

  &:hover {
    color: var(--text-primary);
  }

  .chevron {
    margin-left: auto;
    transition: transform var(--duration-fast);
  }
}

.appendix-details[open] .chevron {
  transform: rotate(180deg);
}

.appendix-content {
  padding: 0 var(--space-md) var(--space-md);
  color: var(--text-secondary);
  font-size: 0.9rem;

  ul {
    padding-left: 1.2rem;
  }
}

/* --- NEW: DEFECT LOG TABLE --- */
.defect-log {
  margin-top: var(--space-lg);
}

.defect-log h4 {
  margin-bottom: var(--space-sm);
  color: var(--text-secondary);
}

/* Responsive Table Container */
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: var(--space-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
}

.defect-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  /* Ensure structure on small screens */

  th,
  td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: top;
  }

  th {
    color: var(--text-tertiary);
    font-weight: 600;
    background: rgba(255, 255, 255, 0.02);
  }

  td {
    color: var(--text-secondary);
  }

  .severity-critical {
    color: var(--status-error);
    font-weight: 700;
  }

  .severity-high {
    color: #fca5a5;
  }

  .status-pill {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
  }
}

/* TRANSITIONS */
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 2s ease;
}

.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>