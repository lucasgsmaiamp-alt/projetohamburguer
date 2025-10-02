import { createApp } from '../my-vue-app/node_modules/vue/dist/vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
