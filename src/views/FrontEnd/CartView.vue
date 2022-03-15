<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>

  <div class="container">
    <h1>購物車</h1>

    <!-- 購物車列表 -->
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        @click="removeCartAll"
        :disabled="cartData.carts?.length === 0 || isLoadingItem === true"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in cartData.carts" :key="item.id">
          <tr>
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCart(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <!-- <div class="text-success">
                      已套用優惠券
                    </div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    v-model.number="item.qty"
                    @change="updateCart(item)"
                    :disabled="isLoadingItem === item.id"
                  />
                  <!-- <select
                    class="form-select"
                    v-model.number="item.qty"
                    @change="updateCart(item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <option v-for="num in 20" :key="`${num}${item.id}`">{{ num }}</option>
                  </select> -->
                  <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class="text-success">折扣價：</small> -->
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cartData.total }}</td>
        </tr>
        <tr v-if="cartData.total !== cartData.final_total">
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cartData.final_total }}</td>
        </tr>
      </tfoot>
    </table>

    <div class="my-5 row justify-content-center">
      <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
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
            rules="required|min:8|max:10"
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
            class="btn btn-danger"
            :disabled="
              cartData.carts?.length === 0 ||
              Object.keys(errors).length > 0 ||
              isLoadingItem === true
            "
          >
            送出訂單
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';
import { errorAlertConstruct } from '@/libs/alertConstructHandle';

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
          emitter.emit('get-cart');
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
          this.$httpMessageState(res, res.data.message);
          this.getCart();
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
  },
  mounted() {
    this.getCart();
  },
};
</script>
