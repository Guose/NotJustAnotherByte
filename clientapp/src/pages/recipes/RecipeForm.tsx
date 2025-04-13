import React, { useState } from "react"

type RecipeFormProps = {
  onSubmit: (recipe: RecipeFormState) => void
  initialValues?: RecipeFormState
}

export type RecipeFormState = {
  title: string
  description: string
  ingredients: string
  instructions: string
  imageUrl: string
  servings: number
}

export default function RecipeForm({ onSubmit, initialValues }: RecipeFormProps) {
  const [form, setForm] = useState<RecipeFormState>(
    initialValues || {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
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
        name="description"
        placeholder="Short Description"
        value={form.description}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={form.ingredients}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
      />
      <textarea
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border"
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