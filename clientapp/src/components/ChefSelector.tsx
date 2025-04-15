import { useState } from 'react'
import { useFetchChefs } from '@/hooks/ChefHooks'
import { useUpdateCurrentUserFavoriteChefs } from '@/hooks/UserHooks'
import { User } from '@/models/user'

const ChefSelector = ({ user }: { user: User }) => {
  const [page, setPage] = useState(1)
  const [selectedChefIds, setSelectedChefIds] = useState<string[]>([])

  const { data, isLoading, isError } = useFetchChefs(page)
  const updateUserMutation = useUpdateCurrentUserFavoriteChefs()

  if (isLoading) return <p>Loading chefs...</p>
  if (isError) return <p>Error loading chefs</p>

  const toggleChef = (id: string) => {
    setSelectedChefIds((prev) => {
      const isSelected = prev.includes(id)
      if (isSelected) {
        return prev.filter((chefId) => chefId !== id)
      } else if (prev.length < 5) {
        return [...prev, id]
      }
      return prev
    })
  }

  const saveChefSelections = () => {
    if (selectedChefIds.length > 0) {
      user.favoriteChefs = selectedChefIds
      updateUserMutation.mutate(user)
    } else {
      alert('Please select at least one chef.')
    }

  }

  const clearSelections = () => {
    setSelectedChefIds([])
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Follow Your Favorite Chefs</h2>
      <div className='mt-6 flex justify-between'>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
          Previous
        </button>
        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
          Next
        </button>
      </div>
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {data?.chefs.map((chef) => (
          <li key={chef._id} className={`p-4 border rounded shadow-sm cursor-pointer ${
              chef._id && selectedChefIds.includes(chef._id) ? 'bg-blue-100 border-blue-400' : ''
            }`}
            onClick={() => chef._id && toggleChef(chef._id)}
          >
            <input
              type='checkbox'
              checked={chef._id ? selectedChefIds.includes(chef._id) : false}
              onChange={() => chef._id && toggleChef(chef._id)}
              className='mr-2'
            />
            {chef.name}
          </li>
        ))}
      </ul>
      <button
        onClick={() => saveChefSelections()}
        className='px-4 py-2 gb-green-600 text-white rounded'
        disabled={selectedChefIds.length === 0}
      >
        Save Selection
      </button>
      <button
        onClick={clearSelections}
        className='px-4 py-2 bg-gray-400 text-white rounded'
        disabled={selectedChefIds.length === 0}
      >
        Clear Selections
      </button>
    </div>
  )
}

export default ChefSelector