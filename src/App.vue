<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useStore } from './store'
const route = useRoute()
const router = useRouter()

const store = useStore()

onBeforeMount(() => {
  const isSignedIn = localStorage.getItem('isSignedIn')
  store.signedIn = isSignedIn === 'true'
})

const loaded = ref<boolean>(false)

onMounted(async () => {
  await new Promise((res) => setTimeout(res, 200))
  loaded.value = true
  if (
    !store.signedIn &&
    route.name !== 'Login' &&
    route.name !== 'Register Code'
  ) {
    router.push('/login')
    return
  }
})

function logout() {
  store.logout()
  router.push('/login')
}

const isLogin = computed(() => {
  if (route.name === undefined) return undefined
  return route.name === 'Login' || route.name === 'Register Code'
})
</script>

<template>
  <div class="app" v-if="loaded">
    <div class="navbar" v-if="!isLogin">
      <img class="logo mb-30" src="./assets/logo.png" />
      <div class="links">
        <div @click="router.push('/events')" class="link mb-30">
          <div class="icon"></div>
          <span
            :class="{
              selected: route.name === 'Events',
            }"
            >Eventos</span
          >
        </div>
        <div @click="router.push('/courses')" class="link">
          <div class="icon"></div>
          <span
            :class="{
              selected: route.name === 'Courses',
            }"
          >
            Cursos
          </span>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="logout-section" @click="logout()">
        <span>Logout</span>
      </div>
    </div>
    <router-view class="viewer"></router-view>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.logout-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  cursor: pointer;
  padding-bottom: 30px;
}

.logout-section span {
  font-size: 15px;
  text-decoration-line: underline;
}

.navbar {
  display: flex;
  flex-direction: column;
  min-width: 275px;
  background-color: var(--green);
}

.link {
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link span {
  font-size: 30px;
}

.mb-30 {
  margin-bottom: 30px !important;
}

.link span.selected {
  font-weight: 700;
}

.spacer {
  flex-grow: 1;
}
.viewer {
  flex-grow: 1;
}

.logo {
  width: 230px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
