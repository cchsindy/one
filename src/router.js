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
      path: '/attendance',
      name: 'attendance',
      component: () => import('./views/Attendance.vue')
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
      path: '/exports',
      name: 'exports',
      component: () => import('./views/Exports.vue')
    },
    {
      path: '/grades',
      name: 'grades',
      component: () => import('./views/Grades.vue')
    },
    {
      path: '/midterms',
      name: 'midterms',
      component: () => import('./views/Midterms.vue')
    },
    {
      path: '/pizza',
      name: 'pizza',
      component: () => import('./views/Pizza.vue')
    },
    {
      path: '/rosters',
      name: 'rosters',
      component: () => import('./views/Rosters.vue')
    },
    {
      path: '/spec',
      name: 'spec',
      component: () => import('./views/Spec.vue')
    },
    {
      path: '/station',
      name: 'station',
      component: () => import('./views/Station.vue')
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('./views/Students.vue')
    },
    {
      path: '/tea',
      name: 'tea',
      component: () => import('./views/Tea.vue')
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
