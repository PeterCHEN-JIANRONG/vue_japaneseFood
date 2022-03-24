<template>
  <Swiper
    :slidesPerView="1.2"
    :spaceBetween="16"
    :loop="true"
    :breakpoints="swiperOption"
    class="my-2"
  >
    <SwiperSlide v-for="(item, index) in products" :key="`${item.id}-${index}`" data-aos="zoom-in">
      <div
        class="card hover-shadow card-img-hover cursor-pointer"
        @click="$router.push(`/product/${item.id}`)"
      >
        <div class="overflow-hidden position-relative">
          <img :src="item.imageUrl" class="card-img-top h-15s" alt="產品照" />
          <h5 class="h4 mb-0 text-white position-absolute product-information">詳細資訊</h5>
          <span
            v-if="item.price !== item.origin_price"
            class="badge bg-danger position-absolute top-0 start-0 fs-5"
            >特價</span
          >
        </div>
        <div class="card-body">
          <h2 class="card-title space-nowrap overflow-hidden">{{ item.title }}</h2>
          <p class="card-text text-truncate text-muted mb-2">
            {{ item.description }}
          </p>
          <div class="d-flex justify-content-center align-items-end mb-3">
            <template v-if="item.price !== item.origin_price">
              <h3 class="fs-2 mb-0 text-danger me-2">NT${{ item.price }}</h3>
              <h4 class="fs-6 mb-0 text-decoration-line-through text-muted">
                NT${{ item.origin_price }}
              </h4>
            </template>
            <h3 v-else class="fs-2 mb-0">NT${{ item.price }}</h3>
          </div>
          <div class="btn-group w-100" role="group" aria-label="Basic outlined example">
            <button
              class="btn btn-outline-primary"
              @click.stop="addToCart(item.id)"
              :disabled="isLoadingItem === item.id"
            >
              <span class="material-icons align-middle"> add_shopping_cart </span>
            </button>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import AOS from 'aos';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
// Import Swiper styles
import 'swiper/swiper.scss';

import localStorageFavorite from '@/mixins/localStorageFavorite';
import emitter from '@/libs/emitter';

export default {
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOption: {
        768: {
          slidesPerView: 2.3,
          slidesPerGroup: 2,
        },
        992: {
          slidesPerView: 3.4,
          slidesPerGroup: 3,
        },
        1200: {
          slidesPerView: 4.4,
          slidesPerGroup: 3,
        },
      },
      isLoadingItem: '',
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mixins: [localStorageFavorite],
  emits: ['get-product', 'get-cart'],
  methods: {
    getProduct(id) {
      // 取得當前目錄
      const path = this.$route.path.split('/')[1];

      // 改變網址, 若不在 /product 則前往該頁
      this.$router.push(`/product/${id}`);

      if (path === 'product') {
        // 當前為產品頁時，則emit
        this.$emit('get-product', id);
      }
    },
    addToCart(id, qty = 1) {
      this.isLoadingItem = id;
      const data = {
        product_id: id,
        qty,
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoadingItem = '';
          emitter.emit('get-cart'); // navbar 購物車數量
          this.$emit('get-cart'); // 父層重新取得購物車
          this.$httpMessageState(res, res.data.message);
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    AOS.init({
      once: true, // whether animation should happen only once - while scrolling down
    });
  },
};
</script>
