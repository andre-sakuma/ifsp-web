<script setup lang="ts">
import { ref } from 'vue'
import { useAPI } from '../plugins/api'
const api = useAPI()

const username = ref('')
const password = ref('')

async function login() {
  const res = await api.auth(username.value, password.value)
}
</script>

<template>
  <div class="background">
    <div class="login-dialog">
      <div class="banner">
        <img class="logo" src="../assets/logo.png" alt="logo" />
      </div>
      <div class="content">
        <h1 class="greetings">Welcome!</h1>
        <input
          class="default-input"
          type="email"
          placeholder="Email"
          v-model="username"
        />
        <input
          class="default-input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <input
          class="login-button"
          type="submit"
          value="LOGIN"
          @click="login()"
        />
        <!-- <a class="forgot-password-link" href="">Forgot password?</a> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}
</style>
