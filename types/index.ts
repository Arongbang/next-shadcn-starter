export type NavItem = {
  label: string
  href: string
  disabled?: boolean
  external?: boolean
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github?: string
    twitter?: string
  }
}

/**
 * API 응답 래퍼 타입 — 새 API 라우트 작성 시 사용
 * @example const response: ApiResponse<User> = { data: user, error: null, success: true }
 */
export type ApiResponse<T> = {
  data: T | null
  error: string | null
  success: boolean
}

/** 페이지네이션 요청 파라미터 */
export type PaginationParams = {
  page: number
  limit: number
}

/** 페이지네이션 응답 타입 */
export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  hasNextPage: boolean
}

export type Theme = "light" | "dark" | "system"
