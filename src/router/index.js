import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    // 前台
    path: '/',
    component: () => import('../views/FrontEnd/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/FrontEnd/HomeView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/FrontEnd/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/FrontEnd/ProductView.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/FrontEnd/Cart.vue'),
      },
    ],
  },
  {
    // 後台登入頁
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    // 後台
    path: '/admin',
    component: () => import('../views/Dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/AdminProducts.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
