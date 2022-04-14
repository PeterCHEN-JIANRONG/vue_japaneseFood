<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" />

  <div class="container py-4">
    <h1 class="mb-4">產品列表</h1>
    <div class="text-end mb-2">
      <button class="btn btn-primary" type="button" @click="openModal('create')">
        建立新的產品
      </button>
    </div>
    <table class="table mb-4">
      <thead>
        <tr>
          <th>圖片</th>
          <th width="120">產品名稱</th>
          <th width="120">分類</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              v-if="item.imageUrl"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
              style="height: 100px; background-size: cover; background-position: center"
            ></div>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.category }}</td>
          <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-end">{{ $filters.currency(item.price) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                @click="openModal('update', item)"
                type="button"
                class="btn btn-outline-primary btn-sm"
              >
                編輯
              </button>
              <button
                @click="openModal('delete', item)"
                type="button"
                class="btn btn-outline-danger btn-sm"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-end">共 {{ products.length }} 個</div>
    <Pagination :pagination="pagination" @get-products="getProducts" />
    <AdminProductModal
      ref="productModal"
      :product="tempProduct"
      :is-new="isNew"
      @get-products="getProducts"
    />
    <AdminDelProductModal
      ref="delProductModal"
      :temp-product="tempProduct"
      @get-products="getProducts"
    />
  </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue';
import AdminProductModal from '@/components/AdminProductModal.vue';
import AdminDelProductModal from '@/components/AdminDelProductModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
        is_enabled: 1,
      },
      isNew: true,
      isLoading: false,
    };
  },
  components: {
    Pagination,
    AdminProductModal,
    AdminDelProductModal,
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
          document.documentElement.scrollTop = 0; // 頁面置頂
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    openModal(state, item) {
      if (state === 'create') {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: 1,
          unit: '個',
          category: '壽司',
          content: `- 配菜為每日新鮮採買不定期更換，照片僅供參考
- 當日兩小時前訂餐即送。 每日數量有限，訂完為止。
- 請盡速食用完畢，誤隔餐食用。
- 即訂即送便當，營養均衡少油，少鹽，無味精，新鮮食材照單立即烹調
- 專人保溫配送，專人將於到達時與您聯繫。由於停車不便，外送於一樓取餐
※提醒：線上預訂最晚需前一天下午四點前

山田手作日式便當：所有食材當日新鮮烹煮，無味精，無任何加工罐頭調味，完全新鮮，健康，美味
傳承懷念日本職人精神，一份用心烹調的感動送到你手上。`,
        };
        this.$refs.productModal.openModal();
      } else if (state === 'update') {
        this.isNew = false;
        this.tempProduct = JSON.parse(JSON.stringify(item)); // 深拷貝，避免修改多圖時，會傳參考改到
        this.$refs.productModal.openModal();
      } else if (state === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.delProductModal.openModal();
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
