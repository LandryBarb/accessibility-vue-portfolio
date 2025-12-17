<script setup>
import { AlertTriangle, Home, ArrowLeft } from 'lucide-vue-next';
</script>

<template>
  <div class="page-container error-page">
    <div class="content-wrapper error-layout">
      
      <div class="error-icon-box">
        <AlertTriangle size="64" stroke-width="1.5" />
      </div>
      
      <h1 class="error-title">Signal Lost</h1>
      <p class="error-desc">
        The content you are looking for is currently unavailable or has been moved to a new frequency.
      </p>
      
      <div class="error-actions">
        <router-link to="/" class="btn btn--primary">
          <Home class="icon-inline" aria-hidden="true" />
          <span>Return Home</span>
        </router-link>
        
        <button @click="$router.back()" class="btn btn--secondary">
          <ArrowLeft class="icon-inline" aria-hidden="true" />
          <span>Go Back</span>
        </button>
      </div>

      <div class="error-code">Error Code: 404_NOT_FOUND</div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins' as *;

.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Center vertically */
  text-align: center;
}

.error-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
}

.error-icon-box {
  background: rgba(239, 68, 68, 0.1); /* Red tint */
  color: var(--status-error);
  padding: var(--space-lg);
  border-radius: 50%;
  margin-bottom: var(--space-lg);
  border: 1px solid rgba(239, 68, 68, 0.2);
  
  /* Subtle pulse animation */
  animation: pulse 3s infinite ease-in-out;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.2); }
  70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.error-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: var(--space-sm);
  line-height: 1.1;
}

.error-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--space-2xl);
  
  @include respond-to('mobile') {
    flex-direction: column;
    width: 100%;
    .btn { width: 100%; }
  }
}

.error-code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-tertiary);
  opacity: 0.7;
}

/* Button Styles (Reused from Main.scss for consistency) */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1rem;
  transition: transform 0.2s ease;
  
  &:hover { transform: scale(1.03); }
  
  &--primary {
    background: white;
    color: black;
    &:hover { background: rgba(255,255,255,0.9); }
  }
  
  &--secondary {
    background: rgba(255,255,255,0.1);
    color: white;
    &:hover { background: rgba(255,255,255,0.2); }
  }
}
</style>