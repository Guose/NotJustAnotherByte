import { useState } from 'react'
import { registerUser } from '@/api/authApi'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuthHooks'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  })

  const { login } = useAuth()
  const nav = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phoneNumber
      })

      login(data)
      toast.success('Registering User...')
      nav('/')
    } catch (err) {
      const errorMessage =
        typeof err === 'string'
          ? err
          : err && typeof err === 'object' && 'message' in err
            ? (err as { message: string }).message
            : 'Something went wrong';

      toast.error(errorMessage);
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='name'
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          type="text"
          className="block w-full mb-3 p-2 border"
        />
        <input
          name='email'
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="block w-full mb-3 p-2 border"
        />
        <input
          name='password'
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          type="password"
          className="block w-full mb-3 p-2 border"
        />
        <input
          name='confirmPassword'
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          className="block w-full mb-3 p-2 border"
        />
        <input
          name='phoneNumber'
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          type="tel"
          className="block w-full mb-3 p-2 border"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Sign Up</button>
      </form>
    </div>
  )
}