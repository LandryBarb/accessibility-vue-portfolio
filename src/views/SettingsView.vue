<script setup>
import { ref } from 'vue';
import { 
  Settings, Moon, Sun, Monitor, 
  Type, Eye, Speaker, Volume2, 
  ToggleLeft, ToggleRight, Info 
} from 'lucide-vue-next';

// --- State ---
const preferences = ref({
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  autoPlayPreviews: false,
  soundEffects: true
});

const toggle = (key) => {
  preferences.value[key] = !preferences.value[key];
  // In a real app, this would trigger: document.documentElement.classList.toggle('reduce-motion')
};

// --- Static Config ---
const sections = [
  {
    title: "Display & Accessibility",
    icon: Eye,
    items: [
      {
        id: "reducedMotion",
        label: "Reduced Motion",
        desc: "Minimize animations and transition effects throughout the interface.",
        icon: Monitor
      },
      {
        id: "highContrast",
        label: "High Contrast Mode",
        desc: "Increase contrast ratios for text and borders (WCAG AAA target).",
        icon: Sun
      },
      {
        id: "largeText",
        label: "Larger Text",
        desc: "Scale typography by 120% for better readability.",
        icon: Type
      }
    ]
  },
  {
    title: "Playback & Audio",
    icon: Speaker,
    items: [
      {
        id: "autoPlayPreviews",
        label: "Autoplay Video Previews",
        desc: "Automatically play silent video clips when hovering over content.",
        icon: Volume2
      },
      {
        id: "soundEffects",
        label: "Interface Sounds",
        desc: "Play subtle audio cues when navigating or selecting items.",
        icon: Speaker
      }
    ]
  }
];
</script>

<template>
  <div class="page-container">
    
    <div class="content-wrapper settings-layout">
      
      <header class="settings-header">
        <div class="icon-box">
          <Settings class="header-icon" aria-hidden="true" />
        </div>
        <h1 class="page-title">Settings</h1>
      </header>

      <div class="settings-groups">
        <section 
          v-for="(section, idx) in sections" 
          :key="idx" 
          class="settings-section"
          :aria-labelledby="`heading-${idx}`"
        >
          <div class="section-header">
            <component :is="section.icon" class="section-icon" aria-hidden="true" />
            <h2 :id="`heading-${idx}`" class="section-title">{{ section.title }}</h2>
          </div>

          <div class="options-list">
            <button
              v-for="item in section.items"
              :key="item.id"
              @click="toggle(item.id)"
              class="option-item"
              role="switch"
              :aria-checked="preferences[item.id]"
              :aria-labelledby="`label-${item.id}`"
              :aria-describedby="`desc-${item.id}`"
            >
              <div class="option-content">
                <div class="option-icon-box" :class="{ 'is-active': preferences[item.id] }">
                  <component :is="item.icon" size="20" />
                </div>
                <div class="option-text">
                  <span :id="`label-${item.id}`" class="option-label">{{ item.label }}</span>
                  <span :id="`desc-${item.id}`" class="option-desc">{{ item.desc }}</span>
                </div>
              </div>
              
              <div class="toggle-indicator" :class="{ 'is-active': preferences[item.id] }">
                <ToggleRight v-if="preferences[item.id]" size="40" fill="currentColor" />
                <ToggleLeft v-else size="40" />
              </div>
            </button>
          </div>
        </section>
      </div>

      <footer class="settings-footer">
        <p class="version-text">Portfolio Build v2.4.0 (Stable)</p>
        <p class="tech-stack">Vue 3 • SCSS • Vite</p>
      </footer>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.settings-layout {
  max-width: 800px; /* Narrower reading column */
  padding-top: var(--space-2xl);
  
  @include respond-to('mobile') {
    padding-top: var(--space-lg);
  }
}

/* --- Header --- */
.settings-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-2xl);
  
  @include respond-to('mobile') { margin-bottom: var(--space-xl); }
}

.icon-box {
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
}

.page-title {
  font-size: var(--text-h1);
  font-weight: 800;
  line-height: 1;
}

/* --- Sections --- */
.settings-groups {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

.settings-section {
  /* Animation entry handled by global page transition */
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: var(--brand-primary);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* --- Option List --- */
.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.option-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: 1px solid transparent; /* Reserve border space */
  padding: var(--space-md);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s var(--ease-cinematic);
  
  /* Hover State */
  &:hover {
    background-color: rgba(255,255,255,0.05);
    .option-label { color: white; }
  }
  
  /* Focus State (AAA) */
  &:focus-visible {
    background-color: rgba(255,255,255,0.05);
    border-color: var(--brand-primary);
    outline: none; /* Handled by border */
  }
  
  /* Mobile Layout Adjustment */
  @include respond-to('mobile') {
    padding: var(--space-sm);
    align-items: flex-start; /* Top align for multiline text */
  }
}

.option-content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding-right: var(--space-sm);
  
  @include respond-to('mobile') { gap: var(--space-sm); }
}

.option-icon-box {
  margin-top: 2px; /* Visual alignment with text cap-height */
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.05);
  color: var(--text-tertiary);
  transition: all 0.2s ease;
  
  &.is-active {
    background-color: rgba(59, 130, 246, 0.2);
    color: var(--brand-primary);
  }
}

.option-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.option-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.option-desc {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  line-height: 1.4;
  max-width: 50ch;
}

/* --- Toggle Switch --- */
.toggle-indicator {
  color: var(--text-tertiary);
  transition: color 0.2s ease;
  flex-shrink: 0;
  
  &.is-active {
    color: var(--brand-primary);
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4)); /* Glow */
  }
}

/* --- Footer --- */
.settings-footer {
  margin-top: var(--space-2xl);
  padding-top: var(--space-lg);
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  color: var(--text-tertiary);
}

.version-text { font-size: 0.85rem; margin-bottom: 4px; }
.tech-stack { font-size: 0.75rem; opacity: 0.7; }
</style>