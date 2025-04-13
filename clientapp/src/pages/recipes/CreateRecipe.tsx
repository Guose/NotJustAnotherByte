import RecipeForm, { RecipeFormState } from '@/pages/recipes/RecipeForm'
import { useAddRecipe } from '@/hooks/Recipe'

export default function CreateRecipe() {
  const { mutate } = useAddRecipe()

  const handleCreate = (form: RecipeFormState) => {
    mutate({
      ...form,
      ingredients: form.ingredients.split(',').map((i) => i.trim()),
      instructions: form.instructions.split(',').map((i) => i.trim()),
    })
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  )
}
