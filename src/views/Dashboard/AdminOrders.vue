<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>

  <div class="container py-4">
    <h1 class="mb-4">訂單列表</h1>
    <table class="table mb-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="`${key}orders`">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="`${i}products`">
                  {{ product.product.title }}：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ $filters.currency(item.total) }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid" class="text-success">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="text-end">共 {{ orders.length }} 件</div>
    <Pagination :pagination="pagination" @get-products="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      currentPage: 1,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          // this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
