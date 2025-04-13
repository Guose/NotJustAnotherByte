import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import ProtectedRoute from "./ProtectedRoute"

import Home from "@/pages/Home"
import Recipes from "@/pages/recipes/RecipeList"
import ShoppingList from "@/pages/shoppingList/ShoppingList"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

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
            <Route path="shopping-list" element={<ShoppingList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

