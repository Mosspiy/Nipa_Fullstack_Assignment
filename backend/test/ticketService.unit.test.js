import { jest } from '@jest/globals'
jest.unstable_mockModule('../src/repositories/ticketRepo.js', () => ({
  ticketRepo: {
    list: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}))

const { ticketRepo } = await import('../src/repositories/ticketRepo.js')
const { ticketService } = await import('../src/services/ticketService.js')

describe('ticketService (unit with mocked repo)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('list() should pass filters/sort to repo.list and return items', async () => {
    const fake = [{ id: '1', title: 'A' }]
    ticketRepo.list.mockResolvedValue(fake)

    const params = { status: 'pending', sort: 'updatedAt', order: 'desc', q: 'printer' }
    const out = await ticketService.list(params)

    expect(ticketRepo.list).toHaveBeenCalledWith(params)
    expect(out).toBe(fake)
  })

  it('get() should call repo.get with id and return it', async () => {
    const item = { id: 'x1', title: 'A' }
    ticketRepo.get.mockResolvedValue(item)

    const out = await ticketService.get('x1')
    expect(ticketRepo.get).toHaveBeenCalledWith('x1')
    expect(out).toBe(item)
  })

  it('create() should default status to pending if repo returns it', async () => {
    const payload = { title: 'T', description: 'D', contact: 'u@a.com' }
    const saved = { ...payload, id: 'x2', status: 'pending' }
    ticketRepo.create.mockResolvedValue(saved)

    const out = await ticketService.create(payload)
    expect(ticketRepo.create).toHaveBeenCalledWith(payload)
    expect(out.status).toBe('pending')
  })

  it('update() should call repo.update and return updated item', async () => {
    const updated = { id: 'x3', status: 'resolved' }
    ticketRepo.update.mockResolvedValue(updated)

    const out = await ticketService.update('x3', { status: 'resolved' })
    expect(ticketRepo.update).toHaveBeenCalledWith('x3', { status: 'resolved' })
    expect(out).toBe(updated)
  })
})
