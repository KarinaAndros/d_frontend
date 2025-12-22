import { createYmaps } from 'vue-yandex-maps'
import App from './app.vue'
import router from './router'
import './assets/scss/main.scss'
import '../resources/js/echo'

const app = createApp(App)

app.use(createYmaps({
  apikey: '9811b22a-e004-49b4-ac9a-4103a26f10ee',
  lang: 'ru_RU',
}))

app.use(createPinia())
app.use(router)

app.mount('#app')
