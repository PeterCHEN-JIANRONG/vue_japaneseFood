<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="container">
    <form class="row justify-content-center align-items-center h-100vh" @submit.prevent="signIn">
      <div class="col-md-6 col-lg-4">
        <h1 class="h2 mb-3">請先登入</h1>
        <div class="form-floating mb-3">
          <input
            v-model="user.username"
            type="email"
            class="form-control"
            id="username"
            placeholder="name@example.com"
            required
            autofocus
          />
          <label for="username">Email address</label>
        </div>
        <div class="form-floating mb-4">
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            required
          />
          <label for="password">Password</label>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-lg btn-primary">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { errorAlertConstruct, successAlertConstruct } from '@/libs/alertConstructHandle';

export default {
  data() {
    return {
      user: {},
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          this.isLoading = false;
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push('/admin/products');
          this.$swal(successAlertConstruct(res.data.message));
        })
        .catch((err) => {
          this.isLoading = false;
          this.$swal(errorAlertConstruct(err.response.data.message, '登入失敗，請重新登入。'));
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
