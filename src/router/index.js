import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectPage from '@/components/projects/Project-Page'
import AnonymousPage from '@/components/user/Anonymous-Page'
import SignUpPage from '@/components/user/Sign-Up-Page'
import SignInPage from '@/components/user/Sign-In-Page'
import SettingsPage from '@/components/user/Settings-page'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/project/:projectId',
      name: 'Project',
      component: ProjectPage
    },
    {
      path: '/guest-mode',
      component: AnonymousPage
    },
    {
      path: '/sign-up',
      component: SignUpPage
    },
    {
      path: '/sign-in',
      component: SignInPage
    },
    {
      path: '/settings',
      component: SettingsPage
    }
  ],
  mode: 'history'
})

export default router
