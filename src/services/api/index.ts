import axios, { AxiosInstance } from 'axios'
import {
  iCourseCreate,
  iCourseResponse,
  iEventCreate,
  iEventResponse,
  iLectureCreate,
  iLectureResponse,
} from './interface'

export class API {
  private token?: string
  private baseUrl: string
  private api: AxiosInstance

  constructor() {
    this.token = undefined
    this.baseUrl = 'https://ifsp.luizalbano.com.br/api'
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {},
    })
  }

  async auth(username: string, password: string) {
    const respose = await this.api.post('/auth', {
      username,
      password,
    })

    this.token = respose.data.token
    this.api.defaults.headers.Authorization = `Bearer ${this.token}`
  }

  async getCourses(): Promise<iCourseResponse[]> {
    const response = await this.api.get('/courses')
    return response.data
  }

  async getCourse(id: number): Promise<iCourseResponse> {
    const response = await this.api.get(`/courses/${id}`)
    return response.data
  }

  async createCourse(course: iCourseCreate) {
    const response = await this.api.post('/courses', course)
    return response.data
  }

  async updateCourse(id: number, course: iCourseCreate) {
    const response = await this.api.put(`/courses/${id}`, course)
    return response.data
  }

  async deleteCourse(id: number) {
    const response = await this.api.delete(`/courses/${id}`)
    return response.data
  }

  async getEvents(): Promise<iEventResponse[]> {
    const response = await this.api.get('/events')
    return response.data
  }

  async getEvent(id: number): Promise<iEventResponse> {
    const response = await this.api.get(`/events/${id}`)
    return response.data
  }

  async createEvent(event: iEventCreate) {
    const response = await this.api.post('/events', event)
    return response.data
  }

  async updateEvent(id: number, event: iEventCreate) {
    const response = await this.api.put(`/events/${id}`, event)
    return response.data
  }

  async deleteEvent(id: number) {
    const response = await this.api.delete(`/events/${id}`)
    return response.data
  }

  async getLectures(): Promise<iLectureResponse[]> {
    const response = await this.api.get('/lectures')
    return response.data
  }

  async getLecture(id: number): Promise<iLectureResponse> {
    const response = await this.api.get(`/lectures/${id}`)
    return response.data
  }

  async createLecture(lecture: iLectureCreate) {
    const response = await this.api.post('/lectures', lecture)
    return response.data
  }

  async updateLecture(id: number, lecture: iLectureCreate) {
    const response = await this.api.put(`/lectures/${id}`, lecture)
    return response.data
  }

  async deleteLecture(id: number) {
    const response = await this.api.delete(`/lectures/${id}`)
    return response.data
  }
}
