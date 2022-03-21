<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>
  <div class="banner position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">購物車</h1>
      <h2 class="h4 text-white">確認好商品及數量後，即可以前往結囉！</h2>
    </div>
  </div>

  <div v-if="cartData.carts?.length === 0" class="text-center mb-4">
    <h2 class="text-muted mb-3">尚無購物車紀錄</h2>
    <p class="h4 text-muted mb-3">趕快前往商品頁面，將喜歡的商品加到購物車吧！</p>
    <div class="btn btn-primary" @click="$router.push(`/products`)">前往選購</div>
  </div>
  <div v-else class="container mb-4">
    <!-- 購物車列表 -->
    <div class="text-end mb-2">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="removeCartAll"
        :disabled="cartData.carts?.length === 0 || isLoadingItem === true"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle text-center table-striped table-hover mb-4">
      <thead>
        <tr class="table-secondary">
          <th style="width: 80px"></th>
          <th class="d-none d-md-table-cell">圖片</th>
          <th>商品名稱</th>
          <th class="d-none d-sm-table-cell">單價</th>
          <th style="width: 140px">數量/單位</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in cartData.carts" :key="item.id">
          <tr>
            <td>
              <button
                type="button"
                class="btn btn-outline-danger border-0"
                @click="removeCart(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
            <td class="d-none d-md-block">
              <img
                class="img__small img-cover w-100 cursor-pointer"
                :src="item.product.imageUrl"
                alt="產品圖"
                @click="$router.push(`/product/${item.product_id}`)"
              />
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td class="d-none d-sm-table-cell">{{ item.product.price }}</td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group">
                  <input
                    min="1"
                    type="number"
                    class="form-control text-center"
                    v-model.number="item.qty"
                    @change="updateCart(item)"
                    :disabled="isLoadingItem === item.id"
                  />
                  <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td>
              <small v-if="item.final_total !== item.total" class="text-success">折扣價：</small>
              {{ $filters.currency(item.final_total) }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td class="d-none d-md-table-cell"></td>
          <td class="d-none d-sm-table-cell"></td>
          <td colspan="3" class="text-end fs-4">總計</td>
          <td class="fs-4">{{ cartData.total }}</td>
        </tr>
        <tr v-if="cartData.total !== cartData.final_total">
          <td colspan="4" class="text-end text-success">折扣</td>
          <td class="text-end text-success">{{ `${cartData.final_total - cartData.total}` }}</td>
        </tr>
        <tr v-if="cartData.total !== cartData.final_total">
          <td colspan="4" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cartData.final_total }}</td>
        </tr>
      </tfoot>
    </table>

    <div class="row row-cols-2 justify-content-center">
      <div class="col">
        <router-link class="btn btn-outline-secondary btn-lg w-100" to="/products">
          繼續選購
        </router-link>
      </div>
      <div class="col">
        <router-link class="btn btn-primary btn-lg w-100" to="/checkorder"> 前往結帳 </router-link>
      </div>
    </div>
  </div>
  <section class="container mb-5">
    <h2 class="mb-3">你可能會喜歡</h2>
    <cartProductSwiper :products="likelyProducts" @get-cart="getCart"></cartProductSwiper>
  </section>
</template>

<script>
import emitter from '@/libs/emitter';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';
import cartProductSwiper from '@/components/cartProductSwiper.vue';

export default {
  data() {
    return {
      cartData: {},
      isLoading: false,
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      couponCode: '',
      productsAll: [],
      likelyProducts: [],
    };
  },
  components: {
    cartProductSwiper,
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
          if (this.productsAll.length === 0) {
            this.getProductsAll();
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    updateCart(item) {
      if (item.qty <= 0) {
        this.getCart();
        this.$swal(errorAlertConstruct('數量不可小於1'));
      } else {
        const data = {
          product_id: item.product_id,
          qty: item.qty,
        };
        this.isLoadingItem = item.id;
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        this.$http
          .put(url, { data })
          .then((res) => {
            this.isLoadingItem = '';
            this.getCart();
            emitter.emit('get-cart');
            this.$httpMessageState(res, res.data.message);
          })
          .catch((err) => {
            this.$httpMessageState(err.response, '錯誤訊息');
          });
      }
    },
    removeCart(id) {
      this.isLoadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = '';
          this.getCart();
          emitter.emit('get-cart');
          this.$httpMessageState(res, res.data.message);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    removeCartAll() {
      this.isLoadingItem = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = '';
          this.getCart();
          emitter.emit('get-cart');
          this.$httpMessageState(res, res.data.message);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    createOrder() {
      this.isLoadingItem = true;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, { data: this.form })
        .then((res) => {
          this.isLoadingItem = '';
          this.isLoading = false;
          this.getCart();
          this.$refs.form.resetForm();
          this.form.message = '';
          this.$httpMessageState(res, res.data.message);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const data = {
        code: this.couponCode,
      };
      this.isLoading = true;
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, '加入優惠券');
          this.getCart();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '加入優惠券');
        });
    },
    isPhone(value) {
      if (value === '') {
        return '電話為必填';
      }
      if (value.length !== 10) {
        return '電話須為 10 碼，ex: 0900777888';
      }
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼，ex: 0900111222';
    },
    getProductsAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.productsAll = res.data.products;
          this.isLoading = false;
          this.getLikelyProducts();
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    getLikelyProducts() {
      // 取購物車內產品 id
      const cartItemsId = this.cartData.carts.map((item) => item.product_id);
      // 篩選除購物車內以外所有商品
      this.likelyProducts = this.productsAll.filter((item) => !cartItemsId.includes(item.id));
      // 隨機排序
      this.likelyProducts = this.likelyProducts.sort(() => Math.random() - 0.5);
      // 取10個
      this.likelyProducts = this.likelyProducts.splice(1, 10);
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
}

.img {
  height: 60px;

  // md
  @media (min-width: 768px) {
    &__small {
      height: 100px;
    }
  }
  // lg
  @media (min-width: 992px) {
    &__small {
      height: 120px;
    }
  }
}
</style>
