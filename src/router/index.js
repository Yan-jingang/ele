import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'login',
    component: () => import('@/views/Login/Login.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router