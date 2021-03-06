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
      {
        path: 'checkorder',
        component: () => import('../views/FrontEnd/CheckOrder.vue'),
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/FrontEnd/CheckoutOrder.vue'),
      },
      {
        path: 'favorite',
        component: () => import('../views/FrontEnd/FavoriteView.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/FrontEnd/AboutView.vue'),
      },
      {
        path: 'question',
        component: () => import('../views/FrontEnd/QuestionView.vue'),
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
        path: '',
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
  // 切換頁面時滾至頂部
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
