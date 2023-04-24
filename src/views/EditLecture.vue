<script setup lang="ts">
import Box from '../components/Box.vue'
import { onActivated, onMounted, ref } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import {
  iEventCreate,
  iEventResponse,
  iLectureCreate,
  iLectureResponse,
} from '../services/api/interface'

const router = useRouter()
const route = useRoute()

const store = useStore()

const event = ref<iEventResponse | undefined>(undefined)

const lecture = ref<iLectureResponse | undefined>(undefined)
const lectureDraft = ref<iLectureCreate | undefined>(undefined)

function cloneValues<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

onMounted(() => {
  const eventId = route.params.eventId
  const lectureId = route.params.lectureId

  event.value = store.getEventById(+eventId)
  lecture.value = store.getLectureById(+lectureId)

  if (lecture.value) {
    lectureDraft.value = cloneValues(lecture.value)
  }

  if (!lecture.value) {
    lectureDraft.value = {
      attendeesQuantity: 0,
      eventId: +eventId,
      lecturer: '',
      lecturerImage: '',
      location: '',
      subtitle: '',
      description: '',
      endDate: new Date(),
      startDate: new Date(),
    }
  }
})

function cancel() {
  if (!event.value) return
  router.push(`/events/${event.value.id}/lectures`)
}

function save() {
  if (lecture.value && lectureDraft.value) {
    store.updateLecture(lecture.value.id, {
      ...lectureDraft.value,
      startDate: new Date(lectureDraft.value.startDate),
      endDate: new Date(lectureDraft.value.endDate),
    })
  } else if (lectureDraft.value) {
    store.createLecture({
      ...lectureDraft.value,
      startDate: new Date(lectureDraft.value.startDate),
      endDate: new Date(lectureDraft.value.endDate),
    })
  }
  if (!event.value) return
  router.push(`/events/${event.value.id}/lectures`)
}
</script>

<template>
  <div class="container">
    <h1 v-if="event">Editando evento {{ event.name }}</h1>
    <h1 v-else>Criando novo evento</h1>
    <Box style="padding: 30px 40px; flex-direction: column" v-if="lectureDraft">
      <div class="inputs">
        <div style="display: flex; justify-content: space-between; gap: 16px">
          <section style="display: flex; flex-direction: column; flex-grow: 1">
            <span>Palestrante</span>
            <el-input v-model="lectureDraft.lecturer" />
          </section>

          <section style="display: flex; flex-direction: column">
            <span>Início</span>
            <el-date-picker
              v-model="lectureDraft.startDate"
              type="datetime"
              placeholder="Start Date"
              format="DD/MM/YYYY HH:mm"
            />
          </section>

          <section style="display: flex; flex-direction: column">
            <span>Fim</span>
            <el-date-picker
              v-model="lectureDraft.endDate"
              type="datetime"
              placeholder="End Date"
              format="DD/MM/YYYY HH:mm"
            />
          </section>
        </div>
        <span style="margin-top: 8px">Quantidade de Participantes</span>
        <el-input-number v-model="lectureDraft.attendeesQuantity" />

        <span style="margin-top: 8px">Subtítulo</span>
        <el-input v-model="lectureDraft.subtitle" />

        <span style="margin-top: 8px">Descrição</span>
        <el-input
          type="textarea"
          :autosize="{
            minRows: 2,
            maxRows: 4,
          }"
          v-model="lectureDraft.description"
        />
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
