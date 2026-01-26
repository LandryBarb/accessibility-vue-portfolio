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
  repro?: string[];
  fix?: string; // New field
  criteriaMap?: CriteriaMap;
}




export interface CaseStudyMedia {
  heroImage?: string;
  heroVideo?: string;
  
  //Before State
  auditScreenshot?: string;
  auditVideo?: string;

  //After State
  remediationScreenshot?: string;
  remediationVideo?: string;
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

  // Case Study 1: Top Navigation Bar (Streaming Platform)

{
  id: 1,

  title: "Top Navigation Bar",
  subtitle: "Rebuilding a Div-Based Nav Into a Keyboard + SR-Friendly Header",
  tagline: "Landmarks, Skip Links, and Menu Button Patterns",
  genre: "Case Study",
  tags: ["Vue 3", "Navigation", "Menus", "Keyboard", "WCAG 2.2"],
  imageClass: "poster-slate",
  match: "98%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
 stack: "HTML5 / SCSS / JavaScript",

  media: {
    heroImage: "/images/thumbnails/caseStudy_1_vertical.png",
    heroVideo: "/videos/caseStudy_1_video.mp4",

    // Before State
    auditScreenshot: "/images/audits/caseStudy_1_audit.png",
    auditVideo: "/videos/caseStudy_1_video.mp4",

    // After State
    // remediationScreenshot: "/images/remediations/caseStudy_1_remediation.png",
    remediationVideo: "/videos/caseStudy_1_remediation.mp4"
  },

  overview:
    "Streaming platform top navigation frequently fails audits due to div-based click targets, missing landmarks, lack of bypass mechanisms, and inaccessible profile dropdown menus. This remediation rebuilt the top bar using semantic header/nav landmarks, a skip link, native interactive controls, and an accessible menu button pattern with predictable focus management.",

  barriers: [
    {
      title: "Mouse-Dependent Navigation Links",
      wcag: "SC 2.1.1",
      description:
        "Primary navigation items were implemented as clickable divs, preventing keyboard-only users from reaching or activating core destinations.",
      severity: "Critical"
    },
    {
      title: "Missing Programmatic Name/Role/State for Dropdown",
      wcag: "SC 4.1.2",
      description:
        "The profile dropdown toggle and menu lacked programmatic role/state (e.g., expanded/collapsed), so assistive technologies could not reliably identify or announce the control behavior.",
      severity: "High"
    },
    {
      title: "No Bypass Mechanism for Repeated Header",
      wcag: "SC 2.4.1",
      description:
        "Users had to traverse repeated navigation controls on every page before reaching the main content because no skip link was provided.",
      severity: "Medium"
    },
    {
      title: "Insufficient Focus Visibility and Modern Focus Requirements",
      wcag: "SC 2.4.7 / 2.4.13",
      description:
        "Interactive elements did not present a consistent visible focus indicator, and focus appearance requirements were not met for keyboard users.",
      severity: "High"
    },
    {
      title: "Status Indicated by Color Alone",
      wcag: "SC 1.4.1",
      description:
        "A red indicator dot conveyed 'live' status without a text equivalent, excluding users who cannot perceive color differences.",
      severity: "Medium"
    }
  ],

  constraints: [
    "Design parity maintained with no major visual layout changes.",
    "Native HTML semantics preferred over ARIA roles.",
    "Dropdown behavior required Escape-to-close and click-outside dismissal without trapping focus."
  ],

  remediation: {
    fileName: "TopNav.vue",
    codeSnippet: `<a class="skip-link" href="#main">Skip to main content</a>

<header class="topbar" role="banner">
  <nav aria-label="Primary">
    <a href="/live" aria-current="page">Live</a>
    <a href="/browse">Browse</a>

    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-controls="profileMenu"
    >
      Alex <span aria-hidden="true">▼</span>
    </button>

    <div id="profileMenu" role="menu" hidden>
      <a role="menuitem" href="/profile">Profile</a>
      <a role="menuitem" href="/billing">Account &amp; Billing</a>
      <button role="menuitem" type="button">Sign out</button>
    </div>
  </nav>
</header>`,
    steps: [
      "Replaced clickable div navigation items with semantic links and buttons to restore native keyboard behavior.",
      "Introduced header/nav landmarks and a visible-on-focus skip link to allow bypassing repeated navigation.",
      "Implemented an accessible menu button pattern using aria-expanded and aria-controls, plus Escape-to-close and click-outside dismissal.",
      "Added consistent :focus-visible styles that meet focus visibility expectations and support WCAG 2.2 focus appearance guidance.",
      "Supplemented color-only live status indicators with text equivalents (visible or screen-reader-only)."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    automation: {
      unit: [
        "Vitest: render TopNav; assert aria-expanded toggles and menu hidden state updates",
        "Vitest: Escape closes menu and restores focus to toggle"
      ],
      e2e: [
        "Playwright: Tab order reaches skip link → nav links → profile toggle; Enter opens menu; Escape closes; focus returns",
        "Playwright + axe-core: no critical violations in header/nav state"
      ]
    },
    summary:
      "After remediation, keyboard users could bypass the header, navigate primary links, open/close the profile menu with Enter/Space and Escape, and track focus reliably. Screen reader users could identify the navigation landmark and the dropdown’s expanded/collapsed state."
  },

  impact: {
    quote:
      "The navigation is now operable without a mouse, exposes proper roles and states to assistive technologies, and supports faster page traversal through a skip link.",
    author: "Accessibility Remediation Notes",
    context: "Post-Remediation Validation"
  },

  appendix: {
    accessibilityContract: {
      keyboardSupport: [
        "Tab/Shift+Tab moves through Skip Link → primary nav links → profile toggle → (when open) menu items",
        "Enter/Space on profile toggle opens/closes the menu",
        "Escape closes the menu and returns focus to the toggle",
        "Click outside closes the menu without trapping focus"
      ],
      ariaUsage: [
        "nav has aria-label='Primary' for clear landmark identification",
        "profile toggle uses aria-expanded + aria-controls + aria-haspopup='menu'",
        "role='menu' / role='menuitem' applied only to the popup menu surface where needed; native links/buttons retained"
      ],
      focusBehavior:
        "On open, focus moves to the first menuitem. On close (Escape or explicit close), focus returns to the toggle. Focus indicators are visible and not clipped/obscured.",
      screenReaderExpectations: [
        "Navigation is discoverable via landmarks (banner/navigation)",
        "Profile toggle is announced as a button with expanded/collapsed state",
        "Menu items are announced as actionable items and are reachable by Tab"
      ]
    },
    knownLimitations: [
      "This case study documents a menu-button pattern; teams may choose full WAI-ARIA menubar patterns only when arrow-key navigation requirements exist."
    ],
    followUps: [
      "Verify focus is not obscured at all responsive breakpoints (WCAG 2.4.11).",
      "Confirm interactive target sizing meets WCAG 2.2 Target Size (Minimum) expectations for touch scenarios (2.5.8)."
    ],
    regressionNotes:
      "Re-test after any header styling changes to ensure focus ring contrast and visibility remain intact.",
  }
},
// Case Study 2: Streaming Media Player
{
    id: 2,
    title: "Streaming Media Player",
    subtitle: "Eliminating Keyboard Traps and Fixing Timed Media Semantics",
    tagline: "Native Controls, Real Captions, and Event-Based Announcements",
    genre: "Case Study",
    tags: ["Media", "Captions", "Keyboard", "WCAG 2.2", "ARIA", "Focus"],
    imageClass: "poster-amber",
    match: "97%",
    compliance: "WCAG 2.2 AA",
    saved: false,

    role: "Accessibility Engineer",
    timeline: "1 Day",
    stack: "HTML5 / SCSS / JavaScript",

    media: {
      heroImage: "/images/thumbnails/caseStudy_2_vertical.png",
      heroVideo: "/videos/caseStudy_2_video.mp4",
      auditScreenshot: "/images/audits/caseStudy_2_audit.png",
      auditVideo: "/videos/caseStudy_2_video.mp4"

    },

    overview:
      "Streaming media players often fail audits due to div-based controls, incorrect ARIA roles on core interactions (e.g., scrubbers exposed as menus), and focus management anti-patterns like overriding Tab to trap users inside the player. This remediation rebuilt a prototype player around native buttons and range inputs, restored standard Tab order, implemented track-based captions, and replaced chatty alerts with polite, event-based status messages.",

    barriers: [
      {
        title: "Tab Key Trapped Inside Player",
        wcag: "SC 2.1.2",
        description:
          "A keydown handler prevented default Tab behavior and cycled focus only within a custom list, blocking users from tabbing out of the player and preventing Shift+Tab behavior.",
        severity: "Critical"
      },
      {
        title: "Controls Implemented as Clickable Divs",
        wcag: "SC 2.1.1 / 4.1.2",
        description:
          "Primary controls (play, CC/AD, timeline, queue/actions) used div + onclick with inconsistent tabindex behavior, leading to missing keyboard activation patterns and unreliable name/role/state exposure.",
        severity: "High"
      },
      {
        title: "Timeline Scrubber Exposed as role='menu'",
        wcag: "SC 1.3.1 / 4.1.2",
        description:
          "The seek control used an incorrect ARIA role and interaction model, preventing screen readers from treating it as a slider with meaningful min/max/current value behavior.",
        severity: "High"
      },
      {
        title: "Captions Not Implemented as Real Media Captions",
        wcag: "SC 1.2.2",
        description:
          "Captions were simulated as a visual overlay rather than implemented as timed text tracks on the video element, limiting interoperability with assistive technologies and standard media workflows.",
        severity: "High"
      },
      {
        title: "Status Announcements Were Too Chatty (role='alert' spam)",
        wcag: "SC 4.1.3",
        description:
          "Frequent time announcements using assertive alerts disrupted screen reader users, especially when updating continuously during playback.",
        severity: "Medium"
      },
      {
        title: "WCAG 2.2 Focus and Target Size Gaps",
        wcag: "SC 2.4.13 / 2.5.8",
        description:
          "Focus styling was inconsistent across controls and some hit targets were below recommended minimum sizing, increasing error rate for keyboard and touch users.",
        severity: "Medium"
      }
    ],

    constraints: [
      "Prototype JavaScript contained intentionally incorrect formatting/comments; remediation preserved intent while correcting behavior.",
      "Do not implement custom focus traps (no Tab interception) unless inside a true dialog/modal with an escape route.",
      "Captions and audio description are content obligations; prototype must clearly document placeholder vs real assets."
    ],

    remediation: {
      fileName: "StreamingMediaPlayer.vue",
      codeSnippet: `<video id="svVideo" preload="metadata" aria-describedby="svHelp">
  <track id="svCaptionsTrack" kind="captions" srclang="en" label="English" default />
</video>

<div id="svStatus" class="sr-only" aria-live="polite" aria-atomic="true"></div>

<button type="button" id="svPlayBtn" aria-label="Play">▶</button>

<label class="sr-only" for="svSeek">Seek</label>
<input id="svSeek" type="range" min="0" step="1" aria-label="Seek" />

<button type="button" id="svCcBtn" aria-pressed="true" aria-label="Closed captions">CC</button>
<button type="button" id="svAdBtn" aria-pressed="false" aria-label="Audio description">AD</button>`,
      steps: [
        "Removed Tab interception logic to eliminate the keyboard trap and restore standard focus traversal (Tab/Shift+Tab) through and out of the player.",
        "Replaced div-based interactive controls with native buttons and input[type='range'] controls to restore default keyboard behavior and reliable name/role/state exposure.",
        "Implemented the timeline as a real slider (range input) and synchronized its value with media currentTime/duration; added aria-valuetext to improve slider announcements without spamming a live region.",
        "Implemented captions as video text tracks and toggled captions via track.mode = 'showing' | 'hidden' rather than a purely visual overlay.",
        "Treated Audio Description as a track/version concept: in prototype, used aria-pressed to represent the setting; documented that production must switch to a described audio track or described version to satisfy content obligations.",
        "Replaced continuous time announcements with a polite, event-based live region that updates only on user actions (seek commit, toggle changes, speed changes, play/pause).",
        "Improved focus indicators via :focus-visible and ensured control sizing targets meet minimum hit area expectations (e.g., 44×44 styling for primary controls)."
      ]
    },

    verification: {
      manualTesting: {
        keyboard: true,
        screenReaders: ["NVDA", "JAWS", "VoiceOver", "TalkBack"]
      },
      automation: {
        unit: [
          "Vitest: assert Tab is not prevented; focus can leave the player container",
          "Vitest: toggling CC flips aria-pressed and updates track.mode when a track exists",
          "Vitest: seek change updates video.currentTime and posts a single polite status message"
        ],
        e2e: [
          "Playwright: keyboard-only flow (Play → Seek → Speed → CC → AD → Subtitles → Next → Mute → Audio settings) and confirm focus can move past the player",
          "Playwright + axe-core: verify no missing accessible names on controls and no invalid ARIA roles"
        ]
      },
      summary:
        "After remediation, the player no longer trapped keyboard users, all primary controls were operable via native keyboard patterns, the seek interaction was exposed as a real slider, captions were implemented via tracks (with placeholder asset requirements documented), and status messages were announced politely only on user-triggered events."
    },

    impact: {
      quote:
        "This remediation restored standard media-player interaction patterns for keyboard and screen reader users while reducing disruptive announcements and clarifying content obligations for captions and described audio.",
      author: "Accessibility Audit Summary",
      context: "Player Remediation Review"
    },

    appendix: {
      accessibilityContract: {
        keyboardSupport: [
          "Tab/Shift+Tab moves through all controls in a logical order and can exit the player (no trap).",
          "Play/Pause: Enter/Space toggles and updates accessible name (Play ↔ Pause).",
          "Seek slider: Arrow keys adjust value; Home/End jump; change commits seek and triggers a single status message.",
          "CC/AD: Enter/Space toggles aria-pressed and posts a polite status message.",
          "Mute: Enter/Space toggles aria-pressed and updates label/icon."
        ],
        ariaUsage: [
          "Use native <button> and <input type='range'>; avoid role overrides.",
          "Use aria-pressed for toggle buttons (CC/AD/Mute) to expose state.",
          "Use aria-live='polite' for status messages; avoid role='alert' for frequent updates.",
          "Use aria-valuetext on seek slider to improve SR output without live-region spam."
        ],
        focusBehavior:
          "No forced focus on mount. No Tab interception. Focus indicators visible with :focus-visible and not clipped/obscured. Controls sized to support WCAG 2.2 target size expectations.",
        screenReaderExpectations: [
          "Seek is announced as a slider with value/valuetext (mm:ss of mm:ss).",
          "CC/AD/Mute announce pressed/not pressed.",
          "Status messages announce discrete events (Playing/Paused, Seeked to…, Captions on/off, Playback speed…) and do not announce continuous time updates."
        ]
      },
      knownLimitations: [
        "Captions require a real .vtt asset in production to fully satisfy 1.2.2; the prototype track may be present without an external source.",
        "Audio Description conformance depends on actual described audio content (alternate track or described version), not merely a toggle UI."
      ],
      followUps: [
        "Verify focus is not obscured across responsive layouts (WCAG 2.4.11 Focus Not Obscured (Minimum)).",
        "Confirm target sizes meet WCAG 2.2 2.5.8 Target Size (Minimum) for all controls, including dense layouts.",
        "If any drag-based interactions remain, ensure non-drag alternatives meet WCAG 2.2 2.5.7 Dragging Movements."
      ],
      regressionNotes:
        "Any future attempt to 'manage focus' via Tab overrides must be rejected unless implemented inside an actual dialog with a correct focus trap and Escape/close behavior.",
      defectLog: [
        {
          id: "PLY-01",
          issue: "Tab key trapped inside player due to preventDefault + forced cycling",
          severity: "Critical",
          status: "Fixed",
          repro: ["Focus any control inside the player", "Press Tab repeatedly", "Observe focus cannot leave player; Shift+Tab unsupported"],
          fix: "Remove Tab interception and rely on native DOM tab order",
          criteriaMap: { wcag22: ["2.1.2", "2.1.1", "2.4.3"] }
        },
        {
          id: "PLY-02",
          issue: "Timeline exposed with incorrect role (menu) instead of slider semantics",
          severity: "High",
          status: "Fixed",
          repro: ["Use NVDA/VoiceOver to focus timeline", "SR announces incorrect role and lacks slider interaction model"],
          fix: "Use <input type='range'> (or valid slider role) with proper labeling/value semantics",
          criteriaMap: { wcag22: ["1.3.1", "4.1.2", "2.1.1"] }
        },
        {
          id: "PLY-03",
          issue: "Captions rendered as visual overlay, not real timed text tracks",
          severity: "High",
          status: "Fixed",
          repro: ["Toggle CC", "Captions do not map to video textTracks/track.mode"],
          fix: "Add <track kind='captions'> and toggle track.mode; document real .vtt requirement",
          criteriaMap: { wcag22: ["1.2.2"] }
        },
        {
          id: "PLY-04",
          issue: "Core controls are divs with onclick; inconsistent focus/activation/name",
          severity: "High",
          status: "Fixed",
          repro: ["Try to operate controls with keyboard only", "Some controls unreachable; Space/Enter behavior inconsistent"],
          fix: "Replace with native <button> and <input> controls; ensure labels/states are programmatic",
          criteriaMap: { wcag22: ["2.1.1", "4.1.2", "2.4.7"] }
        },
        {
          id: "PLY-05",
          issue: "role='alert' time announcements spam screen readers during playback",
          severity: "Medium",
          status: "Fixed",
          repro: ["Start playback with screen reader running", "Observe frequent interruptive announcements"],
          fix: "Use aria-live='polite' and only announce on user-triggered events (seek commit, toggles, speed, play/pause)",
          criteriaMap: { wcag22: ["4.1.3"] }
        }
      ]
    }
  },
// Case Study 3: Continue Watching Tabs
{
  id: 3,

  title: "Continue Watching",
  subtitle: "Fixing Non-Semantic Content Switching",
  tagline: "Keyboard-Accessible Tabs Without Context Loss",
  genre: "Case Study",
  tags: ["Tabs", "ARIA", "Keyboard Navigation", "WCAG 2.2", "Vue 3"],
  imageClass: "poster-indigo",
  match: "96%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
stack: "HTML5 / SCSS / JavaScript",

  media: {
   heroImage: "/images/thumbnails/caseStudy_3_vertical.png",
    heroVideo: "/videos/caseStudy_3_video.mp4",
    auditScreenshot: "/images/audits/caseStudy_3_audit.png",
    auditVideo: "/videos/caseStudy_3_video.mp4"
  },

  overview:
    "Streaming discovery surfaces often rely on visually styled tabs that lack semantic roles and predictable keyboard behavior. This case study focused on remediating a three-mode discovery switcher by implementing a proper tablist pattern with explicit relationships between tabs and panels, restoring expected arrow-key navigation and preventing unexpected context changes.",

  barriers: [
    {
      title: "Visually Styled Tabs Lacked Semantic Roles",
      wcag: "SC 4.1.2",
      description:
        "Discovery mode controls were implemented as generic div elements with aria-selected but no tab roles, preventing assistive technologies from identifying the widget as a tab interface.",
      severity: "High"
    },
    {
      title: "Keyboard Navigation Did Not Match Tab Expectations",
      wcag: "SC 2.1.1",
      description:
        "Arrow keys, Home, and End did not move focus between discovery modes, requiring users to tab through each control sequentially.",
      severity: "High"
    },
    {
      title: "Content Switched on Focus Instead of Activation",
      wcag: "SC 3.2.1",
      description:
        "Panels could change visibility when focus moved, creating unexpected context changes for keyboard and screen reader users.",
      severity: "Medium"
    }
  ],

  constraints: [
    "Visual styling and layout could not change.",
    "Content panels had to remain mounted for performance reasons."
  ],

  remediation: {
    fileName: "DiscoveryTabs.vue",
    codeSnippet: `<div role="tablist" aria-label="Discovery modes">
  <button role="tab" aria-selected="true" aria-controls="panel-continue">
    Continue Watching
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-for-you">
    For You
  </button>
</div>

<div id="panel-continue" role="tabpanel">
  <!-- active content -->
</div>`,
    steps: [
      "Replaced generic div controls with semantic tab and tabpanel roles.",
      "Linked tabs to panels using aria-controls and aria-labelledby.",
      "Implemented arrow-key, Home, and End navigation per tab interface expectations.",
      "Ensured panels change only on explicit activation, not focus."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    summary:
      "Keyboard users could move between discovery modes using arrow keys without triggering unintended content changes, and screen readers correctly announced the tab count, selected state, and associated panels."
  },

  impact: {
    quote:
      "The discovery switcher now behaves like a standard tab interface, reducing cognitive load and preventing accidental context changes.",
    author: "Accessibility Review Notes",
    context: "Post-Remediation Validation"
  },

  appendix: {
    accessibilityContract: {
      keyboardSupport: [
        "Left/Right arrows move focus between tabs",
        "Home/End jump to first and last tabs",
        "Enter/Space activates the focused tab"
      ],
      ariaUsage: [
        "role='tablist' groups discovery modes",
        "role='tab' with aria-selected exposes state",
        "role='tabpanel' linked via aria-controls"
      ],
      focusBehavior:
        "Focus remains on the active tab after activation; panels do not steal focus.",
      screenReaderExpectations: [
        "Tabs are announced with position and selected state",
        "Only the active panel is exposed to virtual cursor navigation"
      ]
    }
  }
},
// Case Study 4: Left Rail Navigation (Streaming Platform)
{
  id: 4,

  title: "Left Rail Navigation — Streaming Genre Nav",
  subtitle: "Fixing Keyboard Access & Disclosure Semantics",
  tagline: "Landmarks, Skip Links, and WCAG 2.2 Focus Compliance",
  genre: "Case Study",
  tags: ["Navigation", "Skip Link", "Disclosure", "WCAG 2.2", "HTML5"],
  imageClass: "poster-slate",
  match: "95%",
  compliance: "WCAG 2.2 AA",
  saved: false,

  role: "Accessibility Engineer",
  timeline: "1 Day",
  stack: "HTML /  SCSS / JavaScript",

  media: {
    heroImage: "/images/thumbnails/caseStudy_4_vertical.png",
    auditScreenshot: "/images/audits/caseStudy_4_audit.png",
    heroVideo: "/videos/caseStudy_4_video.mp4",
    auditVideo: "/videos/caseStudy_4_video.mp4"
  },

  overview:
    "Streaming UIs frequently ship persistent left-rail navigation built with clickable divs, missing landmarks, and inaccessible expand/collapse groups. This case study remediated a genre rail by implementing a proper nav landmark, skip navigation, semantic lists, and disclosure controls with explicit expanded state ensuring full keyboard operation and WCAG 2.2 focus visibility requirements.",

  barriers: [
    {
      title: "Clickable Div Navigation Items",
      wcag: "SC 2.1.1",
      description:
        "Genre items and controls were implemented as non-semantic div elements, preventing reliable keyboard access and assistive technology identification.",
      severity: "Critical"
    },
    {
      title: "Missing Navigation Landmark and Headings",
      wcag: "SC 1.3.1",
      description:
        "The left rail was not exposed as a navigation landmark and section headings were not programmatic headings, reducing navigability for screen reader users.",
      severity: "High"
    },
    {
      title: "Disclosure Groups Lacked Programmatic State",
      wcag: "SC 4.1.2",
      description:
        "Expandable micro-genre groups did not expose expanded/collapsed state or relationships, making sub-genre content unpredictable for assistive technologies.",
      severity: "High"
    },
    {
      title: "No Bypass Mechanism for Persistent Navigation",
      wcag: "SC 2.4.1",
      description:
        "Users had to tab through the full left rail on every page load due to a missing skip link to main content.",
      severity: "High"
    }
  ],

  constraints: [
    "Visual styling and layout parity maintained (no redesign).",
    "Sticky behavior preserved; focus indicators could not be clipped.",
    "Native HTML semantics preferred over ARIA-heavy patterns."
  ],

  remediation: {
    fileName: "LeftRailGenres.vue",
    codeSnippet: `<a class="skip-link" href="#main">Skip to main content</a>

<nav aria-labelledby="lr-title">
  <h2 id="lr-title">Streaming Genres</h2>

  <button aria-expanded="false" aria-controls="lr-group-horror">
    Horror vaults
  </button>

  <ul id="lr-group-horror" hidden>
    <li><a href="/genres/horror-found">Found Footage</a></li>
  </ul>
</nav>`,
    steps: [
      "Converted the rail to a <nav> landmark with real headings for structural navigation.",
      "Replaced clickable divs with native a tags and button elements for keyboard reliability.",
      "Implemented disclosure groups using aria-expanded + aria-controls and hid collapsed content with the hidden attribute.",
      "Added a skip link targeting <main> to bypass the persistent rail.",
      "Added focus-visible styles and verified focus was not obscured in sticky/scroll states (WCAG 2.2)."
    ]
  },

  verification: {
    manualTesting: {
      keyboard: true,
      screenReaders: ["NVDA", "VoiceOver"]
    },
    automation: {
      unit: [
        "Vitest: render LeftRailGenres; assert aria-expanded toggles and hidden state updates"
      ],
      e2e: [
        "axe DevTools (page scan)", "WAVE (structure validation)"
      ]
    },
    summary:
      "Keyboard users could bypass the rail, expand/collapse groups, and navigate all links without focus loss. Screen readers exposed the rail as a navigation landmark with headings and correctly announced disclosure states and current location."
  },

  impact: {
    quote:
      "Navigation became fully keyboard-operable with predictable structure and disclosure behavior, reducing repeated-navigation fatigue and meeting WCAG 2.2 focus requirements.",
    author: "Accessibility Verification Notes",
    context: "Post-Remediation Validation"
  },

  appendix: {
    accessibilityContract: {
      keyboardSupport: [
        "Tab/Shift+Tab moves through links and buttons in a logical order",
        "Enter activates links and toggles disclosure buttons",
        "Collapsed sub-genre content is removed from the tab order"
      ],
      ariaUsage: [
        "aria-current='page' for the active genre route",
        "aria-expanded and aria-controls on disclosure toggles"
      ],
      focusBehavior:
        "Visible focus indicator on all interactive elements; focus is not clipped within sticky/scroll containers.",
      screenReaderExpectations: [
        "Nav landmark discoverable via landmarks list",
        "Section headings discoverable via heading navigation",
        "Disclosure toggles announce expanded/collapsed state"
      ]
    },
    knownLimitations: [
      "Touch target sizing may require additional spacing for strict mobile heuristics depending on final CSS."
    ],
    regressionNotes:
      "Re-test focus visibility after any overflow/sticky CSS changes and verify aria-current remains accurate after routing refactors."
  }
}




];
