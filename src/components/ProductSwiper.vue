<template>
  <Swiper
    :spaceBetween="16"
    :loop="true"
    :navigation="true"
    :modules="modules"
    :breakpoints="swiperOption"
    class="my-2"
  >
    <SwiperSlide v-for="item in products" :key="item.id">
      <div class="card hover-shadow card-img-hover cursor-pointer" @click="getProduct(item.id)">
        <div class="overflow-hidden position-relative">
          <img
            v-if="item.imageUrlSmall"
            :src="item.imageUrlSmall"
            class="card-img-top h-15s"
            :alt="item.title"
          />
          <img v-else :src="item.imageUrl" class="card-img-top h-15s" :alt="item.title" />
          <h5 class="h4 mb-0 text-white position-absolute product-information">詳細資訊</h5>
        </div>
        <div class="card-body">
          <h2 class="card-title space-nowrap overflow-hidden">{{ item.title }}</h2>
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
// import Swiper core and required modules
import { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.min.css';

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
      modules: [Navigation],
      swiperOption: {
        1: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
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

      // 改變網址, 若不在 /product 則前往該頁
      this.$router.push(`/product/${id}`);

      if (path === 'product') {
        // 當前為產品頁時，則emit
        this.$emit('get-product', id);
      }
    },
  },
};
</script>
