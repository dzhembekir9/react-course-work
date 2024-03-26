import { useState } from 'react'
import { Food } from '@/types'
import config from '../config'

export const useFoodsBySearchPhrase = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getFoods = async (searchPhrase: string | undefined) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${config.API_URL}/foods/search?desc=${searchPhrase}`
      )
      const data = await response.json()

      setFoods(data.data)
      setLoading(false)
    } catch (error) {
      setError('Error fetching foods!')
      setLoading(false)
    }
  }

  return { foods, loading, error, getFoods }
}
