<template>
  <div class="bg-secondary">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary py-3">
        <div class="container-fluid">
          <router-link class="navbar-brand fs-2 ff-noto-jp fw-bold" to="/"
            >やまだ日本料理</router-link
          >
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
          <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link fs-5 fs-md-4" to="/products">商品介紹</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-5 fs-md-4" to="/">關於我們</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-5 fs-md-4" to="/">常見問題</router-link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item d-block d-lg-none">
                <router-link class="nav-link fs-5 fs-md-4" to="/cart"
                  >購物車 {{ `(${cartData?.carts?.length})` }}</router-link
                >
              </li>
              <li class="nav-item d-none d-lg-block">
                <router-link class="nav-link position-relative" to="/cart">
                  <i class="material-icons fs-3"> shopping_cart </i>
                  <span
                    v-if="cartData?.carts?.length > 0"
                    class="position-absolute translate-middle badge rounded-pill bg-danger"
                  >
                    {{ cartData?.carts?.length }}
                  </span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-5 fs-md-4" to="/admin/products">後台</router-link>
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
          this.$httpMessageState(err.response, '錯誤訊息');
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
