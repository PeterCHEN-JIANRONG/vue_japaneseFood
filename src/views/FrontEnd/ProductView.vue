<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" />

  <div class="container mt-5">
    <div class="row mb-4 mb-md-5">
      <div class="col-md-7 col-lg-6 mb-3 mb-md-0">
        <div class="photo-lg position-relative">
          <img v-if="product.imageUrl" :src="product.imageUrl" alt="產品照" class="" />
          <span
            v-if="favorite.includes(product.id)"
            @click.stop="toggleFavorite(product.id)"
            class="material-icons card__heart"
          >
            favorite
          </span>
        </div>
      </div>
      <div class="col-md-5 col-lg-6">
        <div class="d-flex align-items-end justify-content-between my-3 pb-3 border-bottom">
          <h1 class="mb-0">{{ product.title }}</h1>
          <h4 class="mb-0">
            <span class="badge bg-secondary">{{ product.category }}</span>
          </h4>
        </div>
        <p class="mb-5 text-muted">{{ product.description }}</p>
        <div class="d-flex justify-content-end mb-3">
          <template v-if="product.price !== product.origin_price">
            <div class="d-flex align-items-center">
              <h2 class="h1 mb-0 text-danger me-2">NT${{ product.price }}</h2>
              <h3 class="h5 mb-0 text-decoration-line-through text-muted">
                NT${{ product.origin_price }}
              </h3>
            </div>
          </template>
          <h2 class="h1 mb-0" v-else>NT${{ product.price }}</h2>
        </div>

        <div class="input-group pb-4 border-bottom">
          <button
            type="button"
            class="btn btn-outline-danger btn-lg"
            @click="toggleFavorite(product.id)"
            :disabled="isLoadingItem === product.id"
          >
            <span v-if="favorite.includes(product.id)" class="material-icons align-middle">
              favorite
            </span>
            <span v-else class="material-icons align-middle"> favorite_border </span>
          </button>
          <input
            type="number"
            class="form-control text-center fs-3"
            min="1"
            v-model.number="qty"
            @change="checkNumber"
            :disabled="isLoadingItem === product.id"
          />
          <button
            type="button"
            class="btn btn-primary btn-lg"
            @click="addToCart(product.id, qty)"
            :disabled="isLoadingItem === product.id"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
    <h2 class="mb-3">商品描述</h2>
    <p class="mb-4 space-preline text-muted">{{ product.description }}</p>
    <h2 class="mb-3">商品內容</h2>
    <p class="mb-4 space-preline text-muted pb-4 border-bottom">
      {{ product.content }}
    </p>
    <h2 class="mb-3">其他人也看了</h2>
    <ProductSwiper class="mb-4" :products="similarProducts" @get-product="getProduct" />
    <h2 class="mb-3">特價商品</h2>
    <ProductSwiper class="mb-5" :products="onSaleProducts" @get-product="getProduct" />
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import ProductSwiper from '@/components/ProductSwiper.vue';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';
import localStorageFavorite from '@/mixins/localStorageFavorite';

export default {
  data() {
    return {
      product: {},
      qty: 1,
      isLoadingItem: '',
      isLoading: false,
      productsAll: [],
    };
  },
  mixins: [localStorageFavorite],
  components: {
    ProductSwiper,
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      // $router 方法
      // $route 取值
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
          this.getProductsAll();
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
          this.qty = 1;
          emitter.emit('get-cart');
          this.$httpMessageState(res, res.data.message);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    checkNumber() {
      const re = /^\+?[1-9][0-9]*$/; // 正整數 - 表達式
      if (!re.test(this.qty)) {
        this.qty = 1;
        this.$swal(errorAlertConstruct('產品數量不可以少於1'));
      }
    },
    getProductsAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.productsAll = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
  },
  computed: {
    similarProducts() {
      // 相似商品
      const { id, category } = this.product;
      const products = this.productsAll.filter((item) => item.category === category);
      const index = products.findIndex((item) => item.id === id);
      if (index !== -1) {
        products.splice(index, 1); // 若包含當前產品，則移除
      }
      products.sort(() => Math.random() - 0.5); // 亂數排序
      return products;
    },
    onSaleProducts() {
      // 特價商品
      const { id } = this.product;
      const products = this.productsAll.filter((item) => item.price !== item.origin_price);
      const index = products.findIndex((item) => item.id === id);
      if (index !== -1) {
        products.splice(index, 1); // 若包含當前產品，則移除
      }
      products.sort(() => Math.random() - 0.5); // 亂數排序
      return products;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
};
</script>

<style lang="scss" scoped>
.photo-lg {
  height: calc(30vw - 2em);
  min-height: 380px;
  max-height: 400px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
