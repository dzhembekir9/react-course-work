'use client'

import { useState, useMemo } from 'react'
import { ResultsTable, Button } from '@/components'
import { useAllFoods } from '@/hooks'
import { Food } from '@/types'

export default function Home() {
  const [selectedFoods, setSelectedFoods] = useState<Food[]>()
  const [searchPhrase, setSearchPhrase] = useState<string | undefined>('')
  const { foods, isLoading } = useAllFoods()

  const onClick = (food: Food) => {
    setSelectedFoods((prev) => {
      if (prev) {
        return [...prev, food]
      }
      return [food]
    })
  }

  const totals = useMemo(() => {
    return selectedFoods?.reduce(
      (acc, curr) => {
        return {
          kcal: acc.kcal + curr.kcal,
          protein: acc.protein + curr.protein,
          fats: acc.fats + curr.fats,
          carbs: acc.carbs + curr.carbs,
        }
      },
      {
        kcal: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
      }
    )
  }, [selectedFoods])

  const filteredFoods = useMemo(() => {
    if (!searchPhrase) {
      return foods
    }

    const fFoods = foods?.filter((food) => {
      if (searchPhrase && food.description.includes(searchPhrase)) return food
    })

    return fFoods
  }, [searchPhrase, foods])

  if (isLoading) return <div>Loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ResultsTable foods={selectedFoods} isWithTotalField totals={totals} />

      <ResultsTable
        foods={filteredFoods}
        isWithSearch
        onButtonClick={onClick}
        setSearchPhrase={setSearchPhrase}
      />

      <Button href="add-food">Add Food</Button>
    </main>
  )
}
