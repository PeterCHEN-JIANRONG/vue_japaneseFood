<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" :z-index="1060" />

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
                  {{ `${product.product.title} - ${product.qty}${product.product.unit}` }}
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
                  :disabled="isLoadingItem === item.id"
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
                  @click="openOrderModal(item)"
                  :disabled="isLoadingItem === item.id"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelModal(item)"
                  :disabled="isLoadingItem === item.id"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="text-end">共 {{ orders.length }} 個</div>
    <Pagination :pagination="pagination" @get-products="getOrders"></Pagination>
  </div>
  <AdminOrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
  <DelModal
    ref="delModal"
    :item="tempOrder"
    title="訂單"
    :content="tempOrder.id"
    @del-item="deleteOrder"
  />
</template>

<script>
import Pagination from '@/components/PaginationView.vue';
import AdminOrderModal from '@/components/AdminOrderModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false,
      isLoadingItem: '',
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    AdminOrderModal,
    DelModal,
  },
  methods: {
    getOrders(page = 1) {
      this.currentPage = page; // 紀錄當前在第幾頁
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    updatePaid(item) {
      this.isLoadingItem = item.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const data = {
        ...item,
      };
      this.$http
        .put(url, { data })
        .then((res) => {
          this.isLoadingItem = '';
          this.$refs.orderModal.hideModal();
          this.getOrders(this.currentPage);
          this.$httpMessageState(res, '更新付款狀態');
        })
        .catch((err) => {
          this.isLoadingItem = '';
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    deleteOrder() {
      this.isLoadingItem = this.tempOrder.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = '';
          this.tempOrder = {};
          this.$refs.delModal.hideModal();
          this.$httpMessageState(res, '刪除訂單');
          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          this.isLoadingItem = '';
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    openOrderModal(item) {
      this.tempOrder = { ...item };
      this.$refs.orderModal.openModal();
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      this.$refs.delModal.openModal();
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
