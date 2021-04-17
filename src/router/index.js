import Vue from 'vue'
import Router from 'vue-router'

const mp3 = () => import('../components/mp3.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mp3',
      component: mp3
    },
    
  ]
})
