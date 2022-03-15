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
        component: () => import('../views/FrontEnd/CartView.vue'),
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
      {
        path: 'orders',
        component: () => import('../views/Dashboard/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Dashboard/AdminCoupons.vue'),
      },
      {
        path: 'articles',
        component: () => import('../views/Dashboard/AdminArticles.vue'),
      },
    ],
  },
  // 404 not found
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFoundView.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active', // router連結啟用時，增加的class
});

export default router;
