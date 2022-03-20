<template>
  <div class="header position-relative mb-5">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="header__title text-white">用匠人精神做出的極品料理</h1>
      <h2 class="fs-5 fs-md-3 text-white mb-3">やまだ提供多種口味的壽司、甜點，滿足您的味蕾</h2>
      <div class="btn btn-primary btn-lg" @click="$router.push(`/products`)">立即選購</div>
    </div>
  </div>
  <div class="container">
    <section class="mb-5">
      <h2 class="h1 mb-4 text-center">各式日式壽司、美食、甜品</h2>
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
    <section class="mb-5">
      <h2 class="h1 mb-4 text-center">各式日式壽司、美食、甜品</h2>
    </section>
  </div>

  <SubscribeView></SubscribeView>
</template>

<script>
import SubscribeView from '@/components/SubscribeView.vue';

export default {
  components: {
    SubscribeView,
  },
};
</script>

<style lang="scss" scoped></style>
