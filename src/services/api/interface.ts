export interface iEventResponse {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  bannerUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface iEventCreate {
  name: string
  description: string
  startDate: Date
  endDate: Date
  bannerUrl: string
}

export interface iCourseResponse {
  id: number
  class: string
  period: string
  createdAt: Date
  updatedAt: Date
}

export interface iCourseCreate {
  class: string
  period: string
}

export interface iLectureResponse {
  id: number
  eventId: number
  lecturer: string
  location: string
  attendeesQuantity: number
  subtitle: string
  description: string
  startDate: Date
  endDate: Date
  lecturerImage: string
  createdAt: Date
  updatedAt: Date
}

export interface iLectureCreate {
  eventId: number
  lecturer: string
  location: string
  attendeesQuantity: number
  subtitle: string
  description: string
  startDate: Date
  endDate: Date
  lecturerImage: string
}

export interface iCodeResponse {
  id: number
  hash: string
  url: string
  used_by?: string
  lectureId: number
  createdAt: Date
  updatedAt: Date
}

export interface iAtendee {
  kind: string
  ra: string
  name: string
  email: string
  reason: string
  accepted_terms: boolean
  user_agent: string
  ip: string
  course_id: number
}
