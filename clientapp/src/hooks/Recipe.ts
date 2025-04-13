import { useNavigate } from 'react-router-dom'
import { Recipe, RecipeSearch } from '@/models/recipe'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import config from '@/config'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Problem from '@/types/problem'

const useFetchKnownRecipes = (query: string) => {
  return useQuery<RecipeSearch[], AxiosError<Problem>>({
    queryKey: ['recipes', query],
    queryFn: async () => {
      const response = await axios.post(`${config.baseApiUrl}/api/v1/recipes/search`, { query })
      console.log('response.data', response.data)
      return response.data
    },
    enabled: !!query && query.length > 2,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  })
}

const useFetchRecipes = () => {
  return useQuery<Recipe[], AxiosError<Problem>>({
    queryKey: ['recipes'],
    queryFn: () => axios.get(`${config.baseApiUrl}/api/v1/recipes`, {
      withCredentials: true,
    }).then((res) => res.data),
  })
}

const useAddRecipe = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError<Problem>, Recipe>({
    mutationFn: (r) => axios.post(`${config.baseApiUrl}/api/v1/recipes`, r, {
      withCredentials: true,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      nav('/')
    },
  })
}

export {
  useFetchKnownRecipes,
  useFetchRecipes,
  useAddRecipe,
}