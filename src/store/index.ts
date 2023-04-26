import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  iCourseCreate,
  iCourseResponse,
  iEventCreate,
  iEventResponse,
  iLectureResponse,
} from '../services/api/interface'
import { iLectureCreate } from '../services/api/interface'
import { iCodeResponse } from '../services/api/interface'
import { useDatabaseList } from 'vuefire'
import firebase from '../plugins/firebase'

export const useStore = defineStore('store', () => {
  const database = firebase.useDatabase()

  const users = useDatabaseList<{
    email: string
    password: string
  }>(firebase.setGetter(database, 'users'))

  const signedIn = ref(false)

  function login() {
    // const isValid =
    //   users.value.find((user) => user.email === email)?.password === password

    signedIn.value = true
    localStorage.setItem('isSignedIn', 'true')
  }

  function logout() {
    signedIn.value = false
    localStorage.removeItem('isSignedIn')
  }

  const courses = useDatabaseList<iCourseResponse>(
    firebase.setGetter(database, 'courses')
  )

  const events = useDatabaseList<iEventResponse>(
    firebase.setGetter(database, 'events')
  )
  const lectures = useDatabaseList<iLectureResponse>(
    firebase.setGetter(database, 'lectures')
  )
  const codes = useDatabaseList<iCodeResponse>(
    firebase.setGetter(database, 'codes')
  )

  function timeUniqueRandomNumber() {
    return new Date().toISOString()
  }

  function generateUniqueHash() {
    const hash = Math.random().toString(36)
    // return hash filtering special characters
    return hash.replace(/[^a-z0-9]+/g, '')
  }

  function getCourseById(id: string): iCourseResponse | undefined {
    if (!courses.value) return undefined
    return courses.value.find((course) => course.id === id)
  }

  function redeemCode(hash: string, email: string) {
    const code = codes.value.find((code) => code.hash === hash)
    if (code) {
      if (code.used_by) throw new Error('Code already used')
      code.used_by = email

      firebase.update(database, 'codes', code.id, code)
    }
  }

  function getCodeByHash(hash: string) {
    return codes.value.find((code) => code.hash === hash)
  }

  function generateCodes(lectureId: string) {
    const lecture = lectures.value.find((lecture) => lecture.id === lectureId)
    if (lecture) {
      const codesQuantity = lecture.attendeesQuantity
      const codesArray = Array.from({ length: codesQuantity }, (_, i) => {
        const hash = generateUniqueHash()

        return {
          lectureId: lectureId,
          hash: hash,
          url: `/code/${hash}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      })

      for (const code of codesArray) {
        firebase.writeDB(database, 'codes', code)
      }
    }
  }

  function deleteCode(id: string) {
    const index = codes.value.findIndex((code) => code.id === id)
    if (index >= 0) {
      codes.value.splice(index, 1)
    }
  }

  function getCodesByLectureId(lectureId: string) {
    return codes.value.filter((code) => code.lectureId === lectureId)
  }

  function createCourse(data: iCourseCreate) {
    if (!courses.value) return undefined

    const aux = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    firebase.writeDB(database, 'courses', aux)
  }

  function updateCourse(id: string, data: iCourseCreate) {
    const course = courses.value.find((course) => course.id === id)
    if (course) {
      course.class = data.class
      course.period = data.period
      course.updatedAt = new Date().toISOString()

      firebase.update(database, 'courses', id, course)
    }
  }

  function deleteCourse(id: string) {
    if (!courses.value) return undefined
    const index = courses.value.findIndex((course) => course.id === id)
    if (index >= 0) {
      firebase.writeDB(database, 'courses', courses.value.splice(index, 1))
    }
  }

  function getEventById(id: string): iEventResponse | undefined {
    return events.value.find((event) => event.id === id)
  }

  function createEvent(data: iEventCreate) {
    const aux = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    firebase.writeDB(database, 'events', aux)
  }

  function updateEvent(id: string, data: iEventCreate) {
    const event = events.value.find((event) => event.id === id)
    if (event) {
      event.name = data.name
      event.description = data.description
      event.startDate = data.startDate
      event.endDate = data.endDate
      event.bannerUrl = data.bannerUrl
      event.updatedAt = new Date().toISOString()

      firebase.update(database, 'events', id, event)
    }
  }

  function deleteEvent(id: string) {
    const index = events.value.findIndex((event) => event.id === id)
    if (index >= 0) {
      events.value.splice(index, 1)
    }
  }

  function getLectureById(id: string): iLectureResponse | undefined {
    return lectures.value.find((lecture) => lecture.id === id)
  }

  function createLecture(data: iLectureCreate) {
    const lecture = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    firebase.writeDB(database, 'lectures', lecture)

    const lectureId = lectures.value[lectures.value.length - 1].id

    generateCodes(lectureId)
  }

  function updateLecture(id: string, data: iLectureCreate) {
    const lecture = lectures.value.find((lecture) => lecture.id === id)
    if (lecture) {
      lecture.attendeesQuantity = data.attendeesQuantity
      lecture.subtitle = data.subtitle
      lecture.lecturer = data.lecturer
      lecture.location = data.location
      lecture.description = data.description
      lecture.startDate = data.startDate
      lecture.endDate = data.endDate
      lecture.updatedAt = new Date().toISOString()

      firebase.update(database, 'lectures', id, lecture)
    }
  }

  function deleteLecture(id: string) {
    const index = lectures.value.findIndex((lecture) => lecture.id === id)
    if (index >= 0) {
      lectures.value.splice(index, 1)
    }
  }

  function getEventLectures(eventId: string) {
    return lectures.value.filter((lecture) => lecture.eventId === eventId)
  }

  return {
    courses,
    events,
    lectures,
    codes,
    getCodesByLectureId,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getLectureById,
    createLecture,
    updateLecture,
    deleteLecture,
    getEventLectures,
    deleteCode,
    redeemCode,
    getCodeByHash,
    login,
    signedIn,
    logout,
  }
})
