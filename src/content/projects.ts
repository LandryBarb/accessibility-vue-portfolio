export const experiments = [
  {
    id: 101,
    title: "Accessible Toggle",
    category: "Component",
    stack: "Vue 3 / Headless",
    compliance: "AAA",
    desc: "A switch component using native <button> with proper ARIA states.",
    imageClass: "poster-blue",
    tags: ["Form", "ARIA"],
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 102,
    title: "Combobox Autocomplete",
    category: "Form",
    stack: "React / Downshift",
    compliance: "AA",
    desc: "Complex input handling aria-activedescendant for filtered lists.",
    imageClass: "poster-purple",
    tags: ["Input", "Focus"],
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 103,
    title: "Focus Trap Modal",
    category: "Pattern",
    stack: "Vanilla JS",
    compliance: "AAA",
    desc: "Lightweight script to constrain tab cycles within dialogs.",
    imageClass: "poster-emerald",
    tags: ["Modal", "Focus"],
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 104,
    title: "Reduced Motion Hook",
    category: "Utility",
    stack: "CSS / JS",
    compliance: "Best Practice",
    desc: "System-wide hook respecting OS motion preferences.",
    imageClass: "poster-orange",
    tags: ["Animation", "Hook"],
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 105, // Unique ID
    title: "Accessible Button Atom",
    category: "Component",
    stack: "Vue 3 / TS",
    compliance: "AAA",
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
  }
];