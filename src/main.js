import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseBlock from './components/BaseBlock.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)
app.component('base-block', BaseBlock)
app.use(router).mount('#app')
app.use(VueSweetalert2);
