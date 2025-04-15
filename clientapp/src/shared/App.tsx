import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import ProtectedRoute from "./ProtectedRoute"

import Home from "@/pages/home/Home"
import Recipes from "@/pages/recipes/RecipeList"
import CreateRecipe from "@/pages/recipes/CreateRecipe"
import RecipeDetailPage from "@/pages/recipes/RecipeDetailPage"
import ShoppingList from "@/pages/shoppingList/ShoppingList"
import Login from "@/pages/account/Login"
import Register from "@/pages/account/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="recipes" element={<Recipes />} />
            <Route path="recipes/add" element={<CreateRecipe />} />
            <Route path="recipes/:id" element={<RecipeDetailPage/>} />
            <Route path="shopping-list" element={<ShoppingList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

