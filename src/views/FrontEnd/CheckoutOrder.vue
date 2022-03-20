<template>
  <h1>訂單建立</h1>
  {{ order.is_paid }}
  <div class="btn btn-primary" @click="payOrder">確認付款</div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {},
    };
  },
  methods: {
    getOrder() {
      this.orderId = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.order = res.data.order;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '讀取訂單');
        });
    },
    payOrder() {
      this.orderId = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http
        .post(url)
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, res.data.message);
          this.getOrder();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, '讀取訂單');
        });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
