export interface iEventResponse {
  readonly id: string
  name: string
  description: string
  startDate: string
  endDate: string
  bannerUrl: string
  createdAt: string
  updatedAt: string
}

export interface iEventCreate {
  name: string
  description: string
  startDate: string
  endDate: string
  bannerUrl: string
}

export interface iCourseResponse {
  readonly id: string
  class: string
  period: string
  createdAt: string
  updatedAt: string
}

export interface iCourseCreate {
  class: string
  period: string
}

export interface iLectureResponse {
  readonly id: string
  eventId: string
  lecturer: string
  location: string
  attendeesQuantity: number
  subtitle: string
  description: string
  startDate: string
  endDate: string
  lecturerImage: string
  createdAt: string
  updatedAt: string
}

export interface iLectureCreate {
  eventId: string
  lecturer: string
  location: string
  attendeesQuantity: number
  subtitle: string
  description: string
  startDate: string
  endDate: string
  lecturerImage: string
}

export interface iCodeResponse {
  readonly id: string
  hash: string
  url: string
  used_by?: string
  lectureId: string
  createdAt: string
  updatedAt: string
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
  course_id: string
}
