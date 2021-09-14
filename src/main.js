import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseBlock from './components/BaseBlock.vue'



const app = createApp(App)
app.component('base-block', BaseBlock)
app.use(router).mount('#app')
