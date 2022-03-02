<template>
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">前台</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view v-if="loginCheck" />
</template>

<script>
export default {
  data() {
    return {
      loginCheck: false,
    };
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = token;
        const url = `${process.env.VUE_APP_API}api/user/check`;
        this.$http
          .post(url, { api_token: token })
          .then(() => {
            this.loginCheck = true;
          })
          .catch((err) => {
            alert(err.data.message);
            this.$router.push('/login');
          });
      } else {
        alert('您尚未登入。');
        this.$router.push('/login');
      }
    },
    signOut() {
      document.cookie = 'hexToken=;expires=;';
      alert('token 已清除');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
