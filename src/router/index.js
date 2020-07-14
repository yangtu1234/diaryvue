import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Index from '../components/Index.vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/Login',
  name: 'Login',
  component: Login
},
{
  path: '/register',
  name: 'Register',
  component: Register
},
{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: '/index',
    name: 'index',
    component: Index
  }, {
    path: '/about',
    name: 'about',
    component: About
  }]
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, form, next) => {
  if (to.path === '/Login' || to.path === '/register') {
    return next()
  } else {
    const tokenStr = window.sessionStorage.getItem('token')
    if (to.path === '/' && !tokenStr) {
      return next('/Login')
    }
    if (to.path === '/' && tokenStr) {
      return next('/Index')
    }
    if (!tokenStr) {
      return next('/Login')
    }
    next()
  }
})

export default router
