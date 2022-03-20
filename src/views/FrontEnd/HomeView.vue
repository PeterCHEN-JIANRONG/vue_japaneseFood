<template>
  <div class="header position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="header__title text-white">用匠人精神做出的極品料理</h1>
      <h2 class="fs-5 fs-md-3 text-white mb-3">やまだ提供多種口味的壽司、甜點，滿足您的味蕾</h2>
      <div class="btn btn-primary btn-lg" @click="$router.push(`/products`)">立即選購</div>
    </div>
  </div>
  <div class="container">
    <h1>首頁</h1>
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
