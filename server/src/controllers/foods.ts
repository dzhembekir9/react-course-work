import express from 'express'
import { Op } from 'sequelize'
import { Food } from '../models/Food'

export const foodsRouter = express.Router()

foodsRouter.get('/search', async (req, res) => {
  const description = req.query.desc

  if (description) {
    const foods = await Food().findAll({
      where: {
        description: {
          [Op.like]: `%${description}%`,
        },
      },
    })

    if (foods.length > 0) {
      res.status(200).json(foods)
    } else {
      res.status(404).json({ message: 'No foods found!' })
    }
  } else {
    res.status(400).json({ message: 'Invalid search query!' })
  }
})

foodsRouter.get('/', async (req, res) => {
  try {
    const foods = await Food().findAll()

    res.status(200).json({ data: foods })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching foods!' })
  }
})

foodsRouter.post('/', async (req, res) => {
  try {
    await Food().create(req.body)

    res.status(201).json({ message: 'Food created successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error creating food!' })
  }
})

foodsRouter.get('/:id', async (req, res) => {
  const food = await Food().findByPk(req.params.id)

  if (food) {
    res.status(200).json(food)
  } else {
    console.log('IVAN')

    res.status(404).json({ message: 'Food not found!' })
  }
})

foodsRouter.delete('/:id', async (req, res) => {
  const deletedRows = await Food().destroy({ where: { id: req.params.id } })

  if (deletedRows > 0) {
    res.status(200).json({ message: 'Food deleted successfully!' })
  } else {
    res.status(404).json({ message: 'Food not found!' })
  }
})

foodsRouter.put('/:id', async (req, res) => {
  const updated = await Food().update(req.body, {
    where: { id: req.params.id },
  })

  if (updated[0] > 0) {
    res.status(200).json({ message: 'Food updated successfully!' })
  } else {
    res.status(404).json({ message: 'Food not found!' })
  }
})
