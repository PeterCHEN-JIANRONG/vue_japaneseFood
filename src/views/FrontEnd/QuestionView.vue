<template>
  <div class="banner position-relative mb-4">
    <div class="container position-absolute top-50 start-50 translate-middle text-center">
      <h1 class="text-white">常見問題</h1>
      <h2 class="h4 text-white">有效解答您的問題，逛的安心、買的放心</h2>
    </div>
  </div>
  <div class="container mb-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">常見問題</li>
          </ol>
        </nav>
        <ul class="accordion mb-0" id="accordionExample">
          <li class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button fs-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                1、食品保存期限
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body fs-6">
                <p>
                  やまだ日本料理<strong>餐點無添加防腐劑，壽司冷藏的保存期限為2天</strong>，拿到餐點後希望您盡速食用完畢，誤隔餐飲用。<br />
                </p>
                <p class="mb-2">詳細保存期限請參考：</p>
                <ul class="ms-0 ms-md-5">
                  <li>壽司類：冷藏保存 2 日、冷凍保存 1 週。</li>
                  <li>生魚片：冷藏保存 1 日、冷凍保存 1 週。</li>
                  <li>
                    丼飯類：冷藏保存 3 日、冷凍保存 1 週，食用前請先已微波爐加熱，中火加熱 5 分鐘。
                  </li>
                  <li>
                    <strong class="text-danger">不可常溫保存</strong>，如有發現異味，請勿食用。
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed fs-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                2、宅配運送方式
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body fs-6">
                <p>
                  <strong>低溫冷藏方式宅配</strong
                  >，餐點都是當天新鮮現做後，統一交給指定合作宅配公司做低溫冷藏宅配到府，原則上以一個工作天內即可送達，
                  若為晚間 18:00 之後下訂，則順延一個工作天才可做配送服務。
                </p>
                <p class="mb-2">舉例：</p>

                <ul class="ms-0 ms-md-5">
                  <li>當天上午 10:00 點前下訂，最晚可於當天 18:00 點以前拿到。</li>
                  <li>當天上午 18:00 點後下訂，需順延一個工作天，待隔日 18:00 點以前拿到。</li>
                </ul>
              </div>
            </div>
          </li>
          <li class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed fs-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                3、付款方式
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body fs-6">
                <p>
                  <strong>目前只接受線上信用卡付款</strong>，未來預計新增更多行動支付 (e.g.,
                  PayPal、LINE Pay...)
                  ，提升顧客在線上消費的便利性。目前的付費方式造成您的不便，在此為您致歉，還請諒解。
                </p>
              </div>
            </div>
          </li>
          <li class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed fs-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
              >
                4、修改、取消訂單
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body fs-6">
                <p>
                  <strong>未完成付款前，訂單皆可做取消</strong
                  >，若已經結帳付款，恕不接受取消訂單，還請您見諒。 如有任何問題，請於上班日 10:00 ~
                  17:00 點，歡迎直接撥打電話
                  <a href="tel:+0900000000" class="link-secondary"> 0900-123-456 </a>，或於
                  <a href="https://facebook.com" class="link-secondary"> やまだ日本料理粉絲專頁 </a
                  >私訊，將有專人為您服務。
                </p>
              </div>
            </div>
          </li>
          <li class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed fs-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
              >
                5、聯絡我們
              </button>
            </h2>
            <div
              id="collapseFive"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body fs-6">
                <p>
                  <strong>請於上班日 10:00 ~ 17:00 點</strong
                  >，歡迎直接撥打客服電話，或於粉絲專頁私訊，將有專人為您服務。
                </p>
                <p class="mb-2">聯絡方式：</p>
                <ul class="ms-0 ms-md-5">
                  <li>
                    <i class="bi bi-telephone-fill me-2"></i>電話：<a
                      href="tel:+0900000000"
                      class="link-secondary"
                    >
                      0900-123-456
                    </a>
                  </li>
                  <li>
                    <i class="bi bi-facebook me-2"></i>粉專：<a
                      href="https://facebook.com"
                      class="link-secondary"
                      target="_blank"
                    >
                      やまだ日本料理粉絲專頁
                    </a>
                  </li>
                  <li>
                    <i class="bi bi-envelope-fill me-2"></i>信箱：
                    <a href="mailto:yamada.sushi@google.com.jp" class="link-secondary"
                      >yamada.sushi@google.com.jp</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <SubscribeView />
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
    url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;

  // @media (min-width: 768px) {
  //   background-position: center;
  // }
  @media (min-width: 992px) {
    background-position: 50% 60%;
  }
}
</style>
