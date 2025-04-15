import { useFetchRecipes } from "@/hooks/RecipeHooks"
import RecipeCard from '@/components/Recipes/RecipeCard'

export default function RecipeList() {
  const { data: recipes, isLoading, isError } = useFetchRecipes()

  if (isLoading) return <p>Loading recipes...</p>
  if (isError) return <p>Failed to load recipes</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      {recipes?.map((r) => (
        <RecipeCard
          key={r._id}
          recipe={{
            _id: r._id,
            title: r.title,
            image: r.imageUrl,
            by: r.author,
            url: r.sourceUrl,
          }}
        />
      ))}
    </div>
  )
}

{/* <ul className="space-y-4">
        {recipes?.map((r) => (
          <li key={r.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{r.title}</h3>
            <p>
              {r.ingredients.map((ingredient) => (
                <ul key={ingredient._id} className="text-sm text-gray-600">
                  <li>{ingredient.quantity} {ingredient.measurement} {ingredient.unit} {ingredient.name}</li>
                </ul>
              ))}
            </p>
            <p className="text-sm mt-2 italic">Servings: {r.servings}</p>
          </li>
        ))}
      </ul> */}