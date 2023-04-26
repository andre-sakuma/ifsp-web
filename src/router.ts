import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Login from './views/Login.vue'

import Courses from './views/Courses.vue'
import EditCourse from './views/EditCourse.vue'
import Events from './views/Events.vue'
import EditEvent from './views/EditEvent.vue'
import Lectures from './views/Lectures.vue'
import EditLecture from './views/EditLecture.vue'
import Codes from './views/Codes.vue'
import RegisterCode from './views/RegisterCode.vue'

const routes = [
  { path: '/', redirect: '/events' },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Register Code', path: '/code/:id?', component: RegisterCode },
  {
    name: 'Codes',
    path: '/events/:eventId/lectures/:lectureId/codes',
    component: Codes,
  },
  {
    name: 'Lectures Edit',
    path: '/events/:eventId/lectures/edit/:lectureId?',
    component: EditLecture,
  },
  { name: 'Lectures', path: '/events/:id/lectures', component: Lectures },
  { name: 'Events Edit', path: '/events/edit/:id?', component: EditEvent },
  { name: 'Events', path: '/events', component: Events },
  { name: 'Courses Edit', path: '/courses/edit/:id?', component: EditCourse },
  { name: 'Courses', path: '/courses', component: Courses },
  { path: '/:pathMatch(.*)*', redirect: '/events' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
