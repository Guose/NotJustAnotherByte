import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError, AxiosResponse } from "axios"
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
      return response.data
    },
  })
}

const useUpdateCurrentUserFavoriteChefs = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError<Problem>, User>({
    mutationFn: async (u) => {
      const response = await axios.put(`${config.baseApiUrl}/api/v1/users/me`, u, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      nav('/')
    },
  })
}


export {
  useFetchCurrentUser,
  useUpdateCurrentUserFavoriteChefs,
}