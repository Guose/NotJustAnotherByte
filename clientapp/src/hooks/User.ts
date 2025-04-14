import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Problem from "@/types/problem"
import { User } from '@/models/user'
import config from "@/config"

const useFetchCurrentUser = (id: string) => {
  return useQuery<User, AxiosError<Problem>>({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await axios.get(`${config.baseApiUrl}/api/v1/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log('token', localStorage.getItem('token'))
      return response.data
    },
  })
}

export {
  useFetchCurrentUser,
}