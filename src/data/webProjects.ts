// src/data/webProjects.ts


export interface WebProject {
  id: number;
  title: string;
  category: string;      // used for filtering
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
  websiteAddress?: string; // optional website address for display
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
    thumbnail: "/images/webProjects/voice-actor-hero.png",
    heroImage: "/images/webProjects/voice-actor-hero.png",
    homepageImage: "/images/webProjects/voice-actor-home.png",
   liveLink: "https://marksilvermanvoice.com/",
   websiteAddress: "marksilvermanvoice.com",
    figmaLink: "https://www.figma.com/design/kbORIYp7VxURzQnT7pJ35l/Mark-Silverman-Voice-Actor?node-id=8447-12&t=1hQfbZsJJi6Qh9IA-1"
  },
 {
    id: 202,
    title: "Actor Website Design",
    category: "Web Design",
    stack: "Figma",
    compliance: "In progress: WCAG 2.1 AA",
    desc: "A modern, accessible website design for an actor's portfolio, focusing on visual storytelling and ease of navigation.",
    imageClass: "poster-purple",
    tags: ["Landing Page", "Dark Mode", "Performance"],
    thumbnail: "/images/webProjects/actor-hero.png",
    heroImage: "/images/webProjects/actor-hero.png",
    homepageImage: "/images/webProjects/actor-full.png",
    websiteAddress: "actor-portfolio.com",
    // No liveLink provided -> Triggers Detail View
    figmaLink: "https://www.figma.com/design/lbYxrVaSOZXTqgNXCMT79s/Actor-Template?node-id=2185-168&t=EgnDp1v7U9IicaKe-1"
  },
  {
    id: 203,
    title: "VR Production Studio Website",
    category: "Web Design",
    stack: "Figma",
    compliance: "In progress: WCAG 2.1 AA",
    desc: "A sleek, futuristic website design for a VR production studio, emphasizing immersive visuals and user engagement.",
    imageClass: "poster-zinc",
    tags: ["Figma", "Dark Mode", "Visual Design"],
    thumbnail: "/images/webProjects/vrStudio-hero.png",
    heroImage: "/images/webProjects/vrStudio-hero.png",
    homepageImage: "/images/webProjects/vrStudio-full.png",
    websiteAddress: "opus-vfx.com",
    figmaLink: "https://www.figma.com/design/OaP8dkLH8T7vD0TLoeZ3Xl/Opus-VFX-Webflow-Website?node-id=6383-168&t=Y07yYtEFNku9XOb1-1 "
  },
  {
    id: 204,
    title: "Law Enforcement Agency Website",
    category: "Web Design",
    stack: "Webflow / Figma",
    compliance: "In progress: WCAG 2.0 A",
    desc: "A sleek, futuristic website design for a law enforcement agency, emphasizing accessibility and clear communication.",
    imageClass: "poster-zinc",
    tags: ["Figma", "Dark Theme", "AI assisted Design"],
    thumbnail: "/images/webProjects/law-enforcement-hero.png",
    heroImage: "/images/webProjects/law-enforcement-hero.png",
    homepageImage: "/images/webProjects/law-enforcement-full.png",
    websiteAddress: "aztac-staging.webflow.io/",
    liveLink: "https://aztac-staging.webflow.io/",
    
  },

   {
    id: 205,
    title: "Dancer Website",
    category: "Website",
    stack: "HTML / Tailwind CSS / JavaScript",
    compliance: "In progress: WCAG 2.0 A",
    desc: "A sleek, captivating website design for a dancer or performer, emphasizing subtle  impactful design and clear communication.",
    imageClass: "poster-orange",
    tags: ["Figma", "Dark Theme", "AI assisted Design"],
    thumbnail: "/images/webProjects/dancer-hero.png",
    heroImage: "/images/webProjects/dancer-hero.png",
    homepageImage: "/images/webProjects/dancer-full.png",

    websiteAddress: "dancer-portfolio.com",
    
    
  },
];
