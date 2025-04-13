import { useState } from 'react'

type Props = {
  onSearch: (query: string) => void
  placeholder?: string
}

const SearchBar = ({ onSearch, placeholder = 'Search recipes...' }: Props) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(input.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
