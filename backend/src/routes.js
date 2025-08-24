import { Router } from 'express'
import mongoose from 'mongoose'
import { ticketController } from './controllers/ticketController.js'

const r = Router()

r.get('/health', (req,res)=>res.json({ok:true}))

r.param('id', (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ticket id', id })
  }
  next()
})

r.get('/tickets', ticketController.list)
r.get('/tickets/:id', ticketController.get)
r.post('/tickets', ticketController.create)
r.put('/tickets/:id', ticketController.update)

export default r
