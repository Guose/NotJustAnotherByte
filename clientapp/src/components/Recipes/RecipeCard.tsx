import { RecipeSearchResponse } from '@/models/recipe'

type Props = {
  recipe: RecipeSearchResponse
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="w-full max-w-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={recipe.image}
        alt={recipe.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://assets.bonappetit.com/photos/57b0def8f1c801a1038bda94/1:1/w_1920,c_limit/dire_roastchicken_h.jpg'
        }}
        className="w-full max-w-[240px] h-[160px] object-cover mx-auto rounded-md"
      />

      <div className="p-4">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
          by {recipe.by}
        </p>
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-blue-600 hover:underline"
        >
          View Recipe
        </a>
      </div>
    </div>
  )
}

export default RecipeCard



// (e.target as HTMLImageElement).src = 'https://assets.bonappetit.com/photos/57b0def8f1c801a1038bda94/1:1/w_1920,c_limit/dire_roastchicken_h.jpg'