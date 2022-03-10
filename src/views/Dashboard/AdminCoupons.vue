<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" :z-index="1060"></Loading>

  <div class="container py-4">
    <h1 class="mb-4">優惠券</h1>
    <div class="text-end mb-2">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mb-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="`${key}${item.id}`">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
                :disabled="isLoadingItem === item.id"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
                :disabled="isLoadingItem === item.id"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-end">共 {{ coupons.length }} 個</div>
    <Pagination :pagination="pagination" @get-products="getCoupons"></Pagination>
  </div>
  <DelModal
    ref="delModal"
    :item="tempCoupon"
    title="優惠券"
    :content="`${tempCoupon.title}，折扣馬：${tempCoupon.code}`"
    @del-item="deleteCoupon"
  ></DelModal>
</template>

<script>
import Pagination from '@/components/PaginationView.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isLoading: false,
      isLoadingItem: '',
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    DelModal,
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    deleteCoupon() {
      this.isLoadingItem = this.tempCoupon.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = '';
          this.$refs.delModal.hideModal();
          this.$httpMessageState(res, '刪除優惠券');
          this.getCoupons(this.currentPage);
        })
        .catch((err) => {
          this.isLoadingItem = '';
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.delModal.openModal();
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
