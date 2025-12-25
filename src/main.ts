import { createYmaps } from 'vue-yandex-maps'
import App from './app.vue'
import router from './router'
import './assets/scss/main.scss'
import '../resources/js/echo'

const app = createApp(App)

app.use(createYmaps({
  apikey: '9954c22f-12b3-48aa-be29-5a9d90b5e48e',
  lang: 'ru_RU',
}))

app.use(createPinia())
app.use(router)

app.mount('#app')
