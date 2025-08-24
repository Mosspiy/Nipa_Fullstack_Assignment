import { ticketRepo } from '../repositories/ticketRepo.js'

export const ticketService = {
  list(q) { return ticketRepo.list(q) },
  get(id) { return ticketRepo.get(id) },
  create(payload) { return ticketRepo.create({ ...payload }) },
  update(id, patch) { return ticketRepo.update(id, patch) }
}
