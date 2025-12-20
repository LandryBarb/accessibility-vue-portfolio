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
}
export interface RemediationSection {
  fileName: string;
  codeSnippet: string;
  steps: string[];
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
    heroImage: "/images/caseStudyOneScreen.png",
    // 2. Hero Background Video (Autoplays, Muted, Loop)
    // Using a reliable tech-abstract video for testing
    heroVideo: "/videos.caseStudyOneVid.mp4",

    // 3. Visual Evidence Screenshot (Initial State)
    auditScreenshot: "/images/caseStudyOneScreen.png",

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
    heroImage: "/images/settings-panel.png",
    heroVideo: "/videos/settings-panel.mp4",
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
    heroImage: "/images/seat-map.png",
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
    heroImage: "/images/dashboard.png",
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
  }
];
