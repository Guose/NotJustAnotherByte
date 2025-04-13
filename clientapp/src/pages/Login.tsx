import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loginUser } from '@/api/authApi'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const nav = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await loginUser(form)
      login({ ...response.user, token: response.token })
      nav('/')
    } catch (err) {
      const errorMessage =
        typeof err === 'string'
          ? err
          : err && typeof err === 'object' && 'message' in err
            ? (err as { message: string }).message
            : 'Something went wrong'
      toast.error(errorMessage)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2x1 font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border"
        />
        <input
          name='password'
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full">Log In</button>
      </form>
    </div>
  )
}