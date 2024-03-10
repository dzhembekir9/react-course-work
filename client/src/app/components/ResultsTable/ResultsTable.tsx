import React from 'react'
import css from './ResultsTable.module.css'

type Props = {
  items: Item[]
  isWithTotalField?: boolean
  isWithSearch?: boolean
}

type Item = {
  id: number
  description: string
  kcal: number
  protein: number
  fat: number
  carbs: number
}

export const ResultsTable = ({
  items,
  isWithSearch,
  isWithTotalField,
}: Props) => {
  const calculateTotals = () => {
    return {
      kcal: 0.0,
      protein: 0.0,
      fat: 0.0,
      carbs: 0.0,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="overflow-x-auto w-full border-2 border-gray-700 my-10">
      {isWithSearch && (
        <input
          className="py-4 px-6 text-gray-700 leading-tight focus:outline-gray-950 rounded-2xl border-2 border-gray-500 my-4 mx-1"
          id="search"
          type="text"
          // placeholder={placeholder}
          // value={inputValue}
          // onChange={handleInputChange}
        />
      )}
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className={css.TableHead}>Description</th>
            <th className={css.TableHead}>Kcal</th>
            <th className={css.TableHead}>Protein (g)</th>
            <th className={css.TableHead}>Fat (g)</th>
            <th className={css.TableHead}>Carbs (g)</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {items.map((item, index) => (
            <tr key={index}>
              <td className={css.TableData}>{item.description}</td>
              <td className={css.TableData}>{item.kcal.toFixed(2)}</td>
              <td className={css.TableData}>{item.protein.toFixed(2)}</td>
              <td className={css.TableData}>{item.fat.toFixed(2)}</td>
              <td className={css.TableData}>{item.carbs.toFixed(2)}</td>
            </tr>
          ))}
          {isWithTotalField && (
            <tr className="font-bold">
              <td className={css.TableData}>Total</td>
              <td className={css.TableData}>{totals.kcal.toFixed(2)}</td>
              <td className={css.TableData}>{totals.protein.toFixed(2)}</td>
              <td className={css.TableData}>{totals.fat.toFixed(2)}</td>
              <td className={css.TableData}>{totals.carbs.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
