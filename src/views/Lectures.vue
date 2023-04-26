<script setup lang="ts">
import Box from '../components/Box.vue'
import { onMounted, ref } from 'vue'
import { Search, EditPen, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../store'
import { iEventResponse, iLectureResponse } from '../services/api/interface'

const store = useStore()

const router = useRouter()
const route = useRoute()

const q = ref('')
const startDate = ref('')
const endDate = ref('')

const event = ref<iEventResponse>()

onMounted(() => {
  const id = route.params.id as string
  event.value = store.getEventById(id)
  if (!event.value) {
    router.push('/events')
  } else {
    lectures.value = store.getEventLectures(event.value.id)
  }
})

function updateLectures() {
  if (!event.value) return
  lectures.value = store.getEventLectures(event.value.id)
}

const lectures = ref<iLectureResponse[]>([])

function prettierDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function search() {
  if (!event.value) return
  const filteredlectures = store
    .getEventLectures(event.value.id)
    .filter((lecture) => {
      console.log(q.value)
      if (!q.value) return true
      const qLower = q.value.toLowerCase()
      const nameLower = lecture.subtitle.toLowerCase()
      const descriptionLower = lecture.description.toLowerCase()
      const lecturerLower = lecture.lecturer.toLowerCase()
      const id = lecture.id.toString()
      return (
        nameLower.includes(qLower) ||
        descriptionLower.includes(qLower) ||
        id.includes(qLower) ||
        lecturerLower.includes(qLower)
      )
    })
    .filter((lecture) => {
      if (startDate.value && endDate.value) {
        return (
          new Date(lecture.startDate) >= new Date(startDate.value) &&
          new Date(lecture.endDate) <= new Date(endDate.value)
        )
      } else if (startDate.value) {
        return new Date(lecture.startDate) >= new Date(startDate.value)
      } else if (endDate.value) {
        return new Date(lecture.endDate) <= new Date(endDate.value)
      }
      return true
    })
  lectures.value = filteredlectures
}

function handleCellClick(row: any, column: any, cell: any, _event: any) {
  if (!column.property) return
  if (!event.value) return
  router.push(`/events/${event.value.id}/lectures/${row.id}/codes`)
}

function editEvent(row: any) {
  if (!event.value) return
  router.push(`/events/${event.value.id}/lectures/edit/${row.id}`)
}

function deleteEvent(row: any) {
  store.deleteLecture(row.id)
  updateLectures()
}

function goToEdit() {
  if (!event.value) return
  router.push(`/events/${event.value.id}/lectures/edit`)
}
</script>

<template>
  <div class="container">
    <h1>Palestras do evento {{ event?.name }}</h1>
    <div class="filter">
      <el-input
        v-model="q"
        class="w-50 m-2"
        style="margin-right: 8px; max-width: 400px"
        placeholder="Search for id, name or description"
        :suffix-icon="Search"
      />
      <el-date-picker
        v-model="startDate"
        style="margin-right: 8px"
        type="date"
        placeholder="Start Date"
        format="DD/MM/YYYY"
      />
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="End Date"
        format="DD/MM/YYYY"
      />
      <el-button text @click="search()">Buscar</el-button>
      <div class="spacer"></div>
      <el-button type="primary" @click="goToEdit()">
        + Nova Palestra
      </el-button>
    </div>
    <Box class="list">
      <el-table
        @cell-click="handleCellClick"
        scrollbar-always-on
        :data="lectures"
        style="width: 100%"
        height="calc(100vh - 60px - 24px - 20px - 100px - 16px)"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="lecturer" label="Palestrante" width="180" />
        <el-table-column prop="subtitle" label="Subtítulo" width="180" />
        <el-table-column prop="description" label="Descrição" width="180" />
        <el-table-column prop="startDate" label="Data de Início" width="200px">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                prettierDate(scope.row.startDate)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="Data de Encerramento"
          width="200px"
        >
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                prettierDate(scope.row.endDate)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              :icon="EditPen"
              @click="editEvent(scope.row)"
            />
            <el-button
              link
              type="primary"
              :icon="Delete"
              @click="deleteEvent(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
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
