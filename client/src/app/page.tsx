'use client'

import { useState, useMemo, useEffect } from 'react'
import { ResultsTable, Button } from '@/components'
import { useAllFoods } from '@/hooks'
import { Food } from '@/types'
import { useFoodsBySearchPhrase } from '@/hooks/useFoodsBySearchPhrase'

export default function Home() {
  const [selectedFoods, setSelectedFoods] = useState<Food[]>()
  const [searchPhrase, setSearchPhrase] = useState<string | undefined>('')
  const [foodsToShow, setFoodsToShow] = useState<number>(10)
  const [foodsToRender, setFoodsToRender] = useState<Food[] | undefined>([])

  const { foods, isLoading } = useAllFoods()
  const { foods: filteredFoods, getFoods } = useFoodsBySearchPhrase()

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFoodsToShow(10)
    getFoods(searchPhrase)
  }

  useEffect(() => {
    setFoodsToRender(foods)
  }, [foods])

  useEffect(() => {
    setFoodsToRender(filteredFoods)
  }, [filteredFoods])

  if (isLoading) return <div>Loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ResultsTable foods={selectedFoods} isWithTotalField totals={totals} />

      <ResultsTable
        foods={foodsToRender}
        isWithSearch
        onButtonClick={onClick}
        setSearchPhrase={setSearchPhrase}
        onSubmit={onSubmit}
        foodsToShow={foodsToShow}
        setFoodsToShow={setFoodsToShow}
      />

      <Button href="add-food">Add Food</Button>
    </main>
  )
}
