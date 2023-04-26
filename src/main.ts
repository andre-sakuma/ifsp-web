import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
import * as api from './plugins/api'
import { VueFire, VueFireAuth } from 'vuefire'
import firebase from './plugins/firebase'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(firebase)

new Promise((res) => setTimeout(res, 1000)).then(() => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  const firebaseApp = app.config.globalProperties.$firebaseApp

  app.use(VueFire, {
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

  app.use(ElementPlus)
  app.use(api)

  app.use(router)
  app.use(createPinia())
  app.mount('#app')
})
