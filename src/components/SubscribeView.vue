<template>
  <div class="subscribe">
    <div class="container">
      <div class="row p-3">
        <div class="col-md-6 col-lg-4">
          <div class="py-5">
            <Form ref="form" class="" v-slot="{ errors }" @submit="subscribe">
              <label for="email" class="h3 mb-3 text-white">訂閱優惠訊息</label>
              <div class="input-group mb-3">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="馬上輸入信箱取得優惠"
                  v-model="form.email"
                  rules="email|required"
                ></Field>
                <button class="btn btn-primary" type="submit" :disabled="isLoading">
                  訂閱
                  <div
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>

                <ErrorMessage name="email" class="invalid-feedback fs-5"></ErrorMessage>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      form: {
        email: '',
      },
      couponCode: 'YAMADA_59186',
      isLoading: false,
    };
  },
  methods: {
    subscribe() {
      this.isLoading = true;
      setTimeout(this.subscribeCallback, 1000);
    },
    subscribeCallback() {
      this.isLoading = false;
      this.$swal({
        position: 'center',
        icon: 'success',
        title: '已獲得優惠券',
        html: `優惠碼：${this.couponCode}`,
        confirmButtonText: '複製並前往購物',
        confirmButtonColor: '#77352B',
        showCancelButton: true,
        cancelButtonText: '取消',
        cancelButtonColor: '#E0AB92',
        reverseButtons: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.email = '';
          this.copyCoupon();
          emitter.emit('push-message', {
            style: 'success',
            title: '已複製優惠碼',
          });
          this.$router.push('/products');
        }
      });
    },
    copyCoupon() {
      navigator.clipboard.writeText(this.couponCode);
    },
  },
};
</script>

<style lang="scss" scoped>
.subscribe {
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.7),
      rgba(255, 255, 255, 0)
    ),
    url('https://images.unsplash.com/photo-1617196035303-964a45bbc9f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
