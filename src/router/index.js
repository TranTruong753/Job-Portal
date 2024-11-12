import { createRouter, createWebHistory } from 'vue-router';
import user from './user.js';
import { getCookie } from '../assets/js/cookieUtils.js';
import { jwtDecode } from 'jwt-decode';


const routes = [...user];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});




export default router;
