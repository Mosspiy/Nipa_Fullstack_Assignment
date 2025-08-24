import { createTicketSchema, updateTicketSchema } from '../src/utils/validate.js'

describe('validate.js (Zod schemas)', () => {
  test('createTicketSchema: valid payload should pass', () => {
    const input = { title: 'Test', description: 'Desc', contact: 'user@example.com' }
    const r = createTicketSchema.safeParse(input)
    expect(r.success).toBe(true)
  })

  test('createTicketSchema: missing title should fail', () => {
    const input = { title: '', description: 'Desc', contact: 'user@example.com' }
    const r = createTicketSchema.safeParse(input)
    expect(r.success).toBe(false)
  })

  // ⬇️ เปลี่ยนเป็นตรวจว่าขาด contact แล้วต้อง fail
  test('createTicketSchema: missing contact should fail', () => {
    const input = { title: 'Test', description: 'Desc' } // ไม่มี contact
    const r = createTicketSchema.safeParse(input)
    expect(r.success).toBe(false)
  })

  test('updateTicketSchema: allow only status/title/description/contact (partial)', () => {
    const r = updateTicketSchema.safeParse({ status: 'resolved' })
    expect(r.success).toBe(true)
  })

  test('updateTicketSchema: invalid status value should fail', () => {
    const r = updateTicketSchema.safeParse({ status: 'done' })
    expect(r.success).toBe(false)
  })
})
