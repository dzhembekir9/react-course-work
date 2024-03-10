import { sequelize } from '../dbConfig'
import { DataTypes } from 'sequelize'

export const Food = () => {
  return sequelize.define(
    'Food',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      kcal: {
        type: DataTypes.FLOAT,
      },
      protein: {
        type: DataTypes.FLOAT,
      },
      carbs: {
        type: DataTypes.FLOAT,
      },
      fats: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'foods',
      timestamps: false,
    }
  )
}
