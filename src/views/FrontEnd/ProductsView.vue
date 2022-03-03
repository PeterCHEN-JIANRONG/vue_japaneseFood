<template>
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
                  <h4 class="h5 mb-0 text-decoration-line-through text-muted">
                    NT${{ item.origin_price }}
                  </h4>
                </template>
                <template v-else>
                  <h3 class="mb-0">NT${{ item.price }}</h3>
                </template>
              </div>
              <!-- <router-link class="btn btn-primary" :to="`/product/${item.id}`">
                詳細資訊
              </router-link> -->
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
    <pagination :pagination="pagination" @get-products="getProducts"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/PaginationView.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoadingItem: '',
    };
  },
  components: {
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          document.documentElement.scrollTop = 0; // 頁面置頂
        })
        .catch((err) => {
          alert(err.data.message);
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
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
