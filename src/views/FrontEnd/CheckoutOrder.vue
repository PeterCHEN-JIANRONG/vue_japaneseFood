<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" />

  <div v-if="!order.is_paid" class="banner banner-1 position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">付款流程</h1>
      <h2 class="h4 text-white">確認商品數量、金額及套用優惠券，完成付款吧！</h2>
    </div>
  </div>
  <div v-else class="banner banner-2 position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">付款完成</h1>
      <h2 class="h4 text-white">您的購買已完成，期待您的再次光臨，謝謝惠顧！</h2>
    </div>
  </div>
  <div class="container mb-4">
    <OrderProgress :step="step" />
  </div>
  <div class="container mb-4">
    <div class="row row-cols-1 row-cols-xl-2 g-4">
      <div class="col">
        <div class="">
          <table class="table align-middle text-center table-striped table-hover mb-0">
            <thead>
              <tr class="table-secondary">
                <th style="min-width: 80px" class="d-none d-md-table-cell">圖片</th>
                <th>商品名稱</th>
                <th class="d-none d-sm-table-cell d-md-none d-lg-table-cell">單價</th>
                <th>數量</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in order.products" :key="item.id">
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
                    {{ item.qty }}
                    <span class="d-none d-sm-inline"> {{ item.product.unit }}</span>
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
                <td colspan="2" class="text-end fs-4">總計</td>
                <td class="fs-4">
                  {{ $filters.currency(order.total) }}
                </td>
              </tr>
              <tr v-if="couponCode !== ''">
                <td class="d-none d-md-table-cell"></td>
                <td class="d-none d-sm-table-cell d-md-none d-lg-table-cell"></td>
                <td colspan="3" class="text-end text-muted fs-5">
                  <span class="badge bg-success">已套用優惠券</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="col">
        <div class="bg-light p-4">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div v-show="!order.is_paid">
                <h2 class="h2 text-center mb-3">訂購資訊</h2>
                <div class="">
                  <table class="table fs-lg-5">
                    <tbody :class="{ 'text-muted': order.is_paid }">
                      <tr>
                        <th>訂單時間</th>
                        <td class="">
                          <span class="me-2">
                            {{ this.$filters.date(order.create_at) }}
                          </span>
                          <small class="text-muted fs-md-6 d-none d-sm-inline">
                            {{ new Date(order.create_at * 1000).toLocaleTimeString() }}
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <th>訂單編號</th>
                        <td class="">
                          <div class="d-flex align-items-center">
                            <span class="me-2 d-inline-block text-truncate" style="max-width: 65px">
                              {{ order.id }}
                            </span>
                            <a
                              href="#"
                              class="link-secondary d-flex align-items-center"
                              @click.prevent="copyId(order.id)"
                            >
                              <span class="material-icons"> content_copy </span>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>訂購人</th>
                        <td>{{ order.user?.name }}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{{ order.user?.email }}</td>
                      </tr>

                      <tr>
                        <th>電話</th>
                        <td>{{ order.user?.tel }}</td>
                      </tr>
                      <tr>
                        <th>地址</th>
                        <td>{{ order.user?.address }}</td>
                      </tr>
                      <tr v-if="order.message">
                        <th>留言</th>
                        <td>{{ order.message }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>付款狀態</th>
                        <td>
                          <span v-if="!order.is_paid">尚未付款</span>
                          <span v-else class="badge bg-success">付款完成</span>
                        </td>
                      </tr>
                      <tr v-if="!order.is_paid">
                        <td colspan="2">
                          <small class="fs-6 text-muted"
                            >提醒您訂單需於24小時內完成付款，謝謝您的支持。</small
                          >
                        </td>
                      </tr>
                      <tr v-if="order.is_paid">
                        <th>付款時間</th>
                        <td>
                          <span class="me-2">
                            {{ new Date(order.paid_date * 1000).toLocaleDateString() }}
                          </span>
                          <small class="text-muted fs-md-6 d-none d-sm-inline">{{
                            new Date(order.paid_date * 1000).toLocaleTimeString()
                          }}</small>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div v-show="order.is_paid">
                <div class="text-center">
                  <i class="bi bi-cart-check-fill"></i>
                </div>
                <h2 class="h2 text-center mb-3">付款完成！</h2>
                <p class="text-center">
                  您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。
                </p>
                <button class="btn btn-outline-secondary mb-3" type="button" @click="toggleNavHam">
                  訂單明細
                </button>
                <div class="collapse" ref="collapse">
                  <h2 class="h2 text-center mb-3">訂購資訊</h2>
                  <div class="">
                    <table class="table fs-lg-5">
                      <tbody :class="{ 'text-muted': order.is_paid }">
                        <tr>
                          <th>訂單時間</th>
                          <td class="">
                            <span class="me-2">
                              {{ this.$filters.date(order.create_at) }}
                            </span>
                            <small class="text-muted fs-md-6 d-none d-sm-inline">
                              {{ new Date(order.create_at * 1000).toLocaleTimeString() }}
                            </small>
                          </td>
                        </tr>
                        <tr>
                          <th>訂單編號</th>
                          <td class="">
                            <div class="d-flex align-items-center">
                              <span
                                class="me-2 d-inline-block text-truncate"
                                style="max-width: 65px"
                              >
                                {{ order.id }}
                              </span>
                              <a
                                href="#"
                                class="link-secondary d-flex align-items-center"
                                @click.prevent="copyId(order.id)"
                              >
                                <span class="material-icons"> content_copy </span>
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>訂購人</th>
                          <td>{{ order.user?.name }}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{{ order.user?.email }}</td>
                        </tr>

                        <tr>
                          <th>電話</th>
                          <td>{{ order.user?.tel }}</td>
                        </tr>
                        <tr>
                          <th>地址</th>
                          <td>{{ order.user?.address }}</td>
                        </tr>
                        <tr v-if="order.message">
                          <th>留言</th>
                          <td>{{ order.message }}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>付款狀態</th>
                          <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="badge bg-success">付款完成</span>
                          </td>
                        </tr>
                        <tr v-if="!order.is_paid">
                          <td colspan="2">
                            <small class="fs-6 text-muted"
                              >提醒您訂單需於24小時內完成付款，謝謝您的支持。</small
                            >
                          </td>
                        </tr>
                        <tr v-if="order.is_paid">
                          <th>付款時間</th>
                          <td>
                            <span class="me-2">
                              {{ new Date(order.paid_date * 1000).toLocaleDateString() }}
                            </span>
                            <small class="text-muted fs-md-6 d-none d-sm-inline">{{
                              new Date(order.paid_date * 1000).toLocaleTimeString()
                            }}</small>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div v-if="!order.is_paid" class="btn btn-primary btn-lg w-100" @click="payOrder">
                確認付款
              </div>
              <div v-else class="btn btn-primary btn-lg w-100" @click="$router.push(`/products`)">
                繼續選購
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="container mb-5" v-if="order.is_paid">
    <h2 class="mb-3">是不是忘了買什麼</h2>
    <ProductSwiper :products="randomProducts" />
  </section>
</template>

<script>
import ProductSwiper from '@/components/ProductSwiper.vue';
import OrderProgress from '@/components/OrderProgress.vue';
import emitter from '@/libs/emitter';
import collapseMixin from '@/mixins/collapseMixin';

export default {
  data() {
    return {
      orderId: '',
      order: {},
      couponCode: '',
      isLoading: false,
      productsAll: [],
      step: 2,
    };
  },
  components: {
    ProductSwiper,
    OrderProgress,
  },
  mixins: [collapseMixin],
  methods: {
    getOrder() {
      this.orderId = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.order;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '讀取訂單');
        });
    },
    payOrder() {
      this.orderId = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .post(url)
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, res.data.message);
          this.getOrder();
          document.documentElement.scrollTop = 0; // 頁面置頂
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '讀取訂單');
        });
    },
    getProductsAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.productsAll = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    copyId(id) {
      navigator.clipboard.writeText(id);
      emitter.emit('push-message', {
        style: 'success',
        title: '已複製訂單編號',
      });
    },
  },
  computed: {
    randomProducts() {
      const products = [...this.productsAll];
      products.sort(() => Math.random() - 0.5); // 隨機排序
      // products.length = 10; // 取前 10 筆
      return products;
    },
  },
  watch: {
    order() {
      // 取得優惠券
      const [key] = Object.keys(this.order.products);
      if (this.order.products[key].coupon !== undefined) {
        this.couponCode = this.order.products[key].coupon.code;
      }

      // 取得訂單狀態
      if (this.order.is_paid) {
        this.step = 3;
      }
    },
  },
  mounted() {
    this.getOrder();
    this.getProductsAll();
  },
};
</script>

<style lang="scss" scoped>
.banner {
  height: 280px;
  background-size: cover;
  background-position: center;
  @media (min-width: 992px) {
    background-position: 50% 40%;
  }
}

.banner-1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1470256699805-a29e1b58598a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
}
.banner-2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2092&q=80');
}

.img {
  &__small {
    height: 60px;
  }
}

.bi-cart-check-fill {
  font-size: 100px;
}
</style>
