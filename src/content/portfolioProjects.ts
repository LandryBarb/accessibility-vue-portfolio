import { projects, type Project } from './projects'

export interface PortfolioProject extends Project {
  category: 'Remediation' | 'Audits' | 'Design Systems' | 'Mobile'
  compliance: string
  gradientClass: string
  description: string
  tags: string[]
}

export const portfolioProjects: PortfolioProject[] = projects.map((p) => {
  switch (p.id) {
    case 'streaming-player-accessibility':
      return {
        ...p,
        category: 'Mobile',
        compliance: 'WCAG 2.2 AA',
        gradientClass: 'bg-gradient-to-br from-blue-900 to-slate-900',
        description:
          'Fixing keyboard traps in a 10ft TV interface used by 5M+ users.',
        tags: ['React Native', 'TVOS', 'Focus Mgmt'],
      }

    case 'tv-app-navigation':
      return {
        ...p,
        category: 'Design Systems',
        compliance: 'WCAG 2.1 AA',
        gradientClass: 'bg-gradient-to-br from-purple-900 to-slate-900',
        description:
          'Spatial navigation model for remote-driven TV interfaces.',
        tags: ['10ft UI', 'Focus Engine'],
      }

    default:
      return {
        ...p,
        category: 'Audits',
        compliance: 'WCAG 2.1 AA',
        gradientClass: 'bg-gradient-to-br from-slate-800 to-slate-900',
        description: p.meta,
        tags: [],
      }
  }
})
