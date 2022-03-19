<template>
  <Swiper
    :slidesPerView="1.2"
    :spaceBetween="16"
    :loop="true"
    :breakpoints="swiperOption"
    class="my-2"
  >
    <SwiperSlide v-for="item in products" :key="item.id">
      <div class="card hover-shadow-sm card-img-hover cursor-pointer" @click="getProduct(item.id)">
        <div class="overflow-hidden position-relative">
          <img :src="item.imageUrl" class="card-img-top h-15s" alt="產品照" />
          <h5 class="h4 mb-0 text-white position-absolute product-information">詳細資訊</h5>
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ item.title }}</h2>
          <p class="card-text text-truncate text-muted mb-2">
            {{ item.description }}
          </p>
          <div class="d-flex justify-content-center align-items-end">
            <template v-if="item.price !== item.origin_price">
              <h3 class="fs-2 mb-0 text-danger me-2">NT${{ item.price }}</h3>
              <h4 class="fs-6 mb-0 text-decoration-line-through text-muted">
                NT${{ item.origin_price }}
              </h4>
            </template>
            <h3 v-else class="fs-2 mb-0">NT${{ item.price }}</h3>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
// Import Swiper styles
import 'swiper/swiper.scss';

import localStorageFavorite from '@/mixins/localStorageFavorite';

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
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mixins: [localStorageFavorite],
  emits: ['get-product'],
  methods: {
    getProduct(id) {
      // 取得當前目錄
      const path = this.$route.path.split('/')[1];

      if (path === 'product') {
        // 若為產品頁則emit
        this.$emit('get-product', id);
      } else {
        // 不是產品頁則導頁
        this.$router.push(`/product/${id}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.img {
  height: 400px;
  object-fit: cover;
}
</style>
