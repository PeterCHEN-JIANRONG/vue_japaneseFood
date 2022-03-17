<template>
  <div class="container">
    <h1>確認訂單</h1>

    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in cartData.carts" :key="item.id">
              <tr>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td>{{ `${item.qty} / ${item.product.unit} ` }}</td>
                <td class="text-end">
                  <small v-if="item.final_total !== item.total" class="text-success"
                    >折扣價：</small
                  >
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-end">總計</td>
              <td class="text-end">{{ cartData.total }}</td>
            </tr>
            <tr v-if="cartData.total !== cartData.final_total">
              <td colspan="2" class="text-end text-success">折扣</td>
              <td class="text-end text-success">
                {{ `${cartData.final_total - cartData.total}` }}
              </td>
            </tr>
            <tr v-if="cartData.total !== cartData.final_total">
              <td colspan="2" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cartData.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
      <div class="col bg-light">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8">
            <Form ref="form" class="" v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="email" class="form-label">Email*</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email"
                  v-model="form.user.email"
                  rules="email|required"
                ></Field>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名*</label>
                <Field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                  v-model="form.user.name"
                  rules="required"
                ></Field>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話*</label>
                <Field
                  id="tel"
                  name="電話"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話"
                  v-model="form.user.tel"
                  :rules="isPhone"
                ></Field>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">收件人地址*</label>
                <Field
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址"
                  v-model="form.user.address"
                  rules="required"
                ></Field>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
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
</template>

<script>
export default {
  data() {
    return {
      cartData: {},
      isLoading: false,
      form: {
        user: {
          name: 'aaa',
          email: 'aaa@aaa.com',
          tel: '0900000000',
          address: '123',
        },
        message: '',
      },
      couponCode: '',
    };
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
          // this.getCart();
          this.$refs.form.resetForm();
          this.form.message = '';
          this.$httpMessageState(res, res.data.message);
          const { orderId } = res.data;
          this.$router.push(`/checkout/${orderId}`);
        })
        .catch((err) => {
          console.log('error', err);
          // this.$httpMessageState(err.response, '建立訂單');
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
