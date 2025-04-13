export interface Recipe {
  id?: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  imageUrl?: string
  prepTimeMinutes?: number
  cookTimeMinutes?: number
  servings?: number
  category?: string
  createdAt?: string
  user?: string
}

export interface RecipeSearch {
  title: string
  by: string
  url: string
  image: string
}