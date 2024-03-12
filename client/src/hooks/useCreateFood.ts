import { useState } from 'react'

export const useCreateFood = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const createFood = async (food: any) => {
    setIsLoading(true)

    try {
      await fetch('http://localhost:8080/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      })

      setIsLoading(false)
    } catch (error) {
      setError(error as any)
    }
  }

  return { createFood, isLoading, error }
}
