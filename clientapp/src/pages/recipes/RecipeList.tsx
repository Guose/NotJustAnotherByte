import { useFetchRecipes } from "@/hooks/Recipe"

export default function RecipeList() {
  const { data: recipes, isLoading, isError } = useFetchRecipes()

  if (isLoading) return <p>Loading recipes...</p>
  if (isError) return <p>Failed to load recipes</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      <ul className="space-y-4">
        {recipes?.map((r) => (
          <li key={r.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{r.title}</h3>
            <p className="text-gray-600">{r.description}</p>
            <p className="text-sm mt-2 italic">Servings: {r.servings}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}