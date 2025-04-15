import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchRecipe } from "@/hooks/RecipeHooks"
import { useToggleFavoriteRecipe } from "@/hooks/RecipeHooks"
import { Heart } from 'lucide-react'

const RecipeDetailPage = () => {
  const { id } = useParams()
  const toggleFavorite = useToggleFavoriteRecipe()
  const { data: recipe, isLoading, isError } = useFetchRecipe(id || '')

  useEffect(() => {
    console.log('updated heart', recipe?.isFavorite)
  }, [recipe?.isFavorite])

  if (isLoading) return <p className="text-center mt-8">Loading recipe...</p>
  if (isError || !recipe) return <p className="text-center mt-8 text-red-500">Recipe not found</p>

  const handleToggleFavorite = () => {
    if (!recipe || !id) return
    recipe.isFavorite = !recipe.isFavorite
    toggleFavorite.mutate(recipe)
    console.log('handle toggle isFavorite:', recipe.isFavorite)
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <Heart
          key={recipe.isFavorite ? 'heart-on' : 'heart-off'}
          className={`w-6 h-6 cursor-pointer transition ${recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          onClick={handleToggleFavorite}
          fill={`${recipe.isFavorite ? 'red' : 'none'}`}
        />
        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-auto mb-4" />}
        <p className="text-gray-700 mb-4">By: {recipe.author}</p>
        <p className="text-gray-700 mb-4">Prep Time: {recipe.prepTimeMinutes} minutes</p>
        <p className="text-gray-700 mb-4">Cook Time: {recipe.cookTimeMinutes} minutes</p>
        <p className="text-gray-700 mb-4">Servings: {recipe.servings}</p>
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside mb-4">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step.instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetailPage