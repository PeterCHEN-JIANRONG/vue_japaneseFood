<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" />

  <div class="banner position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">付款流程</h1>
      <h2 class="h4 text-white">確認商品數量、金額及套用優惠券，完成付款吧！</h2>
    </div>
  </div>
  <div class="container mb-4">
    <OrderProgress :step="step" />
  </div>
  <div class="container mb-5">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="table__wrap">
          <table class="table align-middle text-center table-striped table-hover mb-4">
            <thead>
              <tr class="table-secondary">
                <th style="min-width: 80px" class="d-none d-md-table-cell">圖片</th>
                <th style="min-width: 140px">商品名稱</th>
                <th class="d-none d-sm-table-cell d-md-none d-lg-table-cell">單價</th>
                <th style="min-width: 60px">數量</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in cartData.carts" :key="item.id">
                <tr>
                  <td class="d-none d-md-table-cell">
                    <img
                      class="img__small img-cover w-100"
                      :src="item.product.imageUrl"
                      alt="產品圖"
                    />
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">套用優惠券</div>
                  </td>
                  <td class="d-none d-sm-table-cell d-md-none d-lg-table-cell">
                    {{ item.product.price }}
                  </td>
                  <td>
                    {{ `${item.qty} ${item.product.unit}` }}
                  </td>
                  <td>
                    {{ $filters.currency(item.total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td class="d-none d-md-table-cell"></td>
                <td class="d-none d-sm-table-cell d-md-none d-lg-table-cell"></td>
                <td
                  colspan="2"
                  class="text-end"
                  :class="{
                    'fs-6 text-muted': cartData.final_total !== cartData.total,
                    'fs-4': cartData.final_total === cartData.total,
                  }"
                >
                  總計
                </td>
                <td
                  :class="{
                    'fs-6 text-muted': cartData.final_total !== cartData.total,
                    'fs-4': cartData.final_total === cartData.total,
                  }"
                >
                  {{ $filters.currency(cartData.total) }}
                </td>
              </tr>
              <tr v-if="cartData.final_total !== cartData.total">
                <td class="d-none d-md-table-cell"></td>
                <td class="d-none d-sm-table-cell d-md-none d-lg-table-cell"></td>
                <td colspan="2" class="text-end fs-6 text-muted">折扣</td>
                <td class="fs-6 text-muted">
                  {{ `${cartData.final_total - cartData.total}` }}
                </td>
              </tr>
              <tr v-if="cartData.final_total !== cartData.total">
                <td class="d-none d-md-table-cell"></td>
                <td class="d-none d-sm-table-cell d-md-none d-lg-table-cell"></td>
                <td colspan="2" class="text-end fs-4">折扣價</td>
                <td class="fs-4">{{ cartData.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="bg-light py-4">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <Form ref="form" class="" v-slot="{ errors }" @submit="createOrder">
                <div class="form-floating mb-3">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email"
                    v-model="form.user.email"
                    rules="email|required"
                  />
                  <label for="email" class="form-label">Email*</label>
                  <ErrorMessage name="email" class="invalid-feedback" />
                </div>
                <div class="form-floating mb-3">
                  <Field
                    id="name"
                    name="姓名"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名"
                    v-model="form.user.name"
                    rules="required"
                  />
                  <label for="name" class="form-label">姓名*</label>
                  <ErrorMessage name="姓名" class="invalid-feedback" />
                </div>

                <div class="form-floating mb-3">
                  <Field
                    id="tel"
                    name="電話"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="請輸入電話"
                    v-model="form.user.tel"
                    :rules="isPhone"
                  />
                  <label for="tel" class="form-label">電話*</label>
                  <ErrorMessage name="電話" class="invalid-feedback" />
                </div>

                <div class="form-floating mb-3">
                  <Field
                    id="address"
                    name="地址"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址"
                    v-model="form.user.address"
                    rules="required"
                  />
                  <label for="address" class="form-label">地址*</label>
                  <ErrorMessage name="地址" class="invalid-feedback" />
                </div>
                <div class="form-floating mb-3">
                  <textarea
                    class="form-control textarea__message"
                    placeholder="Leave a comment here"
                    id="message"
                    v-model="form.message"
                  ></textarea>
                  <label for="message">留言</label>
                </div>
                <div class="text-end">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-100"
                    :disabled="cartData.carts?.length === 0 || Object.keys(errors).length > 0"
                  >
                    送出訂單
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import OrderProgress from '@/components/OrderProgress.vue';

export default {
  data() {
    return {
      cartData: {},
      isLoading: false,
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
      step: 1,
    };
  },
  components: {
    OrderProgress,
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
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, { data: this.form })
        .then((res) => {
          this.isLoading = false;
          this.$refs.form.resetForm();
          this.form.message = '';
          emitter.emit('get-cart');
          this.$httpMessageState(res, res.data.message);
          const { orderId } = res.data;
          this.$router.push(`/checkout/${orderId}`);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '建立訂單');
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
          this.$httpMessageState(res, '套用優惠券');
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
    url('https://images.unsplash.com/photo-1470256699805-a29e1b58598a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
}

.img {
  &__small {
    height: 60px;
  }
}

.textarea__message {
  height: 120px;
  @media (min-width: 768px) {
    height: 200px;
  }
}
</style>
