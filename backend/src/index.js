import 'dotenv/config'
import app from './app.js'
import { connectMongo } from './persistence/mongo.js'

const PORT = process.env.PORT || 3001

await connectMongo()
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`)
})
