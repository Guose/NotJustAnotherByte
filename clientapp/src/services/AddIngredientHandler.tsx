import { useState } from 'react'
import { Ingredient } from '@/models/ingredient'
import AddIngredientModal from '@/components/Recipes/AddIngredientModal'

type Props = {
  ingredients: Ingredient[]
  onAdd: (ingredient: Ingredient) => void
}

export default function AddIngredientHandler({ ingredients, onAdd }: Props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Ingredients</h3>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-sm text-blue-600"
        >
          + Add Ingredient
        </button>
      </div>

      {ingredients.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No ingredients added.</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {ingredients.map((ing) => (
            <li key={ing._id}>
              {ing.quantity} {ing.measurement} {ing.unit} {ing.form} {ing.name}
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <AddIngredientModal
          onClose={() => setShowModal(false)}
          onAdd={(ingredient) => {
            onAdd(ingredient)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
