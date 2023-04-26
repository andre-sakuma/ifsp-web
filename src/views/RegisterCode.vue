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

const isCodeValid = ref<boolean>()

onMounted(async () => {
  const id = route.params.id as string

  await new Promise((resolve) => setTimeout(resolve, 1000))

  code.value = store.getCodeByHash(id)

  if (!code.value) {
    isCodeValid.value = false
    return
  }

  lecture.value = store.getLectureById(code.value.lectureId)

  if (!lecture.value) {
    isCodeValid.value = false
    return
  }

  event.value = store.getEventById(lecture.value.eventId)

  if (!event.value) {
    isCodeValid.value = false
    return
  }

  isCodeValid.value = true
})

const name = ref('')
const email = ref('')
const reason = ref('')

const sucess = ref<boolean>()

function submit() {
  if (!code.value) return

  try {
    store.redeemCode(code.value.hash, email.value)

    sucess.value = true
  } catch (e) {
    console.error(e)
    sucess.value = false
  }
}
</script>

<template>
  <div class="background">
    <div class="login-dialog">
      <div class="banner">
        <img class="logo" src="../assets/logo.png" alt="logo" />
      </div>
      <div class="content">
        <template v-if="isCodeValid === undefined">
          <div
            style="height: 24px; width: 200px; margin-bottom: 16px"
            class="skeleton"
          ></div>
          <div
            style="height: 16px; width: 300px; margin-bottom: 8px"
            class="skeleton"
          ></div>
          <div style="height: 16px; width: 300px" class="skeleton"></div>
        </template>
        <template v-else-if="isCodeValid === false">
          <h1 style="color: var(--red)">Código não encontrado!</h1>
          <span style="color: var(--red); margin-top: 16px">
            Tente novamente com outro código ou entre em contato com a
            organização do evento
          </span>
        </template>
        <template v-else-if="sucess === undefined">
          <h1>
            Confirmação de presença
            <br />
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
        </template>
        <template v-else-if="sucess === false">
          <h1 style="color: var(--red)">Esse código já foi utilizado!</h1>
          <span style="color: var(--red); margin-top: 16px">
            Tente novamente com outro código ou entre em contato com a
            organização do evento
          </span>
        </template>
        <template v-else>
          <h1>Obrigado pela participação!</h1>
          <span style="margin-top: 16px">
            Sua presença já foi confirmada.
          </span>
        </template>

        <!-- <a class="forgot-password-link" href="">Forgot password?</a> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 16px;
}

.skeleton {
  background: linear-gradient(90deg, #c8d0d8 0%, rgba(200, 208, 216, 0) 100%);
  animation: blink 1.2s ease-in-out infinite;
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
