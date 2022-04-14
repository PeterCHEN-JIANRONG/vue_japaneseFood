<template>
  <!-- vue-loading-overlay -->
  <Loading :active="isLoading" :z-index="1060" />

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
                :disabled="isLoadingItem === article.id"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelArticleModal(article)"
                :disabled="isLoadingItem === article.id"
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
  <AdminArticleModal
    ref="articleModal"
    :article="tempArticle"
    :is-new="isNew"
    @update-article="updateArticle"
  ></AdminArticleModal>
  <DelModal
    ref="delModal"
    :item="tempArticle"
    title="文章"
    :content="`標題：${tempArticle.title}，作者：${tempArticle.author}`"
    @del-item="delArticle"
  ></DelModal>
</template>

<script>
import Pagination from '@/components/PaginationView.vue';
import AdminArticleModal from '@/components/AdminArticleModal.vue';
import DelModal from '@/components/DelModal.vue';

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
    AdminArticleModal,
    DelModal,
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
    getArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.isLoadingItem = id;
      this.isLoading = true;
      this.$http
        .get(api)
        .then((response) => {
          this.isLoadingItem = id;
          if (response.data.success) {
            this.openModal(false, response.data.article);
            this.isNew = false;
            this.isLoading = false;
            this.isLoadingItem = '';
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.isLoadingItem = '';
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
    updateArticle(item) {
      this.tempArticle = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      let status = '新增貼文';
      this.isLoading = true;
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
        status = '更新貼文';
      }
      const articleComponent = this.$refs.articleModal;
      this.isLoading = true;
      this.$http[httpMethod](api, { data: this.tempArticle })
        .then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, status);
          articleComponent.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
        this.currentPage = 1;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    delArticle() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((response) => {
          this.isLoading = false;
          this.$httpMessageState(response, '刪除貼文');
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '刪除貼文');
        });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
