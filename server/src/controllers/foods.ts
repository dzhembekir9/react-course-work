import express from 'express'
import { Op } from 'sequelize'
import { Food } from '../models/Food'

export const foodsRouter = express.Router()

foodsRouter.get('/search', async (req, res) => {
  try {
    const foods = await Food().findAll({
      where: {
        description: {
          [Op.like]: `%${req.query.desc}%`,
        },
      },
    })

    res.status(200).json({ data: foods })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching foods!' })
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
