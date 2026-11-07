import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BioView from '@/views/BioView.vue'
import HobbiesView from '@/views/HobbiesView.vue'
import IdeasView from '@/views/IdeasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: ['/index.html'],
      component: HomeView,
      meta: {
        title: 'Yasha Gozwan Shuhada | Mobile Engineer',
        description:
          'Portfolio of Yasha Gozwan Shuhada, a Mobile Engineer specializing in Flutter & native iOS/Android development with over 4 years of experience in fintech and enterprise solutions.',
      },
    },
    {
      path: '/bio',
      name: 'bio',
      alias: ['/bio.html', '/bio/'],
      component: BioView,
      meta: {
        title: 'Yasha Gozwan Shuhada | Bio & Profile',
        description:
          'Biography and career highlights of Yasha Gozwan Shuhada, Flutter Mobile Engineer specializing in Clean Architecture and mobile delivery.',
      },
    },
    {
      path: '/hobbies',
      name: 'hobbies',
      alias: ['/hobbies.html', '/hobbies/'],
      component: HobbiesView,
      meta: {
        title: 'Hobbies | Yasha Gozwan Shuhada',
        description:
          'Explore the personal hobbies, philosophy readings, gym activities, and mobile development explorations of Yasha Gozwan Shuhada.',
      },
    },
    {
      path: '/ideas',
      name: 'ideas',
      alias: ['/ideas.html', '/ideas/'],
      component: IdeasView,
      meta: {
        title: 'Ideas & Reflections — Yasha Gozwan Shuhada',
        description:
          'Books, ideas, and personal reflections explored outside of software engineering by Yasha Gozwan Shuhada.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  if (typeof document !== 'undefined') {
    const title = (to.meta.title as string) || 'Yasha Gozwan Shuhada | Mobile Engineer'
    document.title = title

    const descEl = document.querySelector('meta[name="description"]')
    if (descEl && to.meta.description) {
      descEl.setAttribute('content', to.meta.description as string)
    }
  }
})

export default router

