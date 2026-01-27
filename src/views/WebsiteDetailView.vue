<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { webProjects } from '../data/webProjects';
import { 
  ArrowLeft, ExternalLink, Figma, Github, 
  Layout, CheckCircle2, Globe 
} from 'lucide-vue-next';

const route = useRoute();

const project = computed(() => {
  const id = parseInt(route.params.id);
  return webProjects.find(p => p.id === id) || webProjects[0];
});
</script>

<template>
  <div class="page-container">
    
    <header class="project-header">
      <div class="content-wrapper">
        <router-link to="/websites" class="back-link">
          <ArrowLeft size="16" />
          <span>Back to Websites</span>
        </router-link>

        <div class="header-content">
          <div class="header-main">
            <div class="meta-row">
              <span class="compliance-badge">{{ project.compliance }}</span>
              <span class="stack-text">{{ project.stack }}</span>
            </div>
            
            <h1 class="project-title">{{ project.title }}</h1>
            <p class="project-desc">{{ project.desc }}</p>
            
            <div class="action-row">
              <a v-if="project.liveLink" :href="project.liveLink" target="_blank" class="btn btn--primary">
                <Globe size="18" /> Visit Live Site
              </a>
              <a v-if="project.figmaLink" :href="project.figmaLink" target="_blank" class="btn btn--secondary">
                <Figma size="18" /> Prototype
              </a>
              <a v-if="project.repoLink" :href="project.repoLink" target="_blank" class="btn btn--secondary">
                <Github size="18" /> Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="content-wrapper">
      
      <section class="showcase-section" aria-label="Design Showcase">
        <div class="browser-frame">
          <div class="browser-bar">
            <div class="dots">
              <span></span><span></span><span></span>
            </div>
            <div class="address-bar">https://{{ project.title.toLowerCase().replace(/\s+/g, '-') }}.com</div>
          </div>
          
          <div class="scroll-container">
            <img 
              :src="project.homepageImage" 
              :alt="`Full page screenshot of ${project.title}`"
              class="full-page-img"
            />
          </div>
        </div>
      </section>

      <footer class="project-specs">
        <div class="spec-grid">
          <div class="spec-item">
            <h3>Tech Stack</h3>
            <p>{{ project.stack }}</p>
          </div>
          <div class="spec-item">
            <h3>Compliance</h3>
            <p class="flex-align"><CheckCircle2 size="16" class="text-success" /> {{ project.compliance }}</p>
          </div>
          <div class="spec-item">
            <h3>Tags</h3>
            <div class="tags-list">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
  min-height: 100vh;
  padding-bottom: var(--space-2xl);
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-xl));
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  @include respond-to('mobile') { padding: 0 var(--space-sm); }
}

/* --- HEADER --- */
.project-header {
  padding-top: var(--space-xl);
  margin-bottom: var(--space-xl);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: var(--space-lg);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-tertiary);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  margin-bottom: var(--space-lg);
  &:hover { color: var(--brand-primary); }
}

.header-content {
  display: grid;
  gap: var(--space-lg);
}

.meta-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.compliance-badge {
  color: var(--status-success);
  border: 1px solid var(--status-success);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
}

.stack-text { color: var(--text-tertiary); }

.project-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-sm);
}

.project-desc {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 65ch;
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.action-row {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  
  &--primary {
    background: white;
    color: black;
    &:hover { background: #e5e5e5; }
  }
  
  &--secondary {
    background: rgba(255,255,255,0.1);
    color: white;
    &:hover { background: rgba(255,255,255,0.2); }
  }
}

/* --- BROWSER FRAME --- */
.showcase-section {
  margin-bottom: var(--space-2xl);
}

.browser-frame {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.browser-bar {
  background: #1a1a1a;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.dots {
  display: flex;
  gap: 6px;
  span {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    &:nth-child(1) { background: #ff5f56; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #27c93f; }
  }
}

.address-bar {
  flex: 1;
  background: rgba(0,0,0,0.3);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 4px;
  text-align: center;
}

.scroll-container {
  /* Limit height if you want scrolling, or auto to show full length */
  width: 100%;
  background: #000;
}

.full-page-img {
  width: 100%;
  height: auto;
  display: block;
}

/* --- FOOTER SPECS --- */
.project-specs {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: var(--space-lg);
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
}

.spec-item h3 {
  font-size: 0.85rem;
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.spec-item p {
  color: var(--text-primary);
  font-weight: 600;
}

.flex-align { display: flex; align-items: center; gap: 6px; }
.text-success { color: var(--status-success); }

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 0.75rem;
  background: rgba(255,255,255,0.1);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--text-secondary);
}
</style>