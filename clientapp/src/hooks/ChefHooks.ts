import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse, AxiosError} from "axios"
import { PaginatedChefResponse } from "../models/chef"
import { useNavigate } from "react-router-dom"
import Problem from "@/types/problem"
import config from "@/config"

const useFetchChefs = (page: number) => {
  return useQuery<PaginatedChefResponse, AxiosError<Problem>>({
    queryKey: ['chefs', page],
    queryFn: async () => {
      const response = await axios.get(`${config.baseApiUrl}/api/v1/chefs?page=${page}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      return response.data
    },
    placeholderData: (previousData) => previousData,
  })
}

const useAddChef = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError<Problem>>({
    mutationFn: async (chef) => {
      const response = await axios.post(`${config.baseApiUrl}/api/v1/chefs`, chef)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chefs'] })
      nav('/chefs')
    },
  })
}

export {
  useFetchChefs,
  useAddChef,
}