export interface CaseStudyBarrier {
  title: string;
  desc: string;
  severity: "Critical" | "High" | "Medium" | "Low";
}

export interface CaseStudySolution {
  fileName: string;
  code: string;
  steps: string[];
}

export interface CaseStudyImpact {
  quote: string;
  author: string;
  context: string;
}

export interface CaseStudy {
  id: number;

  // --- Card / Poster Data ---
  title: string;
  tagline: string;
  genre: string;
  tags: string[];
  imageClass: string;
  match: string;
  compliance: string;
  saved: boolean;

  // --- Detail View Data ---
  subtitle: string;
  role: string;
  timeline: string;
  stack: string;

  // Assets
  heroImage: string;
  heroVideo: string;
  auditScreenshot: string;
  auditVideo: string;

  // Content
  overview: string;
  barriers: CaseStudyBarrier[];
  constraints: string[];
  solution: CaseStudySolution;
  impact: CaseStudyImpact;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,

    title: "Streaming Content Detail Page",
    tagline: "Semantic Structure for Screen Readers",
    genre: "Case Study",
    tags: ["Vue 3", "Semantic HTML", "Landmarks", "Screen Readers"],
    imageClass: "poster-purple",
    match: "96%",
    compliance: "WCAG 2.2 AA",
    saved: false,

    subtitle: "Fixing Reading Order & Page Semantics",
    role: "Accessibility Engineer",
    timeline: "1 Day",
    stack: "Vue 3 / Vite / TypeScript",

    heroImage: "/images/streaming-detail.png",
    heroVideo: "/videos/streaming-detail.mp4",
    auditScreenshot: "/images/streaming-audit.png",
    auditVideo: "/videos/streaming-audit.mp4",

    overview:
      "Streaming content detail pages are content-heavy and frequently fail accessibility audits due to poor semantic structure. This project focused on rebuilding a Netflix-style detail page using native HTML landmarks, correct heading hierarchy, and predictable reading order.",

    barriers: [
      {
        title: "Broken Heading Hierarchy (SC 1.3.1)",
        desc: "Visual section titles were styled divs, causing screen reader users to lose page structure.",
        severity: "High"
      },
      {
        title: "Missing Landmarks (SC 1.3.1)",
        desc: "Primary content areas lacked semantic regions, forcing screen reader users to tab through the entire page.",
        severity: "High"
      }
    ],

    constraints: [
      "Design parity had to be maintained with no visual layout changes.",
      "Remediation favored native semantics over ARIA roles."
    ],

    solution: {
      fileName: "ContentDetail.vue",
      code: `<main>
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
    tagline: "Accessible Forms & Error Handling",
    genre: "Case Study",
    tags: ["Forms", "WCAG 3.3", "Keyboard Navigation", "Vue"],
    imageClass: "poster-emerald",
    match: "97%",
    compliance: "WCAG 2.2 AA",
    saved: false,

    subtitle: "Designing a Keyboard-First Settings Experience",
    role: "Accessibility Engineer",
    timeline: "1 Day",
    stack: "Vue 3 / Vite / TypeScript",

    heroImage: "/images/settings-panel.png",
    heroVideo: "/videos/settings-panel.mp4",
    auditScreenshot: "/images/settings-audit.png",
    auditVideo: "/videos/settings-audit.mp4",

    overview:
      "Gaming account settings panels often contain complex forms with poor labeling, unclear errors, and inaccessible toggles. This project focused on rebuilding a settings interface using proper form semantics, grouped controls, and accessible validation feedback.",

    barriers: [
      {
        title: "Missing Programmatic Labels (SC 1.3.1)",
        desc: "Inputs relied on placeholder text instead of associated labels.",
        severity: "Critical"
      },
      {
        title: "Unannounced Validation Errors (SC 3.3.1)",
        desc: "Form errors were visually displayed but not announced to assistive technologies.",
        severity: "High"
      }
    ],

    constraints: [
      "Existing toggle visuals could not be redesigned.",
      "Validation logic was required to remain lightweight."
    ],

    solution: {
      fileName: "AccountSettings.vue",
      code: `<fieldset>
  <legend>Privacy Settings</legend>

  <label>
    <input type="checkbox" />
    Show Online Status
  </label>
</fieldset>`,
      steps: [
        "Associated all inputs with visible labels.",
        "Grouped related controls using fieldsets and legends.",
        "Implemented live region announcements for form errors."
      ]
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
    tagline: "Keyboard-First Spatial Navigation",
    genre: "Case Study",
    tags: ["ARIA Grid", "Keyboard UX", "Ticketing", "Vue"],
    imageClass: "poster-orange",
    match: "95%",
    compliance: "WCAG 2.2 AA",
    saved: false,

    subtitle: "Rethinking Seat Maps Without a Mouse",
    role: "Accessibility Engineer",
    timeline: "1 Day",
    stack: "Vue 3 / Vite / TypeScript",

    heroImage: "/images/seat-map.png",
    heroVideo: "/videos/seat-map.mp4",
    auditScreenshot: "/images/seat-audit.png",
    auditVideo: "/videos/seat-audit.mp4",

    overview:
      "Seat selection interfaces are notoriously inaccessible. This project rebuilt a simplified ticket seat grid that supports full keyboard navigation, clear focus management, and screen reader announcements without relying on canvas or SVG rendering.",

    barriers: [
      {
        title: "Mouse-Only Interaction (SC 2.1.1)",
        desc: "Seats could only be selected using pointer input.",
        severity: "Critical"
      },
      {
        title: "Missing Selection Feedback (SC 4.1.3)",
        desc: "Screen reader users were not informed when seat states changed.",
        severity: "High"
      }
    ],

    constraints: [
      "Seat grid implemented using semantic HTML only.",
      "Keyboard navigation needed to remain performant."
    ],

    solution: {
      fileName: "SeatGrid.vue",
      code: `<div role="grid">
  <div role="row" v-for="row in rows">
    <button role="gridcell">Seat</button>
  </div>
</div>`,
      steps: [
        "Implemented roving tabindex for keyboard navigation.",
        "Announced seat availability and selection changes.",
        "Provided strong visible focus indicators."
      ]
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
    tagline: "Accessible Data at Scale",
    genre: "Case Study",
    tags: ["Tables", "Internal Tools", "Section 508", "Vue"],
    imageClass: "poster-blue",
    match: "94%",
    compliance: "WCAG 2.2 AA / Section 508",
    saved: false,

    subtitle: "Fixing the Most Overlooked Accessibility Surface",
    role: "Accessibility Engineer",
    timeline: "1 Day",
    stack: "Vue 3 / Vite / TypeScript",

    heroImage: "/images/dashboard.png",
    heroVideo: "/videos/dashboard.mp4",
    auditScreenshot: "/images/dashboard-audit.png",
    auditVideo: "/videos/dashboard-audit.mp4",

    overview:
      "Internal dashboards in entertainment organizations frequently overlook accessibility despite being subject to Section 508. This project focused on rebuilding a content operations dashboard with accessible tables, clear status indicators, and keyboard-friendly controls.",

    barriers: [
      {
        title: "Improper Table Semantics (SC 1.3.1)",
        desc: "Tables lacked captions, headers, and scoped columns.",
        severity: "High"
      },
      {
        title: "Color-Only Status Indicators (SC 1.4.1)",
        desc: "Status relied solely on color to convey meaning.",
        severity: "Medium"
      }
    ],

    constraints: [
      "High-density data layout could not be simplified.",
      "Internal tools required Section 508 alignment."
    ],

    solution: {
      fileName: "OperationsTable.vue",
      code: `<table>
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
        "Added captions and scoped headers for navigation.",
        "Supplemented color indicators with textual labels."
      ]
    },

    impact: {
      quote:
        "The dashboard is now usable with assistive technology and easier to scan visually.",
      author: "Internal Accessibility Audit",
      context: "Compliance Review"
    }
  }
];
