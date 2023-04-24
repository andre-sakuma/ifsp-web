<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import {
  iCodeResponse,
  iEventResponse,
  iLectureResponse,
} from '../services/api/interface'

const router = useRouter()
const route = useRoute()

const store = useStore()

const code = ref<iCodeResponse>()
const lecture = ref<iLectureResponse>()
const event = ref<iEventResponse>()

onMounted(() => {
  const id = route.params.id as string

  if (!id) {
    router.push('/login')
    return
  }

  code.value = store.getCodeByHash(id)

  if (!code.value) {
    router.push('/login')
    return
  }

  lecture.value = store.getLectureById(code.value.lectureId)

  if (!lecture.value) {
    router.push('/login')
    return
  }

  event.value = store.getEventById(lecture.value.eventId)

  if (!event.value) {
    router.push('/login')
    return
  }
})

const name = ref('')
const email = ref('')
const reason = ref('')

function submit() {
  if (!code.value) return

  store.redeemCode(code.value.hash, email.value)

  router.push(`/events/${event.value?.id}/lectures/${lecture.value?.id}/codes`)
}
</script>

<template>
  <div class="background">
    <div class="login-dialog">
      <div class="banner">
        <img class="logo" src="../assets/logo.png" alt="logo" />
      </div>
      <div class="content">
        <h1>
          Confirmação de presença
          <br />{{ lecture?.lecturer }} <br />{{ event?.name }}
        </h1>

        <span>Nome</span>
        <el-input v-model="name" />
        <span style="margin-top: 16px">Email</span>
        <el-input v-model="email" />
        <span style="margin-top: 16px">Motivo da participação</span>
        <el-input type="textarea" v-model="reason" />

        <el-button type="primary" style="margin-top: 16px" @click="submit()">
          Enviar
        </el-button>

        <!-- <a class="forgot-password-link" href="">Forgot password?</a> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 16px;
}
.banner {
  height: 96px;
  background-color: var(--green);
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 56px;
}

.forgot-password-link {
  text-align: center;
  font-size: 10px;
  color: var(--blue);
  margin-top: 0.5em;
  text-decoration-line: underline;
}

.default-input {
  color: var(--gray-2);
  border: 1px solid var(--gray-2);
  background-color: var(--white);
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em 0;
}

.greetings {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-2);
  text-align: center;
  margin-top: 0;
}

.background {
  background-color: var(--white-2);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-dialog {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.login-button {
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--red);
  color: var(--white);
  font-weight: bold;
  margin-top: 0.5em;
  height: 40px;
  border-radius: 5px;
}

.login-button:hover {
  cursor: pointer;
}

.login-button:active {
  opacity: 0.5;
}

.content {
  padding: 2em 56px;
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  color: var(--gray-2);
}
</style>
