import { useState } from 'react'
import { useFetchCurrentUser } from '@/hooks/User'
import ChefSelector from '@/components/ChefSelector'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/Recipes/SearchResults'

const Home = () => {
  const [submittedQuery, setSubmittedQuery] = useState('')
  const { data: user, isLoading } = useFetchCurrentUser('')

  if (isLoading) return <p>Loading, please wait...</p>

  const hasSelectedChefs = Array.isArray(user?.selectedChefs) && user?.selectedChefs?.length > 0

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">🍽️ Welcome to Not Just Another Byte</h1>
      {!hasSelectedChefs ? (
        <ChefSelector />
      ) : (
          <>
            <SearchBar onSearch={(q) => setSubmittedQuery(q)} />
            <SearchResults query={submittedQuery} />
          </>
      )}
    </div>
  )
}

export default Home
