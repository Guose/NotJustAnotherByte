import { useState } from 'react'
import { Step } from '@/models/step'

type Props = {
  onAdd: (step: Step) => void
  onClose: () => void
}

export default function AddStepModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState<Omit<Step, '_id' | 'subSteps'>>({
    order: 1,
    item: '',
    instruction: '',
    durationSeconds: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'order' || name === 'durationSeconds' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = () => {
    const step: Step = {
      ...form,
      _id: crypto.randomUUID(),
      subSteps: [],
    };
    onAdd(step)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Step</h2>

        <input name="order" type="number" placeholder="Order" value={form.order} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="item" placeholder="Item (e.g., carrots)" value={form.item} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <textarea name="instruction" placeholder="Instruction" value={form.instruction} onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="durationSeconds" type="number" placeholder="Duration (in seconds)" value={form.durationSeconds} onChange={handleChange} className="mb-4 w-full p-2 border" />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Add Step</button>
        </div>
      </div>
    </div>
  )
}
