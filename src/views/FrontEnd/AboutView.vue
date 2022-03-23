<template>
  <div class="banner position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">關於我們</h1>
      <h2 class="h4 text-white">やまだ日本料理帶您品嚐壽司的美味</h2>
    </div>
  </div>

  <section class="container mb-4">
    <div class="row align-items-center">
      <div class="col-md-7">
        <div class="img__wrap mb-3 mb-md-0">
          <img src="../../assets/images/food/about-1.jpg" class="img__1" alt="關於我們" />
        </div>
      </div>
      <div class="col-md-5">
        <h2 class="h2 mb-3 border-bottom">經營理念</h2>
        <p class="fs-5 text-muted m-0">
          やまだ日本料理致力帶給人們了解、品嘗最道地的日本料理，不僅是在食材的挑選嚴謹，每位師傅對料理的執著與熱誠是我們最自豪、驕傲的。
          我們希望抱著期待的心情而前來的顧客們，可以帶著滿意愉悅的心情回去。
        </p>
      </div>
    </div>
  </section>
  <section class="bg-secondary py-4 mb-4">
    <div class="container">
      <div class="row align-items-center flex-row-reverse">
        <div class="col-md-7">
          <div class="img__wrap mb-3 mb-md-0">
            <img src="../../assets/images/food/about-5.jpg" alt="關於我們" />
          </div>
        </div>
        <div class="col-md-5">
          <h2 class="h2 mb-3 border-bottom border-primary">草創時期</h2>
          <p class="fs-5 m-0">
            やまだ日本料理創辦於1992年，起初以賣天婦羅、炸串為主，店面坐落於大阪通天閣的熱鬧商圈，僅僅8坪大的空間，
            員工僅有 2
            人，及店長與副店長，相依為命、患難與共。由於當時日本經濟泡沫化的影響，經營並非順遂。
            但是我們相信「民以食為天」，吃飽是最重要的；而做料理最重要的就是－「心」，只要用心一定能有所成長。
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="container mb-5">
    <div class="row align-items-center">
      <div class="col-md-7">
        <div class="img__wrap mb-3 mb-md-0">
          <img src="../../assets/images/food/about-2.jpg" alt="關於我們" />
        </div>
      </div>
      <div class="col-md-5">
        <h2 class="h2 mb-3 border-bottom">創辦人</h2>
        <p class="fs-5 text-muted m-0">
          創辦人やまだ先生，本身是台灣人，餐飲背景出生。因為非常憧憬日本的道地文化、美食，年僅 22
          歲便決心前往日本拜師學藝，在歷練的過程中切身體悟到日本人的職人精神，細心、嚴謹，就算一件看似簡單的事情，也會盡力做到最好。
          讓やまだ先生敬佩不已。在經營事業有成後，決定回台灣發展，將最道地的日本料理帶給大家。
        </p>
      </div>
    </div>
  </section>
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

<style lang="scss" scoped>
.banner {
  height: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1504416285472-eccf03dd31eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80');
  background-size: cover;
  background-position: center;

  // @media (min-width: 768px) {
  //   background-position: center;
  // }
  // @media (min-width: 992px) {
  //   background-position: 50% 60%;
  // }
}

.img__wrap {
  overflow: hidden;
  img {
    width: 100%;
    min-height: 380px;
    max-height: 400px;
    object-fit: cover;
    object-position: center;
  }

  .img__1 {
    object-position: left center;
  }
}
</style>
