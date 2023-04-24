<script setup lang="ts">
import Box from '../components/Box.vue'
import { Search, EditPen, Delete } from '@element-plus/icons-vue'
import { onActivated, onMounted, ref } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import { iCourseCreate, iCourseResponse } from '../services/api/interface'

const router = useRouter()
const route = useRoute()

const store = useStore()

const course = ref<iCourseResponse | undefined>(undefined)
const courseDraft = ref<iCourseCreate | undefined>(undefined)

function cloneValues<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

onMounted(() => {
  const id = route.params.id

  course.value = store.getCourseById(+id)

  if (course.value) {
    courseDraft.value = cloneValues(course.value)
  }

  if (!course.value) {
    courseDraft.value = {
      class: '',
      period: '',
    }
  }
})

function cancel() {
  router.push('/courses')
}

function save() {
  if (course.value && courseDraft.value) {
    store.updateCourse(course.value.id, courseDraft.value)
  } else if (courseDraft.value) {
    store.createCourse(courseDraft.value)
  }
  router.push('/courses')
}
</script>

<template>
  <div class="container">
    <h1 v-if="course">Editando curso {{ course.class }}</h1>
    <h1 v-else>Criando novo curso</h1>
    <Box style="padding: 30px 40px; flex-direction: column" v-if="courseDraft">
      <div class="inputs">
        <span>Curso</span>
        <el-input v-model="courseDraft.class" />

        <span style="margin-top: 8px">Período</span>
        <el-input v-model="courseDraft.period" />
      </div>
      <div class="options">
        <el-button @click="cancel()">Cancelar</el-button>
        <el-button type="primary" @click="save()">Salvar</el-button>
      </div>
    </Box>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow-y: hidden;
  flex-direction: column;
  background-color: var(--white-2);
  padding: 50px;
}

.options {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.inputs {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.spacer {
  flex: 1;
}

.list {
  padding: 8px;
}

.filter {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dashboard {
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}

.d-element {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.d-element span {
  font-size: 48px;
  font-weight: 700;
}

.d-element h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.container h1 {
  font-size: 18px;
  color: var(--gray-2);
}

.divider {
  width: 1px;
  height: 100%;
  background-color: var(--gray-2);
}
</style>
