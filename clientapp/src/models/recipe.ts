import { Ingredient } from "./ingredient"
import { Step } from './step'
export interface Recipe {
  _id: string
  title: string
  author: string
  isFavorite?: boolean
  ingredients: Ingredient[]
  steps: Step[]
  sourceUrl: string
  imageUrl?: string
  prepTimeMinutes?: number
  cookTimeMinutes?: number
  servings?: number
  category?: string
  createdAt?: string
  user?: string
}

export interface RecipeCardResponse {
  _id: string
  title: string
  by: string
  url: string
  image?: string
}