<template>
  <div class="bg-light">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">阿波日本料理</router-link>
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
                <router-link class="nav-link" to="/products">產品列表</router-link>
              </li>
              <li class="nav-item d-block d-lg-none">
                <router-link class="nav-link" to="/cart"
                  >購物車 {{ `(${cartData.carts.length})` }}</router-link
                >
              </li>
              <li class="nav-item d-none d-lg-block">
                <router-link class="nav-link position-relative" to="/cart">
                  <i class="material-icons"> shopping_cart </i>
                  <span
                    v-if="cartData.carts.length > 0"
                    class="position-absolute translate-middle badge rounded-circle bg-danger"
                  >
                    {{ cartData.carts.length }}
                  </span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">後台</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.cartData = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getCart();

    // 監聽加入購物車事件
    emitter.on('get-cart', () => {
      this.getCart();
    });
  },
  unmounted() {
    emitter.off('get-cart', () => {
      this.getCart();
    });
  },
};
</script>
