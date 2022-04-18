<template>
  <ToastMessages />
  <AdminNavbar />
  <router-view v-if="loginCheck" />
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';

export default {
  data() {
    return {
      loginCheck: false,
    };
  },
  components: {
    AdminNavbar,
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
            this.$swal(errorAlertConstruct(err.response.data.message, '登入失敗，請重新登入。'));
            this.$router.push('/login');
          });
      } else {
        this.$swal(errorAlertConstruct('登入失敗', '登入失敗，請重新登入。'));
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
