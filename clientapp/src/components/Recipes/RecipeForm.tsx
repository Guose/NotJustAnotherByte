import React, { useState } from "react"
import AddIngredientHandler from "@/services/AddIngredientHandler"
import AddStepHandler from "@/services/AddStepHandler"
import { Step } from '@/models/step'
import { Ingredient } from "@/models/ingredient"

type RecipeFormProps = {
  onSubmit: (recipe: RecipeFormState) => void
  initialValues?: RecipeFormState
}

export type RecipeFormState = {
  title: string
  author: string
  ingredients: Ingredient[]
  instructions: Step[]
  imageUrl: string
  servings: number
}

export default function RecipeForm({ onSubmit, initialValues }: RecipeFormProps) {
  const [form, setForm] = useState<RecipeFormState>(
    initialValues || {
      title: '',
      author: '',
      ingredients: [],
      instructions: [],
      imageUrl: '',
      servings: 1,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
      />
      <textarea
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
      />

      <AddIngredientHandler
        ingredients={form.ingredients}
        onAdd={(ingredient) =>
          setForm((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient],
          }))
        }
      />

      <AddStepHandler
        steps={form.instructions}
        onAdd={(step) =>
          setForm((prev) => ({
            ...prev,
            instructions: [...prev.instructions, step],
          }))
        }
        />
      
      <input
        name="servings"
        type="number"
        placeholder="Servings"
        value={form.servings}
        onChange={handleChange}
        className="block w-full mb-4 p-2 border"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Save Recipe</button>
    </form>
  )
}