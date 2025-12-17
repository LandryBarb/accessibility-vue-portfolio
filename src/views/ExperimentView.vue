<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { experiments } from '../content/projects';
import { 
  ArrowLeft, Github, ExternalLink, 
  Code2, CheckCircle2, Layers, Cpu 
} from 'lucide-vue-next';

// --- 1. Dynamic Component Imports ---
// This lazy loads the components so they don't bloat the initial bundle
const componentMap = { 
  
  'BaseButton': defineAsyncComponent(() => import('../components/content/BaseButton.vue')),
};

const route = useRoute();

const experiment = computed(() => {
  const id = parseInt(route.params.id);
  // Fallback to first if not found
  return experiments.find(e => e.id === id) || experiments[0];
});

// --- 2. Resolve the Active Component ---
const ActiveDemo = computed(() => {
  if (!experiment.value.componentKey) return null;
  return componentMap[experiment.value.componentKey];
});
</script>

<template>
  <div class="page-container">
    
    <header class="app-header content-wrapper">
      <router-link to="/portfolio" class="back-link">
        <ArrowLeft size="20" />
        <span>Back to Portfolio</span>
      </router-link>
      <div class="header-meta">
        <span class="badge badge--outline">{{ experiment.category }}</span>
      </div>
    </header>

    <main class="content-wrapper experiment-layout">
      
     <section class="stage-area">
        <div class="stage-window">
          <div class="stage-content">
            
            <div v-if="ActiveDemo" class="live-demo-wrapper">
              <component :is="ActiveDemo" />
            </div>

            <div v-else class="placeholder-demo">
              <Code2 size="64" class="placeholder-icon" />
              <p>Interactive Component Preview</p>
              <span class="sub-text">(Static Build - Code View Only)</span>
            </div>

          </div>
        </div>

        <div class="code-snippet">
          <h3 class="section-label">Implementation Snippet</h3>
          <pre><code>{{ experiment.codeSnippet || '' }}</code></pre>
        </div>
      </section>

      <aside class="details-panel">
        <h1 class="exp-title">{{ experiment.title }}</h1>
        <p class="exp-desc">{{ experiment.desc }}</p>

        <div class="specs-list">
          <div class="spec-item">
            <Layers class="spec-icon" />
            <div>
              <span class="label">Stack</span>
              <span class="value">{{ experiment.stack }}</span>
            </div>
          </div>
          
          <div class="spec-item">
            <CheckCircle2 class="spec-icon text-success" />
            <div>
              <span class="label">Compliance</span>
              <span class="value">{{ experiment.compliance }}</span>
            </div>
          </div>

          <div class="spec-item">
            <Cpu class="spec-icon" />
            <div>
              <span class="label">Complexity</span>
              <span class="value">Low (Atomic)</span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <a :href="experiment.repoLink" target="_blank" class="btn btn--primary">
            <Github size="18" />
            <span>View Repo</span>
          </a>
          <a :href="experiment.demoLink" target="_blank" class="btn btn--secondary">
            <ExternalLink size="18" />
            <span>Live Demo</span>
          </a>
        </div>
      </aside>

    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
  min-height: 100vh;
  padding-bottom: var(--space-2xl);
  /* Clear mobile nav */
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
.app-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: var(--space-xl);
  
  @include respond-to('mobile') {
    height: 60px;
    margin-bottom: var(--space-lg);
  }
}

.back-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-tertiary);
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;
  &:hover { color: white; }
  
  /* Hide text on very small screens if needed, or keep for clarity */
  span {
    @include respond-to('mobile') { font-size: 0.9rem; }
  }
}

/* --- LAYOUT --- */
.experiment-layout {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Desktop: 2/3 Stage, 1/3 Details */
  gap: var(--space-2xl);
  
  @include respond-to('laptop') {
    grid-template-columns: 1fr; /* Stack vertically */
    gap: var(--space-xl);
  }
}

/* --- STAGE (Left Col) --- */
.stage-window {
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: var(--space-lg);
}

.window-bar {
  background: rgba(255,255,255,0.05);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  
  .traffic-lights {
    display: flex;
    gap: 8px;
    margin-right: var(--space-md);
    
    .light {
      width: 12px; height: 12px; border-radius: 50%;
      &.red { background: #ff5f56; }
      &.yellow { background: #ffbd2e; }
      &.green { background: #27c93f; }
    }
  }
  
  .window-title {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-tertiary);
  }
}

.stage-content {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
  
  @include respond-to('mobile') {
    aspect-ratio: 4/3; /* Taller on mobile for better visibility */
    
  }
}

.placeholder-demo {
  text-align: center;
  color: var(--text-tertiary);
  
  .placeholder-icon { margin-bottom: var(--space-sm); opacity: 0.5; }
  p { font-weight: 700; color: white; }
  .sub-text { font-size: 0.8rem; opacity: 0.7; }
}

.code-snippet {
  background: rgba(255,255,255,0.03);
  padding: var(--space-md);
  border-radius: 8px;
  font-family: var(--font-mono);
  border: 1px solid rgba(255,255,255,0.05);
  overflow-x: auto;
  
  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: var(--space-sm);
    letter-spacing: 0.05em;
  }
  
  code { color: var(--code-purple); font-size: 0.9rem; }
}

/* --- DETAILS (Right Col) --- */
.details-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.exp-title {
  font-size: var(--text-h2);
  line-height: 1.1;
  font-weight: 800;
}

.exp-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.specs-list {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.spec-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  
  &:last-child { border-bottom: none; padding-bottom: 0; }
  
  .spec-icon { color: var(--text-tertiary); flex-shrink: 0; }
  .text-success { color: var(--status-success); }
  
  div {
    display: flex;
    flex-direction: column;
    .label { font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase; }
    .value { font-weight: 700; color: white; }
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  
  .btn { width: 100%; justify-content: center; }
}

/* Add this to center your live components nicely */
.live-demo-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  overflow: auto; /* In case component is large */
}
</style>