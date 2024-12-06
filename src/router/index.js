import { createRouter, createWebHistory } from 'vue-router';
import user from './user.js';
import admin from './admin.js';



const routes = [...user,...admin];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});




export default router;
