import { useNavigate } from 'react-router-dom'
import { Recipe, RecipeCardResponse } from '@/models/recipe'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import config from '@/config'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Problem from '@/types/problem'

const useFetchKnownRecipes = (query: string) => {
  return useQuery<RecipeCardResponse[], AxiosError<Problem>>({
    queryKey: ['recipes', query],
    queryFn: async () => {
      const response = await axios.post(`${config.baseApiUrl}/api/v1/recipes/search`, { query })
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
    queryFn: async () => {
      const response = await axios.get(`${config.baseApiUrl}/api/v1/recipes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      return response.data
    },
  })
}

const useFetchRecipe = (id: string) => {
  return useQuery<Recipe, AxiosError<Problem>>({
    queryKey: ['recipes', id],
    queryFn: async () => {
      const response = await axios.get(`${config.baseApiUrl}/api/v1/recipes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      return response.data
    },
    enabled: !!id,
  })
}

const useToggleFavoriteRecipe = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError<Problem>, Recipe>({
    mutationFn: async (r) => {
      const response = await axios.patch(`${config.baseApiUrl}/api/v1/recipes/favorite/${r._id}`, r, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log('patch response.data:', response.data)
      return response.data
    },
    onSuccess: (_, updatedRecipe) => {
      queryClient.invalidateQueries({
        queryKey: ['recipes', updatedRecipe._id],
      })
      nav(`/recipes/${updatedRecipe._id}`)
    }
  })
}

const useAddRecipe = () => {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  return useMutation<AxiosResponse, AxiosError<Problem>, Recipe>({
    mutationFn: (r) => axios.post(`${config.baseApiUrl}/api/v1/recipes`, r, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
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
  useFetchRecipe,
  useToggleFavoriteRecipe,
  useAddRecipe,
}