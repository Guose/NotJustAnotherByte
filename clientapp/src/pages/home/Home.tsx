import { useState } from 'react'
import { useFetchCurrentUser } from '@/hooks/UserHooks'
import ChefSelector from '@/components/ChefSelector'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/Recipes/SearchResults'

const Home = () => {
  const [submittedQuery, setSubmittedQuery] = useState('')
  const { data: user, isLoading } = useFetchCurrentUser('')

  if (isLoading) return <p>Loading, please wait...</p>

  const hasFavoriteChefs = Array.isArray(user?.favoriteChefs) && user.favoriteChefs.length > 0

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">🍽️ Welcome to Take Another Byte</h1>
      {!hasFavoriteChefs && user ? (
        <ChefSelector user={user} />
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
