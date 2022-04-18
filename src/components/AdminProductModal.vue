<template>
  <div
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label h3">主要圖片</label>
                <input
                  v-model="tempProduct.imageUrl"
                  id="imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                />
                <label for="fileInput" class="form-label">
                  或 上傳圖片
                  <div
                    class="spinner-border text-secondary spinner-border-sm"
                    role="status"
                    v-if="status.fileUploading"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </label>
                <input
                  type="file"
                  class="form-control mb-2"
                  @change="upLoadImage"
                  ref="fileInput"
                  id="fileInput"
                />
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </div>
              <div class="mb-3">
                <label for="imageUrl" class="form-label h3">主要圖片(小尺寸)</label>
                <input
                  v-model="tempProduct.imageUrlSmall"
                  id="imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                />
                <label for="fileInputSmall" class="form-label">
                  或 上傳圖片
                  <div
                    class="spinner-border text-secondary spinner-border-sm"
                    role="status"
                    v-if="status.fileUploadingSmall"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </label>
                <input
                  type="file"
                  class="form-control mb-2"
                  @change="upLoadImageSmall"
                  ref="fileInputSmall"
                  id="fileInputSmall"
                />
                <img class="img-fluid" :src="tempProduct.imageUrlSmall" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  class="mb-3"
                  v-for="(image, index) in tempProduct.imagesUrl"
                  :key="`images-${index}`"
                >
                  <div class="mb-1">
                    <label :for="`imagesUrl${index}`" class="form-label">圖片網址</label>
                    <input
                      v-model="tempProduct.imagesUrl[index]"
                      :id="`imagesUrl${index}`"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="setImagesUrlToArray"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    v-model="tempProduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model="tempProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  style="min-height: 150px"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  style="min-height: 150px"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: {
        fileUploading: false,
      },
      tempProduct: {},
    };
  },
  mixins: [modalMixin],
  emits: ['get-products'],
  methods: {
    updateProduct() {
      // create 新增
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // update 修改
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          this.hideModal();
          this.$httpMessageState(res, res.data.message);
          this.$emit('get-products');
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    upLoadImage() {
      this.status.fileUploading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      const formData = new FormData();
      formData.append('file-to-upload', this.$refs.fileInput.files[0]);
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      this.$http
        .post(url, formData, { headers })
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$refs.fileInput.value = '';
          this.status.fileUploading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    upLoadImageSmall() {
      this.status.fileUploadingSmall = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      const formData = new FormData();
      formData.append('file-to-upload', this.$refs.fileInputSmall.files[0]);
      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      this.$http
        .post(url, formData, { headers })
        .then((res) => {
          this.tempProduct.imageUrlSmall = res.data.imageUrl;
          this.$refs.fileInputSmall.value = '';
          this.status.fileUploadingSmall = false;
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '錯誤訊息');
        });
    },
    setImagesUrlToArray() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },
  watch: {
    product() {
      // 預設初始值, 防止'Cannot read property' undefined 錯誤發生
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  mounted() {
    this.tempProduct = this.product;
  },
};
</script>
