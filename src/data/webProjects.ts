// src/data/webProjects.ts


export interface WebProject {
  id: number;
  title: string;
  category: "Website";      // used for filtering
  stack: string;            // e.g. "Vue 3 / Nuxt"
  compliance: string;       // if relevant
  desc: string;             // short description of the project
  imageClass: string;       // reuse poster-* classes for gradient thumbnails
  tags: string[];
thumbnail?: string;      // path to thumbnail image
  heroImage: string;        // path to hero screenshot (16:9 aspect)
  homepageImage: string;    // full‑page/home‑page screenshot
  liveLink?: string;         // URL to the live site
  figmaLink?: string;       // optional Figma prototype link
  repoLink?: string;        // optional code repository
}

export const webProjects: WebProject[] = [
  {
    id: 201,
    title: "Voice Actor Website",
    category: "Website",
    stack: "HTML / CSS / JavaScript",
    compliance: "In progress: WCAG 2.1 AA",
    desc:
      "Responsive redesign of a voice actor's website with accessible controls and clear hierarchy.",
    imageClass: "poster-emerald",
    tags: ["Responsive", "Figma", "Semantic HTML"],
    thumbnail: "/images/webProjects/voice-actor-hero.webp",
    heroImage: "/images/webProjects/voice-actor-hero.webp",
    homepageImage: "/images/webProjects/voice-actor-home.webp",
   liveLink: "https://marksilvermanvoice.com/",
    figmaLink: "https://www.figma.com/design/kbORIYp7VxURzQnT7pJ35l/Mark-Silverman-Voice-Actor?node-id=8447-12&t=1hQfbZsJJi6Qh9IA-1"
  },
 {
    id: 202,
    title: "Actor Website Design",
    category: "Website",
    stack: "Figma",
    compliance: "In progress: WCAG 2.1 AA",
    desc: "A modern, accessible website design for an actor's portfolio, focusing on visual storytelling and ease of navigation.",
    imageClass: "poster-purple",
    tags: ["Landing Page", "Dark Mode", "Performance"],
    thumbnail: "/images/webProjects/actor-hero.webp",
    heroImage: "/images/webProjects/actor-hero.webp",
    homepageImage: "/images/webProjects/actor-full.webp",
    // No liveLink provided -> Triggers Detail View
    figmaLink: "https://www.figma.com/design/lbYxrVaSOZXTqgNXCMT79s/Actor-Template?node-id=2185-168&t=EgnDp1v7U9IicaKe-1"
  },
  {
    id: 203,
    title: "VR Production Studio Website",
    category: "Website",
    stack: "Figma",
    compliance: "In progress: WCAG 2.1 AA",
    desc: "A sleek, futuristic website design for a VR production studio, emphasizing immersive visuals and user engagement.",
    imageClass: "poster-pink",
    tags: ["Figma", "Dark Mode", "Visual Design"],
    thumbnail: "/images/webProjects/vrStudio-hero.webp",
    heroImage: "/images/webProjects/vrStudio-hero.webp",
    homepageImage: "/images/webProjects/vrStudio-full.webp",
    figmaLink: "https://www.figma.com/design/OaP8dkLH8T7vD0TLoeZ3Xl/Opus-VFX-Webflow-Website?node-id=6383-168&t=Y07yYtEFNku9XOb1-1 "
  },
];
