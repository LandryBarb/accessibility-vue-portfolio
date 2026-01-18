export interface CriteriaMap {
  wcag22?: string[]; // e.g. ["2.1.1", "2.4.7"]
  section508?: string[]; // e.g. "1194.21(a)"
}

export interface FixPattern {
  id: string;
  summary: string;
  appliedTo: string[]; // Components or regions applied to
  criteriaMap?: CriteriaMap;
}

export interface VerificationEvidence {
  summary: string;
  reproSteps: string[];
  expectedResult: string;
  actualResult: string;
  toolsUsed?: string[];
  criteriaMap?: CriteriaMap;
}

export interface DefectLogItem {
  id: string;
  issue: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "Fixed" | "Won't Fix" | "Deferred";
  repro?: string;
  criteriaMap?: CriteriaMap;
}




export interface CaseStudyMedia {
  heroImage?: string;
  heroVideo?: string;
  auditScreenshot?: string;
  auditVideo?: string;
}
export interface AccessibilityBarrier {
  title: string;
  wcag: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  criteriaMap?: CriteriaMap;
}
export interface RemediationSection {
  fileName: string;
  codeSnippet: string;
  steps: string[];
  patterns?: FixPattern[];
}

export interface VerificationSection {
  manualTesting: {
    keyboard: boolean;
    screenReaders: ("NVDA" | "VoiceOver" | "JAWS" | "TalkBack")[];
  };
  automation?: {
    unit?: string[];
    e2e?: string[];
  };
  summary: string;
  evidence?: VerificationEvidence[];
}

export interface ImpactSection {
  quote: string;
  author: string;
  context: string;
}

export interface AppendixSection {
  accessibilityContract?: {
    keyboardSupport: string[];
    ariaUsage: string[];
    focusBehavior: string;
    screenReaderExpectations: string[];
  };
  knownLimitations?: string[];
  followUps?: string[];
  regressionNotes?: string;
  defectLog?: DefectLogItem[];
}

export interface CaseStudy {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  genre: "Case Study";
  tags: string[];
  imageClass: string;
  match: string;
  compliance: "WCAG 2.2 A" | "WCAG 2.2 AA" | "WCAG 2.2 AAA";
  saved: boolean;
  role: string;
  timeline: string;
  stack: string;
  media: CaseStudyMedia;
  overview: string;
  barriers: AccessibilityBarrier[];
  constraints: string[];
  remediation: RemediationSection;
  verification: VerificationSection;
  impact: ImpactSection;
  appendix?: AppendixSection;
}

export const caseStudies: CaseStudy[] = [
  {
   id: 1,

  title: "Streaming Content Detail Page",
  subtitle: "Fixing Reading Order & Page Semantics",
  tagline: "Semantic Structure for Screen Readers",
  genre: "Case Study",
  tags: ["Vue 3", "Semantic HTML", "Landmarks", "Screen Readers"],
  imageClass: "poster-purple",
  match: "96%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
  stack: "Vue 3 / Vite / TypeScript",

  media: {
    // 1. Hero Background Image (Fallback)
    heroImage: "/images/thumbnails/caseStudy_1_vertical.png",
    // 2. Hero Background Video (Autoplays, Muted, Loop)
    // Using a reliable tech-abstract video for testing
    heroVideo: "/videos/caseStudyOneVid.mp4",

    // 3. Visual Evidence Screenshot (Initial State)
    auditScreenshot: "/images/audits/caseStudy_1_audit.png",

    // 4. Visual Evidence Video (Plays on Click)
    // Using a screen-recording style video for testing
    auditVideo: "/videos/caseStudyOneVid.mp4"
  },

  overview:
    "Streaming content detail pages are content-heavy and frequently fail accessibility audits due to poor semantic structure. This project focused on rebuilding a Netflix-style detail page using native HTML landmarks, correct heading hierarchy, and predictable reading order.",

  barriers: [
    {
      title: "Broken Heading Hierarchy",
      wcag: "SC 1.3.1",
      description:
        "Screen reader users could not understand page structure because visual headings were not programmatically exposed.",
      severity: "High"
    },
    {
      title: "Missing Landmarks",
      wcag: "SC 1.3.1",
      description:
        "Primary content regions were not exposed, forcing users to navigate sequentially through the entire page.",
      severity: "High"
    }
  ],

  constraints: [
    "Design parity maintained with no visual layout changes.",
    "Native HTML semantics preferred over ARIA roles."
  ],

  remediation: {
    fileName: "ContentDetail.vue",
    codeSnippet: `<main>
  <header>
    <h1>{{ title }}</h1>
  </header>

  <section aria-labelledby="metadata-heading">
    <h2 id="metadata-heading">Content Information</h2>
    <RatingBadgeGroup />
  </section>
</main>`,
    steps: [
      "Replaced layout divs with semantic HTML5 landmarks.",
      "Restored logical heading order for screen reader navigation.",
      "Grouped metadata to improve non-visual scanning."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    summary:
      "After remediation, screen reader users could navigate landmarks and headings predictably, significantly reducing cognitive load."
  },

  impact: {
    quote:
      "This remediation significantly reduced cognitive load for screen reader users and improved overall code clarity.",
    author: "Accessibility Audit Report",
    context: "Post-Remediation Review"
  }
  },

  {
     id: 2,

  title: "Gaming Account Settings Panel",
  subtitle: "Designing a Keyboard-First Settings Experience",
  tagline: "Accessible Forms & Error Handling",
  genre: "Case Study",
  tags: ["Forms", "WCAG 3.3", "Keyboard Navigation", "Vue 3"],
  imageClass: "poster-emerald",
  match: "97%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
  stack: "Vue 3 / Vite / TypeScript",

  media: {
    heroImage: "/images/thumbnails/caseStudy_2_vertical.png",
    heroVideo: "/videos/settings-panel.mp4",
    auditScreenshot: "/images/audits/caseStudy_2_audit.png",
    auditVideo: "/videos/settings-audit.mp4"
  },

  overview:
    "Gaming account settings panels often contain complex forms with poor labeling, unclear error messaging, and inaccessible toggles. This project focused on rebuilding a settings interface using native form semantics, grouped controls, and screen reader–announced validation feedback.",

  barriers: [
    {
      title: "Missing Programmatic Labels",
      wcag: "SC 1.3.1",
      description:
        "Form inputs relied on placeholder text instead of associated labels, preventing screen reader users from understanding control purpose.",
      severity: "High"
    },
    {
      title: "Unannounced Validation Errors",
      wcag: "SC 3.3.1",
      description:
        "Validation errors were visually displayed but not announced to assistive technologies, leaving users unaware of form submission failures.",
      severity: "High"
    }
  ],

  constraints: [
    "Existing toggle visuals could not be redesigned.",
    "Validation logic was required to remain lightweight."
  ],

  remediation: {
    fileName: "AccountSettings.vue",
    codeSnippet: `<fieldset>
  <legend>Privacy Settings</legend>

  <label>
    <input type="checkbox" />
    Show Online Status
  </label>
</fieldset>`,
    steps: [
      "Associated all form inputs with visible, programmatic labels.",
      "Grouped related settings using fieldsets and legends.",
      "Implemented live region announcements for validation errors."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    summary:
      "After remediation, users could complete the settings form using only a keyboard, with screen readers reliably announcing labels, errors, and state changes."
  },

  impact: {
    quote:
      "The updated form is significantly easier to navigate with a keyboard and clearer for all users.",
    author: "QA Accessibility Review",
    context: "Internal Testing"
  }
  },

  {
    id: 3,

  title: "Accessible Ticket Seat Selection",
  subtitle: "Rethinking Seat Maps Without a Mouse",
  tagline: "Keyboard-First Spatial Navigation",
  genre: "Case Study",
  tags: ["Keyboard UX", "ARIA Grid", "Ticketing", "Vue 3"],
  imageClass: "poster-orange",
  match: "95%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
  stack: "Vue 3 / Vite / TypeScript",

  media: {
    heroImage: "/images/thumbnails/caseStudy_3_vertical.png",
    heroVideo: "/videos/seat-map.mp4",
    auditVideo: "/videos/seat-audit.mp4"
  },

  overview:
    "Seat selection interfaces are notoriously inaccessible, often relying on mouse-only interaction and visual cues. This project rebuilt a simplified ticket seat grid that supports full keyboard navigation, clear focus management, and screen reader announcements without using canvas or SVG rendering.",

  barriers: [
    {
      title: "Mouse-Only Interaction",
      wcag: "SC 2.1.1",
      description:
        "Seats could only be selected using pointer input, preventing keyboard-only users from completing seat selection.",
      severity: "High"
    },
    {
      title: "Missing Selection Feedback",
      wcag: "SC 4.1.3",
      description:
        "Screen reader users were not informed when seat availability or selection state changed.",
      severity: "High"
    }
  ],

  constraints: [
    "Seat grid implemented using semantic HTML only.",
    "Keyboard navigation needed to remain performant."
  ],

  remediation: {
    fileName: "SeatGrid.vue",
    codeSnippet: `<div role="grid">
  <div role="row" v-for="row in rows">
    <button role="gridcell">Seat</button>
  </div>
</div>`,
    steps: [
      "Implemented roving tabindex for predictable keyboard navigation.",
      "Announced seat availability and selection state changes to screen readers.",
      "Provided strong, visible focus indicators for spatial orientation."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    summary:
      "Keyboard users could navigate the seat grid efficiently, and screen reader users received clear announcements when moving between and selecting seats."
  },

  impact: {
    quote:
      "This implementation makes ticket purchasing viable without a mouse or vision.",
    author: "Accessibility Consultant",
    context: "Usability Review"
  }
  },

  {
    id: 4,

  title: "Corporate Entertainment Operations Dashboard",
  subtitle: "Fixing the Most Overlooked Accessibility Surface",
  tagline: "Accessible Data at Scale",
  genre: "Case Study",
  tags: ["Tables", "Internal Tools", "Section 508", "Vue 3"],
  imageClass: "poster-blue",
  match: "94%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
  stack: "Vue 3 / Vite / TypeScript",

  media: {
    heroImage: "/images/thumbnails/caseStudy_4_vertical.png",
    heroVideo: "/videos/dashboard.mp4",
    auditVideo: "/videos/dashboard-audit.mp4"
  },

  overview:
    "Internal operations dashboards in entertainment organizations frequently overlook accessibility despite being subject to Section 508. This project focused on rebuilding a content operations dashboard with accessible tables, clear status indicators, and keyboard-friendly controls.",

  barriers: [
    {
      title: "Improper Table Semantics",
      wcag: "SC 1.3.1",
      description:
        "Tables lacked captions, headers, and properly scoped columns, making navigation difficult for screen reader users.",
      severity: "High"
    },
    {
      title: "Color-Only Status Indicators",
      wcag: "SC 1.4.1",
      description:
        "Operational status relied solely on color to convey meaning, excluding users who cannot perceive color differences.",
      severity: "Medium"
    }
  ],

  constraints: [
    "High-density data layout could not be simplified.",
    "Internal tools required Section 508 alignment."
  ],

  remediation: {
    fileName: "OperationsTable.vue",
    codeSnippet: `<table>
  <caption>Content Delivery Status</caption>
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
</table>`,
    steps: [
      "Rebuilt data tables using native HTML semantics.",
      "Added captions and scoped headers for screen reader navigation.",
      "Supplemented color-based status indicators with textual labels."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    summary:
      "Screen reader users could navigate table structures efficiently, and all users could identify status information without relying on color."
  },

  impact: {
    quote:
      "The dashboard is now usable with assistive technology and easier to scan visually.",
    author: "Internal Accessibility Audit",
    context: "Compliance Review"
  }
  },
  {
  id: 5,
  title: "Global Top Navigation",
  subtitle: "Landmarks, Skip Links & Focus Management",
  tagline: "The First Step in Accessible Routing",
  genre: "Case Study",
  tags: ["Landmarks", "Skip Link", "Focus", "Menu Pattern"],
  imageClass: "poster-slate",
  match: "99%",
  compliance: "WCAG 2.2 AA",
  saved: false,
  role: "Lead Engineer",
  timeline: "Sprint 24",
  stack: "Vue 3 / SCSS",
  
  media: {
    heroImage: "/images/thumbnails/caseStudy_4_vertical.png", // Reusing for demo
    auditScreenshot: "/images/audits/caseStudy_4_audit.png"
  },

  overview: "The top navigation bar is the primary entry point for all users. Initially, it lacked semantic landmarks, had no mechanism to bypass repetitive links, and relied on color-only cues for active states. This remediation established the site-wide keyboard safety net.",

  barriers: [
    {
      title: "No Bypass Mechanism",
      wcag: "2.4.1",
      description: "Keyboard users were forced to tab through 15+ navigation links on every page load before reaching main content.",
      severity: "High",
      criteriaMap: { wcag22: ["2.4.1"] }
    },
    {
      title: "Ambiguous Landmark Roles",
      wcag: "1.3.1",
      description: "The navigation container used generic `<div>` tags, preventing screen reader users from navigating by region.",
      severity: "Medium",
      criteriaMap: { wcag22: ["1.3.1"] }
    },
    {
      title: "Color-Only Active State",
      wcag: "1.4.1",
      description: "Active links were indicated only by a color change (blue vs gray), failing users with low vision or color blindness.",
      severity: "Medium",
      criteriaMap: { wcag22: ["1.4.1"] }
    }
  ],

  constraints: [
    "Must support legacy IE11 skip-link behavior (hash change).",
    "Cannot change visual brand colors."
  ],

  remediation: {
    fileName: "AppHeader.vue",
    // Short representative snippet only
    codeSnippet: `<header class="site-header" role="banner">
  <a href="#main-content" class="skip-link">
    Skip to Main Content
  </a>
  
  <nav aria-label="Global">
    <ul>
      <li>
        <a href="/" :aria-current="isHome ? 'page' : undefined">
          Home
        </a>
      </li>
    </ul>
  </nav>
</header>`,
    steps: [
      "Inserted a hidden-until-focused Skip Link as the first DOM element.",
      "Wrapped navigation in `<nav>` with a unique `aria-label`.",
      "Applied `aria-current='page'` to the active link to supplement color cues."
    ],
    // NEW: Structured Patterns
    patterns: [
      {
        id: "PAT-01",
        summary: "Skip Link Implementation",
        appliedTo: ["AppShell.vue", "Global Layout"],
        criteriaMap: { wcag22: ["2.4.1"] }
      },
      {
        id: "PAT-02",
        summary: "Programmatic State (aria-current)",
        appliedTo: ["SidebarNav.vue", "TopNav.vue"],
        criteriaMap: { wcag22: ["4.1.2", "1.4.1"] }
      }
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "TalkBack"]
    },
    summary: "Verified that the skip link appears on first tab, and NVDA correctly identifies the 'Global Navigation' landmark.",
    // NEW: Structured Evidence
    evidence: [
      {
        summary: "Skip Link Functionality",
        reproSteps: ["Refresh page", "Press Tab once", "Press Enter"],
        expectedResult: "Focus moves immediately to <main id='main-content'>",
        actualResult: "Focus moved to main content; browser scrolled to target.",
        criteriaMap: { wcag22: ["2.4.1"] }
      },
      {
        summary: "Active State Announcement",
        reproSteps: ["Navigate to 'Settings'", "Use SR to read current link"],
        expectedResult: "VoiceOver reads 'Settings, current page, link'",
        actualResult: "Confirmed 'current page' suffix added via aria-current.",
        criteriaMap: { wcag22: ["4.1.2"] }
      }
    ]
  },

  impact: {
    quote: "The skip link alone reduced keyboard navigation time by 40% for power users.",
    author: "UX Research",
    context: "Sprint Retro"
  },

  appendix: {
    accessibilityContract: {
      keyboardSupport: ["Tab to Skip Link", "Enter to activate", "Focus ring visible"],
      ariaUsage: ["role='banner'", "aria-label='Global'", "aria-current='page'"],
      focusBehavior: "Focus moves to main content on skip",
      screenReaderExpectations: ["Landmark navigation works (D key in NVDA)"]
    },
    // NEW: Defect Log
    defectLog: [
      {
        id: "BUG-104",
        issue: "Skip link hidden behind sticky header on scroll",
        severity: "Medium",
        status: "Fixed",
        repro: "Scroll down 200px, tab backwards to top.",
        criteriaMap: { wcag22: ["2.4.7"] }
      }
    ]
  }
}
];
