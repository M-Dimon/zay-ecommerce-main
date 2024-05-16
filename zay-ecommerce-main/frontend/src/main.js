import './assets/scss/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const config = {
  api: `http://${window.location.hostname}:3000`,
};

createApp(App)
  .provide('api', config.api)
  .use(router)
  .mount('#app');
