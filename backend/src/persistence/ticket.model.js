import mongoose from 'mongoose'

const TicketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true, default:'' },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'resolved', 'rejected'],
      default: 'pending',
      index: true
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

TicketSchema.index({ status: 1,updatedAt: -1 })
TicketSchema.index({ title: 'text', description: 'text' }) // สำหรับทำ search option

export const Ticket = mongoose.model('Ticket', TicketSchema)
