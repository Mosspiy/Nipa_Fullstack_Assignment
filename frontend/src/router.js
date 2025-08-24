import { createRouter, createWebHistory } from 'vue-router'
import SubmitPage from './pages/SubmitPage.vue'
import DeskPage from './pages/DeskPage.vue' 

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/submit' },
    { path: '/desk', component: DeskPage },     
    { path: '/submit', component: SubmitPage }  
  ]
})
