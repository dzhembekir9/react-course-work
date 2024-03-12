import React from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Food } from '@/types'
import { useCreateFood } from '@/hooks'
import { Button } from '../Common'

const REQUIRED = { value: true, message: 'This field is required' }

const Error = ({ children }: { children: string | undefined }) => {
  return <p className="text-red-500 text-sm mt-5">{children}</p>
}

export const CreateFoodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Food, 'id'>>()

  const { createFood, isLoading, error } = useCreateFood()

  const onSubmit = (data: Omit<Food, 'id'>) => {
    createFood(data)
    reset()
    toast.success('Food added')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-10 border border-gray-700 rounded-lg">
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-2 text-gray-700">
          Description:
        </label>
        <input
          id="description"
          type="text"
          {...register('description', {
            required: REQUIRED,
            maxLength: { value: 65535, message: 'String too long' },
          })}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {errors.description && <Error>{errors.description.message}</Error>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="kcal" className="mb-2 text-gray-700">
          Calories (kcal):
        </label>
        <input
          id="kcal"
          type="number"
          {...register('kcal', {
            required: REQUIRED,
            min: { value: 0, message: 'Value should be positive' },
          })}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {errors.kcal && <Error>{errors.kcal.message}</Error>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="protein" className="mb-2 text-gray-700">
          Protein (g):
        </label>
        <input
          id="protein"
          type="number"
          {...register('protein', {
            required: REQUIRED,
            min: { value: 0, message: 'Value should be positive' },
          })}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {errors.protein && <Error>{errors.protein.message}</Error>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="fats" className="mb-2 text-gray-700">
          Fats (g):
        </label>
        <input
          id="fats"
          type="number"
          {...register('fats', {
            required: REQUIRED,
            min: { value: 0, message: 'Value should be positive' },
          })}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {errors.fats && <Error>{errors.fats.message}</Error>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="carbs" className="mb-2 text-gray-700">
          Carbs (g):
        </label>
        <input
          id="carbs"
          type="number"
          {...register('carbs', {
            required: REQUIRED,
            min: { value: 0, message: 'Value should be positive' },
          })}
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {errors.carbs && <Error>{errors.carbs.message}</Error>}
      </div>

      <Button type="submit" isDisabled={isLoading}>
        Add
      </Button>

      <Toaster />

      {error && <Error>{error}</Error>}
    </form>
  )
}
