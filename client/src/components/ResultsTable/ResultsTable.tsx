import React from 'react'
import css from './ResultsTable.module.css'
import { Food } from '../../types'
import { Button } from '@/components'

type Props = {
  foods: Food[] | undefined
  isWithTotalField?: boolean
  isWithSearch?: boolean
  onButtonClick?: (args: any) => void
  setSearchPhrase?: (phrase: string | undefined) => void
  totals?: {
    kcal: number
    protein: number
    fats: number
    carbs: number
  }
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  foodsToShow?: number
  setFoodsToShow?: any
}

export const ResultsTable = ({
  foods,
  isWithSearch,
  isWithTotalField,
  onButtonClick,
  setSearchPhrase,
  totals,
  onSubmit,
  foodsToShow,
  setFoodsToShow,
}: Props) => {
  return (
    <>
      <div className="overflow-x-auto w-full border-2 border-gray-700 mt-10">
        {isWithSearch && setSearchPhrase && (
          <form onSubmit={onSubmit}>
            <input
              className="py-4 px-6 text-gray-700 leading-tight focus:outline-gray-950 rounded-2xl border-2 border-gray-500 my-4 mx-1"
              id="search"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
          </form>
        )}
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className={css.TableHead}>Description</th>
              <th className={css.TableHead}>Kcal</th>
              <th className={css.TableHead}>Protein (g)</th>
              <th className={css.TableHead}>Fats (g)</th>
              <th className={css.TableHead}>Carbs (g)</th>
              {isWithSearch && <td className={css.TableData} />}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {foods?.map?.((food, index) => {
              if (
                Number(foodsToShow) > index &&
                Number(foodsToShow) <= index + 10
              ) {
                return (
                  <tr key={`Food__${food.id}--${index}`}>
                    <td className={css.TableData}>{food.description}</td>
                    <td className={css.TableData}>{food.kcal}</td>
                    <td className={css.TableData}>{food.protein}</td>
                    <td className={css.TableData}>{food.fats}</td>
                    <td className={css.TableData}>{food.carbs}</td>
                    {isWithSearch && onButtonClick && (
                      <td className={css.TableData}>
                        <Button onClick={() => onButtonClick(food)}>Add</Button>
                      </td>
                    )}
                  </tr>
                )
              } else if (isWithTotalField) {
                return (
                  <tr key={`Food__${food.id}--${index}`}>
                    <td className={css.TableData}>{food.description}</td>
                    <td className={css.TableData}>{food.kcal}</td>
                    <td className={css.TableData}>{food.protein}</td>
                    <td className={css.TableData}>{food.fats}</td>
                    <td className={css.TableData}>{food.carbs}</td>
                    {isWithSearch && onButtonClick && (
                      <td className={css.TableData}>
                        <Button onClick={() => onButtonClick(food)}>Add</Button>
                      </td>
                    )}
                  </tr>
                )
              }
            })}
            {isWithTotalField && (
              <tr className="font-bold">
                <td className={css.TableData}>Total</td>
                <td className={css.TableData}>{totals?.kcal}</td>
                <td className={css.TableData}>{totals?.protein}</td>
                <td className={css.TableData}>{totals?.fats}</td>
                <td className={css.TableData}>{totals?.carbs}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isWithSearch && setFoodsToShow && (
        <div className="flex justify-center items-center gap-7 mb-10 mt-5">
          <Button
            isDisabled={Number(foodsToShow) / 10 === 1}
            onClick={() =>
              setFoodsToShow((prev: number) => {
                if (prev) {
                  return prev - 10
                }
              })
            }>
            previous
          </Button>
          <p>{Number(foodsToShow) / 10}</p>
          <Button
            isDisabled={Number(foodsToShow) >= Number(foods?.length)}
            onClick={() => {
              setFoodsToShow((prev: number) => {
                if (prev) {
                  return prev + 10
                }
              })
            }}>
            next
          </Button>
        </div>
      )}
    </>
  )
}
