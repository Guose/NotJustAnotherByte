const API_URL = 'http://localhost:5000/api/v1/auth'

export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Login failed')
    }

    const data = await response.json()
    return data
}

export async function registerUser(data: {
  name: string
  email: string
  phone: string
  password: string
}) {
  const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Registration failed');
    }

    const result = await response.json()
    return result
}
