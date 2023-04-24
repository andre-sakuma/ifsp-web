<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const isLogin = computed(
  () => route.name === 'Login' || route.name === 'Register Code'
)
</script>

<template>
  <div class="app">
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
      <div class="logout-section">
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
