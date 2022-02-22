<template>
  <div class="container">
    <h1>產品列表</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card">
          <img :src="item.imageUrl" class="card-img-top" alt="產品照" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text text-truncate">
              {{ item.description }}
            </p>
            <div class="text-center">
              <a href="#" class="btn btn-primary">詳細資訊</a>
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
  },
  mounted() {
    this.getProducts();
  },
};
</script>
