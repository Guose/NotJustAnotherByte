export interface Chef {
  _id?: string
  name: string
  slug: string
  imageUrl?: string
}

export interface PaginatedChefResponse {
  currentPage: number
  totalPages: number
  totalChefs: number
  chefs: Chef[]
}