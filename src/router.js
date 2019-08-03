import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: () => import('./views/Announcements.vue')
    },
    {
      path: '/carshow',
      name: 'carshow',
      component: () => import('./views/CarShow.vue')
    },
    {
      path: '/event-sales',
      name: 'event-sales',
      component: () => import('./views/EventSales.vue')
    },
    {
      path: '/pizza',
      name: 'pizza',
      component: () => import('./views/Pizza.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('./views/Transactions.vue')
    },
    {
      path: '/yearbook',
      name: 'yearbook',
      component: () => import('./views/Yearbook.vue')
    }
  ]
})
