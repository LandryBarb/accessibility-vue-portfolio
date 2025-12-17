/* src/data/projects.js */

export const projects = [
  {
    id: 1,
    // --- Card / Poster Data ---
    title: "Global Player Redesign",
    tagline: "Fixing the 10ft Experience",
    genre: "Case Study",
    tags: ["TVOS", "Focus Mgmt", "React Native"],
    imageClass: "poster-blue", // CSS class for gradient
    match: "98%",
    compliance: "WCAG 2.2 AA",
    saved: false, // For bookmarking logic

    // --- Detail View Data ---
    subtitle: "A Keyboard-First Approach",
    role: "Lead Accessibility Engineer",
    timeline: "Q3 2024 (3 Months)",
    stack: "React Native / TVOS",
    
    // Assets (Placeholders for now)
    heroImage: '/images/screenshot.png', 
    heroVideo: '/videos/test.mp4',
    auditScreenshot: '/images/screenshot.png',
    auditVideo: '/videos/test.mp4',

    // Content Sections
    overview: `The "10-foot experience" presents unique accessibility challenges. Unlike touch or mouse interfaces, users rely entirely on directional pads (D-pads) or remote controls. This project focused on the complete overhaul of our Smart TV application's video player.`,
    
    barriers: [
      {
        title: "Focus Trap (SC 2.1.2)",
        desc: "Users entering the 'Subtitle Settings' menu could not navigate back to playback controls without restarting the app.",
        severity: "Critical"
      },
      {
        title: "Invisible Focus (SC 2.4.7)",
        desc: "The 'Play/Pause' toggle relied on a subtle opacity change (0.8 to 1.0) which failed non-text contrast requirements.",
        severity: "Critical"
      }
    ],

    constraints: [
      
      "**Performance Budget:** The app runs on low-end Smart TV chipsets. Any JS-heavy focus calculation causes visible frame drops.",
      "**Platform Differences:** TVOS handles focus via the native engine, while Android TV required manual focus layering."
    ],

    solution: {
      fileName: "useSpatialNav.ts",
      code: `const handleDirectionalPress = (direction: Direction) => {
  // 1. Predict next focus based on coordinate geometry
  const nextElement = findBestCandidate(
    currentFocusRef.current, 
    interactiveElements, 
    direction
  );
  
  if (nextElement) {
    // 2. Move focus and announce via Live Region
    nextElement.focus();
    announceToScreenReader(nextElement.ariaLabel);
  } else {
    // 3. Play "Bonk" sound for boundary feedback
    playHapticFeedback('boundary');
  }
};`,
      steps: [
        "Implemented a **Coordinate-Based Navigation** system to predict focus logic independent of the DOM order.",
        "Utilized **ARIA Live Regions** to announce state changes (Volume, Captions) without moving focus away from the slider."
      ]
    },

    impact: {
      quote: "The biggest takeaway was that 'accessible' code is often just better code. By forcing ourselves to manage focus explicitly, we fixed three unrelated bugs involving z-index issues.",
      author: "Engineering Manager",
      context: "Post-Launch Review"
    }
  },

  {
    id: 2,
    title: "TVOS Discovery Interface",
    tagline: "Solving Grid Navigation",
    genre: "Audit",
    tags: ["Grid", "Screen Reader", "SwiftUI"],
    imageClass: "poster-purple",
    match: "95%",
    compliance: "VoiceOver Optimized",
    saved: false,

    subtitle: "Flattening the Semantic Tree",
    role: "Audit Lead",
    timeline: "Q1 2024 (1 Month)",
    stack: "SwiftUI / UIKit",
    heroImage: '/images/screenshot.png', 
    heroVideo: '/videos/test.mp4',
    auditScreenshot: '/images/screenshot.png',
    auditVideo: '/videos/test.mp4',

    overview: "Grid layouts on Apple TV often announce entire rows as single items, confusing screen reader users. This audit focused on restructuring the semantic tree to ensure every poster was individually selectable and announced with correct metadata (Title, Season, Unwatched count).",

    barriers: [
      {
        title: "Meaningless Sequence (SC 1.3.2)",
        desc: "VoiceOver read the entire row of 5 movies as a single long string of text.",
        severity: "High"
      },
      {
        title: "Target Size (SC 2.5.5)",
        desc: "Hit targets for 'Add to Watchlist' buttons were smaller than 44x44 CSS pixels equivalent.",
        severity: "Medium"
      }
    ],

    constraints: [
      "**Legacy Codebase:** The grid was built using a deprecated collection view wrapper.",
      "**Design Freeze:** We could not change the visual layout, only the underlying semantics."
    ],

    solution: {
      fileName: "GridItem.swift",
      code: `.accessibilityElement(children: .combine)
.accessibilityLabel("\(movie.title), Season \(movie.season)")
.accessibilityValue(movie.isNew ? "New Episode" : "")
.accessibilityAddTraits(.isButton)
.accessibilityAction(named: "Add to Watchlist") {
    viewModel.addToWatchlist(movie)
}`,
      steps: [
        "Applied `.accessibilityElement(children: .combine)` to group the poster image, title, and metadata into a single focusable touch target.",
        "Added Custom Actions to the rotor so users could 'Add to Watchlist' without locating a tiny button."
      ]
    },

    impact: {
      quote: "VoiceOver users can now browse the catalog 3x faster. The custom rotor actions were a huge win for usability.",
      author: "Lead iOS Dev",
      context: "Sprint Retro"
    }
  },

  {
    id: 3,
    title: "Live Sports Captions",
    tagline: "Real-time Text Engines",
    genre: "System Design",
    tags: ["Real-time", "Cognitive", "Socket.io"],
    imageClass: "poster-emerald",
    match: "99%",
    compliance: "FCC / CVAA",
    saved: false,

    subtitle: "Synchronizing Data Streams",
    role: "System Architect",
    timeline: "Q4 2023 (6 Months)",
    stack: "Node.js / WebSockets",
    heroImage: '/images/screenshot.png', 
    heroVideo: '/videos/test.mp4',
    auditScreenshot: '/images/screenshot.png',
    auditVideo: '/videos/test.mp4',

    overview: "Live sports require captions to be delivered with minimal latency. We built a custom ingestion engine that parses CEA-608/708 data chunks and renders them via HTML5, allowing user customization (size, font, color) that burned-in captions don't support.",

    barriers: [
      {
        title: "Text Resize (SC 1.4.4)",
        desc: "Previous captions were bitmap images that pixelated when zoomed.",
        severity: "Critical"
      },
      {
        title: "No Personalization",
        desc: "Users with dyslexia could not change the font to a sans-serif alternative.",
        severity: "High"
      }
    ],

    constraints: [
      "**Latency:** Processing delay had to be under 200ms to match the live video feed.",
      "**Browser Support:** Had to work on older Tizen (Samsung) and WebOS (LG) browsers."
    ],

    solution: {
      fileName: "CaptionRenderer.js",
      code: `class CaptionRenderer {
  render(cue) {
    const safeZone = this.calculateSafeZone();
    
    // User Preferences applied dynamically
    this.container.style.fontSize = \`\${userPrefs.size}%\`;
    this.container.style.fontFamily = userPrefs.font;
    this.container.style.backgroundColor = \`rgba(0,0,0,\${userPrefs.opacity})\`;
    
    this.updateLiveRegion(cue.text);
  }
}`,
      steps: [
        "Decoupled caption rendering from the video stream, overlaying it as a DOM layer.",
        "Exposed CSS variables for Font Family, Size, and Edge Style to the settings menu."
      ]
    },

    impact: {
      quote: "Compliance with CVAA was achieved, but more importantly, we saw a 15% increase in caption usage among non-impaired users who just wanted readable text.",
      author: "Product Owner",
      context: "QBR Report"
    }
  },

  {
    id: 4,
    title: "Design System 2.0",
    tagline: "The A11y Component Library",
    genre: "Docs",
    tags: ["Components", "Aria", "Storybook"],
    imageClass: "poster-orange",
    match: "92%",
    compliance: "Internal AAA",
    saved: false,

    subtitle: "Scaling Accessibility by Default",
    role: "Maintainer",
    timeline: "Ongoing",
    stack: "Vue 3 / SCSS",
    heroImage: '/images/screenshot.png', 
    heroVideo: '/videos/test.mp4',
    auditScreenshot: '/images/screenshot.png',
    auditVideo: '/videos/test.mp4',

    overview: "To prevent accessibility debt, I architected the 'Core' component library. It enforces contrast ratios, focus states, and aria-labels at the prop level, preventing developers from shipping inaccessible UI.",

    barriers: [
      {
        title: "Inconsistent Focus",
        desc: "Every team implemented focus rings differently, leading to a fragmented UI.",
        severity: "Medium"
      },
      {
        title: "Missing Labels (SC 4.1.2)",
        desc: "Icon-only buttons frequently lacked aria-labels in production.",
        severity: "High"
      }
    ],

    constraints: [
      "**Adoption:** 4 different squads had to migrate to this system without stopping feature work.",
      "**Theming:** Had to support 'Kids Mode' (high saturation) and 'Dark Mode' simultaneously."
    ],

    solution: {
      fileName: "Button.vue",
      code: `<template>
  <button 
    :aria-label="iconOnly ? label : undefined"
    :aria-disabled="loading"
    class="btn-core"
  >
    <slot name="icon"></slot>
    <span v-if="!iconOnly"><slot></slot></span>
  </button>
</template>

<script setup>
// Prop validation enforces accessible labels
defineProps({
  iconOnly: Boolean,
  label: {
    type: String,
    validator: (v, props) => !props.iconOnly || (v && v.length > 0)
  }
});
</script>`,
      steps: [
        "Added prop validators that throw console warnings in development if accessibility props (like `label` for icon buttons) are missing.",
        "Centralized all focus logic into a single SCSS mixin used by every interactive component."
      ]
    },

    impact: {
      quote: "The 'guardrails' in the button component alone stopped 12 critical a11y bugs from reaching production this quarter.",
      author: "QA Lead",
      context: "Dev All-Hands"
    }
  }
];