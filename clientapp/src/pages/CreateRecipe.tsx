import RecipeForm, { RecipeFormState } from '../components/Recipes/RecipeForm';

export default function CreateRecipe() {
  const handleCreate = (form: RecipeFormState) => {
    console.log('Create Recipe:', form);
    // 👉 Later: send form to POST /recipes
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  );
}
