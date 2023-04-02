import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'

import '@/scss/style.scss'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(PerfectScrollbar)
app.use(createPinia())

app.mount('#app')
