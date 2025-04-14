import { Ingredient } from "./ingredient"
export interface Recipe {
  id?: string
  title: string
  ingredients: Ingredient[]
  instructions: string[]
  imageUrl?: string
  prepTimeMinutes?: number
  cookTimeMinutes?: number
  servings?: number
  category?: string
  createdAt?: string
  user?: string
}

export interface RecipeSearchResponse {
  title: string
  by: string
  url: string
  image: string
}