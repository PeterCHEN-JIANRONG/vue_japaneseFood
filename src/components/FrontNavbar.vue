<template>
  <div class="bg-secondary position-sticky top-0" style="z-index: 10">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary" :class="[classList.padding]">
        <div class="container-fluid">
          <router-link class="navbar-brand fs-2 ff-noto-jp fw-bold" to="/" @click="closeNavHam"
            >やまだ日本料理</router-link
          >
          <button class="navbar-toggler" type="button" @click="toggleNavHam">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-between" ref="collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link fs-5" to="/products" @click="closeNavHam"
                  >精選商品</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-5" to="/about" @click="closeNavHam"
                  >關於我們</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link fs-5" to="/question" @click="closeNavHam"
                  >常見問題</router-link
                >
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item d-block d-lg-none">
                <router-link class="nav-link fs-5" to="/favorite" @click="closeNavHam"
                  >我的最愛</router-link
                >
              </li>
              <li class="nav-item d-block d-lg-none">
                <router-link class="nav-link fs-5" to="/cart" @click="closeNavHam"
                  >購物車 {{ `(${cartData?.carts?.length})` }}</router-link
                >
              </li>
              <li class="nav-item d-none d-lg-block">
                <router-link class="nav-link" to="/favorite">
                  <span class="material-icons fs-2"> favorite </span>
                </router-link>
              </li>
              <li class="nav-item d-none d-lg-block" v-if="cartData?.carts?.length > 0">
                <router-link class="nav-link position-relative" to="/cart">
                  <i class="material-icons fs-2"> shopping_cart </i>
                  <span
                    v-if="cartData?.carts?.length > 0"
                    class="position-absolute translate-middle badge rounded-pill bg-danger"
                  >
                    {{ cartData?.carts?.length }}
                  </span>
                </router-link>
              </li>
              <li class="nav-item d-none d-lg-block" v-if="cartData?.carts?.length === 0">
                <div class="dropdown">
                  <span
                    class="nav-link cursor-pointer"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="material-icons fs-2"> shopping_cart </i>
                  </span>
                  <ul
                    class="dropdown-menu dropdown-menu-end w-13s"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <div class="text-center">
                        <h3 class="fs-5">購物車無資料</h3>
                        <div class="btn btn-primary" @click="$router.push(`/products`)">
                          前往購物
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
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
import collapseMixin from '@/mixins/collapseMixin';

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      classList: { padding: 'py-3' },
    };
  },
  mixins: [collapseMixin],
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
    windowScroll() {
      // navbar滾動縮放
      const windowY = window.scrollY;
      if (windowY < 30) {
        this.classList = {
          padding: 'py-3',
        };
      } else {
        this.classList = {
          padding: 'py-1',
        };
      }
    },
  },
  mounted() {
    this.getCart();

    // 監聽加入購物車事件
    emitter.on('get-cart', () => {
      this.getCart();
    });

    // 加入捲動監聽
    window.addEventListener('scroll', this.windowScroll);
  },
  beforeUnmount() {
    // 移除 emitter 監聽
    emitter.off('get-cart', () => {
      this.getCart();
    });
    // 移除捲動監聽
    window.removeEventListener('scroll', this.windowScroll);
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  transition: all 0.2s;
}
</style>
