<template>
  <div class="bg-dark">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/admin/products">阿波日本料理</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">產品</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/orders">訂單</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/articles">文章</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/">前台</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logout">登出</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { errorAlertConstruct, successAlertConstruct } from '@/libs/alertConstructHandle';

export default {
  methods: {
    logout() {
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http
        .post(url)
        .then((res) => {
          document.cookie = 'hexToken=;expires=;';
          this.$swal(successAlertConstruct(res.data.message));
          this.$router.push('/login');
        })
        .catch((err) => {
          // this.$httpMessageState(err.response, '錯誤訊息');
          this.$swal(errorAlertConstruct('登出失敗', err.response.data.message));
        });
    },
  },
};
</script>
