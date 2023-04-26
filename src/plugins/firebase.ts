import { App, inject } from 'vue'

import { initializeApp, FirebaseApp, getApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import {
  getDatabase,
  Database,
  ref,
  onValue,
  update,
  push,
} from 'firebase/database'

export default {
  install(app: App) {
    fetch('/__/firebase/init.json').then(async (response) => {
      initializeApp(await response.json())
      const firebaseApp = getApp()
      console.log(firebaseApp)
      app.config.globalProperties.$firebaseApp = firebaseApp

      app.config.globalProperties.$storage = getStorage(firebaseApp)
      app.config.globalProperties.$firestore = getFirestore(firebaseApp)
      app.config.globalProperties.$database = getDatabase(firebaseApp)

      console.log(app.config.globalProperties.$database)

      app.provide('firebaseApp', app.config.globalProperties.$firebaseApp)
      app.provide('storage', app.config.globalProperties.$storage)
      app.provide('firestore', app.config.globalProperties.$firestore)
      app.provide('database', app.config.globalProperties.$database)
    })
  },
  useFirebaseApp() {
    const firebaseApp = inject<FirebaseApp>('firebaseApp')
    if (!firebaseApp) {
      throw new Error('FirebaseApp not provided')
    }
    return firebaseApp
  },
  useStorage() {
    const storage = inject<FirebaseStorage>('storage')
    if (!storage) {
      throw new Error('Storage not provided')
    }
    return storage
  },
  useFirestore() {
    const firestore = inject<Firestore>('firestore')
    if (!firestore) {
      throw new Error('Firestore not provided')
    }
    return firestore
  },
  useDatabase() {
    const database = inject<Database>('database')
    if (!database) {
      throw new Error('Database not provided')
    }
    return database
  },
  writeDB(db: Database, key: string, value: any) {
    const field = ref(db, `${key}/123`)
    push(field, value)
  },

  update(db: Database, key: string, id: string, value: any) {
    const field = ref(db, `${key}/123/${id}`)
    update(field, value)
  },

  setGetter(db: Database, key: string) {
    return ref(db, `${key}/123`)
  },
}
