import express from 'express'
import cors from 'cors'
import { initializeDB, syncDatabase } from './dbConfig'
import { foodsRouter } from './controllers/foods'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/foods', foodsRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  initializeDB()
  syncDatabase()
  console.log('Server Listening on PORT:', PORT)
})
