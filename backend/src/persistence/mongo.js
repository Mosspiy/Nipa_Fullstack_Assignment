import mongoose from 'mongoose'
import { Ticket } from './ticket.model.js'

export async function connectMongo() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('Missing MONGODB_URI')
  await mongoose.connect(uri)
  console.log('✅ MongoDB connected')
}

async function seed() {
  const count = await Ticket.estimatedDocumentCount()
  if (count > 0) {
    console.log('Seed skipped (data exists)')
    return
  }
  await Ticket.create([
    { title: 'POS not printing', description: 'Printer disconnected lane 2', contact: '085-xxx-xxxx' },
    { title: 'Stock sync delay', description: 'Warehouse API queue stuck', contact: 'ops@example.com', status: 'accepted' }
  ])
  console.log('🌱 Seeded example tickets')
}

if (process.argv.includes('--seed')) {
  const { config } = await import('dotenv')
  config()
  await connectMongo()
  await seed()
  process.exit(0)
}
