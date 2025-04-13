import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/Recipes/SearchResults'

const Home = () => {
  const [submittedQuery, setSubmittedQuery] = useState('')

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold">🍽️ Welcome to Not Just Another Byte</h1>
      <SearchBar onSearch={(q) => setSubmittedQuery(q)} />
      <SearchResults query={submittedQuery} />
    </div>
  )
}

export default Home
