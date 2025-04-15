import { useMemo } from 'react'
import { useFetchKnownRecipes } from '@/hooks/RecipeHooks'
import RecipeCard from './RecipeCard'

type Props = {
  query: string
}

const SearchResults = ({ query }: Props) => {
  const trimmedQuery = useMemo(() => query.trim(), [query])
  const { data, isLoading, isError, error } = useFetchKnownRecipes(trimmedQuery)

  if (!query) return null
  if (isLoading) return <p className="text-center mt-8">Searching recipes...</p>
  
    if (isError && error?.response?.status === 404) {
    return (
      <div className="text-center mt-8">
        <p className="text-lg font-semibold">{String(error.response.data.errors)}</p>
        <p className="text-sm text-gray-500 mt-2">Try searching something else or updating your favorite chefs.</p>
      </div>
    )
  }

  if (isError) {
    return <p className="text-center mt-8 text-red-500">Failed to fetch recipes</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {data?.map((recipe) => (
        <RecipeCard key={recipe.url} recipe={recipe} />
      ))}
    </div>
  )
}

export default SearchResults
