import { Sequelize } from 'sequelize'
import { Food } from './models/Food'

export const sequelize = new Sequelize('food-lookup', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
})

export const initializeDB = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    })

  sequelize
    .query('CREATE DATABASE IF NOT EXISTS `food-lookup`;')
    .then(([results, metadata]) => {
      console.log('Database created successfully')
    })
    .catch((err) => {
      console.error('Error creating database:', err)
    })

  sequelize
    .query('USE `food-lookup`;')
    .then(([results, metadata]) => {
      console.log('Database selected successfully')
    })
    .catch((err) => {
      console.error('Error selecting database:', err)
    })
}

export const syncDatabase = () => {
  Food()
    .sync()
    .then((data) => {
      console.log('Food table created successfully.')
    })
    .catch((error) => {
      console.error('Error creating Food table:', error)
    })
}
