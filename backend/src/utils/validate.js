import { z } from 'zod'

export const createTicketSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  contact: z.string().min(1)
})

export const updateTicketSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  contact: z.string().min(1).optional(),
  status: z.enum(['pending', 'accepted', 'resolved', 'rejected']).optional()
})
