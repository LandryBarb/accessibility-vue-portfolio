import { Heart, Play, Search, Settings, Check } from "lucide-vue-next";

export const experiments = [
  
  {
    id: 101, // Unique ID
    title: "Accessible Button Atom",
    category: "Component",
    stack: "Vue 3 / TS",
    compliance: "WCAG 2.2 AA",
    desc: "A foundational button component enforcing contrast ratios, focus states, and loading/disabled aria-attributes automatically.",
    imageClass: "poster-blue",
    tags: ["UI Kit", "Focus", "States"],
    
    // THE IMPORTANT PART:
    componentKey: 'BaseButton', // Must match the key in Step 3
    
    // Code to display in the snippet window
    codeSnippet: `<BaseButton 
  variant="primary" 
  size="md" 
  :loading="isLoading"
  @click="submit"
>
  Submit Request
</BaseButton>`,
    
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 102,
    title: "Icon Button Atom",
    category: "Component",
    stack: "Vue 3 / TS",
    compliance: "WCAG 2.2 AA",
    desc: "A strictly square, touch-target compliant action trigger. Supports toggle states (aria-pressed) for media controls.",
    imageClass: "poster-purple",
    tags: ["Touch Target", "Focus", "Interactive"],
    
    componentKey: 'IconButton', 
    
    // Explicit props for the Demo Stage
    props: {
      icon: Play,
      variant: 'secondary',
      size: 'lg',
      label: 'Play Video', // Accessibility Requirement
      pressed: false
    },
    
    codeSnippet: `<template>
  <div class="controls">
    <IconButton :icon="Rewind" label="Rewind 10s" variant="ghost" />
    
    <IconButton 
      :icon="isPlaying ? Pause : Play" 
      :label="isPlaying ? 'Pause' : 'Play'" 
      variant="primary" 
      size="lg"
      @click="togglePlay"
    />
    
    <IconButton :icon="FastForward" label="Fast Forward 10s" variant="ghost" />
  </div>
</template>`,
    
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 103,
    title: "Search Input",
    category: "Form",
    stack: "Vue 3 / Debounce",
    compliance: "AAA",
    desc: "A glassmorphic search field with debounce logic, programmatic focus management on clear, and loading states.",
    imageClass: "poster-emerald",
    tags: ["Input", "Focus Mgmt", "Debounce"],
    
    componentKey: 'SearchInput',
    
    codeSnippet: `<SearchInput 
  v-model="query" 
  :loading="isSearching" 
  placeholder="Search database..." 
  @search="performSearch"
/>`,
    
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 104,
    title: "Accordion Molecule",
    category: "Molecule",
    stack: "Vue 3 / CSS Grid",
    compliance: "AAA",
    desc: "A strictly semantic accordion using Heading tags for navigation and CSS Grid for performant 0-to-auto height animation.",
    imageClass: "poster-blue",
    tags: ["Pattern", "Semantics", "Animation"],
    
    componentKey: 'AccordionItem',
    
    codeSnippet: `<AccordionItem 
  title="What is Accessibility?" 
  headingTag="h3"
  startOpen
>
  <p>Accessibility is the practice of making your websites usable by as many people as possible.</p>
</AccordionItem>`,
    
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 105,
    title: "Accordion Group",
    category: "Organism",
    stack: "Vue 3 / Composition",
    compliance: "AAA",
    desc: "A composite organism that manages a vertical stack of disclosure widgets with consistent spacing and typography.",
    imageClass: "poster-orange",
    tags: ["Layout", "Organism", "Content"],
    
    componentKey: 'Accordion',
    
    codeSnippet: `<Accordion 
  :items="[
    { title: 'Is this accessible?', content: 'Yes, fully WCAG compliant.', startOpen: true },
    { title: 'Can I use keyboard?', content: 'Yes, use Tab and Enter/Space.' }
  ]" 
/>`,
    
    repoLink: "#",
    demoLink: "#"
  },
 {
    id: 106,
    title: "Icon Atom",
    category: "Component",
    stack: "Vue 3 / TS / SVG",
    compliance: "AAA",
    desc: "A standardized SVG wrapper that enforces semantic roles for meaningful icons while silencing decorative ones to reduce screen reader noise.",
    imageClass: "poster-purple",
    tags: ["Iconography", "Atom", "Semantics"],
    
    componentKey: 'Icon',
    
    // Explicitly demonstrate semantic usage
    props: {
      as: Heart,
      size: 'xl',
      tone: 'brand',
      decorative: false,
      label: 'Add to Favorites'
    },
    
    codeSnippet: `<template>
  <Icon :as="Search" tone="muted" />

  <Icon 
    :as="Heart" 
    size="xl" 
    tone="brand" 
    :decorative="false" 
    label="Add to Favorites" 
  />
</template>`,
    
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 107,
    title: "Typography (Text Atom)",
    category: "Component",
    stack: "Vue 3 / Polymorphic",
    compliance: "AAA",
    desc: "A polymorphic text primitive that unifies font stacks, weights, and accessible color tokens into semantic presets.",
    imageClass: "poster-slate",
    tags: ["Typography", "Design System", "Tokens"],
    
    componentKey: 'Text',
    
    // Demo Props
    props: {
      as: 'h2',
      variant: 'heading',
      tone: 'brand',
      truncate: false
    },
    
    // Code Snippet Display
    codeSnippet: `<template>
  <Text as="h1" variant="heading">Page Title</Text>
  
  <Text as="span" variant="meta" tone="muted">Published Today</Text>
  
  <Text as="p" variant="caption" tone="danger">Invalid input</Text>
</template>`,
    
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 108,
    title: "Badge Atom",
    category: "Component",
    stack: "Vue 3 / TS",
    compliance: "AAA",
    desc: "Compact status indicators using Stagecraft semantic tones. Supports solid, subtle, and outline variants with optional icons.",
    imageClass: "poster-cyan", // Matches 'status' vibe
    tags: ["Status", "Metadata", "Atom"],
    
    componentKey: 'Badge',
    
    // Demo Props
    props: {
      label: "System Operational",
      tone: "success",
      variant: "subtle",
      icon: Check
    },
    
    codeSnippet: `<template>
  <div class="flex gap-2">
    <Badge label="New" tone="brand" variant="solid" />
    <Badge label="Verified" tone="success" variant="outline" />
    
    <Badge 
      label="Security Risk" 
      tone="danger" 
      variant="subtle" 
      :icon="ShieldAlert" 
    />
  </div>
</template>`,
    
    repoLink: "#",
    demoLink: "#"
  }
];