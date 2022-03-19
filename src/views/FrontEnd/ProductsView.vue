<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>
  <div class="banner position-relative mb-4">
    <div class="position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">精選商品</h1>
      <h2 class="h4 text-white">やまだ提供多種口味的壽司、甜點，滿足您的味蕾</h2>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <div class="list-group mb-4 mb-md-0">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{ active: category === '' }"
            @click="getProducts(1)"
          >
            全部商品
          </button>
          <template v-for="(item, index) in categories" :key="`${index}-${item}`">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: category === item }"
              @click="getProducts(1, item)"
            >
              {{ item }}
            </button>
          </template>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row row-cols-md-2 row-cols-lg-3 g-3 mb-4">
          <div class="col" v-for="item in products" :key="item.id">
            <div
              class="card hover-shadow card-img-hover cursor-pointer"
              @click="$router.push(`/product/${item.id}`)"
            >
              <div class="overflow-hidden position-relative">
                <img :src="item.imageUrl" class="card-img-top h-15s" alt="產品照" />
                <h5 class="h4 mb-0 text-white position-absolute product-information">詳細資訊</h5>
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
              <div class="card-body">
                <h2 class="card-title space-nowrap overflow-hidden">{{ item.title }}</h2>
                <p class="card-text text-truncate text-muted mb-2">
                  {{ item.description }}
                </p>
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
        <Pagination
          :pagination="pagination"
          :category="category"
          @get-products="getProducts"
        ></Pagination>
      </div>
    </div>
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
      productsAll: [],
      category: '',
      categories: [],
    };
  },
  components: {
    Pagination,
  },
  mixins: [localStorageFavorite],
  methods: {
    getProducts(page = 1, category = '') {
      this.isLoading = true;
      this.category = category;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}&category=${category}`;
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
    getProductsAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.productsAll = res.data.products;
          this.isLoading = false;
          this.createCategories();
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    createCategories() {
      if (this.productsAll.length !== 0) {
        const categoriesMap = this.productsAll.map((item) => item.category);
        this.categories = [...new Set(categoriesMap)];
      }
    },
  },
  mounted() {
    this.getProductsAll();
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80');
  background-size: cover;
  background-position: center;
}
</style>
