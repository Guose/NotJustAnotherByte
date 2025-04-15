import { useState } from 'react'
import { Step } from '@/models/step'
import AddStepModal from '@/components/Recipes/AddStepModal'

type Props = {
  steps: Step[]
  onAdd: (step: Step) => void
}

export default function AddStepHandler({ steps, onAdd }: Props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Steps</h3>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-sm text-blue-600"
        >
          + Add Step
        </button>
      </div>

      {steps.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No steps added yet.</p>
      ) : (
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {steps.map((step) => (
            <li key={step._id}>
              <strong>{step.item}</strong>: {step.instruction} <em>({step.durationSeconds}s)</em>
              {step.subSteps?.length > 0 && (
                <ul className="list-disc ml-5 mt-1">
                  {step.subSteps.map((s) => (
                    <li key={s._id}>{s.instruction}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      )}

      {showModal && (
        <AddStepModal
          onClose={() => setShowModal(false)}
          onAdd={(step) => {
            onAdd(step)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
