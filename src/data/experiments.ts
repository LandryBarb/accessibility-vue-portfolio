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
    desc: "A circular action trigger with WCAG 2.5.5 touch targets (44px+) and high-contrast focus rings for dark mode.",
    imageClass: "poster-purple",
    tags: ["Touch Target", "Focus", "Interactive"],
    
    componentKey: 'IconButton', 
    
    codeSnippet: `<IconButton 
  :icon="Heart" 
  variant="secondary" 
  label="Like"
  :pressed="isLiked"
  @click="toggleLike"
/>`,
    
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
  }
];