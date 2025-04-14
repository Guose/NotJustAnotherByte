import { useState } from 'react'
import { useFetchChefs } from '@/hooks/Chef'

const ChefSelector = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useFetchChefs(page)

  console.log('chefId:', data?.chefs[0]?._id)

  if (isLoading) return <p>Loading chefs...</p>
  if (isError) return <p>Error loading chefs</p>

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Follow Your Favorite Chefs</h2>
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {data?.chefs.map((chef) => (
          <li key={chef._id} className='p-4 border rounded shadow-sm'>
            {chef.name}
          </li>
        ))}
      </ul>

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
    </div>
  )
}

export default ChefSelector