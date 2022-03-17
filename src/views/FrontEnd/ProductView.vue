<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>

  <div class="container mt-5">
    <div class="row mb-4 mb-md-5">
      <div class="col-md-5 col-lg-6">
        <div class="position-relative">
          <img v-if="product.imageUrl" :src="product.imageUrl" alt="產品照" />
          <span
            v-if="favorite.includes(product.id)"
            class="material-icons position-absolute top-0 end-0 text-danger p-3 fs-1"
          >
            favorite
          </span>
        </div>
      </div>
      <div class="col-md-7 col-lg-6">
        <div class="d-flex align-items-end justify-content-between my-3 pb-3 border-bottom">
          <h1 class="mb-0">{{ product.title }}</h1>
          <h4 class="mb-0">
            <span class="badge bg-secondary">{{ product.category }}</span>
          </h4>
        </div>
        <p class="h4 mb-5 text-black-50">{{ product.description }}</p>
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
    <p class="h5 mb-4 white-space-preline text-black-50">{{ product.description }}</p>
    <h2 class="mb-3">商品內容</h2>
    <p class="h5 mb-5 white-space-preline text-black-50 pb-4 border-bottom">
      {{ product.content }}
    </p>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';
import localStorageFavorite from '@/mixins/localStorageFavorite';

export default {
  data() {
    return {
      product: {},
      qty: 1,
      isLoadingItem: '',
      isLoading: false,
    };
  },
  mixins: [localStorageFavorite],
  methods: {
    getProduct() {
      this.isLoading = true;
      // $router 方法
      // $route 取值
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
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
      if (this.qty <= 0) {
        this.qty = 1;
        this.$swal(errorAlertConstruct('產品數量不可以少於1'));
      }
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped></style>
