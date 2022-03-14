<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" :z-index="1060"></Loading>

  <div class="container py-4">
    <h1 class="mb-4">文章列表</h1>
    <div class="text-end mt-2">
      <button class="btn btn-primary" type="button" @click="openModal(true)">建立新的文章</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article.id)"
                :disabled="isLoadingItem === item.id"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelArticleModal(article)"
                :disabled="isLoadingItem === item.id"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-end">共 {{ articles.length }} 個</div>
    <Pagination :pagination="pagination" @get-products="getArticles"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue';

export default {
  data() {
    return {
      isLoading: false,
      isLoadingItem: '',
      articles: [],
      tempArticle: {},
      isNew: false,
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
