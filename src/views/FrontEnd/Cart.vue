<template>
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
                  <!-- <input min="1" type="number" class="form-control"
                        v-model="item.qty"> -->
                  <select
                    class="form-select"
                    v-model.number="item.qty"
                    @change="updateCart(item)"
                    :disabled="isLoadingItem === item.id"
                  >
                    <option v-for="num in 20" :key="`${num}${item.id}`">{{ num }}</option>
                  </select>
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
  </div>

  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>
</template>

<script>
export default {
  data() {
    return {
      cartData: [],
      // form: {
      //   user: {
      //     name: '',
      //     email: '',
      //     tel: '',
      //     address: '',
      //   },
      //   message: '',
      // },
      isLoading: false,
      isLoadingItem: '',
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
          alert(err.data.message);
        });
    },
    updateCart(item) {
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
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    removeCart(id) {
      this.isLoadingItem = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = '';
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
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
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
