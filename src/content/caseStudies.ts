export interface CaseStudyEvidence {
  label: string
  value: string
}

export interface CaseStudySection {
  title: string
  body: string
}

export interface CaseStudy {
  id: string
  title: string
  shortDescription: string

  // High-level overview (used in index view)
  overview: string
  role: string

  // Problem → Solution narrative
  challenges: CaseStudySection[]
  solutions: CaseStudySection[]

  // Accessibility-specific breakdown
  accessibilityImprovements: {
    title: string
    description: string
  }[]

  // Outcomes / proof
  evidence: CaseStudyEvidence[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'streaming-player-accessibility',
    title: 'Accessible Streaming Player Redesign',
    shortDescription:
      'Improving accessibility of core playback controls across devices while preserving a familiar streaming experience.',

    overview:
      'A global streaming platform required a redesign of its core media player to meet WCAG 2.2 AA standards without disrupting established user behavior.',

    role:
      'Accessibility Engineer responsible for auditing, remediation, and validation of player interactions across keyboard, screen reader, and remote-based inputs.',

    challenges: [
      {
        title: 'Inaccessible Playback Controls',
        body:
          'Key player controls were unreachable via keyboard and inconsistent across devices, particularly in TV and living-room contexts.',
      },
      {
        title: 'Focus Traps in Overlays',
        body:
          'Settings and caption overlays trapped focus and lacked proper escape and return behavior.',
      },
    ],

    solutions: [
      {
        title: 'Consistent Focus Order',
        body:
          'Re-established logical focus order across all playback controls using native semantics and minimal ARIA.',
      },
      {
        title: 'Accessible Dialog Patterns',
        body:
          'Rebuilt settings overlays as accessible dialogs with focus containment and predictable exit behavior.',
      },
    ],

    accessibilityImprovements: [
      {
        title: 'Captions & Subtitles',
        description:
          'Standardized caption rendering and ensured keyboard and screen-reader access to caption controls.',
      },
      {
        title: 'Keyboard Navigation',
        description:
          'Achieved full keyboard coverage for all player interactions without focus loss.',
      },
      {
        title: 'Settings Dialog',
        description:
          'Implemented WCAG-compliant dialog behavior with correct focus management.',
      },
    ],

    evidence: [
      { label: 'WCAG Compliance', value: 'WCAG 2.2 AA' },
      { label: 'Keyboard Coverage', value: '100%' },
      { label: 'Assistive Tech Tested', value: 'NVDA, VoiceOver' },
    ],
  },
]
