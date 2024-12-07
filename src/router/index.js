import { createRouter, createWebHistory } from 'vue-router';
import user from './user.js';
import admin from './admin.js';



const routes = [...user,...admin];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


// router.beforeEach((to, from, next) => {
//   // Nếu route là admin, thêm CSS cho admin
//   if (to.name === 'admin') {
//     // Thêm CSS cho admin
//     import ('@/assets/admin/css/bootstrap.css')
//     import ('@/assets/admin/css/style.css')
//   } else {
//     // Thêm CSS cho trang home hoặc các trang khác
//     import ('@/assets/css/footer.css');
//     import ('@/assets/css/style.css');
//     import ('@/assets/css/mycss.css');
//   }

//   next();
// });

export default router;
