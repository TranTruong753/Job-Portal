import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import plugin from 'pinia-plugin-persistedstate';

import 'bootstrap/dist/css/bootstrap.min.css';



import './assets/css/footer.css';
import './assets/css/style.css';
import './assets/css/mycss.css';


import { createPinia } from 'pinia';


const pinia = createPinia()
pinia.use(plugin);
const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(Antd).mount('#app');
