<template>
  <div class="bg-dark">
    <div class="container">
      <footer class="py-4">
        <ul class="nav justify-content-center mb-3 fs-5">
          <li class="nav-item"><a href="#" class="nav-link px-3 text-light">首頁</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-3 text-light">商品介紹</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-3 text-light">關於我們</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-3 text-light">常見問題</a></li>
        </ul>
        <ul class="nav justify-content-center border-bottom pb-3 mb-3 fs-4">
          <li class="nav-item">
            <a href="#" class="nav-link px-3 text-light">
              <i class="bi bi-twitter"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-3 text-light">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-3 text-light"><i class="bi bi-facebook"></i> </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-3 text-light" to="/admin/products"
              ><i class="bi bi-github"></i
            ></router-link>
          </li>
        </ul>
        <p class="text-center text-light fs-4">© 2021 やまだ日本料理, Inc</p>
        <p class="text-center text-light fs-6">本網站僅供個人作品使用，不提供商業用途</p>
      </footer>
    </div>
  </div>
</template>
