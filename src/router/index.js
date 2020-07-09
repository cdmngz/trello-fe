import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: false }

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = store.state.token
  if(reqAuth && !isAuth) {
    next('/')
  } else if(reqAuth===false && isAuth) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
