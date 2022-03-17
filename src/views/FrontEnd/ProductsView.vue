<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>

  <div class="container">
    <h1>產品列表</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 mb-4">
      <div class="col" v-for="item in products" :key="item.id">
        <div
          class="card hover-shadow-sm card-img-hover"
          @click="$router.push(`/product/${item.id}`)"
        >
          <div class="overflow-hidden position-relative">
            <img :src="item.imageUrl" class="card-img-top h-15s" alt="產品照" />
            <h5 class="h4 mb-0 text-white position-absolute product-information">詳細資訊</h5>
            <span
              v-if="favorite.includes(item.id)"
              class="material-icons position-absolute top-0 end-0 text-danger p-2 fs-1"
            >
              favorite
            </span>
            <span
              v-if="item.price !== item.origin_price"
              class="badge bg-danger position-absolute top-0 start-0 fs-5"
              >特價</span
            >
          </div>
          <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="card-text text-truncate">
              {{ item.description }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-end">
                <template v-if="item.price !== item.origin_price">
                  <h3 class="mb-0 text-danger me-1">NT${{ item.price }}</h3>
                  <small class="text-decoration-line-through text-muted">
                    NT${{ item.origin_price }}
                  </small>
                </template>
                <template v-else>
                  <h3 class="mb-0">NT${{ item.price }}</h3>
                </template>
              </div>
              <!-- <router-link class="btn btn-primary" :to="`/product/${item.id}`">
                詳細資訊
              </router-link> -->
              <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click.stop="toggleFavorite(item.id)"
                >
                  <span v-if="favorite.includes(item.id)" class="material-icons align-middle">
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
    <Pagination :pagination="pagination" @get-products="getProducts"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue';
import emitter from '@/libs/emitter';
import localStorageFavorite from '@/mixins/localStorageFavorite';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoadingItem: '',
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  mixins: [localStorageFavorite],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
          document.documentElement.scrollTop = 0; // 頁面置頂
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
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
    this.getProducts();
  },
};
</script>
