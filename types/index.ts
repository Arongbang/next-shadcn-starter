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

export type ApiResponse<T> = {
  data: T | null
  error: string | null
  success: boolean
}

export type PaginationParams = {
  page: number
  limit: number
}

export type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  hasNextPage: boolean
}

export type Theme = "light" | "dark" | "system"
