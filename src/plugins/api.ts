import { App, inject } from 'vue'
import { API } from '../services/api'

export function install(app: App) {
  app.config.globalProperties.$API = new API()

  app.provide('API', app.config.globalProperties.$API)
}

export function useAPI() {
  const api = inject<API>('API')
  if (!api) {
    throw new Error('No API provided')
  }
  return api
}
