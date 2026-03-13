import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ExperiencePage from '@/pages/ExperiencePage.vue'
import SkillsPage from '@/pages/SkillsPage.vue'
import ContactPage from '@/pages/ContactPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/experience', component: ExperiencePage },
    { path: '/skills', component: SkillsPage },
    { path: '/contact', component: ContactPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
