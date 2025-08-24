import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod

export async function connectMemoryMongo() {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri('helpdesk_test')
  await mongoose.connect(uri)
}

export async function disconnectMemoryMongo() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  if (mongod) await mongod.stop()
}

export async function clearCollections() {
  const { collections } = mongoose.connection
  for (const k of Object.keys(collections)) {
    await collections[k].deleteMany({})
  }
}
