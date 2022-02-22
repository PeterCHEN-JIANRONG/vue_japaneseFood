<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-md-5 col-lg-6">
        <img v-if="product.imageUrl" :src="product.imageUrl" alt="產品照" />
      </div>
      <div class="col-md-7 col-lg-6">
        <h5>
          <span class="badge bg-secondary">{{ product.category }}</span>
        </h5>
        <h1>{{ product.title }}</h1>
        <h2 v-if="product.price === product.origin_price">{{ product.price }}元</h2>
        <template v-else>
          <h3 class="text-decoration-line-through">{{ product.origin_price }}元</h3>
          <h2>{{ product.price }}元</h2>
        </template>
      </div>
    </div>
    <h2 class="mb-2">商品描述</h2>
    <div class="mb-4">{{ product.description }}</div>
    <h2 class="mb-2">商品內容</h2>
    <div class="mb-4">{{ product.content }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
