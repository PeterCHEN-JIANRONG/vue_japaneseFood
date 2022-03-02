<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
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
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
