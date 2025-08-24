import request from 'supertest'
import app from '../src/app.js'
import { Ticket } from '../src/persistence/ticket.model.js'
import { connectMemoryMongo, disconnectMemoryMongo, clearCollections } from './mongo.memory.js'

beforeAll(async () => {
  process.env.NODE_ENV = 'test'
  await connectMemoryMongo()
})

afterAll(async () => {
  await disconnectMemoryMongo()
})

afterEach(async () => {
  await clearCollections()
})

/** Helpers */
async function seedSample() {
  const docs = await Ticket.create([
    { title: 'A', description: 'd1', contact: 'a@example.com', status: 'pending' },
    { title: 'B', description: 'd2', contact: 'b@example.com', status: 'accepted' }
  ])
  return docs
}

describe('GET /api/health', () => {
  it('should return ok:true', async () => {
    const res = await request(app).get('/api/health')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })
})

describe('GET /api/tickets', () => {
  it('should return [] when no data', async () => {
    const res = await request(app).get('/api/tickets')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })

  it('should list tickets sorted desc by updatedAt', async () => {
    await seedSample()
    const res = await request(app).get('/api/tickets?sort=updatedAt&order=desc')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(2)
    const t0 = new Date(res.body[0].updatedAt).getTime()
    const t1 = new Date(res.body[1].updatedAt).getTime()
    expect(t0).toBeGreaterThanOrEqual(t1)
  })

  it('should filter by status', async () => {
    await seedSample()
    const res = await request(app).get('/api/tickets?status=accepted')
    expect(res.statusCode).toBe(200)
    expect(res.body.every(x => x.status === 'accepted')).toBe(true)
  })
})

describe('GET /api/tickets/:id', () => {
  it('should 400 when id is invalid (r.param guard)', async () => {
    const res = await request(app).get('/api/tickets/not-a-valid-id')
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message', 'Invalid ticket id')
  })

  it('should 404 when not found', async () => {
    const res = await request(app).get('/api/tickets/64b64c111111111111111111')
    expect(res.statusCode).toBe(404)
  })

  it('should return a ticket when found', async () => {
    const [t] = await seedSample()
    const res = await request(app).get(`/api/tickets/${t._id}`)
    expect(res.statusCode).toBe(200)
    // API ของมึง normalize เป็น id (ไม่ใช่ _id)
    expect(res.body.id || res.body._id).toBeTruthy()
    expect(res.body.title).toBe('A')
  })
})

describe('POST /api/tickets', () => {
  it('should 400 when body invalid (missing title/description/contact)', async () => {
    const res = await request(app).post('/api/tickets').send({})
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message', 'Invalid input')
  })

  it('should create 201 with default status pending', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({
        title: 'Printer down',
        description: 'Lane 2',
        contact: 'ops@example.com'
      })
      .set('Content-Type', 'application/json')

    expect(res.statusCode).toBe(201)
    const id = res.body.id || res.body._id
    expect(id).toBeTruthy()
    expect(res.body.status).toBe('pending')
  })
})

describe('PUT /api/tickets/:id', () => {
  it('should 400 when id invalid', async () => {
    const res = await request(app).put('/api/tickets/not-a-valid-id').send({ status: 'accepted' })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message', 'Invalid ticket id')
  })

  it('should 400 when body invalid (e.g. status invalid type)', async () => {
    const [t] = await seedSample()
    const res = await request(app).put(`/api/tickets/${t._id}`).send({ status: 123 })
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message', 'Invalid input')
  })

  it('should 404 when not found', async () => {
    const res = await request(app)
      .put('/api/tickets/64b64c111111111111111111')
      .send({ status: 'resolved' })
    expect(res.statusCode).toBe(404)
  })

  it('should 200 and update a ticket status', async () => {
    const [t] = await seedSample()
    const res = await request(app)
      .put(`/api/tickets/${t._id}`)
      .send({ status: 'resolved' })
      .set('Content-Type', 'application/json')

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('resolved')
  })
})
