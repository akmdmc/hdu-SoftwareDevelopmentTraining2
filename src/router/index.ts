import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView,
      redirect:'/consultingroom',
      children:[    {
        path: '/visit',
        name: 'visit',
        component: () => import("../components/Visit.vue")
      },
      {
        path: '/visitAddOrUpdate',
        name: 'visitAddOrUpdate',
        component: () => import("../components/visit-add-or-update.vue")
      },
      {
        path: '/doctor',
        name: 'doctor',
        component: () => import("../components/doctor.vue")
      },
      {
        path: '/doctorAddOrUpdate',
        name: 'doctorAddOrUpdate',
        component: () => import("../components/doctor-add-or-update.vue")
      },
      {
        path: '/department',
        name: 'department',
        component: () => import("../components/department.vue")
      },
      {
        path: '/consultingroom',
        name: 'consultingroom',
        component: () => import("../components/consultingroom.vue")
      },
      {
        path: '/consultingroomAddOrUpdate',
        name: 'consultingroomAddOrUpdate',
        component: () => import("../components/consultingroom-add-or-update.vue")
      },]
    },
  ]
})

export default router
