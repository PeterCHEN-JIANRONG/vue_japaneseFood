<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading"></Loading>

  <div class="header position-relative mb-5">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="header__title text-white">用匠人精神做出的極品料理</h1>
      <h2 class="fs-5 fs-md-3 text-white mb-3">やまだ提供多種口味的壽司、甜點，滿足您的味蕾</h2>
      <div class="btn btn-primary btn-lg" @click="$router.push(`/products`)">立即選購</div>
    </div>
  </div>

  <section class="container mb-5">
    <h2 class="h1 mb-4 text-center">日式壽司、美食、甜品</h2>
    <div class="row row-cols-1 row-cols-md-2 gx-0 align-items-center">
      <div class="col overflow-hidden">
        <img
          src="../../assets/images/food/category-1.jpg"
          class="h-15s h-md-19s img-cover w-100 cursor-pointer img-hover"
          alt="分類圖"
          @click="$router.push(`/products`)"
        />
      </div>
      <div class="col px-md-5 text-center pt-3 pb-4 py-md-0">
        <h3 class="h2 mb-3">
          <span class="border-bottom border-2 border-primary">多種口味的壽司</span>
        </h3>
        <p class="fs-5 text-muted">
          鮭魚、鮪魚、甜蝦、玉子燒、握壽司、軍艦壽司...等，多種口味一次滿足。
        </p>
        <div class="btn btn-primary" @click="$router.push(`/products`)">前往</div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 gx-0 align-items-center flex-row-reverse">
      <div class="col overflow-hidden">
        <img
          src="../../assets/images/food/category-2.jpg"
          class="h-15s h-md-19s img-cover w-100 cursor-pointer img-hover"
          alt="分類圖"
          @click="$router.push(`/products`)"
        />
      </div>
      <div class="col px-md-5 text-center pt-3 pb-4 py-md-0">
        <h3 class="h2 mb-3">
          <span class="border-bottom border-2 border-primary">經典日式美食</span>
        </h3>
        <p class="fs-5 text-muted">熱呼呼喀滋豬排飯，搭配特製濃郁咖哩醬汁，老饕客都說讚。</p>
        <div class="btn btn-primary" @click="$router.push(`/products`)">前往</div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 gx-0 align-items-center">
      <div class="col overflow-hidden">
        <img
          src="../../assets/images/food/category-4.jpg"
          class="h-15s h-md-19s img-cover w-100 cursor-pointer img-hover"
          alt="分類圖"
          @click="$router.push(`/products`)"
        />
      </div>
      <div class="col px-md-5 text-center pt-3 py-md-0">
        <h3 class="h2 mb-3">
          <span class="border-bottom border-2 border-primary">美味點心</span>
        </h3>
        <p class="fs-5 text-muted">熱呼呼章魚燒搭配柴魚片，呼哇呼哇小朋友的最愛點心。</p>
        <div class="btn btn-primary" @click="$router.push(`/products`)">前往</div>
      </div>
    </div>
  </section>

  <section class="bg-secondary py-5 mb-5">
    <div class="container">
      <h2 class="h1 mb-4 text-center">精緻美食，任君挑選</h2>
      <div class="row">
        <div class="col-md-6 col-lg-7">
          <div class="row row-cols-2 row-cols-md-1 row-cols-lg-2 gy-3">
            <div
              class="col"
              v-for="(item, index) in products"
              :key="item.id"
              :class="{ 'd-md-none d-lg-block': index > 1 }"
            >
              <div
                class="img__small overflow-hidden position-relative"
                @click="$router.push(`/product/${item.id}`)"
              >
                <img
                  :src="item.imageUrl"
                  alt="產品圖"
                  class="h-100 img-cover w-100 cursor-pointer img-hover"
                />
                <h2 class="text-white position-absolute bottom-0 end-0 m-3">{{ item.title }}</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-5 d-none d-md-block">
          <div
            class="img__big overflow-hidden position-relative"
            @click="$router.push(`/product/${product.id}`)"
          >
            <img
              :src="product.imageUrl"
              alt="產品圖"
              class="h-100 img-cover w-100 cursor-pointer img-hover"
            />
            <h2 class="text-white position-absolute bottom-0 end-0 m-3">{{ product.title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container mb-5">
    <h2 class="h1 mb-4 text-center">嚴選食材</h2>
    <div class="row row-cols-1 row-cols-md-3">
      <div class="col">
        <img
          class="img__small img-cover w-100 mb-3"
          src="../../assets/images/food/water.jpg"
          alt="原料圖"
        />
        <div class="text-center">
          <h3 class="h2 mb-3">
            <span class="border-bottom border-2 border-primary">RO逆滲透水</span>
          </h3>
          <p class="fs-5 text-muted mb-md-0">
            選用RO逆滲透水，通過國家安全標準檢測，並定期做設備清理，安心無慮。
          </p>
        </div>
      </div>
      <div class="col">
        <img
          class="img__small img-cover w-100 mb-3"
          src="../../assets/images/food/rice.jpg"
          alt="原料圖"
        />
        <div class="text-center">
          <h3 class="h2 mb-3">
            <span class="border-bottom border-2 border-primary">台灣花蓮米</span>
          </h3>
          <p class="fs-5 text-muted mb-md-0">
            花蓮池上冠軍米，池上地區土壤肥沃，含豐富有機礦物質，是優質稻米的盛產地。
          </p>
        </div>
      </div>
      <div class="col">
        <img
          class="img__small img-cover w-100 mb-3"
          src="../../assets/images/food/fish.jpg"
          alt="原料圖"
        />
        <div class="text-center">
          <h3 class="h2 mb-3">
            <span class="border-bottom border-2 border-primary">東港黑鮪魚</span>
          </h3>
          <p class="fs-5 text-muted mb-0">
            屏東縣東港鎮有著黑鮪魚故鄉的美名，鮪魚的油脂豐厚，產地直送新鮮優質。
          </p>
        </div>
      </div>
    </div>
  </section>

  <SubscribeView></SubscribeView>
</template>

<script>
import SubscribeView from '@/components/SubscribeView.vue';

export default {
  data() {
    return {
      isLoading: false,
      productsAll: [],
      products: [],
      product: {},
    };
  },
  components: {
    SubscribeView,
  },
  methods: {
    getProductsAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.productsAll = res.data.products;
          this.isLoading = false;
          this.getRandomProducts();
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    getRandomProducts() {
      this.products = this.productsAll.sort(() => Math.random() - 0.5);
      [this.product] = this.productsAll.splice(1, 1);
      this.products = this.products.splice(1, 4);
    },
  },
  mounted() {
    this.getProductsAll();
  },
};
</script>

<style lang="scss" scoped>
.img {
  &__small {
    height: 250px;
  }
  &__big {
    height: 516px;
  }

  @media (min-width: 992px) {
    &__small {
      height: 300px;
    }
    &__big {
      height: 616px;
    }
  }
}
</style>
