'use client'

import Link from 'next/link'
import { ResultsTable } from './components'

const items = [
  {
    id: 1,
    description: 'Chicken Breast',
    kcal: 165,
    protein: 31,
    fat: 3.6,
    carbs: 0,
  },
  {
    id: 2,
    description: 'Broccoli',
    kcal: 55,
    protein: 2.8,
    fat: 0.6,
    carbs: 6,
  },
  {
    id: 3,
    description: 'Brown Rice',
    kcal: 216,
    protein: 5,
    fat: 1.8,
    carbs: 45,
  },
  {
    id: 4,
    description: 'Egg',
    kcal: 155,
    protein: 13,
    fat: 11,
    carbs: 1.1,
  },
  {
    id: 5,
    description: 'Almonds',
    kcal: 579,
    protein: 21,
    fat: 50,
    carbs: 22,
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ResultsTable items={items} isWithTotalField />
      <ResultsTable items={[]} isWithSearch />
      <Link
        href="add-food"
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
        Add
      </Link>
    </main>
  )
}
