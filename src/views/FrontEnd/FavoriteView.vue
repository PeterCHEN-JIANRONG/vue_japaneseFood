<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>
  <div class="banner position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">我的最愛</h1>
      <h2 class="h4 text-white">還在猶豫你念念不忘的商品嗎？趕快加入購物車吧！</h2>
    </div>
  </div>
  <div class="container">
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8">
        <ul class="mb-0">
          <li v-for="item in products" :key="item.id" class="mb-3">
            <div
              class="card hover-shadow card-img-hover cursor-pointer"
              @click="$router.push(`/product/${item.id}`)"
            >
              <div class="row g-0">
                <div class="col-md-5">
                  <div class="overflow-hidden position-relative">
                    <img :src="item.imageUrl" class="card-img-top h-15s" alt="產品照" />
                    <h5 class="h4 mb-0 text-white position-absolute product-information">
                      詳細資訊
                    </h5>
                    <span
                      v-if="favorite.includes(item.id)"
                      @click.stop="toggleFavorite(item.id)"
                      class="material-icons card__heart"
                    >
                      favorite
                    </span>
                    <span
                      v-if="item.price !== item.origin_price"
                      class="badge bg-danger position-absolute top-0 start-0 fs-5"
                      >特價</span
                    >
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="card-body h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h2 class="card-title space-nowrap overflow-hidden">{{ item.title }}</h2>
                      <p class="card-text text-muted mb-2">
                        {{ item.description }}
                      </p>
                    </div>
                    <div>
                      <div class="d-flex justify-content-center align-items-end mb-3">
                        <template v-if="item.price !== item.origin_price">
                          <h3 class="fs-2 mb-0 text-danger me-2">NT${{ item.price }}</h3>
                          <h4 class="fs-6 mb-0 text-decoration-line-through text-muted">
                            NT${{ item.origin_price }}
                          </h4>
                        </template>
                        <h3 v-else class="fs-2 mb-0">NT${{ item.price }}</h3>
                      </div>
                      <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          @click.stop="toggleFavorite(item.id)"
                        >
                          <span
                            v-if="favorite.includes(item.id)"
                            class="material-icons align-middle"
                          >
                            favorite
                          </span>
                          <span v-else class="material-icons align-middle"> favorite_border </span>
                        </button>
                        <button
                          class="btn btn-primary"
                          @click.stop="addToCart(item.id)"
                          :disabled="isLoadingItem === item.id"
                        >
                          <span class="material-icons align-middle"> add_shopping_cart </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h2 class="mb-3">推薦商品</h2>
    <ProductSwiper class="mb-5" :products="randomProducts"></ProductSwiper>
  </div>
</template>

<script>
import localStorageFavorite from '@/mixins/localStorageFavorite';
import emitter from '@/libs/emitter';
import ProductSwiper from '@/components/ProductSwiper.vue';

export default {
  data() {
    return {
      products: [],
      productsAll: [],
      isLoading: false,
      isLoadingItem: '',
      randomProducts: [],
    };
  },
  mixins: [localStorageFavorite],
  components: {
    ProductSwiper,
  },
  methods: {
    getProductsAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.productsAll = res.data.products;
          this.isLoading = false;
          this.getFavoriteProducts();
          this.getRandomProducts();
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    getFavoriteProducts() {
      this.products = this.productsAll.filter((item) => this.favorite.includes(item.id));
    },
    getRandomProducts() {
      this.randomProducts = this.productsAll.filter((item) => !this.favorite.includes(item.id));
      this.randomProducts.sort(() => Math.random() - 0.5);
      this.randomProducts = this.randomProducts.splice(0, 10);
    },
    addToCart(id, qty = 1) {
      this.isLoadingItem = id;
      const data = {
        product_id: id,
        qty,
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoadingItem = '';
          emitter.emit('get-cart');
          this.$httpMessageState(res, res.data.message);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.getProductsAll();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
}
ul > li:last-child {
  margin-bottom: 0 !important;
}
</style>
