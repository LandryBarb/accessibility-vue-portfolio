
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CaseStudyView from "../views/CaseStudyView.vue";
import CaseStudiesView from "../views/CaseStudiesView.vue";
import PortfolioView from "../views/PortfolioView.vue";
import AboutView from "../views/AboutView.vue";
import SettingsView from "../views/SettingsView.vue";
import SearchView from "../views/SearchView.vue";
import NotFoundView from '../views/NotFoundView.vue'

// Define application routes. Each route maps a path to a component.
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
      path: '/case-studies',
      name: 'case-studies',
      component: CaseStudiesView,
      meta: { title: 'Case Studies' }
    },
     {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
      meta: { title: 'Full Portfolio' }
    },

  {
    path: '/case-studies/:id',
    name: 'case-study',
    component: CaseStudyView,
    props: true,
  },
  

    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { title: 'Search Work' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { title: 'Settings' }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { title: 'About Me' }
    },
    // Catch-all 404 route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Page Not Found' }
    }


];

// Create the router instance with history mode for clean URLs.
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/* ✅ ACCESSIBLE ROUTE FOCUS HANDLING */
router.afterEach(() => {
  requestAnimationFrame(() => {
    const main = document.getElementById('main-content')
    main?.focus()
  })
});

// Optional: Global Navigation Guard for Document Title
router.afterEach((to) => {
  const title = to.meta.title ? `${to.meta.title} | Streaming UI Portfolio` : 'Streaming UI Portfolio';
  document.title = title;
});