import RecipeForm, { RecipeFormState } from '@/components/Recipes/RecipeForm'
import { useAddRecipe } from '@/hooks/RecipeHooks'
import { Step } from '@/models/step'

export default function CreateRecipe() {
  const { mutate } = useAddRecipe()

  const handleCreate = (form: RecipeFormState) => {
    mutate({
      ...form,
      ingredients: form.ingredients.map((i) => ({
        ...i,
        name: i.name.trim(),
        quantity: i.quantity || 1,
        measurement: i.measurement || '',
        unit: i.unit || '',
        _id: i._id || '',
      })),
      instructions: (form.instructions as Step[]).map((step) => ({
        ...step,
        order: step.order,
        instruction: step.instruction,
        durationSeconds: step.durationSeconds,
        _id: step._id,
        subSteps: step.subSteps
      })),
      id: '',
      sourceUrl: ''
    })
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  )
}
