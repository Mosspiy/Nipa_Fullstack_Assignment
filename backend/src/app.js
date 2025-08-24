import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes.js'
import { swaggerUi, specs } from './swagger.js'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', routes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((req, res) => res.status(404).json({ message: 'Not found' }))


export default app
