import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/home',
        name: "home",
        component: () => import('../views/home')
      },
      {
        path: '/User',
        name: "user",
        component: () => import('../views/User')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/Mall')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router