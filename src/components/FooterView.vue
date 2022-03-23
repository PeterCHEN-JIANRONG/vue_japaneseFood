<template>
  <div class="bg-dark">
    <div class="container">
      <footer class="py-4 text-muted">
        <ul class="nav justify-content-center mb-3 fs-5">
          <li class="nav-item">
            <router-link to="/" class="nav-link px-3 link-muted">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="products" class="nav-link px-3 link-muted">精選商品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="about" class="nav-link px-3 link-muted">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="question" class="nav-link px-3 link-muted">常見問題</router-link>
          </li>
        </ul>
        <ul class="nav justify-content-center border-bottom pb-3 mb-3 fs-4">
          <li class="nav-item">
            <a href="https://twitter.com/" target="_blank" class="nav-link link-muted px-3">
              <i class="bi bi-twitter"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="https://www.instagram.com/" target="_blank" class="nav-link link-muted px-3">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link link-muted px-3" to="/admin/products">
              <i class="bi bi-facebook"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <a
              href="https://github.com/PeterCHEN-JIANRONG/vue_japaneseFood"
              target="_blank"
              class="nav-link link-muted px-3"
            >
              <i class="bi bi-github"></i>
            </a>
          </li>
        </ul>
        <p class="text-center fs-4">© 2021 やまだ日本料理, Inc</p>
        <p class="text-center fs-6">本網站僅供個人作品使用，不提供商業用途</p>
      </footer>
    </div>
  </div>
</template>
