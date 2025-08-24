
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Helpdesk Ticket API',
      version: '1.0.0',
      description: 'API documentation for the Helpdesk system',
    },
    servers: [
      { url: 'http://localhost:3001/api', description: 'Local dev' },
      
    ],
    components: {
      
      schemas: {
        Ticket: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '66cd3a...' },
            title: { type: 'string', example: 'Cannot login' },
            description: { type: 'string', example: 'I tried reset password...' },
            status: { type: 'string', enum: ['pending','accepted','resolved','rejected'], example: 'pending' },
            contact: { type: 'string', nullable: true, example: '' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        TicketCreate: {
          type: 'object',
          required: ['title','description'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            contact: { type: 'string', nullable: true },
          },
        },
        TicketUpdate: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['pending','accepted','resolved','rejected'] },
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
  },
  apis: ['./src/routes.js'],
}

export const specs = swaggerJsdoc(options)
export { swaggerUi }
