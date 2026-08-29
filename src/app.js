import express from 'express'
import cors from 'cors'
import routes from './routes/users.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/hello', routes)

export default app