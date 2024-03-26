import { useEffect, useState } from 'react'
import { Food } from '../types'
import config from '../config'

export const useAllFoods = () => {
  const [allFoods, setAllFoods] = useState<{ data: Food[] }>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await fetch(`${config.API_URL}/foods`)
        const data = await response.json()

        setAllFoods(data)
        setIsLoading(false)
      } catch (error) {
        setError(error as any)
      }
    }

    getFoods()
  }, [])

  return { foods: allFoods?.data, isLoading, error }
}
