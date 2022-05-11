import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import '@/assets/styles/dx-styles.scss'
import '@/assets/styles/global.scss'

import ruMessages from 'devextreme/localization/messages/ru.json'
import { locale, loadMessages } from 'devextreme/localization'
loadMessages(ruMessages)
locale(navigator.language)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

console.log(import.meta.env.MODE)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
