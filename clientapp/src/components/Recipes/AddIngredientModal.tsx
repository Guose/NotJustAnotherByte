import { useState } from 'react'
import { Ingredient } from '@/models/ingredient'

type Props = {
  onAdd: (ingredient: Ingredient) => void
  onClose: () => void
}

export default function AddIngredientModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState<Omit<Ingredient, '_id'>>({
    name: '',
    quantity: 1,
    measurement: '',
    unit: '',
    form: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const ingredient: Ingredient = {
      ...form,
      _id: crypto.randomUUID(),
    }
    onAdd(ingredient)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Ingredient</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="measurement" placeholder="Measurement (e.g., 1/2)" value={form.measurement} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="unit" placeholder="Unit (e.g., cups)" value={form.unit} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="form" placeholder="Form (e.g., chopped)" value={form.form} onChange={handleChange} className="mb-4 w-full p-2 border" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  )
}