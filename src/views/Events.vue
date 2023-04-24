<script setup lang="ts">
import Box from '../components/Box.vue'
import { onActivated, onMounted, ref } from 'vue'
import { Search, EditPen, Delete } from '@element-plus/icons-vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const q = ref('')
const startDate = ref('')
const endDate = ref('')

onMounted(() => {
  events.value = store.events
})

const events = ref<any[]>([])

function prettierDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function search() {
  const filteredEvents = store.events
    .filter((event) => {
      const qLower = q.value.toLowerCase()
      const nameLower = event.name.toLowerCase()
      const descriptionLower = event.description.toLowerCase()
      const id = event.id.toString()
      return (
        nameLower.includes(qLower) ||
        descriptionLower.includes(qLower) ||
        id.includes(qLower)
      )
    })
    .filter((event) => {
      if (startDate.value && endDate.value) {
        return (
          event.startDate >= new Date(startDate.value) &&
          event.endDate <= new Date(endDate.value)
        )
      } else if (startDate.value) {
        return event.startDate >= new Date(startDate.value)
      } else if (endDate.value) {
        return event.endDate <= new Date(endDate.value)
      }
      return true
    })
  events.value = filteredEvents
}

function handleCellClick(row: any, column: any, cell: any, event: any) {
  if (!column.property) return
  router.push(`/events/${row.id}/lectures`)
}

function editEvent(row: any) {
  router.push(`/events/edit/${row.id}`)
}

function deleteEvent(row: any) {
  store.deleteEvent(row.id)
}
</script>

<template>
  <div class="container">
    <h1>Events</h1>
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
      <el-button type="primary" @click="router.push(`/events/edit`)">
        + Novo Evento
      </el-button>
    </div>
    <Box class="list">
      <el-table
        @cell-click="handleCellClick"
        :default-sort="{ prop: 'startDate', order: 'descending' }"
        scrollbar-always-on
        :data="events"
        style="width: 100%"
        height="calc(100vh - 60px - 24px - 20px - 100px - 16px)"
      >
        <el-table-column prop="id" sortable label="ID" width="180" />
        <el-table-column prop="name" sortable label="Evento" width="180" />
        <el-table-column prop="startDate" sortable label="Data de Início">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                prettierDate(scope.row.startDate)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" sortable label="Data de Encerramento">
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
