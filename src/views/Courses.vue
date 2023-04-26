<script setup lang="ts">
import Box from '../components/Box.vue'
import { Search, EditPen, Delete } from '@element-plus/icons-vue'
import { onActivated, onMounted, ref } from 'vue'
import { useStore } from '../store'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const store = useStore()

const q = ref('')

const courses = ref<any[]>()

function search() {
  if (!store.courses) return
  const filteredcourses = store.courses.filter((course) => {
    const qLower = q.value.toLowerCase()
    const classLower = course.class.toLowerCase()
    const periodLower = course.period.toLowerCase()
    return classLower.includes(qLower) || periodLower.includes(qLower)
  })
  courses.value = filteredcourses
}

function handleCellClick(row: any, column: any, cell: any, event: any) {
  if (!column.property) return
  console.log(row, column, cell, event)
}

function editCourse(row: any) {
  console.log(row)
  router.push(`/courses/edit/${row.id}`)
}

function deleteCourse(row: any) {
  store.deleteCourse(row.id)
}
</script>

<template>
  <div class="container">
    <h1>Cursos</h1>
    <div class="filter">
      <el-input
        v-model="q"
        class="w-50 m-2"
        style="margin-right: 8px; max-width: 400px"
        placeholder="Search for id, name or description"
        :suffix-icon="Search"
      />
      <el-button text @click="search()">Buscar</el-button>
      <div class="spacer"></div>
      <el-button type="primary" @click="router.push(`/courses/edit`)">
        + Novo Curso
      </el-button>
    </div>
    <Box class="list">
      <el-table
        @cell-click="handleCellClick"
        :default-sort="{ prop: 'id', order: 'descending' }"
        scrollbar-always-on
        :data="courses || store.courses"
        style="width: 100%"
        height="calc(100vh - 60px - 24px - 20px - 100px - 16px)"
      >
        <el-table-column prop="id" sortable label="ID" />
        <el-table-column prop="class" sortable label="Curso" />
        <el-table-column prop="period" sortable label="Período" />
        <el-table-column fixed="right" label="" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              :icon="EditPen"
              @click="editCourse(scope.row)"
            />
            <el-button
              link
              type="primary"
              :icon="Delete"
              @click="deleteCourse(scope.row)"
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
