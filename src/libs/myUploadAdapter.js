// ckeditor 圖片上傳 串 六角的圖片上傳功能
// https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html

import axios from 'axios';

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    const formData = new FormData();
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    // 六角的圖床
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;

    return new Promise((resolve) => this.loader.file
      .then((loadFile) => {
        // loadFile:上傳至 ckeditor 的圖片
        formData.append('file-to-upload', loadFile);
        // 上傳至六角圖床
        return axios.post(url, formData, { headers });
      })
      .then((res) => {
        // 取得圖床的圖片連結
        const { imageUrl } = res.data;
        resolve({
          default: imageUrl,
        });
      }));
  }
}

export default MyUploadAdapter;
