import { Ticket } from '../persistence/ticket.model.js'

const SORT_MAP = { updatedAt: 'updatedAt', createdAt: 'createdAt', status: 'status', title: 'title' }
const toView = (d) => ({
  id: d._id?.toString?.() || d.id,   
  title: d.title,
  description: d.description,
  contact: d.contact,
  status: d.status,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt
})

export const ticketRepo = {
  async list({ status, sort = 'updatedAt', order = 'desc', q }) {
    const query = {}
    if (status) query.status = status
    if (q) query.$text = { $search: q }

    const sortKey = SORT_MAP[sort] || 'updatedAt'
    const dir = order?.toLowerCase() === 'asc' ? 1 : -1

    const docs = await Ticket.find(query).sort({ [sortKey]: dir }).lean().exec()
    return docs.map(toView)
  },

  async get(id) {
    const d = await Ticket.findById(id).lean().exec()
    return d ? toView(d) : null
  },

  async create(doc) {
    const t = await Ticket.create(doc)
    return toView(t.toObject())
  },

  async update(id, patch) {
    const d = await Ticket.findByIdAndUpdate(id, patch, { new: true, runValidators: true }).lean().exec()
    return d ? toView(d) : null
  }
}
