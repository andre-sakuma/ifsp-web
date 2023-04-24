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

export const useStore = defineStore('store', () => {
  const courses = ref<iCourseResponse[]>([
    {
      id: 1,
      class: '1A',
      period: '2020/2021',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      class: '1B',
      period: '2020/2021',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      class: '1C',
      period: '2020/2021',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      class: '1D',
      period: '2020/2021',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      class: '1E',
      period: '2020/2021',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  const events = ref<iEventResponse[]>([
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Event ${i + 1}`,
      description: `Event ${i + 1} description`,
      startDate: new Date(),
      endDate: new Date(),
      bannerUrl: 'https://picsum.photos/200/300',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ])
  const lectures = ref<iLectureResponse[]>([])
  const codes = ref<iCodeResponse[]>([])

  const coursesIncrement = ref(5)
  const eventsIncrement = ref(15)
  const lecturesIncrement = ref(0)
  const codesIncrement = ref(0)

  function timeUniqueRandomNumber() {
    return new Date().getTime() + Math.floor(Math.random() * 1000)
  }

  function generateUniqueHash() {
    const hash = Math.random().toString(36)
    // return hash filtering special characters
    return hash.replace(/[^a-z0-9]+/g, '')
  }

  function getCourseById(id: number): iCourseResponse | undefined {
    return courses.value.find((course) => course.id === id)
  }

  function redeemCode(hash: string, email: string) {
    const code = codes.value.find((code) => code.hash === hash)
    if (code) {
      code.used_by = email
    }
  }

  function getCodeByHash(hash: string) {
    return codes.value.find((code) => code.hash === hash)
  }

  function generateCodes(lectureId: number) {
    const lecture = lectures.value.find((lecture) => lecture.id === lectureId)
    if (lecture) {
      const codesQuantity = lecture.attendeesQuantity
      const codesArray = Array.from({ length: codesQuantity }, (_, i) => {
        const hash = generateUniqueHash()

        return {
          id: ++codesIncrement.value,
          lectureId: lectureId,
          used_by: undefined,
          hash: hash,
          url: `/code/${hash}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
      codes.value.push(...codesArray)
    }
  }

  function deleteCode(id: number) {
    const index = codes.value.findIndex((code) => code.id === id)
    if (index >= 0) {
      codes.value.splice(index, 1)
    }
  }

  function getCodesByLectureId(lectureId: number) {
    return codes.value.filter((code) => code.lectureId === lectureId)
  }

  function createCourse(data: iCourseCreate) {
    courses.value.push({
      ...data,
      id: ++coursesIncrement.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  function updateCourse(id: number, data: iCourseCreate) {
    const course = courses.value.find((course) => course.id === id)
    if (course) {
      course.class = data.class
      course.period = data.period
      course.updatedAt = new Date()
    }
  }

  function deleteCourse(id: number) {
    const index = courses.value.findIndex((course) => course.id === id)
    if (index >= 0) {
      courses.value.splice(index, 1)
    }
  }

  function getEventById(id: number): iEventResponse | undefined {
    return events.value.find((event) => event.id === id)
  }

  function createEvent(data: iEventCreate) {
    events.value.push({
      ...data,
      id: ++eventsIncrement.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  function updateEvent(id: number, data: iEventCreate) {
    const event = events.value.find((event) => event.id === id)
    if (event) {
      event.name = data.name
      event.description = data.description
      event.startDate = data.startDate
      event.endDate = data.endDate
      event.bannerUrl = data.bannerUrl
      event.updatedAt = new Date()
    }
  }

  function deleteEvent(id: number) {
    const index = events.value.findIndex((event) => event.id === id)
    if (index >= 0) {
      events.value.splice(index, 1)
    }
  }

  function getLectureById(id: number): iLectureResponse | undefined {
    return lectures.value.find((lecture) => lecture.id === id)
  }

  function createLecture(data: iLectureCreate) {
    const lecture = {
      ...data,
      id: ++lecturesIncrement.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    lectures.value.push(lecture)

    generateCodes(lecture.id)
  }

  function updateLecture(id: number, data: iLectureCreate) {
    const lecture = lectures.value.find((lecture) => lecture.id === id)
    if (lecture) {
      lecture.attendeesQuantity = data.attendeesQuantity
      lecture.subtitle = data.subtitle
      lecture.lecturer = data.lecturer
      lecture.location = data.location
      lecture.description = data.description
      lecture.startDate = data.startDate
      lecture.endDate = data.endDate
      lecture.updatedAt = new Date()
    }
  }

  function deleteLecture(id: number) {
    const index = lectures.value.findIndex((lecture) => lecture.id === id)
    if (index >= 0) {
      lectures.value.splice(index, 1)
    }
  }

  function getEventLectures(eventId: number) {
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
  }
})
