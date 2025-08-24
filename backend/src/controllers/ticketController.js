import { createTicketSchema, updateTicketSchema } from '../utils/validate.js'
import { ticketService } from '../services/ticketService.js'

export const ticketController = {
  list: async (req, res) => {
    try {
      const { status, sort, order, q } = req.query
      const items = await ticketService.list({ status, sort, order, q })
      res.json(items)
    } catch (err) {
      console.error('DB error in ticketController.list:', err)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  get: async (req, res) => {
    try {
      const item = await ticketService.get(req.params.id)
      if (!item) return res.status(404).json({ message: 'Not found' })
      res.json(item)
    } catch (err) {
      console.error('DB error in ticketController.get:', err)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  create: async (req, res) => {
    try {
      const parse = createTicketSchema.safeParse(req.body)
      if (!parse.success) {
        return res.status(400).json({ message: 'Invalid input', issues: parse.error.issues })
      }
      const created = await ticketService.create(parse.data)
      res.status(201).json(created)
    } catch (err) {
      console.error('DB error in ticketController.create:', err)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  update: async (req, res) => {
    try {
      const parse = updateTicketSchema.safeParse(req.body)
      if (!parse.success) {
        return res.status(400).json({ message: 'Invalid input', issues: parse.error.issues })
      }
      const updated = await ticketService.update(req.params.id, parse.data)
      if (!updated) return res.status(404).json({ message: 'Not found' })
      res.json(updated)
    } catch (err) {
      console.error('DB error in ticketController.update:', err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
