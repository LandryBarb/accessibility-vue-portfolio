<script setup>
import { 
  Briefcase, Mail, Linkedin, Github, 
  Award, Clock, CheckCircle2, MapPin, 
  Download
} from 'lucide-vue-next';

// --- Assets ---
// Replace these strings with your actual import paths (e.g., import headshot from '@/assets/me.jpg')
const headshotUrl = "/images/headshot.jpg"; 
const videoUrl = "/videos/about.mp4";

// --- Static Data ---
const profile = {
  name: "Landry Barb II",
  title: "Senior Accessibility Engineer",
  status: "Available for Hire",
  location: "Los Angeles, CA",
  bio: "I’m a frontend engineer focused on accessibility for entertainment platforms where small design decisions can affect millions of users. My background in performance and digital platforms shapes how I think about audience experience, usability, and inclusion as an engineering discipline.",
  email: "connect@landrybarb.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/landrybarb/", icon: Linkedin },
    { label: "GitHub", url: "https://github.com/LandryBarb", icon: Github },
    { label: "Resume", url: "#", icon: Download }
  ]
};

const stats = [
  { label: "Years Exp.", value: "3+", icon: Clock },
  { label: "Audit Hours", value: "2k+", icon: CheckCircle2 },
  { label: "WCAG Level", value: "AAA", icon: Award },
  { label: "Components", value: "150+", icon: Briefcase },
];

const experience = [
  { 
    id: 1,
    role: "Senior Accessibility Engineer", 
    company: "StreamCo (Global Streaming Service)", 
    period: "2021 - Present",
    desc: "Leading the accessibility remediation of a React Native TV app used by 5M+ subscribers. Established the 'Keyboard First' development culture and automated contrast testing in CI/CD." 
  },
  { 
    id: 2,
    role: "UI Engineer / A11y Lead", 
    company: "FinTech Solutions", 
    period: "2018 - 2021",
    desc: "Built a high-contrast trading dashboard compliant with Section 508. Audited 40+ legacy screens for screen reader compatibility and trained the frontend team on ARIA best practices." 
  },
  { 
    id: 3,
    role: "Frontend Developer", 
    company: "Creative Agency", 
    period: "2015 - 2018",
    desc: "Specialized in semantic HTML and performance optimization for large-scale marketing sites. Championed the shift to responsive, mobile-first design patterns." 
  }
];
</script>

<template>
  <div class="page-container">
    
    <header class="content-wrapper header-section">
      <div class="profile-layout">
        
        <div class="profile-visual">
          <div class="avatar-ring">
            <div class="avatar-media">
              <video 
                class="avatar-video" 
                autoplay 
                loop 
                muted 
                playsinline
                :src="videoUrl"
              ></video>
              
              <img 
                :src="headshotUrl" 
                alt="Landry Barb II Headshot" 
                class="avatar-img" 
              />
            </div>
          </div>

          <div class="status-badge">
            <span class="status-dot"></span>
            {{ profile.status }}
          </div>
        </div>

        <div class="profile-info">
          <h1 class="profile-name">{{ profile.name }}</h1>
          <h2 class="profile-title">
            <Briefcase class="icon-inline" aria-hidden="true" />
            {{ profile.title }}
          </h2>
          
          <div class="location-row">
            <MapPin size="16" class="text-tertiary" />
            <span>{{ profile.location }}</span>
          </div>

          <p class="profile-bio">{{ profile.bio }}</p>

          <div class="action-row">
            <a :href="`mailto:${profile.email}`" class="btn btn--primary">
              <Mail class="icon-inline" />
              <span>Contact Me</span>
            </a>
            
            <a 
              v-for="link in profile.socials" 
              :key="link.label" 
              :href="link.url" 
              class="btn btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="link.icon" class="icon-inline" />
              <span>{{ link.label }}</span>
            </a>
          </div>
        </div>

      </div>
    </header>

    <section class="content-wrapper stats-section" aria-label="Career Statistics">
      <div class="stats-grid">
        <div v-for="(stat, i) in stats" :key="i" class="stat-card">
          <component :is="stat.icon" class="stat-icon" aria-hidden="true" />
          <div class="stat-content">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="content-wrapper timeline-section" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" class="section-title">Career History</h2>
      
      <ol class="timeline-list">
        <li v-for="job in experience" :key="job.id" class="timeline-item">
          <div class="timeline-marker">
            <div class="dot"></div>
            <div class="line"></div>
          </div>

          <div class="timeline-content">
            <div class="job-header">
              <h3 class="job-role">{{ job.role }}</h3>
              <span class="job-period">{{ job.period }}</span>
            </div>
            <div class="job-company">{{ job.company }}</div>
            <p class="job-desc">{{ job.desc }}</p>
          </div>
        </li>
      </ol>
    </section>

  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.page-container {
  min-height: 100vh;
  width: 100%;
  padding-bottom: var(--space-2xl);
  
  @include respond-to('laptop') {
    padding-bottom: calc(var(--mobile-nav-height) + var(--space-xl));
  }
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
  @include respond-to('mobile') { padding: 0 var(--space-sm); }
}

/* --- HEADER SECTION --- */
.header-section {
  padding-top: var(--space-2xl);
  margin-bottom: var(--space-2xl);
  
  @include respond-to('mobile') {
    padding-top: var(--space-xl);
    margin-bottom: var(--space-xl);
  }
}

.profile-layout {
  display: flex;
  gap: var(--space-2xl);
  align-items: flex-start;
  
  @include respond-to('tablet') {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-lg);
  }
}

/* Avatar Styling */
.profile-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

.avatar-ring {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  padding: 4px; /* The Gradient Border Thickness */
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-focus));
  
  @include respond-to('mobile') {
    width: 140px;
    height: 140px;
  }
}

/* NEW: Media Container for Video/Img */
.avatar-media {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--bg-surface);
  position: relative;
  overflow: hidden; /* Clips the square video/img to a circle */
  border: 4px solid var(--bg-body); /* Creates gap effect between media and ring */
  
  /* Fix for Safari border-radius overflow clipping */
  transform: translateZ(0); 
  mask-image: -webkit-radial-gradient(white, black);
}

.avatar-img,
.avatar-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-video {
  z-index: 1; /* Behind image */
  opacity: 0.8; /* Slight dim for video if needed */
}

.avatar-img {
  z-index: 2; /* On top */
  transition: opacity 0.4s ease-in-out;
  background-color: var(--bg-surface); /* Prevents transparent background during load */
}

/* Reveal Video on Hover */
.avatar-media:hover .avatar-img {
  opacity: 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 99px;
  background: rgba(16, 185, 129, 0.1);
  color: var(--status-success);
  border: 1px solid rgba(16, 185, 129, 0.2);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 8px currentColor;
}

/* Profile Info */
.profile-info {
  flex: 1;
}

.profile-name {
  font-size: var(--text-h1);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-xs);
}

.profile-title {
  font-size: 1.25rem;
  color: var(--text-tertiary);
  font-weight: 500;
  margin-bottom: var(--space-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  
  @include respond-to('tablet') { justify-content: center; }
}

.location-row {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-tertiary);
  font-size: 0.9rem;
  margin-bottom: var(--space-lg);
  
  @include respond-to('tablet') { justify-content: center; }
}

.profile-bio {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  max-width: 65ch;
  
  @include respond-to('mobile') { font-size: 1rem; }
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  
  @include respond-to('tablet') { justify-content: center; }
  
  @include respond-to('mobile') {
    flex-direction: column;
    width: 100%;
    gap: var(--space-sm);
    .btn { width: 100%; }
  }
}

/* --- STATS GRID --- */
.stats-section {
  margin-bottom: var(--space-2xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to('mobile') {
    gap: var(--space-sm);
  }
}

.stat-card {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.1);
  padding: var(--space-md);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
  transition: transform 0.2s ease, border-color 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.2);
  }
}
.stat-content{
display: flex;
flex-direction: column;
  
}
.stat-icon {
  color: var(--brand-primary);
  opacity: 0.8;
  width: 24px;
  height: 24px;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
  margin-block-end: .25em;
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

/* --- TIMELINE SECTION --- */
.timeline-section {
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-xl);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: var(--space-md);
}

.timeline-list {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: grid;
  grid-template-columns: 40px 1fr; /* Marker width + Content */
  gap: var(--space-md);
  position: relative;
  padding-bottom: var(--space-2xl);
  
  &:last-child { 
    padding-bottom: 0; 
    .timeline-marker .line { display: none; }
  }
  
  @include respond-to('mobile') {
    gap: var(--space-sm);
    grid-template-columns: 24px 1fr;
  }
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--brand-primary);
    border: 2px solid var(--bg-body);
    outline: 2px solid var(--brand-primary);
    flex-shrink: 0;
    z-index: 2;
  }
  
  .line {
    width: 2px;
    flex-grow: 1;
    background-color: rgba(255,255,255,0.1);
    margin-top: 4px;
    margin-bottom: -10px;
  }
}

.timeline-content {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: var(--space-lg);
  
  @include respond-to('mobile') { padding: var(--space-md); }
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.job-role {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.job-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-tertiary);
  background: rgba(255,255,255,0.05);
  padding: 2px 6px;
  border-radius: 4px;
}

.job-company {
  font-size: 0.9rem;
  color: var(--brand-primary);
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.job-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>