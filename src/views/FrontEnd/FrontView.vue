<template>
  <ToastMessages />
  <FrontNavbar />
  <router-view />
  <FooterView />
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  components: {
    FrontNavbar,
    FooterView,
  },
};
</script>
