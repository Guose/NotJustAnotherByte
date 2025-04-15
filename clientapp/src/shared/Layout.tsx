import { Outlet, Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuthHooks"

export default function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow p-4 mb-6">
        <nav className="flex justify-center gap-6 text-blue-600 font-semibold">
          <div className="flex gap-4 text-blue-600 font-semibold">
            <Link to={'/'}>Home</Link>
            <Link to={'/recipes'}>Recipes</Link>
            <Link to={'/shopping-list'}>Shopping List</Link>
          </div>

          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <span className="text-sm text--gray-700">👋 {user.name}</span>
                <button onClick={logout} className="text-red-600 font-semibold">Logout</button>  
              </>
            ) : (
                <>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'/register'}>Register</Link>
                </>
            )}
          </div>
        </nav>
      </header>

      <main className="px-4">
        <Outlet />
      </main>
    </div>
  )
}