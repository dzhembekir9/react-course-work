import { useEffect, useState } from 'react'
import { Food } from '../types'

export const useAllFoods = () => {
  const [allFoods, setAllFoods] = useState<{ data: Food[] }>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await fetch('http://localhost:8080/foods')
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
