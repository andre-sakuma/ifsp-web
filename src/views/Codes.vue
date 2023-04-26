<script setup lang="ts">
import Box from '../components/Box.vue'
import { onMounted, ref } from 'vue'
import { Search, EditPen, Delete } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../store'
import {
  iCodeResponse,
  iEventResponse,
  iLectureResponse,
} from '../services/api/interface'

const store = useStore()

const router = useRouter()
const route = useRoute()

const event = ref<iEventResponse>()
const lectures = ref<iLectureResponse>()
const codes = ref<iCodeResponse[]>([])

onMounted(() => {
  const eventId = route.params.eventId as string
  const lectureId = route.params.lectureId as string
  event.value = store.getEventById(eventId)
  lectures.value = store.getLectureById(lectureId)

  if (!event.value || !lectures.value) {
    router.push('/events')
  } else {
    codes.value = store.getCodesByLectureId(lectures.value.id)
  }
})

function updateCodes() {
  if (!event.value) return
  if (!lectures.value) return
  codes.value = store.getCodesByLectureId(lectures.value.id)
}

function handleCellClick(row: any, column: any, cell: any, event: any) {
  if (!column.property) return
  router.push(row.url)
}

function deleteEvent(row: any) {
  store.deleteCode(row.id)
  updateCodes()
}
</script>

<template>
  <div class="container">
    <h1>Códigos da palestra do {{ lectures?.lecturer }}</h1>
    <Box class="list">
      <el-table
        @cell-click="handleCellClick"
        scrollbar-always-on
        :data="codes"
        style="width: 100%"
        height="calc(100vh - 60px - 24px - 20px - 100px - 16px)"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="hash" label="Hash" />
        <el-table-column label="Quem usou">
          <template #default="scope">
            {{ scope.row.used_by ?? 'Ninguém' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="" width="120">
          <template #default="scope">
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
