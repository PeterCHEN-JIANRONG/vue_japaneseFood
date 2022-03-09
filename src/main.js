import { createApp } from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';

// vee-validate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules'; // 規則
import { localize, setLocale } from '@vee-validate/i18n'; // 語系
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// vue3-loading-overlay
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';
import { date, currency } from './libs/filters';

// 載入規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};
app.use(VueAxios, axios);
app.use(router);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('Loading', Loading);
app.mount('#app');
