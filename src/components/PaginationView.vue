<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getProduct(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="'page' + page"
        :class="{ active: page === pagination.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="getProduct(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getProduct(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['get-products'],
  methods: {
    getProduct(page = 1) {
      this.$emit('get-products', page);
    },
  },
};
</script>
